import * as fs from 'fs';
import * as path from 'path';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const generateMlt = () => {
  // Read the kdenlive file
  const kdenliveContent = fs.readFileSync('kdentlivetest.kdenlive', 'utf-8');

  // Parse XML
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    textNodeName: '_text'
  });
  const parsed = parser.parse(kdenliveContent);

  // Add consumer element after root mlt element
  const consumer = {
    consumer: {
      ab: '160k',
      acodec: 'aac', 
      channels: '2',
      crf: '23',
      deinterlacer: 'onefield',
      f: 'mp4',
      g: '15',
      in: '0',
      mlt_service: 'avformat',
      movflags: '+faststart',
      out: '263',
      preset: 'veryfast',
      real_time: '-1',
      rescale: 'bilinear',
      target: '/Users/morse/Movies/kdentlivetest.mp4',
      threads: '0',
      vcodec: 'libx264'
    }
  };

  // Insert consumer after root element
  const mlt = parsed.mlt;
  const newMlt = {
    mlt: {
      ...mlt,
      consumer: consumer.consumer,
      ...Object.fromEntries(
        Object.entries(mlt).filter(([key]) => key !== 'consumer')
      )
    }
  };

  // Convert back to XML
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: ' ',
    suppressEmptyNode: true
  });
  const xml = builder.build(newMlt);

  // Write to render.mlt
  fs.writeFileSync('render.mlt', xml);
};

generateMlt();
