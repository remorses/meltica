import {
    ImageFile,
    AudioFile,
    VideoFile,
    PanningAnimation,
    VideoConsumer,
    Profile,
} from '@/components'
import { renderToXml } from '@/rendering'
import { writeFileSync } from 'fs'

function MLT({}) {
    return (
        <mlt
            LC_NUMERIC='C'
            version='7.30.0'
            title='Shotcut version 25.01.25'
            producer='main_bin'
        >
            <VideoConsumer target={'out.mp4'} />
            <Profile width={1080} height={1920} fps={30} />
            <playlist id='main_bin'>
                <property name='xml_retain'>1</property>
            </playlist>
            <producer id='black' in='00:00:00.000' out='00:02:15.067'>
                <property name='length'>00:02:15.100</property>
                <property name='eof'>pause</property>
                <property name='resource'>0</property>
                <property name='aspect_ratio'>1</property>
                <property name='mlt_service'>color</property>
                <property name='mlt_image_format'>rgba</property>
                <property name='set.test_audio'>0</property>
            </producer>
            <playlist id='background'>
                <entry producer='black' in='00:00:00.000' out='00:02:15.067' />
            </playlist>
            <ImageFile
                id={'producer0'}
                filepath={'sololevelling/page-000.jpg'}
            />
            <ImageFile
                id={'producer1'}
                filepath={'sololevelling/page-001.jpg'}
            />
            <ImageFile
                id={'producer2'}
                filepath={'sololevelling/page-002.jpg'}
            />

            <playlist id='playlist0'>
                <property name='shotcut:video'>1</property>
                <property name='shotcut:name'>V1</property>
                <entry
                    producer='producer0'
                    in='00:00:00.000'
                    out='00:00:02.867'
                />
                <entry
                    producer='producer1'
                    in='00:00:00.000'
                    out='00:00:02.733'
                />
                <entry
                    producer='producer2'
                    in='00:00:00.000'
                    out='00:00:03.167'
                />
            </playlist>
            <AudioFile filepath={'narrator.wav'} id={'chain0'} />
            <VideoFile filepath={'out.mp4'} id={'chain0'}>
                <PanningAnimation />
            </VideoFile>
            <playlist id='playlist1'>
                <property name='shotcut:audio'>1</property>
                <property name='shotcut:name'>A1</property>
                <entry producer='chain0' in='00:00:00.000' out='00:00:14.467' />
            </playlist>
            {/* <AudioFile
                id={'chain1'}
                filepath={'edapollo - Let It Go [bQ5glYCsv94].mp3'}
                volume={-14.1}
            />
            */}
            <playlist id='playlist2'>
                <property name='shotcut:audio'>1</property>
                <property name='shotcut:name'>A2</property>
                <entry producer='chain1' in='00:00:00.000' out='00:02:15.067' />
            </playlist>
            <tractor
                id='tractor0'
                in='00:00:00.000'
                out='00:02:15.067'
            >
                <property name='shotcut'>1</property>
                <property name='shotcut:projectAudioChannels'>2</property>
                <property name='shotcut:projectFolder'>0</property>
                <property name='shotcut:trackHeight'>50</property>
                <track producer='background' />
                <track producer='playlist0' />
                <track producer='playlist1' hide='video' />
                <track producer='playlist2' hide='video' />
            </tractor>
        </mlt>
    )
}

writeFileSync('slideshow-shotcut.mlt', renderToXml(<MLT />))
