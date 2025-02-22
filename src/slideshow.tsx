import { render } from 'jsx-xml'
import { writeFileSync } from 'fs'

// Utility to generate unique IDs
let idCounter = 0
const generateId = (prefix: string) => {
    idCounter++
    return `${prefix}${idCounter}`
}

// Preview Producer component
function PreviewProducer({
    resource,
    length = '00:00:01.000',
    inTime = '00:00:00.000',
    outTime = '00:00:00.967',
    kdenliveId,
}: {
    resource: string
    length?: string
    inTime?: string
    outTime?: string
    kdenliveId?: number
}) {
    const id = generateId('producer')

    return (
        <producer id={id} in={inTime} out={outTime}>
            <property name="length">{length}</property>
            <property name="eof">pause</property>
            <property name="resource">{resource}</property>
            <property name="audio_index">-1</property>
            <property name="video_index">0</property>
            <property name="mute_on_pause">0</property>
            <property name="mlt_service">avformat-novalidate</property>
            <property name="meta.media.nb_streams">1</property>
            <property name="meta.media.0.stream.type">video</property>
            <property name="meta.media.0.stream.frame_rate">25</property>
            <property name="meta.media.0.stream.sample_aspect_ratio">1</property>
            <property name="meta.media.0.codec.width">1920</property>
            <property name="meta.media.0.codec.height">1080</property>
            <property name="meta.media.0.codec.rotate">0</property>
            <property name="meta.media.0.codec.pix_fmt">yuv422p</property>
            <property name="meta.media.0.codec.sample_aspect_ratio">0</property>
            <property name="meta.media.0.codec.colorspace">709</property>
            <property name="meta.media.0.codec.color_trc">1</property>
            <property name="meta.media.0.codec.name">dnxhd</property>
            <property name="meta.media.0.codec.long_name">VC3/DNxHD</property>
            <property name="meta.media.0.codec.bit_rate">37683200</property>
            <property name="meta.attr.0.stream.handler_name.markup">VideoHandler</property>
            <property name="meta.attr.0.stream.vendor_id.markup">FFMP</property>
            <property name="meta.attr.major_brand.markup">qt  </property>
            <property name="meta.attr.minor_version.markup">512</property>
            <property name="meta.attr.compatible_brands.markup">qt  </property>
            <property name="meta.attr.encoder.markup">Lavf61.7.100</property>
            <property name="seekable">1</property>
            <property name="meta.media.sample_aspect_num">1</property>
            <property name="meta.media.sample_aspect_den">1</property>
            <property name="aspect_ratio">1</property>
            <property name="format">3</property>
            <property name="vstream">0</property>
            <property name="meta.media.frame_rate_num">25</property>
            <property name="meta.media.frame_rate_den">1</property>
            <property name="meta.media.colorspace">709</property>
            <property name="meta.media.color_trc">1</property>
            <property name="meta.media.has_b_frames">0</property>
            <property name="meta.media.width">1920</property>
            <property name="meta.media.height">1080</property>
            <property name="meta.media.aspect_ratio">1</property>
            <property name="meta.media.color_range">mpeg</property>
            <property name="meta.media.top_field_first">0</property>
            <property name="meta.media.progressive">1</property>
            <property name="kdenlive:id">{kdenliveId || generateId('')}</property>
            <property name="kdenlive:clip_type">2</property>
            <property name="kdenlive:folderid">-1</property>
        </producer>
    )
}

// Image Producer component
function ImageProducer({
    resource,
    duration = '00:00:05.000',
    inTime = '00:00:00.000',
    outTime = '00:00:19.200',
    kdenliveId,
}: {
    resource: string
    duration?: string
    inTime?: string
    outTime?: string
    kdenliveId?: number
}) {
    const id = generateId('producer')

    return (
        <producer id={id} in={inTime} out={outTime}>
            <property name="length">{duration}</property>
            <property name="eof">pause</property>
            <property name="resource">{resource}</property>
            <property name="ttl">25</property>
            <property name="aspect_ratio">1</property>
            <property name="meta.media.progressive">1</property>
            <property name="seekable">1</property>
            <property name="format">1</property>
            <property name="meta.media.width">720</property>
            <property name="meta.media.height">2342</property>
            <property name="mlt_service">qimage</property>
            <property name="kdenlive:duration">{duration}</property>
            <property name="xml">was here</property>
            <property name="kdenlive:folderid">-1</property>
            <property name="kdenlive:id">{kdenliveId}</property>
            <property name="kdenlive:clip_type">2</property>
        </producer>
    )
}

// Audio Chain component
function AudioChain({
    resource,
    outTime,
    kdenliveId,
}: {
    resource: string
    outTime: string
    kdenliveId?: number
}) {
    const id = generateId('chain')

    return (
        <chain id={id} in="00:00:00.000" out={outTime}>
            <property name="length">436</property>
            <property name="eof">pause</property>
            <property name="resource">{resource}</property>
            <property name="mlt_service">avformat</property>
            <property name="seekable">1</property>
            <property name="audio_index">0</property>
            <property name="video_index">-1</property>
            <property name="astream">0</property>
            <property name="kdenlive:id">{kdenliveId}</property>
            <property name="kdenlive:clip_type">1</property>
            <property name="kdenlive:folderid">-1</property>
        </chain>
    )
}

