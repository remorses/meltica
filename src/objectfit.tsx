// https://github.com/mgcrea/js-canvas-object-fit/tree/master
//   1        2       3      4         5            6           7          8
//  888888  888888      88  88      8888888888  88                  88  8888888888
//  88          88      88  88      88  88      88  88          88  88      88  88
//  8888      8888    8888  8888    88          8888888888  8888888888          88
//  88          88      88  88
//  88          88  888888  888888
export const EXIF_ORIENTATIONS = [
    { op: 'none', radians: 0 },
    { op: 'none', radians: 0 },
    // CSS equivalents for each orientation:
    // 1: normal (no transform)
    // 2: transform: scaleX(-1); (flip horizontally)
    // 3: transform: rotate(180deg); (rotate 180°)
    // 4: transform: scaleY(-1); (flip vertically)
    // 5: transform: scaleX(-1) rotate(90deg); (flip horizontally and rotate 90° clockwise)
    // 6: transform: rotate(90deg); (rotate 90° clockwise)
    // 7: transform: scaleX(-1) rotate(-90deg); (flip horizontally and rotate 90° counter-clockwise)
    // 8: transform: rotate(-90deg); (rotate 90° counter-clockwise)
    { op: 'flip-x', radians: 0 },
    { op: 'none', radians: Math.PI },
    { op: 'flip-y', radians: 0 },
    { op: 'flip-x', radians: Math.PI / 2 },
    { op: 'none', radians: Math.PI / 2 },
    { op: 'flip-x', radians: -Math.PI / 2 },
    { op: 'none', radians: -Math.PI / 2 },
]

export const isExifRotated = (orientation) => [5, 6, 7, 8].includes(orientation)

// Without rotation handling
export const calculateBasicImageDimensions = ({
    image,
    x,
    y,
    width,
    height,
    objectFit = 'none',
    orientation = 0,
    offsetX = 1 / 2,
    offsetY = 1 / 2,
}: {
    image: { width: number; height: number };
    x: number;
    y: number;
    width: number;
    height: number;
    objectFit?: 'none' | 'cover' | 'contain';
    orientation?: number;
    offsetX?: number;
    offsetY?: number;
}) => {
    const imageWidth = image.width
    const imageHeight = image.height
    
    if (objectFit === 'none') {
        return { left: x, top: y, width, height }
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

 const calculateImageDimensions = ({
    image,
    x,
    y,
    width,
    height,
    objectFit = 'cover',
    orientation = 0,
    offsetX = 1 / 2,
    offsetY = 1 / 2,
}: {
    image: { width: number; height: number };
    x: number;
    y: number;
    width: number;
    height: number;
    objectFit?: 'none' | 'cover' | 'contain';
    orientation?: number;
    offsetX?: number;
    offsetY?: number;
}) => {
    // Orientation value
    const rotation = EXIF_ORIENTATIONS[orientation].radians
    const isHalfRotated = rotation !== 0 && rotation % Math.PI === 0
    const isQuarterRotated =
        rotation !== 0 && !isHalfRotated && rotation % (Math.PI / 2) === 0
    const isRotatedClockwise = rotation / (Math.PI / 2) < 0
    
    // Get dimensions based on rotation
    const imageWidth = !isQuarterRotated ? image.width : image.height
    const imageHeight = !isQuarterRotated ? image.height : image.width
    
    // Calculate scaling ratio based on objectFit
    const resizeRatio = Math[objectFit === 'cover' ? 'max' : 'min'](
        width / imageWidth,
        height / imageHeight,
    )
    
    // Calculate new dimensions
    const newWidth = imageWidth * resizeRatio
    const newHeight = imageHeight * resizeRatio
    
    // Calculate position adjustments for rotation
    let targetX = x
    let targetY = y
    let targetWidth = width
    let targetHeight = height
    
    // Apply rotation if needed
    if (rotation) {
        if (isHalfRotated) {
            targetX = -width - x
            targetY = -height - y
        } else if (isQuarterRotated) {
            if (isRotatedClockwise) {
                targetX = -height - x
                targetY = y
                targetWidth = height
                targetHeight = width
            } else {
                targetX = x
                targetY = -width - y
                targetWidth = height
                targetHeight = width
            }
        }
    }
    
    // Calculate position to center the image based on objectFit
    let drawX = targetX
    let drawY = targetY
    let drawWidth = newWidth
    let drawHeight = newHeight
    
    if (objectFit !== 'none') {
        // For cover and contain, adjust position to center the content
        drawX = targetX - (newWidth - targetWidth) * offsetX
        drawY = targetY - (newHeight - targetHeight) * offsetY
    } else {
        // For 'none', just use the target dimensions
        drawWidth = targetWidth
        drawHeight = targetHeight
    }
    
    return {
        left: drawX,
        top: drawY,
        width: drawWidth,
        height: drawHeight,
        rotation
    }
}
