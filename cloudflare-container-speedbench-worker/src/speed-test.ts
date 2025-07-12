const FILE_SIZE = 1024 * 1024 * 1024; // 1GB

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

// HTTP server for container
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    
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
      return new Response("Container ready. Use GET /generate to get 1GB of random data.");
    }
    
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Container server running on http://localhost:${server.port}`);