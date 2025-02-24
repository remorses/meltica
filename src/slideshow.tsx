import {
    Asset,
    AudioGain,
    BlankSpace,
    PanningAnimation,
    Track,
    VideoRoot,
    Text,
} from '@/components'
import { formatSecondsToTime, renderToVideo, renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'

function Video({}) {
    return (
        <VideoRoot
            fps={30}
            width={1080}
            height={1920}
            duration={6}
            resultFilePath={'slideshow.mp4'}
        >
            <Track id={'video1'}>
                <Asset
                    type='video'
                    filepath={'recording.mov'}
                    id={'videoExample'}
                    in='00:00:00.000'
                    out='3'
                >
                    <PanningAnimation />
                </Asset>
                <Asset
                    type='image'
                    id={'producer0'}
                    filepath={'sololevelling/page-000.jpg'}
                    in={0}
                    out={4}
                >
                    <PanningAnimation />
                </Asset>
                <Asset
                    type='image'
                    id={'producer1'}
                    filepath={'sololevelling/page-001.jpg'}
                    in={0}
                    out={4}
                >
                    <PanningAnimation />
                </Asset>
            </Track>
            <Track id={'titles'}>
                <Text duration={4} top={100} id='text1' text='hello i am a little small text' />
            </Track>
            <Track id={'audio1'}>
                <BlankSpace length={1} />
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
if (!process.env.DISABLE_VIDEO) {
    renderToVideo(<Video />)
}
