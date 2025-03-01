import { renderAsync } from 'jsx-xml'
import crypto from 'crypto'

import type { Element } from '@oozcitak/dom/lib/dom/interfaces'
import xmlbuilder from 'xmlbuilder2'
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces'

import { defaultRenderingContext, renderingContext } from 'meltica/src/context'
import { fastFileHash, isTruthy } from 'meltica/src/utils'
import { execSync } from 'child_process'
import { ChildNode } from 'domhandler'
import fs from 'fs'
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

export function isNodeElement(node: XMLBuilder['node']): node is Element {
    return node && node.nodeType === node.ELEMENT_NODE
}

export function checkDuplicateIds(builder: XMLBuilder): string[] {
    const seenIds = new Set<string>()
    const duplicateIds: string[] = []

    // Use the each method to recursively traverse the XML structure
    builder.each(
        (node, index: number, level: number) => {
            // Check if this is an element node with an id attribute
            if (isNodeElement(node.node)) {
                const id = node.node.attributes?.getNamedItem('id')?.value
                if (id) {
                    if (seenIds.has(id)) {
                        duplicateIds.push(id)
                    } else {
                        seenIds.add(id)
                    }
                }
            }

            // The each method automatically handles recursion
            return true // Continue traversal
        },
        false,
        true,
    )

    // If duplicates were found, throw an error
    if (duplicateIds.length > 0) {
        const uniqueDuplicates = [...new Set(duplicateIds)]
        throw new Error(
            `Duplicate IDs found in XML: ${uniqueDuplicates.join(', ')}`,
        )
    }

    // Return array of duplicate IDs (removing any duplicates in the duplicates list)
    return [...new Set(duplicateIds)]
}

export async function renderToXml(jsx: any) {
    const currentContext = structuredClone(defaultRenderingContext)
    const initialNode = await renderAsync(
        <renderingContext.Provider value={currentContext}>
            {jsx}
        </renderingContext.Provider>,
    )

    checkDuplicateIds(initialNode)

    const { producers, assets } =
        await extractProducersDataFromAssets(initialNode)
    // console.log(producers.map((x) => x.id))

    let xml = (
        await renderAsync(
            <renderingContext.Provider
                value={{
                    ...currentContext,
                    assets,
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
    let meltPath = '/Applications/Shotcut.app/Contents/MacOS/melt'
    meltPath = 'melt'
    execSync(
        `"${meltPath}" ${tempXmlFile} -consumer sdl2 terminate_on_pause=1`,
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

export function getAssetsFromXml(xml: XMLBuilder) {
    const assets: AssetRegistration[] = []
    // Recursively find all assetRegistration elements in the XML
    const assetRegistrationNodes = xml.filter(
        (node, index, level) => {
            const el = node.node
            if (!isNodeElement(el)) {
                return false
            }
            return el.nodeName === 'assetRegistration'
        },
        true, // recursive
        true, // include all levels
    )

    // Extract asset registration data from each node
    for (const node of assetRegistrationNodes) {
        const el = node.node
        if (!isNodeElement(el)) {
            continue
        }

        const attributesObject = attributesToObject(el.attributes)
        if (attributesObject.data) {
            try {
                const assetData = JSON.parse(
                    attributesObject.data,
                ) as AssetRegistration
                assets.push(assetData)
            } catch (error) {
                console.error('Failed to parse asset registration data:', error)
            }
        }
    }

    return deduplicate(assets, (asset) => asset.id)
}

async function computeAssetsKey(assets: AssetRegistration[]) {
    const filteredAssets = assets.filter(
        (x) => x.type !== 'blank' && x.type !== 'text',
    )

    const assetKeys = await Promise.all(
        filteredAssets.map(async (a) => {
            const hash = await fastFileHash(a.filepath)
            return a.filepath + a.id + hash
        }),
    )

    // Use crypto to compute hash of the combined asset keys
    const combinedKeys = assetKeys.sort().join(',')
    return crypto.createHash('md5').update(combinedKeys).digest('hex')
}

export function getProducersFromXml(xml: string) {
    const parsed = xmlbuilder.create(xml)

    const producerNodes = parsed
        .filter(
            (node, index, level) => {
                const producerTags = ['chain', 'producer']
                const el = node.node
                if (!isNodeElement(el)) {
                    return false
                }
                return producerTags.includes(el.nodeName)
            },
            false,
            true,
        )
        .map((node) => {
            const el = node.node
            if (!isNodeElement(el)) {
                return
            }
            const attributesObject = attributesToObject(el.attributes)
            const allPropsNodes = node.filter(
                (x) => x.node.nodeName === 'property',
            )
            const properties = Object.fromEntries(
                allPropsNodes.map((x) => {
                    const value = x.node.textContent
                    const el = x.node
                    if (!isNodeElement(el)) {
                        return []
                    }
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
        .filter(isTruthy)
    return producerNodes
}

/**
 * Extracts producer data from assets using the melt command line tool.
 *
 * This function takes some asset files and uses melt to get metadata like width, height,
 * encoding, etc. It works by creating a temporary MLT XML file with all the assets,
 * then parsing that XML to extract the producer nodes which contain the metadata.
 *
 * The metadata is cached based on the asset files to avoid repeated processing of the same assets.
 *
 * @param xmlWithAssets - XML builder containing asset registrations
 * @returns An object containing the extracted producers and the original assets
 */

export async function extractProducersDataFromAssets(
    xmlWithAssets: XMLBuilder,
) {
    const assets = getAssetsFromXml(xmlWithAssets)
    const key = await computeAssetsKey(assets)
    const tempXmlFile = path.join(
        melticaFolder,
        `producers-extraction-${key}.mlt`,
    )
    if (!process.env.DISABLE_CACHE && fs.existsSync(tempXmlFile)) {
        const xml = fs.readFileSync(tempXmlFile).toString()
        const producers = getProducersFromXml(xml)
        return { producers, assets }
    }
    if (!assets.length) {
        console.warn('No assets found in XML')
        return { producers: [], assets }
    }

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

    await fs.promises.writeFile(tempXmlFile, '')
    const out = execSync(command, { stdio: 'pipe' }).toString()
    const xml = fs.readFileSync(tempXmlFile).toString()
    if (!xml.trim().length) {
        console.log('executed command\n', command)
        console.log(out)
        throw new Error('Melt command failed to generate XML')
    }
    const producers = getProducersFromXml(xml)

    return { producers, assets }
}

/**
 * Converts DOM element attributes to a plain JavaScript object
 *
 * @param attributes - The attributes collection from a DOM element
 * @returns A record of attribute names to their string values
 */
export function attributesToObject(
    attributes: Element['attributes'],
): Record<string, string> {
    const result: Record<string, string> = {}

    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i]
        result[attr.name] = attr.value
    }

    return result
}

export const melticaFolder = '.meltica'

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
