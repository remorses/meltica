import { spawnSync } from 'child_process'

try {
    const output = spawnSync(
        '/Applications/kdenlive.app/Contents/MacOS/melt "sololevelling/page-000.jpg" in=:0.0 out=:5.0 "/Volumes/1tb sabrent/Screens/Screen Recording 2024-12-13 at 10.50.31.mov" -consumer xml:test.mlt',
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
