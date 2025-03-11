import { test, expect } from 'vitest'
import { createClient } from './generated'

test('genql works', async () => {
    const client = createClient({})

    const res = await client.query({
        featuredPublicAnimations: {
            __args: {
                first: 1,
                // after: 'PREVIOUS_END_CURSOR',
            },
            edges: {
                cursor: true,
                node: {
                    id: true,
                    name: true,
                    description: true,
                    lottieUrl: true,
                    imageUrl: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            pageInfo: {
                hasNextPage: true,
                endCursor: true,
            },
        },
    })
    expect(res).toMatchInlineSnapshot(`
      {
        "featuredPublicAnimations": {
          "edges": [
            {
              "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
              "node": {
                "createdAt": "2025-03-11T07:03:52.761Z",
                "description": null,
                "id": 1045759,
                "imageUrl": "https://assets-v2.lottiefiles.com/a/fd991d60-fe46-11ef-ad52-afe8dcc88b67/0HS7UVLlq4.png",
                "lottieUrl": "https://assets-v2.lottiefiles.com/a/fd991d60-fe46-11ef-ad52-afe8dcc88b67/3fpajmhf16.lottie",
                "name": "Digital marketing strategy stickers",
                "updatedAt": null,
              },
            },
          ],
          "pageInfo": {
            "endCursor": "YXJyYXljb25uZWN0aW9uOjA=",
            "hasNextPage": true,
          },
        },
      }
    `)
})
