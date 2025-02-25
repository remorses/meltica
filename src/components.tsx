import { createContext, useContext } from '@/context'
import {
    AssetProducer,
    AssetRegistration,
    AssetType,
    formatSecondsToTime,
    renderingContext,
} from '@/rendering'
import dedent from 'dedent'

import { render, Fragment } from 'jsx-xml'
import { type } from 'os'
import path from 'path'
import { text } from 'stream/consumers'

type TrackContext = {
    trackId: string
}

const trackContext = createContext<TrackContext | null>(null)

function useTrackContext() {
    const context = useContext(trackContext)
    if (!context) {
        throw new Error('No track context found for a video asset component')
    }
    return context
}

export function AudioGain({ volume = 0 }) {
    const { producer } = useProducerContext()
    const id = producer.id

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
    in?: number | string
    out?: number | string
    type: AssetType
    children?: any
}) {
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    const producer = context.producers.find((p) => p.id === id)
    const inWithDefault = inTime ?? producer?.attributes.in
    const outWithDefault = out ?? producer?.attributes.out
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type,
            in: inWithDefault,
            out: outWithDefault,
            parentTrackId: trackId,
        })
        return null
    }
    if (!producer) {
        throw new Error(`Producer for asset with id ${id} not found`)
    }

    const basename = path.basename(filepath)
    const assetCtx: AssetContext = {
        producer,
        in: inWithDefault,
        out: outWithDefault,
    }
    if (type === 'image') {
        return (
            <assetContext.Provider value={assetCtx}>
                <producer {...producer.attributes} id={id}>
                    {producer.children}
                    <property name='resource'>{filepath}</property>
                    <property name='shotcut:skipConvert'>1</property>
                    <property name='shotcut:caption'>{basename}</property>
                    {children}
                </producer>
            </assetContext.Provider>
        )
    }

    return (
        <assetContext.Provider value={assetCtx}>
            <chain {...producer?.attributes} id={id}>
                {producer.children}
                <property name='resource'>{filepath}</property>
                <property name='shotcut:skipConvert'>1</property>
                <property name='shotcut:caption'>{basename}</property>
                {children}
            </chain>
        </assetContext.Provider>
    )
}

type AssetContext = {
    producer: AssetProducer
    in?: number | string
    out?: number | string
}

export const assetContext = createContext<AssetContext | null>(null)

function useProducerContext() {
    const producer = useContext(assetContext)
    if (!producer) {
        throw new Error('No producer found in context')
    }
    return producer
}

function useAssetSize() {
    const { producer } = useProducerContext()
    const width = parseInt(
        producer.properties['meta.media.width'] ||
            producer.properties['meta.media.0.codec.width'] ||
            '0',
    )
    const height = parseInt(
        producer.properties['meta.media.height'] ||
            producer.properties['meta.media.0.codec.height'] ||
            '0',
    )
    return {
        height,
        width,
    }
}

function renderRectKeyframe({ time, top, left, width, height }) {
    // format is keyframes delimited by semicolons, with keyframes in format {start}={left} {top} {width} {height} 1
    return `${formatSecondsToTime(time)}=${left} ${top} ${width} ${height} 1`
}

export function PanningAnimation({}) {
    const { producer, in: inTime, out: outTime } = useProducerContext()

    const { height: videoHeight, width: videoWidth } =
        useContext(videoRootContext)!

    const out = producer.attributes.out
    const id = producer.id
    const { height, width } = useAssetSize()

    // Assert and convert image dimensions to numbers
    if (!width || !height) {
        console.log(producer)
        throw new Error('Media width and height must be defined')
    }

    // This effect creates a dynamic pan and zoom effect across images
    // Uses negative positioning to allow movement from outside the frame
    // Zooms in slightly and pans across the image for a more dramatic effect
    // The image can move beyond the video boundaries using negative coordinates

    // Calculate initial zoom level (slightly zoomed in)
    const zoomFactor = 1.5
    const scaledWidth = width * zoomFactor
    const scaledHeight = height * zoomFactor

    // Calculate random starting and ending positions
    // Using negative values allows the image to move from outside the frame
    const startLeft = -scaledWidth * 0.2 // Start with image partially off-screen
    const startTop = -scaledHeight * 0.1
    const endLeft = -(scaledWidth - videoWidth) // Pan to show other side
    const endTop = -(scaledHeight - videoHeight)

    const start = renderRectKeyframe({
        time: 0,
        top: startTop,
        left: startLeft,
        width: scaledWidth,
        height: scaledHeight,
    })

    const end = renderRectKeyframe({
        time: outTime,
        top: endTop,
        left: endLeft,
        width: scaledWidth,
        height: scaledHeight,
    })

    const rect = `${start};${end}`

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
            duration: length,
            parentTrackId: trackId,
        })
    }
    return null
}