function MLT() {
    return (
        <mlt LC_NUMERIC="en_US.UTF-8" producer="main_bin" root="/Users/morse/Documents/kdenlive" version="7.30.0">
            <profile
                colorspace="709"
                description="Vertical HD 30 fps"
                display_aspect_den="16"
                display_aspect_num="9"
                frame_rate_den="1"
                frame_rate_num="30"
                height="1920"
                progressive="1"
                sample_aspect_den="1"
                sample_aspect_num="1"
                width="1080"
            />

            <ImageProducer
                resource="/Users/morse/Documents/GitHub/ugcvideos.org/website/sololevelling/page-000.jpg"
                kdenliveId={5}
            />

            <ImageProducer
                resource="/Users/morse/Documents/GitHub/ugcvideos.org/website/sololevelling/page-001.jpg"
                outTime="00:00:04.967"
                kdenliveId={6}
            />

            <ImageProducer
                resource="/Users/morse/Documents/GitHub/ugcvideos.org/website/sololevelling/page-002.jpg"
                outTime="00:00:04.967"
                kdenliveId={7}
            />

            <ImageProducer
                resource="sololevelling/page-000.jpg"
                outTime="00:00:04.967"
                kdenliveId={4}
            />

            <AudioChain
                resource="edapollo - Let It Go [bQ5glYCsv94].mp3"
                outTime="00:02:15.100"
                kdenliveId={8}
            />

            <playlist id="main_bin">
                <property name="kdenlive:folder.-1.2">Sequences</property>
                <property name="kdenlive:sequenceFolder">2</property>
                
                <property name="kdenlive:docproperties.audioChannels">2</property>
                <property name="kdenlive:docproperties.browserurl">/Users/morse/Documents/</property>
                <property name="kdenlive:docproperties.documentid">1740250889506</property>
                <property name="kdenlive:docproperties.enableTimelineZone">0</property>
                <property name="kdenlive:docproperties.enableexternalproxy">0</property>
                <property name="kdenlive:docproperties.enableproxy">0</property>
                <property name="kdenlive:docproperties.externalproxyparams"/>
                <property name="kdenlive:docproperties.generateimageproxy">0</property>
                <property name="kdenlive:docproperties.generateproxy">0</property>
                <property name="kdenlive:docproperties.kdenliveversion">24.12.2</property>

                <property name="kdenlive:docproperties.previewextension">mov</property>
                <property name="kdenlive:docproperties.previewparameters">r=25 s=1920x1080 vb=36M threads=0 vcodec=dnxhd progressive=1</property>
                <property name="kdenlive:docproperties.profile">vertical_hd_30</property>
                <property name="kdenlive:docproperties.proxyextension"/>
                <property name="kdenlive:docproperties.proxyimageminsize">2000</property>
                <property name="kdenlive:docproperties.proxyimagesize">800</property>
                <property name="kdenlive:docproperties.proxyminsize">1000</property>
                <property name="kdenlive:docproperties.proxyparams"/>
                <property name="kdenlive:docproperties.proxyresize">640</property>
                <property name="kdenlive:docproperties.rendercategory">Generic (HD for web, mobile devices...)</property>
                <property name="kdenlive:docproperties.rendercustomquality">-1</property>
                <property name="kdenlive:docproperties.renderendguide">-1</property>
                <property name="kdenlive:docproperties.renderexportaudio">0</property>
                <property name="kdenlive:docproperties.renderfullcolorrange">0</property>
                <property name="kdenlive:docproperties.rendermode">0</property>
                <property name="kdenlive:docproperties.renderplay">0</property>
                <property name="kdenlive:docproperties.renderpreview">0</property>
                <property name="kdenlive:docproperties.renderprofile">MP4-H264/AAC</property>
                <property name="kdenlive:docproperties.renderrescale">0</property>
                <property name="kdenlive:docproperties.renderrescaleheight">540</property>
                <property name="kdenlive:docproperties.renderrescalewidth">960</property>
                <property name="kdenlive:docproperties.renderspeed">6</property>
                <property name="kdenlive:docproperties.renderstartguide">-1</property>
                <property name="kdenlive:docproperties.rendertcoverlay">0</property>
                <property name="kdenlive:docproperties.rendertctype">-1</property>
                <property name="kdenlive:docproperties.rendertwopass">0</property>
                <property name="kdenlive:docproperties.renderurl">./kdentlivetest.mp4</property>
                <property name="kdenlive:docproperties.seekOffset">30000</property>
                <property name="kdenlive:docproperties.uuid">{`{764b0aa1-87ca-47d4-a966-aa812f8e7803}`}</property>
                <property name="kdenlive:docproperties.version">1.1</property>
                <property name="kdenlive:expandedFolders"/>
                <property name="kdenlive:binZoom">4</property>
                <property name="xml_retain">1</property>

                <entry producer="producer6" in="00:00:00.000" out="00:00:00.967"/>
                <entry producer="producer1" in="00:00:00.000" out="00:00:19.200"/>
                <entry producer="producer2" in="00:00:00.000" out="00:00:04.967"/>
                <entry producer="producer3" in="00:00:00.000" out="00:00:04.967"/>
                <entry producer="producer4" in="00:00:00.000" out="00:00:04.967"/>
                <entry producer="producer5" in="00:00:00.000" out="00:00:04.967"/>
                <entry producer="producer7" in="00:00:00.000" out="00:00:04.967"/>
                <entry producer="chain3" in="00:00:00.000" out="00:00:14.500"/>
                <entry producer="tractor4" in="00:00:00.000" out="00:00:15.533"/>
                <entry producer="chain1" in="00:00:00.000" out="00:02:15.100"/>
                <entry producer="producer8" in="00:00:00.000" out="00:00:04.967"/>
            </playlist>

            <tractor id="tractor5" in="00:00:00.000" out="00:00:19.967">
                <property name="kdenlive:projectTractor">1</property>
                <track producer="tractor4" in="00:00:00.000" out="00:00:19.967"/>
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
