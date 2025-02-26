import { createElement, render } from 'jsx-xml'

import { createContext } from '@/context'
import { execSync } from 'child_process'
import DomHandler, { ChildNode } from 'domhandler'
import fs from 'fs'
import { Parser } from 'htmlparser2'
import os from 'os'
import path from 'path'

export type AssetTypeWithPath = 'audio' | 'image' | 'video'

type NumberLike = string | number

export type AssetRegistration =
    | {
          filepath: string
          id: string
          parentTrackId: string
          in?: NumberLike
          out?: NumberLike
          type: AssetTypeWithPath
      }
    | {
          parentTrackId: string
          type: 'blank'
          duration: string
      }
    | {
          parentTrackId: string
          type: 'text'
          id: string
          in: NumberLike
          out: NumberLike
      }

export type AssetType = AssetRegistration['type']

export type AssetProducer = {
    id: string
    attributes: Record<string, string>
    properties: Properties
    children: any[]
}

let defaultContext = {
    assets: [] as AssetRegistration[],
    producers: [] as AssetProducer[],
    isRegistrationStep: true,
}

export const renderingContext = createContext(defaultContext)
type ImageProducerProperties = {
    length: string
    eof: string
    resource: string
    ttl: string
    aspect_ratio: string
    'meta.media.progressive': string
    seekable: string
    format: string
    'meta.media.width': string
    'meta.media.height': string
    mlt_service: string
}

type VideoProducerProperties = {
    length: string
    eof: string
    resource: string
    'meta.media.nb_streams': string
    'meta.media.0.stream.type': string
    'meta.media.0.stream.frame_rate': string
    'meta.media.0.stream.sample_aspect_ratio': string
    'meta.media.0.codec.width': string
    'meta.media.0.codec.height': string
    'meta.media.0.codec.rotate': string
    'meta.media.0.codec.pix_fmt': string
    'meta.media.0.codec.sample_aspect_ratio': string
    'meta.media.0.codec.colorspace': string
    'meta.media.0.codec.color_trc': string
    'meta.media.0.codec.name': string
    'meta.media.0.codec.long_name': string
    'meta.media.0.codec.bit_rate': string
    'meta.attr.0.stream.handler_name.markup': string
    'meta.attr.0.stream.vendor_id.markup': string
    'meta.media.1.stream.type': string
    'meta.media.1.codec.sample_fmt': string
    'meta.media.1.codec.sample_rate': string
    'meta.media.1.codec.channels': string
    'meta.media.1.codec.layout': string
    'meta.media.1.codec.name': string
    'meta.media.1.codec.long_name': string
    'meta.media.1.codec.bit_rate': string
    'meta.attr.1.stream.handler_name.markup': string
    'meta.attr.1.stream.vendor_id.markup': string
    'meta.attr.major_brand.markup': string
    'meta.attr.minor_version.markup': string
    'meta.attr.compatible_brands.markup': string
    'meta.attr.encoder.markup': string
    seekable: string
    'meta.media.sample_aspect_num': string
    'meta.media.sample_aspect_den': string
    aspect_ratio: string
    format: string
    audio_index: string
    video_index: string
    mute_on_pause: string
    mlt_service: string
}

type AudioProducerProperties = {
    length: string
    eof: string
    resource: string
    'meta.media.nb_streams': string
    'meta.media.0.stream.type': string
    'meta.media.0.stream.frame_rate': string
    'meta.media.0.stream.sample_aspect_ratio': string
    'meta.media.0.codec.width': string
    'meta.media.0.codec.height': string
    'meta.media.0.codec.rotate': string
    'meta.media.0.codec.pix_fmt': string
    'meta.media.0.codec.sample_aspect_ratio': string
    'meta.media.0.codec.colorspace': string
    'meta.media.0.codec.color_trc': string
    'meta.media.0.codec.name': string
    'meta.media.0.codec.long_name': string
    'meta.media.0.codec.bit_rate': string
    'meta.media.1.stream.type': string
    'meta.media.1.codec.sample_fmt': string
    'meta.media.1.codec.sample_rate': string
    'meta.media.1.codec.channels': string
    'meta.media.1.codec.layout': string
    'meta.media.1.codec.name': string
    'meta.media.1.codec.long_name': string
    'meta.media.1.codec.bit_rate': string
    seekable: string
    'meta.media.sample_aspect_num': string
    'meta.media.sample_aspect_den': string
    aspect_ratio: string
    format: string
    audio_index: string
    video_index: string
    mute_on_pause: string
    mlt_service: string
}
type Properties = Partial<
    ImageProducerProperties & AudioProducerProperties & VideoProducerProperties
>

function extractPropertiesFromNodes(nodes: ChildNode[]): Properties {
    const properties: Record<string, string> = {}

    nodes.forEach((node) => {
        if (node.type === 'tag' && node.name === 'property') {
            const nameAttr = node.attribs['name']
            const value = (node.children[0] as any)?.data || ''
            properties[nameAttr] = value
        }
    })

    return properties as Properties
}

