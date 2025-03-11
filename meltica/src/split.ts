export function splitTextInParts(
    text: string,
    maxLen = 300,
    separators = ['!', '?', '.', ';', ',', ' '],
): string[] {

    let parts = _splitTextInParts(text, maxLen, separators)
    return parts
}


// splits the audio into parts of maxLen, it prefers to split using the first separator, then the second, etc
export function _splitTextInParts(
    text: string,
    maxLen: number,
    separators: string[],
) {
    if (!text) {
        return []
    }
    if (text.length <= maxLen) {
        return [text.trim()]
    }
    let remaining = text.slice()
    for (let sep of separators) {
        while (remaining.length > maxLen) {
            let i = remaining.lastIndexOf(sep, maxLen - 1)
            if (i < 0) {
                break
            }
            let part = remaining.slice(0, i)
            remaining = remaining.slice(i + 1)
            if (part.length + 1 > maxLen) {
                continue
            }
            return [
                part.trim() + sep,
                ..._splitTextInParts(remaining, maxLen, separators).filter(
                    Boolean,
                ),
            ]
        }
    }
    throw new Error(
        `Could not split into max ${maxLen} text: '${text}', remaining: '${remaining}'`,
    )
}


export function removeNonSpoken(text: string) {
    text = text.replace(/(.)\.(\s|\n)/g, '$1!$2')
    text = text.replace(/[^\x00-\x7F]/g, '')
    text = text.replace(/(\r\n|\n|\r)/gm, '')
    // merge together multiple spaces
    text = text.replace(/\s+/g, ' ')

    return text
}
