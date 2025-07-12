import { createServer } from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import { createHash, createHmac } from 'crypto';
import https from 'https';

const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

// R2 configuration
const R2_ENDPOINT = new URL(process.env.AWS_ENDPOINT_URL_S3!).hostname;
const AWS_REGION = 'auto';
const AWS_SERVICE = 's3';

// Pre-generate full 1GB of data in memory using 100MB template
const PART_SIZE = 100 * 1024 * 1024; // 100MB parts
const TOTAL_PARTS = 10; // 10 x 100MB = 1GB
const CONCURRENT_UPLOADS = 5;

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

// Create AWS Signature V4 for S3 requests
function createAWSSignatureV4(
  method: string,
  path: string,
  headers: Record<string, string>,
  payload: Buffer | string = ''
): Record<string, string> {
  const accessKey = process.env.AWS_ACCESS_KEY_ID!;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY!;
  
  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  
  // Create canonical request
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(([k, v]) => `${k.toLowerCase()}:${v.trim()}`)
    .join('\n');
  
  const signedHeaders = Object.keys(headers)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(k => k.toLowerCase())
    .join(';');
  
  const payloadHash = payload === 'UNSIGNED-PAYLOAD' ? 'UNSIGNED-PAYLOAD' : createHash('sha256').update(payload).digest('hex');
  
  const canonicalRequest = [
    method,
    path,
    '',
    canonicalHeaders,
    '',
    signedHeaders,
    payloadHash
  ].join('\n');
  
  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${AWS_REGION}/${AWS_SERVICE}/aws4_request`;
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\n');
  
  // Calculate signature
  const kDate = createHmac('sha256', `AWS4${secretKey}`).update(dateStamp).digest();
  const kRegion = createHmac('sha256', kDate).update(AWS_REGION).digest();
  const kService = createHmac('sha256', kRegion).update(AWS_SERVICE).digest();
  const kSigning = createHmac('sha256', kService).update('aws4_request').digest();
  const signature = createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  
  // Create authorization header
  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
  return {
    ...headers,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    'Authorization': authorizationHeader
  };
}

// Upload a single part to R2
async function uploadPart(partData: Buffer, partNumber: number, fileKey: string): Promise<{ partNumber: number; uploadTime: number }> {
  const bucketName = process.env.S3_BUCKET!;
  const path = `/${bucketName}/${fileKey}-part${partNumber}`;
  
  const uploadStart = Date.now();

  return new Promise((resolve, reject) => {
    try {
      // Prepare headers
      const headers = {
        'Host': R2_ENDPOINT,
        'Content-Type': 'application/octet-stream',
        'Content-Length': partData.length.toString()
      };
      
      // Sign request
      const signedHeaders = createAWSSignatureV4('PUT', path, headers, partData);
      
      // Create HTTPS request
      const agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 20, // Increased for concurrent uploads
        maxFreeSockets: 20,
        timeout: 600000
      });
      
      const options = {
        hostname: R2_ENDPOINT,
        port: 443,
        path: path,
        method: 'PUT',
        headers: signedHeaders,
        agent: agent
      };
      
      const req = https.request(options, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        
        res.on('end', () => {
          const uploadTime = Date.now() - uploadStart;
          
          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log(`Part ${partNumber} uploaded in ${(uploadTime / 1000).toFixed(2)}s`);
            resolve({ partNumber, uploadTime });
          } else {
            reject(new Error(`Part ${partNumber} failed: ${res.statusCode} - ${responseBody}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      // Write the buffer directly
      req.write(partData);
      req.end();
      
    } catch (error) {
      reject(error);
    }
  });
}

// Concurrent upload of all parts
async function uploadToS3(unused?: any): Promise<{ uploadTime: number; fileKey: string }> {
  const fileKey = `speed-test/${randomUUID()}`;

  console.log('Starting concurrent multi-part upload to R2...');
  console.log(`Uploading ${TOTAL_PARTS} parts of ${PART_SIZE / (1024 * 1024)}MB each with ${CONCURRENT_UPLOADS} concurrent connections`);
  
  const uploadStart = Date.now();
  
  try {
    // Upload parts with controlled concurrency
    let partIndex = 0;
    const activeUploads = new Map<Promise<{ partNumber: number; uploadTime: number }>, number>();
    const results: { partNumber: number; uploadTime: number }[] = [];
    
    // Start initial concurrent uploads
    while (partIndex < CONCURRENT_UPLOADS && partIndex < TOTAL_PARTS) {
      const promise = uploadPart(dataParts[partIndex], partIndex + 1, fileKey);
      activeUploads.set(promise, partIndex);
      console.log(`Started upload for part ${partIndex + 1}/${TOTAL_PARTS}`);
      partIndex++;
    }
    
    // Process uploads as they complete
    while (activeUploads.size > 0) {
      const completed = await Promise.race(activeUploads.keys());
      results.push(completed);
      activeUploads.delete(completed as any);
      
      // Start next upload if available
      if (partIndex < TOTAL_PARTS) {
        const promise = uploadPart(dataParts[partIndex], partIndex + 1, fileKey);
        activeUploads.set(promise, partIndex);
        console.log(`Started upload for part ${partIndex + 1}/${TOTAL_PARTS}`);
        partIndex++;
      }
    }
    
    const uploadTime = Date.now() - uploadStart;
    const uploadSpeedMBps = 1024 / (uploadTime / 1000);
    
    console.log(`\nAll parts uploaded successfully!`);
    console.log(`Total upload time: ${(uploadTime / 1000).toFixed(2)}s`);
    console.log(`Upload speed: ${uploadSpeedMBps.toFixed(2)} MB/s`);
    
    // Log individual part times
    const partTimes = results.sort((a, b) => a.partNumber - b.partNumber);
    console.log('\nPart upload times:');
    partTimes.forEach(({ partNumber, uploadTime }) => {
      const speed = (PART_SIZE / (1024 * 1024)) / (uploadTime / 1000);
      console.log(`  Part ${partNumber}: ${(uploadTime / 1000).toFixed(2)}s (${speed.toFixed(2)} MB/s)`);
    });

    return { uploadTime, fileKey };

  } catch (error) {
    console.error('Concurrent upload failed:', error);
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