export function Track({ id: trackId, name = 'track', children }) {
    const context = useContext(renderingContext)
    const trackCtx = { trackId }
    if (context.isRegistrationStep) {
        return (
            <trackContext.Provider value={trackCtx}>
                {children}
            </trackContext.Provider>
        )
    }
    const assets = context.assets.filter((a) => a.parentTrackId === trackId)

    const type = getTrackType(assets)
    return (
        <trackContext.Provider value={trackCtx}>
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
                        return <blank length={x.duration} />
                    }

                    const producer = context.producers.find(
                        (p) => p.id === x.id,
                    )
                    let inTime = formatSecondsToTime(
                        x.in ?? producer?.attributes.in,
                    )

                    return (
                        <entry
                            producer={x.id}
                            in={inTime}
                            out={formatSecondsToTime(
                                x.out ?? producer?.attributes.out,
                            )}
                        />
                    )
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

type VideoRootContext = {
    width: number
    height: number
    resultFilePath: string
    fps: number
    duration?: number
}

const videoRootContext = createContext<VideoRootContext | null>(null)

export function VideoRoot({
    children,

    ...rootProps
}: VideoRootContext & { children: any }) {
    const context = useContext(renderingContext)
    let backgroundDuration = formatSecondsToTime(9999999)
    const playlists = groupBy(context.assets, (a) => a.parentTrackId!)
    const { resultFilePath, height, width, duration, fps } = rootProps
    return (
        <videoRootContext.Provider value={rootProps}>
            <mlt
                LC_NUMERIC='C'
                version='7.30.0'
                title='Shotcut version 25.01.25'
                producer='main_bin'
                // root={process.cwd()}
            >
                <consumer
                    ab='160k'
                    acodec='aac'
                    channels='2'
                    crf='23'
                    deinterlacer='onefield'
                    f='mp4'
                    g='15'
                    in='0'
                    out={formatSecondsToTime(duration)}
                    mlt_service='avformat'
                    movflags='+faststart'
                    preset='veryfast'
                    real_time='-1'
                    rescale='bilinear'
                    target={resultFilePath}
                    threads='0'
                    vcodec='libx264'
                />
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
                {children}
                <playlist id='main_bin'>
                    <property name='xml_retain'>1</property>
                </playlist>
                <producer
                    id='black'
                    in={formatSecondsToTime(0)}
                    out={backgroundDuration}
                >
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
                        in={formatSecondsToTime(0)}
                        out={backgroundDuration}
                    />
                </playlist>
                <tractor
                    id='mainTractor'
                    title='Shotcut version 25.01.25'
                    in={formatSecondsToTime(0)}
                    // out={formatSecondsToTime(3)}
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
                        const type = getTrackType(playlists[trackId])
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
                    {/* <transition id={'transitionCairoBackground'}>
                        <property name='a_track'>0</property>
                        <property name='b_track'>1</property>
                        <property name='version'>0.1</property>
                        <property name='mlt_service'>
                            frei0r.cairoblend
                        </property>
                        <property name='threads'>0</property>
                        <property name='disable'>0</property>
                    </transition> */}
                    {Object.keys(playlists).map((trackId, index) => {
                        const type = getTrackType(playlists[trackId])
                        if (type === 'audio') {
                            return null
                        }
                        return (
                            <transition id={'transitionCairo' + index}>
                                <property name='a_track'>1</property>
                                <property name='b_track'>{index + 1}</property>
                                <property name='version'>0.1</property>
                                <property name='mlt_service'>
                                    frei0r.cairoblend
                                </property>
                                <property name='threads'>0</property>
                                <property name='disable'>0</property>
                            </transition>
                        )
                    })}
                </tractor>
            </mlt>
        </videoRootContext.Provider>
    )
}

export function RichText({
    id,
    html: htmlText,
    left: left_,
    top: top_,
    width: width_,
    height = 100,
    fontSize = 70,
    color = '#fff',
    children,
    duration,
}: {
    id: string
    html: any
    left?: number
    top?: number
    width?: number
    height?: number
    fontSize?: number
    color?: string
    children?: any
    duration: any
}) {
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            type: 'text',
            id,
            in: 0,
            out: duration,
            parentTrackId: trackId,
        })
        return null
    }
    const renderedHtmlText = render(htmlText, {}).end({
        headless: true,
        allowEmptyTags: true,
        indentTextOnlyNodes: false,
    })
    const html = dedent/* html */ `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
    <html>
        <head>
            <meta name="qrichtext" content="1" />
            <meta charset="utf-8" />
            <style type="text/css">
                p,
                li {
                    white-space: pre-wrap;
                }
                hr {
                    height: 1px;
                    border-width: 0;
                }
                li.unchecked::marker {
                    content: '\\2610';
                }
                li.checked::marker {
                    content: '\\2612';
                }
            </style>
        </head>
        <body
            style="
                font-family: 'Inter', '.AppleSystemUIFont', sans-serif;
                font-size: ${fontSize};
                color: ${color};
                font-weight: 400;
                font-style: normal;
            "
        >${renderedHtmlText}</body>
    </html>

    `
    const { height: videoHeight, width: videoWidth } =
        useContext(videoRootContext)!
    let left = left_ ?? 0
    let top = top_ ?? 0
    let width = width_ ?? videoWidth

    const geometry = `${left} ${top} ${width} ${height} 1`
    return (
        <producer id={id} in='00:00:00.000' out='03:59:59.960'>
            <property name='length'>04:00:00.000</property>
            <property name='eof'>pause</property>
            <property name='resource'>#00000000</property>
            <property name='aspect_ratio'>1</property>
            <property name='mlt_service'>color</property>
            <property name='mlt_image_format'>rgba</property>
            <property name='shotcut:caption'>transparent and text</property>
            <property name='shotcut:detail'>transparent</property>
            <property name='ignore_points'>0</property>
            <property name='seekable'>1</property>
            <property name='meta.shotcut.vui'>1</property>
            <filter id={id + 'Filter'} out='00:00:03.960'>
                <property name='argument'>text</property>
                <property name='geometry'>{geometry}</property>
                <property name='family'>Helvetica</property>
                <property name='size'>60</property>
                <property name='weight'>7000</property>
                <property name='style'>normal</property>
                <property name='fgcolour'>{color}</property>
                <property name='bgcolour'>#00000000</property>
                <property name='olcolour'>#aa000000</property>
                <property name='pad'>0</property>
                <property name='halign'>center</property>
                <property name='valign'>top</property>
                <property name='outline'>3</property>
                <property name='pixel_ratio'>1</property>
                <property name='opacity'>1</property>
                <property name='mlt_service'>qtext</property>
                <property name='shotcut:filter'>richText</property>
                <property name='html'>{html}</property>
                <property name='shotcut:usePointSize'>1</property>
                <property name='shotcut:pointSize'>60</property>
                <property name='overflow-y'>1</property>
            </filter>
            {children}
        </producer>
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

export function CropRect({
    id,
    left = 0,
    top = 0,
    width: cropWidth,
    height: cropHeight,
    radius = 0,
}: {
    /** The unique identifier for the filter */
    id: string
    /** The x coordinate of the crop rectangle (default 0) */
    left?: number
    /** The y coordinate of the crop rectangle (default 0) */
    top?: number
    /** The width of the crop rectangle (defaults to asset width) */
    width?: number
    /** The height of the crop rectangle (defaults to asset height) */
    height?: number
    /** The corner radius of the crop rectangle, from 0 to 1 where 0 is sharp corners and 1 is maximum rounding */
    radius?: number
}) {
    const { height: videoHeight, width: videoWidth } =
        useContext(videoRootContext)!
    const { height, width } = useAssetSize()
    const rect = `${left} ${top} ${cropWidth ?? videoWidth} ${cropHeight ?? videoHeight} 1`
    return (
        <filter id={id}>
            <property name='rect'>{rect}</property>
            <property name='circle'>0</property>
            <property name='color'>#ff000000</property>
            <property name='radius'>{radius.toString()}</property>
            <property name='mlt_service'>qtcrop</property>
            <property name='shotcut:filter'>cropRectangle</property>
        </filter>
    )
}

export function GaussianBlur({
    amount = 10,
}: {
    /** The horizontal blur amount from 0 to 100 (default 10) */
    amount?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'gaussianBlur'}>
            <property name='mlt_service'>avfilter.gblur</property>
            <property name='shotcut:filter'>blur_gaussian_av</property>
            <property name='av.sigma'>{amount.toString()}</property>
            <property name='av.sigmaV'>
                {amount?.toString() ?? amount.toString()}
            </property>
            <property name='av.planes'>0xf</property>
        </filter>
    )
}

