import { Asset, Composition, Track } from '@/components'
import { sleep } from '@/utils'
import { renderAsync } from 'jsx-xml'
import { describe, expect, it } from 'vitest'
import {
  getAssetsFromXml
} from './rendering'

describe('generateProducersXml', () => {
    it('getAssetsFromXml works with sync components', async () => {
        const node = await renderAsync(
            <Composition
                width={1080}
                height={1920}
                fps={30}
                resultFilePath='video.mp4'
            >
                <Track id={'first'}>
                    <Asset id='one' filepath='one.mp4' type='video' />
                    <Asset id='two' filepath='two.mp4' type='video' />
                </Track>
                <Track id={'second'}>
                    <Asset id='three' filepath='three.mp4' type='video' />
                </Track>
            </Composition>,
        )
        const assets = await getAssetsFromXml(node)

        expect(assets).toMatchInlineSnapshot(`
          [
            {
              "filepath": "one.mp4",
              "id": "assetone",
              "parentTrackId": "trackfirst",
              "type": "video",
            },
            {
              "filepath": "two.mp4",
              "id": "assettwo",
              "parentTrackId": "trackfirst",
              "type": "video",
            },
            {
              "filepath": "three.mp4",
              "id": "assetthree",
              "parentTrackId": "tracksecond",
              "type": "video",
            },
          ]
        `)
    })
    it('getAssetsFromXml works with async components', async () => {
        // Create async components that sleep

        const AsyncAsset = async ({ id, ms, filepath, type }) => {
            await sleep(ms) // Sleep for 100ms
            return <Asset id={id} filepath={filepath} type={type} />
        }

        const node = await renderAsync(
            <Composition
                width={1080}
                height={1920}
                fps={30}
                resultFilePath='video.mp4'
            >
                <Track id={'first'}>
                    <AsyncAsset ms={3} id='1' filepath='one.mp4' type='video' />
                    <Asset id='2' filepath='two.mp4' type='video' />
                </Track>
                <Track id={'second'}>
                    <AsyncAsset
                        ms={0}
                        id='3'
                        filepath='three.mp4'
                        type='video'
                    />
                    <AsyncAsset
                        ms={0}
                        id='4'
                        filepath='four.mp4'
                        type='video'
                    />
                </Track>
            </Composition>,
        )

        expect(
            node.end({ headless: true, prettyPrint: true }),
        ).toMatchInlineSnapshot(
            `
          "<mlt LC_NUMERIC="C" version="7.30.0" title="Shotcut version 25.01.25" producer="main_bin">
            <track id="trackfirst">
              <assetRegistration forId="asset1" data="{&quot;filepath&quot;:&quot;one.mp4&quot;,&quot;id&quot;:&quot;asset1&quot;,&quot;type&quot;:&quot;video&quot;,&quot;parentTrackId&quot;:&quot;tracksecond&quot;}"/>
              <assetRegistration forId="asset2" data="{&quot;filepath&quot;:&quot;two.mp4&quot;,&quot;id&quot;:&quot;asset2&quot;,&quot;type&quot;:&quot;video&quot;,&quot;parentTrackId&quot;:&quot;trackfirst&quot;}"/>
            </track>
            <track id="tracksecond">
              <assetRegistration forId="asset3" data="{&quot;filepath&quot;:&quot;three.mp4&quot;,&quot;id&quot;:&quot;asset3&quot;,&quot;type&quot;:&quot;video&quot;,&quot;parentTrackId&quot;:&quot;tracksecond&quot;}"/>
              <assetRegistration forId="asset4" data="{&quot;filepath&quot;:&quot;four.mp4&quot;,&quot;id&quot;:&quot;asset4&quot;,&quot;type&quot;:&quot;video&quot;,&quot;parentTrackId&quot;:&quot;tracksecond&quot;}"/>
            </track>
            <consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="video.mp4" threads="0" vcodec="libx264"/>
            <profile description="PAL 4:3 DV or DVD" width="1080" height="1920" progressive="1" sample_aspect_num="1" sample_aspect_den="1" display_aspect_num="9" display_aspect_den="16" frame_rate_num="30" frame_rate_den="1" colorspace="709"/>
            <playlist id="main_bin">
              <property name="xml_retain">1</property>
            </playlist>
            <producer id="black" in="00:00:00.000" out="2777:46:39.000">
              <property name="length">2777:46:39.000</property>
              <property name="eof">pause</property>
              <property name="resource">0</property>
              <property name="aspect_ratio">1</property>
              <property name="mlt_service">color</property>
              <property name="mlt_image_format">rgba</property>
              <property name="set.test_audio">0</property>
            </producer>
            <playlist id="background">
              <entry producer="black" in="00:00:00.000" out="2777:46:39.000"/>
            </playlist>
            <tractor id="mainTractor" title="Shotcut version 25.01.25" in="00:00:00.000">
              <property name="shotcut">1</property>
              <property name="shotcut:projectAudioChannels">2</property>
              <property name="shotcut:projectFolder">0</property>
              <property name="shotcut:trackHeight">50</property>
              <property name="shotcut:skipConvert">0</property>
              <track producer="background"/>
            </tractor>
          </mlt>"
        `,
        )
        const assets = await getAssetsFromXml(node)

        expect(assets).toMatchInlineSnapshot(`
          [
            {
              "filepath": "one.mp4",
              "id": "asset1",
              "parentTrackId": "tracksecond",
              "type": "video",
            },
            {
              "filepath": "two.mp4",
              "id": "asset2",
              "parentTrackId": "trackfirst",
              "type": "video",
            },
            {
              "filepath": "three.mp4",
              "id": "asset3",
              "parentTrackId": "tracksecond",
              "type": "video",
            },
            {
              "filepath": "four.mp4",
              "id": "asset4",
              "parentTrackId": "tracksecond",
              "type": "video",
            },
          ]
        `)
    })
})
