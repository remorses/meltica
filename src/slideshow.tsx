import { render } from 'jsx-xml'
import { writeFileSync } from 'fs'

// Utility to generate unique IDs
let idCounter = 0
const generateId = (prefix: string) => {
    idCounter++
    return `${prefix}${idCounter}`
}



// Enhanced Producer component for images/videos
function ImageProducer({
    resource,
    duration = '00:00:05.000',
    inTime = '00:00:00.000',
    kdenliveId,
}: {
    resource: string
    duration?: string
    inTime?: string
    kdenliveId?: number
}) {
    const id = generateId('producer')
    const outTime = '00:00:04.967' // Calculate based on duration

    return (
        <producer id={id} in={inTime} out={outTime}>
            <property name='length'>{duration}</property>
            <property name='eof'>pause</property>
            <property name='resource'>{resource}</property>
            <property name='ttl'>25</property>
            <property name='aspect_ratio'>1</property>
            <property name='meta.media.progressive'>1</property>
            <property name='seekable'>1</property>
            <property name='format'>1</property>
            <property name='meta.media.width'>720</property>
            <property name='meta.media.height'>2342</property>
            <property name='mlt_service'>qimage</property>
            <property name='kdenlive:duration'>{duration}</property>
            <property name='kdenlive:folderid'>-1</property>
            <property name='kdenlive:id'>
                {kdenliveId || generateId('')}
            </property>
            <property name='kdenlive:clip_type'>2</property>
        </producer>
    )
}

// Audio Track component (combines producer, playlist, and tractor)
function AudioTrack({
    resource,
    trackNumber,
    inTime = '00:00:00.000',
    outTime,
    volume = 1.0,
    kdenliveId,
}: {
    resource: string
    trackNumber: number
    inTime?: string
    outTime: string
    volume?: number
    kdenliveId?: number
}) {
    const chainId = generateId('chain')
    const playlistId = generateId('playlist')
    const tractorId = generateId('tractor')
    const filterId = generateId('filter')

    return (
        <>
            {/* Producer */}
            <chain id={chainId} out={outTime}>
                <property name='length'>436</property>
                <property name='eof'>pause</property>
                <property name='resource'>{resource}</property>
                <property name='mlt_service'>avformat</property>
                <property name='seekable'>1</property>
                <property name='audio_index'>0</property>
                <property name='video_index'>-1</property>
                <property name='kdenlive:id'>
                    {kdenliveId || generateId('')}
                </property>
                <property name='kdenlive:clip_type'>1</property>
            </chain>

            {/* Playlist */}
            <playlist id={playlistId}>
                <property name='kdenlive:audio_track'>{trackNumber}</property>
                <entry in={inTime} out={outTime} producer={chainId}>
                    <filter id={filterId}>
                        <property name='window'>75</property>
                        <property name='max_gain'>20dB</property>
                        <property name='mlt_service'>volume</property>
                        <property name='kdenlive_id'>gain</property>
                        <property name='gain'>{volume}</property>
                        <property name='kdenlive:collapsed'>0</property>
                    </filter>
                </entry>
            </playlist>

            {/* Tractor */}
            <tractor id={tractorId} in={inTime} out={outTime}>
                <property name='kdenlive:audio_track'>{trackNumber}</property>
                <track hide='video' producer={playlistId} />
            </tractor>
        </>
    )
}

function MLT() {
    return (
        <mlt LC_NUMERIC='en_US.UTF-8' producer='main_bin' version='7.30.0'>
            <consumer
                f='mp4'
                acodec='aac'
                vcodec='libx264'
                ab='160k'
                channels='2'
                crf='23'
                deinterlacer='onefield'
                g='15'
                in='0'
                mlt_service='avformat'
                movflags='+faststart'
                preset='veryfast'
                real_time='-1'
                rescale='bilinear'
                target='./out.mp4'
                threads='0'
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

            {/* Images */}
            <ImageProducer
                resource='sololevelling/page-000.jpg'
                kdenliveId={5}
            />
            <ImageProducer
                resource='sololevelling/page-001.jpg'
                kdenliveId={6}
            />

            {/* Audio Tracks */}
            <AudioTrack
                resource='narrator.wav'
                trackNumber={1}
                outTime='00:00:14.500'
                volume={0.2}
                kdenliveId={12}
            />

            {/* Main bin */}
            <playlist id='main_bin'>
                <entry
                    producer='producer1'
                    in='00:00:00.000'
                    out='00:00:04.967'
                />
            </playlist>

            {/* Project tractor */}
            <tractor id='tractor5' in='00:00:00.000' out='00:00:15.533'>
                <property name='kdenlive:projectTractor'>1</property>
                <track producer='tractor4' />
            </tractor>
        </mlt>
    )
}

writeFileSync(
    'slideshow.kdenlive',
    render(<MLT />).end({
        headless: false,
        prettyPrint: true,
        allowEmptyTags: false,
    }),
)
