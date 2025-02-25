import { spawnSync } from 'child_process'

try {
    const output = spawnSync(
        '/Applications/kdenlive.app/Contents/MacOS/melt ./kdentlivetest.kdenlive',
        {
            shell: true,
            stdio: 'inherit',
        },
    )
    if (output.error) {
        throw output.error
    }
} catch (error) {
    console.error(`Error executing melt: ${error}`)
}
