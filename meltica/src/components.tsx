import { Fragment, useContext } from 'jsx-xml'

import {
    AssetRegistration,
    AssetTypeWithPath,
    formatSecondsToTime,
    melticaFolder,
    renderingContext,
} from '@/rendering'
import dedent from 'dedent'
import fs from 'fs'

import {
    assetContext,
    AssetContext,
    compositionContext,
    CompositionContext,
    trackContext,
} from '@/context'
import { persistentMemo } from '@/utils'
import { render, renderAsync } from 'jsx-xml'
import path from 'path'

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

export const InlineSvg = persistentMemo(async function InlineSvg({
    svg: svgContent,
    id,
    duration,
    children,
}: {
    svg: any
    id: string
    duration: number
    children?: any
}) {
    id = 'svg' + id

    const context = useContext(renderingContext)
    const { width, height } = useContext(compositionContext)!
    const { trackId } = useTrackContext()

    let filepath = path.resolve(melticaFolder, `${id}.png`)

    if (context.isRegistrationStep) {
        // Render the SVG content
        let renderedSvgContent =
            typeof svgContent === 'string'
                ? svgContent
                : (await renderAsync(svgContent)).end({
                      headless: true,
                      allowEmptyTags: true,
                      indentTextOnlyNodes: false,
                      prettyPrint: true,
                  })
        fs.mkdirSync(melticaFolder, { recursive: true })
        console.time(`${id} svg render`)
        const { Resvg } = await import('@resvg/resvg-js')
        const resvg = new Resvg(renderedSvgContent, {
            fitTo: {
                mode: 'width',
                value: width,
            },
        })
        const pngData = resvg.render()
        const pngBuffer = pngData.asPng()
        console.timeEnd(`${id} svg render`)

        fs.writeFileSync(filepath, pngBuffer)
        return AssetRegistrationComponent({
            id,
            type: 'image',
            filepath,
            parentTrackId: trackId,
            in: 0,
            out: duration,
            // svgContent
        })
        return <producer id={id}></producer>
    }
    const producer = context.producers.find((p) => p.id === id)

    if (!producer) {
        throw new Error(`Producer for SVG with id ${id} not found`)
    }

    const assetCtx: AssetContext = {
        producer,
        in: producer?.attributes?.in,
        out: producer?.attributes?.out,
    }

    return (
        <assetContext.Provider value={assetCtx}>
            <producer {...producer?.attributes} id={id}>
                {producer?.children}
                <property name='resource'>{filepath}</property>
                <property name='mlt_service'>qimage</property>
                <property name='format'>2</property>
                <property name='shotcut:skipConvert'>1</property>
                <property name='shotcut:caption'>Inline SVG</property>
                {children}
            </producer>
        </assetContext.Provider>
    )
})

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
    type: AssetTypeWithPath
    children?: any
}) {
    id = 'asset' + id
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    const producer = context.producers.find((p) => p.id === id)
    const inWithDefault = inTime ?? producer?.attributes.in
    const outWithDefault = out ?? producer?.attributes.out
    if (context.isRegistrationStep) {
        return AssetRegistrationComponent({
            filepath,
            id,
            type,
            in: inWithDefault,
            out: outWithDefault,
            parentTrackId: trackId,
        })
        return <producer id={id}></producer>
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
        useContext(compositionContext)!

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
            <property name='mlt_service'>qtblend</property>
            <property name='shotcut:filter'>sizePosition</property>
            <property name='compositing'>0</property>
            <property name='distort'>0</property>
            <property name='rect'>{rect}</property>
            <property name='rotation'>00:00:00.000=0</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

export function FlipHorizontally({ id = 'flip' }) {
    return (
        <filter id={id}>
            <property name='mlt_service'>avfilter.hflip</property>
            <property name='kdenlive_id'>avfilter.hflip</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

export function FlipVertically({ id = 'vflip' }) {
    return (
        <filter id={id}>
            <property name='mlt_service'>avfilter.vflip</property>
            <property name='kdenlive_id'>avfilter.vflip</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

export function StereoToMono({ id = 'stereoToMono', keep = 'left', swap = 0 }) {
    // For left channel: from=0, to=1
    // For right channel: from=1, to=0
    const from = keep === 'left' ? 0 : 1
    const to = keep === 'left' ? 1 : 0

    return (
        <filter id={id}>
            <property name='to'>{to}</property>
            <property name='mlt_service'>channelcopy</property>
            <property name='kdenlive_id'>channelcopy</property>
            <property name='from'>{from}</property>
            <property name='swap'>{swap}</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

export function Vignette({
    id = 'vignette',
    aspect = 0.5,
    clearCenter = 0,
    soft = 0.6,
}) {
    return (
        <filter id={id}>
            <property name='version'>0.2</property>
            <property name='mlt_service'>frei0r.vignette</property>
            <property name='kdenlive_id'>frei0r.vignette</property>
            <property name='aspect'>{`00:00:00.000=${aspect}`}</property>
            <property name='clearCenter'>{`00:00:00.000=${clearCenter}`}</property>
            <property name='soft'>{`00:00:00.000=${soft}`}</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

type TransformKeyframe = {
    time: number | string
    easing?: EasingType
    width?: number
    height?: number
    left?: number
    top?: number
    rotation?: number
}

const easingTypeToLetter = {
    smooth: '$',
    linear: '',
    step: '|',
    'cubic in': 'g',
    'cubic out': 'h',
    'exponential in': 'p',
    'exponential out': 'q',
} as const

type EasingType = keyof typeof easingTypeToLetter

export function Transform({
    id = 'qtblend',
    keyframes,

    compositing = 0,
    distort = 0,
}: {
    id?: string
    keyframes: TransformKeyframe[]
    compositing?: number
    distort?: number
}) {
    const videoContext = useContext(compositionContext)!
    const rect = keyframes
        .map((keyframe) => {
            const animationLetter =
                easingTypeToLetter[keyframe.easing || 'linear']
            return `${formatSecondsToTime(keyframe.time)}${animationLetter}=${keyframe.left} ${keyframe.top} ${keyframe.width || videoContext.width} ${keyframe.height || videoContext.height} 1.000000`
        })
        .join(';')
    const rotation = keyframes
        .map((keyframe) => {
            const animationLetter =
                easingTypeToLetter[keyframe.easing || 'linear']
            return `${formatSecondsToTime(keyframe.time)}${animationLetter}=${keyframe.rotation || 0}`
        })
        .join(';')

    return (
        <filter id={id}>
            <property name='rotate_center'>1</property>
            <property name='mlt_service'>qtblend</property>
            <property name='kdenlive_id'>qtblend</property>
            <property name='compositing'>{compositing}</property>
            <property name='distort'>{distort}</property>
            <property name='rect'>{rect}</property>
            <property name='rotation'>{rotation}</property>
            <property name='kdenlive:collapsed'>0</property>
        </filter>
    )
}

export function BlankSpace({ id, length }) {
    const context = useContext(renderingContext)
    const { trackId } = useTrackContext()
    if (context.isRegistrationStep) {
        return AssetRegistrationComponent({
            id,
            type: 'blank',
            duration: length,
            parentTrackId: trackId,
        })
        return <producer id={id} />
    }
    return null
}

export function Track({ id: trackId, name = 'track', children }) {
    trackId = 'track' + trackId
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

export function Composition({
    children,

    ...rootProps
}: CompositionContext & { children: any }) {
    const context = useContext(renderingContext)
    let backgroundDuration = formatSecondsToTime(9999999)
    const playlists = groupBy(context.assets, (a) => a.parentTrackId)
    const { resultFilePath, height, width, duration, fps } = rootProps
    return (
        <compositionContext.Provider value={rootProps}>
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
        </compositionContext.Provider>
    )
}

function AssetRegistrationComponent(asset: AssetRegistration) {
    return <assetRegistration data={JSON.stringify(asset)} />
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
        return AssetRegistrationComponent({
            type: 'text',
            id,
            in: 0,
            out: duration,
            parentTrackId: trackId,
        })
        return <producer id={id} />
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
        useContext(compositionContext)!
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
    const type = assets.reduce<AssetTypeWithPath | ''>((acc, i) => {
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
        useContext(compositionContext)!
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
export function Glow({
    amount = 0.2,
}: {
    /** The glow amount from 0 to 1 (default 0.23) */
    amount?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'glow'}>
            <property name='version'>0.1</property>
            <property name='mlt_service'>frei0r.glow</property>
            <property name='0'>{amount.toString()}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function Pitch({
    octaveshift = 0,
    latency = 85,
}: {
    /** The octave shift amount from -2 to 2 (default 0) */
    octaveshift?: number
    /** The latency in milliseconds (default 85) */
    latency?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'pitch'}>
            <property name='mlt_service'>rbpitch</property>
            <property name='octaveshift'>{octaveshift.toString()}</property>
            <property name='latency'>{latency.toString()}</property>
        </filter>
    )
}

export function DynamicLoudness({
    targetLoudness = -23.0,
    window = 10,
    maxGain = 15.0,
    minGain = -15.0,
    maxRate = 3.0,
    discontinuityReset = 1,
}: {
    /** The target loudness in dB (default -23.0) */
    targetLoudness?: number
    /** The window size in seconds (default 10) */
    window?: number
    /** The maximum gain in dB (default 15.0) */
    maxGain?: number
    /** The minimum gain in dB (default -15.0) */
    minGain?: number
    /** The maximum rate of change (default 3.0) */
    maxRate?: number
    /** Whether to reset on discontinuity (default 1) */
    discontinuityReset?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'dynamicLoudness'}>
            <property name='target_loudness'>
                {targetLoudness.toString()}
            </property>
            <property name='window'>{window.toString()}</property>
            <property name='max_gain'>{maxGain.toString()}</property>
            <property name='min_gain'>{minGain.toString()}</property>
            <property name='max_rate'>{maxRate.toString()}</property>
            <property name='discontinuity_reset'>
                {discontinuityReset.toString()}
            </property>
            <property name='mlt_service'>dynamic_loudness</property>
        </filter>
    )
}

export function Reverb({
    roomSize = 30,
    reverbTime = 7.5,
    damping = 50.0,
    inputBandwidth = 75.0,
    drySignalLevel = 0.0,
    earlyReflectionLevel = -10,
    tailLevel = -17.5,
}: {
    /** Room size in meters (default 30) */
    roomSize?: number
    /** Reverb time in seconds (default 7.5) */
    reverbTime?: number
    /** Damping percentage (default 50.0) */
    damping?: number
    /** Input bandwidth percentage (default 75.0) */
    inputBandwidth?: number
    /** Dry signal level in dB (default 0.0) */
    drySignalLevel?: number
    /** Early reflection level in dB (default -10) */
    earlyReflectionLevel?: number
    /** Tail level in dB (default -17.5) */
    tailLevel?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'reverb'}>
            <property name='mlt_service'>ladspa.1216</property>
            <property name='0'>{roomSize.toString()}</property>
            <property name='1'>{reverbTime.toString()}</property>
            <property name='2'>{damping / 100}</property>
            <property name='3'>{inputBandwidth / 100}</property>
            <property name='4'>{drySignalLevel}</property>
            <property name='5'>{earlyReflectionLevel}</property>
            <property name='6'>{tailLevel}</property>
            <property name='instances'>2</property>
        </filter>
    )
}

export function AudioPan({
    channel = 'right',
    amount = 1,
}: {
    /** The audio channel to pan: 'left' or 'right' */
    channel?: 'left' | 'right'
    /** Amount of panning from 0 to 1 (default 1) */
    amount?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    // Convert channel string to numeric value (0 for left, 1 for right)
    const channelValue = channel === 'left' ? 0 : 1

    return (
        <filter id={id + 'audioPan'}>
            <property name='channel'>{channelValue.toString()}</property>
            <property name='split'>{amount.toString()}</property>
            <property name='mlt_service'>panner</property>
            <property name='shotcut:filter'>audioPan</property>
            <property name='start'>0</property>
        </filter>
    )
}

export function Speed({
    speed = 1,
    pitchCompensation = false,
    imageMode = 'nearest',
}: {
    /** The playback speed (default 1) */
    speed?: number
    /** Whether to compensate for pitch changes (default false) */
    pitchCompensation?: boolean
    /** The image interpolation mode: 'nearest' or 'blend' (default 'nearest') */
    imageMode?: 'nearest' | 'blend'
    // /** Optional speed map in format "00:00:01.919=0.54" */
    // speedMap?: string
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'speed'}>
            <property name='mlt_service'>timeremap</property>
            <property name='shotcut:filter'>speedForward</property>

            <property name='image_mode'>{imageMode}</property>
            <property name='pitch'>{pitchCompensation ? '1' : '0'}</property>
            <property name='speed'>{speed.toString()}</property>
            {/* TODO speed map is speed value with keyframes you can animate, format is similar to size rect */}
            {/* <property name="speed_map">00:00:01.919=0.54</property> */}
        </filter>
    )
}
export function ChromaHold({
    color,
    similarity = 0.05,
}: {
    /** The color to hold - makes everything grayscale except this color */
    color: string
    /** The similarity threshold from 0 to 1 (default 0.059) */
    similarity?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'chromaHold'}>
            <property name='mlt_service'>avfilter.chromahold</property>
            <property name='av.color'>{color}</property>
            <property name='av.similarity'>{similarity.toString()}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function Brightness({
    level = 1.0,
}: {
    /** The brightness level (default 1.0, where 1.0 is normal brightness) */
    level?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

    return (
        <filter id={id + 'brightness'}>
            <property name='mlt_service'>brightness</property>
            <property name='level'>{level.toString()}</property>
            <property name='disable'>0</property>
        </filter>
    )
}
export function FadeInBrightness({
    duration = 1,
    startLevel = 0,
    endLevel = 1,
}: {
    /** The duration of the fade in animation in seconds (as a number) */
    duration: number
    /** The starting brightness level (default 0) */
    startLevel?: number
    /** The ending brightness level (default 1) */
    endLevel?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id
    let durationTime = formatSecondsToTime(duration)

    return (
        <filter id={id + 'fadeInBrightness'}>
            <property name='start'>1</property>
            <property name='level'>{`00:00:00.000=${startLevel};${durationTime}=${endLevel}`}</property>
            <property name='mlt_service'>brightness</property>
            <property name='shotcut:filter'>fadeInBrightness</property>
            <property name='alpha'>1</property>
            <property name='shotcut:animIn'>{durationTime}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function FadeOutBrightness({
    duration = 1,
    startLevel = 1,
    endLevel = 0,
}: {
    /** The duration of the fade out animation in seconds (as a number) */
    duration: number
    /** The starting brightness level (default 1) */
    startLevel?: number
    /** The ending brightness level (default 0) */
    endLevel?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id
    let durationTime = formatSecondsToTime(duration)
    return (
        <filter id={id + 'fadeOutBrightness'}>
            <property name='start'>1</property>
            <property name='level'>{`00:00:00.000=${startLevel};-${durationTime}=${endLevel}`}</property>
            <property name='mlt_service'>brightness</property>
            <property name='shotcut:filter'>fadeOutBrightness</property>
            <property name='alpha'>1</property>
            <property name='shotcut:animOut'>{durationTime}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function FadeInAudio({
    duration = 1,
    startLevel = -60,
    endLevel = 0,
}: {
    /** The duration of the fade in animation in seconds (as a number) */
    duration: number
    /** The starting volume level in dB (default -60) */
    startLevel?: number
    /** The ending volume level in dB (default 0) */
    endLevel?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id
    let durationTime = formatSecondsToTime(duration)

    return (
        <filter id={id + 'fadeInVolume'}>
            <property name='window'>75</property>
            <property name='max_gain'>20dB</property>
            <property name='level'>{`00:00:00.000=${startLevel};${durationTime}=${endLevel}`}</property>
            <property name='mlt_service'>volume</property>
            <property name='shotcut:filter'>fadeInVolume</property>
            <property name='shotcut:animIn'>{durationTime}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function FadeOutAudio({
    duration = 1,
    startLevel = 0,
    endLevel = -60,
}: {
    /** The duration of the fade out animation in seconds (as a number) */
    duration: number
    /** The starting volume level in dB (default 0) */
    startLevel?: number
    /** The ending volume level in dB (default -60) */
    endLevel?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id
    let durationTime = formatSecondsToTime(duration)

    return (
        <filter id={id + 'fadeOutVolume'}>
            <property name='window'>75</property>
            <property name='max_gain'>20dB</property>
            <property name='level'>{`00:00:00.000=${startLevel};-${durationTime}=${endLevel}`}</property>
            <property name='mlt_service'>volume</property>
            <property name='shotcut:filter'>fadeOutVolume</property>
            <property name='shotcut:animOut'>{durationTime}</property>
            <property name='disable'>0</property>
        </filter>
    )
}

export function SimpleChromaKey({
    color = '#00ff00',
    distance = 0.1,
}: {
    /** The color to key out (default green) */
    color?: string
    /** The distance threshold for the chroma key from 0 to 1 (default 0.169) */
    distance?: number
}) {
    const { producer } = useProducerContext()
    const id = producer.id

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
