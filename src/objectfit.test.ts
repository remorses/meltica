import { Canvas, Image } from 'canvas'
import { describe, it, expect, beforeAll } from 'vitest'

import { toMatchImageSnapshot } from 'jest-image-snapshot'

import fs from 'fs'
import { drawImage } from '@/objectfit'

// const mkdirpAsync = Promise.promisify(mkdirp);
// const tmpPath = `${fixturesPath}/../.tmp`;
const fixturesPath = `${__dirname}/fixtures`

declare module 'vitest' {
    interface Assertion<T = any> {
        toMatchImageSnapshot(): void
    }
}

expect.extend({ toMatchImageSnapshot })

describe('download', () => {
    // beforeAll(() => Promise.all([mkdirpAsync(tmpPath)]));
    describe('image.jpg', () => {
        it('should properly support objectFit = "none"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(`${fixturesPath}/image.jpg`)
            // First draw using default API
            context.drawImage(image, 0, 0, width, height)
            const bufferA = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferA)).toBeTruthy()
            context.clearRect(0, 0, canvas.width, canvas.height)
            // Then draw using custom API
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'none',
            })
            const bufferB = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferB)).toBeTruthy()
            expect(bufferB).toMatchImageSnapshot()
            // Test equality
            expect(bufferA.equals(bufferB)).toBeTruthy()
        })
        it('should properly support objectFit = "cover"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(`${fixturesPath}/image.jpg`)
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'cover',
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
        it('should properly support objectFit = "contain"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(`${fixturesPath}/image.jpg`)
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'contain',
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
    })
    describe('image-rotated-exif-6.jpg', () => {
        it('should properly support objectFit = "none"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-6.jpg`,
            )
            // First draw using default API
            context.drawImage(image, 0, 0, width, height)
            const bufferA = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferA)).toBeTruthy()
            context.clearRect(0, 0, canvas.width, canvas.height)
            // Then draw using custom API
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'none',
                orientation: 6,
            })
            const bufferB = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferB)).toBeTruthy()
            expect(bufferB).toMatchImageSnapshot()
            // Test equality
            expect(bufferA.equals(bufferB)).toBeFalsy()
        })
        it('should properly support objectFit = "cover"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-6.jpg`,
            )
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'cover',
                orientation: 6,
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
        it('should properly support objectFit = "contain"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-6.jpg`,
            )
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'contain',
                orientation: 6,
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
    })
    describe('image-rotated-exif-3.jpg', () => {
        it('should properly support objectFit = "none"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-3.jpg`,
            )
            // First draw using default API
            context.drawImage(image, 0, 0, width, height)
            const bufferA = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferA)).toBeTruthy()
            context.clearRect(0, 0, canvas.width, canvas.height)
            // Then draw using custom API
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'none',
                orientation: 3,
            })
            const bufferB = canvas.toBuffer()
            expect(Buffer.isBuffer(bufferB)).toBeTruthy()
            expect(bufferB).toMatchImageSnapshot()
            // Test equality
            expect(bufferA.equals(bufferB)).toBeFalsy()
        })
        it('should properly support objectFit = "cover"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-3.jpg`,
            )
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'cover',
                orientation: 3,
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
        it('should properly support objectFit = "contain"', async () => {
            const [width, height] = [200, 200]
            const canvas = new Canvas(width, height)
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = await fs.readFileSync(
                `${fixturesPath}/image-rotated-exif-3.jpg`,
            )
            drawImage(context, image, 0, 0, canvas.width, canvas.height, {
                objectFit: 'contain',
                orientation: 3,
            })
            const buffer = canvas.toBuffer()
            expect(Buffer.isBuffer(buffer)).toBeTruthy()
            expect(buffer).toMatchImageSnapshot()
        })
    })
})
