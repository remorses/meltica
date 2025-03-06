import fs from 'fs'
import { WholeWordIcon } from 'lucide-react'

import { CodeSnippet } from 'meltica/src/code/code'
import {
    Asset,
    AudioGain,
    InlineSvg,
    Track,
    Composition,
    Transform,
    SlideIn,
    Lottie,
    SlideOut,
} from 'meltica/src/components'
import {
    renderToPreview,
    renderToVideo,
    renderToXml,
} from 'meltica/src/rendering'
import { sleep } from 'meltica/src/utils'

const codeSnippet = `
import React from 'react'
import { CodeSnippet } from 'meltica/src/code/code'

export const code = <CodeSnippet
    code={
        <div>
            <h1>Hello World</h1>
        </div>
    }
/>
`

function Video({}) {
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={8}
            resultFilePath={'examples/lottie.mp4'}
        >
            <Track id={'video'}>
                <Lottie
                    type='image'
                    id={'svgCode'}
                    out={3}
                    filepath='examples/lottie.json'
                >
                    <Transform
                        keyframes={[
                            {
                                objectFit: 'cover',
                                time: 0,
                            },
                        ]}
                    />
                    <SlideIn id='slideIn' direction='right' duration={0.5} />
                    <SlideOut id='slideIn' direction='left' duration={0.5} />
                </Lottie>
            </Track>

            <Track id={'audio'}>
                <Asset
                    type='audio'
                    id={'soundtrack'}
                    filepath={'edapollo - Let It Go [bQ5glYCsv94].mp3'}
                    in='00:00:00.000'
                    out='00:02:15.067'
                >
                    <AudioGain volume={-14} />
                </Asset>
            </Track>
        </Composition>
    )
}

// fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))

await renderToVideo(<Video />)
// renderToPreview(<Video />)
