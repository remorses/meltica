import { describe, it, expect } from 'vitest'
import {
    formatSecondsToTime,
    generateProducersXml,
    getAssetsFromXml,
} from './rendering'
import path from 'path'
import fs from 'fs'
import { renderAsync } from 'jsx-xml'
import { Asset, Composition, Track } from '@/components'
import { sleep } from '@/utils'

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
                    <AsyncAsset
                        ms={3}
                        id='one'
                        filepath='one.mp4'
                        type='video'
                    />
                    <Asset id='two' filepath='two.mp4' type='video' />
                </Track>
                <Track id={'second'}>
                    <AsyncAsset
                        ms={0}
                        id='three'
                        filepath='three.mp4'
                        type='video'
                    />
                </Track>
            </Composition>,
        )
        const assets = await getAssetsFromXml(node)

        expect(assets).toMatchInlineSnapshot(`
          [
            {
              "filepath": "one.mp4",
              "id": "assetone",
              "parentTrackId": "tracksecond",
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
})
