import { render, createElement } from 'jsx-xml'

import serialize from 'dom-serializer'

import fs from 'fs'
import os from 'os'
import { writeFileSync } from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import DomHandler, { ChildNode } from 'domhandler'
import { Parser } from 'htmlparser2'

type AssetRegistration = {
    filepath: string
    id: string
    type: 'image' | 'video' | 'audio'
}

type AssetProducer = {
    id: string
    attributes: Record<string, string>
    children: any[]
}

let defaultContext = {
    assets: [] as AssetRegistration[],
    producers: [] as AssetProducer[],
    isRegistrationStep: true,
}

let currentContext = structuredClone(defaultContext)
function useContext() {
    return currentContext
}

function renderToXml(jsx: any) {
    currentContext = structuredClone(defaultContext)
    try {
        render(jsx)
        console.log(currentContext)
        const producers = generateProducersXml(currentContext.assets)
        console.log(producers)
        currentContext = {
            ...currentContext,
            producers,
            isRegistrationStep: false,
        }
        let xml = render(jsx).end({
            headless: false,
            prettyPrint: true,
            indentTextOnlyNodes: false,
            format: 'xml',
            allowEmptyTags: false,
        })

        return xml
    } finally {
        currentContext = structuredClone(defaultContext)
    }
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

function formatSecondsToTime(secs) {
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = Math.floor(secs % 60)
    return `${hours}:${minutes}:${seconds}`
}

function generateProducersXml(assets: AssetRegistration[]) {
    const timestamp = Date.now()
    const tempXmlFile = path.join(os.tmpdir(), `test-${timestamp}.mlt`)
    fs.writeFileSync(tempXmlFile, '')
    execSync(
        `melt ${assets.map((a) => `"${a.filepath}" id=${a.id}`).join(' ')} -consumer xml:${tempXmlFile}`,
    )
    const xml = fs.readFileSync(tempXmlFile).toString()

    const parsed = parseXml(xml)

    const producers = [] as AssetProducer[]

    function extractProducers(node) {
        if (node.type === 'tag' && node.name === 'producer') {
            const attributes = node.attribs

            const id = attributes.id
            const children = domHandlerNodesToJsx(node.children)
            producers.push({ attributes, id, children })
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

function AudioFile({ id, filepath, volume = 0 }) {
    const context = useContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type: 'audio',
        })
        return null
    }
    const producer = context.producers.find((p) => p.id === id)

    const basename = path.basename(filepath)
    return (
        <chain id={id}>
            <property name='length'>00:00:14.520</property>
            <property name='eof'>pause</property>
            <property name='resource'>{filepath}</property>
            <property name='mlt_service'>avformat-novalidate</property>
            {producer?.children}

            <property name='meta.media.0.codec.bit_rate'>705600</property>
            <property name='seekable'>1</property>
            <property name='audio_index'>0</property>
            <property name='video_index'>-1</property>

            <property name='astream'>0</property>
            <property name='shotcut:skipConvert'>1</property>

            <property name='shotcut:caption'>{basename}</property>
            <filter id={id + 'gain'}>
                <property name='window'>75</property>
                <property name='max_gain'>20dB</property>
                <property name='level'>{volume.toString()}</property>
                <property name='mlt_service'>volume</property>
            </filter>
        </chain>
    )
}

function ImageFile({ id, filepath }) {
    const context = useContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type: 'image',
        })
        return null
    }
    const basename = path.basename(filepath)
    return (
        <producer id={id} in='00:00:00.000' out='03:59:59.967'>
            <property name='length'>04:00:00.000</property>
            <property name='eof'>pause</property>
            <property name='resource'>{filepath}</property>
            <property name='ttl'>1</property>
            <property name='aspect_ratio'>1</property>
            <property name='meta.media.progressive'>1</property>
            <property name='seekable'>1</property>
            <property name='format'>1</property>
            <property name='meta.media.width'>720</property>
            <property name='meta.media.height'>2342</property>
            <property name='mlt_service'>qimage</property>

            <property name='shotcut:skipConvert'>1</property>
            <property name='shotcut:caption'>{basename}</property>
            <property name='xml'>was here</property>
            <property name='meta.shotcut.vui'>1</property>
            <filter id={id + 'transform'}>
                <property name='background'>color:#00000000</property>
                <property name='mlt_service'>affine</property>
                <property name='shotcut:filter'>affineSizePosition</property>
                <property name='transition.fix_rotate_x'>0</property>
                <property name='transition.fill'>1</property>
                <property name='transition.distort'>0</property>
                <property name='transition.rect'>
                    00:00:00.000=221.528 -7.60509 592.707 1927.94
                    1;00:00:02.733=-149.36 -1214.13 1334.59 4341
                    1;00:00:02.867=-151.183 -1220.13 1338.13 4353
                    1;00:00:02.900=-142.121 -1184.2 1319.07 4291.01 1
                </property>
                <property name='transition.valign'>middle</property>
                <property name='transition.halign'>center</property>
                <property name='shotcut:animIn'>00:00:00.000</property>
                <property name='shotcut:animOut'>00:00:00.000</property>
                <property name='transition.threads'>0</property>
            </filter>
        </producer>
    )
}

