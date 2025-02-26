// https://github.com/mgcrea/js-canvas-object-fit/tree/master

// Without rotation handling
export const calculateBasicImageDimensions = ({
    image,
    x,
    y,
    width,
    height,
    objectFit = 'none',
    offsetX = 1 / 2,
    offsetY = 1 / 2,
}: {
    image: { width: number; height: number }
    x: number
    y: number
    width: number
    height: number
    objectFit?: 'none' | 'cover' | 'contain' | 'fill'
    offsetX?: number
    offsetY?: number
}) => {
    const imageWidth = image.width
    const imageHeight = image.height

    if (objectFit === 'none') {
        return { left: x, top: y, width: image.width, height: image.height }
    }

    if (objectFit === 'fill') {
        return { left: x, top: y, width: width, height: height }
    }

    // Calculate scaling ratio based on objectFit
    const resizeRatio = Math[objectFit === 'cover' ? 'max' : 'min'](
        width / imageWidth,
        height / imageHeight,
    )

    // Calculate new dimensions
    const newWidth = imageWidth * resizeRatio
    const newHeight = imageHeight * resizeRatio

    // Calculate position to center the image
    const left = x - (newWidth - width) * offsetX
    const top = y - (newHeight - height) * offsetY

    return { left, top, width: newWidth, height: newHeight }
}
