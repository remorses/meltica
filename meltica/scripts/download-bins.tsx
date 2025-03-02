#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { exec, spawn } from 'child_process'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'
import util from 'util'
import { createGunzip } from 'zlib'

const SHOTCUT_VERSION = 'v25.01.25'
const SHOTCUT_VERSION_NO_DOTS = '250125'
const DOWNLOAD_BASE_URL = `https://github.com/mltframework/shotcut/releases/download/${SHOTCUT_VERSION}`

type Os = 'win64' | 'linux' | 'mac'
// Define the releases to download
const releases = [
    {
        os: 'win64' satisfies Os,
        filename: `shotcut-win64-${SHOTCUT_VERSION_NO_DOTS}.zip`,
        extract: async ({ filepath, destDir }) => {
            console.log(`Extracting ${filepath} to ${destDir}...`)
            // Use a different approach to avoid ENOBUFS error
            // Create the destination directory first
            fs.mkdirSync(destDir, { recursive: true })

            // Use a more controlled approach with smaller chunks
            await execWithInheritedStdio(
                `mkdir -p "${destDir}" && unzip -q "${filepath}" -d "${destDir}"`,
            )
        },
    },
    {
        os: 'linux' satisfies Os,
        filename: `shotcut-linux-x86_64-${SHOTCUT_VERSION_NO_DOTS}.txz`,
        extract: async ({ filepath, destDir }) => {
            console.log(`Extracting ${filepath} to ${destDir}...`)
            fs.mkdirSync(destDir, { recursive: true })
            await execWithInheritedStdio(
                `tar -xf "${filepath}" -C "${destDir}"`,
            )
        },
    },
    {
        os: 'mac' satisfies Os,
        filename: `shotcut-macos-${SHOTCUT_VERSION_NO_DOTS}.dmg`,
        extract: async ({ filepath, destDir }) => {
            console.log(`Extracting ${filepath} to ${destDir}...`)

            try {
                // Get the actual volume name after mounting
                console.log(`Mounting DMG ${filepath}...`)
                const { stdout: mountOutput } = await execWithInheritedStdio(
                    `hdiutil attach "${filepath}" -nobrowse`,
                )

                // Parse the mount output to find the actual mount point
                const mountLines = mountOutput
                    .split('\n')
                    .filter((line) => line.includes('/Volumes/'))
                if (mountLines.length === 0) {
                    throw new Error(`Failed to mount DMG: ${filepath}`)
                }

                // Extract the mount point from the output
                const mountPointMatch = mountLines[0].match(/\/Volumes\/[^\s]+/)
                if (!mountPointMatch) {
                    throw new Error(
                        `Could not determine mount point from: ${mountLines[0]}`,
                    )
                }

                const actualMountPoint = mountPointMatch[0]
                console.log(`DMG mounted at: ${actualMountPoint}`)

                // Create destination directory
                fs.mkdirSync(destDir, { recursive: true })

                // Check if Shotcut.app exists in the mounted volume
                const appPath = path.join(actualMountPoint, 'Shotcut.app')
                if (fs.existsSync(appPath)) {
                    console.log(
                        `Copying Shotcut.app from ${appPath} to ${destDir}...`,
                    )
                    await execWithInheritedStdio(
                        `ditto "${appPath}" "${destDir}/Shotcut.app"`,
                    )
                } else {
                    // List contents to debug
                    const { stdout: lsOutput } = await execWithInheritedStdio(
                        `ls -la "${actualMountPoint}"`,
                    )
                    console.log(`Contents of mount point: ${lsOutput}`)
                    throw new Error(
                        `Shotcut.app not found in ${actualMountPoint}`,
                    )
                }

                // Unmount using the actual mount point
                console.log(`Unmounting ${actualMountPoint}...`)
                await execWithInheritedStdio(
                    `hdiutil detach "${actualMountPoint}" -force`,
                )
            } catch (error) {
                console.error('Error during DMG extraction:', error)

                // Try to clean up any mounted volumes that might be related
                try {
                    const { stdout: mountInfo } =
                        await execWithInheritedStdio('mount')
                    const shotcutVolumes = mountInfo
                        .split('\n')
                        .filter(
                            (line) =>
                                line.includes('Shotcut') &&
                                line.includes('/Volumes/'),
                        )

                    for (const volumeLine of shotcutVolumes) {
                        const volumeMatch =
                            volumeLine.match(/\/Volumes\/[^\s]+/)
                        if (volumeMatch) {
                            const volumePath = volumeMatch[0]
                            console.log(
                                `Attempting to unmount leftover volume: ${volumePath}`,
                            )
                            await execWithInheritedStdio(
                                `hdiutil detach "${volumePath}" -force`,
                            ).catch((e) => {
                                console.log(
                                    `Failed to unmount ${volumePath}: ${e.message}`,
                                )
                            })
                        }
                    }
                } catch (cleanupError) {
                    console.error('Error during cleanup:', cleanupError)
                }

                throw error
            }
        },
    },
]

