import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

// R2 configuration
const R2_ENDPOINT = '103e73569e2f6d4aea0fb679ceb8709b.r2.cloudflarestorage.com';

// Pre-generate full 1GB of data in memory using 100MB template
const PART_SIZE = 100 * 1024 * 1024; // 100MB parts
const TOTAL_PARTS = 10; // 10 x 100MB = 1GB

console.log('Pre-generating 1GB of data in memory...');
const templateData = Buffer.alloc(PART_SIZE);
require('crypto').randomFillSync(templateData);

// Create 10 parts of 100MB each (reusing the same template data)
const dataParts: Buffer[] = [];
for (let i = 0; i < TOTAL_PARTS; i++) {
  // Share the same buffer to save memory - R2 won't know it's the same data
  dataParts.push(templateData);
}
console.log('1GB of data ready in memory (10 x 100MB parts)');

// Configure rclone for R2
function configureRclone() {
  const config = `[r2]
type = s3
provider = Cloudflare
access_key_id = ${process.env.AWS_ACCESS_KEY_ID}
secret_access_key = ${process.env.AWS_SECRET_ACCESS_KEY}
region = auto
endpoint = https://${R2_ENDPOINT}
acl = private
no_check_bucket = true
`;
  
  // Create rclone config directory
  const configDir = '/tmp/.config/rclone';
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Write config file
  fs.writeFileSync(path.join(configDir, 'rclone.conf'), config);
  
  // Set environment variable for rclone config
  process.env.RCLONE_CONFIG = path.join(configDir, 'rclone.conf');
}

