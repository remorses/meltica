import { Container, getContainer } from '@cloudflare/containers'

export class MelticaSpeedtestContainerObject extends Container {
    defaultPort = 8080
    sleepAfter = '1m'

    override onStart() {
        console.log('Speed test container started')
    }

    override onStop() {
        console.log('Speed test container stopped')
    }

    override onError(error: unknown) {
        console.error('Container error:', error)
    }
}

interface Env {
    CONTAINER: DurableObjectNamespace;
    R2_BUCKET: R2Bucket;
}

interface SpeedTestResult {
    uploadTime: number;
    downloadTime: number;
    uploadSpeed: string;
    downloadSpeed: string;
    fileKey: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/' && request.method === 'GET') {
            try {
                console.log('Starting speed test...');

                // 1. Get container with unique ID for each request
                const requestId = crypto.randomUUID();
                const containerId = env.CONTAINER.idFromName(`speed-test-${requestId}`);
                const container = env.CONTAINER.get(containerId);
                const generateUrl = new URL('/generate', request.url);

                console.log('Requesting file generation from container...');
                const generateStart = Date.now();
                const generateResp = await container.fetch(new Request(generateUrl));

                if (!generateResp.ok) {
                    return new Response(`Container error: ${generateResp.status}`, { status: 500 });
                }

                // 2. Upload stream directly to R2 with fixed length
                console.log('Starting R2 upload...');
                const uploadStart = Date.now();
                const fileKey = `speed-test/${crypto.randomUUID()}.bin`;

                // Create a FixedLengthStream to specify the length for R2
                const fileSize = 1024 * 1024 * 1024; // 1GB
                const fixedLengthStream = new FixedLengthStream(fileSize);

                if (generateResp.body) {
                    generateResp.body.pipeTo(fixedLengthStream.writable);
                }

                await env.R2_BUCKET.put(
                    fileKey,
                    fixedLengthStream.readable,
                    {
                        httpMetadata: {
                            contentType: "application/octet-stream"
                        }
                    }
                );

                const uploadTime = Date.now() - uploadStart;
                const uploadSpeedMBps = (1024 / (uploadTime / 1000)); // 1GB in MB / seconds

                console.log(`Upload completed in ${(uploadTime/1000).toFixed(2)}s (${uploadSpeedMBps.toFixed(2)} MB/s)`);

                // 3. Download test - get the file back from R2
                console.log('Starting R2 download...');
                const downloadStart = Date.now();

                const downloadObj = await env.R2_BUCKET.get(fileKey);
                if (!downloadObj) {
                    throw new Error('Failed to retrieve file from R2');
                }

                // Consume the stream to measure actual download time without storing in memory
                let bytesRead = 0;
                const reader = downloadObj.body!.getReader();
                
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        bytesRead += value.length;
                    }
                } finally {
                    reader.releaseLock();
                }
                
                const downloadTime = Date.now() - downloadStart;
                const downloadSpeedMBps = (1024 / (downloadTime / 1000)); // 1GB in MB / seconds

                console.log(`Download completed in ${downloadTime}ms (${downloadSpeedMBps.toFixed(2)} MB/s)`);
                console.log(`Downloaded ${bytesRead} bytes`);

                const result: SpeedTestResult = {
                    uploadTime,
                    downloadTime,
                    uploadSpeed: `${uploadSpeedMBps.toFixed(2)} MB/s`,
                    downloadSpeed: `${downloadSpeedMBps.toFixed(2)} MB/s`,
                    fileKey
                };

                return Response.json(result);

            } catch (error) {
                console.error('Speed test failed:', error);
                return new Response(JSON.stringify({
                    error: error instanceof Error ? error.message : "Unknown error"
                }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        return new Response('Speed test available at GET /', { status: 404 });
    },
};
