import * as fs from 'fs'
import * as path from 'path'
import { Parser } from 'htmlparser2'
import { DomHandler, ChildNode, Element, Text } from 'domhandler'
import { render } from 'dom-serializer'
import { parseXml } from '@/rendering'

function findHtmlProperty(nodes: ChildNode[]): Element | null {
    // Check each node in the array
    for (const node of nodes) {
        // Skip if not an Element
        if (!(node instanceof Element)) {
            continue
        }

        // Check if this is the html property
        if (node.name === 'property' && node.attribs.name === 'html') {
            return node
        }

        if (node.children?.length) {
            // Recursively search children
            const result = findHtmlProperty(node.children)
            if (result) return result
        }
    }

    return null
}

function main() {
    // Read and parse the kdenlive file
    const kdenliveContent = fs.readFileSync(
        'titles-test/titles-test.mlt',
        'utf-8',
    )
    const dom = parseXml(kdenliveContent)

    // Find the html property element recursively
    const htmlProperty = findHtmlProperty(dom)

    if (!htmlProperty) {
        throw new Error('Could not find html property in file')
    }

    // Get the HTML content and unescape it
    const htmlContent = (htmlProperty.children[0] as Text).data
    const unescapedHtml = htmlContent
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')

    fs.writeFileSync('src/rich.html', unescapedHtml)
}

main()
