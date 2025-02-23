import {
    PanningAnimation,
    
    Profile,
    VideoRoot,
    Asset,
    Track,
    VideoConsumer,
} from '@/components'
import { renderToVideo, renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'

function MLT({}) {
    return (
        <VideoRoot>
            <VideoConsumer target={'out.mp4'} />
            <Profile width={1080} height={1920} fps={30} />
            <Track id={'video1'}>
                <Asset
                    type='image'
                    id={'producer0'}
                    filepath={'sololevelling/page-000.jpg'}
                    in='00:00:00.000'
                    out='00:00:02.867'
                />
                <Asset
                    type='image'
                    id={'producer1'}
                    filepath={'sololevelling/page-001.jpg'}
                    in='00:00:00.000'
                    out='00:00:02.733'
                />
                <Asset
                    type='image'
                    id={'producer2'}
                    filepath={'sololevelling/page-002.jpg'}
                    in='00:00:00.000'
                    out='00:00:03.167'
                />

                <Asset
                    type='video'
                    filepath={'out.mp4'}
                    id={'chain0'}
                    in='00:00:00.000'
                    out='00:00:14.467'
                >
                    <PanningAnimation />
                </Asset>
            </Track>
            <Track id={'audio1'}>
                <Asset
                    type='audio'
                    filepath={'narrator.wav'}
                    id={'chain0'}
                    in='00:00:00.000'
                    out='00:00:14.467'
                />
            </Track>
            <Track id={'audio2'}>
                <Asset
                    type='audio'
                    id={'chain1'}
                    filepath={'edapollo - Let It Go [bQ5glYCsv94].mp3'}
                    in='00:00:00.000'
                    out='00:02:15.067'
                />
            </Track>
        </VideoRoot>
    )
}

writeFileSync('slideshow-shotcut.mlt', renderToXml(<MLT />))
renderToVideo(<MLT />)
