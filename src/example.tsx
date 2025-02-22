import { render } from 'jsx-xml'

function Example() {
    return <mlt root=''></mlt>
}

console.log(render(<Example />).end({ headless: true }))
