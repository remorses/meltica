import { test, expect } from 'vitest'
import { createClient } from './generated'

test(
    'recentPublicAnimations',
    async () => {
        const client = createClient({})

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
                    "createdAt": "2025-03-11T07:47:11.588Z",
                    "createdBy": {
                      "id": "c6e60d3e-f389-4668-b2b8-132a8d9e7028",
                      "name": "derya.keles",
                      "username": "/y1pvsgrh55czmymx",
                    },
                    "createdByUserId": "c6e60d3e-f389-4668-b2b8-132a8d9e7028",
                    "description": null,
                    "dotlottieFormatVersion": "1",
                    "downloads": 0,
                    "frameRate": 29.9700012207031,
                    "gifFileSize": "1087868",
                    "gifUrl": "https://assets-v2.lottiefiles.com/a/0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0/ccOP6Kdh06.gif",
                    "id": 1045762,
                    "imageFileSize": 19705,
                    "imageFrame": null,
                    "imageUrl": "https://assets-v2.lottiefiles.com/a/0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0/mgPcidYsuB.png",
                    "isCanvaCompatible": true,
                    "isLiked": false,
                    "jsonUrl": "https://assets-v2.lottiefiles.com/a/0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0/Hb6A5wftia.json",
                    "likesCount": 0,
                    "lottieFileSize": 2527,
                    "lottieFileType": "LOTTIE",
                    "lottieUrl": "https://assets-v2.lottiefiles.com/a/0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0/xDZlRlV2Lg.lottie",
                    "lottieVersion": null,
                    "name": "Progress_01",
                    "publishedAt": "2025-03-11T09:19:34.617Z",
                    "slug": "progress-01",
                    "sourceFileName": null,
                    "sourceFileSize": null,
                    "sourceFileType": null,
                    "sourceFileUrl": null,
                    "sourceName": null,
                    "sourceVersion": null,
                    "speed": 0,
                    "status": 1,
                    "updatedAt": null,
                    "url": "https://lottiefiles.com/animations/progress-01-aLkz17ayyc",
                    "uuid": "0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0",
                    "videoFileSize": 61167,
                    "videoUrl": "https://assets-v2.lottiefiles.com/a/0a9e97dc-fe4d-11ef-98ac-6ff600f73bf0/MNnuvcd3LQ.mp4",
                  },
                },
              ],
              "pageInfo": {
                "endCursor": "YXJyYXljb25uZWN0aW9uOjA=",
                "hasNextPage": true,
              },
              "totalCount": 108810,
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
