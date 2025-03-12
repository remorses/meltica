export interface SplitTextOptions<T> {
    items: T[]
    getText: (item: T) => string
    maxLen?: number
    separators?: string[]
    isSeparatorItem?: (currentItem: T, nextItem?: T) => boolean
}

export function splitTextInParts<T>(options: SplitTextOptions<T>): T[][] {
    const {
        items,
        getText,
        maxLen = 300,
        separators = ['!', '?', '.', ';', ',', ' '],
        isSeparatorItem = () => false,
    } = options

    let parts = _splitItemsInParts({ items, getText, maxLen, separators, isSeparatorItem })
    return parts
}

// splits the array of items into parts where the combined text length is at most maxLen
// it prefers to split using the first separator, then the second, etc
export function _splitItemsInParts<T>(
    options: Required<SplitTextOptions<T>>,
): T[][] {
    const { items, getText, maxLen, separators, isSeparatorItem } = options

    if (!items || items.length === 0) {
        return []
    }

    // Calculate the total text length
    const combinedText = items.map((item) => getText(item)).join('')
    if (combinedText.length <= maxLen) {
        return [items]
    }

    // First check for separator items
    for (let i = 0; i < items.length - 1; i++) {
        const currentItem = items[i];
        const nextItem = items[i + 1];
        
        // Check if this is a separator item
        if (isSeparatorItem(currentItem, nextItem)) {
            const firstPart = items.slice(0, i + 1);
            const remainingPart = items.slice(i + 1);
            
            // Calculate if the first part is within maxLen
            const firstPartLength = firstPart.reduce((sum, item) => sum + getText(item).length, 0);
            
            if (firstPartLength <= maxLen) {
                return [
                    firstPart,
                    ..._splitItemsInParts({
                        items: remainingPart,
                        getText,
                        maxLen,
                        separators,
                        isSeparatorItem,
                    }),
                ];
            }
        }
    }

    // If no separator items found or they don't provide a good split point,
    // continue with the original separator-based logic
    for (let sep of separators) {
        let currentItems = [...items]
        let currentLength = combinedText.length

        while (currentLength > maxLen) {
            // Find the last occurrence of the separator within maxLen
            let lastSepIndex = -1
            let lengthSum = 0

            for (let i = 0; i < currentItems.length; i++) {
                const itemText = getText(currentItems[i])

                // If adding this item would exceed maxLen, stop looking
                if (lengthSum + itemText.length > maxLen) {
                    // But check if this item contains the separator within the maxLen boundary
                    const remainingSpace = maxLen - lengthSum
                    if (remainingSpace > 0) {
                        const sepIndex = itemText.lastIndexOf(
                            sep,
                            remainingSpace - 1,
                        )
                        if (sepIndex >= 0) {
                            lastSepIndex = i
                        }
                    }
                    break
                }

                lengthSum += itemText.length

                // Check if this item contains the separator
                const sepIndex = itemText.lastIndexOf(sep)
                if (sepIndex >= 0) {
                    lastSepIndex = i
                }
            }

            // If we found a separator, split there
            if (lastSepIndex >= 0) {
                const firstPart = currentItems.slice(0, lastSepIndex + 1)
                const remainingPart = currentItems.slice(lastSepIndex + 1)

                return [
                    firstPart,
                    ..._splitItemsInParts({
                        items: remainingPart,
                        getText,
                        maxLen,
                        separators,
                        isSeparatorItem,
                    }),
                ]
            } else {
                // If we can't find this separator, break and try the next one
                break
            }
        }
    }

    // If we can't find a good split point with separators, split at maxLen
    let currentLength = 0
    for (let i = 0; i < items.length; i++) {
        currentLength += getText(items[i]).length
        if (currentLength > maxLen) {
            if (i === 0) {
                // If the first item is already too long, we have to include it
                return [
                    [items[0]],
                    ..._splitItemsInParts({
                        items: items.slice(1),
                        getText,
                        maxLen,
                        separators,
                        isSeparatorItem,
                    }),
                ]
            }
            return [
                items.slice(0, i),
                ..._splitItemsInParts({
                    items: items.slice(i),
                    getText,
                    maxLen,
                    separators,
                    isSeparatorItem,
                }),
            ]
        }
    }

    throw new Error(
        `Could not split items into parts with max length ${maxLen}`,
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
