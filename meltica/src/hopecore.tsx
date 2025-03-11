import {
    Composition,
    Track,
    Asset,
    CropRect,
    PanningAnimation,
    Glow,
    RichText,
    Blur,
    BlendMode,
    BlankSpace,
    Pitch,
    AudioGain,
} from 'meltica/src/components'
import { transcribeAudioFileCached } from 'meltica/src/transcript'
import { TypewriterEffect } from 'meltica/src/components/TypewriterEffect'
import { extractAudioFromVideo } from 'meltica/src/ffmpeg'

export async function HopeCoreVideo({ videoPath }) {
    const audioPath = await extractAudioFromVideo(videoPath)
    const transcription = await transcribeAudioFileCached({
        filePath: audioPath,
    })

    const duration =
        transcription.words[transcription.words.length - 1].timestamp[1]

    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={duration}
            resultFilePath={'slideshow.mp4'}
        >
            <Track id={'video1'}>
                <Asset
                    type='video'
                    filepath={videoPath}
                    id={'videoExample'}
                    out={duration}
                >
                    {/* <CropRect radius={0.3} id={'crop'} /> */}
                </Asset>
            </Track>

            <TypewriterEffect words={transcription.words} />

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
