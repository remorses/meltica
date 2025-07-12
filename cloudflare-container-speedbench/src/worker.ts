import { Container, getContainer } from '@cloudflare/containers'

export class MelticaSpeedtestContainerObject extends Container {
    defaultPort = 8080
    sleepAfter = '5m'
    env: Env
    envVars: Record<string, string>

    constructor(state: DurableObjectState, env: Env) {
        super(state, env)
        this.env = env
        this.envVars = {
            AWS_ACCESS_KEY_ID: this.env.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: this.env.AWS_SECRET_ACCESS_KEY,
            AWS_REGION: this.env.AWS_REGION,
            S3_BUCKET: this.env.S3_BUCKET
        }
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
                const result = await this.runContainerUploadTest()
                return Response.json(result)
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

    async runContainerUploadTest(): Promise<SpeedTestResult> {
        console.log('Starting container upload test...')

        // Call the container's upload endpoint
        const uploadUrl = 'http://localhost:8080/upload'
        console.log('Requesting S3 upload from container...')
        const testStart = Date.now()
        const uploadResp = await this.containerFetch(new Request(uploadUrl, {
            method: 'POST'
        }),8080)

        if (!uploadResp.ok) {
            const errorText = await uploadResp.text()
            console.error(`Container upload error: ${uploadResp.status}`)
            console.error(`Container error response:`, errorText)
            throw new Error(`Container upload error: ${uploadResp.status} - ${errorText}`)
        }

        const result = await uploadResp.json() as any
        const totalTime = Date.now() - testStart

        console.log(`Container upload test completed in ${totalTime}ms`)

        return {
            uploadTime: result.uploadTime,
            downloadTime: 0, // No download in this test
            uploadSpeed: result.uploadSpeed,
            downloadSpeed: 'N/A',
            fileKey: result.fileKey,
        }
    }
}

interface Env {
    CONTAINER: DurableObjectNamespace
    R2_BUCKET: R2Bucket
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    AWS_REGION: string
    S3_BUCKET: string
}

interface SpeedTestResult {
    uploadTime: number
    downloadTime: number
    uploadSpeed: string
    downloadSpeed: string
    fileKey: string
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url)

        if (url.pathname === '/' && request.method === 'GET') {
            try {
                // Get container with unique ID for each request
                const requestId = crypto.randomUUID()
                const containerId = env.CONTAINER.idFromName(
                    `speed-test-${requestId}`,
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
