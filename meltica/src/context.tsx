import { AssetProducer, AssetRegistration } from 'meltica/src/rendering'
import { createContext, useContext } from 'xmlize'

export type CompositionContext = {
    width: number
    height: number
    resultFilePath: string
    fps: number
    duration?: number
}

export const compositionContext = createContext<CompositionContext | null>(null)
export type TrackContext = {
    trackId: string
}

export const trackContext = createContext<TrackContext | null>(null)
export type AssetContext = {
    producer: AssetProducer
    in?: number | string
    out?: number | string
}
export const assetContext = createContext<AssetContext | null>(null)

export let defaultRenderingContext = {
    assets: [] as AssetRegistration[],
    producers: [] as AssetProducer[],
    isRegistrationStep: true,
    jobId: '',
}

export const renderingContext = createContext(defaultRenderingContext)

export function useAssetContext() {
    const producer = useContext(assetContext)
    const { producers } = useContext(renderingContext)
    if (!producer) {
        throw new Error(`No asset context found`)
    }
    return producer
}