// Upload using rclone with optimized parameters
export async function uploadToS3(unused?: any): Promise<{ uploadTime: number; fileKey: string }> {
  const fileKey = `speed-test/${randomUUID()}`;
  const tempFile = `/tmp/speedtest-${randomUUID()}.dat`;
  
  console.log('Configuring rclone for R2...');
  configureRclone();
  
  console.log('Creating 1GB test file...');
  const uploadStart = Date.now();
  
  try {
    // Create a 1GB file by writing our pre-generated data
    const writeStream = fs.createWriteStream(tempFile);
    for (let i = 0; i < TOTAL_PARTS; i++) {
      writeStream.write(dataParts[i]);
    }
    writeStream.end();
    
    // Wait for file to be written
    await new Promise((resolve) => writeStream.on('finish', resolve));
    
    console.log('Starting rclone upload to R2 with optimized parameters...');
    
    // Construct rclone command with optimized parameters for maximum speed
    const bucketName = process.env.S3_BUCKET!;
    const rcloneCmd = [
      'rclone',
      'copy',
      '-v',  // Verbose output for debugging
      '--transfers', '32',  // Moderate parallel transfers
      '--s3-upload-concurrency', '32',  // Moderate upload concurrency
      '--s3-chunk-size', '64M',  // Optimal chunk size
      '--no-check-dest',  // Skip destination checks
      '--ignore-checksum',  // Skip checksums for speed
      '--s3-disable-checksum',  // Disable S3 checksums
      '--retries', '1',  // Reduce retries
      tempFile,
      `r2:${bucketName}/${fileKey}`
    ].join(' ');
    
    console.log(`Executing rclone command...`);
    
    // Execute rclone with optimized parameters for containers
    const rcloneProcess = spawn('rclone', [
      'copy',
      '-v',  // Verbose output for debugging
      '--transfers', '1',  // Single transfer for maximum bandwidth per file
      '--checkers', '1',  // Minimal checkers to reduce CPU load
      '--multi-thread-streams', '8',  // Conservative multi-threading
      '--multi-thread-cutoff', '256M',  // Enable multi-threading for files > 256MB
      '--s3-chunk-size', '512M',  // Very large chunks
      '--s3-upload-cutoff', '2048M',  // Avoid multipart for 1GB file
      '--s3-disable-checksum',  // Disable CPU-heavy checksums
      '--no-check-dest',  // Skip destination checks
      '--ignore-checksum',  // Skip checksum validation
      '--no-update-modtime',  // Skip setting modification times
      '--buffer-size', '128k',  // Standard buffer size
      '--retries', '1',  // Minimal retries for speed
      tempFile,
      `r2:${bucketName}/${fileKey}`
    ], {
      env: { ...process.env },
      stdio: ['inherit', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    rcloneProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('RCLONE:', data.toString().trim());
    });
    
    rcloneProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error('RCLONE ERROR:', data.toString().trim());
    });
    
    // Wait for rclone to complete
    await new Promise<void>((resolve, reject) => {
      rcloneProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Rclone exited with code ${code}. stderr: ${stderr}`));
        }
      });
      
      rcloneProcess.on('error', (err) => {
        reject(new Error(`Failed to start rclone: ${err.message}`));
      });
    });
    
    const uploadTime = Date.now() - uploadStart;
    const uploadSpeedMBps = 1024 / (uploadTime / 1000);
    
    console.log(`\nUpload completed successfully!`);
    console.log(`Total upload time: ${(uploadTime / 1000).toFixed(2)}s`);
    console.log(`Upload speed: ${uploadSpeedMBps.toFixed(2)} MB/s`);
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    return { uploadTime, fileKey };
    
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    console.error('Rclone upload failed:', error);
    throw error;
  }
}

// HTTP server for container
const server = createServer(async (req, res) => {
  try {
    console.log(`${req.method} ${req.url}`);
    const url = new URL(req.url!, `http://localhost:8080`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

  if (url.pathname === "/upload" && req.method === "POST") {
    console.log("=== S3 UPLOAD TEST STARTING ===");
    console.log("Environment variables:", {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
      AWS_REGION: process.env.AWS_REGION,
      S3_BUCKET: process.env.S3_BUCKET
    });
    console.log("Container timestamp:", new Date().toISOString());
    console.time("upload-test");

    // First check if environment variables are set
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.S3_BUCKET) {
      const errorResponse = {
        success: false,
        error: "Missing environment variables",
        envVars: {
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
          AWS_REGION: process.env.AWS_REGION || 'NOT SET',
          S3_BUCKET: process.env.S3_BUCKET || 'NOT SET'
        }
      };
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(errorResponse));
      return;
    }

    try {
      console.log("Starting concurrent upload test...");
      
      const result = await uploadToS3();

      console.timeEnd("upload-test");
      console.log("=== S3 UPLOAD TEST COMPLETED SUCCESSFULLY ===");

      const response = {
        success: true,
        uploadTime: result.uploadTime,
        uploadSpeed: `${(1024 / (result.uploadTime / 1000)).toFixed(2)} MB/s`,
        fileKey: result.fileKey,
        timestamp: new Date().toISOString()
      };
      
      console.log("Upload result:", JSON.stringify(response, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      console.error("=== S3 UPLOAD TEST FAILED ===");
      console.error("Upload failed:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      const errorDetails = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorStack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      };
      
      console.log("Returning error response:", JSON.stringify(errorDetails, null, 2));
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(errorDetails));
    }
    return;
  }

  if (url.pathname === "/generate" && req.method === "GET") {
    console.log("Sending pre-generated 1GB data...");
    
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Length": FILE_SIZE.toString(),
    });
    
    // Send all parts sequentially
    for (let i = 0; i < TOTAL_PARTS; i++) {
      res.write(dataParts[i]);
    }
    res.end();
    return;
  }

  if (url.pathname === "/" && req.method === "GET") {
    const response = {
      status: "Container ready",
      endpoints: [
        "POST /upload - test S3 upload speed", 
        "GET /generate - get 1GB of random data",
        "GET /env - check environment variables"
      ],
      envVars: {
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
        AWS_REGION: process.env.AWS_REGION || 'NOT SET',
        S3_BUCKET: process.env.S3_BUCKET || 'NOT SET'
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    return;
  }

  if (url.pathname === "/env" && req.method === "GET") {
    const response = {
      envVars: {
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
        AWS_REGION: process.env.AWS_REGION || 'NOT SET',
        S3_BUCKET: process.env.S3_BUCKET || 'NOT SET'
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    return;
  }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not found");
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Container server running on http://0.0.0.0:${PORT}`);
});
