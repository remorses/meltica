import * as fs from 'fs';
import * as path from 'path';
import { Parser } from 'htmlparser2';
import { DomHandler, Element } from 'domhandler';
import { render } from 'dom-serializer';

const generateMlt = () => {
  // Read the kdenlive file
  const kdenliveContent = fs.readFileSync('kdentlivetest.kdenlive', 'utf-8');

  // Parse XML
  const handler = new DomHandler();
  const parser = new Parser(handler);
  parser.write(kdenliveContent);
  parser.end();

  const dom = handler.dom;
  const mltElement = dom.find(node => 
    node instanceof Element && node.name === 'mlt'
  ) as Element;

  // Consumer element as string
  const consumerXml = '<consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="./kdentlivetest.mp4" threads="0" vcodec="libx264"/>';

  // Parse consumer XML to DOM
  const consumerHandler = new DomHandler();
  const consumerParser = new Parser(consumerHandler);
  consumerParser.write(consumerXml);
  consumerParser.end();
  
  // Insert consumer after profile element
  const profileIndex = mltElement.children.findIndex(node =>
    node instanceof Element && node.name === 'profile'
  );
  mltElement.children.splice(profileIndex + 1, 0, consumerHandler.dom[0]);

  // Convert back to XML and write to file
  const xml = render(dom, {
    xmlMode: true,
    encodeEntities: 'utf8'
  });

  fs.writeFileSync('render.mlt', xml);
};

generateMlt();
