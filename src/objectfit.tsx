// https://github.com/mgcrea/js-canvas-object-fit/tree/master

// Type for object-position values (simplified version of CSS object-position)
type ObjectPositionValue = number | 'left' | 'center' | 'right' | 'top' | 'bottom' | `${number}%`;

// Function to convert object-position value to pixels
const convertObjectPositionToPixels = (
    value: ObjectPositionValue,
    containerSize: number,
    objectSize: number
): number => {
    if (typeof value === 'number') {
        // Direct pixel value
        return value;
    }
    
    // Handle percentage values
    if (typeof value === 'string' && value.endsWith('%')) {
        const percentage = parseFloat(value) / 100;
        return (containerSize - objectSize) * percentage;
    }
    
    // Handle keywords
    switch (value) {
        case 'left':
        case 'top':
            return 0;
        case 'right':
        case 'bottom':
            return containerSize - objectSize;
        case 'center':
        default:
            return (containerSize - objectSize) / 2;
    }
};

// Without rotation handling
export const calculateBasicImageDimensions = ({
    image,
    x,
    y,
    width,
    height,
    objectFit = 'none',
    xObjectPosition = 'center',
    yObjectPosition = 'center',
}: {
    image: { width: number; height: number }
    x: number
    y: number
    width: number
    height: number
    objectFit?: 'none' | 'cover' | 'contain' | 'fill'
    xObjectPosition?: ObjectPositionValue
    yObjectPosition?: ObjectPositionValue
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

    // Convert object-position values to pixels
    const xOffset = convertObjectPositionToPixels(xObjectPosition, width, newWidth);
    const yOffset = convertObjectPositionToPixels(yObjectPosition, height, newHeight);

    // Calculate final position
    const left = x + xOffset;
    const top = y + yOffset;

    return { left, top, width: newWidth, height: newHeight }
}
