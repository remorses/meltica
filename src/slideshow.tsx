import {
    Asset,
    AudioGain,
    BlankSpace,
    PanningAnimation,
    Track,
    VideoRoot,
    RichText,
    CropRect,
} from '@/components'
import { formatSecondsToTime, previewVideo, renderToVideo, renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'
import { Fragment } from 'jsx-xml'

function Video({}) {
    return (
        <VideoRoot
            fps={30}
            width={1080}
            height={1920}
            duration={30}
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
                    <CropRect radius={0.3} id={'crop'} />
                    {/* <PanningAnimation /> */}
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
                {[...Array(12)].map((_, i) => {
                    const words =
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit'.split(
                            ' ',
                        )
                    const colors = [
                        '#ff0000',
                        '#00ff00',
                        '#0000ff',
                        '#ffff00',
                        '#ff00ff',
                        '#00ffff',
                        '#ff8000',
                        '#8000ff',
                        '#0080ff',
                        '#ff0080',
                    ]
                    return (
                        <RichText
                            duration={0.2}
                            top={200}
                            id={'text1_' + i}
                            html={
                                <div
                                    style="margin: 100px; font-size: 150px; font-family: 'Times New Roman', serif;"
                                    align='center'
                                >
                                    {words.map((word, wordIndex) => (
                                        <div
                                            align={
                                                wordIndex % 2 === 0
                                                    ? 'left'
                                                    : 'right'
                                            }
                                            style={`color: ${wordIndex < i + 1 ? colors[wordIndex % colors.length] : 'transparent'}`}
                                        >
                                            {word}{' '}
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    )
                })}
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

// writeFileSync('slideshow-shotcut.mlt', renderToXml(<Video />))
if (!process.env.DISABLE_VIDEO) {
    renderToVideo(<Video />, 'slideshow-shotcut.mlt')
}
// previewVideo(<Video />, 'slideshow-shotcut.mlt')