export function Blur({
    amount = 10,
}: {
    /** The blur amount (default 32.9) */
    amount?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'blur'}>
            <property name='hradius'>{amount.toString()}</property>
            <property name='vradius'>{amount.toString()}</property>
            <property name='mlt_service'>box_blur</property>
        </filter>
    )
}

export function SimpleChromaKey({
    color = '#00ff00',
    distance = 0.1,
}: {
    /** The color to key out (default green) */
    color?: string;
    /** The distance threshold for the chroma key from 0 to 1 (default 0.169) */
    distance?: number;
}) {
    const { producer } = useProducerContext();
    const id = producer.id;

    return (
        <filter id={id + 'simpleChromaKey'}>
            <property name='version'>0.4</property>
            <property name='mlt_service'>frei0r.bluescreen0r</property>
            <property name='threads'>0</property>
            <property name='0'>{color}</property>
            <property name='1'>{distance.toString()}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function BlendMode({
    mode = 'normal',
}: {
    /**
     * The blend mode to apply.
     */
    mode?:
        | 'normal'
        | 'multiply'
        | 'screen'
        | 'overlay'
        | 'darken'
        | 'lighten'
        | 'colordodge'
        | 'colorburn'
        | 'hardlight'
        | 'softlight'
        | 'difference'
        | 'exclusion'
        | 'hue'
        | 'saturation'
        | 'color'
        | 'luminosity'
        | 'addition'
        | 'divide'
        | 'subtract'
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'blendMode'}>
            <property name='mode'>{mode}</property>
            <property name='mlt_service'>cairoblend_mode</property>
            <property name='shotcut:filter'>blendMode</property>
        </filter>
    )
}
