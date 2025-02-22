import { ReactNode } from 'react';


declare global {
    namespace JSX {
        interface ElementChildrenAttribute {
            children?: ReactNode
        }

        interface IntrinsicElements {
            mlt: {
                LC_NUMERIC?: string
                version?: string
                root?: string
                profile?: string
                title?: string
                producer?: string
                children?: ReactNode
            }
            entry: {
                in?: string
                out?: string
                producer?: string
                children?: ReactNode
            }
            consumer: {
                ab?: string
                acodec?: string
                channels?: string
                crf?: string
                deinterlacer?: string
                f?: string
                g?: string
                in?: string
                mlt_service?: string
                movflags?: string
                preset?: string
                real_time?: string
                rescale?: string
                target?: string
                threads?: string
                vcodec?: string
                children?: ReactNode
            }
            profile: {
                colorspace?: string
                description?: string
                display_aspect_den?: string
                display_aspect_num?: string
                frame_rate_den?: string
                frame_rate_num?: string
                height?: string
                progressive?: string
                sample_aspect_den?: string
                sample_aspect_num?: string
                width?: string
                children?: ReactNode
            }
            producer: {
                id?: string
                in?: string
                out?: string
                length?: string
                eof?: string
                resource?: string
                ttl?: string
                aspect_ratio?: string
                mlt_service?: string
                seekable?: string
                format?: string
                children?: ReactNode
            }
            property: {
                name?: string
                children?: ReactNode
            }
            chain: {
                id?: string
                out?: string
                length?: string
                resource?: string
                mlt_service?: string
                children?: ReactNode
            }
            track: {
                producer?: string
                hide?: string
                children?: ReactNode
            }
            transition: {
                id?: string
                children?: ReactNode
            }
            filter: {
                id?: string
                window?: string
                max_gain?: string
                mlt_service?: string
                internal_added?: string
                disable?: string
                children?: ReactNode
            }
            playlist: {
                id?: string
                children?: ReactNode
            }
            tractor: {
                id?: string
                in?: string
                out?: string
                children?: ReactNode
            }
        }
    }
}