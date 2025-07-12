import { createServer } from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import { createHash, createHmac } from 'crypto';
import https from 'https';

const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

// R2 configuration
const S3_ENDPOINT = new URL(process.env.AWS_ENDPOINT_URL_S3!).hostname;
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

// Shared HTTPS agent to prevent memory leaks
const sharedAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 10, // Reasonable limit for concurrent uploads
  maxFreeSockets: 5,
  timeout: 600000
});

// Upload a single part to R2
async function uploadPart(partData: Buffer, partNumber: number, fileKey: string): Promise<{ partNumber: number; uploadTime: number }> {
  const bucketName = process.env.S3_BUCKET!;
  const path = `/${bucketName}/${fileKey}-part${partNumber}`;

  const uploadStart = Date.now();

  return new Promise((resolve, reject) => {
    let req: any = null;
    
    try {
      // Prepare headers
      const headers = {
        'Host': S3_ENDPOINT,
        'Content-Type': 'application/octet-stream',
        'Content-Length': partData.length.toString()
      };

      // Sign request
      const signedHeaders = createAWSSignatureV4('PUT', path, headers, partData);

      const options = {
        hostname: S3_ENDPOINT,
        port: 443,
        path: path,
        method: 'PUT',
        headers: signedHeaders,
        agent: sharedAgent // Use shared agent
      };

      req = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk); // Use Buffer array instead of string concatenation
        });

        res.on('end', () => {
          const uploadTime = Date.now() - uploadStart;
          
          // Clean up response data immediately
          const responseBody = chunks.length > 0 ? Buffer.concat(chunks).toString() : '';
          chunks.length = 0; // Clear array

          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log(`Part ${partNumber} uploaded in ${(uploadTime / 1000).toFixed(2)}s`);
            resolve({ partNumber, uploadTime });
          } else {
            reject(new Error(`Part ${partNumber} failed: ${res.statusCode} - ${responseBody}`));
          }
        });

        res.on('error', (error) => {
          reject(error);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Part ${partNumber} upload timeout`));
      });

      // Write the buffer directly
      req.write(partData);
      req.end();

    } catch (error) {
      if (req) {
        req.destroy();
      }
      reject(error);
    }
  });
}

// Single upload of entire 1GB file
async function uploadToS3Single(): Promise<{ uploadTime: number; fileKey: string }> {
  const fileKey = `speed-test-single/${randomUUID()}`;
  const bucketName = process.env.S3_BUCKET!;
  const path = `/${bucketName}/${fileKey}`;

  console.log('Starting single 1GB upload to S3...');
  
  const uploadStart = Date.now();

  return new Promise((resolve, reject) => {
    try {
      // Concatenate all parts into single buffer
      const fullData = Buffer.concat(dataParts);
      
      // Prepare headers
      const headers = {
        'Host': S3_ENDPOINT,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fullData.length.toString()
      };
      
      // Sign request
      const signedHeaders = createAWSSignatureV4('PUT', path, headers, fullData);
      
      // Create HTTPS request
      const agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 1,
        maxFreeSockets: 1,
        timeout: 600000
      });
      
      const options = {
        hostname: S3_ENDPOINT,
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
          const uploadSpeedMBps = 1024 / (uploadTime / 1000);
          
          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log(`\nSingle upload completed successfully!`);
            console.log(`Upload time: ${(uploadTime / 1000).toFixed(2)}s`);
            console.log(`Upload speed: ${uploadSpeedMBps.toFixed(2)} MB/s`);
            resolve({ uploadTime, fileKey });
          } else {
            reject(new Error(`Single upload failed: ${res.statusCode} - ${responseBody}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      // Write the full buffer
      req.write(fullData);
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
    // Simpler approach: upload in batches to control memory usage
    const results: { partNumber: number; uploadTime: number }[] = [];
    
    for (let batch = 0; batch < TOTAL_PARTS; batch += CONCURRENT_UPLOADS) {
      const batchPromises: Promise<{ partNumber: number; uploadTime: number }>[] = [];
      const batchEnd = Math.min(batch + CONCURRENT_UPLOADS, TOTAL_PARTS);
      
      // Start batch of concurrent uploads
      for (let i = batch; i < batchEnd; i++) {
        const promise = uploadPart(dataParts[i], i + 1, fileKey);
        batchPromises.push(promise);
        console.log(`Started upload for part ${i + 1}/${TOTAL_PARTS}`);
      }
      
      // Wait for all uploads in this batch to complete
      const batchResults = await Promise.allSettled(batchPromises);
      
      // Process results and handle any failures
      for (let i = 0; i < batchResults.length; i++) {
        const result = batchResults[i];
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          throw new Error(`Batch upload failed: ${result.reason}`);
        }
      }
      
      // Clear batch promises array to help GC
      batchPromises.length = 0;
      
      // Force garbage collection between batches
      if (global.gc) {
        global.gc();
      }
      
      console.log(`Completed batch ${Math.floor(batch / CONCURRENT_UPLOADS) + 1}/${Math.ceil(TOTAL_PARTS / CONCURRENT_UPLOADS)}`);
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

  if (url.pathname === "/upload-single" && req.method === "POST") {
    console.log("=== S3 SINGLE UPLOAD TEST STARTING ===");
    console.log("Environment variables:", {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
      AWS_REGION: process.env.AWS_REGION,
      S3_BUCKET: process.env.S3_BUCKET
    });
    console.log("Container timestamp:", new Date().toISOString());
    console.time("upload-single-test");

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
      console.log("Starting single upload test...");
      
      const result = await uploadToS3Single();

      console.timeEnd("upload-single-test");
      console.log("=== S3 SINGLE UPLOAD TEST COMPLETED SUCCESSFULLY ===");

      const response = {
        success: true,
        uploadTime: result.uploadTime,
        uploadSpeed: `${(1024 / (result.uploadTime / 1000)).toFixed(2)} MB/s`,
        fileKey: result.fileKey,
        uploadType: "single",
        timestamp: new Date().toISOString()
      };
      
      console.log("Single upload result:", JSON.stringify(response, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      console.error("=== S3 SINGLE UPLOAD TEST FAILED ===");
      console.error("Single upload failed:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      const errorDetails = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorStack: error instanceof Error ? error.stack : undefined,
        uploadType: "single",
        timestamp: new Date().toISOString()
      };
      
      console.log("Returning single upload error response:", JSON.stringify(errorDetails, null, 2));
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
        "POST /upload - test S3 upload speed (concurrent parts)",
        "POST /upload-single - test S3 upload speed (single file)",
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
