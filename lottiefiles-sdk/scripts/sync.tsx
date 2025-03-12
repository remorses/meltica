import { ChunkReqPayload, TrieveSDK } from 'trieve-ts-sdk'

const trieve = new TrieveSDK({
    apiKey: 'tr-IgV6yDXLzL59pEwpIvamwITUhWhbYV2J',
    datasetId: '69c5163a-880e-4f45-83f7-27dbb15be71f',
})

export async function sync() {
    // Clear Dataset Chunks
    await trieve.trieve.fetch(`/api/dataset/clear/{dataset_id}`, 'put', {
        datasetId: trieve.datasetId!,
    })

    let documents = pages.flatMap(function toTrievePayload(page) {
        let id = 0
        const chunks: ChunkReqPayload[] = []
        const scannedHeadings = new Set()

        function createPayload(
            section: string | undefined,
            sectionId: string | undefined,
            content: string,
        ): ChunkReqPayload {
            return {
                tracking_id: `${page._id}-${(id++).toString()}`,
                chunk_html: content,
                link: page.url,
                tag_set: page.tag ? [page.tag] : [],
                metadata: {
                    title: page.title,
                    section: section || '',
                    section_id: sectionId || '',
                    page_id: page._id,
                },
                group_tracking_ids: [page.title],
            }
        }

        if (page.description)
            chunks.push(createPayload(undefined, undefined, page.description))

        page.structured.contents.forEach((p) => {
            const heading = p.heading
                ? page.structured.headings.find((h) => p.heading === h.id)
                : null

            const index = createPayload(
                heading?.content,
                heading?.id,
                p.content,
            )

            if (heading && !scannedHeadings.has(heading.id)) {
                scannedHeadings.add(heading.id)

                chunks.push(
                    createPayload(heading.content, heading.id, heading.content),
                )
            }

            chunks.push(index)
        })

        return chunks
    })
    const chunkSize = 120
    const chunks: ChunkReqPayload[][] = []
    for (let i = 0; i < documents.length; i += chunkSize) {
        const chunk = documents.slice(i, i + chunkSize)
        chunks.push(chunk)
    }
    for (const chunk of chunks) {
        await trieve.createChunk(chunk)
    }
}

async function main() {
    const pages = await prisma.page.findMany({
        where: {
            site: {
                domains: {
                    some: {
                        host: 'localhost',
                    },
                },
            },
        },
    })
    if (!pages.length) {
        console.log('No pages found')
        return
    }
    const withStructure = await Promise.all(
        pages.map(async (page) => {
            const result = await remark()
                .use(remarkGfm)
                .use(remarkStructure)
                .process(page.markdown)
            const structuredData: StructuredData = result.data
                .structuredData as any
            // console.log('structuredData', structuredData)
            const record: DocumentRecord = {
                _id: page.pageId,
                // TODO add title to page model
                title: page.slug,
                url: page.slug,
                structured: structuredData,
                // markdown: page.markdown || '',
            }
            return record
        }),
    )
    await sync(withStructure)
}

main()