function MLT({}) {
    return (
        <mlt
            LC_NUMERIC='C'
            version='7.30.0'
            title='Shotcut version 25.01.25'
            producer='main_bin'
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
                mlt_service='avformat'
                movflags='+faststart'
                preset='veryfast'
                real_time='-1'
                rescale='bilinear'
                target='./shotcut.mp4'
                threads='0'
                vcodec='libx264'
            />
            <profile
                description='PAL 4:3 DV or DVD'
                width='1080'
                height='1920'
                progressive='1'
                sample_aspect_num='1'
                sample_aspect_den='1'
                display_aspect_num='9'
                display_aspect_den='16'
                frame_rate_num='30'
                frame_rate_den='1'
                colorspace='709'
            />
            <playlist id='main_bin'>
                <property name='xml_retain'>1</property>
            </playlist>
            <producer id='black' in='00:00:00.000' out='00:02:15.067'>
                <property name='length'>00:02:15.100</property>
                <property name='eof'>pause</property>
                <property name='resource'>0</property>
                <property name='aspect_ratio'>1</property>
                <property name='mlt_service'>color</property>
                <property name='mlt_image_format'>rgba</property>
                <property name='set.test_audio'>0</property>
            </producer>
            <playlist id='background'>
                <entry producer='black' in='00:00:00.000' out='00:02:15.067' />
            </playlist>
            <ImageFile
                id={'producer0'}
                filepath={'sololevelling/page-000.jpg'}
            />
            <ImageFile
                id={'producer1'}
                filepath={'sololevelling/page-001.jpg'}
            />
            <ImageFile
                id={'producer2'}
                filepath={'sololevelling/page-002.jpg'}
            />

            <playlist id='playlist0'>
                <property name='shotcut:video'>1</property>
                <property name='shotcut:name'>V1</property>
                <entry
                    producer='producer0'
                    in='00:00:00.000'
                    out='00:00:02.867'
                />
                <entry
                    producer='producer1'
                    in='00:00:00.000'
                    out='00:00:02.733'
                />
                <entry
                    producer='producer2'
                    in='00:00:00.000'
                    out='00:00:03.167'
                />
            </playlist>
            <AudioFile filepath={'narrator.wav'} id={'chain0'} />
            <playlist id='playlist1'>
                <property name='shotcut:audio'>1</property>
                <property name='shotcut:name'>A1</property>
                <entry producer='chain0' in='00:00:00.000' out='00:00:14.467' />
            </playlist>
            {/* <AudioFile
                id={'chain1'}
                filepath={'edapollo - Let It Go [bQ5glYCsv94].mp3'}
                volume={-14.1}
            />
            */}
            <playlist id='playlist2'>
                <property name='shotcut:audio'>1</property>
                <property name='shotcut:name'>A2</property>
                <entry producer='chain1' in='00:00:00.000' out='00:02:15.067' />
            </playlist>
            <tractor
                id='tractor0'
                title='Shotcut version 25.01.25'
                in='00:00:00.000'
                out='00:02:15.067'
            >
                <property name='shotcut'>1</property>
                <property name='shotcut:projectAudioChannels'>2</property>
                <property name='shotcut:projectFolder'>0</property>
                <property name='shotcut:trackHeight'>50</property>
                <track producer='background' />
                <track producer='playlist0' />
                <track producer='playlist1' hide='video' />
                <track producer='playlist2' hide='video' />
            </tractor>
        </mlt>
    )
}

writeFileSync('slideshow-shotcut.mlt', renderToXml(<MLT />))
