import {
    BlankSpace,
    Composition,
    Lottie,
    SlideIn,
    SlideOut,
    Track,
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
            duration={8}
            resultFilePath={'examples/tts.mp4'}
        >
            <Track id={'video'}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <Lottie
                        type='image'
                        id={`lottie3_${i}`}
                        filepath='examples/docs.json'
                    ></Lottie>
                ))}
            </Track>
            <Track id={'tts'}>
                <TextToSpeech
                    id='tts1'
                    speed={-0.5}
                    text={`Hi everybody how is it going?`}
                ></TextToSpeech>
                <BlankSpace id={'blank'} duration={1} />
                <TextToSpeech
                    id='tts2'
                    speed={-0.5}
                    text={`Today is a new day, and today we will talk about Dune.`}
                ></TextToSpeech>
            </Track>
        </Composition>
    )
}

// fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))

await renderToVideo(<Video />)
// renderToPreview(<Video />)
