import { AssetProducer } from "@/rendering"
import { createContext } from "jsx-xml"

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
