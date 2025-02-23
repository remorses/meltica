import {
    Asset,
    AudioGain,
    BlankSpace,
    PanningAnimation,
    Track,
    VideoRoot
} from '@/components'
import { formatSecondsToTime, renderToVideo, renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'

function MLT({}) {
    return (
        <VideoRoot
            fps={30}
            width={1080}
            height={1920}
            resultFilePath={'slideshow.mp4'}
        >
            
            <Track id={'video1'}>
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
                <Asset
                    type='image'
                    id={'producer2'}
                    filepath={'sololevelling/page-002.jpg'}
                    in={0}
                    out={4}
                >
                    <PanningAnimation />
                </Asset>
                {/* <Asset
                    type='video'
                    filepath={'out.mp4'}
                    id={'chain0'}
                    in='00:00:00.000'
                    out='00:00:14.467'
                >
                    <PanningAnimation />
                </Asset> */}
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

writeFileSync('slideshow-shotcut.mlt', renderToXml(<MLT />))
renderToVideo(<MLT />)
