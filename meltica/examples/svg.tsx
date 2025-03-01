import fs from 'fs'
import { WholeWordIcon } from 'lucide-react'

import { CodeSnippet } from '@/code/code'
import {
    Asset,
    AudioGain,
    InlineSvg,
    Track,
    Composition,
    Transform,
} from '@/components'
import { renderToPreview, renderToVideo, renderToXml } from '@/rendering'
const codeSnippet = `
import React from 'react'
import { CodeSnippet } from '@/code/code'

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
            resultFilePath={'examples/svg.mp4'}
        >
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
                />
            </Track>

            <Track id={'svgCodeTrack'}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <InlineSvg
                        id={`world${index}`}
                        duration={0.1}
                        svg={
                            <WholeWordIcon
                                color={index % 2 === 0 ? 'white' : 'red'}
                            />
                        }
                    />
                ))}
                <InlineSvg
                    id={'svgCode'}
                    duration={3}
                    svg={<CodeSnippet code={codeSnippet} />}
                >
                    <Transform
                        keyframes={[
                            {
                                time: 0,
                                left: 0,
                                top: 0,
                                width: 100,
                                height: 100,
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

fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))
renderToVideo(<Video />)
renderToPreview(<Video />)
