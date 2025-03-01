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
} from 'meltica/src/components'
import {
    renderToPreview,
    renderToVideo,
    renderToXml,
} from 'meltica/src/rendering'
import { sleep } from 'meltica/src/utils'
import { persistentMemo } from 'meltica/src/memo'
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

const SlowComponent = persistentMemo(async function ({}) {
    console.log('rendering slow component')
    await sleep(1)
    return <Asset type='video' id='slow' filepath='video.mp4' in={0} out={10} />
})

function Video({}) {
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={8}
            resultFilePath={'examples/svg.mp4'}
        >
            <Track id={'svgCodeTrack'}>
                <InlineSvg
                    id={'svgCode'}
                    duration={3}
                    svg={<CodeSnippet code={codeSnippet} />}
                ></InlineSvg>
                {Array.from({ length: 6 }).map((_, index) => (
                    <InlineSvg
                        id={`world${index}`}
                        duration={0.1}
                        svg={
                            <WholeWordIcon
                                color={index % 2 === 0 ? 'white' : 'red'}
                            />
                        }
                    >
                        <Transform
                            keyframes={[
                                {
                                    time: 0,
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                },
                            ]}
                        />
                    </InlineSvg>
                ))}
                <SlowComponent />
            </Track>
            <Track id={'svgRectTrack'}>
                <InlineSvg
                    id={'svgRect'}
                    duration={3}
                    svg={
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 300 300'
                            width='300'
                            height='300'
                        >
                            <rect
                                x='75'
                                y='75'
                                width='150'
                                height='150'
                                fill='red'
                            />
                        </svg>
                    }
                >
                    <Transform
                        keyframes={[
                            {
                                time: 0,
                                objectFit: 'contain',
                                objectPosition: 'center',
                            },
                        ]}
                    />
                </InlineSvg>
            </Track>
            <Track id={'soundtrackTrack'}>
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
renderToVideo(<Video />)
renderToPreview(<Video />)
