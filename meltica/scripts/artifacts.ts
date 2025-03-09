import { execWithInheritedStdio } from 'meltica/src/utils'
export type Os = 'win64' | 'linux' | 'mac'
// Function to get all artifacts from GitHub Actions
export async function getGitHubArtifacts({
    repo = 'mltframework/shotcut',
    beforeDate,
}: {
    repo?: string,
    beforeDate?: Date,
} = {}): Promise<Record<Os, string>> {
    try {
        console.log(`Fetching GitHub artifacts for ${repo}...`)
        const { stdout } = await execWithInheritedStdio(
            `gh api repos/${repo}/actions/artifacts --cache 60m --paginate --slurp`,
        )

        // Parse the JSON response
        const response = JSON.parse(stdout)

        // Define types for the artifact structure
        type Artifact = {
            id: number
            name: string
            archive_download_url: string
            created_at: string
            expired: boolean
            size_in_bytes: number
            workflow_run?: {
                id: number
                repository_id: number
                head_repository_id: number
                head_branch: string
                head_sha: string
            }
        }

        type ArtifactsResponse = {
            total_count: number
            artifacts: Artifact[]
        }

        const typedResponse = response as ArtifactsResponse[]

        // Map artifact names to OS types
        const artifactNameToOs: Record<string, Os> = {
            'unsigned-dmg': 'mac',
            'windows-portable': 'win64',
            'linux-portable': 'linux',
        }

        // Initialize result object
        const result: Record<Os, string> = {
            mac: '',
            win64: '',
            linux: '',
        }

        for (let page of typedResponse) {
            // Find the first valid artifact for each OS
            for (const artifact of page.artifacts) {
                const artifactName = artifact.name
                const artifactDate = new Date(artifact.created_at)

                // Skip artifacts created after the beforeDate if specified
                if (beforeDate && artifactDate > beforeDate) {
                    continue
                }

                if (artifactName in artifactNameToOs && !artifact.expired) {
                    const os = artifactNameToOs[artifactName]

                    // Only set the URL if we haven't found one for this OS yet
                    if (!result[os]) {
                        console.log(artifact)
                        const workflowRunId = artifact.workflow_run?.id
                        const artifactUrl = `https://github.com/${repo}/actions/runs/${workflowRunId}/artifacts/${artifact.id}`
                        result[os] = artifact.archive_download_url
                        result[os] = artifactUrl

                        // Log information about the selected artifact
                        const createdDate = artifactDate.toLocaleString()
                        const sizeMB = (
                            artifact.size_in_bytes /
                            (1024 * 1024)
                        ).toFixed(2)
                        console.log(
                            `Selected ${artifactName} for ${os} (${sizeMB} MB) created on ${createdDate}`,
                        )
                    }
                }

                // Check if we have found one for each OS
                if (Object.values(result).every((url) => url !== '')) {
                    break
                }
            }
        }
        // https://github.com/${repo}/actions/runs/13738365960/artifacts/2715879078
        // https://github.com/${repo}/actions/runs/12808572222/artifacts/2440483272
        return result
    } catch (error) {
        console.error('Error fetching GitHub artifacts:', error)
        return {
            mac: '',
            win64: '',
            linux: '',
        }
    }
}
