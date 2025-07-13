import { Container, getContainer } from '@cloudflare/containers'

export class MelticaSpeedtestContainerObjectFromWorker extends Container {
    defaultPort = 8080
    sleepAfter = '1m'
    env: Env

    constructor(state: DurableObjectState, env: Env) {
        super(state, env)
        this.env = env
    }

    override onStart() {
        console.log('Speed test container started')
    }

    override onStop() {
        console.log('Speed test container stopped')
    }

    override onError(error: unknown) {
        console.error('Container error:', error)
    }

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)

        if (url.pathname === '/speed-test' && request.method === 'POST') {
            try {
                // Start container orchestrated parallel upload test
                const orchestrateUrl = 'http://localhost:8080/orchestrate-upload'
                console.log('Starting container orchestrated parallel upload test...')
                const testStart = Date.now()
                
                const orchestrateResp = await this.containerFetch(new Request(orchestrateUrl, {
                    method: 'GET'
                }), 8080)
                
                if (!orchestrateResp.ok) {
                    const errorText = await orchestrateResp.text()
                    throw new Error(`Container orchestration error: ${orchestrateResp.status} - ${errorText}`)
                }

                const result = await orchestrateResp.json() as any
                const totalTime = Date.now() - testStart

                console.log(`Container orchestrated test completed in ${totalTime}ms`)

                return Response.json({
                    uploadTime: result.uploadTime,
                    downloadTime: result.downloadTime || 0,
                    uploadSpeed: result.uploadSpeed,
                    downloadSpeed: result.downloadSpeed || 'N/A',
                    fileKey: result.fileKey,
                    parallelParts: result.parallelParts,
                    orchestrationTime: totalTime
                })
            } catch (error) {
                return new Response(
                    JSON.stringify({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                    }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
            }
        }

        return super.fetch(request)
    }
}

interface Env {
    CONTAINER: DurableObjectNamespace
    R2_BUCKET: R2Bucket
}

interface SpeedTestResult {
    uploadTime: number
    downloadTime: number
    uploadSpeed: string
    downloadSpeed: string
    fileKey: string
    parallelParts?: number
    orchestrationTime?: number
}

// Global variable to store multipart uploads
const activeMultipartUploads = new Map<string, R2MultipartUpload>()

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url)

        // Start multipart upload
        if (url.pathname === '/start-multipart' && request.method === 'POST') {
            try {
                const { fileKey } = await request.json() as { fileKey: string }
                
                console.log(`Starting multipart upload for ${fileKey}`)
                
                const multipartUpload = await env.R2_BUCKET.createMultipartUpload(fileKey, {
                    httpMetadata: {
                        contentType: 'application/octet-stream',
                    },
                })

                // Store the multipart upload for later use
                activeMultipartUploads.set(fileKey, multipartUpload)

                console.log(`Multipart upload started for ${fileKey}`)
                
                return Response.json({ 
                    fileKey,
                    uploadId: fileKey // Using fileKey as identifier
                })
            } catch (error) {
                console.error('Failed to start multipart upload:', error)
                return new Response(
                    JSON.stringify({
                        error: error instanceof Error ? error.message : 'Unknown error'
                    }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                )
            }
        }

        // Upload part for multipart upload
        if (url.pathname === '/upload-part' && request.method === 'POST') {
            try {
                const { fileKey, partNumber, partData } = await request.json() as {
                    fileKey: string
                    partNumber: number  
                    partData: string // base64 encoded
                }

                console.log(`Uploading part ${partNumber} for multipart upload ${fileKey}`)
                
                const multipartUpload = activeMultipartUploads.get(fileKey)
                if (!multipartUpload) {
                    throw new Error(`No active multipart upload found for ${fileKey}`)
                }
                
                // Decode base64 data
                const binaryData = Uint8Array.from(atob(partData), c => c.charCodeAt(0))
                
                // Upload part to R2 multipart upload
                const uploadedPart = await multipartUpload.uploadPart(partNumber, binaryData)

                console.log(`Part ${partNumber} uploaded with ETag: ${uploadedPart.etag}`)
                
                return Response.json({ 
                    success: true, 
                    partNumber,
                    etag: uploadedPart.etag,
                    size: binaryData.length 
                })
            } catch (error) {
                console.error('Part upload failed:', error)
                return new Response(
                    JSON.stringify({
                        error: error instanceof Error ? error.message : 'Unknown error'
                    }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                )
            }
        }

        // Complete multipart upload
        if (url.pathname === '/complete-multipart' && request.method === 'POST') {
            try {
                const { fileKey, parts } = await request.json() as {
                    fileKey: string
                    parts: Array<{ partNumber: number; etag: string }>
                }

                console.log(`Completing multipart upload ${fileKey} with ${parts.length} parts`)

                const multipartUpload = activeMultipartUploads.get(fileKey)
                if (!multipartUpload) {
                    throw new Error(`No active multipart upload found for ${fileKey}`)
                }

                // Convert to R2UploadedPart format
                const uploadedParts = parts.map(part => ({
                    partNumber: part.partNumber,
                    etag: part.etag
                }))

                // Complete the multipart upload
                const completedObject = await multipartUpload.complete(uploadedParts)

                // Clean up stored multipart upload
                activeMultipartUploads.delete(fileKey)

                console.log(`Multipart upload completed successfully: ${completedObject.key}`)

                return Response.json({ 
                    success: true, 
                    fileKey: completedObject.key,
                    etag: completedObject.etag,
                    size: completedObject.size,
                    partsCount: parts.length
                })
            } catch (error) {
                console.error('Failed to complete multipart upload:', error)
                return new Response(
                    JSON.stringify({
                        error: error instanceof Error ? error.message : 'Unknown error'
                    }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                )
            }
        }

        if (url.pathname === '/' && request.method === 'GET') {
            try {
                // Get container with unique ID for each request
                const requestId = crypto.randomUUID()
                const containerId = env.CONTAINER.idFromName(
                    `speed-test-from-worker-${requestId}`,
                )
                const containerStub = env.CONTAINER.get(containerId)

                // Run speed test through container method
                const speedTestRequest = new Request(
                    new URL('/speed-test', request.url),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )

                const response = await containerStub.fetch(speedTestRequest)
                const result = (await response.json()) as SpeedTestResult

                return Response.json(result)
            } catch (error) {
                console.error('Speed test failed:', error)
                return new Response(
                    JSON.stringify({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                    }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
            }
        }

        return new Response('Speed test available at GET /', { status: 404 })
    },
}