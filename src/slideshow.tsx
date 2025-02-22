import { render } from 'jsx-xml'
import { writeFileSync } from 'fs'

// Common property types
type CommonProps = {
    id?: string
    in?: string
    out?: string
    length?: string | number
}

// Property component
function Property({ name, children = null as any }) {
    return <property name={name}>{children}</property>
}

// Producer component
function Producer({
    id,
    in: inTime = '00:00:00.000',
    out,
    resource,
    children,
}: CommonProps & {
    resource?: string
    children?: any
}) {
    return (
        <producer id={id} in={inTime} out={out}>
            {children}
        </producer>
    )
}

// Chain component
function Chain({ id, out, resource, children = null as any }) {
    return (
        <chain id={id} out={out}>
            {children}
        </chain>
    )
}

// Playlist component
function Playlist({ id, children }: { id: string; children?: any }) {
    return <playlist id={id}>{children}</playlist>
}

// Tractor component
function Tractor({
    id,
    in: inTime,
    out,
    children,
}: CommonProps & {
    children?: any
}) {
    return (
        <tractor id={id} in={inTime} out={out}>
            {children}
        </tractor>
    )
}

// Filter component
function Filter({ id, children }: { id: string; children?: any }) {
    return <filter id={id}>{children}</filter>
}

function MLT() {
    return (
        <mlt LC_NUMERIC='en_US.UTF-8' producer='main_bin' version='7.30.0'>
            <consumer
                ab='160k'
                acodec='aac'
                channels='2'
                crf='23'
                deinterlacer='onefield'
                f='mp4'
                g='15'
                in='0'
                mlt_service='avformat'
                movflags='+faststart'
                preset='veryfast'
                real_time='-1'
                rescale='bilinear'
                target='./out.mp4'
                threads='0'
                vcodec='libx264'
            />

            <profile
                colorspace='709'
                description='Vertical HD 30 fps'
                display_aspect_den='16'
                display_aspect_num='9'
                frame_rate_den='1'
                frame_rate_num='30'
                height='1920'
                progressive='1'
                sample_aspect_den='1'
                sample_aspect_num='1'
                width='1080'
            />

            {/* Producers */}
            <Producer id='producer6' in='00:00:00.000' out='00:00:00.967'>
                <Property name='length'>00:00:01.000</Property>
                <Property name='eof'>pause</Property>
                <Property name='resource'>
                    /Users/morse/Library/Caches/kdenlive/1740250889506/preview/75.mov
                </Property>
                <Property name='kdenlive:id'>3</Property>
                <Property name='kdenlive:control_uuid'>{`{5efa1694-ca6a-4d76-b297-cf5e50739474}`}</Property>
            </Producer>

            {/* Chains */}
            <Chain id='chain3' out='00:00:14.500'>
                <Property name='length'>436</Property>
                <Property name='eof'>pause</Property>
                <Property name='resource'>narrator.wav</Property>
                <Property name='kdenlive:id'>12</Property>
                <Property name='kdenlive:control_uuid'>{`{bd02d3d0-39c1-4f84-a9dd-46f0d7f09794}`}</Property>
            </Chain>

            {/* Playlists */}
            <Playlist id='playlist0'>
                <Property name='kdenlive:audio_track'>1</Property>
                <entry in='00:00:00.000' out='00:00:15.533' producer='chain0'>
                    <Property name='kdenlive:id'>8</Property>
                    <Filter id='filter0'>
                        <Property name='window'>75</Property>
                        <Property name='max_gain'>20dB</Property>
                        <Property name='mlt_service'>volume</Property>
                        <Property name='kdenlive_id'>gain</Property>
                        <Property name='gain'>0.2</Property>
                        <Property name='kdenlive:collapsed'>0</Property>
                    </Filter>
                </entry>
            </Playlist>

            {/* Tractors */}
            <Tractor id='tractor0' in='00:00:00.000' out='00:00:15.533'>
                <Property name='kdenlive:audio_track'>1</Property>
                <track hide='video' producer='playlist0' />
                <track hide='video' producer='playlist1' />
            </Tractor>

            {/* Main bin */}
            <playlist id='main_bin'>
                <entry
                    in='00:00:00.000'
                    out='00:00:00.967'
                    producer='producer6'
                />
            </playlist>

            {/* Project tractor */}
            <Tractor id='tractor5' in='00:00:00.000' out='00:00:15.533'>
                <Property name='kdenlive:projectTractor'>1</Property>
                <track
                    in='00:00:00.000'
                    out='00:00:15.533'
                    producer='tractor4'
                />
            </Tractor>
        </mlt>
    )
}


writeFileSync(
    'slideshow.kdenlive',
    render(<MLT />).end({
        headless: false,
        prettyPrint: true,
        allowEmptyTags: false,
    })
)
