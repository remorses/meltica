type CodeOuterGridProps = {
    /** Total width of the SVG */
    width?: number
    /** Total height of the SVG */
    height?: number
    /** Padding from the edge to the grid border */
    padding?: number
    /** Color of the grid lines */
    lineColor?: string
    /** Background color */
    backgroundColor?: string
    /** Background color outside the main rectangle */
    outerBackgroundColor?: string
    /** Size of the corner markers */
    cornerSize?: number
    children?: any
}

/**
 * A clean outer rectangle grid with corner markers
 */
export const CodeOuterGrid = ({
    width = 600,
    height = 400,
    padding = 50,
    lineColor = 'rgba(255, 255, 255, 0.15)',
    backgroundColor = '#000000',
    outerBackgroundColor = '#000000',
    cornerSize = 15, // Increased corner marker size from 8 to 15
    children,
}: CodeOuterGridProps) => {
    const plusStrokeWidth = 1.5
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            {/* Outer background */}
            <rect width={width} height={height} fill={outerBackgroundColor} />

            {/* Frame lines (replacing inner background rectangle) */}
            {/* Top horizontal line */}
            <line
                x1='0'
                y1={padding}
                x2={width}
                y2={padding}
                stroke={lineColor}
                stroke-width='1'
            />

            {/* Bottom horizontal line */}
            <line
                x1='0'
                y1={height - padding}
                x2={width}
                y2={height - padding}
                stroke={lineColor}
                stroke-width='1'
            />

            {/* Left vertical line */}
            <line
                x1={padding}
                y1='0'
                x2={padding}
                y2={height}
                stroke={lineColor}
                stroke-width='1'
            />

            {/* Right vertical line */}
            <line
                x1={width - padding}
                y1='0'
                x2={width - padding}
                y2={height}
                stroke={lineColor}
                stroke-width='1'
            />

            {/* Corner markers (plus signs at the corners) */}
            {/* Top-left */}
            <path
                d={`M${padding - cornerSize},${padding} L${padding + cornerSize},${padding} M${padding},${padding - cornerSize} L${padding},${padding + cornerSize}`}
                stroke={lineColor}
                stroke-width={plusStrokeWidth}
            />

            {/* Top-right */}
            {/* <path
                d={`M${width - padding - cornerSize},${padding} L${width - padding + cornerSize},${padding} M${width - padding},${padding - cornerSize} L${width - padding},${padding + cornerSize}`}
                stroke={lineColor}
                stroke-width={plusStrokeWidth}
            /> */}

            {/* Bottom-left */}
            {/* <path
                d={`M${padding - cornerSize},${height - padding} L${padding + cornerSize},${height - padding} M${padding},${height - padding - cornerSize} L${padding},${height - padding + cornerSize}`}
                stroke={lineColor}
                stroke-width={plusStrokeWidth}
            /> */}

            {/* Bottom-right */}
            <path
                d={`M${width - padding - cornerSize},${height - padding} L${width - padding + cornerSize},${height - padding} M${width - padding},${height - padding - cornerSize} L${width - padding},${height - padding + cornerSize}`}
                stroke={lineColor}
                stroke-width={plusStrokeWidth}
            />

            {/* Render children inside the frame */}
            {children}
        </svg>
    )
}
