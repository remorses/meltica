import { createServer } from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import { createHash, createHmac } from 'crypto';
import https from 'https';

const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

// R2 configuration
const R2_ENDPOINT = '103e73569e2f6d4aea0fb679ceb8709b.r2.cloudflarestorage.com';
const AWS_REGION = 'auto';
const AWS_SERVICE = 's3';

// Pre-generate a large buffer of random data to reuse
const PREGENERATED_CHUNK_SIZE = 100 * 1024 * 1024; // 100MB chunks
const preGeneratedData = Buffer.alloc(PREGENERATED_CHUNK_SIZE);
console.log('Pre-generating 100MB of random data...');
require('crypto').randomFillSync(preGeneratedData);
console.log('Random data pre-generated');

// Generate a Node.js Readable stream that reuses pre-generated data
function createRandomDataStream(size: number): Readable {
  let bytesGenerated = 0;

  return new Readable({
    highWaterMark: 128 * 1024 * 1024, // 128MB buffer for maximum throughput
    read() {
      if (bytesGenerated >= size) {
        this.push(null); // End the stream
        return;
      }

      const remainingBytes = size - bytesGenerated;
      const currentChunkSize = Math.min(PREGENERATED_CHUNK_SIZE, remainingBytes);

      // Reuse pre-generated data instead of creating new random data
      if (currentChunkSize === PREGENERATED_CHUNK_SIZE) {
        // Fast path: push entire pre-generated buffer
        this.push(preGeneratedData);
      } else {
        // Last chunk: slice the pre-generated buffer
        this.push(preGeneratedData.slice(0, currentChunkSize));
      }

      bytesGenerated += currentChunkSize;
    }
  });
}

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

// Direct HTTP upload to R2
async function uploadToS3(stream: Readable): Promise<{ uploadTime: number; fileKey: string }> {
  const fileKey = `speed-test/${randomUUID()}.bin`;
  const bucketName = process.env.S3_BUCKET!;
  const path = `/${bucketName}/${fileKey}`;

  console.log('Starting direct HTTP upload to R2...');
  console.log(`Target: https://${R2_ENDPOINT}${path}`);
  
  const uploadStart = Date.now();

  return new Promise((resolve, reject) => {
    try {
      // Prepare headers
      const headers = {
        'Host': R2_ENDPOINT,
        'Content-Type': 'application/octet-stream',
        'Content-Length': FILE_SIZE.toString()
      };
      
      // Sign request with UNSIGNED-PAYLOAD for streaming
      const signedHeaders = createAWSSignatureV4('PUT', path, headers, 'UNSIGNED-PAYLOAD');
      
      // Create HTTPS request with optimized settings
      const agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 10,
        maxFreeSockets: 10,
        timeout: 600000 // 10 minutes
      });
      
      const options = {
        hostname: R2_ENDPOINT,
        port: 443,
        path: path,
        method: 'PUT',
        headers: signedHeaders,
        agent: agent
      };
      
      console.log('Creating HTTPS request...');
      const req = https.request(options, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        
        res.on('end', () => {
          const uploadTime = Date.now() - uploadStart;
          const uploadSpeedMBps = 1024 / (uploadTime / 1000);
          
          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log(`Direct upload completed in ${(uploadTime / 1000).toFixed(2)}s (${uploadSpeedMBps.toFixed(2)} MB/s)`);
            resolve({ uploadTime, fileKey });
          } else {
            console.error(`Upload failed with status ${res.statusCode}: ${responseBody}`);
            reject(new Error(`Upload failed: ${res.statusCode} - ${responseBody}`));
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(error);
      });
      
      // Track upload progress
      let totalBytesWritten = 0;
      let lastLogTime = uploadStart;
      let lastLogBytes = 0;
      
      stream.on('data', (chunk) => {
        totalBytesWritten += chunk.length;
        const now = Date.now();
        
        // Log progress every 5 seconds or 100MB
        if (now - lastLogTime > 5000 || totalBytesWritten - lastLogBytes >= 100 * 1024 * 1024) {
          const elapsedTime = (now - uploadStart) / 1000;
          const currentSpeed = (totalBytesWritten / (1024 * 1024)) / elapsedTime;
          const instantSpeed = ((totalBytesWritten - lastLogBytes) / (1024 * 1024)) / ((now - lastLogTime) / 1000);
          
          console.log(`Progress: ${(totalBytesWritten / (1024 * 1024)).toFixed(1)} MB uploaded in ${elapsedTime.toFixed(1)}s (avg: ${currentSpeed.toFixed(2)} MB/s, current: ${instantSpeed.toFixed(2)} MB/s)`);
          
          lastLogTime = now;
          lastLogBytes = totalBytesWritten;
        }
      });
      
      // Pipe stream to request
      stream.pipe(req);
      
      stream.on('end', () => {
        console.log(`Total bytes uploaded: ${totalBytesWritten} (${(totalBytesWritten / (1024 * 1024)).toFixed(2)} MB)`);
      });
      
    } catch (error) {
      console.error('Direct upload failed:', error);
      reject(error);
    }
  });
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
      console.log("Creating random data stream...");
      const stream = createRandomDataStream(FILE_SIZE);
      console.log("Random data stream created, starting upload...");
      
      const result = await uploadToS3(stream);

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
    console.log("Generating 1GB random data stream...");
    console.time("generate-initial-data");

    const stream = createRandomDataStream(FILE_SIZE);

    console.timeEnd("generate-initial-data");
    console.time("send-data");

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Length": FILE_SIZE.toString(),
    });
    
    stream.pipe(res);
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
