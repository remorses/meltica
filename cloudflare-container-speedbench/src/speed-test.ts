import { s3 } from 'bun';

const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

// Configure S3 client for R2
const s3Config = {
  region: 'auto',
  endpoint: 'https://103e73569e2f6d4aea0fb679ceb8709b.r2.cloudflarestorage.com',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
};

// Generate a ReadableStream of random data
function createRandomDataStream(size: number): ReadableStream<Uint8Array> {
  let bytesGenerated = 0;
  const chunkSize = 64 * 1024; // 64KB chunks

  return new ReadableStream({
    pull(controller) {
      if (bytesGenerated >= size) {
        controller.close();
        return;
      }

      const remainingBytes = size - bytesGenerated;
      const currentChunkSize = Math.min(chunkSize, remainingBytes);

      // Generate random chunk
      const chunk = new Uint8Array(currentChunkSize);
      for (let i = 0; i < currentChunkSize; i++) {
        chunk[i] = Math.floor(Math.random() * 256);
      }

      controller.enqueue(chunk);
      bytesGenerated += currentChunkSize;
    }
  });
}

// Upload stream to S3 using Bun's built-in S3 client with multipart upload
async function uploadToS3(stream: ReadableStream<Uint8Array>): Promise<{ uploadTime: number; fileKey: string }> {
  const fileKey = `speed-test/${crypto.randomUUID()}.bin`;
  const bucketName = process.env.S3_BUCKET!;

  console.log('Starting S3 multipart upload with Bun S3 client...');
  console.log(`Target: s3://${bucketName}/${fileKey}`);
  console.log('S3 Config:', {
    region: s3Config.region,
    endpoint: s3Config.endpoint,
    accessKeyId: s3Config.accessKeyId ? 'SET' : 'NOT SET',
    secretAccessKey: s3Config.secretAccessKey ? 'SET' : 'NOT SET'
  });
  
  const uploadStart = Date.now();

  try {
    console.log('Creating S3 file object...');
    // Use Bun's S3 API with the configured endpoint
    const file = s3.file(`s3://${bucketName}/${fileKey}`, s3Config);
    console.log('S3 file object created successfully');

    console.log('Getting writer for multipart upload...');
    // Get a writer for multipart upload (Bun handles this automatically for large files)
    const writer = file.writer();
    console.log('Writer obtained successfully');

    const reader = stream.getReader();
    let totalBytesWritten = 0;
    let chunkCount = 0;
    const logInterval = 50 * 1024 * 1024; // Log every 50MB

    console.log('Starting to read and upload stream...');
    try {
      while (true) {
        const readStart = Date.now();
        const { done, value } = await reader.read();
        const readTime = Date.now() - readStart;

        if (done) {
          console.log('Stream reading completed');
          break;
        }

        if (value) {
          chunkCount++;
          const writeStart = Date.now();
          console.log(`Writing chunk ${chunkCount} (${value.length} bytes) - read took ${readTime}ms`);
          
          await writer.write(value);
          const writeTime = Date.now() - writeStart;
          
          totalBytesWritten += value.length;
          console.log(`Chunk ${chunkCount} written in ${writeTime}ms - total: ${(totalBytesWritten / (1024 * 1024)).toFixed(1)} MB`);

          if (totalBytesWritten % logInterval < value.length) { // Log every 50MB
            const elapsedTime = (Date.now() - uploadStart) / 1000;
            const currentSpeed = (totalBytesWritten / (1024 * 1024)) / elapsedTime;
            console.log(`Progress: ${(totalBytesWritten / (1024 * 1024)).toFixed(1)} MB written in ${elapsedTime.toFixed(1)}s (${currentSpeed.toFixed(2)} MB/s)`);
          }
        }
      }

      console.log('Closing writer to complete upload...');
      // Close the writer to complete the upload
      const endStart = Date.now();
      await writer.end();
      const endTime = Date.now() - endStart;
      console.log(`Writer closed successfully in ${endTime}ms`);

    } finally {
      reader.releaseLock();
      console.log('Stream reader released');
    }

    const uploadTime = Date.now() - uploadStart;
    const uploadSpeedMBps = 1024 / (uploadTime / 1000); // 1GB in MB / seconds

    console.log(
      `Multipart upload completed in ${(uploadTime / 1000).toFixed(2)}s (${uploadSpeedMBps.toFixed(2)} MB/s)`,
    );
    console.log(`Total bytes written: ${totalBytesWritten} (${(totalBytesWritten / (1024 * 1024)).toFixed(2)} MB)`);
    console.log(`Total chunks processed: ${chunkCount}`);

    return { uploadTime, fileKey };

  } catch (error) {
    console.error('Bun S3 upload failed:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

// HTTP server for container
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);

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
        return Response.json({
          success: false,
          error: "Missing environment variables",
          envVars: {
            AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
            AWS_REGION: process.env.AWS_REGION || 'NOT SET',
            S3_BUCKET: process.env.S3_BUCKET || 'NOT SET'
          }
        }, { status: 500 });
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
        return Response.json(response);
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
        
        return Response.json(errorDetails, { status: 500 });
      }
    }

    if (url.pathname === "/generate" && req.method === "GET") {
      console.log("Generating 1GB random data stream...");
      console.time("generate-initial-data");

      const stream = createRandomDataStream(FILE_SIZE);

      console.timeEnd("generate-initial-data");
      console.time("send-data");

      return new Response(stream, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": FILE_SIZE.toString(),
        },
      });
    }

    if (url.pathname === "/" && req.method === "GET") {
      return Response.json({
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
      });
    }

    if (url.pathname === "/env" && req.method === "GET") {
      return Response.json({
        envVars: {
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
          AWS_REGION: process.env.AWS_REGION || 'NOT SET',
          S3_BUCKET: process.env.S3_BUCKET || 'NOT SET'
        }
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Container server running on http://localhost:${server.port}`);
