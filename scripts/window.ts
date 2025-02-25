import sdl from '@kmamal/sdl'

const window = sdl.video.createWindow({ title: "Hello, World!",  })

console.log(sdl.video.windows)

console.log('id',window.id)
