import { Transform3D } from 'meltica/src/3d'
import {
    BlankSpace,
    Composition,
    InlineSvg,
    Limiter,
    Lottie,
    SlideIn,
    SlideOut,
    Track,
    Transform,
} from 'meltica/src/components'
import { renderToVideo } from 'meltica/src/rendering'
import { formatSecondsToTime } from 'meltica/src/time'
import { TextToSpeech } from 'meltica/src/tts'

function Video({}) {
    return (
        <Composition
            fps={25}
            width={1080}
            height={1920}
            duration={1}
            resultFilePath={'examples/corners.mp4'}
        >
            <Track id={'svgRectTrack'}>
                <InlineSvg
                    id={'svgRect'}
                    duration={1}
                    svg={
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 300 300'
                            width='300'
                            height='300'
                        >
                            <rect
                                x='50'
                                y='100'
                                width='200'
                                height='100'
                                fill='red'
                            />
                        </svg>
                    }
                >
                    <Transform3D
                        rotation={{ x: 0, y: 0.5, z: 0 }}
                        translation={[0, 0, 2]}
                    />
                </InlineSvg>
            </Track>
        </Composition>
    )
}

// fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))

await renderToVideo(<Video />)
// renderToPreview(<Video />)
