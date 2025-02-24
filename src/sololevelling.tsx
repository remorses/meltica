import fs from 'fs'
import {
    Asset,
    AudioGain,
    BlankSpace,
    PanningAnimation,
    Track,
    VideoRoot,
} from '@/components'
import { formatSecondsToTime, renderToVideo, renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'
import path from 'path'

function Video({}) {
    const imagesFolder = './sololevelling'
    const allImages = fs
        .readdirSync(imagesFolder)
        .map((x) => path.join(imagesFolder, x))
        .sort()
    const imageDuration = 10
    const duration = allImages.length * imageDuration
    return (
        <VideoRoot
            fps={30}
            width={1080}
            height={1920}
            duration={duration}
            resultFilePath={'sololevelling.mp4'}
        >
            <Track id={'images'}>
                {allImages.map((filepath, i) => (
                    <Asset
                        type='image'
                        id={`producer${i}`}
                        filepath={filepath}
                        in={0}
                        out={imageDuration}
                    >
                        <PanningAnimation />
                    </Asset>
                ))}
            </Track>
            <Track id={'audio1'}>
                <BlankSpace length={formatSecondsToTime(1)} />
                <Asset
                    type='audio'
                    filepath={'narrator.wav'}
                    id={'chain0'}
                    // in='00:00:00.000'
                    // out='00:00:14.467'
                />
            </Track>
            <Track id={'audio2'}>
                <Asset
                    type='audio'
                    id={'chain1'}
                    filepath={'edapollo - Let It Go [bQ5glYCsv94].mp3'}
                    in='00:00:00.000'
                    out='00:02:15.067'
                >
                    <AudioGain volume={-14} />
                </Asset>
            </Track>
        </VideoRoot>
    )
}

writeFileSync('slideshow-shotcut.mlt', renderToXml(<Video />))
renderToVideo(<Video />)
