import { getGitHubArtifacts } from 'meltica/scripts/artifacts'

async function main() {
    const res = await getGitHubArtifacts({ beforeDate: new Date('2025-01-17'), repo: 'mltframework/mlt' })
    console.log(res)
}

main()
