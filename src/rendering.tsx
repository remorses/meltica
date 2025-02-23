import { render, createElement } from 'jsx-xml'

import serialize from 'dom-serializer'

import fs from 'fs'
import os from 'os'
import { writeFileSync } from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import DomHandler, { ChildNode } from 'domhandler'
import { Parser } from 'htmlparser2'
import { ImageFile, AudioFile } from '@/components'

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

export function renderToXml(jsx: any) {
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
