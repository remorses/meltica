import { render, JsxXmlElement } from 'jsx-xml'

function Example({ children }) {
    console.log(children.map(x => x))
    return (
        <mlt LC_NUMERIC='en_US.UTF-8' version='7.30.0'>
            <profile
                description='HD 1080p 30 fps'
                frame_rate_num='30'
                frame_rate_den='1'
                width='1920'
                height='1080'
                progressive='1'
                sample_aspect_num='1'
                sample_aspect_den='1'
                display_aspect_num='16'
                display_aspect_den='9'
                colorspace='709'
            />
            {children}
        </mlt>
    )
}

console.log(
    render(
        <Example>
            <producer id='producer1'>
                <property name='resource'>video.mp4</property>
                <property name='mlt_service'>avformat</property>
            </producer>
            <playlist id='main_bin'>
                <entry producer='producer1' />
            </playlist>
        </Example>,
    ).end({ headless: true, prettyPrint: true }),
)
