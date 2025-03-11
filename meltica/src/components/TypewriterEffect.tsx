import { RichText, BlankSpace } from 'meltica/src/components'

interface Word {
    text: string;
    timestamp: [number, number]
}

interface TypewriterEffectProps {
    words: Word[];
}

export function TypewriterEffect({ words }: TypewriterEffectProps) {
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

    return words.map((word, i) => (
        <>
            {/* Add a BlankSpace to position the text at the correct time */}
            {i === 0 ? (
                <BlankSpace id={`blank_${i}`} duration={word.timestamp[0]} />
            ) : (
                <BlankSpace 
                    id={`blank_${i}`} 
                    duration={word.timestamp[0] - words[i-1].timestamp[1]} 
                />
            )}
            <RichText
                duration={word.timestamp[1] - word.timestamp[0]}
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
                            {word.text}{' '}
                        </div>
                    </div>
                }
            />
        </>
    ))
} 