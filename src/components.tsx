import { createContext, useContext } from '@/context'
import {
    AssetProducer,
    AssetRegistration,
    AssetType,
    formatSecondsToTime,
    renderingContext,
} from '@/rendering'
import { Fragment } from 'jsx-xml'
import { type } from 'os'
import path from 'path'

const trackContext = createContext<{ trackId: string } | null>(null)

function useTrackContext() {
    const context = useContext(trackContext)
    if (!context) {
        throw new Error('No track context found for a video asset component')
    }
    return context
}

export function AudioGain({ volume = 0 }) {
    const { id } = useProducerContext()

    return (
        <filter id={id + 'gain'}>
            <property name='window'>75</property>
            <property name='max_gain'>20dB</property>
            <property name='level'>{volume.toString()}</property>
            <property name='mlt_service'>volume</property>
        </filter>
    )
}

export function Asset({
    id,
    filepath,
    in: inTime,
    out,
    type,
    children,
}: {
    id: string
    filepath: string
    in: number | string
    out: number | string
    type: AssetType
    children?: any
}) {
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    const producer = context.producers.find((p) => p.id === id)
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type,
            in: inTime,
            out,
            parentTrackId: trackId,
        })
        return null
    }
    if (!producer) {
        throw new Error(`Producer for asset with id ${id} not found`)
    }

    const basename = path.basename(filepath)

    if (type === 'image') {
        return (
            <producerContext.Provider value={producer}>
                <producer {...producer.attributes} id={id}>
                    {producer.children}
                    <property name='resource'>{filepath}</property>
                    <property name='shotcut:skipConvert'>1</property>
                    <property name='shotcut:caption'>{basename}</property>
                    {children}
                </producer>
            </producerContext.Provider>
        )
    }

    return (
        <producerContext.Provider value={producer}>
            <chain {...producer?.attributes} id={id}>
                {producer.children}
                <property name='resource'>{filepath}</property>
                <property name='shotcut:skipConvert'>1</property>
                <property name='shotcut:caption'>{basename}</property>
                {children}
            </chain>
        </producerContext.Provider>
    )
}

export const producerContext = createContext<AssetProducer | null>(null)

function useProducerContext() {
    const producer = useContext(producerContext)
    if (!producer) {
        throw new Error('No producer found in context')
    }
    return producer
}

export function PanningAnimation({}) {
    const producer = useProducerContext()
    const width = producer.properties['meta.media.width']
    const height = producer.properties['meta.media.height']
    const out = producer.attributes.out
    const id = producer.id
    const rect = `0=221.528 -7.60509 592.707 1927.94 1;00:00:02.733=-149.36 -1214.13 1334.59 4341 1`
    return (
        <filter id={id + 'transformFilter'}>
            <property name='background'>color:#00000000</property>
            <property name='mlt_service'>affine</property>
            <property name='shotcut:filter'>affineSizePosition</property>
            <property name='transition.fix_rotate_x'>0</property>
            <property name='transition.fill'>1</property>
            <property name='transition.distort'>0</property>
            <property name='transition.rect'>{rect}</property>
            <property name='transition.valign'>middle</property>
            <property name='transition.halign'>center</property>
            <property name='shotcut:animIn'>00:00:00.000</property>
            <property name='shotcut:animOut'>00:00:00.000</property>
            <property name='transition.threads'>0</property>
        </filter>
    )
}

export function BlankSpace({ length }) {
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            type: 'blank',
            length,
            parentTrackId: trackId,
        })
    }
    return null
}

export function Track({ id: trackId, name = 'track', children }) {
    const context = useContext(renderingContext)
    if (context.isRegistrationStep) {
        return (
            <trackContext.Provider value={{ trackId }}>
                {children}
            </trackContext.Provider>
        )
    }
    const assets = context.assets.filter((a) => a.parentTrackId === trackId)
    const type = getTrackType(assets)
    return (
        <trackContext.Provider value={{ trackId }}>
            {children}
            <playlist id={trackId}>
                {type === 'video' && (
                    <property name='shotcut:video'>1</property>
                )}
                {type === 'audio' && (
                    <property name='shotcut:audio'>1</property>
                )}
                <property name='shotcut:name'>{name}</property>

                {assets.map((x) => {
                    if (x.type === 'blank') {
                        return <blank length={x.length} />
                    }
                    return <entry producer={x.id} in={x.in} out={x.out} />
                })}
            </playlist>
        </trackContext.Provider>
    )
}

