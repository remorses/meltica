import * as fs from 'fs'
import * as path from 'path'
import { Parser } from 'htmlparser2'
import { DomHandler, Element } from 'domhandler'
import { render } from 'dom-serializer'

const parseXml = (xml: string) => {
    const handler = new DomHandler()
    const parser = new Parser(handler)
    parser.write(xml)
    parser.end()
    return handler.dom
}

const generateMlt = () => {
    // Read and parse the kdenlive file
    const kdenliveContent = fs.readFileSync('kdentlivetest.kdenlive', 'utf-8')
    const dom = parseXml(kdenliveContent)
    const mltElement = dom.find(
        (node) => node instanceof Element && node.name === 'mlt',
    ) as Element

    if (!mltElement) {
        throw new Error('No MLT element found in kdenlive file')
    }
    // Parse and add consumer as first child
    const consumerXml =
        '<consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="./kdentlivetest.mp4" threads="0" vcodec="libx264"/>'
    const consumerDom = parseXml(consumerXml)
    mltElement.children.unshift(consumerDom[0])

    // Convert back to XML and write to file
    const xml = render(dom, {
        xmlMode: true,
        encodeEntities: 'utf8',
    })

    fs.writeFileSync('render.mlt', xml)
}

generateMlt()
