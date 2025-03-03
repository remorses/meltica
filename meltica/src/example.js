import { AudioFile, ImageFile, PanningAnimation } from 'meltica/src/components'
import { useContext } from 'xmlize'
import { renderingContext } from 'meltica/src/rendering'
import { render } from 'xmlize'

// type ImageInput = {
//     filepath: string
//     textToSpeechAudio?: string
// }

export function Ideal({ chunks = [] }) {
    
    const context = useContext(renderingContext)
    const totalDuration = context.producers.reduce(
        (acc, i) => acc + i.durationInSeconds,
        0,
    )

    return (
        <Video>
            <Track>
                {chunks.map((p, i) => {
                    const prod = context.producers.find((p) => p.id === x.id)
                    const out = prod.attributes.out || 0
                    return (
                        <ImageFile
                            in={0}
                            out={out}
                            filepath={p.imagePath}
                        >
                            <PanningAnimation />
                        </ImageFile>
                    )
                })}
            </Track>

            <Track>
                {chunks.map((x, i) => {
                    const prod = context.producers.find((p) => p.id === x.id)
                    const out = prod.attributes.out || 0
                    return (
                        <AudioFile
                            id={`tts-${i}`}
                            in={0}
                            out={out}
                            filepath={x.textToSpeechAudio}
                        />
                    )
                })}
            </Track>
            <Track>
                <AudioFile
                    id='background-song'
                    in={0}
                    out={totalDuration}
                    loop
                    filepath={'song.mp3'}
                >
                    <AudioGain volume={-14} />
                </AudioFile>
            </Track>
        </Video>
    )
}

render(<Ideal />)
