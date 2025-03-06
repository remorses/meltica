import {
    Asset,
    AudioGain,
    BlankSpace,
    BlendMode,
    Blur,
    Composition,
    CropRect,
    Glow,
    PanningAnimation,
    Pitch,
    RichText,
    Track,
} from 'meltica/src/components'
import { renderToPreview, renderToVideo } from 'meltica/src/rendering'

function Video({}) {
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={3}
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
                    <PanningAnimation />
                    {/* <SimpleChromaKey color='#2F2F2F' /> */}
                    <Glow />
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
            <Track id={'moreTitles'}>
                <RichText
                    duration={4}
                    id={'greeting'}
                    html={
                        <div
                            style='font-size: 120px; font-family: Arial, sans-serif; color: #ffffff;'
                            align='center'
                        >
                            Hello Everyone
                        </div>
                    }
                >
                    <Blur />
                    <BlendMode mode='difference' />
                </RichText>
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
                <BlankSpace id={'blank'} duration={1} />
                <Asset
                    type='audio'
                    filepath={'narrator.wav'}
                    id={'chain0'}
                    // in='00:00:00.000'
                    // out='00:00:14.467'
                >
                    <Pitch octaveshift={-0.1} />
                </Asset>
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
        </Composition>
    )
}

// writeFileSync('slideshow-shotcut.mlt', renderToXml(<Video />))
if (process.env.RENDER) {
    renderToVideo(<Video />, 'slideshow-shotcut.mlt')
} else {
    renderToPreview(<Video />, 'slideshow-shotcut.mlt')
}
