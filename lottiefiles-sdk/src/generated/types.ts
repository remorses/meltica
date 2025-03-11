export default {
    "scalars": [
        2,
        3,
        16,
        20,
        22,
        27,
        31,
        36,
        37,
        46,
        49,
        55,
        56,
        57,
        61,
        64,
        70,
        79,
        94,
        107,
        111,
        136,
        148,
        178,
        179,
        181,
        184,
        195,
        223,
        228,
        241,
        257,
        269,
        275,
        276,
        305,
        310,
        328,
        334,
        367,
        405,
        406
    ],
    "types": {
        "Query": {
            "enterpriseLoginAuthorizationUrl": [
                2,
                {
                    "state": [
                        2
                    ],
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "enterpriseOrganizationLogin": [
                4,
                {
                    "state": [
                        2
                    ],
                    "orgInternalId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "lookupSecretsReveal": [
                5
            ],
            "totpLinkStart": [
                6
            ],
            "authVersion": [
                2
            ],
            "jwt": [
                2
            ],
            "locales": [
                7
            ],
            "viewerNotificationPreferences": [
                9
            ],
            "oAuthConsentRequest": [
                14,
                {
                    "consentChallenge": [
                        2,
                        "String!"
                    ]
                }
            ],
            "oAuthLoginRequest": [
                17,
                {
                    "loginChallenge": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userSegments": [
                18
            ],
            "isUsernameAvailable": [
                3,
                {
                    "username": [
                        2,
                        "String!"
                    ]
                }
            ],
            "user": [
                21,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userSelfDeleteAvailable": [
                3
            ],
            "users": [
                21,
                {
                    "ids": [
                        2,
                        "[String]!"
                    ]
                }
            ],
            "viewer": [
                21
            ],
            "viewerCredentials": [
                23
            ],
            "blogs": [
                43,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "colorPalettes": [
                52,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "featuredAnimators": [
                39,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "featuredPublicAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "filters": [
                        34
                    ]
                }
            ],
            "legacyVersion": [
                2
            ],
            "notifications": [
                62
            ],
            "popularPublicAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "sort": [
                        57
                    ],
                    "filters": [
                        34
                    ]
                }
            ],
            "publicAnimation": [
                65,
                {
                    "id": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationByHash": [
                65,
                {
                    "hash": [
                        2,
                        "String!"
                    ]
                }
            ],
            "publicAnimationCollection": [
                75,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "publicAnimationCollections": [
                76,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "input": [
                        47
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "userId": [
                        2
                    ]
                }
            ],
            "publicAnimationCollectionsByUser": [
                76,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "userId": [
                        2
                    ]
                }
            ],
            "publicAnimationsByUser": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "input": [
                        71
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "userId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicCollectionAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "collectionId": [
                        36,
                        "Float!"
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "filters": [
                        34
                    ]
                }
            ],
            "publicAnimationTags": [
                73,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ]
                }
            ],
            "recentPublicAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "filters": [
                        34
                    ]
                }
            ],
            "searchPublicAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2,
                        "String!"
                    ],
                    "withAep": [
                        3
                    ],
                    "filters": [
                        34
                    ]
                }
            ],
            "softwareUpdates": [
                80,
                {
                    "app": [
                        2,
                        "String!"
                    ],
                    "version": [
                        2
                    ]
                }
            ],
            "trendingSearches": [
                83
            ],
            "userAchievements": [
                85,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "userStats": [
                88
            ],
            "viewerPublicAnimationDownloads": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "viewerPublicAnimationLikes": [
                66,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "last": [
                        20
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "services": [
                133
            ],
            "rasterToLottieStatus": [
                134,
                {
                    "jobId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "rasterToLottieVersion": [
                2
            ],
            "workspaceHasRequestedToJoin": [
                3,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceJoinRequests": [
                138,
                {
                    "query": [
                        2
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "accepted": [
                        3
                    ],
                    "adminsOnly": [
                        3
                    ],
                    "editorsOnly": [
                        3
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMemberCount": [
                36,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMembers": [
                138,
                {
                    "refreshCache": [
                        3
                    ],
                    "query": [
                        2
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "accepted": [
                        3
                    ],
                    "adminsOnly": [
                        3
                    ],
                    "editorsOnly": [
                        3
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMembersSearch": [
                159,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "access": [
                        2
                    ],
                    "byDomain": [
                        3
                    ],
                    "query": [
                        2
                    ],
                    "workspaceId": [
                        16
                    ]
                }
            ],
            "accountByWorkspaceId": [
                143,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceAuditLogs": [
                161,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ],
                    "toDate": [
                        22
                    ],
                    "fromDate": [
                        22
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "billingPackageDefaultPerUserPrice": [
                165
            ],
            "billingPackagePrice": [
                165,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "billingPackage": [
                166,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "billingPackages": [
                168,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ]
                }
            ],
            "cancelReasons": [
                170
            ],
            "commentMentionableUsers": [
                171,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentReplies": [
                172,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "comments": [
                172,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "type": [
                        184,
                        "CommentableEntityType!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "timelineCommentsByFrame": [
                172,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "frame": [
                        20,
                        "Int!"
                    ],
                    "type": [
                        184,
                        "CommentableEntityType!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "timelineCommentsCount": [
                185,
                {
                    "type": [
                        184,
                        "CommentableEntityType!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "communityAnimationImportCountForCalendarMonth": [
                186
            ],
            "enterpriseOrganization": [
                187,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationConfigurationLink": [
                2,
                {
                    "type": [
                        2,
                        "String!"
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationDirectoryClaims": [
                190,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationDirectoryGroups": [
                191,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileHandback": [
                193,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "deletedFile": [
                194,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "file": [
                194,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileAboveAndBelowId": [
                204,
                {
                    "folderId": [
                        16
                    ],
                    "sort": [
                        2
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileCountByWorkspaceId": [
                20,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileIdRecentlyModified": [
                2,
                {
                    "workspaceId": [
                        16
                    ]
                }
            ],
            "fileIdsWithinLimit": [
                2,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "filesRecentlyModified": [
                194,
                {
                    "filterDraftsByCurrentUser": [
                        3
                    ],
                    "filterByCurrentUserModifications": [
                        3
                    ],
                    "count": [
                        36
                    ],
                    "workspaceId": [
                        16
                    ],
                    "fileType": [
                        195
                    ]
                }
            ],
            "fileVariants": [
                205,
                {
                    "fileVersionId": [
                        16
                    ],
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersion": [
                196,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionOptimizeJob": [
                207,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionTagsGenerate": [
                2,
                {
                    "thumbnailUrl": [
                        2,
                        "String!"
                    ]
                }
            ],
            "fileVersions": [
                208,
                {
                    "includeSubVersions": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ],
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "folder": [
                198,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "folderFiles": [
                210,
                {
                    "type": [
                        2
                    ],
                    "status": [
                        2
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "foldersByProjectId": [
                198,
                {
                    "projectId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "searchFoldersInWorkspace": [
                198,
                {
                    "query": [
                        2,
                        "String!"
                    ],
                    "workspaceIds": [
                        16,
                        "[ID!]!"
                    ]
                }
            ],
            "invoice": [
                212,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "invoices": [
                212,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "getLottieMockups": [
                215,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "animationId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileNotificationsIsSubscribed": [
                3,
                {
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "novuSubscriberHash": [
                2
            ],
            "officialWorkspace": [
                229
            ],
            "getUserOnboardingChecklist": [
                231,
                {
                    "userId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "getUserOnboarding": [
                232,
                {
                    "userId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "editorFileEditCount": [
                36
            ],
            "hasAccessToAWorkspace": [
                3
            ],
            "hasAccessToPaidWorkspace": [
                3
            ],
            "isPaidUser": [
                3
            ],
            "userCountry": [
                2
            ],
            "userHasCreatorAccess": [
                3
            ],
            "paymentIntent": [
                233,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "paymentIntentCollectionMethod": [
                234
            ],
            "paymentIntentProcessingCheck": [
                233,
                {
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "portfolioPost": [
                236,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "portfolioPostIsSlugAvailable": [
                3,
                {
                    "input": [
                        238,
                        "PortfolioSlugAvailableInput!"
                    ]
                }
            ],
            "portfolioPosts": [
                239,
                {
                    "status": [
                        241
                    ],
                    "portfolioId": [
                        16,
                        "ID!"
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "workspacePortfolio": [
                242,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspacePortfolioHasEditAccess": [
                3,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspacePortfolioIsUrlAvailable": [
                3,
                {
                    "input": [
                        243,
                        "PortfolioUrlAvailableInput!"
                    ]
                }
            ],
            "featuredCuratedPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "featuredPremiumAssetPacks": [
                253,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "featuredPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "popularCuratedPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "popularPremiumAssetPacks": [
                253,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "popularPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "premiumAsset": [
                246,
                {
                    "slug": [
                        2,
                        "String!"
                    ]
                }
            ],
            "premiumAssetPack": [
                255,
                {
                    "slug": [
                        2,
                        "String!"
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "recentCuratedPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "recentPremiumAssetPacks": [
                253,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "recentPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "searchPremiumAssetPacks": [
                253,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ]
                }
            ],
            "searchPremiumAssets": [
                244,
                {
                    "canvaCompatible": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ]
                }
            ],
            "privateShareMembers": [
                256,
                {
                    "resourceType": [
                        257,
                        "PrivateShareType!"
                    ],
                    "resourceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "privateShareSuggestedMembers": [
                260,
                {
                    "resourceType": [
                        257,
                        "PrivateShareType!"
                    ],
                    "resourceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "privateShares": [
                261,
                {
                    "filterByType": [
                        2
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "project": [
                199,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "projectFiles": [
                263,
                {
                    "createdByUserId": [
                        2
                    ],
                    "type": [
                        2
                    ],
                    "status": [
                        2
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "searchProjectsInWorkspace": [
                199,
                {
                    "query": [
                        2,
                        "String!"
                    ],
                    "workspaceIds": [
                        16,
                        "[ID!]!"
                    ]
                }
            ],
            "workspaceDraftProject": [
                199,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceProjects": [
                266,
                {
                    "includeSystemProjects": [
                        3
                    ],
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicAssets": [
                202,
                {
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicShare": [
                268,
                {
                    "resourceType": [
                        269,
                        "PublicShareType!"
                    ],
                    "resourceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicShareByCode": [
                268,
                {
                    "shareCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "recentlyDeleted": [
                272,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "recentlyDeletedChildren": [
                263,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "resourceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "recentlyDeletedResource": [
                274,
                {
                    "input": [
                        278,
                        "RecentlyDeletedResourceInput!"
                    ]
                }
            ],
            "searchMultipleWorkspaces": [
                279,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "fileStatus": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "query": [
                        2
                    ],
                    "sort": [
                        2
                    ],
                    "workspaceIds": [
                        2,
                        "[String!]!"
                    ]
                }
            ],
            "searchWorkspace": [
                279,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "fileStatus": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "query": [
                        2
                    ],
                    "sort": [
                        2
                    ]
                }
            ],
            "sourceFile": [
                284,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "sourceFiles": [
                284,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "suggestedInvitees": [
                285,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "suggestedOfficialWorkspace": [
                288
            ],
            "suggestedWorkspaces": [
                290,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ]
                }
            ],
            "fileNotificationSubscribers": [
                292,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workflowVersion": [
                2
            ],
            "getUserOnboardingStatus": [
                295
            ],
            "workspaceCollection": [
                259,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollectionFiles": [
                210,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollections": [
                280,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "query": [
                        2
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceColorPalette": [
                296,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceColorPalettes": [
                297,
                {
                    "after": [
                        2
                    ],
                    "before": [
                        2
                    ],
                    "first": [
                        36
                    ],
                    "last": [
                        36
                    ],
                    "orderBy": [
                        79
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceInvitationLink": [
                151,
                {
                    "invitationCode": [
                        2
                    ],
                    "workspaceId": [
                        16
                    ]
                }
            ],
            "workspaceOwnershipTransferRequest": [
                299,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "brandInformation": [
                300,
                {
                    "domain": [
                        2,
                        "String!"
                    ]
                }
            ],
            "currentWorkspace": [
                142
            ],
            "workspace": [
                142,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCanAddMoreSeats": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCanManageMembers": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCounts": [
                301,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceSeatUtilization": [
                302,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceUserPrice": [
                303,
                {
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaces": [
                142
            ],
            "workspacesOwnedByUser": [
                142,
                {
                    "includeDraft": [
                        3
                    ]
                }
            ],
            "workspaceSettings": [
                304,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceSubscriptionAvailableDiscount": [
                306,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceSubscriptionAvailablePlanUpgrade": [
                307,
                {
                    "subscriptionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceSubscriptionCheckoutCompleted": [
                308,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "zipFile": [
                309,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "confirmResetPassword": [
                3,
                {
                    "newPassword": [
                        2,
                        "String!"
                    ],
                    "resetPasswordToken": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createLoginToken": [
                24,
                {
                    "appKey": [
                        2
                    ]
                }
            ],
            "enterpriseLinkWithLogin": [
                25,
                {
                    "web": [
                        3,
                        "Boolean!"
                    ],
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "enterpriseLogin": [
                25,
                {
                    "loginChallenge": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "logout": [
                3,
                {
                    "web": [
                        3
                    ]
                }
            ],
            "lookupSecretsDisable": [
                3
            ],
            "lookupSecretsLogin": [
                25,
                {
                    "loginChallenge": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "lookupSecretsRegenerate": [
                5
            ],
            "markLoginTokenValid": [
                3,
                {
                    "token": [
                        2,
                        "String!"
                    ]
                }
            ],
            "passwordLogin": [
                25,
                {
                    "loginChallenge": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "password": [
                        2,
                        "String!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "register": [
                25,
                {
                    "verificationToken": [
                        2
                    ],
                    "loginChallenge": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "lastName": [
                        2
                    ],
                    "name": [
                        2
                    ],
                    "firstName": [
                        2
                    ],
                    "password": [
                        2,
                        "String!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "resetPassword": [
                3,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "sessionsClear": [
                3,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "sessionsConfirmClear": [
                3,
                {
                    "sessionsClearToken": [
                        2,
                        "String!"
                    ]
                }
            ],
            "socialLogin": [
                25,
                {
                    "loginChallenge": [
                        2
                    ],
                    "clientSecret": [
                        2
                    ],
                    "clientId": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "accessToken": [
                        2
                    ],
                    "accessSecret": [
                        2
                    ],
                    "idToken": [
                        2
                    ],
                    "provider": [
                        2,
                        "String!"
                    ]
                }
            ],
            "tokenLogin": [
                25,
                {
                    "token": [
                        2,
                        "String!"
                    ]
                }
            ],
            "totpLinkConfirm": [
                5,
                {
                    "flowId": [
                        2,
                        "String!"
                    ],
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "totpLogin": [
                25,
                {
                    "loginChallenge": [
                        2
                    ],
                    "web": [
                        3
                    ],
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "totpUnlink": [
                3
            ],
            "cancelEmailChange": [
                21
            ],
            "confirmEmailChange": [
                3,
                {
                    "emailChangeToken": [
                        2,
                        "String!"
                    ]
                }
            ],
            "emailVerificationConfirm": [
                3,
                {
                    "emailVerificationToken": [
                        2,
                        "String!"
                    ]
                }
            ],
            "requestEmailChange": [
                21,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "resendEmailChangeEmail": [
                3
            ],
            "resendVerificationEmail": [
                3
            ],
            "unsubscribeEmailConfirm": [
                3,
                {
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "unsubscribeEmailRequest": [
                3,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userEmailVerify": [
                21,
                {
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "viewerNotificationPreferenceUpdate": [
                9,
                {
                    "input": [
                        26,
                        "NotificationPreferenceUpdateInput!"
                    ]
                }
            ],
            "viewerSlackNotificationWebhookDelete": [
                3
            ],
            "viewerSlackNotificationWebhookSet": [
                3,
                {
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "oAuthConsentRequestAccept": [
                2,
                {
                    "scopes": [
                        2,
                        "[String!]!"
                    ],
                    "consentChallenge": [
                        2,
                        "String!"
                    ]
                }
            ],
            "oAuthConsentRequestReject": [
                2,
                {
                    "consentChallenge": [
                        2,
                        "String!"
                    ]
                }
            ],
            "organizationInviteAccept": [
                28,
                {
                    "invitationCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "sessionSetValue": [
                3,
                {
                    "value": [
                        2
                    ],
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "isUsernameAvailable": [
                3,
                {
                    "username": [
                        2,
                        "String!"
                    ]
                }
            ],
            "passwordChange": [
                3,
                {
                    "newPassword": [
                        2,
                        "String!"
                    ]
                }
            ],
            "processUserProfilePhotoUpload": [
                3,
                {
                    "signedUrl": [
                        2,
                        "String!"
                    ],
                    "filename": [
                        2,
                        "String!"
                    ]
                }
            ],
            "setUserSegments": [
                3,
                {
                    "segmentOtherDescription": [
                        2
                    ],
                    "segmentIds": [
                        2,
                        "String!"
                    ]
                }
            ],
            "socialLoginLink": [
                3,
                {
                    "code": [
                        2
                    ],
                    "accessToken": [
                        2
                    ],
                    "accessSecret": [
                        2
                    ],
                    "idToken": [
                        2
                    ],
                    "provider": [
                        2,
                        "String!"
                    ]
                }
            ],
            "socialLoginUnlink": [
                3,
                {
                    "provider": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateUser": [
                21,
                {
                    "behanceUsername": [
                        2
                    ],
                    "bio": [
                        2
                    ],
                    "city": [
                        2
                    ],
                    "country": [
                        2
                    ],
                    "dribbbleUsername": [
                        2
                    ],
                    "enableMarketingEmails": [
                        2
                    ],
                    "firstName": [
                        2
                    ],
                    "githubUsername": [
                        2
                    ],
                    "instagramUsername": [
                        2
                    ],
                    "isHireable": [
                        2
                    ],
                    "lastName": [
                        2
                    ],
                    "linkedinUsername": [
                        2
                    ],
                    "location": [
                        2
                    ],
                    "name": [
                        2
                    ],
                    "twitterUsername": [
                        2
                    ],
                    "username": [
                        2
                    ],
                    "website": [
                        2
                    ]
                }
            ],
            "uploadProfilePhoto": [
                29,
                {
                    "extension": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userLocaleUpdate": [
                3,
                {
                    "locale": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userSelfDeleteRequest": [
                3,
                {
                    "offboardingQuestions": [
                        30,
                        "[OffboardingQuestionInput!]!"
                    ],
                    "reason": [
                        2,
                        "String!"
                    ]
                }
            ],
            "accountDeleteRequestCreate": [
                3,
                {
                    "requestType": [
                        31,
                        "AccountDeleteRequestType!"
                    ]
                }
            ],
            "hireRequestCreate": [
                3,
                {
                    "input": [
                        58,
                        "HireRequestInput!"
                    ]
                }
            ],
            "hitCountEventCreate": [
                59,
                {
                    "input": [
                        60,
                        "HitCountEventInput!"
                    ],
                    "resourceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicAnimationCollectionAddAnimation": [
                75,
                {
                    "animationId": [
                        20,
                        "Int!"
                    ],
                    "collectionId": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationCollectionCreate": [
                75,
                {
                    "input": [
                        48,
                        "CollectionInput!"
                    ]
                }
            ],
            "publicAnimationCollectionDelete": [
                3,
                {
                    "collectionId": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationCollectionDeleteAnimations": [
                3,
                {
                    "animationIds": [
                        20,
                        "[Int!]!"
                    ],
                    "collectionId": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationCollectionUpdate": [
                75,
                {
                    "collectionId": [
                        20,
                        "Int!"
                    ],
                    "input": [
                        48,
                        "CollectionInput!"
                    ]
                }
            ],
            "publicAnimationCreate": [
                65,
                {
                    "input": [
                        35,
                        "PublicAnimationCreateInput!"
                    ]
                }
            ],
            "publicAnimationCreateComment": [
                78,
                {
                    "animationId": [
                        20,
                        "Int!"
                    ],
                    "input": [
                        54,
                        "CommentInput!"
                    ]
                }
            ],
            "publicAnimationCreateCommentReply": [
                78,
                {
                    "commentId": [
                        20,
                        "Int!"
                    ],
                    "content": [
                        2,
                        "String!"
                    ]
                }
            ],
            "publicAnimationDelete": [
                67,
                {
                    "id": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationLike": [
                65,
                {
                    "id": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationReport": [
                3,
                {
                    "input": [
                        32,
                        "AnimationReportInput!"
                    ]
                }
            ],
            "publicAnimationResolveComment": [
                78,
                {
                    "id": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationUnlike": [
                65,
                {
                    "id": [
                        20,
                        "Int!"
                    ]
                }
            ],
            "publicAnimationUploadRequestCreate": [
                69,
                {
                    "input": [
                        38,
                        "PublicAnimationUploadRequestCreateInput!"
                    ]
                }
            ],
            "rasterToLottieConvert": [
                134,
                {
                    "fileName": [
                        2,
                        "String!"
                    ],
                    "imageId": [
                        16,
                        "ID!"
                    ],
                    "params": [
                        135
                    ]
                }
            ],
            "rasterToLottieUpload": [
                137,
                {
                    "fileName": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceJoinRequestApprove": [
                140,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMemberCompleteOnboarding": [
                140,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMemberDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMemberInvitationAccept": [
                140,
                {
                    "invitationCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceMemberResendInvite": [
                140,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceMemberSetPermission": [
                140,
                {
                    "access": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceMembersSendInvites": [
                140,
                {
                    "input": [
                        311,
                        "WorkspaceMemberSendInviteInput!"
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "accountPaymentProviderCustomerPortalSessionCreate": [
                2,
                {
                    "workspaceId": [
                        16
                    ]
                }
            ],
            "accountUpdate": [
                143,
                {
                    "workspaceId": [
                        16
                    ],
                    "updateLastInvoice": [
                        3
                    ],
                    "input": [
                        313,
                        "AccountInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "accountUpdateTaxId": [
                143,
                {
                    "input": [
                        314,
                        "AccountTaxInput!"
                    ]
                }
            ],
            "commentCreate": [
                174,
                {
                    "input": [
                        315,
                        "CommentCreateInput!"
                    ]
                }
            ],
            "commentDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentEdit": [
                174,
                {
                    "body": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentPublish": [
                174,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentReact": [
                174,
                {
                    "type": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentReplyCreate": [
                174,
                {
                    "name": [
                        2
                    ],
                    "body": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentResolve": [
                174,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentUnpublish": [
                174,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentUnreact": [
                174,
                {
                    "type": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "commentUnresolve": [
                174,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "communityAnimationImport": [
                3,
                {
                    "input": [
                        318,
                        "CommunityAnimationImportInput!"
                    ]
                }
            ],
            "communityAnimationImportRequestCreate": [
                319,
                {
                    "input": [
                        320,
                        "CommunityAnimationImportRequestCreateInput!"
                    ]
                }
            ],
            "educationPlanActivate": [
                3,
                {
                    "inviteCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "enterpriseOrganizationCreate": [
                187,
                {
                    "input": [
                        321,
                        "CreateEnterpriseOrganizationInput!"
                    ]
                }
            ],
            "enterpriseOrganizationDelete": [
                3,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationDisableDsync": [
                187,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationDisableSso": [
                187,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationSetSsoEnforcement": [
                3,
                {
                    "input": [
                        322,
                        "EnterpriseSetSsoEnforcementInput!"
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "enterpriseOrganizationUpdateDirectoryGroups": [
                191,
                {
                    "input": [
                        323,
                        "EnterpriseOrganizationDirectoryGroupInput!"
                    ]
                }
            ],
            "enterpriseOrganizationUpdateDomains": [
                187,
                {
                    "input": [
                        325,
                        "EnterpriseOrganizationDomainsInput!"
                    ]
                }
            ],
            "fileCreate": [
                194,
                {
                    "input": [
                        326,
                        "FileCreateInput!"
                    ]
                }
            ],
            "fileCreateFallback": [
                194,
                {
                    "input": [
                        329,
                        "FileCreateFallbackInput!"
                    ]
                }
            ],
            "fileDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileDescriptionUpdate": [
                194,
                {
                    "input": [
                        330,
                        "FileDescriptionUpdateInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileDuplicate": [
                194,
                {
                    "input": [
                        331,
                        "FileDuplicateInput!"
                    ]
                }
            ],
            "fileRename": [
                194,
                {
                    "input": [
                        332,
                        "FileRenameInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileUpdate": [
                194,
                {
                    "input": [
                        333,
                        "UpdateFileInput!"
                    ],
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "fileUpdateBackgroundColor": [
                194,
                {
                    "backgroundColor": [
                        2
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileUpdateStatus": [
                194,
                {
                    "status": [
                        334
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileUploadRequestCreate": [
                335,
                {
                    "input": [
                        336
                    ]
                }
            ],
            "filesDelete": [
                3,
                {
                    "folderId": [
                        16
                    ],
                    "projectId": [
                        16
                    ],
                    "ids": [
                        16,
                        "[ID!]!"
                    ]
                }
            ],
            "filesMoveToFolder": [
                194,
                {
                    "folderId": [
                        16,
                        "ID!"
                    ],
                    "fileIds": [
                        16,
                        "[ID!]!"
                    ]
                }
            ],
            "filesMoveToProject": [
                194,
                {
                    "projectId": [
                        16,
                        "ID!"
                    ],
                    "fileIds": [
                        16,
                        "[ID!]!"
                    ]
                }
            ],
            "filesUpdateStatus": [
                194,
                {
                    "status": [
                        334
                    ],
                    "folderId": [
                        16
                    ],
                    "projectId": [
                        16
                    ],
                    "ids": [
                        16,
                        "[ID!]"
                    ]
                }
            ],
            "exportJsonFile": [
                205,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "filePreviewCreate": [
                205,
                {
                    "input": [
                        337,
                        "FileVariantInput!"
                    ],
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVariantDelete": [
                205,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ],
                    "fileVariantId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVariantFallback": [
                205,
                {
                    "fileVariationId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVariantUpdate": [
                205,
                {
                    "input": [
                        338,
                        "FileVariantUpdateInput!"
                    ]
                }
            ],
            "fileVariantsSync": [
                205,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "optimizeWorkflowFile": [
                205,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "uploadDotLottieWorkflowFile": [
                205,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionCreate": [
                196,
                {
                    "input": [
                        339,
                        "FileVersionCreateInput!"
                    ]
                }
            ],
            "fileVersionCreateFallback": [
                196,
                {
                    "input": [
                        340,
                        "FileVersionCreateFallbackInput!"
                    ]
                }
            ],
            "fileVersionDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionOptimize": [
                207,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionOptimizedVariantsSync": [
                205,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionRestore": [
                194,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ],
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileVersionTagsUpdate": [
                2,
                {
                    "tags": [
                        2,
                        "[String!]!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "folderCreate": [
                198,
                {
                    "input": [
                        341,
                        "CreateFolderInput!"
                    ]
                }
            ],
            "folderDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "folderRename": [
                198,
                {
                    "input": [
                        342,
                        "FolderRenameInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "inlineCheckoutBraintreeSubscriptionCreate": [
                3,
                {
                    "input": [
                        343,
                        "InlineCheckoutBraintreeSubscriptionCreateInput!"
                    ]
                }
            ],
            "inlineCheckoutSetupIntentCreate": [
                344,
                {
                    "input": [
                        345,
                        "InlineCheckoutSetupIntentCreateInput!"
                    ]
                }
            ],
            "inlineCheckoutStripeSubscriptionCreate": [
                3,
                {
                    "input": [
                        346,
                        "InlineCheckoutStripeSubscriptionCreateInput!"
                    ]
                }
            ],
            "invoiceDownloadLinkCreate": [
                2,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "lottieJsonOptimize": [
                2,
                {
                    "input": [
                        347,
                        "LottieJsonOptimizeInput!"
                    ]
                }
            ],
            "createLottieMockup": [
                217,
                {
                    "input": [
                        348,
                        "LottieMockupCreateInput!"
                    ]
                }
            ],
            "deleteLottieMockup": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "getBackgroundUploadPresignedData": [
                353,
                {
                    "filename": [
                        2,
                        "String!"
                    ],
                    "animationId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileNotificationsSubscribe": [
                3,
                {
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "fileNotificationsUnsubscribe": [
                3,
                {
                    "fileId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "updateUserOnboardingChecklist": [
                231,
                {
                    "input": [
                        354,
                        "UpdateOnboardingChecklistInput!"
                    ]
                }
            ],
            "updateUserOnboarding": [
                232,
                {
                    "input": [
                        355,
                        "UpdateOnboardingV2Input!"
                    ]
                }
            ],
            "editorFileEditCountIncrement": [
                36,
                {
                    "input": [
                        356,
                        "CreateEditorFileEditCounterInput!"
                    ]
                }
            ],
            "paymentIntentCreate": [
                357,
                {
                    "input": [
                        358,
                        "PaymentIntentInput!"
                    ]
                }
            ],
            "paymentIntentCreateForAcceptingMemberRequest": [
                357,
                {
                    "workspaceInvitationId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "paymentIntentCreateForRenewSubscription": [
                357,
                {
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "paymentIntentCreateForResourceSeats": [
                357,
                {
                    "input": [
                        359,
                        "PaymentIntentAddSeatsForResourceInput!"
                    ]
                }
            ],
            "paymentIntentCreateForSeats": [
                357,
                {
                    "input": [
                        361,
                        "PaymentIntentAddSeatsInput!"
                    ]
                }
            ],
            "paymentMethodInvoicePaymentAttempt": [
                362,
                {
                    "paymentMethodId": [
                        2
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "paymentMethodSetDefault": [
                144,
                {
                    "paymentMethodId": [
                        2,
                        "String!"
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "paymentMethodSetup": [
                364,
                {
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "playSegmentRemove": [
                196,
                {
                    "playSegmentId": [
                        16,
                        "ID!"
                    ],
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "playSegmentUpsert": [
                196,
                {
                    "input": [
                        366,
                        "PlaySegmentInput!"
                    ],
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "playSegmentsClear": [
                196,
                {
                    "fileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "playSegmentsCopy": [
                196,
                {
                    "playSegmentId": [
                        16
                    ],
                    "toFileVersionId": [
                        16,
                        "ID!"
                    ],
                    "fromFileVersionId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "portfolioImageUploadPresignedData": [
                368,
                {
                    "filename": [
                        2,
                        "String!"
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "portfolioPostCreate": [
                236,
                {
                    "input": [
                        369,
                        "PortfolioPostInput!"
                    ]
                }
            ],
            "portfolioPostDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "portfolioPostPublish": [
                236,
                {
                    "isPublished": [
                        3,
                        "Boolean!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "portfolioPostUpdate": [
                236,
                {
                    "id": [
                        16,
                        "ID!"
                    ],
                    "input": [
                        370,
                        "PortfolioPostUpdateInput!"
                    ]
                }
            ],
            "portfolioIconUploadPresignedData": [
                371,
                {
                    "filename": [
                        2,
                        "String!"
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspacePortfolioUpdate": [
                242,
                {
                    "input": [
                        372,
                        "WorkspacePortfolioInput!"
                    ]
                }
            ],
            "premiumAssetGenerateDownloadLink": [
                373,
                {
                    "uuid": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "privateShareAccept": [
                256,
                {
                    "invitationCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "privateShareInviteUser": [
                256,
                {
                    "input": [
                        375,
                        "SharedResourceInput!"
                    ]
                }
            ],
            "privateShareReInviteUser": [
                256,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "privateShareSetPermission": [
                256,
                {
                    "access": [
                        2,
                        "String!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "draftProjectCreate": [
                199,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "projectCreate": [
                199,
                {
                    "input": [
                        376,
                        "ProjectCreateInput!"
                    ]
                }
            ],
            "projectDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "projectUpdate": [
                199,
                {
                    "input": [
                        377,
                        "ProjectUpdateInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "projectUpdatePermission": [
                199,
                {
                    "isPrivate": [
                        3,
                        "Boolean!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicAssetExtendExpiry": [
                202,
                {
                    "publicAssetId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicAssetRegenerate": [
                202,
                {
                    "publicAssetId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicAssetRestore": [
                202,
                {
                    "input": [
                        378,
                        "PublicAssetRestoreInput!"
                    ]
                }
            ],
            "publicAssetUpdate": [
                202,
                {
                    "input": [
                        379,
                        "PublicAssetUpdateInput!"
                    ]
                }
            ],
            "publicShareCreate": [
                268,
                {
                    "input": [
                        380
                    ],
                    "access": [
                        2,
                        "[String!]!"
                    ],
                    "resourceType": [
                        269,
                        "PublicShareType!"
                    ],
                    "resourceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "publicShareCreateForFileKey": [
                268,
                {
                    "fileKey": [
                        2,
                        "String!"
                    ]
                }
            ],
            "recentlyDeletedPurge": [
                3,
                {
                    "input": [
                        381,
                        "RecentlyDeletedPurgeInput!"
                    ]
                }
            ],
            "recentlyDeletedPurgeAll": [
                3,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "recentlyDeletedPurgeMultiple": [
                3,
                {
                    "input": [
                        382,
                        "RecentlyDeletedPurgeMultipleInput!"
                    ]
                }
            ],
            "recentlyDeletedRestore": [
                3,
                {
                    "input": [
                        383,
                        "RecentlyDeletedRestoreInput!"
                    ]
                }
            ],
            "sourceFileCreate": [
                284,
                {
                    "input": [
                        384,
                        "SourceFileCreateInput!"
                    ]
                }
            ],
            "sourceFileDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "sourceFileUpdate": [
                284,
                {
                    "input": [
                        384,
                        "SourceFileCreateInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "suggestedWorkspaceCancelJoinRequest": [
                288,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "suggestedWorkspaceJoin": [
                288,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "suggestedWorkspaceRemove": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "videoToLottie": [
                2,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "videoToLottieConverted": [
                385,
                {
                    "taskId": [
                        2,
                        "String!"
                    ],
                    "input": [
                        336
                    ]
                }
            ],
            "updateCurrentWorkspace": [
                142,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "updateUserOnboardingStatus": [
                295,
                {
                    "input": [
                        386,
                        "UpdateOnboardingInput!"
                    ]
                }
            ],
            "workflowTempFileUploadRequestCreate": [
                387,
                {
                    "filename": [
                        2,
                        "String!"
                    ]
                }
            ],
            "collectionUpdatePermission": [
                259,
                {
                    "isPrivate": [
                        3,
                        "Boolean!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollectionAddFiles": [
                259,
                {
                    "fileIds": [
                        16,
                        "[ID!]!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollectionCreate": [
                259,
                {
                    "input": [
                        388,
                        "WorkspaceCollectionCreateInput!"
                    ]
                }
            ],
            "workspaceCollectionDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollectionRemoveFiles": [
                259,
                {
                    "fileIds": [
                        16,
                        "[ID!]!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceCollectionUpdate": [
                259,
                {
                    "input": [
                        389,
                        "WorkspaceCollectionUpdateInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceColorPaletteCreate": [
                296,
                {
                    "input": [
                        390,
                        "CreateWorkspaceColorPaletteInput!"
                    ]
                }
            ],
            "workspaceColorPaletteDelete": [
                3,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceColorPaletteUpdate": [
                296,
                {
                    "input": [
                        391,
                        "UpdateWorkspaceColorPaletteInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceInvitationLinkAccept": [
                140,
                {
                    "invitationCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceInvitationLinkRegenerate": [
                151,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceInvitationLinkUpdate": [
                151,
                {
                    "isActive": [
                        3,
                        "Boolean!"
                    ],
                    "canInviteMembers": [
                        3,
                        "Boolean!"
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceOwnershipTransferRequestAccept": [
                299,
                {
                    "transferId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceOwnershipTransferRequestCancel": [
                299,
                {
                    "transferId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceOwnershipTransferRequestCreate": [
                299,
                {
                    "newOwnerId": [
                        16,
                        "ID!"
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceOwnershipTransferRequestDecline": [
                299,
                {
                    "transferId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceOwnershipTransferRequestResend": [
                299,
                {
                    "transferId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "getIconUploadPresignedData": [
                392,
                {
                    "filename": [
                        2,
                        "String!"
                    ],
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "getOrCreateDraftWorkspace": [
                142
            ],
            "initialAnimationUpload": [
                2,
                {
                    "input": [
                        393,
                        "InitialAnimationUploadInput!"
                    ]
                }
            ],
            "setupInitialWorkspace": [
                142
            ],
            "workspaceCreate": [
                142,
                {
                    "icon": [
                        2
                    ],
                    "name": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceDelete": [
                142,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceLeave": [
                142,
                {
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceRequestJoin": [
                140,
                {
                    "preferApproval": [
                        3
                    ],
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceRequestJoinCancel": [
                142,
                {
                    "workspaceId": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceTransferOwnership": [
                3,
                {
                    "userId": [
                        2,
                        "String!"
                    ],
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceUpdate": [
                142,
                {
                    "input": [
                        394,
                        "WorkspaceInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceSettingsUpdate": [
                304,
                {
                    "input": [
                        395,
                        "WorkspaceSettingsUpdateInput!"
                    ],
                    "id": [
                        16,
                        "ID!"
                    ]
                }
            ],
            "workspaceSubscriptionApplyDiscount": [
                3,
                {
                    "input": [
                        396,
                        "ApplyDiscountInput!"
                    ]
                }
            ],
            "workspaceSubscriptionCancel": [
                3,
                {
                    "input": [
                        397,
                        "SubscriptionCancelInput!"
                    ]
                }
            ],
            "workspaceSubscriptionCancelTrial": [
                3,
                {
                    "workspaceId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceSubscriptionContinue": [
                3,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "workspaceSubscriptionCreateCheckoutSession": [
                2,
                {
                    "input": [
                        398,
                        "WorkspaceSubscriptionCheckoutSessionInput!"
                    ]
                }
            ],
            "workspaceSubscriptionCreateCheckoutSessionForEmbed": [
                400,
                {
                    "input": [
                        401,
                        "WorkspaceSubscriptionCheckoutForEmbedInput!"
                    ]
                }
            ],
            "workspaceSubscriptionGetClientToken": [
                2
            ],
            "workspaceSubscriptionUpgrade": [
                3,
                {
                    "input": [
                        402,
                        "WorkspaceSubscriptionUpgradeInput!"
                    ]
                }
            ],
            "zipFileCreate": [
                309,
                {
                    "input": [
                        403,
                        "ZipFileCreateInput!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "String": {},
        "Boolean": {},
        "OrganizationSsoLogin": {
            "name": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LookupSecret": {
            "codes": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "TotpLink": {
            "flowId": [
                2
            ],
            "totpCode": [
                2
            ],
            "totpImage": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LocaleListing": {
            "locales": [
                8
            ],
            "__typename": [
                2
            ]
        },
        "Locale": {
            "code": [
                2
            ],
            "fallbackCode": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ViewerNotificationPreference": {
            "preference": [
                10
            ],
            "template": [
                12
            ],
            "__typename": [
                2
            ]
        },
        "NotificationPreference": {
            "channels": [
                11
            ],
            "enabled": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "NotificationChannel": {
            "chat": [
                3
            ],
            "email": [
                3
            ],
            "inApp": [
                3
            ],
            "push": [
                3
            ],
            "sms": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "NotificationTemplate": {
            "critical": [
                3
            ],
            "description": [
                2
            ],
            "id": [
                2
            ],
            "name": [
                2
            ],
            "notificationGroup": [
                13
            ],
            "__typename": [
                2
            ]
        },
        "NotificationGroup": {
            "id": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OAuthConsentRequest": {
            "clientName": [
                2
            ],
            "redirectToURL": [
                2
            ],
            "scopes": [
                15
            ],
            "skip": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "OAuthConsentRequestScope": {
            "description": [
                2
            ],
            "id": [
                16
            ],
            "scope": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "OAuthLoginRequest": {
            "redirectToURL": [
                2
            ],
            "skip": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "UserSegmentListing": {
            "segments": [
                19
            ],
            "__typename": [
                2
            ]
        },
        "UserSegment": {
            "description": [
                2
            ],
            "id": [
                20
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "User": {
            "authenticatedAt": [
                22
            ],
            "avatarUrl": [
                2
            ],
            "behanceUsername": [
                2
            ],
            "bio": [
                2
            ],
            "city": [
                2
            ],
            "country": [
                2
            ],
            "createdAt": [
                22
            ],
            "dribbbleUsername": [
                2
            ],
            "email": [
                2
            ],
            "emailVerified": [
                3
            ],
            "enableMarketingEmails": [
                3
            ],
            "enterpriseOrgId": [
                2
            ],
            "firstName": [
                2
            ],
            "githubUsername": [
                2
            ],
            "id": [
                2
            ],
            "instagramUsername": [
                2
            ],
            "isHireable": [
                3
            ],
            "isServiceAccount": [
                3
            ],
            "lastLoggedInFromCity": [
                2
            ],
            "lastLoggedInFromCountry": [
                2
            ],
            "lastLoggedInTimezone": [
                2
            ],
            "lastName": [
                2
            ],
            "linkedinUsername": [
                2
            ],
            "locale": [
                2
            ],
            "twitterUsername": [
                2
            ],
            "unconfirmedNewEmail": [
                2
            ],
            "updatedAt": [
                22
            ],
            "userSegments": [
                19
            ],
            "website": [
                2
            ],
            "hasSlackNotificationEnabled": [
                3
            ],
            "isPro": [
                3
            ],
            "legacyWebUserId": [
                20
            ],
            "location": [
                2
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "username": [
                2
            ],
            "publicAnimations": [
                66,
                {
                    "after": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "before": [
                        2
                    ],
                    "last": [
                        20
                    ],
                    "input": [
                        71
                    ]
                }
            ],
            "stats": [
                88
            ],
            "achievements": [
                85,
                {
                    "after": [
                        2
                    ],
                    "first": [
                        20
                    ],
                    "before": [
                        2
                    ],
                    "last": [
                        20
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "DateTime": {},
        "ViewerCredential": {
            "description": [
                2
            ],
            "orgInternalId": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LoginToken": {
            "loginUrl": [
                2
            ],
            "token": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Authentication": {
            "accessToken": [
                2
            ],
            "additionalAuthRequired": [
                3
            ],
            "expiresAt": [
                22
            ],
            "redirectToURL": [
                2
            ],
            "socialLoginAccountCreated": [
                3
            ],
            "tokenType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NotificationPreferenceUpdateInput": {
            "channel": [
                27
            ],
            "enabled": [
                3
            ],
            "templateId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NotificationChannelType": {},
        "DirectoryUser": {
            "directoryUserId": [
                2
            ],
            "email": [
                2
            ],
            "kratosUserId": [
                2
            ],
            "organizationId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UserProfilePhotoUpload": {
            "filename": [
                2
            ],
            "signedUrl": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OffboardingQuestionInput": {
            "answer": [
                2
            ],
            "question": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AccountDeleteRequestType": {},
        "AnimationReportInput": {
            "animationId": [
                20
            ],
            "body": [
                2
            ],
            "complaintType": [
                55
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Animator": {
            "avatarUrl": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AnimationFilter": {
            "canvaCompatible": [
                3
            ],
            "creatorCompatible": [
                3
            ],
            "hash": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationCreateInput": {
            "bgColor": [
                2
            ],
            "credits": [
                2
            ],
            "description": [
                2
            ],
            "name": [
                2
            ],
            "requestId": [
                2
            ],
            "scale": [
                36
            ],
            "tags": [
                2
            ],
            "tools": [
                2
            ],
            "workflowFileId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "PublicAnimationUploadRequestFileType": {},
        "PublicAnimationUploadRequestCreateInput": {
            "type": [
                37
            ],
            "filename": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AnimatorConnection": {
            "edges": [
                40
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "AnimatorEdge": {
            "cursor": [
                2
            ],
            "node": [
                33
            ],
            "__typename": [
                2
            ]
        },
        "Blog": {
            "category": [
                42
            ],
            "createdAt": [
                22
            ],
            "id": [
                16
            ],
            "imageUrl": [
                2
            ],
            "link": [
                2
            ],
            "postedAt": [
                22
            ],
            "slug": [
                2
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "BlogCategory": {
            "id": [
                16
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "BlogConnection": {
            "edges": [
                44
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "BlogEdge": {
            "cursor": [
                2
            ],
            "node": [
                41
            ],
            "__typename": [
                2
            ]
        },
        "CollectionAnimationPreview": {
            "image": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CollectionAnimationType": {},
        "CollectionAnimationTypeInput": {
            "animationType": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "CollectionInput": {
            "title": [
                2
            ],
            "type": [
                49
            ],
            "__typename": [
                2
            ]
        },
        "CollectionType": {},
        "Color": {
            "hex": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ColorPalette": {
            "id": [
                20
            ],
            "name": [
                2
            ],
            "palette": [
                50
            ],
            "__typename": [
                2
            ]
        },
        "ColorPaletteConnection": {
            "edges": [
                53
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "ColorPaletteEdge": {
            "cursor": [
                2
            ],
            "node": [
                51
            ],
            "__typename": [
                2
            ]
        },
        "CommentInput": {
            "content": [
                2
            ],
            "frame": [
                20
            ],
            "marker": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ComplaintType": {},
        "ContractType": {},
        "DurationFilterType": {},
        "HireRequestInput": {
            "brief": [
                2
            ],
            "contractType": [
                56
            ],
            "deadlineAt": [
                22
            ],
            "shouldCopyEmail": [
                3
            ],
            "subject": [
                2
            ],
            "userId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "HitCountEvent": {
            "errors": [
                2
            ],
            "message": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "HitCountEventInput": {
            "ip": [
                2
            ],
            "method": [
                20
            ],
            "source": [
                20
            ],
            "userId": [
                16
            ],
            "visitorId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "JSONObject": {},
        "Notification": {
            "link": [
                2
            ],
            "message": [
                2
            ],
            "theme": [
                81
            ],
            "__typename": [
                2
            ]
        },
        "PageInfo": {
            "endCursor": [
                2
            ],
            "hasNextPage": [
                3
            ],
            "hasPreviousPage": [
                3
            ],
            "startCursor": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Point": {},
        "PublicAnimation": {
            "bgColor": [
                2
            ],
            "comments": [
                78
            ],
            "commentsCount": [
                20
            ],
            "createdAt": [
                22
            ],
            "createdByUserId": [
                16
            ],
            "description": [
                2
            ],
            "downloads": [
                36
            ],
            "dotlottieFormatVersion": [
                2
            ],
            "gifFileSize": [
                2
            ],
            "gifUrl": [
                2
            ],
            "id": [
                20
            ],
            "imageFileSize": [
                20
            ],
            "imageFrame": [
                2
            ],
            "imageUrl": [
                2
            ],
            "isLiked": [
                3
            ],
            "likesCount": [
                20
            ],
            "lottieFileSize": [
                20
            ],
            "lottieFileType": [
                2
            ],
            "lottieUrl": [
                2
            ],
            "jsonUrl": [
                2
            ],
            "lottieVersion": [
                2
            ],
            "name": [
                2
            ],
            "publishedAt": [
                22
            ],
            "slug": [
                2
            ],
            "sourceFileName": [
                2
            ],
            "sourceFileSize": [
                20
            ],
            "sourceFileType": [
                2
            ],
            "sourceFileUrl": [
                2
            ],
            "sourceName": [
                2
            ],
            "sourceVersion": [
                2
            ],
            "speed": [
                36
            ],
            "status": [
                20
            ],
            "updatedAt": [
                22
            ],
            "url": [
                2
            ],
            "uuid": [
                2
            ],
            "videoFileSize": [
                20
            ],
            "videoUrl": [
                2
            ],
            "isCanvaCompatible": [
                3
            ],
            "frameRate": [
                36
            ],
            "createdBy": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationConnection": {
            "edges": [
                68
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationDeleteResponse": {
            "message": [
                2
            ],
            "success": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationEdge": {
            "cursor": [
                2
            ],
            "node": [
                65
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationUploadRequest": {
            "contentType": [
                2
            ],
            "fields": [
                61
            ],
            "id": [
                16
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationStatusFilterType": {},
        "PublicAnimationStatusFilterTypeInput": {
            "statusFilterType": [
                70
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationTag": {
            "id": [
                16
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationTagConnection": {
            "edges": [
                74
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "PublicAnimationTagEdge": {
            "cursor": [
                2
            ],
            "node": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PublicCollection": {
            "animationType": [
                46
            ],
            "animationsCount": [
                20
            ],
            "collectionAnimationPreviews": [
                45
            ],
            "createdByUserId": [
                16
            ],
            "description": [
                2
            ],
            "id": [
                20
            ],
            "imageUrl": [
                2
            ],
            "slug": [
                2
            ],
            "title": [
                2
            ],
            "type": [
                49
            ],
            "url": [
                2
            ],
            "createdBy": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "PublicCollectionConnection": {
            "edges": [
                77
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "PublicCollectionEdge": {
            "cursor": [
                2
            ],
            "node": [
                75
            ],
            "__typename": [
                2
            ]
        },
        "PublicComment": {
            "content": [
                2
            ],
            "createdAt": [
                22
            ],
            "frame": [
                36
            ],
            "id": [
                20
            ],
            "isResolved": [
                3
            ],
            "marker": [
                64
            ],
            "parentId": [
                20
            ],
            "replies": [
                78
            ],
            "updatedAt": [
                22
            ],
            "userId": [
                16
            ],
            "user": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "QuerySortOptions": {},
        "SoftwareUpdate": {
            "autoUpdate": [
                3
            ],
            "changelog": [
                2
            ],
            "downloadUrl": [
                2
            ],
            "forceUpdate": [
                3
            ],
            "infoUrl": [
                2
            ],
            "version": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Theme": {
            "dark": [
                82
            ],
            "light": [
                82
            ],
            "__typename": [
                2
            ]
        },
        "ThemeColor": {
            "bgColor": [
                2
            ],
            "icon": [
                2
            ],
            "textColor": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "TrendingItem": {
            "link": [
                2
            ],
            "rank": [
                36
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UserAchievement": {
            "completed": [
                3
            ],
            "count": [
                20
            ],
            "goal": [
                20
            ],
            "progressMessage": [
                2
            ],
            "title": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UserAchievementConnection": {
            "edges": [
                86
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "UserAchievementEdge": {
            "cursor": [
                2
            ],
            "node": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "UserStatGraphData": {
            "value": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "UserStats": {
            "downloadGraph": [
                87
            ],
            "downloads": [
                20
            ],
            "downloadsLastMonth": [
                20
            ],
            "likeGraph": [
                87
            ],
            "likes": [
                20
            ],
            "likesLastMonth": [
                20
            ],
            "profileGraph": [
                87
            ],
            "profileViews": [
                20
            ],
            "profileViewsLastMonth": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "Subscription": {
            "fileAssetEvents": [
                121,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "fileUpdate": [
                102,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "fileVariationUpdate": [
                92,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "zipFileUpdate": [
                117,
                {
                    "key": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Attributes": {
            "contentLength": [
                2
            ],
            "contentType": [
                2
            ],
            "s3VersionId": [
                2
            ],
            "formatVersion": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "VariationMetadata": {
            "height": [
                36
            ],
            "width": [
                36
            ],
            "bgColor": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVariation": {
            "id": [
                2
            ],
            "fileKey": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "filename": [
                2
            ],
            "url": [
                2
            ],
            "attributes": [
                90
            ],
            "metadata": [
                91
            ],
            "type": [
                2
            ],
            "createdAt": [
                22
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Metadata": {
            "colors": [
                94
            ],
            "lottieColors": [
                94
            ],
            "frames": [
                2
            ],
            "frameRate": [
                2
            ],
            "height": [
                2
            ],
            "width": [
                2
            ],
            "inPoint": [
                2
            ],
            "outPoint": [
                2
            ],
            "version": [
                2
            ],
            "generator": [
                2
            ],
            "layers": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "JSON": {},
        "FileObjectRegenerate": {
            "key": [
                2
            ],
            "versionId": [
                2
            ],
            "subVersionId": [
                2
            ],
            "filename": [
                2
            ],
            "url": [
                2
            ],
            "attributes": [
                90
            ],
            "metadata": [
                93
            ],
            "thumbnailJobId": [
                2
            ],
            "contents": [
                94
            ],
            "fileVariations": [
                92
            ],
            "createdAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "cleanedAt": [
                22
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PreviewContent": {
            "url": [
                2
            ],
            "versionId": [
                2
            ],
            "contentType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PreviewSize": {
            "small": [
                96
            ],
            "medium": [
                96
            ],
            "large": [
                96
            ],
            "__typename": [
                2
            ]
        },
        "Preview": {
            "webp": [
                97
            ],
            "gif": [
                97
            ],
            "mp4": [
                97
            ],
            "__typename": [
                2
            ]
        },
        "ThumbnailContent": {
            "url": [
                2
            ],
            "s3VersionId": [
                2
            ],
            "contentType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ThumbnailSize": {
            "small": [
                99
            ],
            "medium": [
                99
            ],
            "large": [
                99
            ],
            "__typename": [
                2
            ]
        },
        "Thumbnail": {
            "png": [
                100
            ],
            "webp": [
                100
            ],
            "__typename": [
                2
            ]
        },
        "FileObject": {
            "key": [
                2
            ],
            "versionId": [
                2
            ],
            "subVersionId": [
                2
            ],
            "filename": [
                2
            ],
            "url": [
                2
            ],
            "attributes": [
                90
            ],
            "metadata": [
                93
            ],
            "thumbnails": [
                101
            ],
            "previews": [
                98
            ],
            "contents": [
                94
            ],
            "fileVariations": [
                92
            ],
            "createdAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "cleanedAt": [
                22
            ],
            "status": [
                2
            ],
            "markers": [
                113
            ],
            "audio": [
                109
            ],
            "themes": [
                115
            ],
            "images": [
                112
            ],
            "stateMachines": [
                114
            ],
            "__typename": [
                2
            ]
        },
        "PresignedPost": {
            "fields": [
                94
            ],
            "key": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SignedUrl": {
            "expires": [
                36
            ],
            "signedUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FilePreviewGenerate": {
            "id": [
                2
            ],
            "jobId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FilePreviewGenerateStatus": {
            "status": [
                107
            ],
            "__typename": [
                2
            ]
        },
        "PreviewGenerationStatus": {},
        "FileAssetObjectReference": {
            "id": [
                16
            ],
            "assetId": [
                2
            ],
            "displayName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AudioAssetObjectReference": {
            "id": [
                16
            ],
            "assetId": [
                2
            ],
            "displayName": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "_FileOptimizationJob": {
            "id": [
                2
            ],
            "status": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FileOptimizationStatus": {},
        "ImageAssetObjectReference": {
            "id": [
                16
            ],
            "assetId": [
                2
            ],
            "displayName": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "LottieJsonMarker": {
            "id": [
                16
            ],
            "name": [
                2
            ],
            "comment": [
                94
            ],
            "time": [
                36
            ],
            "duration": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "StateMachineAssetObjectReference": {
            "id": [
                16
            ],
            "assetId": [
                2
            ],
            "displayName": [
                2
            ],
            "animations": [
                108
            ],
            "name": [
                2
            ],
            "initial": [
                2
            ],
            "states": [
                94
            ],
            "triggers": [
                94
            ],
            "listeners": [
                94
            ],
            "__typename": [
                2
            ]
        },
        "ThemeAssetObjectReference": {
            "id": [
                16
            ],
            "assetId": [
                2
            ],
            "displayName": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "ZipEntryObject": {
            "fileKey": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "fileVariationId": [
                2
            ],
            "filename": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ZipFileObject": {
            "key": [
                2
            ],
            "type": [
                2
            ],
            "filename": [
                2
            ],
            "url": [
                2
            ],
            "attributes": [
                90
            ],
            "status": [
                2
            ],
            "entries": [
                116
            ],
            "__typename": [
                2
            ]
        },
        "FileAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AnimationAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "metadata": [
                93
            ],
            "name": [
                2
            ],
            "displayName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AudioAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "name": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "FileAssetEvent": {
            "key": [
                2
            ],
            "type": [
                2
            ],
            "blobId": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_FileAssetUploadRequest": {
            "fields": [
                94
            ],
            "key": [
                2
            ],
            "url": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ImageAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "name": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "StateMachineAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "name": [
                2
            ],
            "animations": [
                108
            ],
            "displayName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ThemeAssetObject": {
            "id": [
                16
            ],
            "blobId": [
                2
            ],
            "contentType": [
                2
            ],
            "contentLength": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "pathname": [
                2
            ],
            "url": [
                2
            ],
            "name": [
                2
            ],
            "displayName": [
                2
            ],
            "animations": [
                108
            ],
            "__typename": [
                2
            ]
        },
        "_PublicAnimationImportRequest": {
            "key": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_FileAssetUploadRequestCreateInput": {
            "pathname": [
                2
            ],
            "fileSpaceId": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_PublicAnimationImportRequestCreateInput": {
            "backgroundColor": [
                2
            ],
            "shouldGenerateThumbnails": [
                3
            ],
            "shouldExtractMetadata": [
                3
            ],
            "shouldOptimize": [
                3
            ],
            "variations": [
                129
            ],
            "colorPalette": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_PublicAnimationVariationInput": {
            "path": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_PublicAnimationImportInput": {
            "key": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_ZipFileCreateInput": {
            "entries": [
                132
            ],
            "entryType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "_ZipEntryInput": {
            "fileKey": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "filename": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Service": {
            "name": [
                2
            ],
            "version": [
                2
            ],
            "versionInGateway": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "RasterToLottieJob": {
            "debug": [
                2
            ],
            "failedReason": [
                2
            ],
            "id": [
                16
            ],
            "inputFileSize": [
                20
            ],
            "lottieFileSize": [
                20
            ],
            "progress": [
                2
            ],
            "startTime": [
                36
            ],
            "status": [
                136
            ],
            "timeTaken": [
                36
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "RasterToLottieJobParams": {
            "antiAliasKernel": [
                20
            ],
            "cannyHighThreshold": [
                20
            ],
            "cannyLowThreshold": [
                20
            ],
            "convertToShape": [
                3
            ],
            "debug": [
                3
            ],
            "edgePercentage": [
                20
            ],
            "mergingDistanceThreshold": [
                20
            ],
            "potraceAlphamax": [
                36
            ],
            "potraceOpticurve": [
                3
            ],
            "potraceOpttolerance": [
                36
            ],
            "potraceTurdsize": [
                20
            ],
            "potraceTurnPolicy": [
                20
            ],
            "removeBackground": [
                3
            ],
            "removeHoles": [
                3
            ],
            "simplify": [
                3
            ],
            "threshold": [
                20
            ],
            "thresholdLarge": [
                20
            ],
            "upscale": [
                3
            ],
            "upscaleFactor": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "RasterToLottieJobStatus": {},
        "RasterToLottieUploadUrl": {
            "fields": [
                94
            ],
            "imageId": [
                16
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberConnection": {
            "edges": [
                139
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberEdge": {
            "cursor": [
                2
            ],
            "node": [
                140
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMember": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "acceptedAt": [
                22
            ],
            "access": [
                2
            ],
            "id": [
                16
            ],
            "invitedBy": [
                16
            ],
            "lastSentAt": [
                22
            ],
            "method": [
                2
            ],
            "onboardedAt": [
                22
            ],
            "recipientEmail": [
                2
            ],
            "status": [
                2
            ],
            "userId": [
                2
            ],
            "workspaceId": [
                16
            ],
            "user": [
                141
            ],
            "workspace": [
                142
            ],
            "__typename": [
                2
            ]
        },
        "UserObject": {
            "avatarUrl": [
                2
            ],
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Workspace": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "billingAddressLineOne": [
                2
            ],
            "billingAddressLineTwo": [
                2
            ],
            "billingEmail": [
                2
            ],
            "icon": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "status": [
                2
            ],
            "url": [
                2
            ],
            "account": [
                143
            ],
            "canJoinInstantly": [
                3
            ],
            "contactSalesNotice": [
                149
            ],
            "domains": [
                2
            ],
            "features": [
                150
            ],
            "hasOwnership": [
                3
            ],
            "hasRequestedToJoin": [
                3
            ],
            "indexed": [
                3
            ],
            "invitationLink": [
                151
            ],
            "isMember": [
                3
            ],
            "isOrganizationWorkspace": [
                3
            ],
            "memberIds": [
                2
            ],
            "owner": [
                141
            ],
            "permissionScopes": [
                2
            ],
            "requiresOnboardingAs": [
                2
            ],
            "subscription": [
                152
            ],
            "members": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "Account": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "paymentMethod": [
                144
            ],
            "addressLineOne": [
                2
            ],
            "addressLineTwo": [
                2
            ],
            "city": [
                2
            ],
            "contactEmail": [
                2
            ],
            "contactName": [
                2
            ],
            "country": [
                2
            ],
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "paymentMethodId": [
                2
            ],
            "paymentProvider": [
                148
            ],
            "paymentProviderCustomerId": [
                2
            ],
            "postcode": [
                2
            ],
            "state": [
                2
            ],
            "taxCountry": [
                2
            ],
            "taxId": [
                2
            ],
            "website": [
                2
            ],
            "isPaid": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethod": {
            "customerId": [
                2
            ],
            "expiresAt": [
                22
            ],
            "id": [
                16
            ],
            "metadata": [
                145
            ],
            "provider": [
                148
            ],
            "providerPaymentMethodId": [
                2
            ],
            "sourceType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethodMetadata": {
            "on_CardMetadata": [
                146
            ],
            "on_PayPalMetadata": [
                147
            ],
            "__typename": [
                2
            ]
        },
        "CardMetadata": {
            "brand": [
                2
            ],
            "expMonth": [
                36
            ],
            "expYear": [
                36
            ],
            "last4": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PayPalMetadata": {
            "email": [
                2
            ],
            "payerId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentProvider": {},
        "ContactSalesNotice": {
            "calendarLink": [
                2
            ],
            "enabled": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "FeatureObject": {
            "currentCount": [
                20
            ],
            "isEnabled": [
                3
            ],
            "max": [
                20
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceInvitationLink": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "canMembersInvite": [
                3
            ],
            "id": [
                16
            ],
            "invitationCode": [
                2
            ],
            "isActive": [
                3
            ],
            "lastUpdatedById": [
                2
            ],
            "workspaceId": [
                2
            ],
            "workspace": [
                142
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSubscription": {
            "id": [
                16
            ],
            "parentId": [
                2
            ],
            "providerCustomerId": [
                2
            ],
            "providerPriceId": [
                2
            ],
            "providerId": [
                2
            ],
            "providerType": [
                2
            ],
            "workspaceId": [
                16
            ],
            "workspace": [
                153
            ],
            "organizationId": [
                16
            ],
            "organization": [
                154
            ],
            "ratePlanId": [
                16
            ],
            "ratePlan": [
                155
            ],
            "planId": [
                2
            ],
            "plan": [
                156
            ],
            "markedForCancellation": [
                3
            ],
            "startsAt": [
                22
            ],
            "endsAt": [
                22
            ],
            "gracePeriod": [
                22
            ],
            "status": [
                2
            ],
            "revisionNumber": [
                36
            ],
            "numberOfSeats": [
                36
            ],
            "lastRevisedAt": [
                22
            ],
            "createdAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "viewerProviderPriceId": [
                2
            ],
            "viewerDownloaderProviderPriceId": [
                2
            ],
            "viewerNumberOfSeats": [
                36
            ],
            "viewerDownloaderNumberOfSeats": [
                36
            ],
            "nextBilling": [
                158
            ],
            "numberOfSeatsUsed": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceObject": {
            "icon": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OrganizationObject": {
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "RatePlanObject": {
            "billingCycle": [
                2
            ],
            "currency": [
                2
            ],
            "endsAt": [
                22
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "price": [
                36
            ],
            "startsAt": [
                22
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PlanObject": {
            "defaultEntitlements": [
                157
            ],
            "id": [
                16
            ],
            "isBillable": [
                3
            ],
            "name": [
                2
            ],
            "planPosition": [
                36
            ],
            "status": [
                2
            ],
            "stripeProductId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PlanEntitlement": {
            "id": [
                16
            ],
            "max": [
                36
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NextBillingObject": {
            "amount": [
                36
            ],
            "currency": [
                2
            ],
            "date": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberSearchConnection": {
            "edges": [
                160
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberSearchEdge": {
            "cursor": [
                2
            ],
            "node": [
                140
            ],
            "__typename": [
                2
            ]
        },
        "AuditLogConnection": {
            "edges": [
                162
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "AuditLogItemEdge": {
            "cursor": [
                2
            ],
            "node": [
                163
            ],
            "__typename": [
                2
            ]
        },
        "AuditLogItem": {
            "action": [
                2
            ],
            "changes": [
                94
            ],
            "eventTime": [
                22
            ],
            "id": [
                16
            ],
            "ipAddress": [
                2
            ],
            "target": [
                164
            ],
            "userEmail": [
                2
            ],
            "userId": [
                16
            ],
            "userName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AuditLogTarget": {
            "id": [
                16
            ],
            "name": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "BillingPackagePrice": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "baseSeats": [
                36
            ],
            "billingCycle": [
                2
            ],
            "currency": [
                2
            ],
            "endsAt": [
                22
            ],
            "id": [
                16
            ],
            "isActive": [
                3
            ],
            "isDefault": [
                3
            ],
            "isLocalOnly": [
                3
            ],
            "minSeatCount": [
                36
            ],
            "name": [
                2
            ],
            "planId": [
                2
            ],
            "price": [
                36
            ],
            "startsAt": [
                22
            ],
            "stripePriceId": [
                2
            ],
            "type": [
                2
            ],
            "viewerBaseSeats": [
                36
            ],
            "viewerDownloaderBaseSeats": [
                36
            ],
            "billingPackage": [
                166
            ],
            "contributorPrice": [
                167
            ],
            "viewerDownloaderPrice": [
                167
            ],
            "viewerPrice": [
                167
            ],
            "__typename": [
                2
            ]
        },
        "BillingPackage": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "defaultEntitlements": [
                157
            ],
            "id": [
                16
            ],
            "isBillable": [
                3
            ],
            "name": [
                2
            ],
            "planPosition": [
                36
            ],
            "status": [
                2
            ],
            "stripeProductId": [
                2
            ],
            "billingPackagePrice": [
                165
            ],
            "__typename": [
                2
            ]
        },
        "AddonPrice": {
            "billingCycle": [
                2
            ],
            "currency": [
                2
            ],
            "id": [
                2
            ],
            "price": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "BillingPackageConnection": {
            "edges": [
                169
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "BillingPackageEdge": {
            "cursor": [
                2
            ],
            "node": [
                166
            ],
            "__typename": [
                2
            ]
        },
        "CancelReason": {
            "createdAt": [
                22
            ],
            "disabled": [
                3
            ],
            "id": [
                16
            ],
            "order": [
                36
            ],
            "requireReasonText": [
                3
            ],
            "slug": [
                2
            ],
            "updatedAt": [
                22
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommentUser": {
            "avatarUrl": [
                2
            ],
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommentConnection": {
            "edges": [
                173
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "CommentEdge": {
            "cursor": [
                2
            ],
            "node": [
                174
            ],
            "__typename": [
                2
            ]
        },
        "Comment": {
            "attachments": [
                175
            ],
            "body": [
                2
            ],
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "extra": [
                176
            ],
            "guestName": [
                2
            ],
            "id": [
                16
            ],
            "mentions": [
                180
            ],
            "nodeId": [
                20
            ],
            "parentId": [
                2
            ],
            "path": [
                2
            ],
            "reactions": [
                182
            ],
            "readReceipts": [
                183
            ],
            "replyCount": [
                36
            ],
            "resolvedAt": [
                22
            ],
            "resolvedById": [
                2
            ],
            "status": [
                2
            ],
            "updatedAt": [
                22
            ],
            "userId": [
                2
            ],
            "parent": [
                174
            ],
            "resolvedBy": [
                171
            ],
            "user": [
                171
            ],
            "__typename": [
                2
            ]
        },
        "CommentAttachment": {
            "filename": [
                2
            ],
            "key": [
                2
            ],
            "mimeType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommentExtra": {
            "annotation": [
                177
            ],
            "frame": [
                20
            ],
            "type": [
                179
            ],
            "__typename": [
                2
            ]
        },
        "CommentAnnotation": {
            "ratio": [
                36
            ],
            "type": [
                178
            ],
            "x": [
                36
            ],
            "y": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "CommentAnnotationType": {},
        "CommentExtraType": {},
        "CommentUserMention": {
            "type": [
                181
            ],
            "userId": [
                2
            ],
            "user": [
                171
            ],
            "__typename": [
                2
            ]
        },
        "CommentMentionType": {},
        "CommentReaction": {
            "createdAt": [
                22
            ],
            "type": [
                2
            ],
            "userId": [
                2
            ],
            "user": [
                171
            ],
            "__typename": [
                2
            ]
        },
        "CommentReadReceipt": {
            "createdAt": [
                22
            ],
            "userId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommentableEntityType": {},
        "KeyCount": {
            "count": [
                20
            ],
            "key": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommunityAnimationImportCounter": {
            "count": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganization": {
            "directoryGroupMappings": [
                188
            ],
            "directorySyncStatus": [
                2
            ],
            "domains": [
                189
            ],
            "id": [
                2
            ],
            "internalId": [
                2
            ],
            "isSsoEnforced": [
                3
            ],
            "name": [
                2
            ],
            "ssoStatus": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationDirectoryMappings": {
            "id": [
                2
            ],
            "internalName": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationDomain": {
            "domain": [
                2
            ],
            "id": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OrganizationDirectoryClaim": {
            "name": [
                2
            ],
            "userCount": [
                36
            ],
            "workspaceName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OrganizationDirectoryGroup": {
            "id": [
                2
            ],
            "internalName": [
                2
            ],
            "name": [
                2
            ],
            "users": [
                192
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationGroupUser": {
            "email": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileHandback": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "assetUrl": [
                2
            ],
            "backgroundColor": [
                2
            ],
            "completedAt": [
                22
            ],
            "fileId": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "id": [
                16
            ],
            "metadata": [
                94
            ],
            "newFileId": [
                2
            ],
            "userId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "File": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "createdByUserId": [
                2
            ],
            "id": [
                16
            ],
            "isHidden": [
                3
            ],
            "modifiedByUserId": [
                2
            ],
            "name": [
                2
            ],
            "projectId": [
                16
            ],
            "backgroundColor": [
                2
            ],
            "currentVersionId": [
                16
            ],
            "description": [
                2
            ],
            "descriptionModifiedByUserId": [
                2
            ],
            "descriptionUpdatedAt": [
                22
            ],
            "folderId": [
                2
            ],
            "showDescOnCollection": [
                3
            ],
            "sourceFileKey": [
                2
            ],
            "sourceFileType": [
                2
            ],
            "status": [
                2
            ],
            "type": [
                195
            ],
            "animationPermissionScopes": [
                2
            ],
            "currentUserAccess": [
                2
            ],
            "currentVersion": [
                196
            ],
            "editHash": [
                2
            ],
            "featuredFileKey": [
                2
            ],
            "features": [
                150
            ],
            "folder": [
                198
            ],
            "project": [
                199
            ],
            "publicAsset": [
                202
            ],
            "upgradeRequired": [
                3
            ],
            "userResourcePermissions": [
                203
            ],
            "createdBy": [
                21
            ],
            "modifiedBy": [
                21
            ],
            "descriptionModifiedBy": [
                21
            ],
            "fileObject": [
                102
            ],
            "__typename": [
                2
            ]
        },
        "FileType": {},
        "FileVersion": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "backgroundColor": [
                2
            ],
            "communityAnimationId": [
                2
            ],
            "createdByUserId": [
                2
            ],
            "fileId": [
                16
            ],
            "fileKey": [
                2
            ],
            "fileSystemSubVersionId": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "playSegment": [
                197
            ],
            "sourceFileId": [
                16
            ],
            "subVersionNumber": [
                36
            ],
            "subVersions": [
                196
            ],
            "tags": [
                2
            ],
            "uploadOrigin": [
                2
            ],
            "uploadOriginVersion": [
                2
            ],
            "versionLabel": [
                36
            ],
            "versionNumber": [
                36
            ],
            "createdBy": [
                21
            ],
            "modifiedBy": [
                21
            ],
            "fileObject": [
                102
            ],
            "__typename": [
                2
            ]
        },
        "PlaySegment": {
            "endFrame": [
                36
            ],
            "id": [
                2
            ],
            "name": [
                2
            ],
            "startFrame": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "Folder": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "createdByUserId": [
                2
            ],
            "id": [
                16
            ],
            "isHidden": [
                3
            ],
            "modifiedByUserId": [
                2
            ],
            "name": [
                2
            ],
            "projectId": [
                16
            ],
            "animationPermissionScopes": [
                2
            ],
            "currentUserAccess": [
                2
            ],
            "deletedFilesCount": [
                36
            ],
            "featuredFileKeys": [
                2
            ],
            "features": [
                150
            ],
            "filesCount": [
                36
            ],
            "project": [
                199
            ],
            "stats": [
                201
            ],
            "createdBy": [
                21
            ],
            "modifiedBy": [
                21
            ],
            "thumbnails": [
                102
            ],
            "__typename": [
                2
            ]
        },
        "Project": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "id": [
                16
            ],
            "isPrivate": [
                3
            ],
            "isSystem": [
                3
            ],
            "slug": [
                2
            ],
            "title": [
                2
            ],
            "workspaceId": [
                2
            ],
            "animationThumbnailUrls": [
                2
            ],
            "featuredFileKeys": [
                2
            ],
            "features": [
                150
            ],
            "filesCount": [
                36
            ],
            "isCreatorDraft": [
                3
            ],
            "projectPermissionScopes": [
                2
            ],
            "stats": [
                200
            ],
            "workspace": [
                142
            ],
            "workspaceTeamMembersCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "ProjectStats": {
            "animations": [
                36
            ],
            "creatorFiles": [
                36
            ],
            "folders": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "FolderStats": {
            "animations": [
                36
            ],
            "creatorFiles": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PublicAsset": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "backgroundColor": [
                2
            ],
            "expireAt": [
                22
            ],
            "fileKey": [
                2
            ],
            "fileName": [
                2
            ],
            "fileSize": [
                36
            ],
            "fileVersionId": [
                2
            ],
            "id": [
                16
            ],
            "isActive": [
                3
            ],
            "isOptimized": [
                3
            ],
            "metadataVersionId": [
                2
            ],
            "type": [
                2
            ],
            "workflowFileId": [
                2
            ],
            "workflowFileVersionId": [
                2
            ],
            "embedUrl": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UserResourcePermission": {
            "id": [
                16
            ],
            "userId": [
                2
            ],
            "resourceType": [
                2
            ],
            "resourceId": [
                16
            ],
            "access": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NextPrevAnimation": {
            "nextAnimation": [
                2
            ],
            "prevAnimation": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVariant": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "contentType": [
                2
            ],
            "fileKey": [
                2
            ],
            "fileSize": [
                36
            ],
            "fileVariationId": [
                2
            ],
            "id": [
                16
            ],
            "isOptimized": [
                3
            ],
            "jobId": [
                2
            ],
            "metadata": [
                206
            ],
            "status": [
                2
            ],
            "workflowFileId": [
                2
            ],
            "workflowFileVersionId": [
                2
            ],
            "url": [
                2
            ],
            "fileObject": [
                102
            ],
            "fileVariation": [
                92
            ],
            "__typename": [
                2
            ]
        },
        "FileVariantMetadata": {
            "backgroundColor": [
                2
            ],
            "fps": [
                20
            ],
            "height": [
                20
            ],
            "transparency": [
                3
            ],
            "width": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "FileVersionOptimizeJob": {
            "id": [
                16
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVersionConnection": {
            "edges": [
                209
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "FileVersionEdge": {
            "cursor": [
                2
            ],
            "node": [
                196
            ],
            "__typename": [
                2
            ]
        },
        "FileConnection": {
            "edges": [
                211
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "FileEdge": {
            "cursor": [
                2
            ],
            "node": [
                194
            ],
            "__typename": [
                2
            ]
        },
        "Invoice": {
            "id": [
                16
            ],
            "providerId": [
                2
            ],
            "providerType": [
                2
            ],
            "providerCustomerId": [
                2
            ],
            "providerSubscriptionId": [
                2
            ],
            "items": [
                213
            ],
            "number": [
                2
            ],
            "status": [
                2
            ],
            "companyName": [
                2
            ],
            "taxId": [
                2
            ],
            "taxCountry": [
                2
            ],
            "addressLineOne": [
                2
            ],
            "addressLineTwo": [
                2
            ],
            "country": [
                2
            ],
            "state": [
                2
            ],
            "city": [
                2
            ],
            "additionalFields": [
                214
            ],
            "postcode": [
                2
            ],
            "billingEmail": [
                2
            ],
            "createdAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "workspaceId": [
                2
            ],
            "account": [
                143
            ],
            "amount": [
                36
            ],
            "currency": [
                2
            ],
            "subscription": [
                152
            ],
            "__typename": [
                2
            ]
        },
        "InvoiceItem": {
            "amount": [
                2
            ],
            "currency": [
                2
            ],
            "date": [
                22
            ],
            "description": [
                2
            ],
            "id": [
                2
            ],
            "periodEnd": [
                22
            ],
            "periodStart": [
                22
            ],
            "proration": [
                3
            ],
            "quantity": [
                36
            ],
            "subscription": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InvoiceFieldObject": {
            "id": [
                2
            ],
            "name": [
                2
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupConnection": {
            "edges": [
                216
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupEdge": {
            "cursor": [
                2
            ],
            "node": [
                217
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockup": {
            "animation": [
                218
            ],
            "animationId": [
                16
            ],
            "assets": [
                221
            ],
            "canvas": [
                227
            ],
            "description": [
                2
            ],
            "id": [
                2
            ],
            "name": [
                2
            ],
            "playSegmentId": [
                2
            ],
            "version": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAnimation": {
            "config": [
                219
            ],
            "frame": [
                220
            ],
            "rotation": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAnimationConfig": {
            "file": [
                2
            ],
            "fileId": [
                2
            ],
            "fileKey": [
                2
            ],
            "loop": [
                3
            ],
            "speed": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "Frame": {
            "height": [
                36
            ],
            "width": [
                36
            ],
            "x": [
                36
            ],
            "y": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAsset": {
            "on_LottieMockupAssetImage": [
                222
            ],
            "on_LottieMockupAssetText": [
                225
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAssetImage": {
            "frame": [
                220
            ],
            "identifier": [
                2
            ],
            "rotation": [
                36
            ],
            "type": [
                223
            ],
            "config": [
                224
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAssetType": {},
        "LottieMockupAssetFile": {
            "file": [
                2
            ],
            "fileId": [
                2
            ],
            "fileKey": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAssetText": {
            "frame": [
                220
            ],
            "identifier": [
                2
            ],
            "rotation": [
                36
            ],
            "type": [
                223
            ],
            "config": [
                226
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAssetTextConfig": {
            "alignment": [
                2
            ],
            "color": [
                2
            ],
            "font": [
                2
            ],
            "size": [
                2
            ],
            "text": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupCanvas": {
            "background": [
                2
            ],
            "height": [
                36
            ],
            "templateSize": [
                228
            ],
            "width": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "TemplateSize": {},
        "OfficialWorkspace": {
            "icon": [
                2
            ],
            "id": [
                16
            ],
            "memberCount": [
                36
            ],
            "members": [
                230
            ],
            "name": [
                2
            ],
            "planName": [
                2
            ],
            "planPosition": [
                36
            ],
            "canJoinInstantly": [
                3
            ],
            "hasRequestedToJoin": [
                3
            ],
            "isMember": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "OfficialWorkspaceMember": {
            "avatarUrl": [
                2
            ],
            "email": [
                2
            ],
            "firstName": [
                2
            ],
            "id": [
                16
            ],
            "isAdmin": [
                3
            ],
            "isOwner": [
                3
            ],
            "lastName": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OnboardingChecklistObject": {
            "activeOnboardings": [
                2
            ],
            "completeSeen": [
                3
            ],
            "dismissSeen": [
                3
            ],
            "doneOnboardings": [
                2
            ],
            "id": [
                16
            ],
            "newToOnboarding": [
                3
            ],
            "seen": [
                3
            ],
            "userId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "OnboardingV2Object": {
            "activeOnboardings": [
                2
            ],
            "completeSeen": [
                3
            ],
            "dismissSeen": [
                3
            ],
            "doneOnboardings": [
                2
            ],
            "id": [
                16
            ],
            "newToOnboarding": [
                3
            ],
            "seen": [
                3
            ],
            "userId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntent": {
            "id": [
                16
            ],
            "providerId": [
                2
            ],
            "status": [
                2
            ],
            "type": [
                2
            ],
            "providerType": [
                2
            ],
            "createdAt": [
                2
            ],
            "expiresAt": [
                2
            ],
            "successUrl": [
                2
            ],
            "workspaceId": [
                16
            ],
            "addedSeats": [
                140
            ],
            "workspace": [
                153
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentCollectionMethod": {
            "country": [
                2
            ],
            "paymentMethods": [
                235
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentCollectionPaymentMethod": {
            "displayName": [
                2
            ],
            "logoUrl": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPost": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "content": [
                94
            ],
            "coverImage": [
                2
            ],
            "excerpt": [
                2
            ],
            "id": [
                16
            ],
            "portfolioId": [
                2
            ],
            "publishedAt": [
                22
            ],
            "slug": [
                2
            ],
            "tags": [
                237
            ],
            "title": [
                2
            ],
            "workspaceId": [
                2
            ],
            "contributors": [
                141
            ],
            "creator": [
                141
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioTag": {
            "id": [
                16
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioSlugAvailableInput": {
            "portfolioId": [
                16
            ],
            "portfolioPostId": [
                16
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPostConnection": {
            "edges": [
                240
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPostEdge": {
            "cursor": [
                2
            ],
            "node": [
                236
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPostStatus": {},
        "WorkspacePortfolio": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "description": [
                2
            ],
            "id": [
                16
            ],
            "image": [
                2
            ],
            "isPrivate": [
                3
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "workspace": [
                142
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioUrlAvailableInput": {
            "url": [
                2
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetConnection": {
            "edges": [
                245
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetEdge": {
            "cursor": [
                2
            ],
            "node": [
                246
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAsset": {
            "contributor": [
                247
            ],
            "formats": [
                248
            ],
            "id": [
                36
            ],
            "metadata": [
                249
            ],
            "name": [
                2
            ],
            "pack": [
                250
            ],
            "previewImageUrl": [
                2
            ],
            "previewVideoUrl": [
                2
            ],
            "relatedAnimations": [
                251
            ],
            "slug": [
                2
            ],
            "tags": [
                252
            ],
            "thumbnailVideoUrl": [
                2
            ],
            "type": [
                2
            ],
            "uuid": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetContributor": {
            "avatarUrl": [
                2
            ],
            "company": [
                2
            ],
            "id": [
                36
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetFormats": {
            "aep": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetMetadata": {
            "duration": [
                36
            ],
            "fileSize": [
                36
            ],
            "frameRate": [
                36
            ],
            "frames": [
                36
            ],
            "height": [
                36
            ],
            "uuid": [
                16
            ],
            "width": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetPack": {
            "id": [
                36
            ],
            "itemCount": [
                36
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "thumbnailVideoUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetRelatedAnimation": {
            "id": [
                36
            ],
            "name": [
                2
            ],
            "previewImageUrl": [
                2
            ],
            "slug": [
                2
            ],
            "thumbnailVideoUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetTag": {
            "id": [
                36
            ],
            "lang": [
                2
            ],
            "name": [
                2
            ],
            "orderId": [
                36
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetPackConnection": {
            "edges": [
                254
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetPackEdge": {
            "cursor": [
                2
            ],
            "node": [
                250
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetPackDetailConnection": {
            "edges": [
                245
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "description": [
                2
            ],
            "id": [
                36
            ],
            "itemCount": [
                36
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "thumbnailVideoUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PrivateShare": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "acceptedAt": [
                22
            ],
            "access": [
                2
            ],
            "id": [
                16
            ],
            "invitationCode": [
                2
            ],
            "invitedBy": [
                16
            ],
            "isCreator": [
                3
            ],
            "lastSentAt": [
                22
            ],
            "recipientEmail": [
                2
            ],
            "resourceId": [
                16
            ],
            "resourceType": [
                257
            ],
            "userId": [
                2
            ],
            "hasUnacceptedWorkspaceInvitation": [
                3
            ],
            "isGuest": [
                3
            ],
            "resource": [
                258
            ],
            "user": [
                141
            ],
            "__typename": [
                2
            ]
        },
        "PrivateShareType": {},
        "PrivateShareResource": {
            "on_File": [
                194
            ],
            "on_WorkspaceCollection": [
                259
            ],
            "on_Project": [
                199
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCollection": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "createdByUserId": [
                2
            ],
            "id": [
                16
            ],
            "isPrivate": [
                3
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "workspaceId": [
                2
            ],
            "collectionPermissionScopes": [
                2
            ],
            "collectionThumbnailUrls": [
                2
            ],
            "featuredFileKey": [
                2
            ],
            "files": [
                2
            ],
            "featuredFileObject": [
                102
            ],
            "createdBy": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedMember": {
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PrivateShareConnection": {
            "edges": [
                262
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PrivateShareEdge": {
            "cursor": [
                2
            ],
            "node": [
                256
            ],
            "__typename": [
                2
            ]
        },
        "ProjectFileConnection": {
            "edges": [
                264
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "ProjectFileEdge": {
            "cursor": [
                2
            ],
            "node": [
                265
            ],
            "__typename": [
                2
            ]
        },
        "ProjectFile": {
            "on_File": [
                194
            ],
            "on_Folder": [
                198
            ],
            "__typename": [
                2
            ]
        },
        "ProjectConnection": {
            "edges": [
                267
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "ProjectEdge": {
            "cursor": [
                2
            ],
            "node": [
                199
            ],
            "__typename": [
                2
            ]
        },
        "PublicShare": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "allowGuestView": [
                3
            ],
            "expireAt": [
                22
            ],
            "id": [
                16
            ],
            "resourceId": [
                16
            ],
            "resourceType": [
                269
            ],
            "shareCode": [
                2
            ],
            "accessLevels": [
                2
            ],
            "resource": [
                270
            ],
            "workspace": [
                271
            ],
            "__typename": [
                2
            ]
        },
        "PublicShareType": {},
        "PublicShareResource": {
            "on_File": [
                194
            ],
            "on_WorkspaceCollection": [
                259
            ],
            "__typename": [
                2
            ]
        },
        "WorkspacePublicInfo": {
            "allowJoinRequest": [
                3
            ],
            "icon": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedConnection": {
            "edges": [
                273
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedEdge": {
            "cursor": [
                2
            ],
            "node": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeleted": {
            "children": [
                274
            ],
            "createdAt": [
                22
            ],
            "expireAt": [
                22
            ],
            "id": [
                16
            ],
            "parent": [
                274
            ],
            "path": [
                2
            ],
            "resourceId": [
                16
            ],
            "resourceType": [
                275
            ],
            "snapshot": [
                94
            ],
            "status": [
                276
            ],
            "updatedAt": [
                22
            ],
            "userId": [
                2
            ],
            "workspaceId": [
                2
            ],
            "resource": [
                277
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedResourceType": {},
        "RecentlyDeletedStatus": {},
        "RecentlyDeletedResource": {
            "on_File": [
                194
            ],
            "on_Folder": [
                198
            ],
            "on_Project": [
                199
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedResourceInput": {
            "resourceId": [
                16
            ],
            "resourceType": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "SearchWorkspaceResponse": {
            "collections": [
                280
            ],
            "files": [
                210
            ],
            "folders": [
                282
            ],
            "projects": [
                266
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCollectionConnection": {
            "edges": [
                281
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCollectionEdge": {
            "cursor": [
                2
            ],
            "node": [
                259
            ],
            "__typename": [
                2
            ]
        },
        "FolderConnection": {
            "edges": [
                283
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "FolderEdge": {
            "cursor": [
                2
            ],
            "node": [
                198
            ],
            "__typename": [
                2
            ]
        },
        "SourceFile": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "fileId": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "id": [
                16
            ],
            "sourceFileKey": [
                2
            ],
            "sourceFileName": [
                2
            ],
            "sourceFileSize": [
                36
            ],
            "sourceFileVersionId": [
                2
            ],
            "sourceType": [
                2
            ],
            "sourceUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedInviteeConnection": {
            "edges": [
                286
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedInviteeEdge": {
            "cursor": [
                2
            ],
            "node": [
                287
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedInvitee": {
            "avatarUrl": [
                2
            ],
            "id": [
                16
            ],
            "userEmail": [
                2
            ],
            "userName": [
                2
            ],
            "viewCount": [
                36
            ],
            "viewerEmail": [
                2
            ],
            "viewerName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedWorkspace": {
            "icon": [
                2
            ],
            "id": [
                16
            ],
            "memberIds": [
                16
            ],
            "name": [
                2
            ],
            "organization": [
                289
            ],
            "hasRequestedToJoin": [
                3
            ],
            "isMember": [
                3
            ],
            "members": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "Organization": {
            "email": [
                2
            ],
            "id": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedWorkspaceConnection": {
            "edges": [
                291
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "SuggestedWorkspaceEdge": {
            "cursor": [
                2
            ],
            "node": [
                288
            ],
            "__typename": [
                2
            ]
        },
        "UserNotificationSubscriptionConnection": {
            "edges": [
                293
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "UserNotificationSubscriptionEdge": {
            "cursor": [
                2
            ],
            "node": [
                294
            ],
            "__typename": [
                2
            ]
        },
        "UserNotificationSubscription": {
            "createdAt": [
                22
            ],
            "entityId": [
                2
            ],
            "entityType": [
                2
            ],
            "id": [
                16
            ],
            "isSubscribed": [
                3
            ],
            "updatedAt": [
                22
            ],
            "userId": [
                2
            ],
            "user": [
                141
            ],
            "__typename": [
                2
            ]
        },
        "OnboardingObject": {
            "animColorPaletteBtnHotspot": [
                3
            ],
            "animCommentBtnHotspot": [
                3
            ],
            "animDescriptionSequence": [
                3
            ],
            "animPanelBtnHotspot": [
                3
            ],
            "animSegmentBtnHotspot": [
                3
            ],
            "animTitleHotspot": [
                3
            ],
            "animTopbarHotspot": [
                3
            ],
            "animVersionBtnHotspot": [
                3
            ],
            "dashboardAnimUploadHotspot": [
                3
            ],
            "dashboardCollectionHotspot": [
                3
            ],
            "dashboardCollectionViewSequence": [
                3
            ],
            "dashboardCreateAnimationHotspot": [
                3
            ],
            "dashboardOptimizedDotlottieBanner": [
                3
            ],
            "dashboardPageHotspot": [
                3
            ],
            "dashboardPremiumAssetHotspot": [
                3
            ],
            "dashboardPublicProfileHotspot": [
                3
            ],
            "dashboardSlackIntegrationBellIndicator": [
                3
            ],
            "dashboardSlackIntegrationPopup": [
                3
            ],
            "dashboardWelcomeLfModal": [
                3
            ],
            "dashboardWelcomeTeamModal": [
                3
            ],
            "dashboardWelcomeUpgradedModal": [
                3
            ],
            "dashboardWorkspaceCollectionHotspot": [
                3
            ],
            "dashboardWorkspaceHotspot": [
                3
            ],
            "folderCreateAnimationHotspot": [
                3
            ],
            "introAnimSequence": [
                3
            ],
            "introDashboardSequence": [
                3
            ],
            "multiPlayerOnboarding": [
                3
            ],
            "projectCreateAnimationHotspot": [
                3
            ],
            "slackOnboardingForComment": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceColorPalette": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "colors": [
                2
            ],
            "createdByUserId": [
                2
            ],
            "id": [
                16
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceColorPaletteConnection": {
            "edges": [
                298
            ],
            "pageInfo": [
                63
            ],
            "totalCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceColorPaletteEdge": {
            "cursor": [
                2
            ],
            "node": [
                296
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceOwnershipTransfer": {
            "createdAt": [
                22
            ],
            "deletedAt": [
                22
            ],
            "updatedAt": [
                22
            ],
            "completedAt": [
                22
            ],
            "currentOwnerId": [
                2
            ],
            "expiresAt": [
                22
            ],
            "failureDetails": [
                2
            ],
            "failureReason": [
                2
            ],
            "id": [
                16
            ],
            "metadata": [
                61
            ],
            "newAccount": [
                143
            ],
            "newAccountId": [
                16
            ],
            "newOwnerId": [
                2
            ],
            "newSubscription": [
                152
            ],
            "newSubscriptionId": [
                16
            ],
            "oldAccount": [
                143
            ],
            "oldAccountId": [
                16
            ],
            "oldSubscription": [
                152
            ],
            "oldSubscriptionId": [
                16
            ],
            "respondedAt": [
                22
            ],
            "status": [
                2
            ],
            "workspace": [
                142
            ],
            "workspaceId": [
                16
            ],
            "currentOwner": [
                140
            ],
            "newOwner": [
                140
            ],
            "__typename": [
                2
            ]
        },
        "BrandObject": {
            "iconFileKey": [
                2
            ],
            "iconPublicReadURL": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCountsObject": {
            "filesCount": [
                36
            ],
            "membersCount": [
                36
            ],
            "projectsCount": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSeatUtilization": {
            "id": [
                16
            ],
            "numberOfContributorSeats": [
                36
            ],
            "numberOfContributorSeatsBalance": [
                36
            ],
            "numberOfContributorSeatsUsed": [
                36
            ],
            "numberOfViewerDownloaderSeats": [
                36
            ],
            "numberOfViewerDownloaderSeatsBalance": [
                36
            ],
            "numberOfViewerDownloaderSeatsUsed": [
                36
            ],
            "numberOfViewerSeats": [
                36
            ],
            "numberOfViewerSeatsBalance": [
                36
            ],
            "numberOfViewerSeatsUsed": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberPrice": {
            "billingCycle": [
                2
            ],
            "contributorPrice": [
                167
            ],
            "currency": [
                2
            ],
            "id": [
                16
            ],
            "price": [
                36
            ],
            "viewerDownloaderPrice": [
                167
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSettings": {
            "allowAiFeatures": [
                3
            ],
            "allowExternalInvites": [
                3
            ],
            "allowExternalShares": [
                3
            ],
            "allowJoinRequest": [
                3
            ],
            "allowMemberInvites": [
                3
            ],
            "allowPremiumAnimations": [
                3
            ],
            "allowPublishToCommunity": [
                3
            ],
            "defaultRole": [
                2
            ],
            "discoveryJoinType": [
                305
            ],
            "isDiscoverable": [
                3
            ],
            "isSsoEnforced": [
                3
            ],
            "maxSessionDurationDays": [
                36
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceDiscoveryJoinType": {},
        "WorkspaceSubscriptionAvailableDiscount": {
            "billingCycle": [
                2
            ],
            "currency": [
                2
            ],
            "currentPrice": [
                36
            ],
            "discountPercentage": [
                36
            ],
            "discountedPrice": [
                36
            ],
            "isEligibleForDiscount": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "AvailablePlanUpgrade": {
            "plan": [
                156
            ],
            "price": [
                303
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSubscriptionCheckoutSessionMetadata": {
            "amountTotal": [
                36
            ],
            "currency": [
                2
            ],
            "id": [
                16
            ],
            "paymentIntent": [
                2
            ],
            "source": [
                2
            ],
            "status": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ZipFile": {
            "filename": [
                2
            ],
            "filesize": [
                20
            ],
            "key": [
                2
            ],
            "status": [
                2
            ],
            "type": [
                310
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ZipFileType": {},
        "WorkspaceMemberSendInviteInput": {
            "recipients": [
                312
            ],
            "resourceId": [
                2
            ],
            "resourceType": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InvitationRecipient": {
            "access": [
                2
            ],
            "recipientEmail": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AccountInput": {
            "taxCountry": [
                2
            ],
            "taxId": [
                2
            ],
            "addressLineOne": [
                2
            ],
            "addressLineTwo": [
                2
            ],
            "city": [
                2
            ],
            "country": [
                2
            ],
            "email": [
                2
            ],
            "name": [
                2
            ],
            "postcode": [
                2
            ],
            "state": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AccountTaxInput": {
            "taxCountry": [
                2
            ],
            "taxId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommentCreateInput": {
            "body": [
                2
            ],
            "entityId": [
                16
            ],
            "extra": [
                316
            ],
            "name": [
                2
            ],
            "type": [
                184
            ],
            "__typename": [
                2
            ]
        },
        "CommentExtraInput": {
            "annotation": [
                317
            ],
            "frame": [
                20
            ],
            "type": [
                179
            ],
            "__typename": [
                2
            ]
        },
        "CommentAnnotationInput": {
            "ratio": [
                36
            ],
            "type": [
                178
            ],
            "x": [
                36
            ],
            "y": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "CommunityAnimationImportInput": {
            "code": [
                2
            ],
            "id": [
                2
            ],
            "key": [
                2
            ],
            "projectId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommunityAnimationImportRequest": {
            "code": [
                2
            ],
            "key": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CommunityAnimationImportRequestCreateInput": {
            "backgroundColor": [
                2
            ],
            "colorPalette": [
                2
            ],
            "id": [
                2
            ],
            "projectId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CreateEnterpriseOrganizationInput": {
            "domains": [
                2
            ],
            "organizationName": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseSetSsoEnforcementInput": {
            "isSsoEnforced": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationDirectoryGroupInput": {
            "groupMappings": [
                324
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationGroupMapInput": {
            "id": [
                2
            ],
            "internalName": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EnterpriseOrganizationDomainsInput": {
            "domains": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileCreateInput": {
            "backgroundColor": [
                2
            ],
            "editorKey": [
                2
            ],
            "fileKey": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "folderId": [
                2
            ],
            "handbackId": [
                2
            ],
            "isFolder": [
                3
            ],
            "isHidden": [
                3
            ],
            "isMyPrivateAnimation": [
                3
            ],
            "name": [
                2
            ],
            "projectId": [
                16
            ],
            "token": [
                327
            ],
            "__typename": [
                2
            ]
        },
        "FileCreateTokenInput": {
            "code": [
                2
            ],
            "referenceId": [
                2
            ],
            "referenceType": [
                328
            ],
            "__typename": [
                2
            ]
        },
        "FileCreateTokenReferenceType": {},
        "FileCreateFallbackInput": {
            "backgroundColor": [
                2
            ],
            "fileKey": [
                2
            ],
            "folderId": [
                2
            ],
            "handbackId": [
                2
            ],
            "isFolder": [
                3
            ],
            "isHidden": [
                3
            ],
            "isMyPrivateAnimation": [
                3
            ],
            "name": [
                2
            ],
            "projectId": [
                2
            ],
            "token": [
                327
            ],
            "__typename": [
                2
            ]
        },
        "FileDescriptionUpdateInput": {
            "description": [
                2
            ],
            "showDescOnCollection": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "FileDuplicateInput": {
            "folderId": [
                2
            ],
            "id": [
                16
            ],
            "projectId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileRenameInput": {
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UpdateFileInput": {
            "description": [
                2
            ],
            "folderId": [
                2
            ],
            "name": [
                2
            ],
            "projectId": [
                2
            ],
            "slug": [
                2
            ],
            "sourceFileKey": [
                2
            ],
            "sourceFileType": [
                2
            ],
            "sourceFilename": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileStatus": {},
        "FileUploadRequest": {
            "fields": [
                94
            ],
            "key": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CreateUploadRequestInput": {
            "bgColor": [
                2
            ],
            "key": [
                2
            ],
            "metadata": [
                3
            ],
            "previews": [
                3
            ],
            "thumbnails": [
                3
            ],
            "type": [
                2
            ],
            "variationType": [
                2
            ],
            "versionId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVariantInput": {
            "backgroundColor": [
                2
            ],
            "format": [
                2
            ],
            "height": [
                20
            ],
            "transparency": [
                3
            ],
            "width": [
                20
            ],
            "__typename": [
                2
            ]
        },
        "FileVariantUpdateInput": {
            "fileSize": [
                36
            ],
            "fileVariationId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVersionCreateInput": {
            "backgroundColor": [
                2
            ],
            "fileId": [
                16
            ],
            "fileKey": [
                2
            ],
            "fileSubVersionId": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "handbackId": [
                16
            ],
            "name": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileVersionCreateFallbackInput": {
            "backgroundColor": [
                2
            ],
            "fileId": [
                16
            ],
            "fileKey": [
                2
            ],
            "handbackId": [
                16
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CreateFolderInput": {
            "folderId": [
                2
            ],
            "isFolder": [
                3
            ],
            "name": [
                2
            ],
            "projectId": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FolderRenameInput": {
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InlineCheckoutBraintreeSubscriptionCreateInput": {
            "brainTreeClientToken": [
                2
            ],
            "pricingId": [
                2
            ],
            "quantity": [
                36
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InlineCheckoutSetupIntentCreatePayload": {
            "clientSecret": [
                2
            ],
            "customerId": [
                2
            ],
            "setupIntentId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InlineCheckoutSetupIntentCreateInput": {
            "onBoardAllMembers": [
                3
            ],
            "pricingId": [
                2
            ],
            "quantity": [
                36
            ],
            "source": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InlineCheckoutStripeSubscriptionCreateInput": {
            "setupIntentId": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieJsonOptimizeInput": {
            "fileUrl": [
                2
            ],
            "returnDotLottie": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupCreateInput": {
            "animation": [
                349
            ],
            "animationId": [
                2
            ],
            "assets": [
                94
            ],
            "canvas": [
                352
            ],
            "description": [
                2
            ],
            "id": [
                2
            ],
            "name": [
                2
            ],
            "playSegmentId": [
                2
            ],
            "version": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAnimationInput": {
            "config": [
                350
            ],
            "frame": [
                351
            ],
            "rotation": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupAnimationConfigInput": {
            "file": [
                2
            ],
            "fileId": [
                2
            ],
            "fileKey": [
                2
            ],
            "loop": [
                3
            ],
            "speed": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "FrameInput": {
            "height": [
                36
            ],
            "width": [
                36
            ],
            "x": [
                36
            ],
            "y": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "LottieMockupCanvasInput": {
            "background": [
                2
            ],
            "height": [
                36
            ],
            "templateSize": [
                228
            ],
            "width": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "BackgroundImageObject": {
            "fileKey": [
                2
            ],
            "preSignedUploadURL": [
                2
            ],
            "publicReadURL": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UpdateOnboardingChecklistInput": {
            "completeSeen": [
                3
            ],
            "dismissSeen": [
                3
            ],
            "doneOnboardings": [
                2
            ],
            "seen": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "UpdateOnboardingV2Input": {
            "completeSeen": [
                3
            ],
            "dismissSeen": [
                3
            ],
            "doneOnboardings": [
                2
            ],
            "seen": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "CreateEditorFileEditCounterInput": {
            "fileId": [
                2
            ],
            "key": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentToken": {
            "id": [
                16
            ],
            "token": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentInput": {
            "onBoardAllMembers": [
                3
            ],
            "paymentMethod": [
                2
            ],
            "quantity": [
                36
            ],
            "ratePlanId": [
                16
            ],
            "type": [
                2
            ],
            "workspaceId": [
                16
            ],
            "workspaceMemberIds": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentAddSeatsForResourceInput": {
            "resourceId": [
                16
            ],
            "resourceType": [
                257
            ],
            "recipients": [
                360
            ],
            "workspaceId": [
                16
            ],
            "workspaceAccess": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SharedResourceInvitationRecipient": {
            "access": [
                2
            ],
            "existingMember": [
                3
            ],
            "recipientEmail": [
                2
            ],
            "userId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentIntentAddSeatsInput": {
            "recipients": [
                312
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "InvoicePaymentAttemptPayload": {
            "amountPaid": [
                36
            ],
            "currency": [
                2
            ],
            "invoiceId": [
                2
            ],
            "paymentProviderError": [
                363
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentProviderError": {
            "code": [
                2
            ],
            "message": [
                2
            ],
            "provider": [
                148
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethodSetupPayload": {
            "paymentProviderError": [
                363
            ],
            "setupIntent": [
                365
            ],
            "__typename": [
                2
            ]
        },
        "SetupIntent": {
            "clientSecret": [
                2
            ],
            "id": [
                2
            ],
            "provider": [
                148
            ],
            "__typename": [
                2
            ]
        },
        "PlaySegmentInput": {
            "action": [
                367
            ],
            "endFrame": [
                36
            ],
            "id": [
                2
            ],
            "name": [
                2
            ],
            "startFrame": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "PlaySegmentAction": {},
        "PortfolioImageUploadObject": {
            "fileKey": [
                2
            ],
            "preSignedUploadURL": [
                2
            ],
            "publicReadURL": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPostInput": {
            "content": [
                94
            ],
            "contributors": [
                2
            ],
            "coverImage": [
                2
            ],
            "excerpt": [
                2
            ],
            "isPublished": [
                3
            ],
            "slug": [
                2
            ],
            "tags": [
                2
            ],
            "title": [
                2
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioPostUpdateInput": {
            "content": [
                94
            ],
            "contributors": [
                2
            ],
            "coverImage": [
                2
            ],
            "excerpt": [
                2
            ],
            "isPublished": [
                3
            ],
            "slug": [
                2
            ],
            "tags": [
                2
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PortfolioIconUploadObject": {
            "fileKey": [
                2
            ],
            "preSignedUploadURL": [
                2
            ],
            "publicReadURL": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspacePortfolioInput": {
            "description": [
                2
            ],
            "image": [
                2
            ],
            "isPrivate": [
                3
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetDownloadLink": {
            "aep": [
                374
            ],
            "json": [
                374
            ],
            "lottie": [
                374
            ],
            "__typename": [
                2
            ]
        },
        "PremiumAssetDownloadLinkData": {
            "name": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SharedResourceInput": {
            "inviteToWorkspace": [
                3
            ],
            "recipients": [
                360
            ],
            "resourceId": [
                16
            ],
            "resourceType": [
                257
            ],
            "workspaceAccess": [
                2
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "ProjectCreateInput": {
            "isOpen": [
                3
            ],
            "isPrivate": [
                3
            ],
            "shareToken": [
                2
            ],
            "slug": [
                2
            ],
            "title": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProjectUpdateInput": {
            "slug": [
                2
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PublicAssetRestoreInput": {
            "fileVersionId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "PublicAssetUpdateInput": {
            "fileId": [
                16
            ],
            "isActive": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "PublicShareCreateInput": {
            "allowGuestView": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedPurgeInput": {
            "resourceId": [
                16
            ],
            "resourceType": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedPurgeMultipleInput": {
            "resourceIds": [
                16
            ],
            "resourceType": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "RecentlyDeletedRestoreInput": {
            "location": [
                16
            ],
            "resourceId": [
                16
            ],
            "resourceType": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "SourceFileCreateInput": {
            "fileId": [
                2
            ],
            "fileVersionId": [
                2
            ],
            "sourceFileKey": [
                2
            ],
            "sourceFileName": [
                2
            ],
            "sourceFileSize": [
                36
            ],
            "sourceFileVersionId": [
                2
            ],
            "sourceType": [
                2
            ],
            "sourceUrl": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FileUploadRequestStatus": {
            "estimatedTimeRemaining": [
                2
            ],
            "fields": [
                94
            ],
            "key": [
                2
            ],
            "message": [
                2
            ],
            "progressPercentage": [
                2
            ],
            "status": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UpdateOnboardingInput": {
            "animColorPaletteBtnHotspot": [
                3
            ],
            "animCommentBtnHotspot": [
                3
            ],
            "animDescriptionSequence": [
                3
            ],
            "animPanelBtnHotspot": [
                3
            ],
            "animSegmentBtnHotspot": [
                3
            ],
            "animTitleHotspot": [
                3
            ],
            "animTopbarHotspot": [
                3
            ],
            "animVersionBtnHotspot": [
                3
            ],
            "dashboardAnimUploadHotspot": [
                3
            ],
            "dashboardCollectionHotspot": [
                3
            ],
            "dashboardCollectionViewSequence": [
                3
            ],
            "dashboardCreateAnimationHotspot": [
                3
            ],
            "dashboardOptimizedDotlottieBanner": [
                3
            ],
            "dashboardPageHotspot": [
                3
            ],
            "dashboardPremiumAssetHotspot": [
                3
            ],
            "dashboardPublicProfileHotspot": [
                3
            ],
            "dashboardSlackIntegrationBellIndicator": [
                3
            ],
            "dashboardSlackIntegrationPopup": [
                3
            ],
            "dashboardWelcomeLfModal": [
                3
            ],
            "dashboardWelcomeTeamModal": [
                3
            ],
            "dashboardWelcomeUpgradedModal": [
                3
            ],
            "dashboardWorkspaceCollectionHotspot": [
                3
            ],
            "dashboardWorkspaceHotspot": [
                3
            ],
            "folderCreateAnimationHotspot": [
                3
            ],
            "introAnimSequence": [
                3
            ],
            "introDashboardSequence": [
                3
            ],
            "multiPlayerOnboarding": [
                3
            ],
            "projectCreateAnimationHotspot": [
                3
            ],
            "slackOnboardingForComment": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "WorkflowTempFilePreSignedUploadRequest": {
            "fileKey": [
                2
            ],
            "preSignedUploadURL": [
                2
            ],
            "publicReadURL": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCollectionCreateInput": {
            "files": [
                94
            ],
            "isPrivate": [
                3
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceCollectionUpdateInput": {
            "files": [
                94
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CreateWorkspaceColorPaletteInput": {
            "colors": [
                2
            ],
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "UpdateWorkspaceColorPaletteInput": {
            "colors": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceIconUploadObject": {
            "fileKey": [
                2
            ],
            "preSignedUploadURL": [
                2
            ],
            "publicReadURL": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InitialAnimationUploadInput": {
            "file": [
                2
            ],
            "folderId": [
                2
            ],
            "projectId": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceInput": {
            "billingAddressLineOne": [
                2
            ],
            "billingAddressLineTwo": [
                2
            ],
            "billingEmail": [
                2
            ],
            "icon": [
                2
            ],
            "name": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSettingsUpdateInput": {
            "allowAiFeatures": [
                3
            ],
            "allowExternalInvites": [
                3
            ],
            "allowExternalShares": [
                3
            ],
            "allowJoinRequest": [
                3
            ],
            "allowMemberInvites": [
                3
            ],
            "allowPremiumAnimations": [
                3
            ],
            "allowPublishToCommunity": [
                3
            ],
            "defaultRole": [
                2
            ],
            "discoveryJoinType": [
                305
            ],
            "isDiscoverable": [
                3
            ],
            "maxSessionDurationDays": [
                36
            ],
            "__typename": [
                2
            ]
        },
        "ApplyDiscountInput": {
            "workspaceId": [
                16
            ],
            "__typename": [
                2
            ]
        },
        "SubscriptionCancelInput": {
            "reasonId": [
                2
            ],
            "reasonText": [
                2
            ],
            "subscriptionId": [
                2
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSubscriptionCheckoutSessionInput": {
            "account": [
                313
            ],
            "brainTreeClientToken": [
                2
            ],
            "ctaButtonText": [
                2
            ],
            "isExtendedTrial": [
                3
            ],
            "isPrepayOptional": [
                3
            ],
            "isTrial": [
                3
            ],
            "onBoardAllMembers": [
                3
            ],
            "paymentProvider": [
                2
            ],
            "pricingId": [
                2
            ],
            "quantity": [
                36
            ],
            "referralCode": [
                2
            ],
            "returnTo": [
                2
            ],
            "source": [
                2
            ],
            "viewerQuantity": [
                36
            ],
            "workspaceId": [
                2
            ],
            "workspaceMemberIds": [
                2
            ],
            "workspaceMembers": [
                399
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceMemberInput": {
            "email": [
                2
            ],
            "role": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CheckoutObject": {
            "clientSecret": [
                2
            ],
            "sessionId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSubscriptionCheckoutForEmbedInput": {
            "onBoardAllMembers": [
                3
            ],
            "paymentProvider": [
                2
            ],
            "pricingId": [
                2
            ],
            "quantity": [
                36
            ],
            "referralCode": [
                2
            ],
            "returnTo": [
                2
            ],
            "source": [
                2
            ],
            "viewerQuantity": [
                36
            ],
            "workspaceId": [
                2
            ],
            "workspaceMemberIds": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "WorkspaceSubscriptionUpgradeInput": {
            "pricingId": [
                2
            ],
            "quantity": [
                36
            ],
            "workspaceId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ZipFileCreateInput": {
            "entries": [
                404
            ],
            "type": [
                310
            ],
            "__typename": [
                2
            ]
        },
        "ZipEntryInput": {
            "id": [
                2
            ],
            "type": [
                405
            ],
            "__typename": [
                2
            ]
        },
        "ZipEntryType": {},
        "IntOrString": {}
    }
}