export function renderToXml(jsx: any) {
    const currentContext = structuredClone(defaultContext)
    render(
        <renderingContext.Provider value={currentContext}>
            {jsx}
        </renderingContext.Provider>,
    )

    const producers = generateProducersXml(currentContext.assets)

    let xml = render(
        <renderingContext.Provider
            value={{
                ...currentContext,
                producers,
                isRegistrationStep: false,
            }}
        >
            {jsx}
        </renderingContext.Provider>,
    ).end({
        headless: false,
        prettyPrint: true,
        indentTextOnlyNodes: false,
        format: 'xml',
        allowEmptyTags: false,
    })

    return xml
}

export function renderToVideo(jsx: any, xmlFilename = 'video.mlt') {
    // Generate unique ID for this render
    const renderId = `render_${Date.now().toString(36)}`

    // Task 1: Generate XML
    console.time(`${renderId} generate xml`)
    const xml = renderToXml(jsx)
    console.timeEnd(`${renderId} generate xml`)

    // Task 2: Run melt command
    console.time(`${renderId} melt processing`)
    const timestamp = Date.now()
    // const tempXmlFile = path.join(os.tmpdir(), `video-${timestamp}.mlt`)
    const tempXmlFile = xmlFilename
    fs.writeFileSync(tempXmlFile, xml)
    const meltPath = '/Applications/Shotcut.app/Contents/MacOS/melt'
    execSync(`"${meltPath}" ${tempXmlFile}`, { stdio: 'inherit' })
    console.timeEnd(`${renderId} melt processing`)
}
export function renderToPreview(jsx: any, xmlFilename = 'video.mlt') {
    // Generate unique ID for this render
    const renderId = `render_${Date.now().toString(36)}`

    // Task 1: Generate XML
    console.time(`${renderId} generate xml`)
    const xml = renderToXml(jsx)
    console.timeEnd(`${renderId} generate xml`)

    // Task 2: Run melt command
    console.time(`${renderId} melt processing`)
    const timestamp = Date.now()
    // const tempXmlFile = path.join(os.tmpdir(), `video-${timestamp}.mlt`)
    const tempXmlFile = xmlFilename
    fs.writeFileSync(tempXmlFile, xml)
    const meltPath = '/Applications/Shotcut.app/Contents/MacOS/melt'
    execSync(
        `"${meltPath}" ${tempXmlFile} -consumer cbrts in=0 out=-1 muxrate=20000000 | mpv -`,
        { stdio: 'inherit' },
    )
    console.timeEnd(`${renderId} melt processing`)
}

export function parseXml(xml: string) {
    const handler = new DomHandler()
    const parser = new Parser(handler, {
        xmlMode: true,
        recognizeSelfClosing: true,
    })
    parser.write(xml)
    parser.end()
    return handler.dom
}

function domHandlerNodesToJsx(nodes: ChildNode[]): any[] {
    return nodes.map((node) => {
        if (node.type === 'text' && node.data.trim().length > 0) {
            return node.data
        }

        if (node.type === 'tag') {
            const children = node.children
                ? domHandlerNodesToJsx(node.children)
                : []
            return createElement(node.name, node.attribs, ...children)
        }

        return null
    })
}

export function formatSecondsToTime(secs?: number | string) {
    if (secs == null) {
        return undefined
    }
    if (typeof secs === 'string') {
        if (secs.includes(':')) {
            return secs
        }
        const parsed = Number(secs)
        if (isNaN(parsed)) {
            throw new Error(`Invalid time string: ${secs}`)
        }
        return formatSecondsToTime(parsed)
    }
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = Math.floor(secs % 60)
    const milliseconds = Math.floor((secs % 1) * 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

function deduplicate<T, K>(array: T[], keyFn: (item: T) => K): T[] {
    const seen = new Set<K>()
    return array.filter((item) => {
        const key = keyFn(item)
        if (seen.has(key)) {
            return false
        }
        seen.add(key)
        return true
    })
}

function generateProducersXml(assets: AssetRegistration[]) {
    const timestamp = Date.now()
    const tempXmlFile = path.join(os.tmpdir(), `test-${timestamp}.mlt`)
    fs.writeFileSync(tempXmlFile, '')
    // TODO the fps is important here and should be parametrized in this step because melt outputs the xml with durations in fps format instead of seconds or durations. now it is hardcoded to 30fps. but melt only supports profile names and not all attributes.
    const profile = `hdv_1080_30p`
    // https://github.com/mltframework/mlt/blob/master/src/modules/xml/consumer_xml.yml#L91
    const timeFormat = 'clock'
    execSync(
        `melt ${assets
            .filter((x) => x.type !== 'blank' && x.type !== 'text')
            .map((a) => `"${a.filepath}" id=${a.id}`)
            .join(
                ' ',
            )} -profile ${profile} -consumer xml:${tempXmlFile} time_format=${timeFormat}`,
    )
    const xml = fs.readFileSync(tempXmlFile).toString()

    const parsed = parseXml(xml)

    const producers = [] as AssetProducer[]

    function extractProducers(node) {
        if (node.type === 'tag' && node.name === 'producer') {
            const attributes = node.attribs
            const properties = extractPropertiesFromNodes(node.children)
            const id = attributes.id
            const children = domHandlerNodesToJsx(node.children)
            producers.push({ attributes, id, children, properties })
        }
        if (node.children) {
            node.children.forEach((child) => {
                extractProducers(child)
            })
        }
    }

    parsed.forEach((node) => extractProducers(node))
    return producers
}
