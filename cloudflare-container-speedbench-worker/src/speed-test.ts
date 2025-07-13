const FILE_SIZE = 1024 * 1024 * 1024; // 1GB
const PART_SIZE = 50 * 1024 * 1024; // 50MB per part
const TOTAL_PARTS = Math.ceil(FILE_SIZE / PART_SIZE); // 21 parts
const WORKER_URL = "https://meltica-speedtest-r2-containers-from-worker.remorses.workers.dev";

// Generate random data chunk
function generateRandomChunk(size: number): Uint8Array {
  const chunk = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    chunk[i] = Math.floor(Math.random() * 256);
  }
  return chunk;
}

// Upload a single part to the multipart upload
async function uploadPart(
  fileKey: string, 
  uploadId: string, 
  partNumber: number, 
  partData: Uint8Array
): Promise<{ partNumber: number; etag: string } | null> {
  try {
    console.log(`Starting upload of part ${partNumber} (${partData.length} bytes)`);
    
    // Convert to base64 for JSON transport
    const base64Data = btoa(String.fromCharCode(...partData));
    
    const response = await fetch(`${WORKER_URL}/upload-part`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileKey,
        partNumber,
        partData: base64Data
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Part ${partNumber} upload failed: ${response.status} - ${errorText}`);
      return null;
    }

    const result = await response.json();
    console.log(`Part ${partNumber} uploaded successfully with ETag: ${result.etag}`);
    return { partNumber, etag: result.etag };
  } catch (error) {
    console.error(`Part ${partNumber} upload error:`, error);
    return null;
  }
}

// Orchestrate parallel multipart upload using R2's native multipart API
async function orchestrateMultipartUpload(): Promise<{
  uploadTime: number;
  uploadSpeed: string;
  fileKey: string;
  parallelParts: number;
  downloadTime?: number;
  downloadSpeed?: string;
}> {
  const fileKey = `speed-test/${crypto.randomUUID()}.bin`;
  console.log(`=== STARTING R2 MULTIPART UPLOAD TEST ===`);
  console.log(`File key: ${fileKey}`);
  console.log(`Total size: ${FILE_SIZE} bytes (${(FILE_SIZE / (1024 * 1024)).toFixed(1)} MB)`);
  console.log(`Part size: ${PART_SIZE} bytes (${(PART_SIZE / (1024 * 1024)).toFixed(1)} MB)`);
  console.log(`Total parts: ${TOTAL_PARTS}`);

  // Step 1: Start multipart upload
  console.log('Starting multipart upload...');
  const startResponse = await fetch(`${WORKER_URL}/start-multipart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileKey })
  });

  if (!startResponse.ok) {
    const errorText = await startResponse.text();
    throw new Error(`Failed to start multipart upload: ${startResponse.status} - ${errorText}`);
  }

  const { fileKey: uploadId } = await startResponse.json();
  console.log(`Multipart upload started with ID: ${uploadId}`);

  const uploadStart = Date.now();

  // Step 2: Generate and upload all parts in parallel
  const uploadPromises: Promise<{ partNumber: number; etag: string } | null>[] = [];
  
  for (let partNumber = 1; partNumber <= TOTAL_PARTS; partNumber++) {
    // Calculate part size (last part might be smaller)
    const isLastPart = partNumber === TOTAL_PARTS;
    const currentPartSize = isLastPart ? FILE_SIZE - (PART_SIZE * (TOTAL_PARTS - 1)) : PART_SIZE;
    
    console.log(`Generating part ${partNumber} (${currentPartSize} bytes)`);
    const partData = generateRandomChunk(currentPartSize);
    
    // Start upload immediately (parallel)
    uploadPromises.push(uploadPart(fileKey, uploadId, partNumber, partData));
  }

  console.log(`Waiting for all ${TOTAL_PARTS} parts to upload...`);
  const uploadResults = await Promise.all(uploadPromises);
  
  // Filter out failed uploads and prepare parts array
  const successfulParts = uploadResults.filter(result => result !== null) as Array<{ partNumber: number; etag: string }>;
  
  if (successfulParts.length !== TOTAL_PARTS) {
    throw new Error(`Only ${successfulParts.length} out of ${TOTAL_PARTS} parts uploaded successfully`);
  }

  // Sort parts by part number (required for completion)
  successfulParts.sort((a, b) => a.partNumber - b.partNumber);

  console.log(`All ${TOTAL_PARTS} parts uploaded successfully`);

  // Step 3: Complete multipart upload
  console.log('Completing multipart upload...');
  const completeResponse = await fetch(`${WORKER_URL}/complete-multipart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileKey,
      parts: successfulParts
    })
  });

  if (!completeResponse.ok) {
    const errorText = await completeResponse.text();
    throw new Error(`Failed to complete multipart upload: ${completeResponse.status} - ${errorText}`);
  }

  const completeResult = await completeResponse.json();
  console.log('Multipart upload completed successfully:', completeResult);

  const uploadTime = Date.now() - uploadStart;
  const uploadSpeedMBps = (FILE_SIZE / (1024 * 1024)) / (uploadTime / 1000);

  console.log(`=== R2 MULTIPART UPLOAD COMPLETED ===`);
  console.log(`Total upload time: ${(uploadTime / 1000).toFixed(2)}s`);
  console.log(`Upload speed: ${uploadSpeedMBps.toFixed(2)} MB/s`);
  console.log(`Parts uploaded: ${TOTAL_PARTS}`);
  console.log(`Final file size: ${completeResult.size} bytes`);

  return {
    uploadTime,
    uploadSpeed: `${uploadSpeedMBps.toFixed(2)} MB/s`,
    fileKey,
    parallelParts: TOTAL_PARTS,
  };
}

// HTTP server for container
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/orchestrate-upload" && req.method === "GET") {
      try {
        console.log("=== ORCHESTRATING R2 MULTIPART UPLOAD ===");
        const result = await orchestrateMultipartUpload();
        return Response.json(result);
      } catch (error) {
        console.error("=== MULTIPART ORCHESTRATION FAILED ===");
        console.error("Error:", error);
        return Response.json({
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }, { status: 500 });
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
          "GET /orchestrate-upload - run R2 multipart upload test",
          "GET /generate - get 1GB of random data stream"
        ],
        config: {
          fileSize: `${(FILE_SIZE / (1024 * 1024)).toFixed(1)} MB`,
          partSize: `${(PART_SIZE / (1024 * 1024)).toFixed(1)} MB`,
          totalParts: TOTAL_PARTS,
          workerUrl: WORKER_URL,
          uploadType: "R2 Multipart Upload API"
        }
      });
    }
    
    return new Response("Not found", { status: 404 });
  },
});

// Generate a ReadableStream of random data (kept for backwards compatibility)
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

console.log(`Container server running on http://localhost:${server.port}`);
console.log(`Will orchestrate R2 multipart upload: ${TOTAL_PARTS} parallel parts of ${(PART_SIZE / (1024 * 1024)).toFixed(1)}MB each`);