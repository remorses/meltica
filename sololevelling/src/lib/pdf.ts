import { Poppler } from 'node-poppler'
import fs from 'fs'

export async function convertPdfToImages({
    inputFile,
    outputDir = 'output',
    outputPrefix = 'page',
}: {
    inputFile: string
    outputDir?: string
    outputPrefix?: string
}) {
    const poppler = new Poppler()

    // Create output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true })

    const outputPath = `${outputDir}/${outputPrefix}`

    const result = await poppler.pdfImages(inputFile, outputPath, {
        jpegFile: true,
    })
    console.log('PDF to images conversion complete:', result)
    return result
}
