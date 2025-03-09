
import { convertPdfToImages } from '@/lib/pdf'
import fs from 'fs'


async function main() {
    await convertPdfToImages({
        inputFile: '/Volumes/1tb sabrent/manga/Solo Leveling/Ch 094.pdf',
        outputDir: '94',
        outputPrefix: 'page',
    })
}

main()
