// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    Boolean: boolean,
    ID: string,
    Int: number,
    DateTime: any,
    Float: number,
    JSONObject: any,
    Point: any,
    QuerySortOptions: any,
    JSON: any,
    IntOrString: any,
}

export interface Query {
    /** Initiates the Enterprise Login process. */
    enterpriseLoginAuthorizationUrl: Scalars['String']
    /** Initiates the Enterprise Login process using an org internal id. */
    enterpriseOrganizationLogin: OrganizationSsoLogin
    /** Generates new lookup secrets for a user */
    lookupSecretsReveal: LookupSecret
    /** Start process to link a TOTP authenticator to the user */
    totpLinkStart: TotpLink
    authVersion: Scalars['String']
    jwt: (Scalars['String'] | null)
    /** Returns a list of locales available for selection. */
    locales: (LocaleListing | null)
    /** Gets user's notification preferences */
    viewerNotificationPreferences: ViewerNotificationPreference[]
    /** Fetches the consent request for the given consent challenge and returns whether the consent step can be skiped, and the list of requested scopes or redirect URL. */
    oAuthConsentRequest: OAuthConsentRequest
    /** Fetches the login request for the given login challenge and returns whether the login step can be skiped. */
    oAuthLoginRequest: OAuthLoginRequest
    /** Returns a list of user segments available for choosing. */
    userSegments: (UserSegmentListing | null)
    /** Checks if a username is available for use. */
    isUsernameAvailable: Scalars['Boolean']
    /** Get a user's public information based on ID. */
    user: (User | null)
    /** Check if self-service account deletion is available for this user. */
    userSelfDeleteAvailable: Scalars['Boolean']
    /** Batch get users' public information based on ID. */
    users: (User | null)[]
    /** Information about who owns the current session. */
    viewer: User
    /** List of types of credentials enabled for this account. */
    viewerCredentials: ViewerCredential[]
    blogs: BlogConnection
    colorPalettes: ColorPaletteConnection
    featuredAnimators: AnimatorConnection
    featuredPublicAnimations: PublicAnimationConnection
    legacyVersion: Scalars['String']
    notifications: (Notification[] | null)
    popularPublicAnimations: PublicAnimationConnection
    publicAnimation: (PublicAnimation | null)
    publicAnimationByHash: (PublicAnimation | null)
    publicAnimationCollection: PublicCollection
    publicAnimationCollections: PublicCollectionConnection
    publicAnimationCollectionsByUser: (PublicCollectionConnection | null)
    publicAnimationsByUser: (PublicAnimationConnection | null)
    /** Animations of a collection */
    publicCollectionAnimations: PublicAnimationConnection
    publicAnimationTags: PublicAnimationTagConnection
    recentPublicAnimations: PublicAnimationConnection
    searchPublicAnimations: PublicAnimationConnection
    softwareUpdates: SoftwareUpdate
    trendingSearches: TrendingItem[]
    userAchievements: (UserAchievementConnection | null)
    userStats: (UserStats | null)
    viewerPublicAnimationDownloads: PublicAnimationConnection
    viewerPublicAnimationLikes: PublicAnimationConnection
    services: Service[]
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Gets the status of a raster to lottie conversion job.
     */
    rasterToLottieStatus: RasterToLottieJob
    rasterToLottieVersion: Scalars['String']
    /** Indicates if the user has requested to join the suggested workspace */
    workspaceHasRequestedToJoin: Scalars['Boolean']
    /** Look up membership requests by workspace id */
    workspaceJoinRequests: WorkspaceMemberConnection
    /** Get the number of members in a workspace */
    workspaceMemberCount: Scalars['Float']
    /** Look up invitations by workspace id. */
    workspaceMembers: WorkspaceMemberConnection
    /** Search workspace members */
    workspaceMembersSearch: (WorkspaceMemberSearchConnection | null)
    /** Look up organization by workspace id. */
    accountByWorkspaceId: Account
    workspaceAuditLogs: AuditLogConnection
    /** Get the default user price for team billing packages. */
    billingPackageDefaultPerUserPrice: BillingPackagePrice
    /** Look up a billing package price by its id. */
    billingPackagePrice: BillingPackagePrice
    /** Look up a billing package by its id. */
    billingPackage: BillingPackage
    /** Billing package connection. */
    billingPackages: BillingPackageConnection
    /** fetch cancel reasons */
    cancelReasons: CancelReason[]
    /** Get users with view access to an Animation */
    commentMentionableUsers: CommentUser[]
    /** Get the replies for a comment */
    commentReplies: CommentConnection
    /** Get the comments for an entity */
    comments: CommentConnection
    /** Get the comments for an entity by frame number */
    timelineCommentsByFrame: CommentConnection
    /** Get the count of comments for an entity grouped by frame number */
    timelineCommentsCount: KeyCount[]
    /** Get the number of community animations imported by the current user in the current month */
    communityAnimationImportCountForCalendarMonth: CommunityAnimationImportCounter
    /** Get the enterprise organization for the workspace */
    enterpriseOrganization: (EnterpriseOrganization | null)
    /** Get redirect url to setup SSO or DSYNC for workspace */
    enterpriseOrganizationConfigurationLink: (Scalars['String'] | null)
    /** Get directory groups claimed by other workspaces of the same organization. */
    enterpriseOrganizationDirectoryClaims: (OrganizationDirectoryClaim[] | null)
    /** Get the list of organization directory groups for the workspace */
    enterpriseOrganizationDirectoryGroups: (OrganizationDirectoryGroup[] | null)
    /** Fetch file handback by id */
    fileHandback: FileHandback
    /** Look up a deleted animation by its id. */
    deletedFile: File
    /** Look up an animation by its id. */
    file: File
    /** Look up an animation by its id. */
    fileAboveAndBelowId: NextPrevAnimation
    /** The total count of file uploads to a workspace, including deleted files */
    fileCountByWorkspaceId: Scalars['Int']
    /** Get the last modified animation file id for the workspace. This is an optimized query made specifically for onboarding checklist and some checks is skipped, use with cautioun. */
    fileIdRecentlyModified: Scalars['String']
    /** Eligible file ids for a given workspace. If a file upload limit is set, only those within the limits will be listed. */
    fileIdsWithinLimit: Scalars['String'][]
    /** Get the last modified files for the user. */
    filesRecentlyModified: File[]
    fileVariants: FileVariant[]
    /** Fetch file version by id */
    fileVersion: FileVersion
    fileVersionOptimizeJob: FileVersionOptimizeJob
    /** Generate tags for file version */
    fileVersionTagsGenerate: Scalars['String'][]
    /** Get all file versions of a file using file ID */
    fileVersions: FileVersionConnection
    /** Look up a folder by its id. */
    folder: Folder
    /** Look up folder subfolders and animations by folder-id. */
    folderFiles: FileConnection
    /** Fetch folders under a specific project. */
    foldersByProjectId: Folder[]
    /**
     * @deprecated Use `searchFolders` instead.
     * Search folders inside a specific workspace by it's title.
     */
    searchFoldersInWorkspace: Folder[]
    /** Retrieve an invoice by id. */
    invoice: Invoice
    /** Get the list of invoices for the workspace. */
    invoices: Invoice[]
    /** Get lottie mockups using animation id */
    getLottieMockups: LottieMockupConnection
    /** Check if the user is subscribed to the Animation's feed */
    fileNotificationsIsSubscribed: Scalars['Boolean']
    /** Get subscriber hash for Novu API */
    novuSubscriberHash: Scalars['String']
    /** Get cached official workspace based on the domain derived from current user email */
    officialWorkspace: (OfficialWorkspace | null)
    /** Get the current onboarding checklist of the logged in user, create and return if onboarding checklist does not exist yet. */
    getUserOnboardingChecklist: OnboardingChecklistObject
    /** Get the current onboarding of the logged in user, create and return if onboarding does not exist. */
    getUserOnboarding: OnboardingV2Object
    editorFileEditCount: Scalars['Float']
    /** Determine if it's the user's first attempt at login, and if so, set-up the workspace. */
    hasAccessToAWorkspace: Scalars['Boolean']
    hasAccessToPaidWorkspace: Scalars['Boolean']
    isPaidUser: Scalars['Boolean']
    /** Get the country of the user */
    userCountry: Scalars['String']
    userHasCreatorAccess: Scalars['Boolean']
    /** Get a payment intent by id */
    paymentIntent: PaymentIntent
    /** Fetch payment collections methods for the user country */
    paymentIntentCollectionMethod: (PaymentIntentCollectionMethod | null)
    /** Get a payment intent thats processing for workspace id */
    paymentIntentProcessingCheck: (PaymentIntent | null)
    portfolioPost: PortfolioPost
    portfolioPostIsSlugAvailable: Scalars['Boolean']
    portfolioPosts: PortfolioPostConnection
    /** Get workspace portfolio */
    workspacePortfolio: (WorkspacePortfolio | null)
    workspacePortfolioHasEditAccess: Scalars['Boolean']
    workspacePortfolioIsUrlAvailable: Scalars['Boolean']
    featuredCuratedPremiumAssets: PremiumAssetConnection
    featuredPremiumAssetPacks: PremiumAssetPackConnection
    featuredPremiumAssets: PremiumAssetConnection
    popularCuratedPremiumAssets: PremiumAssetConnection
    popularPremiumAssetPacks: PremiumAssetPackConnection
    popularPremiumAssets: PremiumAssetConnection
    premiumAsset: PremiumAsset
    premiumAssetPack: PremiumAssetPackDetailConnection
    recentCuratedPremiumAssets: PremiumAssetConnection
    recentPremiumAssetPacks: PremiumAssetPackConnection
    recentPremiumAssets: PremiumAssetConnection
    searchPremiumAssetPacks: PremiumAssetPackConnection
    searchPremiumAssets: PremiumAssetConnection
    privateShareMembers: PrivateShare[]
    privateShareSuggestedMembers: SuggestedMember[]
    /** Get all shared resources for the logged in user */
    privateShares: (PrivateShareConnection | null)
    /** Look up a project by its id. */
    project: Project
    /** Look up project folders and animations by project-id. */
    projectFiles: ProjectFileConnection
    /**
     * @deprecated Use `searchProjects` instead
     * Search projects inside a specific workspace by it's title.
     */
    searchProjectsInWorkspace: Project[]
    /** Fetch draft project for the given workspace. */
    workspaceDraftProject: Project
    /** Fetch projects under a specific workspace. */
    workspaceProjects: ProjectConnection
    /** Get all public assets for a given workflow file version */
    publicAssets: PublicAsset[]
    /** Get a public shared resource */
    publicShare: (PublicShare | null)
    publicShareByCode: PublicShare
    /** Fetch recently deleted files for the workspace. */
    recentlyDeleted: RecentlyDeletedConnection
    /** Fetch recently deleted files for the workspace. */
    recentlyDeletedChildren: ProjectFileConnection
    /** Fetch recently deleted resource with the parent. */
    recentlyDeletedResource: RecentlyDeleted
    searchMultipleWorkspaces: SearchWorkspaceResponse
    searchWorkspace: SearchWorkspaceResponse
    /** Find source files by file version id */
    sourceFile: (SourceFile | null)
    /** Find source files by file version id */
    sourceFiles: (SourceFile[] | null)
    /** Fetch suggested invitees for the authenticated user. */
    suggestedInvitees: SuggestedInviteeConnection
    /** Suggest official workspace based on domain name of the user's email address */
    suggestedOfficialWorkspace: SuggestedWorkspace
    /** Suggest workspaces based on domain name of the user's email address */
    suggestedWorkspaces: SuggestedWorkspaceConnection
    /** Get all the users who are subscribed to this animation. */
    fileNotificationSubscribers: UserNotificationSubscriptionConnection
    workflowVersion: Scalars['String']
    /**
     * @deprecated This query is deprecated and will be removed in near future, use `getUserOnboarding` instead
     * Get the current onboarding of the logged in user
     */
    getUserOnboardingStatus: OnboardingObject
    /** Look up a workflow collection by its id. */
    workspaceCollection: WorkspaceCollection
    /** Fetch files for a workspace collection. */
    workspaceCollectionFiles: FileConnection
    /** Fetch workspace collections connection. */
    workspaceCollections: WorkspaceCollectionConnection
    workspaceColorPalette: WorkspaceColorPalette
    workspaceColorPalettes: WorkspaceColorPaletteConnection
    /** Get workspace invitation link */
    workspaceInvitationLink: (WorkspaceInvitationLink | null)
    workspaceOwnershipTransferRequest: (WorkspaceOwnershipTransfer | null)
    /** Get brand information using the domain */
    brandInformation: BrandObject
    /** Check if there is a current workspace and return it */
    currentWorkspace: (Workspace | null)
    /** Look up a workspace by its id. */
    workspace: (Workspace | null)
    /** Check if the workspace can add members */
    workspaceCanAddMoreSeats: Scalars['Boolean']
    /** Check if the workspace can add members */
    workspaceCanManageMembers: Scalars['Boolean']
    /** get workspace dependencies count, files, projects and members */
    workspaceCounts: (WorkspaceCountsObject | null)
    workspaceSeatUtilization: WorkspaceSeatUtilization
    /** Get the price of per user for the workspace */
    workspaceUserPrice: WorkspaceMemberPrice
    /** Fetch all the workspaces that has access to the logged in user */
    workspaces: (Workspace[] | null)
    /** Fetch all workspaces owned by user */
    workspacesOwnedByUser: (Workspace[] | null)
    /** Get the settings of a Workspace */
    workspaceSettings: WorkspaceSettings
    /** Get available discount details for a workspace subscription */
    workspaceSubscriptionAvailableDiscount: WorkspaceSubscriptionAvailableDiscount
    /** Get the plan the workspace subscription can be upgraded to */
    workspaceSubscriptionAvailablePlanUpgrade: (AvailablePlanUpgrade | null)
    /** Checks if the given checkout session was completed */
    workspaceSubscriptionCheckoutCompleted: WorkspaceSubscriptionCheckoutSessionMetadata
    zipFile: ZipFile
    __typename: 'Query'
}

export interface Mutation {
    /** Completes a reset password process. Will also logout the user from all existing sessions. */
    confirmResetPassword: Scalars['Boolean']
    /** Initiates the long poll token login process. */
    createLoginToken: LoginToken
    /** Links the account for enterprise login (workos provider) and logs user in. */
    enterpriseLinkWithLogin: Authentication
    /** Completes the Enterprise login process. */
    enterpriseLogin: Authentication
    /** Logouts the current user, "true" if the session is successfully destroyed. */
    logout: Scalars['Boolean']
    /** Disables lookup secrets for a user */
    lookupSecretsDisable: Scalars['Boolean']
    /** Login using generated lookup secrets (recovery codes) */
    lookupSecretsLogin: Authentication
    /** Generates new lookup secrets for a user */
    lookupSecretsRegenerate: LookupSecret
    /** To be called by an authenticated user. It marks the token for the login token process as valid, and enables the `tokenLogin` mutation to receive a new session based on the token. */
    markLoginTokenValid: Scalars['Boolean']
    /** Email/Password user login. */
    passwordLogin: Authentication
    /** Email/Password user registration. */
    register: Authentication
    /** Will send a reset password email, if the email belongs to a registered user. */
    resetPassword: Scalars['Boolean']
    /** Initiate a request to clear the sessions for the current user. */
    sessionsClear: Scalars['Boolean']
    /** Completes a clear sessions process. */
    sessionsConfirmClear: Scalars['Boolean']
    /** Login with a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github". */
    socialLogin: Authentication
    /** Checks if the user completed the token login authentication. Will return the accessToken if completed, otherwise it will return an error. */
    tokenLogin: Authentication
    /** Completes the TOTP link to a user account */
    totpLinkConfirm: LookupSecret
    /** TOTP MFA login. */
    totpLogin: Authentication
    /** Unlinks TOTP from the current user. */
    totpUnlink: Scalars['Boolean']
    /** Cancels the ongoing email change process for the user. */
    cancelEmailChange: User
    /** Completes an email change process. */
    confirmEmailChange: Scalars['Boolean']
    /** Completes the email verification process. */
    emailVerificationConfirm: Scalars['Boolean']
    /** Initiates the email change process, will fire an email for the user to conclude the email change process. */
    requestEmailChange: User
    /** Resends the change email confirmation email message. */
    resendEmailChangeEmail: Scalars['Boolean']
    /** Resends the verification email for the current logged in user. */
    resendVerificationEmail: Scalars['Boolean']
    /** Confirms and unsubscribes the user with the code. */
    unsubscribeEmailConfirm: Scalars['Boolean']
    /** Sends the unsubscribe confirm email message. */
    unsubscribeEmailRequest: Scalars['Boolean']
    /** Verify the user email address with a code */
    userEmailVerify: User
    /** Updates user's notification preference */
    viewerNotificationPreferenceUpdate: ViewerNotificationPreference
    /** Deletes user's Slack notification webhook integration */
    viewerSlackNotificationWebhookDelete: Scalars['Boolean']
    /** Sets user's Slack notification webhook integration */
    viewerSlackNotificationWebhookSet: Scalars['Boolean']
    /** Accepts an OAuth consent request for the given consent challenge and selected scopes, and returns the redirect URL. */
    oAuthConsentRequestAccept: Scalars['String']
    /** Rejects an OAuth consent request for the given consent challenge and selected scopes, and returns the redirect URL. */
    oAuthConsentRequestReject: Scalars['String']
    /** Accepts organization invitation. Links directory user to Kratos user. */
    organizationInviteAccept: DirectoryUser
    /** Key/value of data associated with the session. Sets a value for a key to the current logged in session. If value is not sent, unsets the given key. */
    sessionSetValue: Scalars['Boolean']
    /** @deprecated Use the query `isUsernameAvailable` instead of this mutation. */
    isUsernameAvailable: Scalars['Boolean']
    /** Updates a user's password. */
    passwordChange: Scalars['Boolean']
    /** Finishes the process of uploading a new profile image. Must be called right after finishing PUTing the file to the signed URL provided by the `uploadProfilePhoto` mutation. Will process the uploaded image into different sizes and store them. */
    processUserProfilePhotoUpload: Scalars['Boolean']
    /** Sets the segments to apply to the current logged in user. */
    setUserSegments: Scalars['Boolean']
    /** Links the account with a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github", "workos". */
    socialLoginLink: Scalars['Boolean']
    /** Unlinks the account and a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github", "workos". */
    socialLoginUnlink: Scalars['Boolean']
    /** Updates the current user's profile data. */
    updateUser: User
    /** Starts the upload profile picture process. Returns a signed URL that should be used in a PUT request with the file content. The `processUserProfilePhotoUpload` mutation must be called right after the file upload has finished. */
    uploadProfilePhoto: UserProfilePhotoUpload
    /** Update the user preferred locale */
    userLocaleUpdate: Scalars['Boolean']
    /** Request the start of self-service account deletion. */
    userSelfDeleteRequest: Scalars['Boolean']
    accountDeleteRequestCreate: Scalars['Boolean']
    hireRequestCreate: Scalars['Boolean']
    hitCountEventCreate: HitCountEvent
    publicAnimationCollectionAddAnimation: PublicCollection
    publicAnimationCollectionCreate: PublicCollection
    publicAnimationCollectionDelete: Scalars['Boolean']
    publicAnimationCollectionDeleteAnimations: Scalars['Boolean']
    publicAnimationCollectionUpdate: PublicCollection
    publicAnimationCreate: PublicAnimation
    publicAnimationCreateComment: PublicComment
    publicAnimationCreateCommentReply: PublicComment
    publicAnimationDelete: PublicAnimationDeleteResponse
    publicAnimationLike: PublicAnimation
    publicAnimationReport: Scalars['Boolean']
    publicAnimationResolveComment: PublicComment
    publicAnimationUnlike: PublicAnimation
    publicAnimationUploadRequestCreate: PublicAnimationUploadRequest
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Converts a previously uploaded raster image to a Lottie animation.
     */
    rasterToLottieConvert: RasterToLottieJob
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Generates a pre-signed URL for uploading a raster image.
     */
    rasterToLottieUpload: RasterToLottieUploadUrl
    /** Approve a membership request */
    workspaceJoinRequestApprove: WorkspaceMember
    /** Accept invitation to a workspace using the invitation code. */
    workspaceMemberCompleteOnboarding: WorkspaceMember
    /** Remove workspace member */
    workspaceMemberDelete: Scalars['Boolean']
    /** Accept invitation to a workspace using the invitation code. */
    workspaceMemberInvitationAccept: WorkspaceMember
    /** Reinvite user to a workspace. */
    workspaceMemberResendInvite: WorkspaceMember
    /** Change access of the user to a workspace. */
    workspaceMemberSetPermission: WorkspaceMember
    /** Invite a multiple users to a workspace. */
    workspaceMembersSendInvites: WorkspaceMember[]
    /** Create a stripe session and get the ID of the session */
    accountPaymentProviderCustomerPortalSessionCreate: Scalars['String']
    /** Update an account by its id. */
    accountUpdate: Account
    /** Update tax id of account */
    accountUpdateTaxId: Account
    /** Add a comment to an animation */
    commentCreate: Comment
    /** Delete a comment */
    commentDelete: Scalars['Boolean']
    /** Edit a comment */
    commentEdit: Comment
    /** Publish an unpublished comment */
    commentPublish: Comment
    /** React to a comment */
    commentReact: Comment
    /** Reply to a comment */
    commentReplyCreate: Comment
    /** Mark a comment as resolved */
    commentResolve: Comment
    /** Unpublish a comment */
    commentUnpublish: Comment
    /** Unreact to a comment */
    commentUnreact: Comment
    /** Mark a resolved comment as unresolved */
    commentUnresolve: Comment
    /** Begins importing a community animation. */
    communityAnimationImport: Scalars['Boolean']
    /** Creates a community animation import request. */
    communityAnimationImportRequestCreate: CommunityAnimationImportRequest
    educationPlanActivate: Scalars['Boolean']
    /** Create organization for the workspace */
    enterpriseOrganizationCreate: EnterpriseOrganization
    /** Delete the enterprise organization for the workspace */
    enterpriseOrganizationDelete: Scalars['Boolean']
    /** Disable DSYNC for the enterprise organization for the workspace */
    enterpriseOrganizationDisableDsync: EnterpriseOrganization
    /** Disable SSO for the enterprise organization for the workspace */
    enterpriseOrganizationDisableSso: EnterpriseOrganization
    /** Updated SSO enforcement for the enterprise organization for the workspace */
    enterpriseOrganizationSetSsoEnforcement: Scalars['Boolean']
    /** Update directory groups for the enterprise organization for the workspace */
    enterpriseOrganizationUpdateDirectoryGroups: OrganizationDirectoryGroup[]
    /** Add domains for the enterprise organization for the workspace */
    enterpriseOrganizationUpdateDomains: EnterpriseOrganization
    /** Create a new file. */
    fileCreate: File
    /** Fallback mutation to create a new file */
    fileCreateFallback: File
    /** Delete an existing file by its id. */
    fileDelete: Scalars['Boolean']
    fileDescriptionUpdate: File
    /** Duplicate a file. */
    fileDuplicate: File
    /** Update the name of the animation */
    fileRename: File
    /** Modify an existing file by its id. */
    fileUpdate: File
    /** Update background color of the file */
    fileUpdateBackgroundColor: File
    fileUpdateStatus: File
    fileUploadRequestCreate: FileUploadRequest
    /** Delete existing files by their ids, project id or folder id. IDs can optionally be scoped to a project or folder by passing in a projectId or folderId. */
    filesDelete: Scalars['Boolean']
    /** Move file or folder to a new folder. */
    filesMoveToFolder: File[]
    /** Move file or folder to a new folder. */
    filesMoveToProject: File[]
    filesUpdateStatus: File[]
    exportJsonFile: FileVariant
    filePreviewCreate: FileVariant
    fileVariantDelete: FileVariant
    fileVariantFallback: FileVariant
    fileVariantUpdate: FileVariant
    fileVariantsSync: FileVariant[]
    /** @deprecated Use `mutation fileVersionOptimize` instead */
    optimizeWorkflowFile: (FileVariant | null)
    /** @deprecated Use `mutation fileVersionOptimize` instead */
    uploadDotLottieWorkflowFile: FileVariant
    /** Create a new version of the file */
    fileVersionCreate: FileVersion
    /** Fallback to create a new file version */
    fileVersionCreateFallback: FileVersion
    /** Delete a version from the file */
    fileVersionDelete: Scalars['Boolean']
    /** Create optimized variants for a FileVersion. Returns a FileVersionOptimizeJob if the job is queued. */
    fileVersionOptimize: (FileVersionOptimizeJob | null)
    /** @deprecated use fileVariantsSync */
    fileVersionOptimizedVariantsSync: FileVariant[]
    /** Restore the current file to the specific version ( also increment the version ) */
    fileVersionRestore: File
    /** Update tags for file version */
    fileVersionTagsUpdate: Scalars['String'][]
    /** Create a new folder. */
    folderCreate: Folder
    /** Delete an existing folder by its id. */
    folderDelete: Scalars['Boolean']
    /** Rename folder */
    folderRename: Folder
    /** Create a Braintree subscription for the next plan (pricingId) */
    inlineCheckoutBraintreeSubscriptionCreate: Scalars['Boolean']
    inlineCheckoutSetupIntentCreate: InlineCheckoutSetupIntentCreatePayload
    inlineCheckoutStripeSubscriptionCreate: Scalars['Boolean']
    /** Retrieve the download link for an invoice. */
    invoiceDownloadLinkCreate: (Scalars['String'] | null)
    /** Optimize a a given lottie json payload, returns a temporary url for the optimized file */
    lottieJsonOptimize: Scalars['String']
    /** Create a new lottie mockup */
    createLottieMockup: LottieMockup
    /** Delete a lottie mockup using lottie mockup id */
    deleteLottieMockup: Scalars['Boolean']
    /** Get S3 presigned background upload URL */
    getBackgroundUploadPresignedData: BackgroundImageObject
    fileNotificationsSubscribe: Scalars['Boolean']
    fileNotificationsUnsubscribe: Scalars['Boolean']
    /** Update the current onboarding checlist of the logged in user */
    updateUserOnboardingChecklist: OnboardingChecklistObject
    /** Update the current onboarding of the logged in user */
    updateUserOnboarding: OnboardingV2Object
    editorFileEditCountIncrement: Scalars['Float']
    /** Create a payment intent for new/renew subscription to get the checkout session token */
    paymentIntentCreate: PaymentIntentToken
    /** Create payment intent for accepting workspace member requests and return the checkout session token */
    paymentIntentCreateForAcceptingMemberRequest: PaymentIntentToken
    /** Create payment intent for renewing workspace subscription and return the checkout session token */
    paymentIntentCreateForRenewSubscription: PaymentIntentToken
    /** Create a payment intent for adding seats for resources like animations */
    paymentIntentCreateForResourceSeats: PaymentIntentToken
    /** Create a payment intent for adding seats to the workspace to get the checkout session token */
    paymentIntentCreateForSeats: PaymentIntentToken
    paymentMethodInvoicePaymentAttempt: InvoicePaymentAttemptPayload
    paymentMethodSetDefault: PaymentMethod
    paymentMethodSetup: PaymentMethodSetupPayload
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * remove play segment from file version
     */
    playSegmentRemove: FileVersion
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * add or update play segment to a file version
     */
    playSegmentUpsert: FileVersion
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * clear all play segments from version
     */
    playSegmentsClear: FileVersion
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * copy play segment from one file version to another
     */
    playSegmentsCopy: FileVersion
    /** Get S3 presigned image upload URL */
    portfolioImageUploadPresignedData: PortfolioImageUploadObject
    portfolioPostCreate: PortfolioPost
    portfolioPostDelete: Scalars['Boolean']
    portfolioPostPublish: PortfolioPost
    portfolioPostUpdate: PortfolioPost
    /** Get S3 presigned icon upload URL */
    portfolioIconUploadPresignedData: PortfolioIconUploadObject
    workspacePortfolioUpdate: WorkspacePortfolio
    premiumAssetGenerateDownloadLink: PremiumAssetDownloadLink
    privateShareAccept: PrivateShare
    /** Add user to resource */
    privateShareInviteUser: PrivateShare[]
    /** Re-invite user to private share */
    privateShareReInviteUser: PrivateShare
    /** Update user access to the shared resource */
    privateShareSetPermission: (PrivateShare | null)
    /** Create a draft project if draft workspace does not already exist */
    draftProjectCreate: Project
    /** Create a new project. */
    projectCreate: Project
    /** Delete an existing project by its id. */
    projectDelete: Scalars['Boolean']
    /** Modify an existing project by its id. */
    projectUpdate: Project
    /** Update the project access to workspace. */
    projectUpdatePermission: Project
    /** Extend public asset link expiry */
    publicAssetExtendExpiry: PublicAsset
    /** Re-generate public asset link */
    publicAssetRegenerate: PublicAsset
    /** Restore public asset link to a different workflow file version */
    publicAssetRestore: PublicAsset[]
    /** Publish public asset link for a workflow file version */
    publicAssetUpdate: PublicAsset[]
    publicShareCreate: PublicShare
    /** Generate public link for a given file key */
    publicShareCreateForFileKey: (PublicShare | null)
    /** Purges the recently deleted entry. */
    recentlyDeletedPurge: Scalars['Boolean']
    /** Purges all the recently deleted entries for the given workspace. */
    recentlyDeletedPurgeAll: Scalars['Boolean']
    /** Deletes the recently deleted entry. */
    recentlyDeletedPurgeMultiple: Scalars['Boolean']
    /** Restores the recently deleted entry. */
    recentlyDeletedRestore: Scalars['Boolean']
    /** Create a source file */
    sourceFileCreate: SourceFile
    /** Find source files by file version id */
    sourceFileDelete: Scalars['Boolean']
    /** Update source file */
    sourceFileUpdate: (SourceFile | null)
    /** Join a suggested workspace */
    suggestedWorkspaceCancelJoinRequest: (SuggestedWorkspace | null)
    /** Join a suggested workspace */
    suggestedWorkspaceJoin: (SuggestedWorkspace | null)
    /** Remove a suggested workspace from the list show to the user */
    suggestedWorkspaceRemove: Scalars['Boolean']
    /** Convert video to lottie, return task_id */
    videoToLottie: Scalars['String']
    /** Get converted lottie (from video) with taskId */
    videoToLottieConverted: FileUploadRequestStatus
    /** Update the current workspace of the logged in user. If no workspace exists, a new workspace setting will be created. */
    updateCurrentWorkspace: Workspace
    /**
     * @deprecated This mutation is deprecated and will be removed in near future, use `updateUserOnboarding` instead
     * Update the current onboarding of the logged in user
     */
    updateUserOnboardingStatus: OnboardingObject
    workflowTempFileUploadRequestCreate: WorkflowTempFilePreSignedUploadRequest
    /** Update the collection access to workspace. */
    collectionUpdatePermission: WorkspaceCollection
    /** Add animations to a workspace collection. */
    workspaceCollectionAddFiles: WorkspaceCollection
    /** Create a new workspace collection. */
    workspaceCollectionCreate: WorkspaceCollection
    /** Delete an existing workspace collection by its id. */
    workspaceCollectionDelete: Scalars['Boolean']
    /** Add animations to a workspace collection. */
    workspaceCollectionRemoveFiles: WorkspaceCollection
    /** Modify an existing collection by its id. */
    workspaceCollectionUpdate: WorkspaceCollection
    workspaceColorPaletteCreate: WorkspaceColorPalette
    workspaceColorPaletteDelete: Scalars['Boolean']
    workspaceColorPaletteUpdate: WorkspaceColorPalette
    /** Invite user to workspace if the invitation code is valid */
    workspaceInvitationLinkAccept: WorkspaceMember
    /** Regenerate workspace invitation link */
    workspaceInvitationLinkRegenerate: WorkspaceInvitationLink
    /** Update workspace invitation link. If not workspace invitation link exists, a new link will be created */
    workspaceInvitationLinkUpdate: WorkspaceInvitationLink
    workspaceOwnershipTransferRequestAccept: WorkspaceOwnershipTransfer
    workspaceOwnershipTransferRequestCancel: WorkspaceOwnershipTransfer
    workspaceOwnershipTransferRequestCreate: WorkspaceOwnershipTransfer
    workspaceOwnershipTransferRequestDecline: WorkspaceOwnershipTransfer
    workspaceOwnershipTransferRequestResend: WorkspaceOwnershipTransfer
    /** Get S3 presigned icon upload URL */
    getIconUploadPresignedData: WorkspaceIconUploadObject
    /** Get user's draft workspace. Create a draft workspace if existing draft workspace doesn't exist. */
    getOrCreateDraftWorkspace: Workspace
    /** Upload initial animation to the workspace. */
    initialAnimationUpload: (Scalars['String'] | null)
    /** Determine if it's the user's first attempt at login, and if so, set-up the workspace. */
    setupInitialWorkspace: Workspace
    /** Create a new workspace. */
    workspaceCreate: Workspace
    /** Delete a workspace. This will delete all of the workspace's projects, invitations, and subscriptions. */
    workspaceDelete: Workspace
    /** Leave a workspace. This will remove all your permissions from the workspace and remove any associated settings. */
    workspaceLeave: Workspace
    /** Request to join a workspace */
    workspaceRequestJoin: (WorkspaceMember | null)
    /** Cancel request to join a workspace */
    workspaceRequestJoinCancel: Workspace
    /** Transfer ownership to new user in the workspace */
    workspaceTransferOwnership: Scalars['Boolean']
    /** Update workspace settings by ID */
    workspaceUpdate: Workspace
    /** Update settings of a workspace */
    workspaceSettingsUpdate: WorkspaceSettings
    /** Applies a discount to a failed invoice for a subscription */
    workspaceSubscriptionApplyDiscount: Scalars['Boolean']
    /** Cancels current active subscription of the given workspace. */
    workspaceSubscriptionCancel: Scalars['Boolean']
    /** Cancel trial plan of the given workspace. */
    workspaceSubscriptionCancelTrial: Scalars['Boolean']
    /** Marks the subscription active if it is marked for cancellation. */
    workspaceSubscriptionContinue: Scalars['Boolean']
    /** Create a stripe checkout session to a workspace and returns the session if the payment provider is stripe, for the case of paypal it returns success if the subscription is created. */
    workspaceSubscriptionCreateCheckoutSession: Scalars['String']
    /** Create a stripe checkout session to a workspace and returns the session. */
    workspaceSubscriptionCreateCheckoutSessionForEmbed: CheckoutObject
    /** Get the client token for braintree */
    workspaceSubscriptionGetClientToken: Scalars['String']
    /** Upgrades current active subscription of the given workspace to the next one. */
    workspaceSubscriptionUpgrade: Scalars['Boolean']
    zipFileCreate: ZipFile
    __typename: 'Mutation'
}

export interface OrganizationSsoLogin {
    /** The organization name */
    name: Scalars['String']
    /** The sso login url */
    url: Scalars['String']
    __typename: 'OrganizationSsoLogin'
}

export interface LookupSecret {
    /** The recovery code strings */
    codes: (Scalars['String'][] | null)
    /** The result status of the requested action */
    status: Scalars['String']
    __typename: 'LookupSecret'
}

export interface TotpLink {
    flowId: Scalars['String']
    totpCode: (Scalars['String'] | null)
    totpImage: (Scalars['String'] | null)
    __typename: 'TotpLink'
}

export interface LocaleListing {
    locales: (Locale[] | null)
    __typename: 'LocaleListing'
}

export interface Locale {
    code: Scalars['String']
    fallbackCode: Scalars['String']
    __typename: 'Locale'
}

export interface ViewerNotificationPreference {
    /** The notification preference configs */
    preference: NotificationPreference
    /** The notification preference template info */
    template: NotificationTemplate
    __typename: 'ViewerNotificationPreference'
}

export interface NotificationPreference {
    /** The specific channels that are enabled or not */
    channels: NotificationChannel
    /** All channels will be turned off if false, regardless of individual channels options */
    enabled: Scalars['Boolean']
    __typename: 'NotificationPreference'
}

export interface NotificationChannel {
    /** Is chat channel enabled */
    chat: (Scalars['Boolean'] | null)
    /** Is email channel enabled */
    email: (Scalars['Boolean'] | null)
    /** Is inApp channel enabled */
    inApp: (Scalars['Boolean'] | null)
    /** Is push channel enabled */
    push: (Scalars['Boolean'] | null)
    /** Is sms channel enabled */
    sms: (Scalars['Boolean'] | null)
    __typename: 'NotificationChannel'
}

export interface NotificationTemplate {
    /** User will not be able to disable notification if true */
    critical: Scalars['Boolean']
    /** The description of the notification template */
    description: (Scalars['String'] | null)
    /** The id of the notification template */
    id: Scalars['String']
    /** The name of the notification template */
    name: Scalars['String']
    /** The notification template group info */
    notificationGroup: NotificationGroup
    __typename: 'NotificationTemplate'
}

export interface NotificationGroup {
    /** The id of the notification group */
    id: Scalars['String']
    /** The name of the notification group */
    name: Scalars['String']
    __typename: 'NotificationGroup'
}

export interface OAuthConsentRequest {
    /** The name of the OAuth client that's requesting for consent. */
    clientName: Scalars['String']
    /** If skip is true, the client must redirect to this URL. */
    redirectToURL: (Scalars['String'] | null)
    /** The scopes requested for user consent. Will not be returned if skip is `true`. */
    scopes: (OAuthConsentRequestScope[] | null)
    /** If true, you must redirect to the URL in the `redirectToURL` field. */
    skip: Scalars['Boolean']
    __typename: 'OAuthConsentRequest'
}

export interface OAuthConsentRequestScope {
    /** The description of the scope. */
    description: Scalars['String']
    /** The ID of the scope. */
    id: Scalars['ID']
    /** The OAuth scope. */
    scope: Scalars['String']
    __typename: 'OAuthConsentRequestScope'
}

export interface OAuthLoginRequest {
    /** If skip is true, the client must redirect to this URL. */
    redirectToURL: (Scalars['String'] | null)
    /** If true, you must redirect to the URL in the `redirectToURL` field. */
    skip: Scalars['Boolean']
    __typename: 'OAuthLoginRequest'
}

export interface UserSegmentListing {
    segments: (UserSegment[] | null)
    __typename: 'UserSegmentListing'
}

export interface UserSegment {
    description: Scalars['String']
    id: Scalars['Int']
    title: Scalars['String']
    __typename: 'UserSegment'
}

export interface User {
    /** The date/time when the user authenticated the current session. */
    authenticatedAt: Scalars['DateTime']
    /** The user's profile picture. */
    avatarUrl: Scalars['String']
    /** The user's Behance username. */
    behanceUsername: (Scalars['String'] | null)
    /** The user's short Bio. */
    bio: (Scalars['String'] | null)
    /** The user's City of residence. */
    city: (Scalars['String'] | null)
    /** The user's Country of residence. */
    country: (Scalars['String'] | null)
    /** The date/time of account creation. */
    createdAt: (Scalars['DateTime'] | null)
    /** The user's Dribbble username. */
    dribbbleUsername: (Scalars['String'] | null)
    /** The user's email address. */
    email: (Scalars['String'] | null)
    /** True if the user's current email address has been verified. */
    emailVerified: (Scalars['Boolean'] | null)
    /** True if the user has agreed to receive marketing emails. */
    enableMarketingEmails: (Scalars['Boolean'] | null)
    /** The internal id of the enterprise org if the user has an e-sso session. */
    enterpriseOrgId: (Scalars['String'] | null)
    /** The user's first name. */
    firstName: Scalars['String']
    /** The user's Github username. */
    githubUsername: (Scalars['String'] | null)
    /** The user's LottieFiles account's unique ID. */
    id: Scalars['String']
    /** The user's Instagram username. */
    instagramUsername: (Scalars['String'] | null)
    /** True if the user is available for work. */
    isHireable: Scalars['Boolean']
    /** True if it's a service account. */
    isServiceAccount: Scalars['Boolean']
    /** The city where the user last logged in from. */
    lastLoggedInFromCity: (Scalars['String'] | null)
    /** The country where the user last logged in from. */
    lastLoggedInFromCountry: (Scalars['String'] | null)
    /** The timezone where the user last logged in from. */
    lastLoggedInTimezone: (Scalars['String'] | null)
    /** The user's last name. */
    lastName: (Scalars['String'] | null)
    /** The user's Linkedin username. */
    linkedinUsername: (Scalars['String'] | null)
    /** The user's locale code. */
    locale: (Scalars['String'] | null)
    /** The user's Twitter username. */
    twitterUsername: (Scalars['String'] | null)
    /** If the user is ongoing an email change process, this is the new email that the user is changing to. Otherwise it will be `null`. */
    unconfirmedNewEmail: (Scalars['String'] | null)
    /** The date/time of last account update. */
    updatedAt: (Scalars['DateTime'] | null)
    /** The segments this user belongs to. */
    userSegments: (UserSegment[] | null)
    /** The user's personal website. */
    website: (Scalars['String'] | null)
    hasSlackNotificationEnabled: (Scalars['Boolean'] | null)
    /** @deprecated Legacy field, will always return false. */
    isPro: Scalars['Boolean']
    /** For use in the internal migration process. It will contain the ID of the user in the legacy WEB DB if the user is migrated. Otherwise, it will return an INT hashed from the user's Kratos ID. */
    legacyWebUserId: Scalars['Int']
    /** @deprecated Use `city` instead. */
    location: (Scalars['String'] | null)
    /** @deprecated Use `firstName` instead. */
    name: Scalars['String']
    /** @deprecated Use `username` instead. */
    url: Scalars['String']
    /** The user's unique username. */
    username: Scalars['String']
    publicAnimations: (PublicAnimationConnection | null)
    stats: (UserStats | null)
    achievements: (UserAchievementConnection | null)
    __typename: 'User'
}

export interface ViewerCredential {
    /** Additional information on the credential. If enterprise sso then it will be the name of the organization */
    description: (Scalars['String'] | null)
    /** Internal ID of the organization for the credential, if available. */
    orgInternalId: (Scalars['String'] | null)
    /** The type of the credential. */
    type: Scalars['String']
    __typename: 'ViewerCredential'
}

export interface LoginToken {
    /** The URL to direct the user to in order to conclude the token login. */
    loginUrl: Scalars['String']
    /** The token to use with the tokenLogin mutation. */
    token: Scalars['String']
    __typename: 'LoginToken'
}

export interface Authentication {
    /** The token to include in future requests to this API. */
    accessToken: (Scalars['String'] | null)
    /** Indicates whether an additional MFA step is required */
    additionalAuthRequired: (Scalars['Boolean'] | null)
    /** The ISO Date string in the format "2022-12-06T13:33:08.000Z". */
    expiresAt: Scalars['DateTime']
    /** If this is not null, the client must redirect to this URL. */
    redirectToURL: (Scalars['String'] | null)
    /** Returned only from the `socialLogin` mutation. Will be true if a LottieFiles account was created in the `socialLogin`. */
    socialLoginAccountCreated: (Scalars['Boolean'] | null)
    /** The token type, e.g. "Bearer". */
    tokenType: Scalars['String']
    __typename: 'Authentication'
}

export type NotificationChannelType = 'Chat' | 'Email' | 'InApp' | 'Push' | 'Sms'

export interface DirectoryUser {
    /** The id of the directory user */
    directoryUserId: Scalars['String']
    /** The email of the directory user */
    email: Scalars['String']
    /** The Kratos user id of the directory user */
    kratosUserId: Scalars['String']
    /** The organization id that the directory user belongs to */
    organizationId: Scalars['String']
    __typename: 'DirectoryUser'
}

export interface UserProfilePhotoUpload {
    filename: Scalars['String']
    signedUrl: Scalars['String']
    status: Scalars['String']
    __typename: 'UserProfilePhotoUpload'
}


/** Account delete request types for account deletion requests */
export type AccountDeleteRequestType = 'CANCEL_REQUEST' | 'REQUEST_DELETE'

export interface Animator {
    avatarUrl: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    url: Scalars['String']
    __typename: 'Animator'
}

export type PublicAnimationUploadRequestFileType = 'LOTTIE' | 'DOT_LOTTIE'

export interface AnimatorConnection {
    /** A list edges. */
    edges: AnimatorEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'AnimatorConnection'
}

export interface AnimatorEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Animator
    __typename: 'AnimatorEdge'
}

export interface Blog {
    category: (BlogCategory | null)
    createdAt: Scalars['DateTime']
    id: Scalars['ID']
    imageUrl: Scalars['String']
    link: Scalars['String']
    postedAt: Scalars['DateTime']
    slug: Scalars['String']
    title: Scalars['String']
    __typename: 'Blog'
}

export interface BlogCategory {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'BlogCategory'
}

export interface BlogConnection {
    /** A list edges. */
    edges: BlogEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'BlogConnection'
}

export interface BlogEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Blog
    __typename: 'BlogEdge'
}

export interface CollectionAnimationPreview {
    image: Scalars['String']
    __typename: 'CollectionAnimationPreview'
}


/** Collection animation types */
export type CollectionAnimationType = 'ALL' | 'ANIMATION' | 'STICKER'


/** Collection types */
export type CollectionType = 'PRIVATE' | 'PUBLIC'

export interface Color {
    hex: Scalars['String']
    __typename: 'Color'
}

export interface ColorPalette {
    id: Scalars['Int']
    name: (Scalars['String'] | null)
    palette: Color[]
    __typename: 'ColorPalette'
}

export interface ColorPaletteConnection {
    /** A list edges. */
    edges: ColorPaletteEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'ColorPaletteConnection'
}

export interface ColorPaletteEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: ColorPalette
    __typename: 'ColorPaletteEdge'
}


/** Complaint types for report animation */
export type ComplaintType = 'GUIDELINES_VIOLATION' | 'OTHER' | 'PLAGIARISM'


/** Contract types for hire requests */
export type ContractType = 'FREELANCE' | 'FULLTIME'


/** Duration filter types for popular animations */
export type DurationFilterType = 'ALL_TIME' | 'MONTHLY' | 'WEEKLY'

export interface HitCountEvent {
    errors: Scalars['String']
    message: Scalars['String']
    status: Scalars['String']
    __typename: 'HitCountEvent'
}

export interface Notification {
    link: (Scalars['String'] | null)
    message: Scalars['String']
    theme: (Theme | null)
    __typename: 'Notification'
}

export interface PageInfo {
    /** When paginating forwards, the cursor to continue. */
    endCursor: (Scalars['String'] | null)
    /** When paginating forwards, are there more items?. */
    hasNextPage: Scalars['Boolean']
    /** When paginating backwards, are there more items?. */
    hasPreviousPage: Scalars['Boolean']
    /** When paginating backwards, the cursor to continue. */
    startCursor: (Scalars['String'] | null)
    __typename: 'PageInfo'
}

export interface PublicAnimation {
    bgColor: (Scalars['String'] | null)
    comments: (PublicComment[] | null)
    commentsCount: Scalars['Int']
    createdAt: Scalars['DateTime']
    createdByUserId: Scalars['ID']
    description: (Scalars['String'] | null)
    downloads: (Scalars['Float'] | null)
    dotlottieFormatVersion: Scalars['String']
    gifFileSize: (Scalars['String'] | null)
    gifUrl: (Scalars['String'] | null)
    id: Scalars['Int']
    imageFileSize: (Scalars['Int'] | null)
    imageFrame: (Scalars['String'] | null)
    imageUrl: (Scalars['String'] | null)
    isLiked: Scalars['Boolean']
    likesCount: Scalars['Int']
    lottieFileSize: (Scalars['Int'] | null)
    lottieFileType: (Scalars['String'] | null)
    lottieUrl: (Scalars['String'] | null)
    jsonUrl: (Scalars['String'] | null)
    lottieVersion: (Scalars['String'] | null)
    name: Scalars['String']
    publishedAt: (Scalars['DateTime'] | null)
    slug: Scalars['String']
    sourceFileName: (Scalars['String'] | null)
    sourceFileSize: (Scalars['Int'] | null)
    sourceFileType: (Scalars['String'] | null)
    sourceFileUrl: (Scalars['String'] | null)
    sourceName: (Scalars['String'] | null)
    sourceVersion: (Scalars['String'] | null)
    speed: (Scalars['Float'] | null)
    status: (Scalars['Int'] | null)
    updatedAt: (Scalars['DateTime'] | null)
    url: (Scalars['String'] | null)
    uuid: Scalars['String']
    videoFileSize: (Scalars['Int'] | null)
    videoUrl: (Scalars['String'] | null)
    isCanvaCompatible: (Scalars['Boolean'] | null)
    frameRate: (Scalars['Float'] | null)
    createdBy: (User | null)
    __typename: 'PublicAnimation'
}

export interface PublicAnimationConnection {
    /** A list edges. */
    edges: PublicAnimationEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'PublicAnimationConnection'
}

export interface PublicAnimationDeleteResponse {
    message: Scalars['String']
    success: Scalars['Boolean']
    __typename: 'PublicAnimationDeleteResponse'
}

export interface PublicAnimationEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PublicAnimation
    __typename: 'PublicAnimationEdge'
}

export interface PublicAnimationUploadRequest {
    contentType: Scalars['String']
    fields: Scalars['JSONObject']
    id: Scalars['ID']
    url: Scalars['String']
    __typename: 'PublicAnimationUploadRequest'
}


/** Public animation status filter types */
export type PublicAnimationStatusFilterType = 'ALL' | 'PENDING' | 'PUBLISHED' | 'REJECTED'

export interface PublicAnimationTag {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'PublicAnimationTag'
}

export interface PublicAnimationTagConnection {
    /** A list of edges. */
    edges: PublicAnimationTagEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'PublicAnimationTagConnection'
}

export interface PublicAnimationTagEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PublicAnimationTag
    __typename: 'PublicAnimationTagEdge'
}

export interface PublicCollection {
    animationType: (CollectionAnimationType | null)
    animationsCount: (Scalars['Int'] | null)
    collectionAnimationPreviews: (CollectionAnimationPreview[] | null)
    createdByUserId: Scalars['ID']
    description: (Scalars['String'] | null)
    id: Scalars['Int']
    imageUrl: (Scalars['String'] | null)
    slug: Scalars['String']
    title: Scalars['String']
    type: CollectionType
    url: Scalars['String']
    createdBy: (User | null)
    __typename: 'PublicCollection'
}

export interface PublicCollectionConnection {
    /** A list edges. */
    edges: PublicCollectionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'PublicCollectionConnection'
}

export interface PublicCollectionEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PublicCollection
    __typename: 'PublicCollectionEdge'
}

export interface PublicComment {
    content: Scalars['String']
    createdAt: Scalars['DateTime']
    frame: (Scalars['Float'] | null)
    id: Scalars['Int']
    isResolved: Scalars['Boolean']
    marker: (Scalars['Point'] | null)
    parentId: (Scalars['Int'] | null)
    replies: (PublicComment[] | null)
    updatedAt: (Scalars['DateTime'] | null)
    userId: Scalars['ID']
    user: (User | null)
    __typename: 'PublicComment'
}

export interface SoftwareUpdate {
    autoUpdate: Scalars['Boolean']
    changelog: (Scalars['String'] | null)
    downloadUrl: (Scalars['String'] | null)
    forceUpdate: Scalars['Boolean']
    infoUrl: (Scalars['String'] | null)
    version: Scalars['String']
    __typename: 'SoftwareUpdate'
}

export interface Theme {
    dark: (ThemeColor | null)
    light: (ThemeColor | null)
    __typename: 'Theme'
}

export interface ThemeColor {
    bgColor: (Scalars['String'] | null)
    icon: (Scalars['String'] | null)
    textColor: (Scalars['String'] | null)
    __typename: 'ThemeColor'
}

export interface TrendingItem {
    link: Scalars['String']
    rank: Scalars['Float']
    title: Scalars['String']
    __typename: 'TrendingItem'
}

export interface UserAchievement {
    completed: Scalars['Boolean']
    count: Scalars['Int']
    goal: (Scalars['Int'] | null)
    progressMessage: Scalars['String']
    title: Scalars['String']
    type: Scalars['String']
    __typename: 'UserAchievement'
}

export interface UserAchievementConnection {
    /** A list edges. */
    edges: UserAchievementEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int']
    __typename: 'UserAchievementConnection'
}

export interface UserAchievementEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: UserAchievement
    __typename: 'UserAchievementEdge'
}

export interface UserStatGraphData {
    value: Scalars['Int']
    __typename: 'UserStatGraphData'
}

export interface UserStats {
    downloadGraph: UserStatGraphData[]
    downloads: Scalars['Int']
    downloadsLastMonth: Scalars['Int']
    likeGraph: UserStatGraphData[]
    likes: Scalars['Int']
    likesLastMonth: Scalars['Int']
    profileGraph: UserStatGraphData[]
    profileViews: Scalars['Int']
    profileViewsLastMonth: Scalars['Int']
    __typename: 'UserStats'
}

export interface Subscription {
    /** Subscribe to FileAssetEvents */
    fileAssetEvents: FileAssetEvent
    /** Subscribe to File Update events */
    fileUpdate: FileObject
    /** Subscribe to File Variation Update events */
    fileVariationUpdate: FileVariation
    zipFileUpdate: ZipFileObject
    __typename: 'Subscription'
}

export interface Attributes {
    /** Size of the uploaded file */
    contentLength: (Scalars['String'] | null)
    /** Type of uploaded file */
    contentType: (Scalars['String'] | null)
    /** S3 Version Id */
    s3VersionId: (Scalars['String'] | null)
    /** Format version */
    formatVersion: (Scalars['String'] | null)
    __typename: 'Attributes'
}

export interface VariationMetadata {
    /** Previvew Height */
    height: (Scalars['Float'] | null)
    /** Preview Width */
    width: (Scalars['Float'] | null)
    /** Preview Background Color */
    bgColor: (Scalars['String'] | null)
    __typename: 'VariationMetadata'
}

export interface FileVariation {
    /** Unique ID of file variation */
    id: (Scalars['String'] | null)
    /** File Key for the source file  */
    fileKey: (Scalars['String'] | null)
    /** File Version Id of the source file */
    fileVersionId: (Scalars['String'] | null)
    /** Unique filename of the variantion */
    filename: (Scalars['String'] | null)
    /** Url of the file variation */
    url: (Scalars['String'] | null)
    /** Attributes generated */
    attributes: (Attributes | null)
    /** Metadata for file variation */
    metadata: (VariationMetadata | null)
    /** Type of variation. */
    type: (Scalars['String'] | null)
    /** Created defaultValue */
    createdAt: (Scalars['DateTime'] | null)
    /** Status of file variation */
    status: (Scalars['String'] | null)
    __typename: 'FileVariation'
}

export interface Metadata {
    /** Colors */
    colors: (Scalars['JSON'] | null)
    /** Lottie Colors */
    lottieColors: (Scalars['JSON'] | null)
    /** No. of frames */
    frames: (Scalars['String'] | null)
    /** Frame Rate */
    frameRate: (Scalars['String'] | null)
    /** Lottie Height */
    height: (Scalars['String'] | null)
    /** Lottie Width */
    width: (Scalars['String'] | null)
    /** Lottie Start Frame */
    inPoint: (Scalars['String'] | null)
    /** Lottie Outpoint */
    outPoint: (Scalars['String'] | null)
    /** Lottie Version */
    version: (Scalars['String'] | null)
    /** Lottie Generator */
    generator: (Scalars['String'] | null)
    /** No of Layers */
    layers: (Scalars['String'] | null)
    __typename: 'Metadata'
}


/** File */
export interface FileObjectRegenerate {
    /** Unique file key for a file */
    key: Scalars['String']
    /** Version ID for a file */
    versionId: Scalars['String']
    /** Subversion ID for a file. If it is a main version (i.e. not a subversion), it will be "0". */
    subVersionId: Scalars['String']
    /** Uniquely generated filename */
    filename: Scalars['String']
    /** The url to uploaded  file */
    url: Scalars['String']
    /** Attributes generated */
    attributes: (Attributes | null)
    metadata: (Metadata | null)
    /** The job id of thumbnails */
    thumbnailJobId: (Scalars['String'] | null)
    /** Thumbanils generated */
    contents: Scalars['JSON']
    /** File variations */
    fileVariations: (FileVariation[] | null)
    /** Created Date */
    createdAt: Scalars['DateTime']
    /** Updated Date */
    updatedAt: Scalars['DateTime']
    /** Updated Date */
    deletedAt: Scalars['DateTime']
    /** Updated Date */
    cleanedAt: Scalars['DateTime']
    /** Status of uploaded file */
    status: Scalars['String']
    __typename: 'FileObjectRegenerate'
}

export interface PreviewContent {
    /** Url of thumbnail */
    url: (Scalars['String'] | null)
    /** Version Id */
    versionId: (Scalars['String'] | null)
    /** Content Type */
    contentType: (Scalars['String'] | null)
    __typename: 'PreviewContent'
}

export interface PreviewSize {
    /** Size small */
    small: (PreviewContent | null)
    /** Size medium  */
    medium: (PreviewContent | null)
    /** Size large */
    large: (PreviewContent | null)
    __typename: 'PreviewSize'
}

export interface Preview {
    /** Png */
    webp: (PreviewSize | null)
    /** Webp */
    gif: (PreviewSize | null)
    /** Mp4 */
    mp4: (PreviewSize | null)
    __typename: 'Preview'
}

export interface ThumbnailContent {
    /** Url of thumbnail */
    url: (Scalars['String'] | null)
    /** Version Id */
    s3VersionId: (Scalars['String'] | null)
    /** Content Type */
    contentType: (Scalars['String'] | null)
    __typename: 'ThumbnailContent'
}

export interface ThumbnailSize {
    /** Size small */
    small: (ThumbnailContent | null)
    /** Size medium  */
    medium: (ThumbnailContent | null)
    /** Size large */
    large: (ThumbnailContent | null)
    __typename: 'ThumbnailSize'
}

export interface Thumbnail {
    /** Png */
    png: (ThumbnailSize | null)
    /** Webp */
    webp: (ThumbnailSize | null)
    __typename: 'Thumbnail'
}


/** File */
export interface FileObject {
    /** Unique file key for a file */
    key: Scalars['String']
    /** Version ID for a file */
    versionId: Scalars['String']
    /** Subversion ID for a file. If it is a main version (i.e. not a subversion), it will be "0". */
    subVersionId: Scalars['String']
    /** Uniquely generated filename */
    filename: Scalars['String']
    /** The url to uploaded  file */
    url: Scalars['String']
    /** Attributes generated */
    attributes: (Attributes | null)
    metadata: (Metadata | null)
    thumbnails: (Thumbnail | null)
    /** Previews  generated */
    previews: (Preview | null)
    /** Thumbanils generated */
    contents: Scalars['JSON']
    /** File variations */
    fileVariations: (FileVariation[] | null)
    /** Created Date */
    createdAt: Scalars['DateTime']
    /** Updated Date */
    updatedAt: Scalars['DateTime']
    /** Updated Date */
    deletedAt: Scalars['DateTime']
    /** Updated Date */
    cleanedAt: Scalars['DateTime']
    /** Status of uploaded file */
    status: Scalars['String']
    markers: LottieJsonMarker[]
    /** The audio that are available on this file. */
    audio: AudioAssetObjectReference[]
    /** The themes that are available on this file. */
    themes: ThemeAssetObjectReference[]
    /** The images that are available on this file. */
    images: ImageAssetObjectReference[]
    /** The state machines that are available on this file. */
    stateMachines: StateMachineAssetObjectReference[]
    __typename: 'FileObject'
}

export interface PresignedPost {
    /** Form fields used for a presigned s3 post */
    fields: Scalars['JSON']
    /** Unique key of the file */
    key: Scalars['String']
    /** Url used for a presigned s3 post */
    url: Scalars['String']
    __typename: 'PresignedPost'
}

export interface SignedUrl {
    /** Signed url expiry time */
    expires: Scalars['Float']
    /** Cloudfront signed url */
    signedUrl: Scalars['String']
    __typename: 'SignedUrl'
}

export interface FilePreviewGenerate {
    /** Unique ID of file variation */
    id: (Scalars['String'] | null)
    /** Job Id for file preview generation process. */
    jobId: (Scalars['String'] | null)
    __typename: 'FilePreviewGenerate'
}

export interface FilePreviewGenerateStatus {
    /** File preview generation status */
    status: (PreviewGenerationStatus | null)
    __typename: 'FilePreviewGenerateStatus'
}

export type PreviewGenerationStatus = 'FAILED' | 'PENDING' | 'PROCESSED'

export interface FileAssetObjectReference {
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id: Scalars['ID']
    /** The Id of the FileAssetObject. */
    assetId: Scalars['String']
    /** The display name of the file asset. */
    displayName: (Scalars['String'] | null)
    __typename: 'FileAssetObjectReference'
}

export interface AudioAssetObjectReference {
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id: Scalars['ID']
    /** The Id of the FileAssetObject. */
    assetId: Scalars['String']
    /** The display name of the file asset. */
    displayName: (Scalars['String'] | null)
    /** The animations this audio can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'AudioAssetObjectReference'
}

export interface _FileOptimizationJob {
    /** Job ID for optimization process */
    id: Scalars['String']
    /** Status of the optimization process */
    status: FileOptimizationStatus
    __typename: '_FileOptimizationJob'
}

export type FileOptimizationStatus = 'FAILED' | 'PENDING' | 'PROCESSED'

export interface ImageAssetObjectReference {
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id: Scalars['ID']
    /** The Id of the FileAssetObject. */
    assetId: Scalars['String']
    /** The display name of the file asset. */
    displayName: (Scalars['String'] | null)
    /** The animations this image can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'ImageAssetObjectReference'
}

export interface LottieJsonMarker {
    id: Scalars['ID']
    name: (Scalars['String'] | null)
    comment: Scalars['JSON']
    time: Scalars['Float']
    duration: (Scalars['Float'] | null)
    __typename: 'LottieJsonMarker'
}

export interface StateMachineAssetObjectReference {
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id: Scalars['ID']
    /** The Id of the FileAssetObject. */
    assetId: Scalars['String']
    /** The display name of the file asset. */
    displayName: (Scalars['String'] | null)
    /** The animations this state machine can be applied to. */
    animations: FileAssetObjectReference[]
    /** The name of the state machine. */
    name: Scalars['String']
    /** The initial or default state of the state machine */
    initial: Scalars['String']
    /** The available states of the state machine */
    states: Scalars['JSON'][]
    /** The available triggers of the state machine */
    triggers: Scalars['JSON'][]
    /** The available listeners of the state machine */
    listeners: Scalars['JSON'][]
    __typename: 'StateMachineAssetObjectReference'
}

export interface ThemeAssetObjectReference {
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id: Scalars['ID']
    /** The Id of the FileAssetObject. */
    assetId: Scalars['String']
    /** The display name of the file asset. */
    displayName: (Scalars['String'] | null)
    /** The animations this theme can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'ThemeAssetObjectReference'
}


/** Zip Entry */
export interface ZipEntryObject {
    /** The file this zip entry is for */
    fileKey: Scalars['String']
    /** The file version this zip entry is for */
    fileVersionId: Scalars['String']
    /** The file variation this zip entry is for */
    fileVariationId: (Scalars['String'] | null)
    /** The filename of the zip entry within the zip file. */
    filename: (Scalars['String'] | null)
    /** The current status of the zip entry. */
    status: Scalars['String']
    __typename: 'ZipEntryObject'
}


/** Zip File */
export interface ZipFileObject {
    /** Unique file key for a file */
    key: Scalars['String']
    /** The zip file entry type */
    type: Scalars['String']
    /** Uniquely generated filename */
    filename: Scalars['String']
    /** The url to uploaded  file */
    url: Scalars['String']
    /** Attributes generated */
    attributes: (Attributes | null)
    /** Status of uploaded file */
    status: Scalars['String']
    /** The zip entries for the zip file */
    entries: ZipEntryObject[]
    __typename: 'ZipFileObject'
}

export interface FileAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    __typename: 'FileAssetObject'
}

export interface AnimationAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    /** The metadata of the animation. */
    metadata: Metadata
    /** The name of the animation. */
    name: Scalars['String']
    /** The display name of the animation. */
    displayName: (Scalars['String'] | null)
    __typename: 'AnimationAssetObject'
}

export interface AudioAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    /** The name of the FileAssetObject. */
    name: Scalars['String']
    /** The animations that the audio can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'AudioAssetObject'
}

export interface FileAssetEvent {
    /** The subscription key. */
    key: Scalars['String']
    /** The type of the event. */
    type: Scalars['String']
    /** The ID of the Blob if one was saved. */
    blobId: (Scalars['String'] | null)
    /** The ID of the FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the asset within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: (Scalars['String'] | null)
    /** The message of the event. */
    message: Scalars['String']
    __typename: 'FileAssetEvent'
}

export interface _FileAssetUploadRequest {
    /** Form fields used for a presigned s3 post */
    fields: Scalars['JSON']
    /** The key that should be used to subscribe to updates. */
    key: Scalars['String']
    /** Url used for a presigned s3 post */
    url: Scalars['String']
    /** The ID of the FileSpace the asset will be uploaded to. */
    fileSpaceId: Scalars['String']
    __typename: '_FileAssetUploadRequest'
}

export interface ImageAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    /** The name of the FileAssetObject. */
    name: Scalars['String']
    /** The animations that the image can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'ImageAssetObject'
}

export interface StateMachineAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    /** The name of the FileAssetObject. */
    name: Scalars['String']
    /** The animations that the state machine can be applied to. */
    animations: FileAssetObjectReference[]
    /** The display name of the state machine. */
    displayName: (Scalars['String'] | null)
    __typename: 'StateMachineAssetObject'
}

export interface ThemeAssetObject {
    /** The ID of the FileAssetObject. */
    id: Scalars['ID']
    /** The ID of the Blob this FileAssetObject points to. */
    blobId: Scalars['String']
    /** The content type of the FileAssetObject. */
    contentType: Scalars['String']
    /** The content length of the FileAssetObject. */
    contentLength: Scalars['String']
    /** The ID of the owning FileSpace. */
    fileSpaceId: Scalars['String']
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname: Scalars['String']
    /** The signed url of the FileAssetObject. */
    url: Scalars['String']
    /** The name of the FileAssetObject. */
    name: Scalars['String']
    /** The display name of the theme. */
    displayName: (Scalars['String'] | null)
    /** The animations that the theme can be applied to. */
    animations: FileAssetObjectReference[]
    __typename: 'ThemeAssetObject'
}

export interface _PublicAnimationImportRequest {
    key: Scalars['String']
    __typename: '_PublicAnimationImportRequest'
}

export interface Service {
    name: Scalars['String']
    version: Scalars['String']
    /** @deprecated No schema version from schema registry */
    versionInGateway: (Scalars['String'] | null)
    __typename: 'Service'
}


/** A raster to lottie conversion job. */
export interface RasterToLottieJob {
    /** Debug information for the job. */
    debug: (Scalars['String'] | null)
    /** If the job failed, this will contain an error message. */
    failedReason: (Scalars['String'] | null)
    /** The ID of the job. */
    id: Scalars['ID']
    /** The size of the input file in bytes. */
    inputFileSize: (Scalars['Int'] | null)
    /** The size of the Lottie file in bytes. */
    lottieFileSize: (Scalars['Int'] | null)
    /** The last progress notification of the job. */
    progress: (Scalars['String'] | null)
    /** The start time of the job. */
    startTime: (Scalars['Float'] | null)
    /** The status of the job. */
    status: RasterToLottieJobStatus
    /** The time taken to complete the job. */
    timeTaken: (Scalars['Float'] | null)
    /** The URL of the Lottie file. */
    url: (Scalars['String'] | null)
    __typename: 'RasterToLottieJob'
}

export type RasterToLottieJobStatus = 'active' | 'completed' | 'delayed' | 'failed' | 'prioritized' | 'unknown' | 'waiting'

export interface RasterToLottieUploadUrl {
    /** Additional fields for the raster upload POST request. */
    fields: Scalars['JSON']
    /** The ID of the image. */
    imageId: Scalars['ID']
    /** The upload URL to make a POST request with the raster file. */
    url: Scalars['String']
    __typename: 'RasterToLottieUploadUrl'
}

export interface WorkspaceMemberConnection {
    /** A list edges. */
    edges: WorkspaceMemberEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'WorkspaceMemberConnection'
}

export interface WorkspaceMemberEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: WorkspaceMember
    __typename: 'WorkspaceMemberEdge'
}

export interface WorkspaceMember {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    acceptedAt: (Scalars['DateTime'] | null)
    access: Scalars['String']
    id: Scalars['ID']
    invitedBy: Scalars['ID']
    lastSentAt: (Scalars['DateTime'] | null)
    method: Scalars['String']
    onboardedAt: (Scalars['DateTime'] | null)
    recipientEmail: Scalars['String']
    status: Scalars['String']
    userId: (Scalars['String'] | null)
    workspaceId: Scalars['ID']
    /** Recipient user of the invitation */
    user: (UserObject | null)
    /** The workspace this invitation belongs to. */
    workspace: Workspace
    __typename: 'WorkspaceMember'
}

export interface UserObject {
    avatarUrl: (Scalars['String'] | null)
    email: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'UserObject'
}

export interface Workspace {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    billingAddressLineOne: (Scalars['String'] | null)
    billingAddressLineTwo: (Scalars['String'] | null)
    billingEmail: (Scalars['String'] | null)
    icon: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    status: Scalars['String']
    url: (Scalars['String'] | null)
    account: Account
    /** Indicates if the user can join the workspace instantly without approval */
    canJoinInstantly: Scalars['Boolean']
    contactSalesNotice: ContactSalesNotice
    domains: Scalars['String'][]
    features: FeatureObject[]
    /** The owner this workspace belongs to. */
    hasOwnership: (Scalars['Boolean'] | null)
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin: Scalars['Boolean']
    indexed: Scalars['Boolean']
    invitationLink: (WorkspaceInvitationLink | null)
    /** Check if user is member of the workspace */
    isMember: (Scalars['Boolean'] | null)
    /** Indicates if the workspace is organization workspace (workspace with owner of organization email domain) */
    isOrganizationWorkspace: Scalars['Boolean']
    memberIds: (Scalars['String'][] | null)
    /** The owner this workspace belongs to. */
    owner: (UserObject | null)
    /** Permission scopes the current user has on this workspace */
    permissionScopes: Scalars['String'][]
    /** Check if the current user is already on boarded or not. If the user is on boarded return null, otherwise return user access level */
    requiresOnboardingAs: (Scalars['String'] | null)
    /** Fetch the active subscription for this workspace */
    subscription: (WorkspaceSubscription | null)
    members: ((User | null)[] | null)
    __typename: 'Workspace'
}

export interface Account {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    paymentMethod: (PaymentMethod | null)
    addressLineOne: (Scalars['String'] | null)
    addressLineTwo: (Scalars['String'] | null)
    city: (Scalars['String'] | null)
    contactEmail: (Scalars['String'] | null)
    contactName: (Scalars['String'] | null)
    country: (Scalars['String'] | null)
    email: Scalars['String']
    id: Scalars['ID']
    name: Scalars['String']
    paymentMethodId: Scalars['String']
    paymentProvider: PaymentProvider
    paymentProviderCustomerId: (Scalars['String'] | null)
    postcode: (Scalars['String'] | null)
    state: (Scalars['String'] | null)
    taxCountry: (Scalars['String'] | null)
    taxId: (Scalars['String'] | null)
    website: (Scalars['String'] | null)
    /** Whether the account pays for a subscription to any workspace */
    isPaid: Scalars['Boolean']
    __typename: 'Account'
}

export interface PaymentMethod {
    customerId: Scalars['String']
    expiresAt: (Scalars['DateTime'] | null)
    id: Scalars['ID']
    metadata: (PaymentMethodMetadata | null)
    provider: PaymentProvider
    providerPaymentMethodId: Scalars['String']
    sourceType: Scalars['String']
    __typename: 'PaymentMethod'
}

export type PaymentMethodMetadata = (CardMetadata | PayPalMetadata) & { __isUnion?: true }

export interface CardMetadata {
    brand: Scalars['String']
    expMonth: Scalars['Float']
    expYear: Scalars['Float']
    last4: Scalars['String']
    __typename: 'CardMetadata'
}

export interface PayPalMetadata {
    email: Scalars['String']
    payerId: Scalars['String']
    __typename: 'PayPalMetadata'
}


/** Payment service provider */
export type PaymentProvider = 'Braintree' | 'Stripe'

export interface ContactSalesNotice {
    calendarLink: (Scalars['String'] | null)
    enabled: Scalars['Boolean']
    __typename: 'ContactSalesNotice'
}

export interface FeatureObject {
    currentCount: (Scalars['Int'] | null)
    isEnabled: (Scalars['Boolean'] | null)
    max: (Scalars['Int'] | null)
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'FeatureObject'
}

export interface WorkspaceInvitationLink {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    canMembersInvite: Scalars['Boolean']
    id: Scalars['ID']
    invitationCode: Scalars['String']
    isActive: Scalars['Boolean']
    lastUpdatedById: Scalars['String']
    workspaceId: Scalars['String']
    /** Workspace associated with the invitation link */
    workspace: Workspace
    __typename: 'WorkspaceInvitationLink'
}

export interface WorkspaceSubscription {
    id: Scalars['ID']
    parentId: (Scalars['String'] | null)
    providerCustomerId: Scalars['String']
    providerPriceId: Scalars['String']
    providerId: Scalars['String']
    providerType: Scalars['String']
    workspaceId: Scalars['ID']
    workspace: WorkspaceObject
    organizationId: Scalars['ID']
    organization: OrganizationObject
    ratePlanId: Scalars['ID']
    ratePlan: RatePlanObject
    planId: Scalars['String']
    plan: PlanObject
    markedForCancellation: Scalars['Boolean']
    startsAt: Scalars['DateTime']
    endsAt: Scalars['DateTime']
    gracePeriod: (Scalars['DateTime'] | null)
    status: Scalars['String']
    revisionNumber: Scalars['Float']
    numberOfSeats: Scalars['Float']
    lastRevisedAt: (Scalars['DateTime'] | null)
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    viewerProviderPriceId: (Scalars['String'] | null)
    viewerDownloaderProviderPriceId: (Scalars['String'] | null)
    viewerNumberOfSeats: (Scalars['Float'] | null)
    viewerDownloaderNumberOfSeats: (Scalars['Float'] | null)
    /** Shows the amount of seats already used by the workspace. */
    nextBilling: (NextBillingObject | null)
    /** Shows the amount of seats already used by the workspace. */
    numberOfSeatsUsed: (Scalars['Float'] | null)
    __typename: 'WorkspaceSubscription'
}

export interface WorkspaceObject {
    icon: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    url: (Scalars['String'] | null)
    __typename: 'WorkspaceObject'
}

export interface OrganizationObject {
    email: Scalars['String']
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'OrganizationObject'
}

export interface RatePlanObject {
    billingCycle: Scalars['String']
    currency: Scalars['String']
    endsAt: Scalars['DateTime']
    id: Scalars['ID']
    name: Scalars['String']
    price: Scalars['Float']
    startsAt: Scalars['DateTime']
    type: Scalars['String']
    __typename: 'RatePlanObject'
}

export interface PlanObject {
    defaultEntitlements: (PlanEntitlement[] | null)
    id: Scalars['ID']
    isBillable: Scalars['Boolean']
    name: Scalars['String']
    planPosition: Scalars['Float']
    status: Scalars['String']
    stripeProductId: Scalars['String']
    __typename: 'PlanObject'
}

export interface PlanEntitlement {
    id: Scalars['ID']
    max: (Scalars['Float'] | null)
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'PlanEntitlement'
}

export interface NextBillingObject {
    amount: Scalars['Float']
    currency: Scalars['String']
    date: Scalars['String']
    __typename: 'NextBillingObject'
}

export interface WorkspaceMemberSearchConnection {
    /** A list edges. */
    edges: WorkspaceMemberSearchEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'WorkspaceMemberSearchConnection'
}

export interface WorkspaceMemberSearchEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: WorkspaceMember
    __typename: 'WorkspaceMemberSearchEdge'
}

export interface AuditLogConnection {
    /** A list edges. */
    edges: AuditLogItemEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'AuditLogConnection'
}

export interface AuditLogItemEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: AuditLogItem
    __typename: 'AuditLogItemEdge'
}

export interface AuditLogItem {
    action: Scalars['String']
    changes: Scalars['JSON']
    eventTime: Scalars['DateTime']
    id: Scalars['ID']
    ipAddress: Scalars['String']
    target: AuditLogTarget
    userEmail: Scalars['String']
    userId: Scalars['ID']
    userName: Scalars['String']
    __typename: 'AuditLogItem'
}

export interface AuditLogTarget {
    id: Scalars['ID']
    name: Scalars['String']
    type: Scalars['String']
    __typename: 'AuditLogTarget'
}

export interface BillingPackagePrice {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    baseSeats: Scalars['Float']
    billingCycle: Scalars['String']
    currency: Scalars['String']
    endsAt: Scalars['DateTime']
    id: Scalars['ID']
    isActive: Scalars['Boolean']
    isDefault: Scalars['Boolean']
    isLocalOnly: Scalars['Boolean']
    minSeatCount: Scalars['Float']
    name: Scalars['String']
    planId: Scalars['String']
    price: Scalars['Float']
    startsAt: Scalars['DateTime']
    stripePriceId: Scalars['String']
    type: Scalars['String']
    viewerBaseSeats: Scalars['Float']
    viewerDownloaderBaseSeats: Scalars['Float']
    billingPackage: BillingPackage
    contributorPrice: (AddonPrice | null)
    viewerDownloaderPrice: (AddonPrice | null)
    viewerPrice: (AddonPrice | null)
    __typename: 'BillingPackagePrice'
}

export interface BillingPackage {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    defaultEntitlements: (PlanEntitlement[] | null)
    id: Scalars['ID']
    isBillable: Scalars['Boolean']
    name: Scalars['String']
    planPosition: Scalars['Float']
    status: Scalars['String']
    stripeProductId: Scalars['String']
    /** Get the default active pricing for a billing package. */
    billingPackagePrice: (BillingPackagePrice | null)
    __typename: 'BillingPackage'
}

export interface AddonPrice {
    billingCycle: Scalars['String']
    currency: Scalars['String']
    id: Scalars['String']
    price: Scalars['Float']
    __typename: 'AddonPrice'
}

export interface BillingPackageConnection {
    /** A list edges. */
    edges: BillingPackageEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'BillingPackageConnection'
}

export interface BillingPackageEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: BillingPackage
    __typename: 'BillingPackageEdge'
}

export interface CancelReason {
    createdAt: Scalars['DateTime']
    disabled: Scalars['Boolean']
    id: Scalars['ID']
    order: Scalars['Float']
    requireReasonText: Scalars['Boolean']
    slug: Scalars['String']
    updatedAt: Scalars['DateTime']
    value: Scalars['String']
    __typename: 'CancelReason'
}

export interface CommentUser {
    avatarUrl: (Scalars['String'] | null)
    email: Scalars['String']
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'CommentUser'
}

export interface CommentConnection {
    /** A list edges. */
    edges: CommentEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'CommentConnection'
}

export interface CommentEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Comment
    __typename: 'CommentEdge'
}


/** A comment on an entity */
export interface Comment {
    attachments: (CommentAttachment[] | null)
    body: Scalars['String']
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    extra: (CommentExtra | null)
    guestName: (Scalars['String'] | null)
    id: Scalars['ID']
    mentions: (CommentUserMention[] | null)
    nodeId: Scalars['Int']
    parentId: (Scalars['String'] | null)
    path: Scalars['String']
    reactions: (CommentReaction[] | null)
    readReceipts: (CommentReadReceipt[] | null)
    replyCount: Scalars['Float']
    resolvedAt: (Scalars['DateTime'] | null)
    resolvedById: (Scalars['String'] | null)
    status: Scalars['String']
    updatedAt: Scalars['DateTime']
    userId: (Scalars['String'] | null)
    /** The parent comment */
    parent: (Comment | null)
    /** The user who resolved the comment */
    resolvedBy: (CommentUser | null)
    /** The user who authored the comment */
    user: (CommentUser | null)
    __typename: 'Comment'
}

export interface CommentAttachment {
    filename: Scalars['String']
    key: Scalars['String']
    mimeType: Scalars['String']
    __typename: 'CommentAttachment'
}


/** Extra properties in a comment */
export interface CommentExtra {
    annotation: (CommentAnnotation | null)
    frame: Scalars['Int']
    type: CommentExtraType
    __typename: 'CommentExtra'
}


/** The annotation for a comment */
export interface CommentAnnotation {
    ratio: (Scalars['Float'][] | null)
    type: CommentAnnotationType
    x: Scalars['Float']
    y: Scalars['Float']
    __typename: 'CommentAnnotation'
}


/** The annotation type */
export type CommentAnnotationType = 'Point'


/** Comment extra type */
export type CommentExtraType = 'Annotation' | 'Keyframe'


/** A mentioned user */
export interface CommentUserMention {
    /** The mention type: Always UserMention */
    type: CommentMentionType
    /** The user id */
    userId: Scalars['String']
    /** The user that was mentioned */
    user: (CommentUser | null)
    __typename: 'CommentUserMention'
}


/** The type of mention */
export type CommentMentionType = 'UserMention'

export interface CommentReaction {
    createdAt: Scalars['DateTime']
    type: Scalars['String']
    userId: Scalars['String']
    /** User who made the reaction */
    user: (CommentUser | null)
    __typename: 'CommentReaction'
}

export interface CommentReadReceipt {
    createdAt: Scalars['DateTime']
    userId: Scalars['String']
    __typename: 'CommentReadReceipt'
}

export type CommentableEntityType = 'FileVersion'

export interface KeyCount {
    count: Scalars['Int']
    key: Scalars['String']
    __typename: 'KeyCount'
}

export interface CommunityAnimationImportCounter {
    count: Scalars['Int']
    __typename: 'CommunityAnimationImportCounter'
}

export interface EnterpriseOrganization {
    directoryGroupMappings: (EnterpriseOrganizationDirectoryMappings[] | null)
    directorySyncStatus: Scalars['String']
    domains: EnterpriseOrganizationDomain[]
    id: Scalars['String']
    internalId: Scalars['String']
    isSsoEnforced: Scalars['Boolean']
    name: Scalars['String']
    ssoStatus: Scalars['String']
    __typename: 'EnterpriseOrganization'
}

export interface EnterpriseOrganizationDirectoryMappings {
    id: Scalars['String']
    internalName: Scalars['String']
    name: Scalars['String']
    __typename: 'EnterpriseOrganizationDirectoryMappings'
}

export interface EnterpriseOrganizationDomain {
    domain: Scalars['String']
    id: Scalars['String']
    __typename: 'EnterpriseOrganizationDomain'
}


/** Directory groups claimed by other workspaces of the same organization. */
export interface OrganizationDirectoryClaim {
    name: Scalars['String']
    userCount: Scalars['Float']
    workspaceName: Scalars['String']
    __typename: 'OrganizationDirectoryClaim'
}

export interface OrganizationDirectoryGroup {
    id: Scalars['String']
    internalName: (Scalars['String'] | null)
    name: Scalars['String']
    users: EnterpriseOrganizationGroupUser[]
    __typename: 'OrganizationDirectoryGroup'
}

export interface EnterpriseOrganizationGroupUser {
    email: Scalars['String']
    name: Scalars['String']
    __typename: 'EnterpriseOrganizationGroupUser'
}

export interface FileHandback {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    assetUrl: Scalars['String']
    backgroundColor: (Scalars['String'] | null)
    completedAt: (Scalars['DateTime'] | null)
    fileId: Scalars['String']
    fileVersionId: Scalars['String']
    id: Scalars['ID']
    metadata: Scalars['JSON']
    newFileId: (Scalars['String'] | null)
    userId: Scalars['String']
    __typename: 'FileHandback'
}

export interface File {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    createdByUserId: Scalars['String']
    id: Scalars['ID']
    isHidden: Scalars['Boolean']
    modifiedByUserId: (Scalars['String'] | null)
    name: Scalars['String']
    projectId: Scalars['ID']
    backgroundColor: (Scalars['String'] | null)
    currentVersionId: (Scalars['ID'] | null)
    description: (Scalars['String'] | null)
    descriptionModifiedByUserId: (Scalars['String'] | null)
    descriptionUpdatedAt: (Scalars['DateTime'] | null)
    folderId: (Scalars['String'] | null)
    showDescOnCollection: (Scalars['Boolean'] | null)
    sourceFileKey: (Scalars['String'] | null)
    sourceFileType: (Scalars['String'] | null)
    status: (Scalars['String'] | null)
    type: (FileType | null)
    /** Get the permission scopes for animation for the current user */
    animationPermissionScopes: Scalars['String'][]
    /** Get the access of the current logged in user */
    currentUserAccess: (Scalars['String'] | null)
    currentVersion: FileVersion
    editHash: (Scalars['String'] | null)
    /** Key of featured file */
    featuredFileKey: (Scalars['String'] | null)
    features: FeatureObject[]
    folder: (Folder | null)
    project: Project
    /** Get the public asset of the file. */
    publicAsset: (PublicAsset | null)
    upgradeRequired: (Scalars['Boolean'] | null)
    /** Users with permissions the file has access */
    userResourcePermissions: (UserResourcePermission | null)
    createdBy: (User | null)
    modifiedBy: (User | null)
    descriptionModifiedBy: (User | null)
    fileObject: (FileObject | null)
    __typename: 'File'
}


/** System classified file types */
export type FileType = 'Animation' | 'CreatorFile' | 'Folder'

export interface FileVersion {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    backgroundColor: (Scalars['String'] | null)
    communityAnimationId: (Scalars['String'] | null)
    createdByUserId: Scalars['String']
    fileId: Scalars['ID']
    fileKey: Scalars['String']
    fileSystemSubVersionId: (Scalars['String'] | null)
    fileVersionId: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    playSegment: PlaySegment[]
    sourceFileId: (Scalars['ID'] | null)
    subVersionNumber: (Scalars['Float'] | null)
    subVersions: FileVersion[]
    tags: (Scalars['String'][] | null)
    uploadOrigin: (Scalars['String'] | null)
    uploadOriginVersion: (Scalars['String'] | null)
    versionLabel: Scalars['Float']
    versionNumber: Scalars['Float']
    createdBy: (User | null)
    modifiedBy: (User | null)
    fileObject: (FileObject | null)
    __typename: 'FileVersion'
}

export interface PlaySegment {
    endFrame: (Scalars['Float'] | null)
    id: Scalars['String']
    name: (Scalars['String'] | null)
    startFrame: Scalars['Float']
    __typename: 'PlaySegment'
}

export interface Folder {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    createdByUserId: Scalars['String']
    id: Scalars['ID']
    isHidden: Scalars['Boolean']
    modifiedByUserId: (Scalars['String'] | null)
    name: Scalars['String']
    projectId: Scalars['ID']
    /** Get the permission scopes for animation for the current user */
    animationPermissionScopes: Scalars['String'][]
    /** Get the access of the current logged in user */
    currentUserAccess: (Scalars['String'] | null)
    deletedFilesCount: (Scalars['Float'] | null)
    /** Keys of featured files list */
    featuredFileKeys: (Scalars['String'][] | null)
    features: FeatureObject[]
    filesCount: (Scalars['Float'] | null)
    project: Project
    stats: FolderStats
    createdBy: (User | null)
    modifiedBy: (User | null)
    thumbnails: ((FileObject | null)[] | null)
    __typename: 'Folder'
}

export interface Project {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    id: Scalars['ID']
    isPrivate: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    slug: Scalars['String']
    title: Scalars['String']
    workspaceId: Scalars['String']
    /**
     * @deprecated Use `featuredFileKeys` instead
     * The animation thumbnail Urls of the last 3 files in the project
     */
    animationThumbnailUrls: (Scalars['String'][] | null)
    /** The file keys for last 3 files in the project */
    featuredFileKeys: Scalars['String'][]
    features: FeatureObject[]
    filesCount: Scalars['Float']
    isCreatorDraft: Scalars['Boolean']
    /** Get the permission scopes for project for the current user */
    projectPermissionScopes: Scalars['String'][]
    /** Stats for the project content */
    stats: ProjectStats
    /** Workspace the project belongs to */
    workspace: Workspace
    /** Total number of workspace members */
    workspaceTeamMembersCount: Scalars['Float']
    __typename: 'Project'
}

export interface ProjectStats {
    animations: Scalars['Float']
    creatorFiles: Scalars['Float']
    folders: Scalars['Float']
    __typename: 'ProjectStats'
}

export interface FolderStats {
    animations: Scalars['Float']
    creatorFiles: Scalars['Float']
    __typename: 'FolderStats'
}

export interface PublicAsset {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    backgroundColor: (Scalars['String'] | null)
    expireAt: (Scalars['DateTime'] | null)
    fileKey: Scalars['String']
    fileName: Scalars['String']
    fileSize: Scalars['Float']
    fileVersionId: Scalars['String']
    id: Scalars['ID']
    isActive: Scalars['Boolean']
    isOptimized: Scalars['Boolean']
    metadataVersionId: (Scalars['String'] | null)
    type: Scalars['String']
    workflowFileId: Scalars['String']
    workflowFileVersionId: Scalars['String']
    /** Get the embed url for the public asset */
    embedUrl: Scalars['String']
    /** Get the public asset url */
    url: Scalars['String']
    __typename: 'PublicAsset'
}

export interface UserResourcePermission {
    id: Scalars['ID']
    userId: Scalars['String']
    resourceType: Scalars['String']
    resourceId: Scalars['ID']
    access: Scalars['String']
    __typename: 'UserResourcePermission'
}

export interface NextPrevAnimation {
    nextAnimation: (Scalars['String'] | null)
    prevAnimation: (Scalars['String'] | null)
    __typename: 'NextPrevAnimation'
}

export interface FileVariant {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    contentType: Scalars['String']
    fileKey: Scalars['String']
    fileSize: Scalars['Float']
    fileVariationId: (Scalars['String'] | null)
    id: Scalars['ID']
    isOptimized: Scalars['Boolean']
    jobId: (Scalars['String'] | null)
    metadata: (FileVariantMetadata | null)
    status: (Scalars['String'] | null)
    workflowFileId: Scalars['String']
    workflowFileVersionId: Scalars['String']
    url: (Scalars['String'] | null)
    fileObject: (FileObject | null)
    fileVariation: (FileVariation | null)
    __typename: 'FileVariant'
}

export interface FileVariantMetadata {
    backgroundColor: (Scalars['String'] | null)
    fps: (Scalars['Int'] | null)
    height: Scalars['Int']
    /** @deprecated `backgroundColor` is set to 'transparent' if this variation has transparency */
    transparency: (Scalars['Boolean'] | null)
    width: Scalars['Int']
    __typename: 'FileVariantMetadata'
}

export interface FileVersionOptimizeJob {
    id: Scalars['ID']
    status: Scalars['String']
    __typename: 'FileVersionOptimizeJob'
}

export interface FileVersionConnection {
    /** A list edges. */
    edges: FileVersionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'FileVersionConnection'
}

export interface FileVersionEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: FileVersion
    __typename: 'FileVersionEdge'
}

export interface FileConnection {
    /** A list edges. */
    edges: FileEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'FileConnection'
}

export interface FileEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: File
    __typename: 'FileEdge'
}

export interface Invoice {
    id: Scalars['ID']
    providerId: (Scalars['String'] | null)
    providerType: Scalars['String']
    providerCustomerId: Scalars['String']
    providerSubscriptionId: Scalars['String']
    items: InvoiceItem[]
    number: (Scalars['String'] | null)
    status: Scalars['String']
    companyName: (Scalars['String'] | null)
    taxId: (Scalars['String'] | null)
    taxCountry: (Scalars['String'] | null)
    addressLineOne: (Scalars['String'] | null)
    addressLineTwo: (Scalars['String'] | null)
    country: (Scalars['String'] | null)
    state: (Scalars['String'] | null)
    city: (Scalars['String'] | null)
    additionalFields: InvoiceFieldObject[]
    postcode: (Scalars['String'] | null)
    billingEmail: (Scalars['String'] | null)
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    workspaceId: (Scalars['String'] | null)
    /** Retrieves the account for the invoice. */
    account: Account
    /** Retrieves the total amount for the invoice. */
    amount: Scalars['Float']
    /** Retrieves the currency for the invoice. */
    currency: Scalars['String']
    /** Retrieves the subscription for the invoice. */
    subscription: WorkspaceSubscription
    __typename: 'Invoice'
}

export interface InvoiceItem {
    amount: Scalars['String']
    currency: Scalars['String']
    date: Scalars['DateTime']
    description: Scalars['String']
    id: Scalars['String']
    periodEnd: Scalars['DateTime']
    periodStart: Scalars['DateTime']
    proration: Scalars['Boolean']
    quantity: Scalars['Float']
    subscription: Scalars['String']
    __typename: 'InvoiceItem'
}

export interface InvoiceFieldObject {
    id: Scalars['String']
    name: Scalars['String']
    value: Scalars['String']
    __typename: 'InvoiceFieldObject'
}

export interface LottieMockupConnection {
    /** A list edges. */
    edges: LottieMockupEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'LottieMockupConnection'
}

export interface LottieMockupEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: LottieMockup
    __typename: 'LottieMockupEdge'
}

export interface LottieMockup {
    animation: LottieMockupAnimation
    animationId: Scalars['ID']
    assets: LottieMockupAsset[]
    canvas: LottieMockupCanvas
    description: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    playSegmentId: Scalars['String']
    version: Scalars['String']
    __typename: 'LottieMockup'
}

export interface LottieMockupAnimation {
    config: LottieMockupAnimationConfig
    frame: Frame
    rotation: Scalars['Float']
    __typename: 'LottieMockupAnimation'
}

export interface LottieMockupAnimationConfig {
    file: Scalars['String']
    fileId: (Scalars['String'] | null)
    fileKey: (Scalars['String'] | null)
    loop: Scalars['Boolean']
    speed: Scalars['Float']
    __typename: 'LottieMockupAnimationConfig'
}

export interface Frame {
    height: Scalars['Float']
    width: Scalars['Float']
    x: Scalars['Float']
    y: Scalars['Float']
    __typename: 'Frame'
}

export type LottieMockupAsset = (LottieMockupAssetImage | LottieMockupAssetText) & { __isUnion?: true }

export interface LottieMockupAssetImage {
    frame: Frame
    identifier: Scalars['String']
    rotation: Scalars['Float']
    type: LottieMockupAssetType
    config: LottieMockupAssetFile
    __typename: 'LottieMockupAssetImage'
}

export type LottieMockupAssetType = 'animation' | 'image' | 'text'

export interface LottieMockupAssetFile {
    file: Scalars['String']
    fileId: (Scalars['String'] | null)
    fileKey: (Scalars['String'] | null)
    __typename: 'LottieMockupAssetFile'
}

export interface LottieMockupAssetText {
    frame: Frame
    identifier: Scalars['String']
    rotation: Scalars['Float']
    type: LottieMockupAssetType
    config: LottieMockupAssetTextConfig
    __typename: 'LottieMockupAssetText'
}

export interface LottieMockupAssetTextConfig {
    alignment: Scalars['String']
    color: Scalars['String']
    font: Scalars['String']
    size: Scalars['String']
    text: Scalars['String']
    __typename: 'LottieMockupAssetTextConfig'
}

export interface LottieMockupCanvas {
    background: Scalars['String']
    height: Scalars['Float']
    templateSize: TemplateSize
    width: Scalars['Float']
    __typename: 'LottieMockupCanvas'
}

export type TemplateSize = 'desktop' | 'mobile' | 'tablet'

export interface OfficialWorkspace {
    icon: (Scalars['String'] | null)
    id: Scalars['ID']
    memberCount: Scalars['Float']
    members: OfficialWorkspaceMember[]
    name: Scalars['String']
    planName: Scalars['String']
    planPosition: Scalars['Float']
    /** Indicates if the user can join the workspace instantly without approval */
    canJoinInstantly: Scalars['Boolean']
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin: Scalars['Boolean']
    /** Check if user is member of the workspace */
    isMember: (Scalars['Boolean'] | null)
    __typename: 'OfficialWorkspace'
}

export interface OfficialWorkspaceMember {
    avatarUrl: (Scalars['String'] | null)
    email: (Scalars['String'] | null)
    firstName: Scalars['String']
    id: Scalars['ID']
    isAdmin: (Scalars['Boolean'] | null)
    isOwner: (Scalars['Boolean'] | null)
    lastName: Scalars['String']
    name: Scalars['String']
    __typename: 'OfficialWorkspaceMember'
}

export interface OnboardingChecklistObject {
    activeOnboardings: (Scalars['String'][] | null)
    completeSeen: (Scalars['Boolean'] | null)
    dismissSeen: (Scalars['Boolean'] | null)
    doneOnboardings: (Scalars['String'][] | null)
    id: Scalars['ID']
    newToOnboarding: (Scalars['Boolean'] | null)
    seen: (Scalars['Boolean'] | null)
    userId: Scalars['ID']
    __typename: 'OnboardingChecklistObject'
}

export interface OnboardingV2Object {
    activeOnboardings: (Scalars['String'][] | null)
    completeSeen: (Scalars['Boolean'] | null)
    dismissSeen: (Scalars['Boolean'] | null)
    doneOnboardings: (Scalars['String'][] | null)
    id: Scalars['ID']
    newToOnboarding: (Scalars['Boolean'] | null)
    seen: (Scalars['Boolean'] | null)
    userId: Scalars['ID']
    __typename: 'OnboardingV2Object'
}

export interface PaymentIntent {
    id: Scalars['ID']
    providerId: Scalars['String']
    status: Scalars['String']
    type: Scalars['String']
    providerType: Scalars['String']
    createdAt: Scalars['String']
    expiresAt: Scalars['String']
    successUrl: Scalars['String']
    workspaceId: Scalars['ID']
    addedSeats: WorkspaceMember[]
    workspace: WorkspaceObject
    __typename: 'PaymentIntent'
}

export interface PaymentIntentCollectionMethod {
    country: Scalars['String']
    paymentMethods: PaymentIntentCollectionPaymentMethod[]
    __typename: 'PaymentIntentCollectionMethod'
}

export interface PaymentIntentCollectionPaymentMethod {
    displayName: Scalars['String']
    logoUrl: (Scalars['String'] | null)
    type: Scalars['String']
    __typename: 'PaymentIntentCollectionPaymentMethod'
}

export interface PortfolioPost {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    content: (Scalars['JSON'] | null)
    coverImage: (Scalars['String'] | null)
    excerpt: (Scalars['String'] | null)
    id: Scalars['ID']
    portfolioId: Scalars['String']
    publishedAt: (Scalars['DateTime'] | null)
    slug: Scalars['String']
    tags: PortfolioTag[]
    title: Scalars['String']
    workspaceId: Scalars['String']
    contributors: UserObject[]
    creator: UserObject
    __typename: 'PortfolioPost'
}

export interface PortfolioTag {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'PortfolioTag'
}

export interface PortfolioPostConnection {
    /** A list edges. */
    edges: PortfolioPostEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'PortfolioPostConnection'
}

export interface PortfolioPostEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PortfolioPost
    __typename: 'PortfolioPostEdge'
}


/** Portfolio post status */
export type PortfolioPostStatus = 'Draft' | 'Published'

export interface WorkspacePortfolio {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    description: (Scalars['String'] | null)
    id: Scalars['ID']
    image: (Scalars['String'] | null)
    isPrivate: Scalars['Boolean']
    name: Scalars['String']
    url: Scalars['String']
    workspace: Workspace
    __typename: 'WorkspacePortfolio'
}

export interface PremiumAssetConnection {
    /** A list edges. */
    edges: PremiumAssetEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'PremiumAssetConnection'
}

export interface PremiumAssetEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PremiumAsset
    __typename: 'PremiumAssetEdge'
}

export interface PremiumAsset {
    contributor: (PremiumAssetContributor | null)
    formats: PremiumAssetFormats
    id: Scalars['Float']
    metadata: PremiumAssetMetadata
    name: Scalars['String']
    pack: (PremiumAssetPack | null)
    previewImageUrl: (Scalars['String'] | null)
    previewVideoUrl: Scalars['String']
    relatedAnimations: (PremiumAssetRelatedAnimation[] | null)
    slug: Scalars['String']
    tags: (PremiumAssetTag[] | null)
    thumbnailVideoUrl: Scalars['String']
    type: Scalars['String']
    uuid: Scalars['ID']
    __typename: 'PremiumAsset'
}

export interface PremiumAssetContributor {
    avatarUrl: (Scalars['String'] | null)
    company: (Scalars['String'] | null)
    id: Scalars['Float']
    name: Scalars['String']
    __typename: 'PremiumAssetContributor'
}

export interface PremiumAssetFormats {
    aep: (Scalars['Boolean'] | null)
    __typename: 'PremiumAssetFormats'
}

export interface PremiumAssetMetadata {
    duration: (Scalars['Float'] | null)
    fileSize: Scalars['Float']
    frameRate: (Scalars['Float'] | null)
    frames: (Scalars['Float'] | null)
    height: Scalars['Float']
    uuid: Scalars['ID']
    width: Scalars['Float']
    __typename: 'PremiumAssetMetadata'
}

export interface PremiumAssetPack {
    id: Scalars['Float']
    itemCount: Scalars['Float']
    name: Scalars['String']
    slug: Scalars['String']
    thumbnailVideoUrl: Scalars['String']
    __typename: 'PremiumAssetPack'
}

export interface PremiumAssetRelatedAnimation {
    id: Scalars['Float']
    name: Scalars['String']
    previewImageUrl: Scalars['String']
    slug: Scalars['String']
    thumbnailVideoUrl: Scalars['String']
    __typename: 'PremiumAssetRelatedAnimation'
}

export interface PremiumAssetTag {
    id: Scalars['Float']
    lang: Scalars['String']
    name: Scalars['String']
    orderId: Scalars['Float']
    slug: Scalars['String']
    __typename: 'PremiumAssetTag'
}

export interface PremiumAssetPackConnection {
    /** A list edges. */
    edges: PremiumAssetPackEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'PremiumAssetPackConnection'
}

export interface PremiumAssetPackEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PremiumAssetPack
    __typename: 'PremiumAssetPackEdge'
}

export interface PremiumAssetPackDetailConnection {
    /** A list edges. */
    edges: PremiumAssetEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    description: (Scalars['String'] | null)
    id: Scalars['Float']
    itemCount: Scalars['Float']
    name: Scalars['String']
    slug: Scalars['String']
    thumbnailVideoUrl: Scalars['String']
    __typename: 'PremiumAssetPackDetailConnection'
}

export interface PrivateShare {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    acceptedAt: (Scalars['DateTime'] | null)
    access: Scalars['String']
    id: Scalars['ID']
    invitationCode: Scalars['String']
    invitedBy: Scalars['ID']
    isCreator: Scalars['Boolean']
    lastSentAt: (Scalars['DateTime'] | null)
    recipientEmail: (Scalars['String'] | null)
    resourceId: Scalars['ID']
    resourceType: PrivateShareType
    userId: (Scalars['String'] | null)
    /** Checks if the user is not a workspace member */
    hasUnacceptedWorkspaceInvitation: (Scalars['Boolean'] | null)
    /** Checks if the user is not a workspace member */
    isGuest: (Scalars['Boolean'] | null)
    resource: (PrivateShareResource | null)
    /** Recipient user of the invitation */
    user: (UserObject | null)
    __typename: 'PrivateShare'
}

export type PrivateShareType = 'COLLECTION' | 'FILE' | 'PROJECT'

export type PrivateShareResource = (File | WorkspaceCollection | Project) & { __isUnion?: true }

export interface WorkspaceCollection {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    createdByUserId: Scalars['String']
    id: Scalars['ID']
    isPrivate: Scalars['Boolean']
    name: Scalars['String']
    slug: Scalars['String']
    workspaceId: Scalars['String']
    /** Get the permission scopes for collection for the current user / workspace */
    collectionPermissionScopes: Scalars['String'][]
    /** The thumbnail Urls of the last 3 animation inside a collection */
    collectionThumbnailUrls: (Scalars['String'][] | null)
    /** Featured file key for the workspace collection */
    featuredFileKey: (Scalars['String'] | null)
    files: Scalars['String'][]
    featuredFileObject: (FileObject | null)
    createdBy: (User | null)
    __typename: 'WorkspaceCollection'
}

export interface SuggestedMember {
    email: Scalars['String']
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'SuggestedMember'
}

export interface PrivateShareConnection {
    /** A list edges. */
    edges: PrivateShareEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'PrivateShareConnection'
}

export interface PrivateShareEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: PrivateShare
    __typename: 'PrivateShareEdge'
}

export interface ProjectFileConnection {
    /** A list edges. */
    edges: ProjectFileEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'ProjectFileConnection'
}

export interface ProjectFileEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: ProjectFile
    __typename: 'ProjectFileEdge'
}

export type ProjectFile = (File | Folder) & { __isUnion?: true }

export interface ProjectConnection {
    /** A list edges. */
    edges: ProjectEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'ProjectConnection'
}

export interface ProjectEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Project
    __typename: 'ProjectEdge'
}

export interface PublicShare {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    allowGuestView: Scalars['Boolean']
    expireAt: (Scalars['DateTime'] | null)
    id: Scalars['ID']
    resourceId: Scalars['ID']
    resourceType: PublicShareType
    shareCode: Scalars['String']
    /** Get the access type of the resource */
    accessLevels: (Scalars['String'][] | null)
    resource: PublicShareResource
    workspace: (WorkspacePublicInfo | null)
    __typename: 'PublicShare'
}

export type PublicShareType = 'COLLECTION' | 'FILE'

export type PublicShareResource = (File | WorkspaceCollection) & { __isUnion?: true }

export interface WorkspacePublicInfo {
    allowJoinRequest: Scalars['Boolean']
    icon: (Scalars['String'] | null)
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'WorkspacePublicInfo'
}

export interface RecentlyDeletedConnection {
    /** A list edges. */
    edges: RecentlyDeletedEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'RecentlyDeletedConnection'
}

export interface RecentlyDeletedEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: RecentlyDeleted
    __typename: 'RecentlyDeletedEdge'
}

export interface RecentlyDeleted {
    children: RecentlyDeleted[]
    createdAt: Scalars['DateTime']
    expireAt: (Scalars['DateTime'] | null)
    id: Scalars['ID']
    parent: (RecentlyDeleted | null)
    path: Scalars['String']
    resourceId: Scalars['ID']
    resourceType: RecentlyDeletedResourceType
    snapshot: Scalars['JSON']
    status: RecentlyDeletedStatus
    updatedAt: Scalars['DateTime']
    userId: Scalars['String']
    workspaceId: Scalars['String']
    /** Recently deleted resource */
    resource: (RecentlyDeletedResource | null)
    __typename: 'RecentlyDeleted'
}

export type RecentlyDeletedResourceType = 'Collection' | 'File' | 'Folder' | 'Project'

export type RecentlyDeletedStatus = 'Idle' | 'Purging' | 'Restoring'

export type RecentlyDeletedResource = (File | Folder | Project) & { __isUnion?: true }

export interface SearchWorkspaceResponse {
    collections: (WorkspaceCollectionConnection | null)
    files: (FileConnection | null)
    folders: (FolderConnection | null)
    projects: (ProjectConnection | null)
    __typename: 'SearchWorkspaceResponse'
}

export interface WorkspaceCollectionConnection {
    /** A list edges. */
    edges: WorkspaceCollectionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'WorkspaceCollectionConnection'
}

export interface WorkspaceCollectionEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: WorkspaceCollection
    __typename: 'WorkspaceCollectionEdge'
}

export interface FolderConnection {
    /** A list edges. */
    edges: FolderEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'FolderConnection'
}

export interface FolderEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Folder
    __typename: 'FolderEdge'
}

export interface SourceFile {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    fileId: Scalars['String']
    fileVersionId: Scalars['String']
    id: Scalars['ID']
    sourceFileKey: (Scalars['String'] | null)
    sourceFileName: Scalars['String']
    sourceFileSize: (Scalars['Float'] | null)
    sourceFileVersionId: (Scalars['String'] | null)
    sourceType: Scalars['String']
    sourceUrl: (Scalars['String'] | null)
    __typename: 'SourceFile'
}

export interface SuggestedInviteeConnection {
    /** A list edges. */
    edges: SuggestedInviteeEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'SuggestedInviteeConnection'
}

export interface SuggestedInviteeEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: SuggestedInvitee
    __typename: 'SuggestedInviteeEdge'
}

export interface SuggestedInvitee {
    /** Avatar url fetched from auth service. */
    avatarUrl: Scalars['String']
    id: Scalars['ID']
    userEmail: Scalars['String']
    userName: Scalars['String']
    viewCount: Scalars['Float']
    viewerEmail: Scalars['String']
    viewerName: Scalars['String']
    __typename: 'SuggestedInvitee'
}

export interface SuggestedWorkspace {
    icon: (Scalars['String'] | null)
    id: Scalars['ID']
    memberIds: (Scalars['ID'][] | null)
    name: Scalars['String']
    organization: (Organization | null)
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin: Scalars['Boolean']
    /** Check if user is member of the workspace */
    isMember: Scalars['Boolean']
    members: ((User | null)[] | null)
    __typename: 'SuggestedWorkspace'
}

export interface Organization {
    email: Scalars['String']
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'Organization'
}

export interface SuggestedWorkspaceConnection {
    /** A list edges. */
    edges: SuggestedWorkspaceEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'SuggestedWorkspaceConnection'
}

export interface SuggestedWorkspaceEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: SuggestedWorkspace
    __typename: 'SuggestedWorkspaceEdge'
}

export interface UserNotificationSubscriptionConnection {
    /** A list edges. */
    edges: UserNotificationSubscriptionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'UserNotificationSubscriptionConnection'
}

export interface UserNotificationSubscriptionEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: UserNotificationSubscription
    __typename: 'UserNotificationSubscriptionEdge'
}

export interface UserNotificationSubscription {
    createdAt: Scalars['DateTime']
    entityId: Scalars['String']
    entityType: Scalars['String']
    id: Scalars['ID']
    isSubscribed: Scalars['Boolean']
    updatedAt: Scalars['DateTime']
    userId: Scalars['String']
    user: UserObject
    __typename: 'UserNotificationSubscription'
}

export interface OnboardingObject {
    animColorPaletteBtnHotspot: (Scalars['Boolean'] | null)
    animCommentBtnHotspot: (Scalars['Boolean'] | null)
    animDescriptionSequence: (Scalars['Boolean'] | null)
    animPanelBtnHotspot: (Scalars['Boolean'] | null)
    animSegmentBtnHotspot: (Scalars['Boolean'] | null)
    animTitleHotspot: (Scalars['Boolean'] | null)
    animTopbarHotspot: (Scalars['Boolean'] | null)
    animVersionBtnHotspot: (Scalars['Boolean'] | null)
    dashboardAnimUploadHotspot: (Scalars['Boolean'] | null)
    dashboardCollectionHotspot: (Scalars['Boolean'] | null)
    dashboardCollectionViewSequence: (Scalars['Boolean'] | null)
    dashboardCreateAnimationHotspot: (Scalars['Boolean'] | null)
    dashboardOptimizedDotlottieBanner: (Scalars['Boolean'] | null)
    dashboardPageHotspot: (Scalars['Boolean'] | null)
    dashboardPremiumAssetHotspot: (Scalars['Boolean'] | null)
    dashboardPublicProfileHotspot: (Scalars['Boolean'] | null)
    dashboardSlackIntegrationBellIndicator: (Scalars['Boolean'] | null)
    dashboardSlackIntegrationPopup: (Scalars['Boolean'] | null)
    dashboardWelcomeLfModal: (Scalars['Boolean'] | null)
    dashboardWelcomeTeamModal: (Scalars['Boolean'] | null)
    dashboardWelcomeUpgradedModal: (Scalars['Boolean'] | null)
    dashboardWorkspaceCollectionHotspot: (Scalars['Boolean'] | null)
    dashboardWorkspaceHotspot: (Scalars['Boolean'] | null)
    folderCreateAnimationHotspot: (Scalars['Boolean'] | null)
    introAnimSequence: (Scalars['Boolean'] | null)
    introDashboardSequence: (Scalars['Boolean'] | null)
    multiPlayerOnboarding: (Scalars['Boolean'] | null)
    projectCreateAnimationHotspot: (Scalars['Boolean'] | null)
    slackOnboardingForComment: (Scalars['Boolean'] | null)
    __typename: 'OnboardingObject'
}

export interface WorkspaceColorPalette {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    colors: Scalars['String'][]
    createdByUserId: Scalars['String']
    id: Scalars['ID']
    workspaceId: Scalars['ID']
    __typename: 'WorkspaceColorPalette'
}

export interface WorkspaceColorPaletteConnection {
    /** A list edges. */
    edges: WorkspaceColorPaletteEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Float']
    __typename: 'WorkspaceColorPaletteConnection'
}

export interface WorkspaceColorPaletteEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: WorkspaceColorPalette
    __typename: 'WorkspaceColorPaletteEdge'
}

export interface WorkspaceOwnershipTransfer {
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    updatedAt: Scalars['DateTime']
    completedAt: (Scalars['DateTime'] | null)
    currentOwnerId: Scalars['String']
    expiresAt: Scalars['DateTime']
    failureDetails: (Scalars['String'] | null)
    failureReason: (Scalars['String'] | null)
    id: Scalars['ID']
    metadata: (Scalars['JSONObject'] | null)
    newAccount: Account
    newAccountId: Scalars['ID']
    newOwnerId: Scalars['String']
    newSubscription: (WorkspaceSubscription | null)
    newSubscriptionId: (Scalars['ID'] | null)
    oldAccount: Account
    oldAccountId: Scalars['ID']
    oldSubscription: (WorkspaceSubscription | null)
    oldSubscriptionId: (Scalars['ID'] | null)
    respondedAt: (Scalars['DateTime'] | null)
    status: Scalars['String']
    workspace: Workspace
    workspaceId: Scalars['ID']
    currentOwner: (WorkspaceMember | null)
    newOwner: (WorkspaceMember | null)
    __typename: 'WorkspaceOwnershipTransfer'
}

export interface BrandObject {
    iconFileKey: Scalars['String']
    iconPublicReadURL: Scalars['String']
    name: Scalars['String']
    __typename: 'BrandObject'
}

export interface WorkspaceCountsObject {
    filesCount: Scalars['Float']
    membersCount: Scalars['Float']
    projectsCount: Scalars['Float']
    __typename: 'WorkspaceCountsObject'
}

export interface WorkspaceSeatUtilization {
    id: Scalars['ID']
    numberOfContributorSeats: Scalars['Float']
    numberOfContributorSeatsBalance: Scalars['Float']
    numberOfContributorSeatsUsed: Scalars['Float']
    numberOfViewerDownloaderSeats: Scalars['Float']
    numberOfViewerDownloaderSeatsBalance: Scalars['Float']
    numberOfViewerDownloaderSeatsUsed: Scalars['Float']
    numberOfViewerSeats: Scalars['Float']
    numberOfViewerSeatsBalance: Scalars['Float']
    numberOfViewerSeatsUsed: Scalars['Float']
    __typename: 'WorkspaceSeatUtilization'
}

export interface WorkspaceMemberPrice {
    billingCycle: Scalars['String']
    contributorPrice: (AddonPrice | null)
    currency: Scalars['String']
    id: Scalars['ID']
    price: Scalars['Float']
    viewerDownloaderPrice: (AddonPrice | null)
    __typename: 'WorkspaceMemberPrice'
}

export interface WorkspaceSettings {
    allowAiFeatures: (Scalars['Boolean'] | null)
    allowExternalInvites: (Scalars['Boolean'] | null)
    allowExternalShares: Scalars['Boolean']
    allowJoinRequest: Scalars['Boolean']
    allowMemberInvites: Scalars['Boolean']
    allowPremiumAnimations: (Scalars['Boolean'] | null)
    allowPublishToCommunity: Scalars['Boolean']
    defaultRole: (Scalars['String'] | null)
    discoveryJoinType: WorkspaceDiscoveryJoinType
    isDiscoverable: Scalars['Boolean']
    isSsoEnforced: Scalars['Boolean']
    maxSessionDurationDays: Scalars['Float']
    workspaceId: Scalars['ID']
    __typename: 'WorkspaceSettings'
}


/** The type of access granted to users who wish to join the workspace via discovery */
export type WorkspaceDiscoveryJoinType = 'INSTANT' | 'UPON_APPROVAL'

export interface WorkspaceSubscriptionAvailableDiscount {
    billingCycle: Scalars['String']
    currency: Scalars['String']
    currentPrice: Scalars['Float']
    discountPercentage: Scalars['Float']
    discountedPrice: Scalars['Float']
    isEligibleForDiscount: Scalars['Boolean']
    __typename: 'WorkspaceSubscriptionAvailableDiscount'
}

export interface AvailablePlanUpgrade {
    plan: PlanObject
    price: WorkspaceMemberPrice
    __typename: 'AvailablePlanUpgrade'
}

export interface WorkspaceSubscriptionCheckoutSessionMetadata {
    amountTotal: (Scalars['Float'] | null)
    currency: (Scalars['String'] | null)
    id: Scalars['ID']
    paymentIntent: (Scalars['String'] | null)
    source: Scalars['String']
    status: Scalars['String']
    workspaceId: Scalars['String']
    __typename: 'WorkspaceSubscriptionCheckoutSessionMetadata'
}

export interface ZipFile {
    filename: Scalars['String']
    filesize: (Scalars['Int'] | null)
    key: Scalars['String']
    status: Scalars['String']
    type: (ZipFileType | null)
    url: Scalars['String']
    __typename: 'ZipFile'
}

export type ZipFileType = 'LOTTIE' | 'DOTLOTTIE' | 'OPTIMIZED_DOTLOTTIE' | 'OPTIMIZED_LOTTIE'

export interface CommunityAnimationImportRequest {
    /** The code to use to create the WorkflowFile. This is used to indicate that the WorkflowFile is an import. */
    code: Scalars['String']
    /** The key to use to import the PublicAnimation and  create the WorkflowFile */
    key: Scalars['String']
    __typename: 'CommunityAnimationImportRequest'
}

export type FileCreateTokenReferenceType = 'COMMUNITY_ANIMATION'


/** Allowed status for files */
export type FileStatus = 'Approved' | 'InProgress' | 'NeedsReview' | 'NoStatus' | 'Shipped'

export interface FileUploadRequest {
    fields: Scalars['JSON']
    key: Scalars['String']
    url: Scalars['String']
    __typename: 'FileUploadRequest'
}

export interface InlineCheckoutSetupIntentCreatePayload {
    clientSecret: Scalars['String']
    customerId: Scalars['String']
    setupIntentId: Scalars['String']
    __typename: 'InlineCheckoutSetupIntentCreatePayload'
}

export interface BackgroundImageObject {
    fileKey: Scalars['String']
    preSignedUploadURL: Scalars['String']
    publicReadURL: Scalars['String']
    __typename: 'BackgroundImageObject'
}

export interface PaymentIntentToken {
    id: Scalars['ID']
    token: Scalars['String']
    __typename: 'PaymentIntentToken'
}

export interface InvoicePaymentAttemptPayload {
    amountPaid: (Scalars['Float'] | null)
    currency: (Scalars['String'] | null)
    invoiceId: (Scalars['String'] | null)
    paymentProviderError: (PaymentProviderError | null)
    status: (Scalars['String'] | null)
    __typename: 'InvoicePaymentAttemptPayload'
}

export interface PaymentProviderError {
    code: Scalars['String']
    message: Scalars['String']
    provider: (PaymentProvider | null)
    __typename: 'PaymentProviderError'
}

export interface PaymentMethodSetupPayload {
    paymentProviderError: (PaymentProviderError | null)
    setupIntent: (SetupIntent | null)
    __typename: 'PaymentMethodSetupPayload'
}

export interface SetupIntent {
    clientSecret: Scalars['String']
    id: Scalars['String']
    provider: PaymentProvider
    __typename: 'SetupIntent'
}

export type PlaySegmentAction = 'Loop' | 'PlayOnce'

export interface PortfolioImageUploadObject {
    fileKey: Scalars['String']
    preSignedUploadURL: Scalars['String']
    publicReadURL: Scalars['String']
    __typename: 'PortfolioImageUploadObject'
}

export interface PortfolioIconUploadObject {
    fileKey: Scalars['String']
    preSignedUploadURL: Scalars['String']
    publicReadURL: Scalars['String']
    __typename: 'PortfolioIconUploadObject'
}

export interface PremiumAssetDownloadLink {
    aep: PremiumAssetDownloadLinkData
    json: PremiumAssetDownloadLinkData
    lottie: PremiumAssetDownloadLinkData
    __typename: 'PremiumAssetDownloadLink'
}

export interface PremiumAssetDownloadLinkData {
    name: Scalars['String']
    url: Scalars['String']
    __typename: 'PremiumAssetDownloadLinkData'
}

export interface FileUploadRequestStatus {
    estimatedTimeRemaining: (Scalars['String'] | null)
    fields: Scalars['JSON']
    key: Scalars['String']
    message: (Scalars['String'] | null)
    progressPercentage: (Scalars['String'] | null)
    status: Scalars['String']
    url: Scalars['String']
    __typename: 'FileUploadRequestStatus'
}

export interface WorkflowTempFilePreSignedUploadRequest {
    fileKey: Scalars['String']
    preSignedUploadURL: Scalars['String']
    publicReadURL: Scalars['String']
    __typename: 'WorkflowTempFilePreSignedUploadRequest'
}

export interface WorkspaceIconUploadObject {
    fileKey: Scalars['String']
    preSignedUploadURL: Scalars['String']
    publicReadURL: Scalars['String']
    __typename: 'WorkspaceIconUploadObject'
}

export interface CheckoutObject {
    clientSecret: Scalars['String']
    sessionId: Scalars['String']
    __typename: 'CheckoutObject'
}

export type ZipEntryType = 'FILE' | 'FOLDER' | 'PROJECT'

export interface QueryGenqlSelection{
    /** Initiates the Enterprise Login process. */
    enterpriseLoginAuthorizationUrl?: { __args: {state?: (Scalars['String'] | null), email: Scalars['String']} }
    /** Initiates the Enterprise Login process using an org internal id. */
    enterpriseOrganizationLogin?: (OrganizationSsoLoginGenqlSelection & { __args: {state?: (Scalars['String'] | null), orgInternalId: Scalars['String']} })
    /** Generates new lookup secrets for a user */
    lookupSecretsReveal?: LookupSecretGenqlSelection
    /** Start process to link a TOTP authenticator to the user */
    totpLinkStart?: TotpLinkGenqlSelection
    authVersion?: boolean | number
    jwt?: boolean | number
    /** Returns a list of locales available for selection. */
    locales?: LocaleListingGenqlSelection
    /** Gets user's notification preferences */
    viewerNotificationPreferences?: ViewerNotificationPreferenceGenqlSelection
    /** Fetches the consent request for the given consent challenge and returns whether the consent step can be skiped, and the list of requested scopes or redirect URL. */
    oAuthConsentRequest?: (OAuthConsentRequestGenqlSelection & { __args: {consentChallenge: Scalars['String']} })
    /** Fetches the login request for the given login challenge and returns whether the login step can be skiped. */
    oAuthLoginRequest?: (OAuthLoginRequestGenqlSelection & { __args: {loginChallenge: Scalars['String']} })
    /** Returns a list of user segments available for choosing. */
    userSegments?: UserSegmentListingGenqlSelection
    /** Checks if a username is available for use. */
    isUsernameAvailable?: { __args: {username: Scalars['String']} }
    /** Get a user's public information based on ID. */
    user?: (UserGenqlSelection & { __args: {id: Scalars['String']} })
    /** Check if self-service account deletion is available for this user. */
    userSelfDeleteAvailable?: boolean | number
    /** Batch get users' public information based on ID. */
    users?: (UserGenqlSelection & { __args: {ids: (Scalars['String'] | null)[]} })
    /** Information about who owns the current session. */
    viewer?: UserGenqlSelection
    /** List of types of credentials enabled for this account. */
    viewerCredentials?: ViewerCredentialGenqlSelection
    blogs?: (BlogConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    colorPalettes?: (ColorPaletteConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    featuredAnimators?: (AnimatorConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    featuredPublicAnimations?: (PublicAnimationConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Set filter options */
    filters?: (AnimationFilter | null)} })
    legacyVersion?: boolean | number
    notifications?: NotificationGenqlSelection
    popularPublicAnimations?: (PublicAnimationConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), sort?: (DurationFilterType | null), 
    /** Set filter options */
    filters?: (AnimationFilter | null)} })
    publicAnimation?: (PublicAnimationGenqlSelection & { __args: {id: Scalars['Int']} })
    publicAnimationByHash?: (PublicAnimationGenqlSelection & { __args: {hash: Scalars['String']} })
    publicAnimationCollection?: (PublicCollectionGenqlSelection & { __args: {id: Scalars['String']} })
    publicAnimationCollections?: (PublicCollectionConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), input?: (CollectionAnimationTypeInput | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), userId?: (Scalars['String'] | null)} })
    publicAnimationCollectionsByUser?: (PublicCollectionConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), userId?: (Scalars['String'] | null)} })
    publicAnimationsByUser?: (PublicAnimationConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), input?: (PublicAnimationStatusFilterTypeInput | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), userId: Scalars['ID']} })
    /** Animations of a collection */
    publicCollectionAnimations?: (PublicAnimationConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), collectionId: Scalars['Float'], 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Set filter options */
    filters?: (AnimationFilter | null)} })
    publicAnimationTags?: (PublicAnimationTagConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null)} })
    recentPublicAnimations?: (PublicAnimationConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Set filter options */
    filters?: (AnimationFilter | null)} })
    searchPublicAnimations?: (PublicAnimationConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), query: Scalars['String'], withAep?: (Scalars['Boolean'] | null), 
    /** Set filter options */
    filters?: (AnimationFilter | null)} })
    softwareUpdates?: (SoftwareUpdateGenqlSelection & { __args: {app: Scalars['String'], version?: (Scalars['String'] | null)} })
    trendingSearches?: TrendingItemGenqlSelection
    userAchievements?: (UserAchievementConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    userStats?: UserStatsGenqlSelection
    viewerPublicAnimationDownloads?: (PublicAnimationConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    viewerPublicAnimationLikes?: (PublicAnimationConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    services?: ServiceGenqlSelection
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Gets the status of a raster to lottie conversion job.
     */
    rasterToLottieStatus?: (RasterToLottieJobGenqlSelection & { __args: {jobId: Scalars['ID']} })
    rasterToLottieVersion?: boolean | number
    /** Indicates if the user has requested to join the suggested workspace */
    workspaceHasRequestedToJoin?: { __args: {workspaceId: Scalars['ID']} }
    /** Look up membership requests by workspace id */
    workspaceJoinRequests?: (WorkspaceMemberConnectionGenqlSelection & { __args: {
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Members who have accepted and active */
    accepted?: (Scalars['Boolean'] | null), 
    /** Filter by only admins */
    adminsOnly?: (Scalars['Boolean'] | null), 
    /** Filter by only member access */
    editorsOnly?: (Scalars['Boolean'] | null), workspaceId: Scalars['ID']} })
    /** Get the number of members in a workspace */
    workspaceMemberCount?: { __args: {workspaceId: Scalars['ID']} }
    /** Look up invitations by workspace id. */
    workspaceMembers?: (WorkspaceMemberConnectionGenqlSelection & { __args: {refreshCache?: (Scalars['Boolean'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Members who have accepted and active */
    accepted?: (Scalars['Boolean'] | null), 
    /** Filter by only admins */
    adminsOnly?: (Scalars['Boolean'] | null), 
    /** Filter by only member access */
    editorsOnly?: (Scalars['Boolean'] | null), workspaceId: Scalars['ID']} })
    /** Search workspace members */
    workspaceMembersSearch?: (WorkspaceMemberSearchConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Filter by access role */
    access?: (Scalars['String'] | null), 
    /** Filter by domain */
    byDomain?: (Scalars['Boolean'] | null), 
    /** Search query */
    query?: (Scalars['String'] | null), 
    /** Filter by workspace ID */
    workspaceId?: (Scalars['ID'] | null)} })
    /** Look up organization by workspace id. */
    accountByWorkspaceId?: (AccountGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    workspaceAuditLogs?: (AuditLogConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), toDate?: (Scalars['DateTime'] | null), fromDate?: (Scalars['DateTime'] | null), workspaceId: Scalars['ID']} })
    /** Get the default user price for team billing packages. */
    billingPackageDefaultPerUserPrice?: BillingPackagePriceGenqlSelection
    /** Look up a billing package price by its id. */
    billingPackagePrice?: (BillingPackagePriceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up a billing package by its id. */
    billingPackage?: (BillingPackageGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Billing package connection. */
    billingPackages?: (BillingPackageConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null)} })
    /** fetch cancel reasons */
    cancelReasons?: CancelReasonGenqlSelection
    /** Get users with view access to an Animation */
    commentMentionableUsers?: (CommentUserGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Get the replies for a comment */
    commentReplies?: (CommentConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), id: Scalars['ID']} })
    /** Get the comments for an entity */
    comments?: (CommentConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), type: CommentableEntityType, id: Scalars['ID']} })
    /** Get the comments for an entity by frame number */
    timelineCommentsByFrame?: (CommentConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** The frame number */
    frame: Scalars['Int'], 
    /** The entity type */
    type: CommentableEntityType, 
    /** The entity ID */
    id: Scalars['ID']} })
    /** Get the count of comments for an entity grouped by frame number */
    timelineCommentsCount?: (KeyCountGenqlSelection & { __args: {
    /** The entity type */
    type: CommentableEntityType, 
    /** The entity ID */
    id: Scalars['ID']} })
    /** Get the number of community animations imported by the current user in the current month */
    communityAnimationImportCountForCalendarMonth?: CommunityAnimationImportCounterGenqlSelection
    /** Get the enterprise organization for the workspace */
    enterpriseOrganization?: (EnterpriseOrganizationGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get redirect url to setup SSO or DSYNC for workspace */
    enterpriseOrganizationConfigurationLink?: { __args: {type: Scalars['String'], workspaceId: Scalars['ID']} }
    /** Get directory groups claimed by other workspaces of the same organization. */
    enterpriseOrganizationDirectoryClaims?: (OrganizationDirectoryClaimGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get the list of organization directory groups for the workspace */
    enterpriseOrganizationDirectoryGroups?: (OrganizationDirectoryGroupGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Fetch file handback by id */
    fileHandback?: (FileHandbackGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up a deleted animation by its id. */
    deletedFile?: (FileGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up an animation by its id. */
    file?: (FileGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up an animation by its id. */
    fileAboveAndBelowId?: (NextPrevAnimationGenqlSelection & { __args: {folderId?: (Scalars['ID'] | null), sort?: (Scalars['String'] | null), id: Scalars['ID']} })
    /** The total count of file uploads to a workspace, including deleted files */
    fileCountByWorkspaceId?: { __args: {workspaceId: Scalars['ID']} }
    /** Get the last modified animation file id for the workspace. This is an optimized query made specifically for onboarding checklist and some checks is skipped, use with cautioun. */
    fileIdRecentlyModified?: { __args: {workspaceId?: (Scalars['ID'] | null)} } | boolean | number
    /** Eligible file ids for a given workspace. If a file upload limit is set, only those within the limits will be listed. */
    fileIdsWithinLimit?: { __args: {workspaceId: Scalars['ID']} }
    /** Get the last modified files for the user. */
    filesRecentlyModified?: (FileGenqlSelection & { __args?: {filterDraftsByCurrentUser?: (Scalars['Boolean'] | null), filterByCurrentUserModifications?: (Scalars['Boolean'] | null), count?: (Scalars['Float'] | null), workspaceId?: (Scalars['ID'] | null), fileType?: (FileType | null)} })
    fileVariants?: (FileVariantGenqlSelection & { __args: {fileVersionId?: (Scalars['ID'] | null), fileId: Scalars['ID']} })
    /** Fetch file version by id */
    fileVersion?: (FileVersionGenqlSelection & { __args: {id: Scalars['ID']} })
    fileVersionOptimizeJob?: (FileVersionOptimizeJobGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Generate tags for file version */
    fileVersionTagsGenerate?: { __args: {thumbnailUrl: Scalars['String']} }
    /** Get all file versions of a file using file ID */
    fileVersions?: (FileVersionConnectionGenqlSelection & { __args: {includeSubVersions?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), fileId: Scalars['ID']} })
    /** Look up a folder by its id. */
    folder?: (FolderGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up folder subfolders and animations by folder-id. */
    folderFiles?: (FileConnectionGenqlSelection & { __args: {type?: (Scalars['String'] | null), status?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), id: Scalars['ID']} })
    /** Fetch folders under a specific project. */
    foldersByProjectId?: (FolderGenqlSelection & { __args: {projectId: Scalars['String']} })
    /**
     * @deprecated Use `searchFolders` instead.
     * Search folders inside a specific workspace by it's title.
     */
    searchFoldersInWorkspace?: (FolderGenqlSelection & { __args: {query: Scalars['String'], workspaceIds: Scalars['ID'][]} })
    /** Retrieve an invoice by id. */
    invoice?: (InvoiceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Get the list of invoices for the workspace. */
    invoices?: (InvoiceGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get lottie mockups using animation id */
    getLottieMockups?: (LottieMockupConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), animationId: Scalars['ID']} })
    /** Check if the user is subscribed to the Animation's feed */
    fileNotificationsIsSubscribed?: { __args: {fileId: Scalars['ID']} }
    /** Get subscriber hash for Novu API */
    novuSubscriberHash?: boolean | number
    /** Get cached official workspace based on the domain derived from current user email */
    officialWorkspace?: OfficialWorkspaceGenqlSelection
    /** Get the current onboarding checklist of the logged in user, create and return if onboarding checklist does not exist yet. */
    getUserOnboardingChecklist?: (OnboardingChecklistObjectGenqlSelection & { __args: {userId: Scalars['ID']} })
    /** Get the current onboarding of the logged in user, create and return if onboarding does not exist. */
    getUserOnboarding?: (OnboardingV2ObjectGenqlSelection & { __args: {userId: Scalars['ID']} })
    editorFileEditCount?: boolean | number
    /** Determine if it's the user's first attempt at login, and if so, set-up the workspace. */
    hasAccessToAWorkspace?: boolean | number
    hasAccessToPaidWorkspace?: boolean | number
    isPaidUser?: boolean | number
    /** Get the country of the user */
    userCountry?: boolean | number
    userHasCreatorAccess?: boolean | number
    /** Get a payment intent by id */
    paymentIntent?: (PaymentIntentGenqlSelection & { __args: {id: Scalars['String']} })
    /** Fetch payment collections methods for the user country */
    paymentIntentCollectionMethod?: PaymentIntentCollectionMethodGenqlSelection
    /** Get a payment intent thats processing for workspace id */
    paymentIntentProcessingCheck?: (PaymentIntentGenqlSelection & { __args: {workspaceId: Scalars['String']} })
    portfolioPost?: (PortfolioPostGenqlSelection & { __args: {id: Scalars['ID']} })
    portfolioPostIsSlugAvailable?: { __args: {input: PortfolioSlugAvailableInput} }
    portfolioPosts?: (PortfolioPostConnectionGenqlSelection & { __args: {status?: (PortfolioPostStatus | null), portfolioId: Scalars['ID'], 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    /** Get workspace portfolio */
    workspacePortfolio?: (WorkspacePortfolioGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    workspacePortfolioHasEditAccess?: { __args: {workspaceId: Scalars['ID']} }
    workspacePortfolioIsUrlAvailable?: { __args: {input: PortfolioUrlAvailableInput} }
    featuredCuratedPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    featuredPremiumAssetPacks?: (PremiumAssetPackConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    featuredPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    popularCuratedPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    popularPremiumAssetPacks?: (PremiumAssetPackConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    popularPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    premiumAsset?: (PremiumAssetGenqlSelection & { __args: {slug: Scalars['String']} })
    premiumAssetPack?: (PremiumAssetPackDetailConnectionGenqlSelection & { __args: {slug: Scalars['String'], 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    recentCuratedPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    recentPremiumAssetPacks?: (PremiumAssetPackConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    recentPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    searchPremiumAssetPacks?: (PremiumAssetPackConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null)} })
    searchPremiumAssets?: (PremiumAssetConnectionGenqlSelection & { __args?: {canvaCompatible?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null)} })
    privateShareMembers?: (PrivateShareGenqlSelection & { __args: {resourceType: PrivateShareType, resourceId: Scalars['ID']} })
    privateShareSuggestedMembers?: (SuggestedMemberGenqlSelection & { __args: {resourceType: PrivateShareType, resourceId: Scalars['ID']} })
    /** Get all shared resources for the logged in user */
    privateShares?: (PrivateShareConnectionGenqlSelection & { __args?: {filterByType?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    /** Look up a project by its id. */
    project?: (ProjectGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Look up project folders and animations by project-id. */
    projectFiles?: (ProjectFileConnectionGenqlSelection & { __args: {createdByUserId?: (Scalars['String'] | null), type?: (Scalars['String'] | null), status?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** Identifier of the project to fetch files for. */
    id: Scalars['ID']} })
    /**
     * @deprecated Use `searchProjects` instead
     * Search projects inside a specific workspace by it's title.
     */
    searchProjectsInWorkspace?: (ProjectGenqlSelection & { __args: {query: Scalars['String'], workspaceIds: Scalars['ID'][]} })
    /** Fetch draft project for the given workspace. */
    workspaceDraftProject?: (ProjectGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Fetch projects under a specific workspace. */
    workspaceProjects?: (ProjectConnectionGenqlSelection & { __args: {includeSystemProjects?: (Scalars['Boolean'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), workspaceId: Scalars['ID']} })
    /** Get all public assets for a given workflow file version */
    publicAssets?: (PublicAssetGenqlSelection & { __args: {fileId: Scalars['ID']} })
    /** Get a public shared resource */
    publicShare?: (PublicShareGenqlSelection & { __args: {resourceType: PublicShareType, resourceId: Scalars['ID']} })
    publicShareByCode?: (PublicShareGenqlSelection & { __args: {shareCode: Scalars['String']} })
    /** Fetch recently deleted files for the workspace. */
    recentlyDeleted?: (RecentlyDeletedConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), workspaceId: Scalars['String']} })
    /** Fetch recently deleted files for the workspace. */
    recentlyDeletedChildren?: (ProjectFileConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), resourceId: Scalars['String']} })
    /** Fetch recently deleted resource with the parent. */
    recentlyDeletedResource?: (RecentlyDeletedGenqlSelection & { __args: {input: RecentlyDeletedResourceInput} })
    searchMultipleWorkspaces?: (SearchWorkspaceResponseGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), fileStatus?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), 
    /** Sort by the specified field. */
    sort?: (Scalars['String'] | null), workspaceIds: Scalars['String'][]} })
    searchWorkspace?: (SearchWorkspaceResponseGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), fileStatus?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), 
    /** Sort by the specified field. */
    sort?: (Scalars['String'] | null)} })
    /** Find source files by file version id */
    sourceFile?: (SourceFileGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /** Find source files by file version id */
    sourceFiles?: (SourceFileGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /** Fetch suggested invitees for the authenticated user. */
    suggestedInvitees?: (SuggestedInviteeConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), workspaceId: Scalars['String']} })
    /** Suggest official workspace based on domain name of the user's email address */
    suggestedOfficialWorkspace?: SuggestedWorkspaceGenqlSelection
    /** Suggest workspaces based on domain name of the user's email address */
    suggestedWorkspaces?: (SuggestedWorkspaceConnectionGenqlSelection & { __args?: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null)} })
    /** Get all the users who are subscribed to this animation. */
    fileNotificationSubscribers?: (UserNotificationSubscriptionConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), id: Scalars['ID']} })
    workflowVersion?: boolean | number
    /**
     * @deprecated This query is deprecated and will be removed in near future, use `getUserOnboarding` instead
     * Get the current onboarding of the logged in user
     */
    getUserOnboardingStatus?: OnboardingObjectGenqlSelection
    /** Look up a workflow collection by its id. */
    workspaceCollection?: (WorkspaceCollectionGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Fetch files for a workspace collection. */
    workspaceCollectionFiles?: (FileConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), id: Scalars['ID']} })
    /** Fetch workspace collections connection. */
    workspaceCollections?: (WorkspaceCollectionConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), 
    /** A keyword to do a simple keyword based search. */
    query?: (Scalars['String'] | null), workspaceId: Scalars['ID']} })
    workspaceColorPalette?: (WorkspaceColorPaletteGenqlSelection & { __args: {id: Scalars['ID']} })
    workspaceColorPalettes?: (WorkspaceColorPaletteConnectionGenqlSelection & { __args: {
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), 
    /** Returns the first <n> elements from the list. */
    first?: (Scalars['Float'] | null), 
    /** Returns the last <n> elements from the list. */
    last?: (Scalars['Float'] | null), 
    /** Set sorting options */
    orderBy?: (Scalars['QuerySortOptions'] | null), workspaceId: Scalars['ID']} })
    /** Get workspace invitation link */
    workspaceInvitationLink?: (WorkspaceInvitationLinkGenqlSelection & { __args?: {invitationCode?: (Scalars['String'] | null), workspaceId?: (Scalars['ID'] | null)} })
    workspaceOwnershipTransferRequest?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get brand information using the domain */
    brandInformation?: (BrandObjectGenqlSelection & { __args: {domain: Scalars['String']} })
    /** Check if there is a current workspace and return it */
    currentWorkspace?: WorkspaceGenqlSelection
    /** Look up a workspace by its id. */
    workspace?: (WorkspaceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Check if the workspace can add members */
    workspaceCanAddMoreSeats?: { __args: {id: Scalars['ID']} }
    /** Check if the workspace can add members */
    workspaceCanManageMembers?: { __args: {id: Scalars['ID']} }
    /** get workspace dependencies count, files, projects and members */
    workspaceCounts?: (WorkspaceCountsObjectGenqlSelection & { __args: {id: Scalars['String']} })
    workspaceSeatUtilization?: (WorkspaceSeatUtilizationGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get the price of per user for the workspace */
    workspaceUserPrice?: (WorkspaceMemberPriceGenqlSelection & { __args: {workspaceId: Scalars['String']} })
    /** Fetch all the workspaces that has access to the logged in user */
    workspaces?: WorkspaceGenqlSelection
    /** Fetch all workspaces owned by user */
    workspacesOwnedByUser?: (WorkspaceGenqlSelection & { __args?: {includeDraft?: (Scalars['Boolean'] | null)} })
    /** Get the settings of a Workspace */
    workspaceSettings?: (WorkspaceSettingsGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Get available discount details for a workspace subscription */
    workspaceSubscriptionAvailableDiscount?: (WorkspaceSubscriptionAvailableDiscountGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Get the plan the workspace subscription can be upgraded to */
    workspaceSubscriptionAvailablePlanUpgrade?: (AvailablePlanUpgradeGenqlSelection & { __args: {subscriptionId: Scalars['ID']} })
    /** Checks if the given checkout session was completed */
    workspaceSubscriptionCheckoutCompleted?: (WorkspaceSubscriptionCheckoutSessionMetadataGenqlSelection & { __args: {id: Scalars['ID']} })
    zipFile?: (ZipFileGenqlSelection & { __args: {key: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    /** Completes a reset password process. Will also logout the user from all existing sessions. */
    confirmResetPassword?: { __args: {newPassword: Scalars['String'], resetPasswordToken: Scalars['String']} }
    /** Initiates the long poll token login process. */
    createLoginToken?: (LoginTokenGenqlSelection & { __args?: {appKey?: (Scalars['String'] | null)} })
    /** Links the account for enterprise login (workos provider) and logs user in. */
    enterpriseLinkWithLogin?: (AuthenticationGenqlSelection & { __args: {web: Scalars['Boolean'], code: Scalars['String']} })
    /** Completes the Enterprise login process. */
    enterpriseLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), code: Scalars['String']} })
    /** Logouts the current user, "true" if the session is successfully destroyed. */
    logout?: { __args: {web?: (Scalars['Boolean'] | null)} } | boolean | number
    /** Disables lookup secrets for a user */
    lookupSecretsDisable?: boolean | number
    /** Login using generated lookup secrets (recovery codes) */
    lookupSecretsLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), code: Scalars['String']} })
    /** Generates new lookup secrets for a user */
    lookupSecretsRegenerate?: LookupSecretGenqlSelection
    /** To be called by an authenticated user. It marks the token for the login token process as valid, and enables the `tokenLogin` mutation to receive a new session based on the token. */
    markLoginTokenValid?: { __args: {token: Scalars['String']} }
    /** Email/Password user login. */
    passwordLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), password: Scalars['String'], email: Scalars['String']} })
    /** Email/Password user registration. */
    register?: (AuthenticationGenqlSelection & { __args: {
    /** The token generated by Turnstile captcha on client end. */
    verificationToken?: (Scalars['String'] | null), 
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), lastName?: (Scalars['String'] | null), 
    /** Same as `firstName`. */
    name?: (Scalars['String'] | null), firstName?: (Scalars['String'] | null), password: Scalars['String'], email: Scalars['String']} })
    /** Will send a reset password email, if the email belongs to a registered user. */
    resetPassword?: { __args: {email: Scalars['String']} }
    /** Initiate a request to clear the sessions for the current user. */
    sessionsClear?: { __args: {email: Scalars['String']} }
    /** Completes a clear sessions process. */
    sessionsConfirmClear?: { __args: {sessionsClearToken: Scalars['String']} }
    /** Login with a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github". */
    socialLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), clientSecret?: (Scalars['String'] | null), clientId?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), accessToken?: (Scalars['String'] | null), accessSecret?: (Scalars['String'] | null), idToken?: (Scalars['String'] | null), provider: Scalars['String']} })
    /** Checks if the user completed the token login authentication. Will return the accessToken if completed, otherwise it will return an error. */
    tokenLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The token obtained with the createLoginToken mutation. */
    token: Scalars['String']} })
    /** Completes the TOTP link to a user account */
    totpLinkConfirm?: (LookupSecretGenqlSelection & { __args: {flowId: Scalars['String'], code: Scalars['String']} })
    /** TOTP MFA login. */
    totpLogin?: (AuthenticationGenqlSelection & { __args: {
    /** The OAuth2 login challenge. */
    loginChallenge?: (Scalars['String'] | null), web?: (Scalars['Boolean'] | null), code: Scalars['String']} })
    /** Unlinks TOTP from the current user. */
    totpUnlink?: boolean | number
    /** Cancels the ongoing email change process for the user. */
    cancelEmailChange?: UserGenqlSelection
    /** Completes an email change process. */
    confirmEmailChange?: { __args: {emailChangeToken: Scalars['String']} }
    /** Completes the email verification process. */
    emailVerificationConfirm?: { __args: {emailVerificationToken: Scalars['String']} }
    /** Initiates the email change process, will fire an email for the user to conclude the email change process. */
    requestEmailChange?: (UserGenqlSelection & { __args: {email: Scalars['String']} })
    /** Resends the change email confirmation email message. */
    resendEmailChangeEmail?: boolean | number
    /** Resends the verification email for the current logged in user. */
    resendVerificationEmail?: boolean | number
    /** Confirms and unsubscribes the user with the code. */
    unsubscribeEmailConfirm?: { __args: {code: Scalars['String']} }
    /** Sends the unsubscribe confirm email message. */
    unsubscribeEmailRequest?: { __args: {email: Scalars['String']} }
    /** Verify the user email address with a code */
    userEmailVerify?: (UserGenqlSelection & { __args: {code: Scalars['String']} })
    /** Updates user's notification preference */
    viewerNotificationPreferenceUpdate?: (ViewerNotificationPreferenceGenqlSelection & { __args: {input: NotificationPreferenceUpdateInput} })
    /** Deletes user's Slack notification webhook integration */
    viewerSlackNotificationWebhookDelete?: boolean | number
    /** Sets user's Slack notification webhook integration */
    viewerSlackNotificationWebhookSet?: { __args: {
    /** The code from Slack OAuth redirection */
    code: Scalars['String']} }
    /** Accepts an OAuth consent request for the given consent challenge and selected scopes, and returns the redirect URL. */
    oAuthConsentRequestAccept?: { __args: {scopes: Scalars['String'][], consentChallenge: Scalars['String']} }
    /** Rejects an OAuth consent request for the given consent challenge and selected scopes, and returns the redirect URL. */
    oAuthConsentRequestReject?: { __args: {consentChallenge: Scalars['String']} }
    /** Accepts organization invitation. Links directory user to Kratos user. */
    organizationInviteAccept?: (DirectoryUserGenqlSelection & { __args: {invitationCode: Scalars['String']} })
    /** Key/value of data associated with the session. Sets a value for a key to the current logged in session. If value is not sent, unsets the given key. */
    sessionSetValue?: { __args: {value?: (Scalars['String'] | null), key: Scalars['String']} }
    /** @deprecated Use the query `isUsernameAvailable` instead of this mutation. */
    isUsernameAvailable?: { __args: {username: Scalars['String']} }
    /** Updates a user's password. */
    passwordChange?: { __args: {newPassword: Scalars['String']} }
    /** Finishes the process of uploading a new profile image. Must be called right after finishing PUTing the file to the signed URL provided by the `uploadProfilePhoto` mutation. Will process the uploaded image into different sizes and store them. */
    processUserProfilePhotoUpload?: { __args: {signedUrl: Scalars['String'], filename: Scalars['String']} }
    /** Sets the segments to apply to the current logged in user. */
    setUserSegments?: { __args: {
    /** Required if one of the segments selected is "Other". */
    segmentOtherDescription?: (Scalars['String'] | null), 
    /** The IDs of the segments to set to the user, separated by commas. E.g. "1,2,3". */
    segmentIds: Scalars['String']} }
    /** Links the account with a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github", "workos". */
    socialLoginLink?: { __args: {code?: (Scalars['String'] | null), accessToken?: (Scalars['String'] | null), accessSecret?: (Scalars['String'] | null), idToken?: (Scalars['String'] | null), provider: Scalars['String']} }
    /** Unlinks the account and a social provider. Accepted providers: "dribbble", "google", "facebook", "twitter", "apple", "github", "workos". */
    socialLoginUnlink?: { __args: {provider: Scalars['String']} }
    /** Updates the current user's profile data. */
    updateUser?: (UserGenqlSelection & { __args?: {
    /** The user's Behance username. */
    behanceUsername?: (Scalars['String'] | null), 
    /** The user's short Bio. */
    bio?: (Scalars['String'] | null), 
    /** The user's City of residence. */
    city?: (Scalars['String'] | null), 
    /** The user's Country of residence. */
    country?: (Scalars['String'] | null), 
    /** The user's Dribbble username. */
    dribbbleUsername?: (Scalars['String'] | null), 
    /** Send "true" if the user has agreed to receive marketing emails. */
    enableMarketingEmails?: (Scalars['String'] | null), 
    /** The user's first name. */
    firstName?: (Scalars['String'] | null), 
    /** The user's Github username. */
    githubUsername?: (Scalars['String'] | null), 
    /** The user's Instagram username. */
    instagramUsername?: (Scalars['String'] | null), 
    /** Send "true" if the user is available for work. */
    isHireable?: (Scalars['String'] | null), 
    /** The user's last name. */
    lastName?: (Scalars['String'] | null), 
    /** The user's Linkedin username. */
    linkedinUsername?: (Scalars['String'] | null), 
    /** Same as `city`. */
    location?: (Scalars['String'] | null), 
    /** Same as `firstName`. */
    name?: (Scalars['String'] | null), 
    /** The user's Twitter username. */
    twitterUsername?: (Scalars['String'] | null), 
    /** The user's preferred username. */
    username?: (Scalars['String'] | null), 
    /** The user's personal website. */
    website?: (Scalars['String'] | null)} })
    /** Starts the upload profile picture process. Returns a signed URL that should be used in a PUT request with the file content. The `processUserProfilePhotoUpload` mutation must be called right after the file upload has finished. */
    uploadProfilePhoto?: (UserProfilePhotoUploadGenqlSelection & { __args: {extension: Scalars['String']} })
    /** Update the user preferred locale */
    userLocaleUpdate?: { __args: {locale: Scalars['String']} }
    /** Request the start of self-service account deletion. */
    userSelfDeleteRequest?: { __args: {offboardingQuestions: OffboardingQuestionInput[], reason: Scalars['String']} }
    accountDeleteRequestCreate?: { __args: {requestType: AccountDeleteRequestType} }
    hireRequestCreate?: { __args: {input: HireRequestInput} }
    hitCountEventCreate?: (HitCountEventGenqlSelection & { __args: {input: HitCountEventInput, resourceId: Scalars['ID']} })
    publicAnimationCollectionAddAnimation?: (PublicCollectionGenqlSelection & { __args: {animationId: Scalars['Int'], collectionId: Scalars['Int']} })
    publicAnimationCollectionCreate?: (PublicCollectionGenqlSelection & { __args: {input: CollectionInput} })
    publicAnimationCollectionDelete?: { __args: {collectionId: Scalars['Int']} }
    publicAnimationCollectionDeleteAnimations?: { __args: {animationIds: Scalars['Int'][], collectionId: Scalars['Int']} }
    publicAnimationCollectionUpdate?: (PublicCollectionGenqlSelection & { __args: {collectionId: Scalars['Int'], input: CollectionInput} })
    publicAnimationCreate?: (PublicAnimationGenqlSelection & { __args: {input: PublicAnimationCreateInput} })
    publicAnimationCreateComment?: (PublicCommentGenqlSelection & { __args: {animationId: Scalars['Int'], input: CommentInput} })
    publicAnimationCreateCommentReply?: (PublicCommentGenqlSelection & { __args: {commentId: Scalars['Int'], content: Scalars['String']} })
    publicAnimationDelete?: (PublicAnimationDeleteResponseGenqlSelection & { __args: {id: Scalars['Int']} })
    publicAnimationLike?: (PublicAnimationGenqlSelection & { __args: {id: Scalars['Int']} })
    publicAnimationReport?: { __args: {input: AnimationReportInput} }
    publicAnimationResolveComment?: (PublicCommentGenqlSelection & { __args: {id: Scalars['Int']} })
    publicAnimationUnlike?: (PublicAnimationGenqlSelection & { __args: {id: Scalars['Int']} })
    publicAnimationUploadRequestCreate?: (PublicAnimationUploadRequestGenqlSelection & { __args: {input: PublicAnimationUploadRequestCreateInput} })
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Converts a previously uploaded raster image to a Lottie animation.
     */
    rasterToLottieConvert?: (RasterToLottieJobGenqlSelection & { __args: {fileName: Scalars['String'], imageId: Scalars['ID'], params?: (RasterToLottieJobParams | null)} })
    /**
     * WARNING: this query/mutation is experimental. Names, fields or types can possibly have breaking changes. ---
     * Generates a pre-signed URL for uploading a raster image.
     */
    rasterToLottieUpload?: (RasterToLottieUploadUrlGenqlSelection & { __args: {fileName: Scalars['String']} })
    /** Approve a membership request */
    workspaceJoinRequestApprove?: (WorkspaceMemberGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Accept invitation to a workspace using the invitation code. */
    workspaceMemberCompleteOnboarding?: (WorkspaceMemberGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Remove workspace member */
    workspaceMemberDelete?: { __args: {id: Scalars['ID']} }
    /** Accept invitation to a workspace using the invitation code. */
    workspaceMemberInvitationAccept?: (WorkspaceMemberGenqlSelection & { __args: {invitationCode: Scalars['String']} })
    /** Reinvite user to a workspace. */
    workspaceMemberResendInvite?: (WorkspaceMemberGenqlSelection & { __args: {id: Scalars['String']} })
    /** Change access of the user to a workspace. */
    workspaceMemberSetPermission?: (WorkspaceMemberGenqlSelection & { __args: {access: Scalars['String'], id: Scalars['ID']} })
    /** Invite a multiple users to a workspace. */
    workspaceMembersSendInvites?: (WorkspaceMemberGenqlSelection & { __args: {input: WorkspaceMemberSendInviteInput, workspaceId: Scalars['ID']} })
    /** Create a stripe session and get the ID of the session */
    accountPaymentProviderCustomerPortalSessionCreate?: { __args: {workspaceId?: (Scalars['ID'] | null)} } | boolean | number
    /** Update an account by its id. */
    accountUpdate?: (AccountGenqlSelection & { __args: {workspaceId?: (Scalars['ID'] | null), updateLastInvoice?: (Scalars['Boolean'] | null), input: AccountInput, id: Scalars['ID']} })
    /** Update tax id of account */
    accountUpdateTaxId?: (AccountGenqlSelection & { __args: {input: AccountTaxInput} })
    /** Add a comment to an animation */
    commentCreate?: (CommentGenqlSelection & { __args: {input: CommentCreateInput} })
    /** Delete a comment */
    commentDelete?: { __args: {id: Scalars['ID']} }
    /** Edit a comment */
    commentEdit?: (CommentGenqlSelection & { __args: {body: Scalars['String'], id: Scalars['ID']} })
    /** Publish an unpublished comment */
    commentPublish?: (CommentGenqlSelection & { __args: {id: Scalars['ID']} })
    /** React to a comment */
    commentReact?: (CommentGenqlSelection & { __args: {type: Scalars['String'], id: Scalars['ID']} })
    /** Reply to a comment */
    commentReplyCreate?: (CommentGenqlSelection & { __args: {name?: (Scalars['String'] | null), body: Scalars['String'], id: Scalars['ID']} })
    /** Mark a comment as resolved */
    commentResolve?: (CommentGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Unpublish a comment */
    commentUnpublish?: (CommentGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Unreact to a comment */
    commentUnreact?: (CommentGenqlSelection & { __args: {type: Scalars['String'], id: Scalars['ID']} })
    /** Mark a resolved comment as unresolved */
    commentUnresolve?: (CommentGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Begins importing a community animation. */
    communityAnimationImport?: { __args: {input: CommunityAnimationImportInput} }
    /** Creates a community animation import request. */
    communityAnimationImportRequestCreate?: (CommunityAnimationImportRequestGenqlSelection & { __args: {input: CommunityAnimationImportRequestCreateInput} })
    educationPlanActivate?: { __args: {inviteCode: Scalars['String']} }
    /** Create organization for the workspace */
    enterpriseOrganizationCreate?: (EnterpriseOrganizationGenqlSelection & { __args: {input: CreateEnterpriseOrganizationInput} })
    /** Delete the enterprise organization for the workspace */
    enterpriseOrganizationDelete?: { __args: {workspaceId: Scalars['ID']} }
    /** Disable DSYNC for the enterprise organization for the workspace */
    enterpriseOrganizationDisableDsync?: (EnterpriseOrganizationGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Disable SSO for the enterprise organization for the workspace */
    enterpriseOrganizationDisableSso?: (EnterpriseOrganizationGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Updated SSO enforcement for the enterprise organization for the workspace */
    enterpriseOrganizationSetSsoEnforcement?: { __args: {input: EnterpriseSetSsoEnforcementInput, workspaceId: Scalars['ID']} }
    /** Update directory groups for the enterprise organization for the workspace */
    enterpriseOrganizationUpdateDirectoryGroups?: (OrganizationDirectoryGroupGenqlSelection & { __args: {input: EnterpriseOrganizationDirectoryGroupInput} })
    /** Add domains for the enterprise organization for the workspace */
    enterpriseOrganizationUpdateDomains?: (EnterpriseOrganizationGenqlSelection & { __args: {input: EnterpriseOrganizationDomainsInput} })
    /** Create a new file. */
    fileCreate?: (FileGenqlSelection & { __args: {input: FileCreateInput} })
    /** Fallback mutation to create a new file */
    fileCreateFallback?: (FileGenqlSelection & { __args: {input: FileCreateFallbackInput} })
    /** Delete an existing file by its id. */
    fileDelete?: { __args: {id: Scalars['ID']} }
    fileDescriptionUpdate?: (FileGenqlSelection & { __args: {input: FileDescriptionUpdateInput, id: Scalars['ID']} })
    /** Duplicate a file. */
    fileDuplicate?: (FileGenqlSelection & { __args: {input: FileDuplicateInput} })
    /** Update the name of the animation */
    fileRename?: (FileGenqlSelection & { __args: {input: FileRenameInput, id: Scalars['ID']} })
    /** Modify an existing file by its id. */
    fileUpdate?: (FileGenqlSelection & { __args: {input: UpdateFileInput, id: Scalars['String']} })
    /** Update background color of the file */
    fileUpdateBackgroundColor?: (FileGenqlSelection & { __args: {backgroundColor?: (Scalars['String'] | null), id: Scalars['ID']} })
    fileUpdateStatus?: (FileGenqlSelection & { __args: {status?: (FileStatus | null), id: Scalars['ID']} })
    fileUploadRequestCreate?: (FileUploadRequestGenqlSelection & { __args?: {input?: (CreateUploadRequestInput | null)} })
    /** Delete existing files by their ids, project id or folder id. IDs can optionally be scoped to a project or folder by passing in a projectId or folderId. */
    filesDelete?: { __args: {folderId?: (Scalars['ID'] | null), projectId?: (Scalars['ID'] | null), ids: Scalars['ID'][]} }
    /** Move file or folder to a new folder. */
    filesMoveToFolder?: (FileGenqlSelection & { __args: {folderId: Scalars['ID'], fileIds: Scalars['ID'][]} })
    /** Move file or folder to a new folder. */
    filesMoveToProject?: (FileGenqlSelection & { __args: {projectId: Scalars['ID'], fileIds: Scalars['ID'][]} })
    filesUpdateStatus?: (FileGenqlSelection & { __args?: {status?: (FileStatus | null), folderId?: (Scalars['ID'] | null), projectId?: (Scalars['ID'] | null), ids?: (Scalars['ID'][] | null)} })
    exportJsonFile?: (FileVariantGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    filePreviewCreate?: (FileVariantGenqlSelection & { __args: {input: FileVariantInput, fileVersionId: Scalars['ID']} })
    fileVariantDelete?: (FileVariantGenqlSelection & { __args: {fileVersionId: Scalars['ID'], fileVariantId: Scalars['ID']} })
    fileVariantFallback?: (FileVariantGenqlSelection & { __args: {fileVariationId: Scalars['ID']} })
    fileVariantUpdate?: (FileVariantGenqlSelection & { __args: {input: FileVariantUpdateInput} })
    fileVariantsSync?: (FileVariantGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /** @deprecated Use `mutation fileVersionOptimize` instead */
    optimizeWorkflowFile?: (FileVariantGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /** @deprecated Use `mutation fileVersionOptimize` instead */
    uploadDotLottieWorkflowFile?: (FileVariantGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /** Create a new version of the file */
    fileVersionCreate?: (FileVersionGenqlSelection & { __args: {input: FileVersionCreateInput} })
    /** Fallback to create a new file version */
    fileVersionCreateFallback?: (FileVersionGenqlSelection & { __args: {input: FileVersionCreateFallbackInput} })
    /** Delete a version from the file */
    fileVersionDelete?: { __args: {id: Scalars['ID']} }
    /** Create optimized variants for a FileVersion. Returns a FileVersionOptimizeJob if the job is queued. */
    fileVersionOptimize?: (FileVersionOptimizeJobGenqlSelection & { __args: {id: Scalars['ID']} })
    /** @deprecated use fileVariantsSync */
    fileVersionOptimizedVariantsSync?: (FileVariantGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Restore the current file to the specific version ( also increment the version ) */
    fileVersionRestore?: (FileGenqlSelection & { __args: {fileVersionId: Scalars['ID'], fileId: Scalars['ID']} })
    /** Update tags for file version */
    fileVersionTagsUpdate?: { __args: {tags: Scalars['String'][], id: Scalars['ID']} }
    /** Create a new folder. */
    folderCreate?: (FolderGenqlSelection & { __args: {input: CreateFolderInput} })
    /** Delete an existing folder by its id. */
    folderDelete?: { __args: {id: Scalars['ID']} }
    /** Rename folder */
    folderRename?: (FolderGenqlSelection & { __args: {input: FolderRenameInput, id: Scalars['ID']} })
    /** Create a Braintree subscription for the next plan (pricingId) */
    inlineCheckoutBraintreeSubscriptionCreate?: { __args: {input: InlineCheckoutBraintreeSubscriptionCreateInput} }
    inlineCheckoutSetupIntentCreate?: (InlineCheckoutSetupIntentCreatePayloadGenqlSelection & { __args: {input: InlineCheckoutSetupIntentCreateInput} })
    inlineCheckoutStripeSubscriptionCreate?: { __args: {input: InlineCheckoutStripeSubscriptionCreateInput} }
    /** Retrieve the download link for an invoice. */
    invoiceDownloadLinkCreate?: { __args: {id: Scalars['ID']} }
    /** Optimize a a given lottie json payload, returns a temporary url for the optimized file */
    lottieJsonOptimize?: { __args: {input: LottieJsonOptimizeInput} }
    /** Create a new lottie mockup */
    createLottieMockup?: (LottieMockupGenqlSelection & { __args: {input: LottieMockupCreateInput} })
    /** Delete a lottie mockup using lottie mockup id */
    deleteLottieMockup?: { __args: {id: Scalars['ID']} }
    /** Get S3 presigned background upload URL */
    getBackgroundUploadPresignedData?: (BackgroundImageObjectGenqlSelection & { __args: {filename: Scalars['String'], animationId: Scalars['ID']} })
    fileNotificationsSubscribe?: { __args: {fileId: Scalars['ID']} }
    fileNotificationsUnsubscribe?: { __args: {fileId: Scalars['ID']} }
    /** Update the current onboarding checlist of the logged in user */
    updateUserOnboardingChecklist?: (OnboardingChecklistObjectGenqlSelection & { __args: {input: UpdateOnboardingChecklistInput} })
    /** Update the current onboarding of the logged in user */
    updateUserOnboarding?: (OnboardingV2ObjectGenqlSelection & { __args: {input: UpdateOnboardingV2Input} })
    editorFileEditCountIncrement?: { __args: {input: CreateEditorFileEditCounterInput} }
    /** Create a payment intent for new/renew subscription to get the checkout session token */
    paymentIntentCreate?: (PaymentIntentTokenGenqlSelection & { __args: {input: PaymentIntentInput} })
    /** Create payment intent for accepting workspace member requests and return the checkout session token */
    paymentIntentCreateForAcceptingMemberRequest?: (PaymentIntentTokenGenqlSelection & { __args: {workspaceInvitationId: Scalars['String']} })
    /** Create payment intent for renewing workspace subscription and return the checkout session token */
    paymentIntentCreateForRenewSubscription?: (PaymentIntentTokenGenqlSelection & { __args: {workspaceId: Scalars['String']} })
    /** Create a payment intent for adding seats for resources like animations */
    paymentIntentCreateForResourceSeats?: (PaymentIntentTokenGenqlSelection & { __args: {input: PaymentIntentAddSeatsForResourceInput} })
    /** Create a payment intent for adding seats to the workspace to get the checkout session token */
    paymentIntentCreateForSeats?: (PaymentIntentTokenGenqlSelection & { __args: {input: PaymentIntentAddSeatsInput} })
    paymentMethodInvoicePaymentAttempt?: (InvoicePaymentAttemptPayloadGenqlSelection & { __args: {paymentMethodId?: (Scalars['String'] | null), workspaceId: Scalars['String']} })
    paymentMethodSetDefault?: (PaymentMethodGenqlSelection & { __args: {paymentMethodId: Scalars['String'], workspaceId: Scalars['String']} })
    paymentMethodSetup?: (PaymentMethodSetupPayloadGenqlSelection & { __args: {workspaceId: Scalars['String']} })
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * remove play segment from file version
     */
    playSegmentRemove?: (FileVersionGenqlSelection & { __args: {playSegmentId: Scalars['ID'], fileVersionId: Scalars['ID']} })
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * add or update play segment to a file version
     */
    playSegmentUpsert?: (FileVersionGenqlSelection & { __args: {input: PlaySegmentInput, fileVersionId: Scalars['ID']} })
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * clear all play segments from version
     */
    playSegmentsClear?: (FileVersionGenqlSelection & { __args: {fileVersionId: Scalars['ID']} })
    /**
     * @deprecated This mutation is a noop. Upload a new version or a new file instead.
     * copy play segment from one file version to another
     */
    playSegmentsCopy?: (FileVersionGenqlSelection & { __args: {playSegmentId?: (Scalars['ID'] | null), toFileVersionId: Scalars['ID'], fromFileVersionId: Scalars['ID']} })
    /** Get S3 presigned image upload URL */
    portfolioImageUploadPresignedData?: (PortfolioImageUploadObjectGenqlSelection & { __args: {filename: Scalars['String'], workspaceId: Scalars['String']} })
    portfolioPostCreate?: (PortfolioPostGenqlSelection & { __args: {input: PortfolioPostInput} })
    portfolioPostDelete?: { __args: {id: Scalars['ID']} }
    portfolioPostPublish?: (PortfolioPostGenqlSelection & { __args: {isPublished: Scalars['Boolean'], id: Scalars['ID']} })
    portfolioPostUpdate?: (PortfolioPostGenqlSelection & { __args: {id: Scalars['ID'], input: PortfolioPostUpdateInput} })
    /** Get S3 presigned icon upload URL */
    portfolioIconUploadPresignedData?: (PortfolioIconUploadObjectGenqlSelection & { __args: {filename: Scalars['String'], workspaceId: Scalars['String']} })
    workspacePortfolioUpdate?: (WorkspacePortfolioGenqlSelection & { __args: {input: WorkspacePortfolioInput} })
    premiumAssetGenerateDownloadLink?: (PremiumAssetDownloadLinkGenqlSelection & { __args: {uuid: Scalars['ID']} })
    privateShareAccept?: (PrivateShareGenqlSelection & { __args: {invitationCode: Scalars['String']} })
    /** Add user to resource */
    privateShareInviteUser?: (PrivateShareGenqlSelection & { __args: {input: SharedResourceInput} })
    /** Re-invite user to private share */
    privateShareReInviteUser?: (PrivateShareGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Update user access to the shared resource */
    privateShareSetPermission?: (PrivateShareGenqlSelection & { __args: {access: Scalars['String'], id: Scalars['ID']} })
    /** Create a draft project if draft workspace does not already exist */
    draftProjectCreate?: (ProjectGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Create a new project. */
    projectCreate?: (ProjectGenqlSelection & { __args: {input: ProjectCreateInput} })
    /** Delete an existing project by its id. */
    projectDelete?: { __args: {id: Scalars['ID']} }
    /** Modify an existing project by its id. */
    projectUpdate?: (ProjectGenqlSelection & { __args: {input: ProjectUpdateInput, id: Scalars['ID']} })
    /** Update the project access to workspace. */
    projectUpdatePermission?: (ProjectGenqlSelection & { __args: {isPrivate: Scalars['Boolean'], id: Scalars['ID']} })
    /** Extend public asset link expiry */
    publicAssetExtendExpiry?: (PublicAssetGenqlSelection & { __args: {publicAssetId: Scalars['ID']} })
    /** Re-generate public asset link */
    publicAssetRegenerate?: (PublicAssetGenqlSelection & { __args: {publicAssetId: Scalars['ID']} })
    /** Restore public asset link to a different workflow file version */
    publicAssetRestore?: (PublicAssetGenqlSelection & { __args: {input: PublicAssetRestoreInput} })
    /** Publish public asset link for a workflow file version */
    publicAssetUpdate?: (PublicAssetGenqlSelection & { __args: {input: PublicAssetUpdateInput} })
    publicShareCreate?: (PublicShareGenqlSelection & { __args: {input?: (PublicShareCreateInput | null), access: Scalars['String'][], resourceType: PublicShareType, resourceId: Scalars['ID']} })
    /** Generate public link for a given file key */
    publicShareCreateForFileKey?: (PublicShareGenqlSelection & { __args: {fileKey: Scalars['String']} })
    /** Purges the recently deleted entry. */
    recentlyDeletedPurge?: { __args: {input: RecentlyDeletedPurgeInput} }
    /** Purges all the recently deleted entries for the given workspace. */
    recentlyDeletedPurgeAll?: { __args: {workspaceId: Scalars['ID']} }
    /** Deletes the recently deleted entry. */
    recentlyDeletedPurgeMultiple?: { __args: {input: RecentlyDeletedPurgeMultipleInput} }
    /** Restores the recently deleted entry. */
    recentlyDeletedRestore?: { __args: {input: RecentlyDeletedRestoreInput} }
    /** Create a source file */
    sourceFileCreate?: (SourceFileGenqlSelection & { __args: {input: SourceFileCreateInput} })
    /** Find source files by file version id */
    sourceFileDelete?: { __args: {id: Scalars['ID']} }
    /** Update source file */
    sourceFileUpdate?: (SourceFileGenqlSelection & { __args: {input: SourceFileCreateInput, id: Scalars['ID']} })
    /** Join a suggested workspace */
    suggestedWorkspaceCancelJoinRequest?: (SuggestedWorkspaceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Join a suggested workspace */
    suggestedWorkspaceJoin?: (SuggestedWorkspaceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Remove a suggested workspace from the list show to the user */
    suggestedWorkspaceRemove?: { __args: {id: Scalars['ID']} }
    /** Convert video to lottie, return task_id */
    videoToLottie?: { __args: {key: Scalars['String']} }
    /** Get converted lottie (from video) with taskId */
    videoToLottieConverted?: (FileUploadRequestStatusGenqlSelection & { __args: {taskId: Scalars['String'], input?: (CreateUploadRequestInput | null)} })
    /** Update the current workspace of the logged in user. If no workspace exists, a new workspace setting will be created. */
    updateCurrentWorkspace?: (WorkspaceGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /**
     * @deprecated This mutation is deprecated and will be removed in near future, use `updateUserOnboarding` instead
     * Update the current onboarding of the logged in user
     */
    updateUserOnboardingStatus?: (OnboardingObjectGenqlSelection & { __args: {input: UpdateOnboardingInput} })
    workflowTempFileUploadRequestCreate?: (WorkflowTempFilePreSignedUploadRequestGenqlSelection & { __args: {filename: Scalars['String']} })
    /** Update the collection access to workspace. */
    collectionUpdatePermission?: (WorkspaceCollectionGenqlSelection & { __args: {isPrivate: Scalars['Boolean'], id: Scalars['ID']} })
    /** Add animations to a workspace collection. */
    workspaceCollectionAddFiles?: (WorkspaceCollectionGenqlSelection & { __args: {fileIds: Scalars['ID'][], id: Scalars['ID']} })
    /** Create a new workspace collection. */
    workspaceCollectionCreate?: (WorkspaceCollectionGenqlSelection & { __args: {input: WorkspaceCollectionCreateInput} })
    /** Delete an existing workspace collection by its id. */
    workspaceCollectionDelete?: { __args: {id: Scalars['ID']} }
    /** Add animations to a workspace collection. */
    workspaceCollectionRemoveFiles?: (WorkspaceCollectionGenqlSelection & { __args: {fileIds: Scalars['ID'][], id: Scalars['ID']} })
    /** Modify an existing collection by its id. */
    workspaceCollectionUpdate?: (WorkspaceCollectionGenqlSelection & { __args: {input: WorkspaceCollectionUpdateInput, id: Scalars['ID']} })
    workspaceColorPaletteCreate?: (WorkspaceColorPaletteGenqlSelection & { __args: {input: CreateWorkspaceColorPaletteInput} })
    workspaceColorPaletteDelete?: { __args: {id: Scalars['ID']} }
    workspaceColorPaletteUpdate?: (WorkspaceColorPaletteGenqlSelection & { __args: {input: UpdateWorkspaceColorPaletteInput, id: Scalars['ID']} })
    /** Invite user to workspace if the invitation code is valid */
    workspaceInvitationLinkAccept?: (WorkspaceMemberGenqlSelection & { __args: {invitationCode: Scalars['String']} })
    /** Regenerate workspace invitation link */
    workspaceInvitationLinkRegenerate?: (WorkspaceInvitationLinkGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Update workspace invitation link. If not workspace invitation link exists, a new link will be created */
    workspaceInvitationLinkUpdate?: (WorkspaceInvitationLinkGenqlSelection & { __args: {isActive: Scalars['Boolean'], canInviteMembers: Scalars['Boolean'], workspaceId: Scalars['ID']} })
    workspaceOwnershipTransferRequestAccept?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {transferId: Scalars['ID']} })
    workspaceOwnershipTransferRequestCancel?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {transferId: Scalars['ID']} })
    workspaceOwnershipTransferRequestCreate?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {newOwnerId: Scalars['ID'], workspaceId: Scalars['ID']} })
    workspaceOwnershipTransferRequestDecline?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {transferId: Scalars['ID']} })
    workspaceOwnershipTransferRequestResend?: (WorkspaceOwnershipTransferGenqlSelection & { __args: {transferId: Scalars['ID']} })
    /** Get S3 presigned icon upload URL */
    getIconUploadPresignedData?: (WorkspaceIconUploadObjectGenqlSelection & { __args: {filename: Scalars['String'], workspaceId: Scalars['String']} })
    /** Get user's draft workspace. Create a draft workspace if existing draft workspace doesn't exist. */
    getOrCreateDraftWorkspace?: WorkspaceGenqlSelection
    /** Upload initial animation to the workspace. */
    initialAnimationUpload?: { __args: {input: InitialAnimationUploadInput} }
    /** Determine if it's the user's first attempt at login, and if so, set-up the workspace. */
    setupInitialWorkspace?: WorkspaceGenqlSelection
    /** Create a new workspace. */
    workspaceCreate?: (WorkspaceGenqlSelection & { __args: {icon?: (Scalars['String'] | null), name: Scalars['String']} })
    /** Delete a workspace. This will delete all of the workspace's projects, invitations, and subscriptions. */
    workspaceDelete?: (WorkspaceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Leave a workspace. This will remove all your permissions from the workspace and remove any associated settings. */
    workspaceLeave?: (WorkspaceGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Request to join a workspace */
    workspaceRequestJoin?: (WorkspaceMemberGenqlSelection & { __args: {preferApproval?: (Scalars['Boolean'] | null), workspaceId: Scalars['ID']} })
    /** Cancel request to join a workspace */
    workspaceRequestJoinCancel?: (WorkspaceGenqlSelection & { __args: {workspaceId: Scalars['ID']} })
    /** Transfer ownership to new user in the workspace */
    workspaceTransferOwnership?: { __args: {userId: Scalars['String'], id: Scalars['String']} }
    /** Update workspace settings by ID */
    workspaceUpdate?: (WorkspaceGenqlSelection & { __args: {input: WorkspaceInput, id: Scalars['ID']} })
    /** Update settings of a workspace */
    workspaceSettingsUpdate?: (WorkspaceSettingsGenqlSelection & { __args: {input: WorkspaceSettingsUpdateInput, id: Scalars['ID']} })
    /** Applies a discount to a failed invoice for a subscription */
    workspaceSubscriptionApplyDiscount?: { __args: {input: ApplyDiscountInput} }
    /** Cancels current active subscription of the given workspace. */
    workspaceSubscriptionCancel?: { __args: {input: SubscriptionCancelInput} }
    /** Cancel trial plan of the given workspace. */
    workspaceSubscriptionCancelTrial?: { __args: {workspaceId: Scalars['String']} }
    /** Marks the subscription active if it is marked for cancellation. */
    workspaceSubscriptionContinue?: { __args: {id: Scalars['String']} }
    /** Create a stripe checkout session to a workspace and returns the session if the payment provider is stripe, for the case of paypal it returns success if the subscription is created. */
    workspaceSubscriptionCreateCheckoutSession?: { __args: {input: WorkspaceSubscriptionCheckoutSessionInput} }
    /** Create a stripe checkout session to a workspace and returns the session. */
    workspaceSubscriptionCreateCheckoutSessionForEmbed?: (CheckoutObjectGenqlSelection & { __args: {input: WorkspaceSubscriptionCheckoutForEmbedInput} })
    /** Get the client token for braintree */
    workspaceSubscriptionGetClientToken?: boolean | number
    /** Upgrades current active subscription of the given workspace to the next one. */
    workspaceSubscriptionUpgrade?: { __args: {input: WorkspaceSubscriptionUpgradeInput} }
    zipFileCreate?: (ZipFileGenqlSelection & { __args: {input: ZipFileCreateInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrganizationSsoLoginGenqlSelection{
    /** The organization name */
    name?: boolean | number
    /** The sso login url */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LookupSecretGenqlSelection{
    /** The recovery code strings */
    codes?: boolean | number
    /** The result status of the requested action */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TotpLinkGenqlSelection{
    flowId?: boolean | number
    totpCode?: boolean | number
    totpImage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocaleListingGenqlSelection{
    locales?: LocaleGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocaleGenqlSelection{
    code?: boolean | number
    fallbackCode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ViewerNotificationPreferenceGenqlSelection{
    /** The notification preference configs */
    preference?: NotificationPreferenceGenqlSelection
    /** The notification preference template info */
    template?: NotificationTemplateGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationPreferenceGenqlSelection{
    /** The specific channels that are enabled or not */
    channels?: NotificationChannelGenqlSelection
    /** All channels will be turned off if false, regardless of individual channels options */
    enabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationChannelGenqlSelection{
    /** Is chat channel enabled */
    chat?: boolean | number
    /** Is email channel enabled */
    email?: boolean | number
    /** Is inApp channel enabled */
    inApp?: boolean | number
    /** Is push channel enabled */
    push?: boolean | number
    /** Is sms channel enabled */
    sms?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationTemplateGenqlSelection{
    /** User will not be able to disable notification if true */
    critical?: boolean | number
    /** The description of the notification template */
    description?: boolean | number
    /** The id of the notification template */
    id?: boolean | number
    /** The name of the notification template */
    name?: boolean | number
    /** The notification template group info */
    notificationGroup?: NotificationGroupGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationGroupGenqlSelection{
    /** The id of the notification group */
    id?: boolean | number
    /** The name of the notification group */
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OAuthConsentRequestGenqlSelection{
    /** The name of the OAuth client that's requesting for consent. */
    clientName?: boolean | number
    /** If skip is true, the client must redirect to this URL. */
    redirectToURL?: boolean | number
    /** The scopes requested for user consent. Will not be returned if skip is `true`. */
    scopes?: OAuthConsentRequestScopeGenqlSelection
    /** If true, you must redirect to the URL in the `redirectToURL` field. */
    skip?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OAuthConsentRequestScopeGenqlSelection{
    /** The description of the scope. */
    description?: boolean | number
    /** The ID of the scope. */
    id?: boolean | number
    /** The OAuth scope. */
    scope?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OAuthLoginRequestGenqlSelection{
    /** If skip is true, the client must redirect to this URL. */
    redirectToURL?: boolean | number
    /** If true, you must redirect to the URL in the `redirectToURL` field. */
    skip?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSegmentListingGenqlSelection{
    segments?: UserSegmentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSegmentGenqlSelection{
    description?: boolean | number
    id?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserGenqlSelection{
    /** The date/time when the user authenticated the current session. */
    authenticatedAt?: boolean | number
    /** The user's profile picture. */
    avatarUrl?: boolean | number
    /** The user's Behance username. */
    behanceUsername?: boolean | number
    /** The user's short Bio. */
    bio?: boolean | number
    /** The user's City of residence. */
    city?: boolean | number
    /** The user's Country of residence. */
    country?: boolean | number
    /** The date/time of account creation. */
    createdAt?: boolean | number
    /** The user's Dribbble username. */
    dribbbleUsername?: boolean | number
    /** The user's email address. */
    email?: boolean | number
    /** True if the user's current email address has been verified. */
    emailVerified?: boolean | number
    /** True if the user has agreed to receive marketing emails. */
    enableMarketingEmails?: boolean | number
    /** The internal id of the enterprise org if the user has an e-sso session. */
    enterpriseOrgId?: boolean | number
    /** The user's first name. */
    firstName?: boolean | number
    /** The user's Github username. */
    githubUsername?: boolean | number
    /** The user's LottieFiles account's unique ID. */
    id?: boolean | number
    /** The user's Instagram username. */
    instagramUsername?: boolean | number
    /** True if the user is available for work. */
    isHireable?: boolean | number
    /** True if it's a service account. */
    isServiceAccount?: boolean | number
    /** The city where the user last logged in from. */
    lastLoggedInFromCity?: boolean | number
    /** The country where the user last logged in from. */
    lastLoggedInFromCountry?: boolean | number
    /** The timezone where the user last logged in from. */
    lastLoggedInTimezone?: boolean | number
    /** The user's last name. */
    lastName?: boolean | number
    /** The user's Linkedin username. */
    linkedinUsername?: boolean | number
    /** The user's locale code. */
    locale?: boolean | number
    /** The user's Twitter username. */
    twitterUsername?: boolean | number
    /** If the user is ongoing an email change process, this is the new email that the user is changing to. Otherwise it will be `null`. */
    unconfirmedNewEmail?: boolean | number
    /** The date/time of last account update. */
    updatedAt?: boolean | number
    /** The segments this user belongs to. */
    userSegments?: UserSegmentGenqlSelection
    /** The user's personal website. */
    website?: boolean | number
    hasSlackNotificationEnabled?: boolean | number
    /** @deprecated Legacy field, will always return false. */
    isPro?: boolean | number
    /** For use in the internal migration process. It will contain the ID of the user in the legacy WEB DB if the user is migrated. Otherwise, it will return an INT hashed from the user's Kratos ID. */
    legacyWebUserId?: boolean | number
    /** @deprecated Use `city` instead. */
    location?: boolean | number
    /** @deprecated Use `firstName` instead. */
    name?: boolean | number
    /** @deprecated Use `username` instead. */
    url?: boolean | number
    /** The user's unique username. */
    username?: boolean | number
    publicAnimations?: (PublicAnimationConnectionGenqlSelection & { __args?: {after?: (Scalars['String'] | null), first?: (Scalars['Int'] | null), before?: (Scalars['String'] | null), last?: (Scalars['Int'] | null), input?: (PublicAnimationStatusFilterTypeInput | null)} })
    stats?: UserStatsGenqlSelection
    achievements?: (UserAchievementConnectionGenqlSelection & { __args?: {after?: (Scalars['String'] | null), first?: (Scalars['Int'] | null), before?: (Scalars['String'] | null), last?: (Scalars['Int'] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ViewerCredentialGenqlSelection{
    /** Additional information on the credential. If enterprise sso then it will be the name of the organization */
    description?: boolean | number
    /** Internal ID of the organization for the credential, if available. */
    orgInternalId?: boolean | number
    /** The type of the credential. */
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LoginTokenGenqlSelection{
    /** The URL to direct the user to in order to conclude the token login. */
    loginUrl?: boolean | number
    /** The token to use with the tokenLogin mutation. */
    token?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthenticationGenqlSelection{
    /** The token to include in future requests to this API. */
    accessToken?: boolean | number
    /** Indicates whether an additional MFA step is required */
    additionalAuthRequired?: boolean | number
    /** The ISO Date string in the format "2022-12-06T13:33:08.000Z". */
    expiresAt?: boolean | number
    /** If this is not null, the client must redirect to this URL. */
    redirectToURL?: boolean | number
    /** Returned only from the `socialLogin` mutation. Will be true if a LottieFiles account was created in the `socialLogin`. */
    socialLoginAccountCreated?: boolean | number
    /** The token type, e.g. "Bearer". */
    tokenType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationPreferenceUpdateInput {
/** The channel to be enabled */
channel: NotificationChannelType,
/** To enable notification preference */
enabled: Scalars['Boolean'],
/** The ID of the notification template */
templateId: Scalars['String']}

export interface DirectoryUserGenqlSelection{
    /** The id of the directory user */
    directoryUserId?: boolean | number
    /** The email of the directory user */
    email?: boolean | number
    /** The Kratos user id of the directory user */
    kratosUserId?: boolean | number
    /** The organization id that the directory user belongs to */
    organizationId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserProfilePhotoUploadGenqlSelection{
    filename?: boolean | number
    signedUrl?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OffboardingQuestionInput {answer: Scalars['String'],question: Scalars['String']}

export interface AnimationReportInput {animationId: Scalars['Int'],body?: (Scalars['String'] | null),complaintType: ComplaintType,url?: (Scalars['String'] | null)}

export interface AnimatorGenqlSelection{
    avatarUrl?: boolean | number
    id?: boolean | number
    name?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AnimationFilter {canvaCompatible?: (Scalars['Boolean'] | null),creatorCompatible?: (Scalars['Boolean'] | null),hash?: (Scalars['String'] | null)}

export interface PublicAnimationCreateInput {bgColor?: (Scalars['String'] | null),credits?: (Scalars['String'][] | null),description?: (Scalars['String'] | null),name: Scalars['String'],requestId: Scalars['String'],scale?: (Scalars['Float'] | null),tags: Scalars['String'][],tools?: (Scalars['String'][] | null),workflowFileId?: (Scalars['String'] | null)}

export interface PublicAnimationUploadRequestCreateInput {type: PublicAnimationUploadRequestFileType,filename: Scalars['String']}

export interface AnimatorConnectionGenqlSelection{
    /** A list edges. */
    edges?: AnimatorEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AnimatorEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: AnimatorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BlogGenqlSelection{
    category?: BlogCategoryGenqlSelection
    createdAt?: boolean | number
    id?: boolean | number
    imageUrl?: boolean | number
    link?: boolean | number
    postedAt?: boolean | number
    slug?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BlogCategoryGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BlogConnectionGenqlSelection{
    /** A list edges. */
    edges?: BlogEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BlogEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: BlogGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionAnimationPreviewGenqlSelection{
    image?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionAnimationTypeInput {animationType?: (CollectionAnimationType | null)}

export interface CollectionInput {title: Scalars['String'],type?: (CollectionType | null)}

export interface ColorGenqlSelection{
    hex?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ColorPaletteGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    palette?: ColorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ColorPaletteConnectionGenqlSelection{
    /** A list edges. */
    edges?: ColorPaletteEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ColorPaletteEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: ColorPaletteGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentInput {content: Scalars['String'],frame: Scalars['Int'],marker?: (Scalars['String'] | null)}

export interface HireRequestInput {brief: Scalars['String'],contractType: ContractType,deadlineAt: Scalars['DateTime'],shouldCopyEmail: Scalars['Boolean'],subject: Scalars['String'],userId: Scalars['ID']}

export interface HitCountEventGenqlSelection{
    errors?: boolean | number
    message?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HitCountEventInput {ip?: (Scalars['String'] | null),method: Scalars['Int'],source?: (Scalars['Int'] | null),userId?: (Scalars['ID'] | null),visitorId?: (Scalars['ID'] | null)}

export interface NotificationGenqlSelection{
    link?: boolean | number
    message?: boolean | number
    theme?: ThemeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PageInfoGenqlSelection{
    /** When paginating forwards, the cursor to continue. */
    endCursor?: boolean | number
    /** When paginating forwards, are there more items?. */
    hasNextPage?: boolean | number
    /** When paginating backwards, are there more items?. */
    hasPreviousPage?: boolean | number
    /** When paginating backwards, the cursor to continue. */
    startCursor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationGenqlSelection{
    bgColor?: boolean | number
    comments?: PublicCommentGenqlSelection
    commentsCount?: boolean | number
    createdAt?: boolean | number
    createdByUserId?: boolean | number
    description?: boolean | number
    downloads?: boolean | number
    dotlottieFormatVersion?: boolean | number
    gifFileSize?: boolean | number
    gifUrl?: boolean | number
    id?: boolean | number
    imageFileSize?: boolean | number
    imageFrame?: boolean | number
    imageUrl?: boolean | number
    isLiked?: boolean | number
    likesCount?: boolean | number
    lottieFileSize?: boolean | number
    lottieFileType?: boolean | number
    lottieUrl?: boolean | number
    jsonUrl?: boolean | number
    lottieVersion?: boolean | number
    name?: boolean | number
    publishedAt?: boolean | number
    slug?: boolean | number
    sourceFileName?: boolean | number
    sourceFileSize?: boolean | number
    sourceFileType?: boolean | number
    sourceFileUrl?: boolean | number
    sourceName?: boolean | number
    sourceVersion?: boolean | number
    speed?: boolean | number
    status?: boolean | number
    updatedAt?: boolean | number
    url?: boolean | number
    uuid?: boolean | number
    videoFileSize?: boolean | number
    videoUrl?: boolean | number
    isCanvaCompatible?: boolean | number
    frameRate?: boolean | number
    createdBy?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationConnectionGenqlSelection{
    /** A list edges. */
    edges?: PublicAnimationEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationDeleteResponseGenqlSelection{
    message?: boolean | number
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PublicAnimationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationUploadRequestGenqlSelection{
    contentType?: boolean | number
    fields?: boolean | number
    id?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationStatusFilterTypeInput {statusFilterType?: (PublicAnimationStatusFilterType | null)}

export interface PublicAnimationTagGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationTagConnectionGenqlSelection{
    /** A list of edges. */
    edges?: PublicAnimationTagEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAnimationTagEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PublicAnimationTagGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicCollectionGenqlSelection{
    animationType?: boolean | number
    animationsCount?: boolean | number
    collectionAnimationPreviews?: CollectionAnimationPreviewGenqlSelection
    createdByUserId?: boolean | number
    description?: boolean | number
    id?: boolean | number
    imageUrl?: boolean | number
    slug?: boolean | number
    title?: boolean | number
    type?: boolean | number
    url?: boolean | number
    createdBy?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicCollectionConnectionGenqlSelection{
    /** A list edges. */
    edges?: PublicCollectionEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicCollectionEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PublicCollectionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicCommentGenqlSelection{
    content?: boolean | number
    createdAt?: boolean | number
    frame?: boolean | number
    id?: boolean | number
    isResolved?: boolean | number
    marker?: boolean | number
    parentId?: boolean | number
    replies?: PublicCommentGenqlSelection
    updatedAt?: boolean | number
    userId?: boolean | number
    user?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SoftwareUpdateGenqlSelection{
    autoUpdate?: boolean | number
    changelog?: boolean | number
    downloadUrl?: boolean | number
    forceUpdate?: boolean | number
    infoUrl?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThemeGenqlSelection{
    dark?: ThemeColorGenqlSelection
    light?: ThemeColorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThemeColorGenqlSelection{
    bgColor?: boolean | number
    icon?: boolean | number
    textColor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrendingItemGenqlSelection{
    link?: boolean | number
    rank?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserAchievementGenqlSelection{
    completed?: boolean | number
    count?: boolean | number
    goal?: boolean | number
    progressMessage?: boolean | number
    title?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserAchievementConnectionGenqlSelection{
    /** A list edges. */
    edges?: UserAchievementEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserAchievementEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: UserAchievementGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserStatGraphDataGenqlSelection{
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserStatsGenqlSelection{
    downloadGraph?: UserStatGraphDataGenqlSelection
    downloads?: boolean | number
    downloadsLastMonth?: boolean | number
    likeGraph?: UserStatGraphDataGenqlSelection
    likes?: boolean | number
    likesLastMonth?: boolean | number
    profileGraph?: UserStatGraphDataGenqlSelection
    profileViews?: boolean | number
    profileViewsLastMonth?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionGenqlSelection{
    /** Subscribe to FileAssetEvents */
    fileAssetEvents?: (FileAssetEventGenqlSelection & { __args: {key: Scalars['String']} })
    /** Subscribe to File Update events */
    fileUpdate?: (FileObjectGenqlSelection & { __args: {key: Scalars['String']} })
    /** Subscribe to File Variation Update events */
    fileVariationUpdate?: (FileVariationGenqlSelection & { __args: {key: Scalars['String']} })
    zipFileUpdate?: (ZipFileObjectGenqlSelection & { __args: {key: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AttributesGenqlSelection{
    /** Size of the uploaded file */
    contentLength?: boolean | number
    /** Type of uploaded file */
    contentType?: boolean | number
    /** S3 Version Id */
    s3VersionId?: boolean | number
    /** Format version */
    formatVersion?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VariationMetadataGenqlSelection{
    /** Previvew Height */
    height?: boolean | number
    /** Preview Width */
    width?: boolean | number
    /** Preview Background Color */
    bgColor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVariationGenqlSelection{
    /** Unique ID of file variation */
    id?: boolean | number
    /** File Key for the source file  */
    fileKey?: boolean | number
    /** File Version Id of the source file */
    fileVersionId?: boolean | number
    /** Unique filename of the variantion */
    filename?: boolean | number
    /** Url of the file variation */
    url?: boolean | number
    /** Attributes generated */
    attributes?: AttributesGenqlSelection
    /** Metadata for file variation */
    metadata?: VariationMetadataGenqlSelection
    /** Type of variation. */
    type?: boolean | number
    /** Created defaultValue */
    createdAt?: boolean | number
    /** Status of file variation */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MetadataGenqlSelection{
    /** Colors */
    colors?: boolean | number
    /** Lottie Colors */
    lottieColors?: boolean | number
    /** No. of frames */
    frames?: boolean | number
    /** Frame Rate */
    frameRate?: boolean | number
    /** Lottie Height */
    height?: boolean | number
    /** Lottie Width */
    width?: boolean | number
    /** Lottie Start Frame */
    inPoint?: boolean | number
    /** Lottie Outpoint */
    outPoint?: boolean | number
    /** Lottie Version */
    version?: boolean | number
    /** Lottie Generator */
    generator?: boolean | number
    /** No of Layers */
    layers?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** File */
export interface FileObjectRegenerateGenqlSelection{
    /** Unique file key for a file */
    key?: boolean | number
    /** Version ID for a file */
    versionId?: boolean | number
    /** Subversion ID for a file. If it is a main version (i.e. not a subversion), it will be "0". */
    subVersionId?: boolean | number
    /** Uniquely generated filename */
    filename?: boolean | number
    /** The url to uploaded  file */
    url?: boolean | number
    /** Attributes generated */
    attributes?: AttributesGenqlSelection
    metadata?: MetadataGenqlSelection
    /** The job id of thumbnails */
    thumbnailJobId?: boolean | number
    /** Thumbanils generated */
    contents?: boolean | number
    /** File variations */
    fileVariations?: FileVariationGenqlSelection
    /** Created Date */
    createdAt?: boolean | number
    /** Updated Date */
    updatedAt?: boolean | number
    /** Updated Date */
    deletedAt?: boolean | number
    /** Updated Date */
    cleanedAt?: boolean | number
    /** Status of uploaded file */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PreviewContentGenqlSelection{
    /** Url of thumbnail */
    url?: boolean | number
    /** Version Id */
    versionId?: boolean | number
    /** Content Type */
    contentType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PreviewSizeGenqlSelection{
    /** Size small */
    small?: PreviewContentGenqlSelection
    /** Size medium  */
    medium?: PreviewContentGenqlSelection
    /** Size large */
    large?: PreviewContentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PreviewGenqlSelection{
    /** Png */
    webp?: PreviewSizeGenqlSelection
    /** Webp */
    gif?: PreviewSizeGenqlSelection
    /** Mp4 */
    mp4?: PreviewSizeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThumbnailContentGenqlSelection{
    /** Url of thumbnail */
    url?: boolean | number
    /** Version Id */
    s3VersionId?: boolean | number
    /** Content Type */
    contentType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThumbnailSizeGenqlSelection{
    /** Size small */
    small?: ThumbnailContentGenqlSelection
    /** Size medium  */
    medium?: ThumbnailContentGenqlSelection
    /** Size large */
    large?: ThumbnailContentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThumbnailGenqlSelection{
    /** Png */
    png?: ThumbnailSizeGenqlSelection
    /** Webp */
    webp?: ThumbnailSizeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** File */
export interface FileObjectGenqlSelection{
    /** Unique file key for a file */
    key?: boolean | number
    /** Version ID for a file */
    versionId?: boolean | number
    /** Subversion ID for a file. If it is a main version (i.e. not a subversion), it will be "0". */
    subVersionId?: boolean | number
    /** Uniquely generated filename */
    filename?: boolean | number
    /** The url to uploaded  file */
    url?: boolean | number
    /** Attributes generated */
    attributes?: AttributesGenqlSelection
    metadata?: MetadataGenqlSelection
    thumbnails?: ThumbnailGenqlSelection
    /** Previews  generated */
    previews?: PreviewGenqlSelection
    /** Thumbanils generated */
    contents?: boolean | number
    /** File variations */
    fileVariations?: FileVariationGenqlSelection
    /** Created Date */
    createdAt?: boolean | number
    /** Updated Date */
    updatedAt?: boolean | number
    /** Updated Date */
    deletedAt?: boolean | number
    /** Updated Date */
    cleanedAt?: boolean | number
    /** Status of uploaded file */
    status?: boolean | number
    markers?: LottieJsonMarkerGenqlSelection
    /** The audio that are available on this file. */
    audio?: AudioAssetObjectReferenceGenqlSelection
    /** The themes that are available on this file. */
    themes?: ThemeAssetObjectReferenceGenqlSelection
    /** The images that are available on this file. */
    images?: ImageAssetObjectReferenceGenqlSelection
    /** The state machines that are available on this file. */
    stateMachines?: StateMachineAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PresignedPostGenqlSelection{
    /** Form fields used for a presigned s3 post */
    fields?: boolean | number
    /** Unique key of the file */
    key?: boolean | number
    /** Url used for a presigned s3 post */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SignedUrlGenqlSelection{
    /** Signed url expiry time */
    expires?: boolean | number
    /** Cloudfront signed url */
    signedUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FilePreviewGenerateGenqlSelection{
    /** Unique ID of file variation */
    id?: boolean | number
    /** Job Id for file preview generation process. */
    jobId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FilePreviewGenerateStatusGenqlSelection{
    /** File preview generation status */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileAssetObjectReferenceGenqlSelection{
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id?: boolean | number
    /** The Id of the FileAssetObject. */
    assetId?: boolean | number
    /** The display name of the file asset. */
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AudioAssetObjectReferenceGenqlSelection{
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id?: boolean | number
    /** The Id of the FileAssetObject. */
    assetId?: boolean | number
    /** The display name of the file asset. */
    displayName?: boolean | number
    /** The animations this audio can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface _FileOptimizationJobGenqlSelection{
    /** Job ID for optimization process */
    id?: boolean | number
    /** Status of the optimization process */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageAssetObjectReferenceGenqlSelection{
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id?: boolean | number
    /** The Id of the FileAssetObject. */
    assetId?: boolean | number
    /** The display name of the file asset. */
    displayName?: boolean | number
    /** The animations this image can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieJsonMarkerGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    comment?: boolean | number
    time?: boolean | number
    duration?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StateMachineAssetObjectReferenceGenqlSelection{
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id?: boolean | number
    /** The Id of the FileAssetObject. */
    assetId?: boolean | number
    /** The display name of the file asset. */
    displayName?: boolean | number
    /** The animations this state machine can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    /** The name of the state machine. */
    name?: boolean | number
    /** The initial or default state of the state machine */
    initial?: boolean | number
    /** The available states of the state machine */
    states?: boolean | number
    /** The available triggers of the state machine */
    triggers?: boolean | number
    /** The available listeners of the state machine */
    listeners?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThemeAssetObjectReferenceGenqlSelection{
    /** Unique identifier for referencing the FileAssetObject, compatible with @dotlottie/dotlottie-js library. */
    id?: boolean | number
    /** The Id of the FileAssetObject. */
    assetId?: boolean | number
    /** The display name of the file asset. */
    displayName?: boolean | number
    /** The animations this theme can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Zip Entry */
export interface ZipEntryObjectGenqlSelection{
    /** The file this zip entry is for */
    fileKey?: boolean | number
    /** The file version this zip entry is for */
    fileVersionId?: boolean | number
    /** The file variation this zip entry is for */
    fileVariationId?: boolean | number
    /** The filename of the zip entry within the zip file. */
    filename?: boolean | number
    /** The current status of the zip entry. */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Zip File */
export interface ZipFileObjectGenqlSelection{
    /** Unique file key for a file */
    key?: boolean | number
    /** The zip file entry type */
    type?: boolean | number
    /** Uniquely generated filename */
    filename?: boolean | number
    /** The url to uploaded  file */
    url?: boolean | number
    /** Attributes generated */
    attributes?: AttributesGenqlSelection
    /** Status of uploaded file */
    status?: boolean | number
    /** The zip entries for the zip file */
    entries?: ZipEntryObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AnimationAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The metadata of the animation. */
    metadata?: MetadataGenqlSelection
    /** The name of the animation. */
    name?: boolean | number
    /** The display name of the animation. */
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AudioAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The name of the FileAssetObject. */
    name?: boolean | number
    /** The animations that the audio can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileAssetEventGenqlSelection{
    /** The subscription key. */
    key?: boolean | number
    /** The type of the event. */
    type?: boolean | number
    /** The ID of the Blob if one was saved. */
    blobId?: boolean | number
    /** The ID of the FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the asset within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The message of the event. */
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface _FileAssetUploadRequestGenqlSelection{
    /** Form fields used for a presigned s3 post */
    fields?: boolean | number
    /** The key that should be used to subscribe to updates. */
    key?: boolean | number
    /** Url used for a presigned s3 post */
    url?: boolean | number
    /** The ID of the FileSpace the asset will be uploaded to. */
    fileSpaceId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The name of the FileAssetObject. */
    name?: boolean | number
    /** The animations that the image can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StateMachineAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The name of the FileAssetObject. */
    name?: boolean | number
    /** The animations that the state machine can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    /** The display name of the state machine. */
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThemeAssetObjectGenqlSelection{
    /** The ID of the FileAssetObject. */
    id?: boolean | number
    /** The ID of the Blob this FileAssetObject points to. */
    blobId?: boolean | number
    /** The content type of the FileAssetObject. */
    contentType?: boolean | number
    /** The content length of the FileAssetObject. */
    contentLength?: boolean | number
    /** The ID of the owning FileSpace. */
    fileSpaceId?: boolean | number
    /** The pathname of the FileAssetObject within the FileSpace. */
    pathname?: boolean | number
    /** The signed url of the FileAssetObject. */
    url?: boolean | number
    /** The name of the FileAssetObject. */
    name?: boolean | number
    /** The display name of the theme. */
    displayName?: boolean | number
    /** The animations that the theme can be applied to. */
    animations?: FileAssetObjectReferenceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface _PublicAnimationImportRequestGenqlSelection{
    key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface _FileAssetUploadRequestCreateInput {
/** The path of the asset within the FileSpace. */
pathname: Scalars['String'],
/** The ID of the FileSpace this asset belongs to. Required when type is `"update"`. */
fileSpaceId?: (Scalars['String'] | null),
/** The type of the request: Either `"new"` or `"update"`. */
type: Scalars['String']}

export interface _PublicAnimationImportRequestCreateInput {backgroundColor?: (Scalars['String'] | null),shouldGenerateThumbnails?: (Scalars['Boolean'] | null),shouldExtractMetadata?: (Scalars['Boolean'] | null),shouldOptimize?: (Scalars['Boolean'] | null),variations: _PublicAnimationVariationInput[],colorPalette?: (Scalars['String'][] | null)}

export interface _PublicAnimationVariationInput {
/** The variation path */
path: Scalars['String'],
/** The variation type */
type: Scalars['String']}

export interface _PublicAnimationImportInput {key: Scalars['String']}

export interface _ZipFileCreateInput {entries: _ZipEntryInput[],
/** Type of variation to download */
entryType?: (Scalars['String'] | null)}

export interface _ZipEntryInput {fileKey: Scalars['String'],fileVersionId: Scalars['String'],filename?: (Scalars['String'] | null)}

export interface ServiceGenqlSelection{
    name?: boolean | number
    version?: boolean | number
    /** @deprecated No schema version from schema registry */
    versionInGateway?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A raster to lottie conversion job. */
export interface RasterToLottieJobGenqlSelection{
    /** Debug information for the job. */
    debug?: boolean | number
    /** If the job failed, this will contain an error message. */
    failedReason?: boolean | number
    /** The ID of the job. */
    id?: boolean | number
    /** The size of the input file in bytes. */
    inputFileSize?: boolean | number
    /** The size of the Lottie file in bytes. */
    lottieFileSize?: boolean | number
    /** The last progress notification of the job. */
    progress?: boolean | number
    /** The start time of the job. */
    startTime?: boolean | number
    /** The status of the job. */
    status?: boolean | number
    /** The time taken to complete the job. */
    timeTaken?: boolean | number
    /** The URL of the Lottie file. */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RasterToLottieJobParams {
/** Default value: 16. */
antiAliasKernel?: (Scalars['Int'] | null),
/** Default value: 150. */
cannyHighThreshold?: (Scalars['Int'] | null),
/** Default value: 50. */
cannyLowThreshold?: (Scalars['Int'] | null),
/** Default value: false. */
convertToShape?: (Scalars['Boolean'] | null),
/** Default value: false. */
debug?: (Scalars['Boolean'] | null),
/** Default value: 60. */
edgePercentage?: (Scalars['Int'] | null),
/** Default value: 15. */
mergingDistanceThreshold?: (Scalars['Int'] | null),
/** Default value: 1.2. */
potraceAlphamax?: (Scalars['Float'] | null),
/** Default value: true. */
potraceOpticurve?: (Scalars['Boolean'] | null),
/** Default value: 0.2. */
potraceOpttolerance?: (Scalars['Float'] | null),
/** Default value: 5. */
potraceTurdsize?: (Scalars['Int'] | null),
/** Default value: 4. */
potraceTurnPolicy?: (Scalars['Int'] | null),
/** Default value: false. */
removeBackground?: (Scalars['Boolean'] | null),
/** Default value: false. */
removeHoles?: (Scalars['Boolean'] | null),
/** Default value: false. */
simplify?: (Scalars['Boolean'] | null),
/** Default value: 20. */
threshold?: (Scalars['Int'] | null),
/** Default value: 100. */
thresholdLarge?: (Scalars['Int'] | null),
/** Default value: false. */
upscale?: (Scalars['Boolean'] | null),
/** Default value: 1. */
upscaleFactor?: (Scalars['Int'] | null)}

export interface RasterToLottieUploadUrlGenqlSelection{
    /** Additional fields for the raster upload POST request. */
    fields?: boolean | number
    /** The ID of the image. */
    imageId?: boolean | number
    /** The upload URL to make a POST request with the raster file. */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberConnectionGenqlSelection{
    /** A list edges. */
    edges?: WorkspaceMemberEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: WorkspaceMemberGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    acceptedAt?: boolean | number
    access?: boolean | number
    id?: boolean | number
    invitedBy?: boolean | number
    lastSentAt?: boolean | number
    method?: boolean | number
    onboardedAt?: boolean | number
    recipientEmail?: boolean | number
    status?: boolean | number
    userId?: boolean | number
    workspaceId?: boolean | number
    /** Recipient user of the invitation */
    user?: UserObjectGenqlSelection
    /** The workspace this invitation belongs to. */
    workspace?: WorkspaceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserObjectGenqlSelection{
    avatarUrl?: boolean | number
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    billingAddressLineOne?: boolean | number
    billingAddressLineTwo?: boolean | number
    billingEmail?: boolean | number
    icon?: boolean | number
    id?: boolean | number
    name?: boolean | number
    status?: boolean | number
    url?: boolean | number
    account?: AccountGenqlSelection
    /** Indicates if the user can join the workspace instantly without approval */
    canJoinInstantly?: boolean | number
    contactSalesNotice?: ContactSalesNoticeGenqlSelection
    domains?: boolean | number
    features?: FeatureObjectGenqlSelection
    /** The owner this workspace belongs to. */
    hasOwnership?: boolean | number
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin?: boolean | number
    indexed?: boolean | number
    invitationLink?: WorkspaceInvitationLinkGenqlSelection
    /** Check if user is member of the workspace */
    isMember?: boolean | number
    /** Indicates if the workspace is organization workspace (workspace with owner of organization email domain) */
    isOrganizationWorkspace?: boolean | number
    memberIds?: boolean | number
    /** The owner this workspace belongs to. */
    owner?: UserObjectGenqlSelection
    /** Permission scopes the current user has on this workspace */
    permissionScopes?: boolean | number
    /** Check if the current user is already on boarded or not. If the user is on boarded return null, otherwise return user access level */
    requiresOnboardingAs?: boolean | number
    /** Fetch the active subscription for this workspace */
    subscription?: WorkspaceSubscriptionGenqlSelection
    members?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AccountGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    paymentMethod?: PaymentMethodGenqlSelection
    addressLineOne?: boolean | number
    addressLineTwo?: boolean | number
    city?: boolean | number
    contactEmail?: boolean | number
    contactName?: boolean | number
    country?: boolean | number
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    paymentMethodId?: boolean | number
    paymentProvider?: boolean | number
    paymentProviderCustomerId?: boolean | number
    postcode?: boolean | number
    state?: boolean | number
    taxCountry?: boolean | number
    taxId?: boolean | number
    website?: boolean | number
    /** Whether the account pays for a subscription to any workspace */
    isPaid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodGenqlSelection{
    customerId?: boolean | number
    expiresAt?: boolean | number
    id?: boolean | number
    metadata?: PaymentMethodMetadataGenqlSelection
    provider?: boolean | number
    providerPaymentMethodId?: boolean | number
    sourceType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodMetadataGenqlSelection{
    on_CardMetadata?:CardMetadataGenqlSelection,
    on_PayPalMetadata?:PayPalMetadataGenqlSelection,
    __typename?: boolean | number
}

export interface CardMetadataGenqlSelection{
    brand?: boolean | number
    expMonth?: boolean | number
    expYear?: boolean | number
    last4?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PayPalMetadataGenqlSelection{
    email?: boolean | number
    payerId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ContactSalesNoticeGenqlSelection{
    calendarLink?: boolean | number
    enabled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FeatureObjectGenqlSelection{
    currentCount?: boolean | number
    isEnabled?: boolean | number
    max?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceInvitationLinkGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    canMembersInvite?: boolean | number
    id?: boolean | number
    invitationCode?: boolean | number
    isActive?: boolean | number
    lastUpdatedById?: boolean | number
    workspaceId?: boolean | number
    /** Workspace associated with the invitation link */
    workspace?: WorkspaceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSubscriptionGenqlSelection{
    id?: boolean | number
    parentId?: boolean | number
    providerCustomerId?: boolean | number
    providerPriceId?: boolean | number
    providerId?: boolean | number
    providerType?: boolean | number
    workspaceId?: boolean | number
    workspace?: WorkspaceObjectGenqlSelection
    organizationId?: boolean | number
    organization?: OrganizationObjectGenqlSelection
    ratePlanId?: boolean | number
    ratePlan?: RatePlanObjectGenqlSelection
    planId?: boolean | number
    plan?: PlanObjectGenqlSelection
    markedForCancellation?: boolean | number
    startsAt?: boolean | number
    endsAt?: boolean | number
    gracePeriod?: boolean | number
    status?: boolean | number
    revisionNumber?: boolean | number
    numberOfSeats?: boolean | number
    lastRevisedAt?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    deletedAt?: boolean | number
    viewerProviderPriceId?: boolean | number
    viewerDownloaderProviderPriceId?: boolean | number
    viewerNumberOfSeats?: boolean | number
    viewerDownloaderNumberOfSeats?: boolean | number
    /** Shows the amount of seats already used by the workspace. */
    nextBilling?: NextBillingObjectGenqlSelection
    /** Shows the amount of seats already used by the workspace. */
    numberOfSeatsUsed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceObjectGenqlSelection{
    icon?: boolean | number
    id?: boolean | number
    name?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrganizationObjectGenqlSelection{
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RatePlanObjectGenqlSelection{
    billingCycle?: boolean | number
    currency?: boolean | number
    endsAt?: boolean | number
    id?: boolean | number
    name?: boolean | number
    price?: boolean | number
    startsAt?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlanObjectGenqlSelection{
    defaultEntitlements?: PlanEntitlementGenqlSelection
    id?: boolean | number
    isBillable?: boolean | number
    name?: boolean | number
    planPosition?: boolean | number
    status?: boolean | number
    stripeProductId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlanEntitlementGenqlSelection{
    id?: boolean | number
    max?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NextBillingObjectGenqlSelection{
    amount?: boolean | number
    currency?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberSearchConnectionGenqlSelection{
    /** A list edges. */
    edges?: WorkspaceMemberSearchEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberSearchEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: WorkspaceMemberGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogConnectionGenqlSelection{
    /** A list edges. */
    edges?: AuditLogItemEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogItemEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: AuditLogItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogItemGenqlSelection{
    action?: boolean | number
    changes?: boolean | number
    eventTime?: boolean | number
    id?: boolean | number
    ipAddress?: boolean | number
    target?: AuditLogTargetGenqlSelection
    userEmail?: boolean | number
    userId?: boolean | number
    userName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogTargetGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BillingPackagePriceGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    baseSeats?: boolean | number
    billingCycle?: boolean | number
    currency?: boolean | number
    endsAt?: boolean | number
    id?: boolean | number
    isActive?: boolean | number
    isDefault?: boolean | number
    isLocalOnly?: boolean | number
    minSeatCount?: boolean | number
    name?: boolean | number
    planId?: boolean | number
    price?: boolean | number
    startsAt?: boolean | number
    stripePriceId?: boolean | number
    type?: boolean | number
    viewerBaseSeats?: boolean | number
    viewerDownloaderBaseSeats?: boolean | number
    billingPackage?: BillingPackageGenqlSelection
    contributorPrice?: AddonPriceGenqlSelection
    viewerDownloaderPrice?: AddonPriceGenqlSelection
    viewerPrice?: AddonPriceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BillingPackageGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    defaultEntitlements?: PlanEntitlementGenqlSelection
    id?: boolean | number
    isBillable?: boolean | number
    name?: boolean | number
    planPosition?: boolean | number
    status?: boolean | number
    stripeProductId?: boolean | number
    /** Get the default active pricing for a billing package. */
    billingPackagePrice?: BillingPackagePriceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AddonPriceGenqlSelection{
    billingCycle?: boolean | number
    currency?: boolean | number
    id?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BillingPackageConnectionGenqlSelection{
    /** A list edges. */
    edges?: BillingPackageEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BillingPackageEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: BillingPackageGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CancelReasonGenqlSelection{
    createdAt?: boolean | number
    disabled?: boolean | number
    id?: boolean | number
    order?: boolean | number
    requireReasonText?: boolean | number
    slug?: boolean | number
    updatedAt?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentUserGenqlSelection{
    avatarUrl?: boolean | number
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentConnectionGenqlSelection{
    /** A list edges. */
    edges?: CommentEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: CommentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A comment on an entity */
export interface CommentGenqlSelection{
    attachments?: CommentAttachmentGenqlSelection
    body?: boolean | number
    createdAt?: boolean | number
    deletedAt?: boolean | number
    extra?: CommentExtraGenqlSelection
    guestName?: boolean | number
    id?: boolean | number
    mentions?: CommentUserMentionGenqlSelection
    nodeId?: boolean | number
    parentId?: boolean | number
    path?: boolean | number
    reactions?: CommentReactionGenqlSelection
    readReceipts?: CommentReadReceiptGenqlSelection
    replyCount?: boolean | number
    resolvedAt?: boolean | number
    resolvedById?: boolean | number
    status?: boolean | number
    updatedAt?: boolean | number
    userId?: boolean | number
    /** The parent comment */
    parent?: CommentGenqlSelection
    /** The user who resolved the comment */
    resolvedBy?: CommentUserGenqlSelection
    /** The user who authored the comment */
    user?: CommentUserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentAttachmentGenqlSelection{
    filename?: boolean | number
    key?: boolean | number
    mimeType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Extra properties in a comment */
export interface CommentExtraGenqlSelection{
    annotation?: CommentAnnotationGenqlSelection
    frame?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The annotation for a comment */
export interface CommentAnnotationGenqlSelection{
    ratio?: boolean | number
    type?: boolean | number
    x?: boolean | number
    y?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A mentioned user */
export interface CommentUserMentionGenqlSelection{
    /** The mention type: Always UserMention */
    type?: boolean | number
    /** The user id */
    userId?: boolean | number
    /** The user that was mentioned */
    user?: CommentUserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentReactionGenqlSelection{
    createdAt?: boolean | number
    type?: boolean | number
    userId?: boolean | number
    /** User who made the reaction */
    user?: CommentUserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentReadReceiptGenqlSelection{
    createdAt?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface KeyCountGenqlSelection{
    count?: boolean | number
    key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommunityAnimationImportCounterGenqlSelection{
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnterpriseOrganizationGenqlSelection{
    directoryGroupMappings?: EnterpriseOrganizationDirectoryMappingsGenqlSelection
    directorySyncStatus?: boolean | number
    domains?: EnterpriseOrganizationDomainGenqlSelection
    id?: boolean | number
    internalId?: boolean | number
    isSsoEnforced?: boolean | number
    name?: boolean | number
    ssoStatus?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnterpriseOrganizationDirectoryMappingsGenqlSelection{
    id?: boolean | number
    internalName?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnterpriseOrganizationDomainGenqlSelection{
    domain?: boolean | number
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Directory groups claimed by other workspaces of the same organization. */
export interface OrganizationDirectoryClaimGenqlSelection{
    name?: boolean | number
    userCount?: boolean | number
    workspaceName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrganizationDirectoryGroupGenqlSelection{
    id?: boolean | number
    internalName?: boolean | number
    name?: boolean | number
    users?: EnterpriseOrganizationGroupUserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnterpriseOrganizationGroupUserGenqlSelection{
    email?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileHandbackGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    assetUrl?: boolean | number
    backgroundColor?: boolean | number
    completedAt?: boolean | number
    fileId?: boolean | number
    fileVersionId?: boolean | number
    id?: boolean | number
    metadata?: boolean | number
    newFileId?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    createdByUserId?: boolean | number
    id?: boolean | number
    isHidden?: boolean | number
    modifiedByUserId?: boolean | number
    name?: boolean | number
    projectId?: boolean | number
    backgroundColor?: boolean | number
    currentVersionId?: boolean | number
    description?: boolean | number
    descriptionModifiedByUserId?: boolean | number
    descriptionUpdatedAt?: boolean | number
    folderId?: boolean | number
    showDescOnCollection?: boolean | number
    sourceFileKey?: boolean | number
    sourceFileType?: boolean | number
    status?: boolean | number
    type?: boolean | number
    /** Get the permission scopes for animation for the current user */
    animationPermissionScopes?: boolean | number
    /** Get the access of the current logged in user */
    currentUserAccess?: boolean | number
    currentVersion?: FileVersionGenqlSelection
    editHash?: boolean | number
    /** Key of featured file */
    featuredFileKey?: boolean | number
    features?: FeatureObjectGenqlSelection
    folder?: FolderGenqlSelection
    project?: ProjectGenqlSelection
    /** Get the public asset of the file. */
    publicAsset?: PublicAssetGenqlSelection
    upgradeRequired?: boolean | number
    /** Users with permissions the file has access */
    userResourcePermissions?: UserResourcePermissionGenqlSelection
    createdBy?: UserGenqlSelection
    modifiedBy?: UserGenqlSelection
    descriptionModifiedBy?: UserGenqlSelection
    fileObject?: FileObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVersionGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    backgroundColor?: boolean | number
    communityAnimationId?: boolean | number
    createdByUserId?: boolean | number
    fileId?: boolean | number
    fileKey?: boolean | number
    fileSystemSubVersionId?: boolean | number
    fileVersionId?: boolean | number
    id?: boolean | number
    name?: boolean | number
    playSegment?: PlaySegmentGenqlSelection
    sourceFileId?: boolean | number
    subVersionNumber?: boolean | number
    subVersions?: FileVersionGenqlSelection
    tags?: boolean | number
    uploadOrigin?: boolean | number
    uploadOriginVersion?: boolean | number
    versionLabel?: boolean | number
    versionNumber?: boolean | number
    createdBy?: UserGenqlSelection
    modifiedBy?: UserGenqlSelection
    fileObject?: FileObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaySegmentGenqlSelection{
    endFrame?: boolean | number
    id?: boolean | number
    name?: boolean | number
    startFrame?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FolderGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    createdByUserId?: boolean | number
    id?: boolean | number
    isHidden?: boolean | number
    modifiedByUserId?: boolean | number
    name?: boolean | number
    projectId?: boolean | number
    /** Get the permission scopes for animation for the current user */
    animationPermissionScopes?: boolean | number
    /** Get the access of the current logged in user */
    currentUserAccess?: boolean | number
    deletedFilesCount?: boolean | number
    /** Keys of featured files list */
    featuredFileKeys?: boolean | number
    features?: FeatureObjectGenqlSelection
    filesCount?: boolean | number
    project?: ProjectGenqlSelection
    stats?: FolderStatsGenqlSelection
    createdBy?: UserGenqlSelection
    modifiedBy?: UserGenqlSelection
    thumbnails?: FileObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    id?: boolean | number
    isPrivate?: boolean | number
    isSystem?: boolean | number
    slug?: boolean | number
    title?: boolean | number
    workspaceId?: boolean | number
    /**
     * @deprecated Use `featuredFileKeys` instead
     * The animation thumbnail Urls of the last 3 files in the project
     */
    animationThumbnailUrls?: boolean | number
    /** The file keys for last 3 files in the project */
    featuredFileKeys?: boolean | number
    features?: FeatureObjectGenqlSelection
    filesCount?: boolean | number
    isCreatorDraft?: boolean | number
    /** Get the permission scopes for project for the current user */
    projectPermissionScopes?: boolean | number
    /** Stats for the project content */
    stats?: ProjectStatsGenqlSelection
    /** Workspace the project belongs to */
    workspace?: WorkspaceGenqlSelection
    /** Total number of workspace members */
    workspaceTeamMembersCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectStatsGenqlSelection{
    animations?: boolean | number
    creatorFiles?: boolean | number
    folders?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FolderStatsGenqlSelection{
    animations?: boolean | number
    creatorFiles?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicAssetGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    backgroundColor?: boolean | number
    expireAt?: boolean | number
    fileKey?: boolean | number
    fileName?: boolean | number
    fileSize?: boolean | number
    fileVersionId?: boolean | number
    id?: boolean | number
    isActive?: boolean | number
    isOptimized?: boolean | number
    metadataVersionId?: boolean | number
    type?: boolean | number
    workflowFileId?: boolean | number
    workflowFileVersionId?: boolean | number
    /** Get the embed url for the public asset */
    embedUrl?: boolean | number
    /** Get the public asset url */
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserResourcePermissionGenqlSelection{
    id?: boolean | number
    userId?: boolean | number
    resourceType?: boolean | number
    resourceId?: boolean | number
    access?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NextPrevAnimationGenqlSelection{
    nextAnimation?: boolean | number
    prevAnimation?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVariantGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    contentType?: boolean | number
    fileKey?: boolean | number
    fileSize?: boolean | number
    fileVariationId?: boolean | number
    id?: boolean | number
    isOptimized?: boolean | number
    jobId?: boolean | number
    metadata?: FileVariantMetadataGenqlSelection
    status?: boolean | number
    workflowFileId?: boolean | number
    workflowFileVersionId?: boolean | number
    url?: boolean | number
    fileObject?: FileObjectGenqlSelection
    fileVariation?: FileVariationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVariantMetadataGenqlSelection{
    backgroundColor?: boolean | number
    fps?: boolean | number
    height?: boolean | number
    /** @deprecated `backgroundColor` is set to 'transparent' if this variation has transparency */
    transparency?: boolean | number
    width?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVersionOptimizeJobGenqlSelection{
    id?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVersionConnectionGenqlSelection{
    /** A list edges. */
    edges?: FileVersionEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileVersionEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: FileVersionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileConnectionGenqlSelection{
    /** A list edges. */
    edges?: FileEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: FileGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InvoiceGenqlSelection{
    id?: boolean | number
    providerId?: boolean | number
    providerType?: boolean | number
    providerCustomerId?: boolean | number
    providerSubscriptionId?: boolean | number
    items?: InvoiceItemGenqlSelection
    number?: boolean | number
    status?: boolean | number
    companyName?: boolean | number
    taxId?: boolean | number
    taxCountry?: boolean | number
    addressLineOne?: boolean | number
    addressLineTwo?: boolean | number
    country?: boolean | number
    state?: boolean | number
    city?: boolean | number
    additionalFields?: InvoiceFieldObjectGenqlSelection
    postcode?: boolean | number
    billingEmail?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    deletedAt?: boolean | number
    workspaceId?: boolean | number
    /** Retrieves the account for the invoice. */
    account?: AccountGenqlSelection
    /** Retrieves the total amount for the invoice. */
    amount?: boolean | number
    /** Retrieves the currency for the invoice. */
    currency?: boolean | number
    /** Retrieves the subscription for the invoice. */
    subscription?: WorkspaceSubscriptionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InvoiceItemGenqlSelection{
    amount?: boolean | number
    currency?: boolean | number
    date?: boolean | number
    description?: boolean | number
    id?: boolean | number
    periodEnd?: boolean | number
    periodStart?: boolean | number
    proration?: boolean | number
    quantity?: boolean | number
    subscription?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InvoiceFieldObjectGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupConnectionGenqlSelection{
    /** A list edges. */
    edges?: LottieMockupEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: LottieMockupGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupGenqlSelection{
    animation?: LottieMockupAnimationGenqlSelection
    animationId?: boolean | number
    assets?: LottieMockupAssetGenqlSelection
    canvas?: LottieMockupCanvasGenqlSelection
    description?: boolean | number
    id?: boolean | number
    name?: boolean | number
    playSegmentId?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAnimationGenqlSelection{
    config?: LottieMockupAnimationConfigGenqlSelection
    frame?: FrameGenqlSelection
    rotation?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAnimationConfigGenqlSelection{
    file?: boolean | number
    fileId?: boolean | number
    fileKey?: boolean | number
    loop?: boolean | number
    speed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FrameGenqlSelection{
    height?: boolean | number
    width?: boolean | number
    x?: boolean | number
    y?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAssetGenqlSelection{
    on_LottieMockupAssetImage?:LottieMockupAssetImageGenqlSelection,
    on_LottieMockupAssetText?:LottieMockupAssetTextGenqlSelection,
    __typename?: boolean | number
}

export interface LottieMockupAssetImageGenqlSelection{
    frame?: FrameGenqlSelection
    identifier?: boolean | number
    rotation?: boolean | number
    type?: boolean | number
    config?: LottieMockupAssetFileGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAssetFileGenqlSelection{
    file?: boolean | number
    fileId?: boolean | number
    fileKey?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAssetTextGenqlSelection{
    frame?: FrameGenqlSelection
    identifier?: boolean | number
    rotation?: boolean | number
    type?: boolean | number
    config?: LottieMockupAssetTextConfigGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupAssetTextConfigGenqlSelection{
    alignment?: boolean | number
    color?: boolean | number
    font?: boolean | number
    size?: boolean | number
    text?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LottieMockupCanvasGenqlSelection{
    background?: boolean | number
    height?: boolean | number
    templateSize?: boolean | number
    width?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OfficialWorkspaceGenqlSelection{
    icon?: boolean | number
    id?: boolean | number
    memberCount?: boolean | number
    members?: OfficialWorkspaceMemberGenqlSelection
    name?: boolean | number
    planName?: boolean | number
    planPosition?: boolean | number
    /** Indicates if the user can join the workspace instantly without approval */
    canJoinInstantly?: boolean | number
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin?: boolean | number
    /** Check if user is member of the workspace */
    isMember?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OfficialWorkspaceMemberGenqlSelection{
    avatarUrl?: boolean | number
    email?: boolean | number
    firstName?: boolean | number
    id?: boolean | number
    isAdmin?: boolean | number
    isOwner?: boolean | number
    lastName?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OnboardingChecklistObjectGenqlSelection{
    activeOnboardings?: boolean | number
    completeSeen?: boolean | number
    dismissSeen?: boolean | number
    doneOnboardings?: boolean | number
    id?: boolean | number
    newToOnboarding?: boolean | number
    seen?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OnboardingV2ObjectGenqlSelection{
    activeOnboardings?: boolean | number
    completeSeen?: boolean | number
    dismissSeen?: boolean | number
    doneOnboardings?: boolean | number
    id?: boolean | number
    newToOnboarding?: boolean | number
    seen?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentIntentGenqlSelection{
    id?: boolean | number
    providerId?: boolean | number
    status?: boolean | number
    type?: boolean | number
    providerType?: boolean | number
    createdAt?: boolean | number
    expiresAt?: boolean | number
    successUrl?: boolean | number
    workspaceId?: boolean | number
    addedSeats?: WorkspaceMemberGenqlSelection
    workspace?: WorkspaceObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentIntentCollectionMethodGenqlSelection{
    country?: boolean | number
    paymentMethods?: PaymentIntentCollectionPaymentMethodGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentIntentCollectionPaymentMethodGenqlSelection{
    displayName?: boolean | number
    logoUrl?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioPostGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    content?: boolean | number
    coverImage?: boolean | number
    excerpt?: boolean | number
    id?: boolean | number
    portfolioId?: boolean | number
    publishedAt?: boolean | number
    slug?: boolean | number
    tags?: PortfolioTagGenqlSelection
    title?: boolean | number
    workspaceId?: boolean | number
    contributors?: UserObjectGenqlSelection
    creator?: UserObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioTagGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioSlugAvailableInput {portfolioId: Scalars['ID'],portfolioPostId?: (Scalars['ID'] | null),slug: Scalars['String']}

export interface PortfolioPostConnectionGenqlSelection{
    /** A list edges. */
    edges?: PortfolioPostEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioPostEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PortfolioPostGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspacePortfolioGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    description?: boolean | number
    id?: boolean | number
    image?: boolean | number
    isPrivate?: boolean | number
    name?: boolean | number
    url?: boolean | number
    workspace?: WorkspaceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioUrlAvailableInput {url: Scalars['String'],workspaceId?: (Scalars['ID'] | null)}

export interface PremiumAssetConnectionGenqlSelection{
    /** A list edges. */
    edges?: PremiumAssetEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PremiumAssetGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetGenqlSelection{
    contributor?: PremiumAssetContributorGenqlSelection
    formats?: PremiumAssetFormatsGenqlSelection
    id?: boolean | number
    metadata?: PremiumAssetMetadataGenqlSelection
    name?: boolean | number
    pack?: PremiumAssetPackGenqlSelection
    previewImageUrl?: boolean | number
    previewVideoUrl?: boolean | number
    relatedAnimations?: PremiumAssetRelatedAnimationGenqlSelection
    slug?: boolean | number
    tags?: PremiumAssetTagGenqlSelection
    thumbnailVideoUrl?: boolean | number
    type?: boolean | number
    uuid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetContributorGenqlSelection{
    avatarUrl?: boolean | number
    company?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetFormatsGenqlSelection{
    aep?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetMetadataGenqlSelection{
    duration?: boolean | number
    fileSize?: boolean | number
    frameRate?: boolean | number
    frames?: boolean | number
    height?: boolean | number
    uuid?: boolean | number
    width?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetPackGenqlSelection{
    id?: boolean | number
    itemCount?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    thumbnailVideoUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetRelatedAnimationGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    previewImageUrl?: boolean | number
    slug?: boolean | number
    thumbnailVideoUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetTagGenqlSelection{
    id?: boolean | number
    lang?: boolean | number
    name?: boolean | number
    orderId?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetPackConnectionGenqlSelection{
    /** A list edges. */
    edges?: PremiumAssetPackEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetPackEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PremiumAssetPackGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetPackDetailConnectionGenqlSelection{
    /** A list edges. */
    edges?: PremiumAssetEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    description?: boolean | number
    id?: boolean | number
    itemCount?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    thumbnailVideoUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrivateShareGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    acceptedAt?: boolean | number
    access?: boolean | number
    id?: boolean | number
    invitationCode?: boolean | number
    invitedBy?: boolean | number
    isCreator?: boolean | number
    lastSentAt?: boolean | number
    recipientEmail?: boolean | number
    resourceId?: boolean | number
    resourceType?: boolean | number
    userId?: boolean | number
    /** Checks if the user is not a workspace member */
    hasUnacceptedWorkspaceInvitation?: boolean | number
    /** Checks if the user is not a workspace member */
    isGuest?: boolean | number
    resource?: PrivateShareResourceGenqlSelection
    /** Recipient user of the invitation */
    user?: UserObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrivateShareResourceGenqlSelection{
    on_File?:FileGenqlSelection,
    on_WorkspaceCollection?:WorkspaceCollectionGenqlSelection,
    on_Project?:ProjectGenqlSelection,
    __typename?: boolean | number
}

export interface WorkspaceCollectionGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    createdByUserId?: boolean | number
    id?: boolean | number
    isPrivate?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    workspaceId?: boolean | number
    /** Get the permission scopes for collection for the current user / workspace */
    collectionPermissionScopes?: boolean | number
    /** The thumbnail Urls of the last 3 animation inside a collection */
    collectionThumbnailUrls?: boolean | number
    /** Featured file key for the workspace collection */
    featuredFileKey?: boolean | number
    files?: boolean | number
    featuredFileObject?: FileObjectGenqlSelection
    createdBy?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedMemberGenqlSelection{
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrivateShareConnectionGenqlSelection{
    /** A list edges. */
    edges?: PrivateShareEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrivateShareEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: PrivateShareGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectFileConnectionGenqlSelection{
    /** A list edges. */
    edges?: ProjectFileEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectFileEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: ProjectFileGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectFileGenqlSelection{
    on_File?:FileGenqlSelection,
    on_Folder?:FolderGenqlSelection,
    __typename?: boolean | number
}

export interface ProjectConnectionGenqlSelection{
    /** A list edges. */
    edges?: ProjectEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: ProjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicShareGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    allowGuestView?: boolean | number
    expireAt?: boolean | number
    id?: boolean | number
    resourceId?: boolean | number
    resourceType?: boolean | number
    shareCode?: boolean | number
    /** Get the access type of the resource */
    accessLevels?: boolean | number
    resource?: PublicShareResourceGenqlSelection
    workspace?: WorkspacePublicInfoGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublicShareResourceGenqlSelection{
    on_File?:FileGenqlSelection,
    on_WorkspaceCollection?:WorkspaceCollectionGenqlSelection,
    __typename?: boolean | number
}

export interface WorkspacePublicInfoGenqlSelection{
    allowJoinRequest?: boolean | number
    icon?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RecentlyDeletedConnectionGenqlSelection{
    /** A list edges. */
    edges?: RecentlyDeletedEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RecentlyDeletedEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: RecentlyDeletedGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RecentlyDeletedGenqlSelection{
    children?: RecentlyDeletedGenqlSelection
    createdAt?: boolean | number
    expireAt?: boolean | number
    id?: boolean | number
    parent?: RecentlyDeletedGenqlSelection
    path?: boolean | number
    resourceId?: boolean | number
    resourceType?: boolean | number
    snapshot?: boolean | number
    status?: boolean | number
    updatedAt?: boolean | number
    userId?: boolean | number
    workspaceId?: boolean | number
    /** Recently deleted resource */
    resource?: RecentlyDeletedResourceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RecentlyDeletedResourceGenqlSelection{
    on_File?:FileGenqlSelection,
    on_Folder?:FolderGenqlSelection,
    on_Project?:ProjectGenqlSelection,
    __typename?: boolean | number
}

export interface RecentlyDeletedResourceInput {resourceId: Scalars['ID'],resourceType: RecentlyDeletedResourceType}

export interface SearchWorkspaceResponseGenqlSelection{
    collections?: WorkspaceCollectionConnectionGenqlSelection
    files?: FileConnectionGenqlSelection
    folders?: FolderConnectionGenqlSelection
    projects?: ProjectConnectionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceCollectionConnectionGenqlSelection{
    /** A list edges. */
    edges?: WorkspaceCollectionEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceCollectionEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: WorkspaceCollectionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FolderConnectionGenqlSelection{
    /** A list edges. */
    edges?: FolderEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FolderEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: FolderGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SourceFileGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    fileId?: boolean | number
    fileVersionId?: boolean | number
    id?: boolean | number
    sourceFileKey?: boolean | number
    sourceFileName?: boolean | number
    sourceFileSize?: boolean | number
    sourceFileVersionId?: boolean | number
    sourceType?: boolean | number
    sourceUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedInviteeConnectionGenqlSelection{
    /** A list edges. */
    edges?: SuggestedInviteeEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedInviteeEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: SuggestedInviteeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedInviteeGenqlSelection{
    /** Avatar url fetched from auth service. */
    avatarUrl?: boolean | number
    id?: boolean | number
    userEmail?: boolean | number
    userName?: boolean | number
    viewCount?: boolean | number
    viewerEmail?: boolean | number
    viewerName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedWorkspaceGenqlSelection{
    icon?: boolean | number
    id?: boolean | number
    memberIds?: boolean | number
    name?: boolean | number
    organization?: OrganizationGenqlSelection
    /** Indicates if the user has requested to join the suggested workspace */
    hasRequestedToJoin?: boolean | number
    /** Check if user is member of the workspace */
    isMember?: boolean | number
    members?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrganizationGenqlSelection{
    email?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedWorkspaceConnectionGenqlSelection{
    /** A list edges. */
    edges?: SuggestedWorkspaceEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SuggestedWorkspaceEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: SuggestedWorkspaceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserNotificationSubscriptionConnectionGenqlSelection{
    /** A list edges. */
    edges?: UserNotificationSubscriptionEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserNotificationSubscriptionEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: UserNotificationSubscriptionGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserNotificationSubscriptionGenqlSelection{
    createdAt?: boolean | number
    entityId?: boolean | number
    entityType?: boolean | number
    id?: boolean | number
    isSubscribed?: boolean | number
    updatedAt?: boolean | number
    userId?: boolean | number
    user?: UserObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OnboardingObjectGenqlSelection{
    animColorPaletteBtnHotspot?: boolean | number
    animCommentBtnHotspot?: boolean | number
    animDescriptionSequence?: boolean | number
    animPanelBtnHotspot?: boolean | number
    animSegmentBtnHotspot?: boolean | number
    animTitleHotspot?: boolean | number
    animTopbarHotspot?: boolean | number
    animVersionBtnHotspot?: boolean | number
    dashboardAnimUploadHotspot?: boolean | number
    dashboardCollectionHotspot?: boolean | number
    dashboardCollectionViewSequence?: boolean | number
    dashboardCreateAnimationHotspot?: boolean | number
    dashboardOptimizedDotlottieBanner?: boolean | number
    dashboardPageHotspot?: boolean | number
    dashboardPremiumAssetHotspot?: boolean | number
    dashboardPublicProfileHotspot?: boolean | number
    dashboardSlackIntegrationBellIndicator?: boolean | number
    dashboardSlackIntegrationPopup?: boolean | number
    dashboardWelcomeLfModal?: boolean | number
    dashboardWelcomeTeamModal?: boolean | number
    dashboardWelcomeUpgradedModal?: boolean | number
    dashboardWorkspaceCollectionHotspot?: boolean | number
    dashboardWorkspaceHotspot?: boolean | number
    folderCreateAnimationHotspot?: boolean | number
    introAnimSequence?: boolean | number
    introDashboardSequence?: boolean | number
    multiPlayerOnboarding?: boolean | number
    projectCreateAnimationHotspot?: boolean | number
    slackOnboardingForComment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceColorPaletteGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    colors?: boolean | number
    createdByUserId?: boolean | number
    id?: boolean | number
    workspaceId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceColorPaletteConnectionGenqlSelection{
    /** A list edges. */
    edges?: WorkspaceColorPaletteEdgeGenqlSelection
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceColorPaletteEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: WorkspaceColorPaletteGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceOwnershipTransferGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    updatedAt?: boolean | number
    completedAt?: boolean | number
    currentOwnerId?: boolean | number
    expiresAt?: boolean | number
    failureDetails?: boolean | number
    failureReason?: boolean | number
    id?: boolean | number
    metadata?: boolean | number
    newAccount?: AccountGenqlSelection
    newAccountId?: boolean | number
    newOwnerId?: boolean | number
    newSubscription?: WorkspaceSubscriptionGenqlSelection
    newSubscriptionId?: boolean | number
    oldAccount?: AccountGenqlSelection
    oldAccountId?: boolean | number
    oldSubscription?: WorkspaceSubscriptionGenqlSelection
    oldSubscriptionId?: boolean | number
    respondedAt?: boolean | number
    status?: boolean | number
    workspace?: WorkspaceGenqlSelection
    workspaceId?: boolean | number
    currentOwner?: WorkspaceMemberGenqlSelection
    newOwner?: WorkspaceMemberGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BrandObjectGenqlSelection{
    iconFileKey?: boolean | number
    iconPublicReadURL?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceCountsObjectGenqlSelection{
    filesCount?: boolean | number
    membersCount?: boolean | number
    projectsCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSeatUtilizationGenqlSelection{
    id?: boolean | number
    numberOfContributorSeats?: boolean | number
    numberOfContributorSeatsBalance?: boolean | number
    numberOfContributorSeatsUsed?: boolean | number
    numberOfViewerDownloaderSeats?: boolean | number
    numberOfViewerDownloaderSeatsBalance?: boolean | number
    numberOfViewerDownloaderSeatsUsed?: boolean | number
    numberOfViewerSeats?: boolean | number
    numberOfViewerSeatsBalance?: boolean | number
    numberOfViewerSeatsUsed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberPriceGenqlSelection{
    billingCycle?: boolean | number
    contributorPrice?: AddonPriceGenqlSelection
    currency?: boolean | number
    id?: boolean | number
    price?: boolean | number
    viewerDownloaderPrice?: AddonPriceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSettingsGenqlSelection{
    allowAiFeatures?: boolean | number
    allowExternalInvites?: boolean | number
    allowExternalShares?: boolean | number
    allowJoinRequest?: boolean | number
    allowMemberInvites?: boolean | number
    allowPremiumAnimations?: boolean | number
    allowPublishToCommunity?: boolean | number
    defaultRole?: boolean | number
    discoveryJoinType?: boolean | number
    isDiscoverable?: boolean | number
    isSsoEnforced?: boolean | number
    maxSessionDurationDays?: boolean | number
    workspaceId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSubscriptionAvailableDiscountGenqlSelection{
    billingCycle?: boolean | number
    currency?: boolean | number
    currentPrice?: boolean | number
    discountPercentage?: boolean | number
    discountedPrice?: boolean | number
    isEligibleForDiscount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AvailablePlanUpgradeGenqlSelection{
    plan?: PlanObjectGenqlSelection
    price?: WorkspaceMemberPriceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSubscriptionCheckoutSessionMetadataGenqlSelection{
    amountTotal?: boolean | number
    currency?: boolean | number
    id?: boolean | number
    paymentIntent?: boolean | number
    source?: boolean | number
    status?: boolean | number
    workspaceId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ZipFileGenqlSelection{
    filename?: boolean | number
    filesize?: boolean | number
    key?: boolean | number
    status?: boolean | number
    type?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceMemberSendInviteInput {recipients: InvitationRecipient[],resourceId?: (Scalars['String'] | null),resourceType?: (Scalars['String'] | null)}

export interface InvitationRecipient {access?: (Scalars['String'] | null),recipientEmail: Scalars['String']}

export interface AccountInput {taxCountry?: (Scalars['String'] | null),taxId?: (Scalars['String'] | null),addressLineOne?: (Scalars['String'] | null),addressLineTwo?: (Scalars['String'] | null),city?: (Scalars['String'] | null),country?: (Scalars['String'] | null),email?: (Scalars['String'] | null),name?: (Scalars['String'] | null),postcode?: (Scalars['String'] | null),state?: (Scalars['String'] | null)}

export interface AccountTaxInput {taxCountry: Scalars['String'],taxId: Scalars['String']}

export interface CommentCreateInput {body: Scalars['String'],entityId: Scalars['ID'],extra?: (CommentExtraInput | null),
/** The name to use if the user is not authenticated. Ignored if user is authenticated. */
name?: (Scalars['String'] | null),
/** The entity type */
type: CommentableEntityType}

export interface CommentExtraInput {annotation?: (CommentAnnotationInput | null),frame: Scalars['Int'],type: CommentExtraType}

export interface CommentAnnotationInput {ratio?: (Scalars['Float'][] | null),type: CommentAnnotationType,x: Scalars['Float'],y: Scalars['Float']}

export interface CommunityAnimationImportInput {
/** The code for importing the PublicAnimation and creating the WorkflowFile. */
code: Scalars['String'],
/** The ID of the public animation to import. */
id: Scalars['String'],
/** The key for importing the PublicAnimation and creating the WorkflowFile. */
key: Scalars['String'],
/** The ID of the project to import the public animation into. */
projectId: Scalars['String']}

export interface CommunityAnimationImportRequestGenqlSelection{
    /** The code to use to create the WorkflowFile. This is used to indicate that the WorkflowFile is an import. */
    code?: boolean | number
    /** The key to use to import the PublicAnimation and  create the WorkflowFile */
    key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommunityAnimationImportRequestCreateInput {
/** The background color to use for thumbnails */
backgroundColor?: (Scalars['String'] | null),
/** The color palette to apply */
colorPalette?: (Scalars['String'][] | null),
/** The id of the PublicAnimation to import. */
id: Scalars['String'],
/** The project id to save the animation to. */
projectId: Scalars['String']}

export interface CreateEnterpriseOrganizationInput {domains: Scalars['String'][],organizationName: Scalars['String'],workspaceId: Scalars['String']}

export interface EnterpriseSetSsoEnforcementInput {isSsoEnforced: Scalars['Boolean']}

export interface EnterpriseOrganizationDirectoryGroupInput {groupMappings?: (EnterpriseOrganizationGroupMapInput[] | null),workspaceId: Scalars['String']}

export interface EnterpriseOrganizationGroupMapInput {id: Scalars['String'],internalName: Scalars['String'],name: Scalars['String']}

export interface EnterpriseOrganizationDomainsInput {domains: Scalars['String'][],workspaceId: Scalars['String']}

export interface FileCreateInput {backgroundColor?: (Scalars['String'] | null),editorKey?: (Scalars['String'] | null),fileKey: Scalars['String'],fileVersionId: Scalars['String'],folderId?: (Scalars['String'] | null),handbackId?: (Scalars['String'] | null),isFolder?: (Scalars['Boolean'] | null),isHidden?: (Scalars['Boolean'] | null),isMyPrivateAnimation?: (Scalars['Boolean'] | null),name: Scalars['String'],projectId: Scalars['ID'],token?: (FileCreateTokenInput | null)}

export interface FileCreateTokenInput {
/** The code for the token. */
code: Scalars['String'],
/** The id of the reference. */
referenceId: Scalars['String'],
/** The type of the reference. */
referenceType: FileCreateTokenReferenceType}

export interface FileCreateFallbackInput {backgroundColor?: (Scalars['String'] | null),fileKey: Scalars['String'],folderId?: (Scalars['String'] | null),handbackId?: (Scalars['String'] | null),isFolder?: (Scalars['Boolean'] | null),isHidden?: (Scalars['Boolean'] | null),isMyPrivateAnimation?: (Scalars['Boolean'] | null),name: Scalars['String'],projectId: Scalars['String'],token?: (FileCreateTokenInput | null)}

export interface FileDescriptionUpdateInput {description?: (Scalars['String'] | null),showDescOnCollection: Scalars['Boolean']}

export interface FileDuplicateInput {folderId?: (Scalars['String'] | null),id: Scalars['ID'],projectId?: (Scalars['String'] | null)}

export interface FileRenameInput {name: Scalars['String']}

export interface UpdateFileInput {description?: (Scalars['String'] | null),folderId?: (Scalars['String'] | null),name?: (Scalars['String'] | null),projectId?: (Scalars['String'] | null),slug?: (Scalars['String'] | null),sourceFileKey?: (Scalars['String'] | null),sourceFileType?: (Scalars['String'] | null),sourceFilename?: (Scalars['String'] | null)}

export interface FileUploadRequestGenqlSelection{
    fields?: boolean | number
    key?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateUploadRequestInput {bgColor?: (Scalars['String'] | null),key?: (Scalars['String'] | null),metadata?: (Scalars['Boolean'] | null),previews?: (Scalars['Boolean'] | null),thumbnails?: (Scalars['Boolean'] | null),type?: (Scalars['String'] | null),variationType?: (Scalars['String'] | null),versionId?: (Scalars['String'] | null)}

export interface FileVariantInput {backgroundColor?: (Scalars['String'] | null),format: Scalars['String'],height: Scalars['Int'],transparency?: (Scalars['Boolean'] | null),width: Scalars['Int']}

export interface FileVariantUpdateInput {fileSize: Scalars['Float'],fileVariationId: Scalars['String']}

export interface FileVersionCreateInput {backgroundColor?: (Scalars['String'] | null),fileId: Scalars['ID'],fileKey: Scalars['String'],fileSubVersionId?: (Scalars['String'] | null),fileVersionId: Scalars['String'],handbackId?: (Scalars['ID'] | null),name: Scalars['String'],type?: (Scalars['String'] | null)}

export interface FileVersionCreateFallbackInput {backgroundColor?: (Scalars['String'] | null),fileId: Scalars['ID'],fileKey: Scalars['String'],handbackId?: (Scalars['ID'] | null),name: Scalars['String']}

export interface CreateFolderInput {folderId?: (Scalars['String'] | null),isFolder?: (Scalars['Boolean'] | null),name: Scalars['String'],projectId: Scalars['String'],slug: Scalars['String']}

export interface FolderRenameInput {name: Scalars['String']}

export interface InlineCheckoutBraintreeSubscriptionCreateInput {brainTreeClientToken: Scalars['String'],pricingId: Scalars['String'],quantity?: (Scalars['Float'] | null),workspaceId: Scalars['String']}

export interface InlineCheckoutSetupIntentCreatePayloadGenqlSelection{
    clientSecret?: boolean | number
    customerId?: boolean | number
    setupIntentId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InlineCheckoutSetupIntentCreateInput {onBoardAllMembers?: (Scalars['Boolean'] | null),pricingId: Scalars['String'],quantity?: (Scalars['Float'] | null),source?: (Scalars['String'] | null),workspaceId: Scalars['String']}

export interface InlineCheckoutStripeSubscriptionCreateInput {setupIntentId: Scalars['String'],workspaceId: Scalars['String']}

export interface LottieJsonOptimizeInput {
/** The lottie json payload to optimize */
fileUrl: Scalars['String'],
/** If true, will return a dotlottie file instead of a json file */
returnDotLottie?: (Scalars['Boolean'] | null)}

export interface LottieMockupCreateInput {animation: LottieMockupAnimationInput,animationId: Scalars['String'],assets: Scalars['JSON'][],canvas: LottieMockupCanvasInput,description: Scalars['String'],id: Scalars['String'],name: Scalars['String'],playSegmentId: Scalars['String'],version: Scalars['String']}

export interface LottieMockupAnimationInput {config: LottieMockupAnimationConfigInput,frame: FrameInput,rotation: Scalars['Float']}

export interface LottieMockupAnimationConfigInput {file?: (Scalars['String'] | null),fileId?: (Scalars['String'] | null),fileKey?: (Scalars['String'] | null),loop: Scalars['Boolean'],speed: Scalars['Float']}

export interface FrameInput {height: Scalars['Float'],width: Scalars['Float'],x: Scalars['Float'],y: Scalars['Float']}

export interface LottieMockupCanvasInput {background: Scalars['String'],height: Scalars['Float'],templateSize: TemplateSize,width: Scalars['Float']}

export interface BackgroundImageObjectGenqlSelection{
    fileKey?: boolean | number
    preSignedUploadURL?: boolean | number
    publicReadURL?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateOnboardingChecklistInput {completeSeen?: (Scalars['Boolean'] | null),dismissSeen?: (Scalars['Boolean'] | null),doneOnboardings?: (Scalars['String'][] | null),seen?: (Scalars['Boolean'] | null)}

export interface UpdateOnboardingV2Input {completeSeen?: (Scalars['Boolean'] | null),dismissSeen?: (Scalars['Boolean'] | null),doneOnboardings?: (Scalars['String'][] | null),seen?: (Scalars['Boolean'] | null)}

export interface CreateEditorFileEditCounterInput {fileId?: (Scalars['String'] | null),key: Scalars['String']}

export interface PaymentIntentTokenGenqlSelection{
    id?: boolean | number
    token?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentIntentInput {onBoardAllMembers?: (Scalars['Boolean'] | null),paymentMethod: Scalars['String'],quantity?: (Scalars['Float'] | null),ratePlanId: Scalars['ID'],type: Scalars['String'],workspaceId: Scalars['ID'],workspaceMemberIds?: (Scalars['String'][] | null)}

export interface PaymentIntentAddSeatsForResourceInput {resourceId: Scalars['ID'],resourceType: PrivateShareType,recipients: SharedResourceInvitationRecipient[],workspaceId: Scalars['ID'],workspaceAccess: Scalars['String']}

export interface SharedResourceInvitationRecipient {access: Scalars['String'],existingMember?: (Scalars['Boolean'] | null),recipientEmail?: (Scalars['String'] | null),userId?: (Scalars['String'] | null)}

export interface PaymentIntentAddSeatsInput {recipients: InvitationRecipient[],workspaceId: Scalars['ID']}

export interface InvoicePaymentAttemptPayloadGenqlSelection{
    amountPaid?: boolean | number
    currency?: boolean | number
    invoiceId?: boolean | number
    paymentProviderError?: PaymentProviderErrorGenqlSelection
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentProviderErrorGenqlSelection{
    code?: boolean | number
    message?: boolean | number
    provider?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodSetupPayloadGenqlSelection{
    paymentProviderError?: PaymentProviderErrorGenqlSelection
    setupIntent?: SetupIntentGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetupIntentGenqlSelection{
    clientSecret?: boolean | number
    id?: boolean | number
    provider?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlaySegmentInput {action: PlaySegmentAction,endFrame: Scalars['Float'],id?: (Scalars['String'] | null),name: Scalars['String'],startFrame: Scalars['Float']}

export interface PortfolioImageUploadObjectGenqlSelection{
    fileKey?: boolean | number
    preSignedUploadURL?: boolean | number
    publicReadURL?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortfolioPostInput {content?: (Scalars['JSON'] | null),contributors?: (Scalars['String'][] | null),coverImage?: (Scalars['String'] | null),excerpt?: (Scalars['String'] | null),isPublished?: (Scalars['Boolean'] | null),slug?: (Scalars['String'] | null),tags?: (Scalars['String'][] | null),title: Scalars['String'],workspaceId: Scalars['ID']}

export interface PortfolioPostUpdateInput {content?: (Scalars['JSON'] | null),contributors?: (Scalars['String'][] | null),coverImage?: (Scalars['String'] | null),excerpt?: (Scalars['String'] | null),isPublished?: (Scalars['Boolean'] | null),slug?: (Scalars['String'] | null),tags?: (Scalars['String'][] | null),title: Scalars['String']}

export interface PortfolioIconUploadObjectGenqlSelection{
    fileKey?: boolean | number
    preSignedUploadURL?: boolean | number
    publicReadURL?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspacePortfolioInput {description?: (Scalars['String'] | null),image?: (Scalars['String'] | null),isPrivate?: (Scalars['Boolean'] | null),name: Scalars['String'],url?: (Scalars['String'] | null),workspaceId: Scalars['String']}

export interface PremiumAssetDownloadLinkGenqlSelection{
    aep?: PremiumAssetDownloadLinkDataGenqlSelection
    json?: PremiumAssetDownloadLinkDataGenqlSelection
    lottie?: PremiumAssetDownloadLinkDataGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PremiumAssetDownloadLinkDataGenqlSelection{
    name?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SharedResourceInput {inviteToWorkspace?: (Scalars['Boolean'] | null),recipients: SharedResourceInvitationRecipient[],resourceId: Scalars['ID'],resourceType: PrivateShareType,workspaceAccess?: (Scalars['String'] | null),workspaceId?: (Scalars['ID'] | null)}

export interface ProjectCreateInput {isOpen?: (Scalars['Boolean'] | null),isPrivate?: (Scalars['Boolean'] | null),shareToken?: (Scalars['String'] | null),slug: Scalars['String'],title: Scalars['String'],workspaceId: Scalars['String']}

export interface ProjectUpdateInput {slug: Scalars['String'],title: Scalars['String']}

export interface PublicAssetRestoreInput {fileVersionId: Scalars['ID']}

export interface PublicAssetUpdateInput {fileId: Scalars['ID'],isActive: Scalars['Boolean']}

export interface PublicShareCreateInput {allowGuestView?: (Scalars['Boolean'] | null)}

export interface RecentlyDeletedPurgeInput {resourceId: Scalars['ID'],resourceType: RecentlyDeletedResourceType}

export interface RecentlyDeletedPurgeMultipleInput {resourceIds: Scalars['ID'],resourceType: RecentlyDeletedResourceType}

export interface RecentlyDeletedRestoreInput {location?: (Scalars['ID'] | null),resourceId: Scalars['ID'],resourceType: RecentlyDeletedResourceType}

export interface SourceFileCreateInput {fileId: Scalars['String'],fileVersionId: Scalars['String'],sourceFileKey?: (Scalars['String'] | null),sourceFileName: Scalars['String'],sourceFileSize?: (Scalars['Float'] | null),sourceFileVersionId?: (Scalars['String'] | null),sourceType: Scalars['String'],sourceUrl?: (Scalars['String'] | null)}

export interface FileUploadRequestStatusGenqlSelection{
    estimatedTimeRemaining?: boolean | number
    fields?: boolean | number
    key?: boolean | number
    message?: boolean | number
    progressPercentage?: boolean | number
    status?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateOnboardingInput {animColorPaletteBtnHotspot?: (Scalars['Boolean'] | null),animCommentBtnHotspot?: (Scalars['Boolean'] | null),animDescriptionSequence?: (Scalars['Boolean'] | null),animPanelBtnHotspot?: (Scalars['Boolean'] | null),animSegmentBtnHotspot?: (Scalars['Boolean'] | null),animTitleHotspot?: (Scalars['Boolean'] | null),animTopbarHotspot?: (Scalars['Boolean'] | null),animVersionBtnHotspot?: (Scalars['Boolean'] | null),dashboardAnimUploadHotspot?: (Scalars['Boolean'] | null),dashboardCollectionHotspot?: (Scalars['Boolean'] | null),dashboardCollectionViewSequence?: (Scalars['Boolean'] | null),dashboardCreateAnimationHotspot?: (Scalars['Boolean'] | null),dashboardOptimizedDotlottieBanner?: (Scalars['Boolean'] | null),dashboardPageHotspot?: (Scalars['Boolean'] | null),dashboardPremiumAssetHotspot?: (Scalars['Boolean'] | null),dashboardPublicProfileHotspot?: (Scalars['Boolean'] | null),dashboardSlackIntegrationBellIndicator?: (Scalars['Boolean'] | null),dashboardSlackIntegrationPopup?: (Scalars['Boolean'] | null),dashboardWelcomeLfModal?: (Scalars['Boolean'] | null),dashboardWelcomeTeamModal?: (Scalars['Boolean'] | null),dashboardWelcomeUpgradedModal?: (Scalars['Boolean'] | null),dashboardWorkspaceCollectionHotspot?: (Scalars['Boolean'] | null),dashboardWorkspaceHotspot?: (Scalars['Boolean'] | null),folderCreateAnimationHotspot?: (Scalars['Boolean'] | null),introAnimSequence?: (Scalars['Boolean'] | null),introDashboardSequence?: (Scalars['Boolean'] | null),multiPlayerOnboarding?: (Scalars['Boolean'] | null),projectCreateAnimationHotspot?: (Scalars['Boolean'] | null),slackOnboardingForComment?: (Scalars['Boolean'] | null)}

export interface WorkflowTempFilePreSignedUploadRequestGenqlSelection{
    fileKey?: boolean | number
    preSignedUploadURL?: boolean | number
    publicReadURL?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceCollectionCreateInput {files: Scalars['JSON'],isPrivate?: (Scalars['Boolean'] | null),name: Scalars['String'],slug: Scalars['String'],workspaceId: Scalars['String']}

export interface WorkspaceCollectionUpdateInput {files?: (Scalars['JSON'] | null),name?: (Scalars['String'] | null),slug?: (Scalars['String'] | null),workspaceId?: (Scalars['String'] | null)}

export interface CreateWorkspaceColorPaletteInput {colors: Scalars['String'][],workspaceId: Scalars['ID']}

export interface UpdateWorkspaceColorPaletteInput {colors: Scalars['String'][]}

export interface WorkspaceIconUploadObjectGenqlSelection{
    fileKey?: boolean | number
    preSignedUploadURL?: boolean | number
    publicReadURL?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InitialAnimationUploadInput {file: Scalars['String'],folderId?: (Scalars['String'] | null),projectId?: (Scalars['String'] | null),workspaceId: Scalars['String']}

export interface WorkspaceInput {billingAddressLineOne?: (Scalars['String'] | null),billingAddressLineTwo?: (Scalars['String'] | null),billingEmail?: (Scalars['String'] | null),icon?: (Scalars['String'] | null),name?: (Scalars['String'] | null),url?: (Scalars['String'] | null)}

export interface WorkspaceSettingsUpdateInput {allowAiFeatures?: (Scalars['Boolean'] | null),allowExternalInvites?: (Scalars['Boolean'] | null),allowExternalShares?: (Scalars['Boolean'] | null),allowJoinRequest?: (Scalars['Boolean'] | null),allowMemberInvites?: (Scalars['Boolean'] | null),allowPremiumAnimations?: (Scalars['Boolean'] | null),allowPublishToCommunity?: (Scalars['Boolean'] | null),defaultRole?: (Scalars['String'] | null),discoveryJoinType?: (WorkspaceDiscoveryJoinType | null),isDiscoverable?: (Scalars['Boolean'] | null),maxSessionDurationDays?: (Scalars['Float'] | null)}

export interface ApplyDiscountInput {workspaceId: Scalars['ID']}

export interface SubscriptionCancelInput {reasonId: Scalars['String'],reasonText?: (Scalars['String'] | null),subscriptionId: Scalars['String'],workspaceId: Scalars['String']}

export interface WorkspaceSubscriptionCheckoutSessionInput {account?: (AccountInput | null),brainTreeClientToken?: (Scalars['String'] | null),ctaButtonText?: (Scalars['String'] | null),isExtendedTrial?: (Scalars['Boolean'] | null),isPrepayOptional?: (Scalars['Boolean'] | null),isTrial?: (Scalars['Boolean'] | null),onBoardAllMembers?: (Scalars['Boolean'] | null),paymentProvider?: (Scalars['String'] | null),pricingId: Scalars['String'],quantity?: (Scalars['Float'] | null),referralCode?: (Scalars['String'] | null),returnTo?: (Scalars['String'] | null),source?: (Scalars['String'] | null),viewerQuantity?: (Scalars['Float'] | null),workspaceId: Scalars['String'],workspaceMemberIds?: (Scalars['String'][] | null),workspaceMembers?: (WorkspaceMemberInput[] | null)}

export interface WorkspaceMemberInput {email: Scalars['String'],role: Scalars['String']}

export interface CheckoutObjectGenqlSelection{
    clientSecret?: boolean | number
    sessionId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceSubscriptionCheckoutForEmbedInput {onBoardAllMembers?: (Scalars['Boolean'] | null),paymentProvider?: (Scalars['String'] | null),pricingId: Scalars['String'],quantity?: (Scalars['Float'] | null),referralCode?: (Scalars['String'] | null),returnTo?: (Scalars['String'] | null),source?: (Scalars['String'] | null),viewerQuantity?: (Scalars['Float'] | null),workspaceId: Scalars['String'],workspaceMemberIds?: (Scalars['String'][] | null)}

export interface WorkspaceSubscriptionUpgradeInput {pricingId?: (Scalars['String'] | null),quantity?: (Scalars['Float'] | null),workspaceId: Scalars['String']}

export interface ZipFileCreateInput {entries: ZipEntryInput[],type?: (ZipFileType | null)}

export interface ZipEntryInput {id: Scalars['String'],type?: (ZipEntryType | null)}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const OrganizationSsoLogin_possibleTypes: string[] = ['OrganizationSsoLogin']
    export const isOrganizationSsoLogin = (obj?: { __typename?: any } | null): obj is OrganizationSsoLogin => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationSsoLogin"')
      return OrganizationSsoLogin_possibleTypes.includes(obj.__typename)
    }
    


    const LookupSecret_possibleTypes: string[] = ['LookupSecret']
    export const isLookupSecret = (obj?: { __typename?: any } | null): obj is LookupSecret => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLookupSecret"')
      return LookupSecret_possibleTypes.includes(obj.__typename)
    }
    


    const TotpLink_possibleTypes: string[] = ['TotpLink']
    export const isTotpLink = (obj?: { __typename?: any } | null): obj is TotpLink => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTotpLink"')
      return TotpLink_possibleTypes.includes(obj.__typename)
    }
    


    const LocaleListing_possibleTypes: string[] = ['LocaleListing']
    export const isLocaleListing = (obj?: { __typename?: any } | null): obj is LocaleListing => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocaleListing"')
      return LocaleListing_possibleTypes.includes(obj.__typename)
    }
    


    const Locale_possibleTypes: string[] = ['Locale']
    export const isLocale = (obj?: { __typename?: any } | null): obj is Locale => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocale"')
      return Locale_possibleTypes.includes(obj.__typename)
    }
    


    const ViewerNotificationPreference_possibleTypes: string[] = ['ViewerNotificationPreference']
    export const isViewerNotificationPreference = (obj?: { __typename?: any } | null): obj is ViewerNotificationPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isViewerNotificationPreference"')
      return ViewerNotificationPreference_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationPreference_possibleTypes: string[] = ['NotificationPreference']
    export const isNotificationPreference = (obj?: { __typename?: any } | null): obj is NotificationPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationPreference"')
      return NotificationPreference_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationChannel_possibleTypes: string[] = ['NotificationChannel']
    export const isNotificationChannel = (obj?: { __typename?: any } | null): obj is NotificationChannel => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationChannel"')
      return NotificationChannel_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationTemplate_possibleTypes: string[] = ['NotificationTemplate']
    export const isNotificationTemplate = (obj?: { __typename?: any } | null): obj is NotificationTemplate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationTemplate"')
      return NotificationTemplate_possibleTypes.includes(obj.__typename)
    }
    


    const NotificationGroup_possibleTypes: string[] = ['NotificationGroup']
    export const isNotificationGroup = (obj?: { __typename?: any } | null): obj is NotificationGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotificationGroup"')
      return NotificationGroup_possibleTypes.includes(obj.__typename)
    }
    


    const OAuthConsentRequest_possibleTypes: string[] = ['OAuthConsentRequest']
    export const isOAuthConsentRequest = (obj?: { __typename?: any } | null): obj is OAuthConsentRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOAuthConsentRequest"')
      return OAuthConsentRequest_possibleTypes.includes(obj.__typename)
    }
    


    const OAuthConsentRequestScope_possibleTypes: string[] = ['OAuthConsentRequestScope']
    export const isOAuthConsentRequestScope = (obj?: { __typename?: any } | null): obj is OAuthConsentRequestScope => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOAuthConsentRequestScope"')
      return OAuthConsentRequestScope_possibleTypes.includes(obj.__typename)
    }
    


    const OAuthLoginRequest_possibleTypes: string[] = ['OAuthLoginRequest']
    export const isOAuthLoginRequest = (obj?: { __typename?: any } | null): obj is OAuthLoginRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOAuthLoginRequest"')
      return OAuthLoginRequest_possibleTypes.includes(obj.__typename)
    }
    


    const UserSegmentListing_possibleTypes: string[] = ['UserSegmentListing']
    export const isUserSegmentListing = (obj?: { __typename?: any } | null): obj is UserSegmentListing => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserSegmentListing"')
      return UserSegmentListing_possibleTypes.includes(obj.__typename)
    }
    


    const UserSegment_possibleTypes: string[] = ['UserSegment']
    export const isUserSegment = (obj?: { __typename?: any } | null): obj is UserSegment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserSegment"')
      return UserSegment_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    


    const ViewerCredential_possibleTypes: string[] = ['ViewerCredential']
    export const isViewerCredential = (obj?: { __typename?: any } | null): obj is ViewerCredential => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isViewerCredential"')
      return ViewerCredential_possibleTypes.includes(obj.__typename)
    }
    


    const LoginToken_possibleTypes: string[] = ['LoginToken']
    export const isLoginToken = (obj?: { __typename?: any } | null): obj is LoginToken => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLoginToken"')
      return LoginToken_possibleTypes.includes(obj.__typename)
    }
    


    const Authentication_possibleTypes: string[] = ['Authentication']
    export const isAuthentication = (obj?: { __typename?: any } | null): obj is Authentication => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuthentication"')
      return Authentication_possibleTypes.includes(obj.__typename)
    }
    


    const DirectoryUser_possibleTypes: string[] = ['DirectoryUser']
    export const isDirectoryUser = (obj?: { __typename?: any } | null): obj is DirectoryUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDirectoryUser"')
      return DirectoryUser_possibleTypes.includes(obj.__typename)
    }
    


    const UserProfilePhotoUpload_possibleTypes: string[] = ['UserProfilePhotoUpload']
    export const isUserProfilePhotoUpload = (obj?: { __typename?: any } | null): obj is UserProfilePhotoUpload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserProfilePhotoUpload"')
      return UserProfilePhotoUpload_possibleTypes.includes(obj.__typename)
    }
    


    const Animator_possibleTypes: string[] = ['Animator']
    export const isAnimator = (obj?: { __typename?: any } | null): obj is Animator => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAnimator"')
      return Animator_possibleTypes.includes(obj.__typename)
    }
    


    const AnimatorConnection_possibleTypes: string[] = ['AnimatorConnection']
    export const isAnimatorConnection = (obj?: { __typename?: any } | null): obj is AnimatorConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAnimatorConnection"')
      return AnimatorConnection_possibleTypes.includes(obj.__typename)
    }
    


    const AnimatorEdge_possibleTypes: string[] = ['AnimatorEdge']
    export const isAnimatorEdge = (obj?: { __typename?: any } | null): obj is AnimatorEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAnimatorEdge"')
      return AnimatorEdge_possibleTypes.includes(obj.__typename)
    }
    


    const Blog_possibleTypes: string[] = ['Blog']
    export const isBlog = (obj?: { __typename?: any } | null): obj is Blog => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlog"')
      return Blog_possibleTypes.includes(obj.__typename)
    }
    


    const BlogCategory_possibleTypes: string[] = ['BlogCategory']
    export const isBlogCategory = (obj?: { __typename?: any } | null): obj is BlogCategory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlogCategory"')
      return BlogCategory_possibleTypes.includes(obj.__typename)
    }
    


    const BlogConnection_possibleTypes: string[] = ['BlogConnection']
    export const isBlogConnection = (obj?: { __typename?: any } | null): obj is BlogConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlogConnection"')
      return BlogConnection_possibleTypes.includes(obj.__typename)
    }
    


    const BlogEdge_possibleTypes: string[] = ['BlogEdge']
    export const isBlogEdge = (obj?: { __typename?: any } | null): obj is BlogEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBlogEdge"')
      return BlogEdge_possibleTypes.includes(obj.__typename)
    }
    


    const CollectionAnimationPreview_possibleTypes: string[] = ['CollectionAnimationPreview']
    export const isCollectionAnimationPreview = (obj?: { __typename?: any } | null): obj is CollectionAnimationPreview => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionAnimationPreview"')
      return CollectionAnimationPreview_possibleTypes.includes(obj.__typename)
    }
    


    const Color_possibleTypes: string[] = ['Color']
    export const isColor = (obj?: { __typename?: any } | null): obj is Color => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isColor"')
      return Color_possibleTypes.includes(obj.__typename)
    }
    


    const ColorPalette_possibleTypes: string[] = ['ColorPalette']
    export const isColorPalette = (obj?: { __typename?: any } | null): obj is ColorPalette => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isColorPalette"')
      return ColorPalette_possibleTypes.includes(obj.__typename)
    }
    


    const ColorPaletteConnection_possibleTypes: string[] = ['ColorPaletteConnection']
    export const isColorPaletteConnection = (obj?: { __typename?: any } | null): obj is ColorPaletteConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isColorPaletteConnection"')
      return ColorPaletteConnection_possibleTypes.includes(obj.__typename)
    }
    


    const ColorPaletteEdge_possibleTypes: string[] = ['ColorPaletteEdge']
    export const isColorPaletteEdge = (obj?: { __typename?: any } | null): obj is ColorPaletteEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isColorPaletteEdge"')
      return ColorPaletteEdge_possibleTypes.includes(obj.__typename)
    }
    


    const HitCountEvent_possibleTypes: string[] = ['HitCountEvent']
    export const isHitCountEvent = (obj?: { __typename?: any } | null): obj is HitCountEvent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isHitCountEvent"')
      return HitCountEvent_possibleTypes.includes(obj.__typename)
    }
    


    const Notification_possibleTypes: string[] = ['Notification']
    export const isNotification = (obj?: { __typename?: any } | null): obj is Notification => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotification"')
      return Notification_possibleTypes.includes(obj.__typename)
    }
    


    const PageInfo_possibleTypes: string[] = ['PageInfo']
    export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
      return PageInfo_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimation_possibleTypes: string[] = ['PublicAnimation']
    export const isPublicAnimation = (obj?: { __typename?: any } | null): obj is PublicAnimation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimation"')
      return PublicAnimation_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationConnection_possibleTypes: string[] = ['PublicAnimationConnection']
    export const isPublicAnimationConnection = (obj?: { __typename?: any } | null): obj is PublicAnimationConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationConnection"')
      return PublicAnimationConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationDeleteResponse_possibleTypes: string[] = ['PublicAnimationDeleteResponse']
    export const isPublicAnimationDeleteResponse = (obj?: { __typename?: any } | null): obj is PublicAnimationDeleteResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationDeleteResponse"')
      return PublicAnimationDeleteResponse_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationEdge_possibleTypes: string[] = ['PublicAnimationEdge']
    export const isPublicAnimationEdge = (obj?: { __typename?: any } | null): obj is PublicAnimationEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationEdge"')
      return PublicAnimationEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationUploadRequest_possibleTypes: string[] = ['PublicAnimationUploadRequest']
    export const isPublicAnimationUploadRequest = (obj?: { __typename?: any } | null): obj is PublicAnimationUploadRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationUploadRequest"')
      return PublicAnimationUploadRequest_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationTag_possibleTypes: string[] = ['PublicAnimationTag']
    export const isPublicAnimationTag = (obj?: { __typename?: any } | null): obj is PublicAnimationTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationTag"')
      return PublicAnimationTag_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationTagConnection_possibleTypes: string[] = ['PublicAnimationTagConnection']
    export const isPublicAnimationTagConnection = (obj?: { __typename?: any } | null): obj is PublicAnimationTagConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationTagConnection"')
      return PublicAnimationTagConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAnimationTagEdge_possibleTypes: string[] = ['PublicAnimationTagEdge']
    export const isPublicAnimationTagEdge = (obj?: { __typename?: any } | null): obj is PublicAnimationTagEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAnimationTagEdge"')
      return PublicAnimationTagEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PublicCollection_possibleTypes: string[] = ['PublicCollection']
    export const isPublicCollection = (obj?: { __typename?: any } | null): obj is PublicCollection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicCollection"')
      return PublicCollection_possibleTypes.includes(obj.__typename)
    }
    


    const PublicCollectionConnection_possibleTypes: string[] = ['PublicCollectionConnection']
    export const isPublicCollectionConnection = (obj?: { __typename?: any } | null): obj is PublicCollectionConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicCollectionConnection"')
      return PublicCollectionConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PublicCollectionEdge_possibleTypes: string[] = ['PublicCollectionEdge']
    export const isPublicCollectionEdge = (obj?: { __typename?: any } | null): obj is PublicCollectionEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicCollectionEdge"')
      return PublicCollectionEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PublicComment_possibleTypes: string[] = ['PublicComment']
    export const isPublicComment = (obj?: { __typename?: any } | null): obj is PublicComment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicComment"')
      return PublicComment_possibleTypes.includes(obj.__typename)
    }
    


    const SoftwareUpdate_possibleTypes: string[] = ['SoftwareUpdate']
    export const isSoftwareUpdate = (obj?: { __typename?: any } | null): obj is SoftwareUpdate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSoftwareUpdate"')
      return SoftwareUpdate_possibleTypes.includes(obj.__typename)
    }
    


    const Theme_possibleTypes: string[] = ['Theme']
    export const isTheme = (obj?: { __typename?: any } | null): obj is Theme => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTheme"')
      return Theme_possibleTypes.includes(obj.__typename)
    }
    


    const ThemeColor_possibleTypes: string[] = ['ThemeColor']
    export const isThemeColor = (obj?: { __typename?: any } | null): obj is ThemeColor => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThemeColor"')
      return ThemeColor_possibleTypes.includes(obj.__typename)
    }
    


    const TrendingItem_possibleTypes: string[] = ['TrendingItem']
    export const isTrendingItem = (obj?: { __typename?: any } | null): obj is TrendingItem => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrendingItem"')
      return TrendingItem_possibleTypes.includes(obj.__typename)
    }
    


    const UserAchievement_possibleTypes: string[] = ['UserAchievement']
    export const isUserAchievement = (obj?: { __typename?: any } | null): obj is UserAchievement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserAchievement"')
      return UserAchievement_possibleTypes.includes(obj.__typename)
    }
    


    const UserAchievementConnection_possibleTypes: string[] = ['UserAchievementConnection']
    export const isUserAchievementConnection = (obj?: { __typename?: any } | null): obj is UserAchievementConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserAchievementConnection"')
      return UserAchievementConnection_possibleTypes.includes(obj.__typename)
    }
    


    const UserAchievementEdge_possibleTypes: string[] = ['UserAchievementEdge']
    export const isUserAchievementEdge = (obj?: { __typename?: any } | null): obj is UserAchievementEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserAchievementEdge"')
      return UserAchievementEdge_possibleTypes.includes(obj.__typename)
    }
    


    const UserStatGraphData_possibleTypes: string[] = ['UserStatGraphData']
    export const isUserStatGraphData = (obj?: { __typename?: any } | null): obj is UserStatGraphData => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserStatGraphData"')
      return UserStatGraphData_possibleTypes.includes(obj.__typename)
    }
    


    const UserStats_possibleTypes: string[] = ['UserStats']
    export const isUserStats = (obj?: { __typename?: any } | null): obj is UserStats => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserStats"')
      return UserStats_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const Attributes_possibleTypes: string[] = ['Attributes']
    export const isAttributes = (obj?: { __typename?: any } | null): obj is Attributes => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAttributes"')
      return Attributes_possibleTypes.includes(obj.__typename)
    }
    


    const VariationMetadata_possibleTypes: string[] = ['VariationMetadata']
    export const isVariationMetadata = (obj?: { __typename?: any } | null): obj is VariationMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVariationMetadata"')
      return VariationMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const FileVariation_possibleTypes: string[] = ['FileVariation']
    export const isFileVariation = (obj?: { __typename?: any } | null): obj is FileVariation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVariation"')
      return FileVariation_possibleTypes.includes(obj.__typename)
    }
    


    const Metadata_possibleTypes: string[] = ['Metadata']
    export const isMetadata = (obj?: { __typename?: any } | null): obj is Metadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMetadata"')
      return Metadata_possibleTypes.includes(obj.__typename)
    }
    


    const FileObjectRegenerate_possibleTypes: string[] = ['FileObjectRegenerate']
    export const isFileObjectRegenerate = (obj?: { __typename?: any } | null): obj is FileObjectRegenerate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileObjectRegenerate"')
      return FileObjectRegenerate_possibleTypes.includes(obj.__typename)
    }
    


    const PreviewContent_possibleTypes: string[] = ['PreviewContent']
    export const isPreviewContent = (obj?: { __typename?: any } | null): obj is PreviewContent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPreviewContent"')
      return PreviewContent_possibleTypes.includes(obj.__typename)
    }
    


    const PreviewSize_possibleTypes: string[] = ['PreviewSize']
    export const isPreviewSize = (obj?: { __typename?: any } | null): obj is PreviewSize => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPreviewSize"')
      return PreviewSize_possibleTypes.includes(obj.__typename)
    }
    


    const Preview_possibleTypes: string[] = ['Preview']
    export const isPreview = (obj?: { __typename?: any } | null): obj is Preview => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPreview"')
      return Preview_possibleTypes.includes(obj.__typename)
    }
    


    const ThumbnailContent_possibleTypes: string[] = ['ThumbnailContent']
    export const isThumbnailContent = (obj?: { __typename?: any } | null): obj is ThumbnailContent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThumbnailContent"')
      return ThumbnailContent_possibleTypes.includes(obj.__typename)
    }
    


    const ThumbnailSize_possibleTypes: string[] = ['ThumbnailSize']
    export const isThumbnailSize = (obj?: { __typename?: any } | null): obj is ThumbnailSize => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThumbnailSize"')
      return ThumbnailSize_possibleTypes.includes(obj.__typename)
    }
    


    const Thumbnail_possibleTypes: string[] = ['Thumbnail']
    export const isThumbnail = (obj?: { __typename?: any } | null): obj is Thumbnail => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThumbnail"')
      return Thumbnail_possibleTypes.includes(obj.__typename)
    }
    


    const FileObject_possibleTypes: string[] = ['FileObject']
    export const isFileObject = (obj?: { __typename?: any } | null): obj is FileObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileObject"')
      return FileObject_possibleTypes.includes(obj.__typename)
    }
    


    const PresignedPost_possibleTypes: string[] = ['PresignedPost']
    export const isPresignedPost = (obj?: { __typename?: any } | null): obj is PresignedPost => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPresignedPost"')
      return PresignedPost_possibleTypes.includes(obj.__typename)
    }
    


    const SignedUrl_possibleTypes: string[] = ['SignedUrl']
    export const isSignedUrl = (obj?: { __typename?: any } | null): obj is SignedUrl => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSignedUrl"')
      return SignedUrl_possibleTypes.includes(obj.__typename)
    }
    


    const FilePreviewGenerate_possibleTypes: string[] = ['FilePreviewGenerate']
    export const isFilePreviewGenerate = (obj?: { __typename?: any } | null): obj is FilePreviewGenerate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFilePreviewGenerate"')
      return FilePreviewGenerate_possibleTypes.includes(obj.__typename)
    }
    


    const FilePreviewGenerateStatus_possibleTypes: string[] = ['FilePreviewGenerateStatus']
    export const isFilePreviewGenerateStatus = (obj?: { __typename?: any } | null): obj is FilePreviewGenerateStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFilePreviewGenerateStatus"')
      return FilePreviewGenerateStatus_possibleTypes.includes(obj.__typename)
    }
    


    const FileAssetObjectReference_possibleTypes: string[] = ['FileAssetObjectReference']
    export const isFileAssetObjectReference = (obj?: { __typename?: any } | null): obj is FileAssetObjectReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileAssetObjectReference"')
      return FileAssetObjectReference_possibleTypes.includes(obj.__typename)
    }
    


    const AudioAssetObjectReference_possibleTypes: string[] = ['AudioAssetObjectReference']
    export const isAudioAssetObjectReference = (obj?: { __typename?: any } | null): obj is AudioAssetObjectReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAudioAssetObjectReference"')
      return AudioAssetObjectReference_possibleTypes.includes(obj.__typename)
    }
    


    const _FileOptimizationJob_possibleTypes: string[] = ['_FileOptimizationJob']
    export const is_FileOptimizationJob = (obj?: { __typename?: any } | null): obj is _FileOptimizationJob => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_FileOptimizationJob"')
      return _FileOptimizationJob_possibleTypes.includes(obj.__typename)
    }
    


    const ImageAssetObjectReference_possibleTypes: string[] = ['ImageAssetObjectReference']
    export const isImageAssetObjectReference = (obj?: { __typename?: any } | null): obj is ImageAssetObjectReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageAssetObjectReference"')
      return ImageAssetObjectReference_possibleTypes.includes(obj.__typename)
    }
    


    const LottieJsonMarker_possibleTypes: string[] = ['LottieJsonMarker']
    export const isLottieJsonMarker = (obj?: { __typename?: any } | null): obj is LottieJsonMarker => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieJsonMarker"')
      return LottieJsonMarker_possibleTypes.includes(obj.__typename)
    }
    


    const StateMachineAssetObjectReference_possibleTypes: string[] = ['StateMachineAssetObjectReference']
    export const isStateMachineAssetObjectReference = (obj?: { __typename?: any } | null): obj is StateMachineAssetObjectReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStateMachineAssetObjectReference"')
      return StateMachineAssetObjectReference_possibleTypes.includes(obj.__typename)
    }
    


    const ThemeAssetObjectReference_possibleTypes: string[] = ['ThemeAssetObjectReference']
    export const isThemeAssetObjectReference = (obj?: { __typename?: any } | null): obj is ThemeAssetObjectReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThemeAssetObjectReference"')
      return ThemeAssetObjectReference_possibleTypes.includes(obj.__typename)
    }
    


    const ZipEntryObject_possibleTypes: string[] = ['ZipEntryObject']
    export const isZipEntryObject = (obj?: { __typename?: any } | null): obj is ZipEntryObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isZipEntryObject"')
      return ZipEntryObject_possibleTypes.includes(obj.__typename)
    }
    


    const ZipFileObject_possibleTypes: string[] = ['ZipFileObject']
    export const isZipFileObject = (obj?: { __typename?: any } | null): obj is ZipFileObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isZipFileObject"')
      return ZipFileObject_possibleTypes.includes(obj.__typename)
    }
    


    const FileAssetObject_possibleTypes: string[] = ['FileAssetObject']
    export const isFileAssetObject = (obj?: { __typename?: any } | null): obj is FileAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileAssetObject"')
      return FileAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const AnimationAssetObject_possibleTypes: string[] = ['AnimationAssetObject']
    export const isAnimationAssetObject = (obj?: { __typename?: any } | null): obj is AnimationAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAnimationAssetObject"')
      return AnimationAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const AudioAssetObject_possibleTypes: string[] = ['AudioAssetObject']
    export const isAudioAssetObject = (obj?: { __typename?: any } | null): obj is AudioAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAudioAssetObject"')
      return AudioAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const FileAssetEvent_possibleTypes: string[] = ['FileAssetEvent']
    export const isFileAssetEvent = (obj?: { __typename?: any } | null): obj is FileAssetEvent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileAssetEvent"')
      return FileAssetEvent_possibleTypes.includes(obj.__typename)
    }
    


    const _FileAssetUploadRequest_possibleTypes: string[] = ['_FileAssetUploadRequest']
    export const is_FileAssetUploadRequest = (obj?: { __typename?: any } | null): obj is _FileAssetUploadRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_FileAssetUploadRequest"')
      return _FileAssetUploadRequest_possibleTypes.includes(obj.__typename)
    }
    


    const ImageAssetObject_possibleTypes: string[] = ['ImageAssetObject']
    export const isImageAssetObject = (obj?: { __typename?: any } | null): obj is ImageAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImageAssetObject"')
      return ImageAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const StateMachineAssetObject_possibleTypes: string[] = ['StateMachineAssetObject']
    export const isStateMachineAssetObject = (obj?: { __typename?: any } | null): obj is StateMachineAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStateMachineAssetObject"')
      return StateMachineAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const ThemeAssetObject_possibleTypes: string[] = ['ThemeAssetObject']
    export const isThemeAssetObject = (obj?: { __typename?: any } | null): obj is ThemeAssetObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThemeAssetObject"')
      return ThemeAssetObject_possibleTypes.includes(obj.__typename)
    }
    


    const _PublicAnimationImportRequest_possibleTypes: string[] = ['_PublicAnimationImportRequest']
    export const is_PublicAnimationImportRequest = (obj?: { __typename?: any } | null): obj is _PublicAnimationImportRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_PublicAnimationImportRequest"')
      return _PublicAnimationImportRequest_possibleTypes.includes(obj.__typename)
    }
    


    const Service_possibleTypes: string[] = ['Service']
    export const isService = (obj?: { __typename?: any } | null): obj is Service => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isService"')
      return Service_possibleTypes.includes(obj.__typename)
    }
    


    const RasterToLottieJob_possibleTypes: string[] = ['RasterToLottieJob']
    export const isRasterToLottieJob = (obj?: { __typename?: any } | null): obj is RasterToLottieJob => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRasterToLottieJob"')
      return RasterToLottieJob_possibleTypes.includes(obj.__typename)
    }
    


    const RasterToLottieUploadUrl_possibleTypes: string[] = ['RasterToLottieUploadUrl']
    export const isRasterToLottieUploadUrl = (obj?: { __typename?: any } | null): obj is RasterToLottieUploadUrl => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRasterToLottieUploadUrl"')
      return RasterToLottieUploadUrl_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMemberConnection_possibleTypes: string[] = ['WorkspaceMemberConnection']
    export const isWorkspaceMemberConnection = (obj?: { __typename?: any } | null): obj is WorkspaceMemberConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMemberConnection"')
      return WorkspaceMemberConnection_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMemberEdge_possibleTypes: string[] = ['WorkspaceMemberEdge']
    export const isWorkspaceMemberEdge = (obj?: { __typename?: any } | null): obj is WorkspaceMemberEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMemberEdge"')
      return WorkspaceMemberEdge_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMember_possibleTypes: string[] = ['WorkspaceMember']
    export const isWorkspaceMember = (obj?: { __typename?: any } | null): obj is WorkspaceMember => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMember"')
      return WorkspaceMember_possibleTypes.includes(obj.__typename)
    }
    


    const UserObject_possibleTypes: string[] = ['UserObject']
    export const isUserObject = (obj?: { __typename?: any } | null): obj is UserObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserObject"')
      return UserObject_possibleTypes.includes(obj.__typename)
    }
    


    const Workspace_possibleTypes: string[] = ['Workspace']
    export const isWorkspace = (obj?: { __typename?: any } | null): obj is Workspace => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspace"')
      return Workspace_possibleTypes.includes(obj.__typename)
    }
    


    const Account_possibleTypes: string[] = ['Account']
    export const isAccount = (obj?: { __typename?: any } | null): obj is Account => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount"')
      return Account_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethod_possibleTypes: string[] = ['PaymentMethod']
    export const isPaymentMethod = (obj?: { __typename?: any } | null): obj is PaymentMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethod"')
      return PaymentMethod_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethodMetadata_possibleTypes: string[] = ['CardMetadata','PayPalMetadata']
    export const isPaymentMethodMetadata = (obj?: { __typename?: any } | null): obj is PaymentMethodMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethodMetadata"')
      return PaymentMethodMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const CardMetadata_possibleTypes: string[] = ['CardMetadata']
    export const isCardMetadata = (obj?: { __typename?: any } | null): obj is CardMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCardMetadata"')
      return CardMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const PayPalMetadata_possibleTypes: string[] = ['PayPalMetadata']
    export const isPayPalMetadata = (obj?: { __typename?: any } | null): obj is PayPalMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPayPalMetadata"')
      return PayPalMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const ContactSalesNotice_possibleTypes: string[] = ['ContactSalesNotice']
    export const isContactSalesNotice = (obj?: { __typename?: any } | null): obj is ContactSalesNotice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isContactSalesNotice"')
      return ContactSalesNotice_possibleTypes.includes(obj.__typename)
    }
    


    const FeatureObject_possibleTypes: string[] = ['FeatureObject']
    export const isFeatureObject = (obj?: { __typename?: any } | null): obj is FeatureObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFeatureObject"')
      return FeatureObject_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceInvitationLink_possibleTypes: string[] = ['WorkspaceInvitationLink']
    export const isWorkspaceInvitationLink = (obj?: { __typename?: any } | null): obj is WorkspaceInvitationLink => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceInvitationLink"')
      return WorkspaceInvitationLink_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceSubscription_possibleTypes: string[] = ['WorkspaceSubscription']
    export const isWorkspaceSubscription = (obj?: { __typename?: any } | null): obj is WorkspaceSubscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceSubscription"')
      return WorkspaceSubscription_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceObject_possibleTypes: string[] = ['WorkspaceObject']
    export const isWorkspaceObject = (obj?: { __typename?: any } | null): obj is WorkspaceObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceObject"')
      return WorkspaceObject_possibleTypes.includes(obj.__typename)
    }
    


    const OrganizationObject_possibleTypes: string[] = ['OrganizationObject']
    export const isOrganizationObject = (obj?: { __typename?: any } | null): obj is OrganizationObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationObject"')
      return OrganizationObject_possibleTypes.includes(obj.__typename)
    }
    


    const RatePlanObject_possibleTypes: string[] = ['RatePlanObject']
    export const isRatePlanObject = (obj?: { __typename?: any } | null): obj is RatePlanObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRatePlanObject"')
      return RatePlanObject_possibleTypes.includes(obj.__typename)
    }
    


    const PlanObject_possibleTypes: string[] = ['PlanObject']
    export const isPlanObject = (obj?: { __typename?: any } | null): obj is PlanObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPlanObject"')
      return PlanObject_possibleTypes.includes(obj.__typename)
    }
    


    const PlanEntitlement_possibleTypes: string[] = ['PlanEntitlement']
    export const isPlanEntitlement = (obj?: { __typename?: any } | null): obj is PlanEntitlement => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPlanEntitlement"')
      return PlanEntitlement_possibleTypes.includes(obj.__typename)
    }
    


    const NextBillingObject_possibleTypes: string[] = ['NextBillingObject']
    export const isNextBillingObject = (obj?: { __typename?: any } | null): obj is NextBillingObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNextBillingObject"')
      return NextBillingObject_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMemberSearchConnection_possibleTypes: string[] = ['WorkspaceMemberSearchConnection']
    export const isWorkspaceMemberSearchConnection = (obj?: { __typename?: any } | null): obj is WorkspaceMemberSearchConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMemberSearchConnection"')
      return WorkspaceMemberSearchConnection_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMemberSearchEdge_possibleTypes: string[] = ['WorkspaceMemberSearchEdge']
    export const isWorkspaceMemberSearchEdge = (obj?: { __typename?: any } | null): obj is WorkspaceMemberSearchEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMemberSearchEdge"')
      return WorkspaceMemberSearchEdge_possibleTypes.includes(obj.__typename)
    }
    


    const AuditLogConnection_possibleTypes: string[] = ['AuditLogConnection']
    export const isAuditLogConnection = (obj?: { __typename?: any } | null): obj is AuditLogConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogConnection"')
      return AuditLogConnection_possibleTypes.includes(obj.__typename)
    }
    


    const AuditLogItemEdge_possibleTypes: string[] = ['AuditLogItemEdge']
    export const isAuditLogItemEdge = (obj?: { __typename?: any } | null): obj is AuditLogItemEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogItemEdge"')
      return AuditLogItemEdge_possibleTypes.includes(obj.__typename)
    }
    


    const AuditLogItem_possibleTypes: string[] = ['AuditLogItem']
    export const isAuditLogItem = (obj?: { __typename?: any } | null): obj is AuditLogItem => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogItem"')
      return AuditLogItem_possibleTypes.includes(obj.__typename)
    }
    


    const AuditLogTarget_possibleTypes: string[] = ['AuditLogTarget']
    export const isAuditLogTarget = (obj?: { __typename?: any } | null): obj is AuditLogTarget => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogTarget"')
      return AuditLogTarget_possibleTypes.includes(obj.__typename)
    }
    


    const BillingPackagePrice_possibleTypes: string[] = ['BillingPackagePrice']
    export const isBillingPackagePrice = (obj?: { __typename?: any } | null): obj is BillingPackagePrice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBillingPackagePrice"')
      return BillingPackagePrice_possibleTypes.includes(obj.__typename)
    }
    


    const BillingPackage_possibleTypes: string[] = ['BillingPackage']
    export const isBillingPackage = (obj?: { __typename?: any } | null): obj is BillingPackage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBillingPackage"')
      return BillingPackage_possibleTypes.includes(obj.__typename)
    }
    


    const AddonPrice_possibleTypes: string[] = ['AddonPrice']
    export const isAddonPrice = (obj?: { __typename?: any } | null): obj is AddonPrice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAddonPrice"')
      return AddonPrice_possibleTypes.includes(obj.__typename)
    }
    


    const BillingPackageConnection_possibleTypes: string[] = ['BillingPackageConnection']
    export const isBillingPackageConnection = (obj?: { __typename?: any } | null): obj is BillingPackageConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBillingPackageConnection"')
      return BillingPackageConnection_possibleTypes.includes(obj.__typename)
    }
    


    const BillingPackageEdge_possibleTypes: string[] = ['BillingPackageEdge']
    export const isBillingPackageEdge = (obj?: { __typename?: any } | null): obj is BillingPackageEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBillingPackageEdge"')
      return BillingPackageEdge_possibleTypes.includes(obj.__typename)
    }
    


    const CancelReason_possibleTypes: string[] = ['CancelReason']
    export const isCancelReason = (obj?: { __typename?: any } | null): obj is CancelReason => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCancelReason"')
      return CancelReason_possibleTypes.includes(obj.__typename)
    }
    


    const CommentUser_possibleTypes: string[] = ['CommentUser']
    export const isCommentUser = (obj?: { __typename?: any } | null): obj is CommentUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentUser"')
      return CommentUser_possibleTypes.includes(obj.__typename)
    }
    


    const CommentConnection_possibleTypes: string[] = ['CommentConnection']
    export const isCommentConnection = (obj?: { __typename?: any } | null): obj is CommentConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentConnection"')
      return CommentConnection_possibleTypes.includes(obj.__typename)
    }
    


    const CommentEdge_possibleTypes: string[] = ['CommentEdge']
    export const isCommentEdge = (obj?: { __typename?: any } | null): obj is CommentEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentEdge"')
      return CommentEdge_possibleTypes.includes(obj.__typename)
    }
    


    const Comment_possibleTypes: string[] = ['Comment']
    export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
      return Comment_possibleTypes.includes(obj.__typename)
    }
    


    const CommentAttachment_possibleTypes: string[] = ['CommentAttachment']
    export const isCommentAttachment = (obj?: { __typename?: any } | null): obj is CommentAttachment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentAttachment"')
      return CommentAttachment_possibleTypes.includes(obj.__typename)
    }
    


    const CommentExtra_possibleTypes: string[] = ['CommentExtra']
    export const isCommentExtra = (obj?: { __typename?: any } | null): obj is CommentExtra => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentExtra"')
      return CommentExtra_possibleTypes.includes(obj.__typename)
    }
    


    const CommentAnnotation_possibleTypes: string[] = ['CommentAnnotation']
    export const isCommentAnnotation = (obj?: { __typename?: any } | null): obj is CommentAnnotation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentAnnotation"')
      return CommentAnnotation_possibleTypes.includes(obj.__typename)
    }
    


    const CommentUserMention_possibleTypes: string[] = ['CommentUserMention']
    export const isCommentUserMention = (obj?: { __typename?: any } | null): obj is CommentUserMention => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentUserMention"')
      return CommentUserMention_possibleTypes.includes(obj.__typename)
    }
    


    const CommentReaction_possibleTypes: string[] = ['CommentReaction']
    export const isCommentReaction = (obj?: { __typename?: any } | null): obj is CommentReaction => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentReaction"')
      return CommentReaction_possibleTypes.includes(obj.__typename)
    }
    


    const CommentReadReceipt_possibleTypes: string[] = ['CommentReadReceipt']
    export const isCommentReadReceipt = (obj?: { __typename?: any } | null): obj is CommentReadReceipt => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommentReadReceipt"')
      return CommentReadReceipt_possibleTypes.includes(obj.__typename)
    }
    


    const KeyCount_possibleTypes: string[] = ['KeyCount']
    export const isKeyCount = (obj?: { __typename?: any } | null): obj is KeyCount => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isKeyCount"')
      return KeyCount_possibleTypes.includes(obj.__typename)
    }
    


    const CommunityAnimationImportCounter_possibleTypes: string[] = ['CommunityAnimationImportCounter']
    export const isCommunityAnimationImportCounter = (obj?: { __typename?: any } | null): obj is CommunityAnimationImportCounter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommunityAnimationImportCounter"')
      return CommunityAnimationImportCounter_possibleTypes.includes(obj.__typename)
    }
    


    const EnterpriseOrganization_possibleTypes: string[] = ['EnterpriseOrganization']
    export const isEnterpriseOrganization = (obj?: { __typename?: any } | null): obj is EnterpriseOrganization => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnterpriseOrganization"')
      return EnterpriseOrganization_possibleTypes.includes(obj.__typename)
    }
    


    const EnterpriseOrganizationDirectoryMappings_possibleTypes: string[] = ['EnterpriseOrganizationDirectoryMappings']
    export const isEnterpriseOrganizationDirectoryMappings = (obj?: { __typename?: any } | null): obj is EnterpriseOrganizationDirectoryMappings => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnterpriseOrganizationDirectoryMappings"')
      return EnterpriseOrganizationDirectoryMappings_possibleTypes.includes(obj.__typename)
    }
    


    const EnterpriseOrganizationDomain_possibleTypes: string[] = ['EnterpriseOrganizationDomain']
    export const isEnterpriseOrganizationDomain = (obj?: { __typename?: any } | null): obj is EnterpriseOrganizationDomain => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnterpriseOrganizationDomain"')
      return EnterpriseOrganizationDomain_possibleTypes.includes(obj.__typename)
    }
    


    const OrganizationDirectoryClaim_possibleTypes: string[] = ['OrganizationDirectoryClaim']
    export const isOrganizationDirectoryClaim = (obj?: { __typename?: any } | null): obj is OrganizationDirectoryClaim => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationDirectoryClaim"')
      return OrganizationDirectoryClaim_possibleTypes.includes(obj.__typename)
    }
    


    const OrganizationDirectoryGroup_possibleTypes: string[] = ['OrganizationDirectoryGroup']
    export const isOrganizationDirectoryGroup = (obj?: { __typename?: any } | null): obj is OrganizationDirectoryGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrganizationDirectoryGroup"')
      return OrganizationDirectoryGroup_possibleTypes.includes(obj.__typename)
    }
    


    const EnterpriseOrganizationGroupUser_possibleTypes: string[] = ['EnterpriseOrganizationGroupUser']
    export const isEnterpriseOrganizationGroupUser = (obj?: { __typename?: any } | null): obj is EnterpriseOrganizationGroupUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEnterpriseOrganizationGroupUser"')
      return EnterpriseOrganizationGroupUser_possibleTypes.includes(obj.__typename)
    }
    


    const FileHandback_possibleTypes: string[] = ['FileHandback']
    export const isFileHandback = (obj?: { __typename?: any } | null): obj is FileHandback => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileHandback"')
      return FileHandback_possibleTypes.includes(obj.__typename)
    }
    


    const File_possibleTypes: string[] = ['File']
    export const isFile = (obj?: { __typename?: any } | null): obj is File => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFile"')
      return File_possibleTypes.includes(obj.__typename)
    }
    


    const FileVersion_possibleTypes: string[] = ['FileVersion']
    export const isFileVersion = (obj?: { __typename?: any } | null): obj is FileVersion => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVersion"')
      return FileVersion_possibleTypes.includes(obj.__typename)
    }
    


    const PlaySegment_possibleTypes: string[] = ['PlaySegment']
    export const isPlaySegment = (obj?: { __typename?: any } | null): obj is PlaySegment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPlaySegment"')
      return PlaySegment_possibleTypes.includes(obj.__typename)
    }
    


    const Folder_possibleTypes: string[] = ['Folder']
    export const isFolder = (obj?: { __typename?: any } | null): obj is Folder => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFolder"')
      return Folder_possibleTypes.includes(obj.__typename)
    }
    


    const Project_possibleTypes: string[] = ['Project']
    export const isProject = (obj?: { __typename?: any } | null): obj is Project => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject"')
      return Project_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectStats_possibleTypes: string[] = ['ProjectStats']
    export const isProjectStats = (obj?: { __typename?: any } | null): obj is ProjectStats => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectStats"')
      return ProjectStats_possibleTypes.includes(obj.__typename)
    }
    


    const FolderStats_possibleTypes: string[] = ['FolderStats']
    export const isFolderStats = (obj?: { __typename?: any } | null): obj is FolderStats => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFolderStats"')
      return FolderStats_possibleTypes.includes(obj.__typename)
    }
    


    const PublicAsset_possibleTypes: string[] = ['PublicAsset']
    export const isPublicAsset = (obj?: { __typename?: any } | null): obj is PublicAsset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicAsset"')
      return PublicAsset_possibleTypes.includes(obj.__typename)
    }
    


    const UserResourcePermission_possibleTypes: string[] = ['UserResourcePermission']
    export const isUserResourcePermission = (obj?: { __typename?: any } | null): obj is UserResourcePermission => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserResourcePermission"')
      return UserResourcePermission_possibleTypes.includes(obj.__typename)
    }
    


    const NextPrevAnimation_possibleTypes: string[] = ['NextPrevAnimation']
    export const isNextPrevAnimation = (obj?: { __typename?: any } | null): obj is NextPrevAnimation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNextPrevAnimation"')
      return NextPrevAnimation_possibleTypes.includes(obj.__typename)
    }
    


    const FileVariant_possibleTypes: string[] = ['FileVariant']
    export const isFileVariant = (obj?: { __typename?: any } | null): obj is FileVariant => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVariant"')
      return FileVariant_possibleTypes.includes(obj.__typename)
    }
    


    const FileVariantMetadata_possibleTypes: string[] = ['FileVariantMetadata']
    export const isFileVariantMetadata = (obj?: { __typename?: any } | null): obj is FileVariantMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVariantMetadata"')
      return FileVariantMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const FileVersionOptimizeJob_possibleTypes: string[] = ['FileVersionOptimizeJob']
    export const isFileVersionOptimizeJob = (obj?: { __typename?: any } | null): obj is FileVersionOptimizeJob => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVersionOptimizeJob"')
      return FileVersionOptimizeJob_possibleTypes.includes(obj.__typename)
    }
    


    const FileVersionConnection_possibleTypes: string[] = ['FileVersionConnection']
    export const isFileVersionConnection = (obj?: { __typename?: any } | null): obj is FileVersionConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVersionConnection"')
      return FileVersionConnection_possibleTypes.includes(obj.__typename)
    }
    


    const FileVersionEdge_possibleTypes: string[] = ['FileVersionEdge']
    export const isFileVersionEdge = (obj?: { __typename?: any } | null): obj is FileVersionEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileVersionEdge"')
      return FileVersionEdge_possibleTypes.includes(obj.__typename)
    }
    


    const FileConnection_possibleTypes: string[] = ['FileConnection']
    export const isFileConnection = (obj?: { __typename?: any } | null): obj is FileConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileConnection"')
      return FileConnection_possibleTypes.includes(obj.__typename)
    }
    


    const FileEdge_possibleTypes: string[] = ['FileEdge']
    export const isFileEdge = (obj?: { __typename?: any } | null): obj is FileEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileEdge"')
      return FileEdge_possibleTypes.includes(obj.__typename)
    }
    


    const Invoice_possibleTypes: string[] = ['Invoice']
    export const isInvoice = (obj?: { __typename?: any } | null): obj is Invoice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInvoice"')
      return Invoice_possibleTypes.includes(obj.__typename)
    }
    


    const InvoiceItem_possibleTypes: string[] = ['InvoiceItem']
    export const isInvoiceItem = (obj?: { __typename?: any } | null): obj is InvoiceItem => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInvoiceItem"')
      return InvoiceItem_possibleTypes.includes(obj.__typename)
    }
    


    const InvoiceFieldObject_possibleTypes: string[] = ['InvoiceFieldObject']
    export const isInvoiceFieldObject = (obj?: { __typename?: any } | null): obj is InvoiceFieldObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInvoiceFieldObject"')
      return InvoiceFieldObject_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupConnection_possibleTypes: string[] = ['LottieMockupConnection']
    export const isLottieMockupConnection = (obj?: { __typename?: any } | null): obj is LottieMockupConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupConnection"')
      return LottieMockupConnection_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupEdge_possibleTypes: string[] = ['LottieMockupEdge']
    export const isLottieMockupEdge = (obj?: { __typename?: any } | null): obj is LottieMockupEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupEdge"')
      return LottieMockupEdge_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockup_possibleTypes: string[] = ['LottieMockup']
    export const isLottieMockup = (obj?: { __typename?: any } | null): obj is LottieMockup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockup"')
      return LottieMockup_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAnimation_possibleTypes: string[] = ['LottieMockupAnimation']
    export const isLottieMockupAnimation = (obj?: { __typename?: any } | null): obj is LottieMockupAnimation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAnimation"')
      return LottieMockupAnimation_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAnimationConfig_possibleTypes: string[] = ['LottieMockupAnimationConfig']
    export const isLottieMockupAnimationConfig = (obj?: { __typename?: any } | null): obj is LottieMockupAnimationConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAnimationConfig"')
      return LottieMockupAnimationConfig_possibleTypes.includes(obj.__typename)
    }
    


    const Frame_possibleTypes: string[] = ['Frame']
    export const isFrame = (obj?: { __typename?: any } | null): obj is Frame => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFrame"')
      return Frame_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAsset_possibleTypes: string[] = ['LottieMockupAssetImage','LottieMockupAssetText']
    export const isLottieMockupAsset = (obj?: { __typename?: any } | null): obj is LottieMockupAsset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAsset"')
      return LottieMockupAsset_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAssetImage_possibleTypes: string[] = ['LottieMockupAssetImage']
    export const isLottieMockupAssetImage = (obj?: { __typename?: any } | null): obj is LottieMockupAssetImage => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAssetImage"')
      return LottieMockupAssetImage_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAssetFile_possibleTypes: string[] = ['LottieMockupAssetFile']
    export const isLottieMockupAssetFile = (obj?: { __typename?: any } | null): obj is LottieMockupAssetFile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAssetFile"')
      return LottieMockupAssetFile_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAssetText_possibleTypes: string[] = ['LottieMockupAssetText']
    export const isLottieMockupAssetText = (obj?: { __typename?: any } | null): obj is LottieMockupAssetText => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAssetText"')
      return LottieMockupAssetText_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupAssetTextConfig_possibleTypes: string[] = ['LottieMockupAssetTextConfig']
    export const isLottieMockupAssetTextConfig = (obj?: { __typename?: any } | null): obj is LottieMockupAssetTextConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupAssetTextConfig"')
      return LottieMockupAssetTextConfig_possibleTypes.includes(obj.__typename)
    }
    


    const LottieMockupCanvas_possibleTypes: string[] = ['LottieMockupCanvas']
    export const isLottieMockupCanvas = (obj?: { __typename?: any } | null): obj is LottieMockupCanvas => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLottieMockupCanvas"')
      return LottieMockupCanvas_possibleTypes.includes(obj.__typename)
    }
    


    const OfficialWorkspace_possibleTypes: string[] = ['OfficialWorkspace']
    export const isOfficialWorkspace = (obj?: { __typename?: any } | null): obj is OfficialWorkspace => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOfficialWorkspace"')
      return OfficialWorkspace_possibleTypes.includes(obj.__typename)
    }
    


    const OfficialWorkspaceMember_possibleTypes: string[] = ['OfficialWorkspaceMember']
    export const isOfficialWorkspaceMember = (obj?: { __typename?: any } | null): obj is OfficialWorkspaceMember => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOfficialWorkspaceMember"')
      return OfficialWorkspaceMember_possibleTypes.includes(obj.__typename)
    }
    


    const OnboardingChecklistObject_possibleTypes: string[] = ['OnboardingChecklistObject']
    export const isOnboardingChecklistObject = (obj?: { __typename?: any } | null): obj is OnboardingChecklistObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOnboardingChecklistObject"')
      return OnboardingChecklistObject_possibleTypes.includes(obj.__typename)
    }
    


    const OnboardingV2Object_possibleTypes: string[] = ['OnboardingV2Object']
    export const isOnboardingV2Object = (obj?: { __typename?: any } | null): obj is OnboardingV2Object => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOnboardingV2Object"')
      return OnboardingV2Object_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentIntent_possibleTypes: string[] = ['PaymentIntent']
    export const isPaymentIntent = (obj?: { __typename?: any } | null): obj is PaymentIntent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentIntent"')
      return PaymentIntent_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentIntentCollectionMethod_possibleTypes: string[] = ['PaymentIntentCollectionMethod']
    export const isPaymentIntentCollectionMethod = (obj?: { __typename?: any } | null): obj is PaymentIntentCollectionMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentIntentCollectionMethod"')
      return PaymentIntentCollectionMethod_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentIntentCollectionPaymentMethod_possibleTypes: string[] = ['PaymentIntentCollectionPaymentMethod']
    export const isPaymentIntentCollectionPaymentMethod = (obj?: { __typename?: any } | null): obj is PaymentIntentCollectionPaymentMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentIntentCollectionPaymentMethod"')
      return PaymentIntentCollectionPaymentMethod_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioPost_possibleTypes: string[] = ['PortfolioPost']
    export const isPortfolioPost = (obj?: { __typename?: any } | null): obj is PortfolioPost => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioPost"')
      return PortfolioPost_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioTag_possibleTypes: string[] = ['PortfolioTag']
    export const isPortfolioTag = (obj?: { __typename?: any } | null): obj is PortfolioTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioTag"')
      return PortfolioTag_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioPostConnection_possibleTypes: string[] = ['PortfolioPostConnection']
    export const isPortfolioPostConnection = (obj?: { __typename?: any } | null): obj is PortfolioPostConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioPostConnection"')
      return PortfolioPostConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioPostEdge_possibleTypes: string[] = ['PortfolioPostEdge']
    export const isPortfolioPostEdge = (obj?: { __typename?: any } | null): obj is PortfolioPostEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioPostEdge"')
      return PortfolioPostEdge_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspacePortfolio_possibleTypes: string[] = ['WorkspacePortfolio']
    export const isWorkspacePortfolio = (obj?: { __typename?: any } | null): obj is WorkspacePortfolio => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspacePortfolio"')
      return WorkspacePortfolio_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetConnection_possibleTypes: string[] = ['PremiumAssetConnection']
    export const isPremiumAssetConnection = (obj?: { __typename?: any } | null): obj is PremiumAssetConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetConnection"')
      return PremiumAssetConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetEdge_possibleTypes: string[] = ['PremiumAssetEdge']
    export const isPremiumAssetEdge = (obj?: { __typename?: any } | null): obj is PremiumAssetEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetEdge"')
      return PremiumAssetEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAsset_possibleTypes: string[] = ['PremiumAsset']
    export const isPremiumAsset = (obj?: { __typename?: any } | null): obj is PremiumAsset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAsset"')
      return PremiumAsset_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetContributor_possibleTypes: string[] = ['PremiumAssetContributor']
    export const isPremiumAssetContributor = (obj?: { __typename?: any } | null): obj is PremiumAssetContributor => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetContributor"')
      return PremiumAssetContributor_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetFormats_possibleTypes: string[] = ['PremiumAssetFormats']
    export const isPremiumAssetFormats = (obj?: { __typename?: any } | null): obj is PremiumAssetFormats => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetFormats"')
      return PremiumAssetFormats_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetMetadata_possibleTypes: string[] = ['PremiumAssetMetadata']
    export const isPremiumAssetMetadata = (obj?: { __typename?: any } | null): obj is PremiumAssetMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetMetadata"')
      return PremiumAssetMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetPack_possibleTypes: string[] = ['PremiumAssetPack']
    export const isPremiumAssetPack = (obj?: { __typename?: any } | null): obj is PremiumAssetPack => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetPack"')
      return PremiumAssetPack_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetRelatedAnimation_possibleTypes: string[] = ['PremiumAssetRelatedAnimation']
    export const isPremiumAssetRelatedAnimation = (obj?: { __typename?: any } | null): obj is PremiumAssetRelatedAnimation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetRelatedAnimation"')
      return PremiumAssetRelatedAnimation_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetTag_possibleTypes: string[] = ['PremiumAssetTag']
    export const isPremiumAssetTag = (obj?: { __typename?: any } | null): obj is PremiumAssetTag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetTag"')
      return PremiumAssetTag_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetPackConnection_possibleTypes: string[] = ['PremiumAssetPackConnection']
    export const isPremiumAssetPackConnection = (obj?: { __typename?: any } | null): obj is PremiumAssetPackConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetPackConnection"')
      return PremiumAssetPackConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetPackEdge_possibleTypes: string[] = ['PremiumAssetPackEdge']
    export const isPremiumAssetPackEdge = (obj?: { __typename?: any } | null): obj is PremiumAssetPackEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetPackEdge"')
      return PremiumAssetPackEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetPackDetailConnection_possibleTypes: string[] = ['PremiumAssetPackDetailConnection']
    export const isPremiumAssetPackDetailConnection = (obj?: { __typename?: any } | null): obj is PremiumAssetPackDetailConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetPackDetailConnection"')
      return PremiumAssetPackDetailConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PrivateShare_possibleTypes: string[] = ['PrivateShare']
    export const isPrivateShare = (obj?: { __typename?: any } | null): obj is PrivateShare => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrivateShare"')
      return PrivateShare_possibleTypes.includes(obj.__typename)
    }
    


    const PrivateShareResource_possibleTypes: string[] = ['File','WorkspaceCollection','Project']
    export const isPrivateShareResource = (obj?: { __typename?: any } | null): obj is PrivateShareResource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrivateShareResource"')
      return PrivateShareResource_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceCollection_possibleTypes: string[] = ['WorkspaceCollection']
    export const isWorkspaceCollection = (obj?: { __typename?: any } | null): obj is WorkspaceCollection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceCollection"')
      return WorkspaceCollection_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedMember_possibleTypes: string[] = ['SuggestedMember']
    export const isSuggestedMember = (obj?: { __typename?: any } | null): obj is SuggestedMember => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedMember"')
      return SuggestedMember_possibleTypes.includes(obj.__typename)
    }
    


    const PrivateShareConnection_possibleTypes: string[] = ['PrivateShareConnection']
    export const isPrivateShareConnection = (obj?: { __typename?: any } | null): obj is PrivateShareConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrivateShareConnection"')
      return PrivateShareConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PrivateShareEdge_possibleTypes: string[] = ['PrivateShareEdge']
    export const isPrivateShareEdge = (obj?: { __typename?: any } | null): obj is PrivateShareEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrivateShareEdge"')
      return PrivateShareEdge_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectFileConnection_possibleTypes: string[] = ['ProjectFileConnection']
    export const isProjectFileConnection = (obj?: { __typename?: any } | null): obj is ProjectFileConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectFileConnection"')
      return ProjectFileConnection_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectFileEdge_possibleTypes: string[] = ['ProjectFileEdge']
    export const isProjectFileEdge = (obj?: { __typename?: any } | null): obj is ProjectFileEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectFileEdge"')
      return ProjectFileEdge_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectFile_possibleTypes: string[] = ['File','Folder']
    export const isProjectFile = (obj?: { __typename?: any } | null): obj is ProjectFile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectFile"')
      return ProjectFile_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectConnection_possibleTypes: string[] = ['ProjectConnection']
    export const isProjectConnection = (obj?: { __typename?: any } | null): obj is ProjectConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectConnection"')
      return ProjectConnection_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectEdge_possibleTypes: string[] = ['ProjectEdge']
    export const isProjectEdge = (obj?: { __typename?: any } | null): obj is ProjectEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectEdge"')
      return ProjectEdge_possibleTypes.includes(obj.__typename)
    }
    


    const PublicShare_possibleTypes: string[] = ['PublicShare']
    export const isPublicShare = (obj?: { __typename?: any } | null): obj is PublicShare => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicShare"')
      return PublicShare_possibleTypes.includes(obj.__typename)
    }
    


    const PublicShareResource_possibleTypes: string[] = ['File','WorkspaceCollection']
    export const isPublicShareResource = (obj?: { __typename?: any } | null): obj is PublicShareResource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPublicShareResource"')
      return PublicShareResource_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspacePublicInfo_possibleTypes: string[] = ['WorkspacePublicInfo']
    export const isWorkspacePublicInfo = (obj?: { __typename?: any } | null): obj is WorkspacePublicInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspacePublicInfo"')
      return WorkspacePublicInfo_possibleTypes.includes(obj.__typename)
    }
    


    const RecentlyDeletedConnection_possibleTypes: string[] = ['RecentlyDeletedConnection']
    export const isRecentlyDeletedConnection = (obj?: { __typename?: any } | null): obj is RecentlyDeletedConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRecentlyDeletedConnection"')
      return RecentlyDeletedConnection_possibleTypes.includes(obj.__typename)
    }
    


    const RecentlyDeletedEdge_possibleTypes: string[] = ['RecentlyDeletedEdge']
    export const isRecentlyDeletedEdge = (obj?: { __typename?: any } | null): obj is RecentlyDeletedEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRecentlyDeletedEdge"')
      return RecentlyDeletedEdge_possibleTypes.includes(obj.__typename)
    }
    


    const RecentlyDeleted_possibleTypes: string[] = ['RecentlyDeleted']
    export const isRecentlyDeleted = (obj?: { __typename?: any } | null): obj is RecentlyDeleted => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRecentlyDeleted"')
      return RecentlyDeleted_possibleTypes.includes(obj.__typename)
    }
    


    const RecentlyDeletedResource_possibleTypes: string[] = ['File','Folder','Project']
    export const isRecentlyDeletedResource = (obj?: { __typename?: any } | null): obj is RecentlyDeletedResource => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRecentlyDeletedResource"')
      return RecentlyDeletedResource_possibleTypes.includes(obj.__typename)
    }
    


    const SearchWorkspaceResponse_possibleTypes: string[] = ['SearchWorkspaceResponse']
    export const isSearchWorkspaceResponse = (obj?: { __typename?: any } | null): obj is SearchWorkspaceResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchWorkspaceResponse"')
      return SearchWorkspaceResponse_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceCollectionConnection_possibleTypes: string[] = ['WorkspaceCollectionConnection']
    export const isWorkspaceCollectionConnection = (obj?: { __typename?: any } | null): obj is WorkspaceCollectionConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceCollectionConnection"')
      return WorkspaceCollectionConnection_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceCollectionEdge_possibleTypes: string[] = ['WorkspaceCollectionEdge']
    export const isWorkspaceCollectionEdge = (obj?: { __typename?: any } | null): obj is WorkspaceCollectionEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceCollectionEdge"')
      return WorkspaceCollectionEdge_possibleTypes.includes(obj.__typename)
    }
    


    const FolderConnection_possibleTypes: string[] = ['FolderConnection']
    export const isFolderConnection = (obj?: { __typename?: any } | null): obj is FolderConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFolderConnection"')
      return FolderConnection_possibleTypes.includes(obj.__typename)
    }
    


    const FolderEdge_possibleTypes: string[] = ['FolderEdge']
    export const isFolderEdge = (obj?: { __typename?: any } | null): obj is FolderEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFolderEdge"')
      return FolderEdge_possibleTypes.includes(obj.__typename)
    }
    


    const SourceFile_possibleTypes: string[] = ['SourceFile']
    export const isSourceFile = (obj?: { __typename?: any } | null): obj is SourceFile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSourceFile"')
      return SourceFile_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedInviteeConnection_possibleTypes: string[] = ['SuggestedInviteeConnection']
    export const isSuggestedInviteeConnection = (obj?: { __typename?: any } | null): obj is SuggestedInviteeConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedInviteeConnection"')
      return SuggestedInviteeConnection_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedInviteeEdge_possibleTypes: string[] = ['SuggestedInviteeEdge']
    export const isSuggestedInviteeEdge = (obj?: { __typename?: any } | null): obj is SuggestedInviteeEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedInviteeEdge"')
      return SuggestedInviteeEdge_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedInvitee_possibleTypes: string[] = ['SuggestedInvitee']
    export const isSuggestedInvitee = (obj?: { __typename?: any } | null): obj is SuggestedInvitee => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedInvitee"')
      return SuggestedInvitee_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedWorkspace_possibleTypes: string[] = ['SuggestedWorkspace']
    export const isSuggestedWorkspace = (obj?: { __typename?: any } | null): obj is SuggestedWorkspace => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedWorkspace"')
      return SuggestedWorkspace_possibleTypes.includes(obj.__typename)
    }
    


    const Organization_possibleTypes: string[] = ['Organization']
    export const isOrganization = (obj?: { __typename?: any } | null): obj is Organization => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrganization"')
      return Organization_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedWorkspaceConnection_possibleTypes: string[] = ['SuggestedWorkspaceConnection']
    export const isSuggestedWorkspaceConnection = (obj?: { __typename?: any } | null): obj is SuggestedWorkspaceConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedWorkspaceConnection"')
      return SuggestedWorkspaceConnection_possibleTypes.includes(obj.__typename)
    }
    


    const SuggestedWorkspaceEdge_possibleTypes: string[] = ['SuggestedWorkspaceEdge']
    export const isSuggestedWorkspaceEdge = (obj?: { __typename?: any } | null): obj is SuggestedWorkspaceEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuggestedWorkspaceEdge"')
      return SuggestedWorkspaceEdge_possibleTypes.includes(obj.__typename)
    }
    


    const UserNotificationSubscriptionConnection_possibleTypes: string[] = ['UserNotificationSubscriptionConnection']
    export const isUserNotificationSubscriptionConnection = (obj?: { __typename?: any } | null): obj is UserNotificationSubscriptionConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserNotificationSubscriptionConnection"')
      return UserNotificationSubscriptionConnection_possibleTypes.includes(obj.__typename)
    }
    


    const UserNotificationSubscriptionEdge_possibleTypes: string[] = ['UserNotificationSubscriptionEdge']
    export const isUserNotificationSubscriptionEdge = (obj?: { __typename?: any } | null): obj is UserNotificationSubscriptionEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserNotificationSubscriptionEdge"')
      return UserNotificationSubscriptionEdge_possibleTypes.includes(obj.__typename)
    }
    


    const UserNotificationSubscription_possibleTypes: string[] = ['UserNotificationSubscription']
    export const isUserNotificationSubscription = (obj?: { __typename?: any } | null): obj is UserNotificationSubscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserNotificationSubscription"')
      return UserNotificationSubscription_possibleTypes.includes(obj.__typename)
    }
    


    const OnboardingObject_possibleTypes: string[] = ['OnboardingObject']
    export const isOnboardingObject = (obj?: { __typename?: any } | null): obj is OnboardingObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOnboardingObject"')
      return OnboardingObject_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceColorPalette_possibleTypes: string[] = ['WorkspaceColorPalette']
    export const isWorkspaceColorPalette = (obj?: { __typename?: any } | null): obj is WorkspaceColorPalette => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceColorPalette"')
      return WorkspaceColorPalette_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceColorPaletteConnection_possibleTypes: string[] = ['WorkspaceColorPaletteConnection']
    export const isWorkspaceColorPaletteConnection = (obj?: { __typename?: any } | null): obj is WorkspaceColorPaletteConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceColorPaletteConnection"')
      return WorkspaceColorPaletteConnection_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceColorPaletteEdge_possibleTypes: string[] = ['WorkspaceColorPaletteEdge']
    export const isWorkspaceColorPaletteEdge = (obj?: { __typename?: any } | null): obj is WorkspaceColorPaletteEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceColorPaletteEdge"')
      return WorkspaceColorPaletteEdge_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceOwnershipTransfer_possibleTypes: string[] = ['WorkspaceOwnershipTransfer']
    export const isWorkspaceOwnershipTransfer = (obj?: { __typename?: any } | null): obj is WorkspaceOwnershipTransfer => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceOwnershipTransfer"')
      return WorkspaceOwnershipTransfer_possibleTypes.includes(obj.__typename)
    }
    


    const BrandObject_possibleTypes: string[] = ['BrandObject']
    export const isBrandObject = (obj?: { __typename?: any } | null): obj is BrandObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBrandObject"')
      return BrandObject_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceCountsObject_possibleTypes: string[] = ['WorkspaceCountsObject']
    export const isWorkspaceCountsObject = (obj?: { __typename?: any } | null): obj is WorkspaceCountsObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceCountsObject"')
      return WorkspaceCountsObject_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceSeatUtilization_possibleTypes: string[] = ['WorkspaceSeatUtilization']
    export const isWorkspaceSeatUtilization = (obj?: { __typename?: any } | null): obj is WorkspaceSeatUtilization => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceSeatUtilization"')
      return WorkspaceSeatUtilization_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceMemberPrice_possibleTypes: string[] = ['WorkspaceMemberPrice']
    export const isWorkspaceMemberPrice = (obj?: { __typename?: any } | null): obj is WorkspaceMemberPrice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceMemberPrice"')
      return WorkspaceMemberPrice_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceSettings_possibleTypes: string[] = ['WorkspaceSettings']
    export const isWorkspaceSettings = (obj?: { __typename?: any } | null): obj is WorkspaceSettings => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceSettings"')
      return WorkspaceSettings_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceSubscriptionAvailableDiscount_possibleTypes: string[] = ['WorkspaceSubscriptionAvailableDiscount']
    export const isWorkspaceSubscriptionAvailableDiscount = (obj?: { __typename?: any } | null): obj is WorkspaceSubscriptionAvailableDiscount => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceSubscriptionAvailableDiscount"')
      return WorkspaceSubscriptionAvailableDiscount_possibleTypes.includes(obj.__typename)
    }
    


    const AvailablePlanUpgrade_possibleTypes: string[] = ['AvailablePlanUpgrade']
    export const isAvailablePlanUpgrade = (obj?: { __typename?: any } | null): obj is AvailablePlanUpgrade => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAvailablePlanUpgrade"')
      return AvailablePlanUpgrade_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceSubscriptionCheckoutSessionMetadata_possibleTypes: string[] = ['WorkspaceSubscriptionCheckoutSessionMetadata']
    export const isWorkspaceSubscriptionCheckoutSessionMetadata = (obj?: { __typename?: any } | null): obj is WorkspaceSubscriptionCheckoutSessionMetadata => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceSubscriptionCheckoutSessionMetadata"')
      return WorkspaceSubscriptionCheckoutSessionMetadata_possibleTypes.includes(obj.__typename)
    }
    


    const ZipFile_possibleTypes: string[] = ['ZipFile']
    export const isZipFile = (obj?: { __typename?: any } | null): obj is ZipFile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isZipFile"')
      return ZipFile_possibleTypes.includes(obj.__typename)
    }
    


    const CommunityAnimationImportRequest_possibleTypes: string[] = ['CommunityAnimationImportRequest']
    export const isCommunityAnimationImportRequest = (obj?: { __typename?: any } | null): obj is CommunityAnimationImportRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCommunityAnimationImportRequest"')
      return CommunityAnimationImportRequest_possibleTypes.includes(obj.__typename)
    }
    


    const FileUploadRequest_possibleTypes: string[] = ['FileUploadRequest']
    export const isFileUploadRequest = (obj?: { __typename?: any } | null): obj is FileUploadRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileUploadRequest"')
      return FileUploadRequest_possibleTypes.includes(obj.__typename)
    }
    


    const InlineCheckoutSetupIntentCreatePayload_possibleTypes: string[] = ['InlineCheckoutSetupIntentCreatePayload']
    export const isInlineCheckoutSetupIntentCreatePayload = (obj?: { __typename?: any } | null): obj is InlineCheckoutSetupIntentCreatePayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInlineCheckoutSetupIntentCreatePayload"')
      return InlineCheckoutSetupIntentCreatePayload_possibleTypes.includes(obj.__typename)
    }
    


    const BackgroundImageObject_possibleTypes: string[] = ['BackgroundImageObject']
    export const isBackgroundImageObject = (obj?: { __typename?: any } | null): obj is BackgroundImageObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBackgroundImageObject"')
      return BackgroundImageObject_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentIntentToken_possibleTypes: string[] = ['PaymentIntentToken']
    export const isPaymentIntentToken = (obj?: { __typename?: any } | null): obj is PaymentIntentToken => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentIntentToken"')
      return PaymentIntentToken_possibleTypes.includes(obj.__typename)
    }
    


    const InvoicePaymentAttemptPayload_possibleTypes: string[] = ['InvoicePaymentAttemptPayload']
    export const isInvoicePaymentAttemptPayload = (obj?: { __typename?: any } | null): obj is InvoicePaymentAttemptPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInvoicePaymentAttemptPayload"')
      return InvoicePaymentAttemptPayload_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentProviderError_possibleTypes: string[] = ['PaymentProviderError']
    export const isPaymentProviderError = (obj?: { __typename?: any } | null): obj is PaymentProviderError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentProviderError"')
      return PaymentProviderError_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethodSetupPayload_possibleTypes: string[] = ['PaymentMethodSetupPayload']
    export const isPaymentMethodSetupPayload = (obj?: { __typename?: any } | null): obj is PaymentMethodSetupPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethodSetupPayload"')
      return PaymentMethodSetupPayload_possibleTypes.includes(obj.__typename)
    }
    


    const SetupIntent_possibleTypes: string[] = ['SetupIntent']
    export const isSetupIntent = (obj?: { __typename?: any } | null): obj is SetupIntent => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetupIntent"')
      return SetupIntent_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioImageUploadObject_possibleTypes: string[] = ['PortfolioImageUploadObject']
    export const isPortfolioImageUploadObject = (obj?: { __typename?: any } | null): obj is PortfolioImageUploadObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioImageUploadObject"')
      return PortfolioImageUploadObject_possibleTypes.includes(obj.__typename)
    }
    


    const PortfolioIconUploadObject_possibleTypes: string[] = ['PortfolioIconUploadObject']
    export const isPortfolioIconUploadObject = (obj?: { __typename?: any } | null): obj is PortfolioIconUploadObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortfolioIconUploadObject"')
      return PortfolioIconUploadObject_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetDownloadLink_possibleTypes: string[] = ['PremiumAssetDownloadLink']
    export const isPremiumAssetDownloadLink = (obj?: { __typename?: any } | null): obj is PremiumAssetDownloadLink => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetDownloadLink"')
      return PremiumAssetDownloadLink_possibleTypes.includes(obj.__typename)
    }
    


    const PremiumAssetDownloadLinkData_possibleTypes: string[] = ['PremiumAssetDownloadLinkData']
    export const isPremiumAssetDownloadLinkData = (obj?: { __typename?: any } | null): obj is PremiumAssetDownloadLinkData => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPremiumAssetDownloadLinkData"')
      return PremiumAssetDownloadLinkData_possibleTypes.includes(obj.__typename)
    }
    


    const FileUploadRequestStatus_possibleTypes: string[] = ['FileUploadRequestStatus']
    export const isFileUploadRequestStatus = (obj?: { __typename?: any } | null): obj is FileUploadRequestStatus => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFileUploadRequestStatus"')
      return FileUploadRequestStatus_possibleTypes.includes(obj.__typename)
    }
    


    const WorkflowTempFilePreSignedUploadRequest_possibleTypes: string[] = ['WorkflowTempFilePreSignedUploadRequest']
    export const isWorkflowTempFilePreSignedUploadRequest = (obj?: { __typename?: any } | null): obj is WorkflowTempFilePreSignedUploadRequest => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkflowTempFilePreSignedUploadRequest"')
      return WorkflowTempFilePreSignedUploadRequest_possibleTypes.includes(obj.__typename)
    }
    


    const WorkspaceIconUploadObject_possibleTypes: string[] = ['WorkspaceIconUploadObject']
    export const isWorkspaceIconUploadObject = (obj?: { __typename?: any } | null): obj is WorkspaceIconUploadObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspaceIconUploadObject"')
      return WorkspaceIconUploadObject_possibleTypes.includes(obj.__typename)
    }
    


    const CheckoutObject_possibleTypes: string[] = ['CheckoutObject']
    export const isCheckoutObject = (obj?: { __typename?: any } | null): obj is CheckoutObject => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckoutObject"')
      return CheckoutObject_possibleTypes.includes(obj.__typename)
    }
    

export const enumNotificationChannelType = {
   Chat: 'Chat' as const,
   Email: 'Email' as const,
   InApp: 'InApp' as const,
   Push: 'Push' as const,
   Sms: 'Sms' as const
}

export const enumAccountDeleteRequestType = {
   CANCEL_REQUEST: 'CANCEL_REQUEST' as const,
   REQUEST_DELETE: 'REQUEST_DELETE' as const
}

export const enumPublicAnimationUploadRequestFileType = {
   LOTTIE: 'LOTTIE' as const,
   DOT_LOTTIE: 'DOT_LOTTIE' as const
}

export const enumCollectionAnimationType = {
   ALL: 'ALL' as const,
   ANIMATION: 'ANIMATION' as const,
   STICKER: 'STICKER' as const
}

export const enumCollectionType = {
   PRIVATE: 'PRIVATE' as const,
   PUBLIC: 'PUBLIC' as const
}

export const enumComplaintType = {
   GUIDELINES_VIOLATION: 'GUIDELINES_VIOLATION' as const,
   OTHER: 'OTHER' as const,
   PLAGIARISM: 'PLAGIARISM' as const
}

export const enumContractType = {
   FREELANCE: 'FREELANCE' as const,
   FULLTIME: 'FULLTIME' as const
}

export const enumDurationFilterType = {
   ALL_TIME: 'ALL_TIME' as const,
   MONTHLY: 'MONTHLY' as const,
   WEEKLY: 'WEEKLY' as const
}

export const enumPublicAnimationStatusFilterType = {
   ALL: 'ALL' as const,
   PENDING: 'PENDING' as const,
   PUBLISHED: 'PUBLISHED' as const,
   REJECTED: 'REJECTED' as const
}

export const enumPreviewGenerationStatus = {
   FAILED: 'FAILED' as const,
   PENDING: 'PENDING' as const,
   PROCESSED: 'PROCESSED' as const
}

export const enumFileOptimizationStatus = {
   FAILED: 'FAILED' as const,
   PENDING: 'PENDING' as const,
   PROCESSED: 'PROCESSED' as const
}

export const enumRasterToLottieJobStatus = {
   active: 'active' as const,
   completed: 'completed' as const,
   delayed: 'delayed' as const,
   failed: 'failed' as const,
   prioritized: 'prioritized' as const,
   unknown: 'unknown' as const,
   waiting: 'waiting' as const
}

export const enumPaymentProvider = {
   Braintree: 'Braintree' as const,
   Stripe: 'Stripe' as const
}

export const enumCommentAnnotationType = {
   Point: 'Point' as const
}

export const enumCommentExtraType = {
   Annotation: 'Annotation' as const,
   Keyframe: 'Keyframe' as const
}

export const enumCommentMentionType = {
   UserMention: 'UserMention' as const
}

export const enumCommentableEntityType = {
   FileVersion: 'FileVersion' as const
}

export const enumFileType = {
   Animation: 'Animation' as const,
   CreatorFile: 'CreatorFile' as const,
   Folder: 'Folder' as const
}

export const enumLottieMockupAssetType = {
   animation: 'animation' as const,
   image: 'image' as const,
   text: 'text' as const
}

export const enumTemplateSize = {
   desktop: 'desktop' as const,
   mobile: 'mobile' as const,
   tablet: 'tablet' as const
}

export const enumPortfolioPostStatus = {
   Draft: 'Draft' as const,
   Published: 'Published' as const
}

export const enumPrivateShareType = {
   COLLECTION: 'COLLECTION' as const,
   FILE: 'FILE' as const,
   PROJECT: 'PROJECT' as const
}

export const enumPublicShareType = {
   COLLECTION: 'COLLECTION' as const,
   FILE: 'FILE' as const
}

export const enumRecentlyDeletedResourceType = {
   Collection: 'Collection' as const,
   File: 'File' as const,
   Folder: 'Folder' as const,
   Project: 'Project' as const
}

export const enumRecentlyDeletedStatus = {
   Idle: 'Idle' as const,
   Purging: 'Purging' as const,
   Restoring: 'Restoring' as const
}

export const enumWorkspaceDiscoveryJoinType = {
   INSTANT: 'INSTANT' as const,
   UPON_APPROVAL: 'UPON_APPROVAL' as const
}

export const enumZipFileType = {
   LOTTIE: 'LOTTIE' as const,
   DOTLOTTIE: 'DOTLOTTIE' as const,
   OPTIMIZED_DOTLOTTIE: 'OPTIMIZED_DOTLOTTIE' as const,
   OPTIMIZED_LOTTIE: 'OPTIMIZED_LOTTIE' as const
}

export const enumFileCreateTokenReferenceType = {
   COMMUNITY_ANIMATION: 'COMMUNITY_ANIMATION' as const
}

export const enumFileStatus = {
   Approved: 'Approved' as const,
   InProgress: 'InProgress' as const,
   NeedsReview: 'NeedsReview' as const,
   NoStatus: 'NoStatus' as const,
   Shipped: 'Shipped' as const
}

export const enumPlaySegmentAction = {
   Loop: 'Loop' as const,
   PlayOnce: 'PlayOnce' as const
}

export const enumZipEntryType = {
   FILE: 'FILE' as const,
   FOLDER: 'FOLDER' as const,
   PROJECT: 'PROJECT' as const
}
