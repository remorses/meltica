import path from "path"

export function AudioFile({ id, filepath, volume = 0 }) {
    const context = useContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type: 'audio',
        })
        return null
    }
    const producer = context.producers.find((p) => p.id === id)

    const basename = path.basename(filepath)
    return (
        <chain out={producer?.attributes.out} id={id}>
            <property name='length'>00:00:14.520</property>
            <property name='eof'>pause</property>
            <property name='resource'>{filepath}</property>
            <property name='mlt_service'>avformat-novalidate</property>
            {producer?.children}

            <property name='meta.media.0.codec.bit_rate'>705600</property>
            <property name='seekable'>1</property>
            <property name='audio_index'>0</property>
            <property name='video_index'>-1</property>

            <property name='astream'>0</property>
            <property name='shotcut:skipConvert'>1</property>

            <property name='shotcut:caption'>{basename}</property>
            <filter id={id + 'gain'}>
                <property name='window'>75</property>
                <property name='max_gain'>20dB</property>
                <property name='level'>{volume.toString()}</property>
                <property name='mlt_service'>volume</property>
            </filter>
        </chain>
    )
}

export function ImageFile({ id, filepath }) {
    const context = useContext()
    if (context.isRegistrationStep) {
        context.assets.push({
            filepath,
            id,
            type: 'image',
        })
        return null
    }
    const basename = path.basename(filepath)
    return (
        <producer id={id} in='00:00:00.000' out='03:59:59.967'>
            <property name='length'>04:00:00.000</property>
            <property name='eof'>pause</property>
            <property name='resource'>{filepath}</property>
            <property name='ttl'>1</property>
            <property name='aspect_ratio'>1</property>
            <property name='meta.media.progressive'>1</property>
            <property name='seekable'>1</property>
            <property name='format'>1</property>
            <property name='meta.media.width'>720</property>
            <property name='meta.media.height'>2342</property>
            <property name='mlt_service'>qimage</property>

            <property name='shotcut:skipConvert'>1</property>
            <property name='shotcut:caption'>{basename}</property>
            <property name='xml'>was here</property>
            <property name='meta.shotcut.vui'>1</property>
            <filter id={id + 'transform'}>
                <property name='background'>color:#00000000</property>
                <property name='mlt_service'>affine</property>
                <property name='shotcut:filter'>affineSizePosition</property>
                <property name='transition.fix_rotate_x'>0</property>
                <property name='transition.fill'>1</property>
                <property name='transition.distort'>0</property>
                <property name='transition.rect'>
                    00:00:00.000=221.528 -7.60509 592.707 1927.94
                    1;00:00:02.733=-149.36 -1214.13 1334.59 4341
                    1;00:00:02.867=-151.183 -1220.13 1338.13 4353
                    1;00:00:02.900=-142.121 -1184.2 1319.07 4291.01 1
                </property>
                <property name='transition.valign'>middle</property>
                <property name='transition.halign'>center</property>
                <property name='shotcut:animIn'>00:00:00.000</property>
                <property name='shotcut:animOut'>00:00:00.000</property>
                <property name='transition.threads'>0</property>
            </filter>
        </producer>
    )
}
