import * as fs from 'fs'
import * as path from 'path'
import { Parser } from 'htmlparser2'
import { DomHandler, Element } from 'domhandler'
import { render } from 'dom-serializer'
import { parseXml } from '@/slideshow-old'


function generateMlt({
    root = '/Users/morse/Documents/GitHub/ugcvideos.org/website/',
} = {}) {
    // Read and parse the kdenlive file
    const kdenliveContent = fs.readFileSync('kdentlivetest.kdenlive', 'utf-8')
    const dom = parseXml(kdenliveContent)
    const mltElement = dom.find(
        (node) => node instanceof Element && node.name === 'mlt',
    ) as Element

    if (!mltElement) {
        throw new Error('No MLT element found in kdenlive file')
    }

    // Set root attribute to ./
    delete mltElement.attribs.root

    // Parse and add consumer as first child
    const consumerXml =
        '\n<consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="./out.mp4" threads="0" vcodec="libx264" />'
    const consumerDom = parseXml(consumerXml)
    mltElement.children = [...consumerDom, ...mltElement.children]

    // Convert back to XML and write to file
    let xml = render(dom, {
        xmlMode: true,
        encodeEntities: false,
        selfClosingTags: true,
    })
    xml = xml.replaceAll(root, './')

    fs.writeFileSync('render.mlt', xml)
}

generateMlt()
