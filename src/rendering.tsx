import { renderAsync } from 'jsx-xml'

import xmlbuilder from 'xmlbuilder2'

import { execSync } from 'child_process'
import { ChildNode } from 'domhandler'
import fs from 'fs'
import { createContext } from 'jsx-xml'
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
          id: string
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

/**
 * Orders an array using a key function that returns an index
 *
 * @param array - The array to be ordered
 * @param keyFn - A function that returns the index for each item
 * @returns A new array ordered according to the indices returned by keyFn
 */
export function orderByIndex<T>(array: T[], keyFn: (item: T) => number): T[] {
    return [...array].sort((a, b) => {
        const indexA = keyFn(a)
        const indexB = keyFn(b)
        return indexA - indexB
    })
}

export async function renderToXml(jsx: any) {
    const currentContext = structuredClone(defaultContext)
    await renderAsync(
        <renderingContext.Provider value={currentContext}>
            {jsx}
        </renderingContext.Provider>,
    )

    const producers = generateProducersXml(currentContext.assets)
    console.log(producers.map(x => x.id))

    currentContext.assets = orderByIndex(currentContext.assets, (a) => {
        const producerIndex = producers.findIndex((p) => p.id === a.id)
        if (producerIndex === -1) {
            throw new Error(`Producer for asset with id ${a.id} not found`)
        }
        return producerIndex
    })

    let xml = (
        await renderAsync(
            <renderingContext.Provider
                value={{
                    ...currentContext,
                    producers,
                    isRegistrationStep: false,
                }}
            >
                {jsx}
            </renderingContext.Provider>,
        )
    ).end({
        headless: false,
        prettyPrint: true,
        indentTextOnlyNodes: false,
        format: 'xml',
        allowEmptyTags: false,
    })

    return xml
}

export async function renderToVideo(jsx: any, xmlFilename = 'video.mlt') {
    // Generate unique ID for this render
    const renderId = `render_${Date.now().toString(36)}`

    // Task 1: Generate XML
    console.time(`${renderId} generate xml`)
    const xml = await renderToXml(jsx)
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
export async function renderToPreview(jsx: any, xmlFilename = 'video.mlt') {
    // Generate unique ID for this render
    const renderId = `render_${Date.now().toString(36)}`

    // Task 1: Generate XML
    console.time(`${renderId} generate xml`)
    const xml = await renderToXml(jsx)
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

export function formatSecondsToTime(secs?: number | string | null) {
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

export function generateProducersXml(assets: AssetRegistration[]) {
    const timestamp = Date.now()
    const tempXmlFile = path.join(
        melticaFolder,
        `producers-extraction-${timestamp}.mlt`,
    )
    fs.writeFileSync(tempXmlFile, '')
    // TODO the fps is important here and should be parametrized in this step because melt outputs the xml with durations in fps format instead of seconds or durations. now it is hardcoded to 30fps. but melt only supports profile names and not all attributes.
    const profile = `hdv_1080_30p`
    // https://github.com/mltframework/mlt/blob/master/src/modules/xml/consumer_xml.yml#L91
    const timeFormat = 'clock'
    const command = `melt ${assets
        .filter((x) => x.type !== 'blank' && x.type !== 'text')
        .map((a) => `"${a.filepath}" id=${a.id}`)
        .join(
            ' ',
        )} -profile ${profile} -consumer xml:${tempXmlFile} time_format=${timeFormat}`

    const out = execSync(command, { stdio: 'pipe' }).toString()
    const xml = fs.readFileSync(tempXmlFile).toString()
    if (!xml.trim().length) {
        console.log('executed command\n', command)
        console.log(out)
        throw new Error('Melt command failed to generate XML')
    }

    const parsed = xmlbuilder.create(xml)

    const producerNodes = parsed
        .filter(
            (node, index, level) => {
                const producerTags = ['chain', 'producer']
                const el = node.node as any as Element
                return producerTags.includes(el.nodeName)
            },
            false,
            true,
        )
        .map((node) => {
            const el = node.node as any as Element
            const attributesObject = attributesToObject(el.attributes)
            const allPropsNodes = node.filter(
                (x) => x.node.nodeName === 'property',
            )
            const properties = Object.fromEntries(
                allPropsNodes.map((x) => {
                    const value = x.node.textContent
                    const el = x.node as any as Element
                    const name = attributesToObject(el.attributes).name
                    return [name, value]
                }),
            )
            const assetProducer: AssetProducer = {
                id: attributesObject.id,
                attributes: attributesObject,
                children: node.toArray(false, false),
                properties,
            }
            return assetProducer
        })

    return producerNodes
}

/**
 * Converts DOM element attributes to a plain JavaScript object
 *
 * @param attributes - The attributes collection from a DOM element
 * @returns A record of attribute names to their string values
 */
export function attributesToObject(
    attributes: NamedNodeMap,
): Record<string, string> {
    const result: Record<string, string> = {}

    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i]
        result[attr.name] = attr.value
    }

    return result
}

export const melticaFolder = '.meltica'
