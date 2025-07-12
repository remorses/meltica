import { Container, getContainer } from '@cloudflare/containers'

export class MelticaInitialContainer extends Container {
    defaultPort = 9224
    // Time before container sleeps due to inactivity (default: 30s)
    sleepAfter = '2m'
    // Environment variables passed to the container
    envVars = {
        MESSAGE: 'I was passed in via the container class!',
    }

    // // Optional lifecycle hooks
    // override onStart() {
    //     console.log('Container successfully started')
    // }

    // override onStop() {
    //     console.log('Container successfully shut down')
    // }

    // override onError(error: unknown) {
    //     console.log('Container error:', error)
    // }
}


export default {
    async fetch(request, env) {
        const id = 'container'
        const containerId = env.CONTAINER.idFromName(`/container/${id}`)
        const container = env.CONTAINER.get(containerId)
        return await container.fetch(request)
    },
}
