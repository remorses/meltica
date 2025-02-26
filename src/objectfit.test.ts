import { Canvas, Image } from 'canvas'
import { describe, it, expect, beforeAll, expect } from 'vitest'

import { toMatchImageSnapshot } from 'jest-image-snapshot'

import fs from 'fs'
import { calculateBasicImageDimensions } from '@/objectfit'

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

describe('download', () => {
    // beforeAll(() => Promise.all([mkdirpAsync(tmpPath)]));
    
    // Define canvas sizes to test
    const canvasSizes = [[200, 200], [600, 600]];
    
    for (const [width, height] of canvasSizes) {
        describe(`Canvas size: ${width}x${height}`, () => {
            describe('1. Horizontal rectangular image tests', () => {
                it('1. should properly support objectFit = "none"', async () => {
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
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'none',
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
                    // Test equality
                    // expect(bufferA.equals(bufferB)).toBeTruthy()
                })
                it('2. should properly support objectFit = "cover"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'cover',
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
                it('3. should properly support objectFit = "contain"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'contain',
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
                it('4. should properly support objectFit = "fill"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${horizontalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'fill',
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
            })

            describe('2. Vertical rectangular image tests', () => {
                it('5. should properly support objectFit = "none"', async () => {
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
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'none',
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
                    // Test equality
                    // TODO
                    // expect(bufferA.equals(bufferB)).toBeFalsy()
                })
                it('6. should properly support objectFit = "cover"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'cover',
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
                it('7. should properly support objectFit = "contain"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'contain',
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
                it('8. should properly support objectFit = "fill"', async () => {
                    const canvas = new Canvas(width, height)
                    const context = canvas.getContext('2d')
                    const image = new Image()
                    image.src = await fs.readFileSync(
                        `${fixturesPath}/${verticalImageFile}`,
                    )
                    const dimensions = calculateBasicImageDimensions({
                        image,
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height,
                        objectFit: 'fill',
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
            })
        });
    }
})
