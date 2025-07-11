import { Container, loadBalance, getContainer } from '@cloudflare/containers'
import { Hono } from 'hono'

export class MelticaInitialContainer extends Container {

    defaultPort = 9224
    // Time before container sleeps due to inactivity (default: 30s)
    sleepAfter = '2m'
    // Environment variables passed to the container
    envVars = {
        MESSAGE: 'I was passed in via the container class!',
    }

    // Optional lifecycle hooks
    override onStart() {
        console.log('Container successfully started')
    }

    override onStop() {
        console.log('Container successfully shut down')
    }

    override onError(error: unknown) {
        console.log('Container error:', error)
    }
}

// Create Hono app with proper typing for Cloudflare Workers
const app = new Hono<{
    Bindings: { CONTAINER: DurableObjectNamespace<MelticaInitialContainer> }
}>()


// Route requests to a specific container using the container ID
app.get('/', async (c) => {
    const id = 'container'
    const containerId = c.env.CONTAINER.idFromName(`/container/${id}`)
    const container = c.env.CONTAINER.get(containerId)
    return await container.fetch(c.req.raw)
})

export default app
