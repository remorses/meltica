import {
    Composition,
    Lottie,
    SlideIn,
    SlideOut,
    Track,
} from 'meltica/src/components'
import { renderToVideo } from 'meltica/src/rendering'

function Video({}) {
    return (
        <Composition
            fps={30}
            width={1080}
            height={1920}
            duration={8}
            resultFilePath={'examples/lottie.mp4'}
        >
            <Track id={'video'}>
                <Lottie
                    type='image'
                    id={'svgCode'}
                    filepath='examples/lottie.json'
                >
                    <SlideIn id='slideIn' direction='right' duration={0.5} />
                    <SlideOut id='slideOut' direction='left' duration={0.5} />
                </Lottie>
                <Lottie
                    type='image'
                    id={'lottie2'}
                    filepath='examples/docs.json'
                >
                    <SlideIn id='slideIn' direction='right' duration={0.5} />
                </Lottie>
                <Lottie
                    type='image'
                    id={'lottie3'}
                    filepath='examples/docs.json'
                >
                    <SlideOut id='slideOut' direction='left' duration={0.5} />
                </Lottie>
            </Track>
        </Composition>
    )
}

// fs.writeFileSync('examples/svg.mlt', await renderToXml(<Video />))

await renderToVideo(<Video />)
// renderToPreview(<Video />)
