import { Fragment } from 'xmlize/jsx-runtime'
import { RichText, BlankSpace, Track } from '../components'

interface Word {
    text: string
    timestamp: [number, number]
}

export function TypewriterEffect({
    words,
    id,
    in: inTime = 0,
    holdTime = 0,
    fontSize = 100,
}: {
    words: Word[]
    id: string
    in?: number
    holdTime?: number
    fontSize?: number
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
    const inOffset = inTime - firstWord.timestamp[0]
    const totalDuration = lastWord.timestamp[1] - firstWord.timestamp[0]

    return (
        <>
            <BlankSpace id={`blank_initial`} duration={inOffset} />
            {words.map((word, i) => {
                // Calculate the duration for this clip
                const currentTime = word.timestamp[0]
                const nextTime =
                    i < words.length - 1
                        ? words[i + 1].timestamp[0]
                        : lastWord.timestamp[1] + holdTime
                const clipDuration = nextTime - currentTime

                // Collect all words that should be visible at this point
                const visibleWords = words.slice(0, i + 1)

                return (
                    <RichText
                        duration={clipDuration}
                        top={200}
                        id={`${id}_text_${i}`}
                        html={
                            <div
                                style={`margin: 100px; font-size: ${fontSize}px; font-family: 'Times New Roman', serif;`}
                                align='center'
                            >
                                {visibleWords.map((visibleWord, wordIndex) => (
                                    <div
                                        align={
                                            wordIndex % 2 === 0
                                                ? 'left'
                                                : 'right'
                                        }
                                        style={`color: ${colors[wordIndex % colors.length]}`}
                                    >
                                        {visibleWord.text}{' '}
                                    </div>
                                ))}
                            </div>
                        }
                    />
                )
            })}
        </>
    )
}
