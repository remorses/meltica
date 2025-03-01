import { Canvas, Image } from 'canvas'
import { describe, it, expect, beforeAll } from 'vitest'

import { toMatchImageSnapshot } from 'jest-image-snapshot'

import fs from 'fs'
import { calculateBasicImageDimensions } from 'meltica/src/objectfit'

// const mkdirpAsync = Promise.promisify(mkdirp);
// const tmpPath = `${fixturesPath}/../.tmp`;
const fixturesPath = `${__dirname}/fixtures`

declare module 'vitest' {
    interface Assertion<T = any> {
        toMatchImageSnapshot(): void
    }
}

expect.extend({ toMatchImageSnapshot })

// Define image file names as variables
const horizontalImageFile = 'horizontal.jpg'
const verticalImageFile = 'vertical.jpg'

const canvasSizes = [
    [200, 200],
    [600, 600],
]

// Define object position combinations to test
const objectPositions = [
    { x: 'center', y: 'center', name: 'center-center' },
    { x: 'left', y: 'top', name: 'left-top' },
    { x: 'right', y: 'bottom', name: 'right-bottom' },
    { x: '50%', y: '50%', name: '50%-50%' },
] as const

for (const [width, height] of canvasSizes) {
    describe.skip(`${width}x${height}`, () => {
        describe('1. Horizontal', () => {
            for (const position of objectPositions) {
                it(`1. objectFit = "none", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    // First draw using default API
                    context.drawImage(image, 0, 0, width, height)
                    const bufferA = canvas.toBuffer()
                    expect(Buffer.isBuffer(bufferA)).toBeTruthy()
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    // Then draw using custom API
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'none',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const bufferB = canvas.toBuffer()
                    expect(Buffer.isBuffer(bufferB)).toBeTruthy()
                    expect(bufferB).toMatchImageSnapshot()
                })

                it(`2. objectFit = "cover", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'cover',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })

                it(`3. objectFit = "contain", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'contain',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })

                it(`4. objectFit = "fill", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'fill',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })
            }
        })

        describe('2. Vertical', () => {
            for (const position of objectPositions) {
                it(`5. objectFit = "none", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    // First draw using default API
                    context.drawImage(image, 0, 0, width, height)
                    const bufferA = canvas.toBuffer()
                    expect(Buffer.isBuffer(bufferA)).toBeTruthy()
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    // Then draw using custom API
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'none',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const bufferB = canvas.toBuffer()
                    expect(Buffer.isBuffer(bufferB)).toBeTruthy()
                    expect(bufferB).toMatchImageSnapshot()
                })

                it(`6. objectFit = "cover", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'cover',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })

                it(`7. objectFit = "contain", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'contain',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })

                it(`8. objectFit = "fill", objectPosition = "${position.name}"`, async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        objectWidth: image.width,
                        objectHeight: image.height,
                        x: 0,
                        y: 0,
                        containerWidth: canvas.width,
                        containerHeight: canvas.height,
                        objectFit: 'fill',
                        xObjectPosition: position.x,
                        yObjectPosition: position.y,
                    })
                    context.drawImage(
                        image,
                        dimensions.left,
                        dimensions.top,
                        dimensions.width,
                        dimensions.height,
                    )
                    const buffer = canvas.toBuffer()
                    expect(Buffer.isBuffer(buffer)).toBeTruthy()
                    expect(buffer).toMatchImageSnapshot()
                })
            }
        })
    })
}