function groupBy<T, K extends string | number>(
    array: T[],
    keyFn: (item: T) => K,
): Record<K, T[]> {
    return array.reduce(
        (result, item) => {
            const groupKey = keyFn(item)
            ;(result[groupKey] = result[groupKey] || []).push(item)
            return result
        },
        {} as Record<K, T[]>,
    )
}

export function VideoRoot({ children }) {
    const context = useContext(renderingContext)
    let backgroundDuration = formatSecondsToTime(9999999)
    const playlists = groupBy(context.assets, (a) => a.parentTrackId!)
    return (
        <mlt
            LC_NUMERIC='C'
            version='7.30.0'
            title='Shotcut version 25.01.25'
            producer='main_bin'
            root={process.cwd()}
        >
            {children}
            <playlist id='main_bin'>
                <property name='xml_retain'>1</property>
            </playlist>
            <producer id='black' in='00:00:00.000' out={backgroundDuration}>
                <property name='length'>{backgroundDuration}</property>
                <property name='eof'>pause</property>
                <property name='resource'>0</property>
                <property name='aspect_ratio'>1</property>
                <property name='mlt_service'>color</property>
                <property name='mlt_image_format'>rgba</property>
                <property name='set.test_audio'>0</property>
            </producer>
            <playlist id='background'>
                <entry
                    producer='black'
                    in='00:00:00.000'
                    out={backgroundDuration}
                />
            </playlist>
            <tractor
                id='tractor1'
                title='Shotcut version 25.01.25'
                in={formatSecondsToTime(0)}
                out={formatSecondsToTime(3)}
            >
                <property name='shotcut'>1</property>
                <property name='shotcut:projectAudioChannels'>2</property>
                <property name='shotcut:projectFolder'>0</property>
                <property name='shotcut:trackHeight'>50</property>
                <property name='shotcut:skipConvert'>0</property>
                <track producer='background' />
                {Object.keys(playlists).map((trackId) => {
                    const type = getTrackType(playlists[trackId])

                    if (type === 'audio') {
                        return <track producer={trackId} hide='video' />
                    }
                    return <track producer={trackId} />
                })}
                {/* transitions are necessary to make audio tracks play one upon the other */}
                {Object.keys(playlists).map((trackId, index) => {
                    // const type = getTrackType(playlists[trackId])
                    // here we render even the last one because there is one additional playlist for the background
                    return (
                        <transition id={'transition' + index}>
                            <property name='a_track'>0</property>
                            <property name='b_track'>{index + 1}</property>
                            <property name='mlt_service'>mix</property>
                            <property name='always_active'>1</property>
                            <property name='sum'>1</property>
                        </transition>
                    )
                })}
            </tractor>
        </mlt>
    )
}

function getTrackType(assets: AssetRegistration[]) {
    const type = assets.reduce<AssetType | ''>((acc, i) => {
        if (i.type === 'video') {
            return 'video'
        }
        if (i.type === 'audio') {
            return 'audio'
        }
        return acc
    }, '')
    return type
}

export function VideoConsumer({ target }) {
    return (
        <consumer
            ab='160k'
            acodec='aac'
            channels='2'
            crf='23'
            deinterlacer='onefield'
            f='mp4'
            g='15'
            in='0'
            mlt_service='avformat'
            movflags='+faststart'
            preset='veryfast'
            real_time='-1'
            rescale='bilinear'
            target={target}
            threads='0'
            vcodec='libx264'
        />
    )
}

export function Profile({ width, height, fps = 30 }) {
    return (
        <profile
            description='PAL 4:3 DV or DVD'
            width={width}
            height={height}
            progressive='1'
            sample_aspect_num='1'
            sample_aspect_den='1'
            display_aspect_num='9'
            display_aspect_den='16'
            frame_rate_num={fps}
            frame_rate_den='1'
            colorspace='709'
        />
    )
}
