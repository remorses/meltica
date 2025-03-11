import { Asset, Composition, Track } from 'meltica/src/components'
import { TypewriterEffect } from 'meltica/src/components/TypewriterEffect'
import { renderToPreview, renderToVideo } from 'meltica/src/rendering'
import { transcribeAudioFileCached } from 'meltica/src/transcript'

async function Video({}) {
    const speechPath = 'examples/speech-tts2.wav'
    const words = await transcribeAudioFileCached({
        filePath: speechPath,
        prompt: 'super precise timestamps',
    })
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={8}
            resultFilePath={'examples/typewriter.mp4'}
        >
            <Track id={'typewriter'}>
                {/* <TypewriterEffect
                    id='0'
                    words={words.words.map((x) => {
                        x.text += '\n'
                        return x
                    })}
                /> */}
                <TypewriterEffect
                    id='1'
                    words={[
                        { text: 'Hello ', timestamp: [0, 0] }, //
                        { text: 'how ', timestamp: [0, 0] }, //
                        { text: 'are ', timestamp: [0.1, 0.5] }, //
                        { text: 'you?', timestamp: [0.5, 1] }, //
                    ]}
                />

                <TypewriterEffect
                    id='2'
                    words={[
                        { text: 'Again ', timestamp: [0, 0] }, //
                        { text: 'how ', timestamp: [0, 0] }, //
                        { text: 'are ', timestamp: [0.1, 0.5] }, //
                        { text: 'you?', timestamp: [0.5, 1] }, //
                    ]}
                />
            </Track>
            <Track id={'audio'}>
                <Asset id='speech-tts2' filepath={speechPath} type='audio' />
            </Track>
        </Composition>
    )
}

// fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))

renderToVideo(<Video />)
