import { describe, it, expect } from 'vitest'
import { formatSecondsToTime, generateProducersXml } from './rendering'
import path from 'path'
import fs from 'fs'

describe('generateProducersXml', () => {
    it('should exist as a function', async () => {
        const res = await generateProducersXml([
            {
                filepath: 'video.mp4',
                type: 'video',
                id: 'mainBin',
                parentTrackId: 'track',
            },
        ])
        
        expect(
            res.map((x) => {
                x.children = []
                return x
            }),
        ).toMatchInlineSnapshot(`
          [
            {
              "attributes": {
                "id": "mainBin",
                "in": "00:00:00.000",
                "out": "00:00:00.167",
              },
              "children": [],
              "id": "mainBin",
              "properties": {
                "aspect_ratio": "1",
                "audio_index": "1",
                "eof": "pause",
                "format": "3",
                "length": "6",
                "meta.attr.0.stream.handler_name.markup": "VideoHandler",
                "meta.attr.0.stream.vendor_id.markup": "[0][0][0][0]",
                "meta.attr.1.stream.handler_name.markup": "SoundHandler",
                "meta.attr.1.stream.vendor_id.markup": "[0][0][0][0]",
                "meta.attr.compatible_brands.markup": "isomiso2avc1mp41",
                "meta.attr.encoder.markup": "Lavf61.7.100",
                "meta.attr.major_brand.markup": "isom",
                "meta.attr.minor_version.markup": "512",
                "meta.media.0.codec.bit_rate": "51979200",
                "meta.media.0.codec.color_trc": "1",
                "meta.media.0.codec.colorspace": "709",
                "meta.media.0.codec.height": "1920",
                "meta.media.0.codec.long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
                "meta.media.0.codec.name": "h264",
                "meta.media.0.codec.pix_fmt": "yuv420p",
                "meta.media.0.codec.rotate": "0",
                "meta.media.0.codec.sample_aspect_ratio": "0",
                "meta.media.0.codec.width": "1080",
                "meta.media.0.stream.frame_rate": "30",
                "meta.media.0.stream.sample_aspect_ratio": "1",
                "meta.media.0.stream.type": "video",
                "meta.media.1.codec.bit_rate": "2887",
                "meta.media.1.codec.channels": "2",
                "meta.media.1.codec.layout": "stereo",
                "meta.media.1.codec.long_name": "AAC (Advanced Audio Coding)",
                "meta.media.1.codec.name": "aac",
                "meta.media.1.codec.sample_fmt": "fltp",
                "meta.media.1.codec.sample_rate": "48000",
                "meta.media.1.stream.type": "audio",
                "meta.media.nb_streams": "2",
                "meta.media.sample_aspect_den": "1",
                "meta.media.sample_aspect_num": "1",
                "mlt_service": "avformat",
                "mute_on_pause": "0",
                "resource": "video.mp4",
                "seekable": "1",
                "video_index": "0",
              },
            },
          ]
        `)
    })
})
