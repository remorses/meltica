import { test, expect } from 'vitest'
import { createClient } from './generated'

const client = createClient({})

test('max count', async () => {
    const max = 2000
    const res = await client.query({
        recentPublicAnimations: {
            __args: {
                first: max,
            },
            edges: {
                node: {
                    id: true,
                },
            },
        },
    })
    expect(res.recentPublicAnimations.edges.length).toBe(max)
})

test(
    'recentPublicAnimations',
    async () => {
        const res = await client.query({
            recentPublicAnimations: {
                __args: {
                    first: 1,

                    // orderBy: 'likesCount',

                    // after: 'PREVIOUS_END_CURSOR',
                },
                edges: {
                    cursor: true,
                    node: {
                        __scalar: true,
                        createdBy: {
                            id: true,
                            name: true,
                            username: true,
                        },
                    },
                },
                totalCount: true,
                pageInfo: {
                    hasNextPage: true,
                    endCursor: true,
                },
            },
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "recentPublicAnimations": {
              "edges": [
                {
                  "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
                  "node": {
                    "__typename": "PublicAnimation",
                    "bgColor": "#FFFFFF",
                    "commentsCount": 0,
                    "createdAt": "2025-03-12T02:53:44.036Z",
                    "createdBy": {
                      "id": "25321284-791f-4503-b1fb-b6fea8456926",
                      "name": "SM",
                      "username": "/smringku",
                    },
                    "createdByUserId": "25321284-791f-4503-b1fb-b6fea8456926",
                    "description": null,
                    "dotlottieFormatVersion": "1",
                    "downloads": 0,
                    "frameRate": 29.9700012207031,
                    "gifFileSize": "135187",
                    "gifUrl": "https://assets-v2.lottiefiles.com/a/361d1f1e-feed-11ef-ad3f-734fdbd0c3bd/2xM9TkGj8a.gif",
                    "id": 1045784,
                    "imageFileSize": 3001,
                    "imageFrame": null,
                    "imageUrl": "https://assets-v2.lottiefiles.com/a/361d1f1e-feed-11ef-ad3f-734fdbd0c3bd/7fbA4biwX5.png",
                    "isCanvaCompatible": true,
                    "isLiked": false,
                    "jsonUrl": "https://assets-v2.lottiefiles.com/a/361d1f1e-feed-11ef-ad3f-734fdbd0c3bd/51aSB95A3M.json",
                    "likesCount": 0,
                    "lottieFileSize": 1201,
                    "lottieFileType": "LOTTIE",
                    "lottieUrl": "https://assets-v2.lottiefiles.com/a/361d1f1e-feed-11ef-ad3f-734fdbd0c3bd/CMRr2iP5BM.lottie",
                    "lottieVersion": null,
                    "name": "Menu",
                    "publishedAt": "2025-03-12T03:02:19.607Z",
                    "slug": "menu",
                    "sourceFileName": null,
                    "sourceFileSize": null,
                    "sourceFileType": null,
                    "sourceFileUrl": null,
                    "sourceName": null,
                    "sourceVersion": null,
                    "speed": 0,
                    "status": 1,
                    "updatedAt": null,
                    "url": "https://lottiefiles.com/animations/menu-G1XbFVCy2D",
                    "uuid": "361d1f1e-feed-11ef-ad3f-734fdbd0c3bd",
                    "videoFileSize": 9851,
                    "videoUrl": "https://assets-v2.lottiefiles.com/a/361d1f1e-feed-11ef-ad3f-734fdbd0c3bd/wyaeYx24he.mp4",
                  },
                },
              ],
              "pageInfo": {
                "endCursor": "YXJyYXljb25uZWN0aW9uOjA=",
                "hasNextPage": true,
              },
              "totalCount": 108823,
            },
          }
        `)
    },
    1000 * 100,
)

test(
    'recentPremiumAssets',
    async () => {
        const client = createClient({})

        const res = await client.query({
            recentPremiumAssets: {
                __args: {
                    first: 1,

                    // orderBy: 'likesCount',

                    // after: 'PREVIOUS_END_CURSOR',
                },
                edges: {
                    cursor: true,
                    node: {
                        __scalar: true,
                        pack: {
                            __scalar: true,
                        },
                        formats: {
                            __scalar: true,
                        },
                    },
                },
                totalCount: true,
                pageInfo: {
                    hasNextPage: true,
                    endCursor: true,
                },
            },
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "recentPremiumAssets": {
              "edges": [
                {
                  "cursor": "YXJyYXljb25uZWN0aW9uOjE=",
                  "node": {
                    "__typename": "PremiumAsset",
                    "formats": {
                      "__typename": "PremiumAssetFormats",
                      "aep": false,
                    },
                    "id": 11441061,
                    "name": "Super Sale",
                    "pack": {
                      "__typename": "PremiumAssetPack",
                      "id": 325294,
                      "itemCount": 48,
                      "name": "E-commerce Label Tag",
                      "slug": "e-commerce-label-tag",
                      "thumbnailVideoUrl": "https://cdnl.iconscout.com/lottie-pack/preview-file/free-e-commerce-label-tag-325294@0.mp4?h=240",
                    },
                    "previewImageUrl": "https://cdnl.iconscout.com/lottie/premium/preview/super-sale-14220777-11441061.png",
                    "previewVideoUrl": "https://cdnl.iconscout.com/lottie/premium/preview-watermark/super-sale-14220777-11441061.mp4",
                    "slug": "super-sale-14220777",
                    "thumbnailVideoUrl": "https://cdnl.iconscout.com/lottie/premium/thumb/super-sale-14220777-11441061.mp4",
                    "type": "lottie",
                    "uuid": "a7d20a70-fe83-11ef-b736-0242ac140003",
                  },
                },
              ],
              "pageInfo": {
                "endCursor": "YXJyYXljb25uZWN0aW9uOjE=",
                "hasNextPage": true,
              },
              "totalCount": 563063,
            },
          }
        `)
    },
    1000 * 100,
)