async function downloadFile(url, outputPath): Promise<void> {
    console.log(`Downloading ${url} to ${outputPath}...`)

    try {
        // Use fetch with redirect: 'follow' to handle 302 redirects
        const token = process.env.GH_TOKEN
        if (!token) {
            throw new Error('GH_TOKEN environment variable not set')
        }
        let response = await fetch(url, {
            redirect: 'follow',
            headers: {
                Authorization: `Basic ${Buffer.from(`remorses:${token}`).toString('base64')}`,
                'accept-encoding': 'gzip,deflate',
            },
        })
        // Print the response headers in object format

        if (!response.ok) {
            throw new Error(
                `Failed to download ${url}: HTTP ${response.status} ${await response.text()}`,
            )
        }
        const isZipResponse = response.headers.get('content-type') === 'zip'

        if (isZipResponse) {
            // First, download the initial zip file
            const tempZipPath = `${outputPath}.temp.zip`
            const tempZipStream = createWriteStream(tempZipPath)

            // Convert the web ReadableStream to a Node.js Readable stream
            const nodeReadable = Readable.fromWeb(response.body! as any)

            await pipeline(nodeReadable, tempZipStream)
            console.log(`Initial zip download of ${url} completed`)

            // Create a temporary directory to extract the zip
            const tempDir = `${outputPath}.temp_dir`
            fs.mkdirSync(tempDir, { recursive: true })

            // Extract the single entry from the zip file using unzip command
            console.log(`Extracting content from ${tempZipPath}...`)
            await execWithInheritedStdio(
                `unzip -q "${tempZipPath}" -d "${tempDir}"`,
            )

            // Get the extracted file (should be only one)
            const extractedFiles = fs.readdirSync(tempDir)
            if (extractedFiles.length !== 1) {
                throw new Error(
                    `Expected 1 file in zip, found ${extractedFiles.length}`,
                )
            }

            // Move the extracted file to the final destination
            const extractedFilePath = path.join(tempDir, extractedFiles[0])
            fs.renameSync(extractedFilePath, outputPath)

            // Clean up temporary files
            fs.unlinkSync(tempZipPath)
            fs.rmSync(tempDir, { recursive: true })
        } else {
            // Direct download to the output path
            const fileStream = createWriteStream(outputPath)
            const nodeReadable = Readable.fromWeb(response.body! as any)
            await pipeline(nodeReadable, fileStream)
            console.log(`Direct download of ${url} completed`)
        }

        console.log(`Download and extraction of ${url} completed`)
    } catch (error) {
        console.error(`Download error for ${url}:`, error)
        throw error
    }
}

async function main() {
    console.log(`Downloading Shotcut ${SHOTCUT_VERSION} releases...`)

    // const artifacts = await getGitHubArtifacts(new Date('2025-01-25'))
    for (const release of releases) {
        const destDir = path.resolve(`../shotcut-binaries/${release.os}`)
        // Create destination directory if it doesn't exist
        fs.mkdirSync(destDir, { recursive: true })
        console.log(`Created destination directory: ${destDir}`)
        let downloadUrl = DOWNLOAD_BASE_URL + '/' + release.filename
        // let downloadUrl = artifacts[release.os]
        if (!downloadUrl) {
            throw new Error(`No download URL found for ${release.os}`)
        }
        const downloadPath = path.join(process.cwd(), release.filename)

        try {
            // Download the file
            await downloadFile(downloadUrl, downloadPath)

            // Extract the file
            await release.extract({ filepath: downloadPath, destDir })

            console.log(`Successfully processed ${release.os} release`)
        } catch (error) {
            console.error(`Error processing ${release.os} release:`, error)
        } finally {
            // Clean up downloaded file
            if (fs.existsSync(downloadPath)) {
                try {
                    fs.unlinkSync(downloadPath)
                    console.log(`Deleted downloaded file: ${downloadPath}`)
                } catch (error) {
                    console.error(`Failed to delete ${downloadPath}:`, error)
                }
            }
        }
    }

    console.log('All downloads completed!')
}

// Function to get all artifacts from GitHub Actions
async function getGitHubArtifacts(
    beforeDate?: Date,
): Promise<Record<Os, string>> {
    try {
        console.log('Fetching GitHub artifacts...')
        const { stdout } = await execWithInheritedStdio(
            'gh api repos/mltframework/shotcut/actions/artifacts --cache 60m --paginate --slurp',
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
                        result[os] = artifact.archive_download_url

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

// New function that uses spawn and returns stdout
function execWithInheritedStdio(command: string): Promise<{ stdout: string }> {
    return new Promise((resolve, reject) => {
        let stdout = ''
        const childProcess = spawn(command, {
            shell: true,
        })

        childProcess.stdout.on('data', (data) => {
            stdout += data.toString()
        })

        childProcess.stderr.pipe(process.stderr)

        childProcess.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout })
            } else {
                reject(new Error(`Command failed with exit code ${code}`))
            }
        })

        childProcess.on('error', (err) => {
            reject(err)
        })
    })
}

main().catch((error) => {
    console.error('Error:', error)
    process.exit(1)
})
