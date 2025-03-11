import { RichText, BlankSpace, Track } from 'meltica/src/components'

interface Word {
    text: string
    timestamp: [number, number]
}

export function TypewriterEffect({
    words,
    id,
    in: inTime = 0,
}: {
    words: Word[]
    id?: string
    in?: number
}) {
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

    const firstWord = words[0]
    const lastWord = words[words.length - 1]
    const totalDuration = lastWord.timestamp[1] - firstWord.timestamp[0]

    return words.map((word, i) => (
        <Track id={`${id}_word_${i}`}>
            {/* Add a BlankSpace to position the text at the correct time */}
            {i === 0 ? (
                <BlankSpace
                    id={`blank_${i}`}
                    duration={inTime + word.timestamp[0]}
                />
            ) : (
                <BlankSpace
                    id={`blank_${i}`}
                    duration={
                        inTime +
                        firstWord.timestamp[0] -
                        words[i - 1].timestamp[1]
                    }
                />
            )}
            <RichText
                duration={totalDuration - word.timestamp[0]}
                top={200}
                id={'word_' + i}
                html={
                    <div
                        style="margin: 100px; font-size: 150px; font-family: 'Times New Roman', serif;"
                        align='center'
                    >
                        <div
                            align={i % 2 === 0 ? 'left' : 'right'}
                            style={`color: ${colors[i % colors.length]}`}
                        >
                            {word.text}
                        </div>
                    </div>
                }
            />
        </Track>
    ))
}
