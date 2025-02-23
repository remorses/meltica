import { spawnSync } from 'child_process'

console.time('meltExecutionTime')

try {
    const output = spawnSync(
        '/Applications/kdenlive.app/Contents/MacOS/melt "narrator.wav"  "sololevelling/page-002.jpg" "/Volumes/1tb sabrent/Screens/Screen Recording 2024-12-13 at 10.50.31.mov" -consumer xml:test.mlt',
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
} finally {
    console.timeEnd('meltExecutionTime')
}
