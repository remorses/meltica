import { useAssetContext } from 'meltica/src/context'

/** Represents a 2D point with x,y coordinates between 0-1 */
export type Point2D = {
    x: number
    y: number
}

/** Represents the four corners of a quadrilateral */
export type Corners = {
    topLeft: Point2D
    topRight: Point2D
    bottomRight: Point2D
    bottomLeft: Point2D
}

// Type definitions
type Vec3 = [number, number, number]

interface Rotation {
    x: number
    y: number
    z: number
}

// Perspective projection function
const perspectiveProject = (vertex: Vec3): Point2D => {
    const fov = Math.PI / 4 // 45 degrees
    const f = 1 / Math.tan(fov / 2)
    return {
        x: (vertex[0] * f) / vertex[2],
        y: (vertex[1] * f) / vertex[2],
    }
}

// 3D transformation function
export const apply3DRotationAndTranslation = (
    corners: Corners,
    rotation: Rotation,
    translation: Vec3,
): Corners => {
    const cosX = Math.cos(rotation.x)
    const sinX = Math.sin(rotation.x)
    const cosY = Math.cos(rotation.y)
    const sinY = Math.sin(rotation.y)
    const cosZ = Math.cos(rotation.z)
    const sinZ = Math.sin(rotation.z)

    const transformPoint = (point: Point2D): Point2D => {
        let vertex: Vec3 = [point.x - 0.5, point.y - 0.5, 0]

        // Rotate X-axis
        vertex = [
            vertex[0],
            vertex[1] * cosX - vertex[2] * sinX,
            vertex[1] * sinX + vertex[2] * cosX,
        ]

        // Rotate Y-axis
        vertex = [
            vertex[0] * cosY + vertex[2] * sinY,
            vertex[1],
            -vertex[0] * sinY + vertex[2] * cosY,
        ]

        // Rotate Z-axis
        vertex = [
            vertex[0] * cosZ - vertex[1] * sinZ,
            vertex[0] * sinZ + vertex[1] * cosZ,
            vertex[2],
        ]

        // Translate
        vertex = [
            vertex[0] + translation[0],
            vertex[1] + translation[1],
            vertex[2] + translation[2],
        ]

        // Perspective projection
        const projected = perspectiveProject(vertex)

        // Map back to normalized coordinates
        return {
            x: projected.x + 0.5,
            y: projected.y + 0.5,
        }
    }

    // Match the order used in the frei0r.c0rners filter:
    // topLeft, topRight, bottomRight, bottomLeft
    return {
        topLeft: transformPoint(corners.topLeft),
        topRight: transformPoint(corners.topRight),
        bottomRight: transformPoint(corners.bottomRight),
        bottomLeft: transformPoint(corners.bottomLeft),
    }
}

export function Transform3D({
    /** Rotation angles in radians around each axis */
    rotation = { x: 0, y: 0, z: 0 } as Rotation,
    /** Translation vector [x, y, z] */
    translation = [0, 0, 2] as Vec3,
    /** The four corners defining the quadrilateral shape */
    corners = {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 1, y: 0 },
        bottomRight: { x: 1, y: 1 },
        bottomLeft: { x: 0, y: 1 },
    } as Corners,
    /** Whether to stretch the image to fill the corners */
    stretch = true,
    /** Interpolation quality between corners (0=low, 1=high) */
    interpolator = 0.627,
    /** Amount of edge feathering (0=sharp, 1=smooth) */
    feather = 0.624,
    /** Alpha blend amount (0=transparent, 1=opaque) */
    alpha = 0.333333,
    /** Whether to enable transparency */
    transparent = true,
    /** Amount of alpha channel feathering (0=sharp, 1=smooth) */
    featherAlpha = 0.01,
}) {
    const transformedCorners = apply3DRotationAndTranslation(
        corners,
        rotation,
        translation,
    )

    return (
        <CornerPin
            corners={transformedCorners}
            stretch={stretch}
            interpolator={interpolator}
            feather={feather}
            alpha={alpha}
            transparent={transparent}
            featherAlpha={featherAlpha}
        />
    )
}

export function CornerPin({
    /** The four corners defining the quadrilateral shape.
     * Each corner uses a normalized coordinate system where:
     * -1 = one video width/height outside the edge
     * 0 = edge of video
     * 1 = opposite edge of video
     *
     * Values can extend beyond -1/1. In the filter's coordinate system:
     * -1 maps to 0 (completely outside video)
     * 0 maps to 0.333333 (video edge)
     * 1 maps to 0.666667 (opposite edge)
     * 2 maps to 1.0 (maximum allowed by filter)
     *
     * The default corners place the vertices exactly at the video edges:
     */
    corners = {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 1, y: 0 },
        bottomRight: { x: 1, y: 1 },
        bottomLeft: { x: 0, y: 1 },
    } as Corners,
    /** Whether to stretch the image to fill the corners */
    stretch = true,
    /** Interpolation quality between corners (0=low, 1=high) */
    interpolator = 0.627,
    /** Amount of edge feathering (0=sharp, 1=smooth) */
    feather = 0.624,
    /** Alpha blend amount (0=transparent, 1=opaque) */
    alpha = 0.333333,
    /** Whether to enable transparency */
    transparent = true,
    /** Amount of alpha channel feathering (0=sharp, 1=smooth) */
    featherAlpha = 0.01,
}) {
    const { producer } = useAssetContext()
    const id = producer.id

    const { topLeft, topRight, bottomRight, bottomLeft } = corners
    const [x1, y1] = convertToC0rnersCoordinates(topLeft.x, topLeft.y)
    const [x2, y2] = convertToC0rnersCoordinates(topRight.x, topRight.y)
    const [x3, y3] = convertToC0rnersCoordinates(bottomRight.x, bottomRight.y)
    const [x4, y4] = convertToC0rnersCoordinates(bottomLeft.x, bottomLeft.y)

    return (
        <filter id={id + 'cornerPin'}>
            <property name='version'>0.2</property>
            <property name='mlt_service'>frei0r.c0rners</property>
            <property name='0'>{x1}</property>
            <property name='1'>{y1}</property>
            <property name='2'>{x2}</property>
            <property name='3'>{y2}</property>
            <property name='4'>{x3}</property>
            <property name='5'>{y3}</property>
            <property name='6'>{x4}</property>
            <property name='7'>{y4}</property>
            <property name='8'>{stretch ? 1 : 0}</property>
            <property name='9'>{interpolator}</property>
            <property name='10'>{feather}</property>
            <property name='11'>{alpha}</property>
            <property name='12'>{transparent ? 1 : 0}</property>
            <property name='13'>{featherAlpha}</property>
            <property name='14'>0</property>
            <property name='shotcut:corner1'>
                {x1} {y1} 1
            </property>
            <property name='shotcut:corner2'>
                {x2} {y2} 1
            </property>
            <property name='shotcut:corner3'>
                {x3} {y3} 1
            </property>
            <property name='shotcut:corner4'>
                {x4} {y4} 1
            </property>
        </filter>
    )
}

// Convert from our coordinate system to filter's coordinate system
function convertToC0rnersCoordinates(x: number, y: number): [number, number] {
    // The standard frame in c0rners space is from 0.333333 to 0.666667
    // So we need to map 0-1 to that range
    const c0rnersX = 0.333333 + x * 0.333333
    const c0rnersY = 0.333333 + y * 0.333333

    return [c0rnersX, c0rnersY]
}
