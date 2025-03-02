import { WholeWordIcon } from 'lucide-react'
import {
    Transform,
    Composition,
    Track,
    InlineSvg,
    Asset,
    AudioGain,
} from 'meltica/src/components'
import { renderToVideo, renderToXml } from 'meltica/src/rendering'

import { describe, test, expect } from 'vitest'

describe('examples', () => {
    process.env.DISABLE_CACHE = 'true'
    test('1. svg icon from React', async () => {
        function Video({}) {
            return (
                <Composition
                    fps={30}
                    width={1080}
                    height={1920}
                    duration={3}
                    resultFilePath={'examples/svg.mp4'}
                >
                    <Track id={'svgCodeTrack'}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <InlineSvg
                                id={`world${index}`}
                                duration={0.1}
                                svg={
                                    <WholeWordIcon
                                        color={
                                            index % 2 === 0 ? 'white' : 'red'
                                        }
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
                    </Track>
                    <Track id={'soundtrack'}>
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
        const mlt = await renderToXml(<Video />)

        expect(mlt).toMatchSnapshot()
    })
    test('2. simple inline svg ', async () => {
        function Video({}) {
            return (
                <Composition
                    fps={30}
                    width={1080}
                    height={1920}
                    duration={3}
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
                    <Track id={'soundtrack'}>
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
        const mlt = await renderToXml(<Video />)

        expect(mlt).toMatchSnapshot()
    })
    test('2. simple inline svg ', async () => {
        function Video({}) {
            return (
                <Composition
                    fps={30}
                    width={1080}
                    height={1920}
                    duration={3}
                    resultFilePath={'examples/svg.mp4'}
                >
                    <Track id={'svgCodeTrack'}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <InlineSvg
                                id={`world${index}`}
                                duration={0.1}
                                svg={
                                    <WholeWordIcon
                                        color={
                                            index % 2 === 0 ? 'white' : 'red'
                                        }
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
                        {/* <SlowComponent /> */}
                    </Track>
                    <Track id={'svgRectTrack2'}>
                        <InlineSvg
                            id={'svgRect2'}
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
                        ></InlineSvg>
                    </Track>
                    <Track id={'soundtrack'}>
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
        const mlt = await renderToXml(<Video />)

        expect(mlt).toMatchSnapshot()
    })
})
