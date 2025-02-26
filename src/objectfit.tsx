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

/**
 * Calculates image dimensions and position based on CSS object-fit and object-position properties.
 * 
 * This implementation follows the CSS specifications for object-fit and object-position:
 * - object-fit: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * - object-position: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
 * 
 * The object-fit property specifies how the content of a replaced element should be resized:
 * - 'none': The image is not resized
 * - 'fill': The image is resized to fill the given dimension
 * - 'contain': The image is scaled to maintain its aspect ratio while fitting within the element's content box
 * - 'cover': The image is sized to maintain its aspect ratio while filling the element's entire content box
 * 
 * The object-position property specifies the alignment of the replaced element's content:
 * - Can be specified using keywords (left, center, right, top, bottom)
 * - Can be specified using percentages or direct pixel values
 * - Controls positioning of the image within its container
 */

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
        // For 'none', we still need to apply object-position
        const xOffset = convertObjectPositionToPixels(xObjectPosition, width, imageWidth);
        const yOffset = convertObjectPositionToPixels(yObjectPosition, height, imageHeight);
        return { left: x + xOffset, top: y + yOffset, width: imageWidth, height: imageHeight }
    }

    if (objectFit === 'fill') {
        // For 'fill', we still need to apply object-position, but since the image
        // fills the entire container, object-position has no visible effect
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
