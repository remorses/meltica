import fs from 'fs'

import {
    Asset,
    AudioGain,
    BlankSpace,
    InlineSvg,
    PanningAnimation,
    Track,
    VideoRoot,
} from '@/components'
import {
    formatSecondsToTime,
    renderToPreview,
    renderToVideo,
    renderToXml,
} from '@/rendering'
import { writeFileSync } from 'fs'
import path from 'path'

function Video({}) {
    return (
        <VideoRoot
            fps={30}
            width={1080}
            height={1920}
            duration={3}
            resultFilePath={'examples/svg.mp4'}
        >
            <Track id={'svg'}>
                <InlineSvg
                    duration={3}
                    svg={
                        <svg width='300' height='300'>
                            <rect
                                x='75'
                                y='75'
                                width='150'
                                height='150'
                                fill='red'
                            />
                        </svg>
                    }
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

fs.writeFileSync('examples/svg.mlt', renderToXml(<Video />))
renderToPreview(<Video />)
