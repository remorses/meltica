import {
    Asset,
    AudioGain,
    BlankSpace,
    Composition,
    Limiter,
    PanningAnimation,
    renderToVideo,
    Track,
} from 'meltica/src'
import { formatSecondsToTime, renderToPreview } from 'meltica/src'
import fs from 'fs'
import path from 'path'
import { text } from './text'
import { Sema } from 'async-sema'
import { generateSpeechToFile } from 'meltica/src/tts'
import { isTruthy } from 'meltica/src/utils'

async function createChunks() {
    const imagesFolder = './94'
    let images = (await fs.promises.readdir(imagesFolder)).sort()
    images = images.slice(0, 10)
    console.log(images)
    const sema = new Sema(10)
    const textAndImages = await Promise.all(
        text.map(async (x, index) => {
            await sema.acquire()
            try {
                const image = images[index]
                if (!image) {
                    return
                }
                const { durationInSeconds, filePath: audioFilePath } =
                    await generateSpeechToFile({
                        text: x.phrase,
                        speed: -0.5,
                        id: String(x.panel),
                    })

                return {
                    text: x.phrase,
                    audioFilePath,
                    durationInSeconds: durationInSeconds,
                    imagePath: path.resolve(imagesFolder, image),
                }
            } finally {
                sema.release()
            }
        }),
    )
    return textAndImages.filter(isTruthy)
}

const blankDuration = 0.5

async function Video({}) {
    const chunks = await createChunks()
    const duration = chunks.reduce(
        (acc, chunk) => acc + chunk.durationInSeconds,
        0,
    )
    console.log('duration', duration)
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={duration}
            resultFilePath={'94.mp4'}
        >
            <Track id='video'>
                {chunks.flatMap((chunk, i) => {
                    return [
                        <Asset
                            type='image'
                            id={`image-${i}`}
                            filepath={chunk.imagePath}
                            in={formatSecondsToTime(0)}
                            out={formatSecondsToTime(
                                chunk.durationInSeconds + blankDuration,
                            )}
                        >
                            <PanningAnimation />
                        </Asset>,
                    ]
                })}
            </Track>
            <Track id='audio'>
                {chunks.map((chunk, i) => {
                    return [
                        <Asset
                            type='audio'
                            id={`audio-${i}`}
                            filepath={chunk.audioFilePath}
                            in={formatSecondsToTime(0)}
                            out={formatSecondsToTime(chunk.durationInSeconds)}
                        >
                            <Limiter inputGain={6} limit={-10} />
                        </Asset>,
                        <BlankSpace
                            id={`blank-${i}`}
                            duration={blankDuration}
                        />,
                    ]
                })}
            </Track>
            <Track id={'audio2'}>
                <Asset
                    type='audio'
                    id={'chain1'}
                    filepath={'music.mp3'}
                    in='00:00:00.000'
                    out='00:02:15.067'
                >
                    <AudioGain volume={-16} />
                </Asset>
            </Track>
        </Composition>
    )
}

// writeFileSync('sololevelling.mlt', renderToXml(<Video />))
renderToPreview(<Video />)
renderToVideo(<Video />)
// renderToVideo(<Video />)
