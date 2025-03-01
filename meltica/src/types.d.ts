import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces'

type NumberLike = string | number

type ReactNode = any

declare global {
    namespace JSX {
        interface ElementChildrenAttribute {
            children?: ReactNode
        }

        interface IntrinsicElements {
            assetRegistration: {
                data: string
                forId: string
            }
            mlt: {
                LC_NUMERIC?: string
                version?: string
                root?: string
                profile?: string
                title?: string
                producer?: string
                children?: ReactNode
            }
            blank: {
                length?: string
            }
            entry: {
                in?: NumberLike
                out?: NumberLike
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
                in?: NumberLike
                out?: NumberLike
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
                frame_rate_num?: NumberLike
                height?: NumberLike
                progressive?: string
                sample_aspect_den?: string
                sample_aspect_num?: string
                width?: NumberLike
                children?: ReactNode
            }
            producer: {
                id?: string
                in?: NumberLike
                out?: NumberLike
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
                out?: NumberLike
                in?: NumberLike
                length?: string
                resource?: string
                mlt_service?: string
                children?: ReactNode
            }
            track: {
                producer?: string
                hide?: string
                id?: string
                in?: NumberLike
                out?: NumberLike
                children?: ReactNode
            }
            transition: {
                id?: string
                children?: ReactNode
            }
            filter: {
                id?: string
                window?: string
                max_gain?: NumberLike
                mlt_service?: string
                internal_added?: string
                disable?: string
                out?: NumberLike
                children?: ReactNode
            }
            playlist: {
                id?: string
                children?: ReactNode
            }
            tractor: {
                id?: string
                in?: NumberLike
                title?: string
                out?: NumberLike
                children?: ReactNode
            }
        }
    }
}

declare global {
    // https://doc.qt.io/qt-6/richtext-html-subset.html
    // text can render html using qt, with a subset of html 4
    declare namespace JSX {
        interface IntrinsicElements {
            // HTML elements
            a: {
                href?: string
                name?: string
                children?: ReactNode
            }
            address: {
                children?: ReactNode
            }
            b: {
                children?: ReactNode
            }
            big: {
                children?: ReactNode
            }
            blockquote: {
                children?: ReactNode
            }
            body: {
                bgcolor?: string
                style?: string
                children?: ReactNode
            }
            br: {
                children?: ReactNode
            }
            center: {
                children?: ReactNode
            }
            cite: {
                children?: ReactNode
            }
            code: {
                children?: ReactNode
            }
            dd: {
                children?: ReactNode
            }
            dfn: {
                children?: ReactNode
            }
            div: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                style?: string
                children?: ReactNode
            }
            dl: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            dt: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            em: {
                children?: ReactNode
            }
            font: {
                size?: string
                face?: string
                color?: string
                children?: ReactNode
            }
            h1: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            h2: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            h3: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            h4: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            h5: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            h6: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                children?: ReactNode
            }
            head: {
                children?: ReactNode
            }
            hr: {
                width?: string
                children?: ReactNode
            }
            html: {
                children?: ReactNode
            }
            i: {
                children?: ReactNode
            }
            img: {
                src?: string
                source?: string
                width?: string
                height?: string
                children?: ReactNode
            }
            kbd: {
                children?: ReactNode
            }
            meta: {
                'http-equiv'?: string
                content?: string
                name?: string
                charset?: string
                children?: ReactNode
            }
            li: {
                children?: ReactNode
                class?: string
            }
            nobr: {
                children?: ReactNode
            }
            ol: {
                type?: '1' | 'a' | 'A'
                children?: ReactNode
            }
            p: {
                align?: 'left' | 'right' | 'center' | 'justify'
                dir?: 'ltr' | 'rtl'
                style?: string
                children?: ReactNode
            }
            pre: {
                children?: ReactNode
            }
            qt: {
                children?: ReactNode
            }
            s: {
                children?: ReactNode
            }
            samp: {
                children?: ReactNode
            }
            small: {
                children?: ReactNode
            }
            span: {
                style?: string
                children?: ReactNode
            }
            strong: {
                children?: ReactNode
            }
            sub: {
                children?: ReactNode
            }
            sup: {
                children?: ReactNode
            }
            table: {
                border?: string
                bgcolor?: string
                cellspacing?: string
                cellpadding?: string
                width?: string
                height?: string
                children?: ReactNode
            }
            tbody: {
                children?: ReactNode
            }
            td: {
                width?: string
                bgcolor?: string
                colspan?: string
                rowspan?: string
                align?: 'left' | 'right' | 'center' | 'justify'
                valign?: 'top' | 'middle' | 'bottom'
                style?: string
                children?: ReactNode
            }
            tfoot: {
                children?: ReactNode
            }
            th: {
                width?: string
                bgcolor?: string
                colspan?: string
                rowspan?: string
                align?: 'left' | 'right' | 'center' | 'justify'
                valign?: 'top' | 'middle' | 'bottom'
                children?: ReactNode
            }
            thead: {
                children?: ReactNode
            }
            title: {
                children?: ReactNode
            }
            tr: {
                bgcolor?: string
                children?: ReactNode
            }
            tt: {
                children?: ReactNode
            }
            u: {
                children?: ReactNode
            }
            ul: {
                type?: 'square' | 'disc' | 'circle'
                children?: ReactNode
            }
            var: {
                children?: ReactNode
            }
        }
    }
}

declare global {
    // SVG Element Types
    declare namespace JSX {
        interface IntrinsicElements {
            // Basic SVG elements
            svg: {
                width?: string | number
                height?: string | number
                viewBox?: string
                xmlns?: string
                version?: string
                preserveAspectRatio?: string
                children?: ReactNode
            }
            rect: {
                x?: string | number
                y?: string | number
                width?: string | number
                height?: string | number
                rx?: string | number
                ry?: string | number
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            circle: {
                cx?: string | number
                cy?: string | number
                r?: string | number
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            ellipse: {
                cx?: string | number
                cy?: string | number
                rx?: string | number
                ry?: string | number
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            line: {
                x1?: string | number
                y1?: string | number
                x2?: string | number
                y2?: string | number
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            polyline: {
                points?: string
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            polygon: {
                points?: string
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            path: {
                d?: string
                fill?: string
                stroke?: string
                strokeWidth?: string | number
                opacity?: string | number
                children?: ReactNode
            }
            text: {
                x?: string | number
                y?: string | number
                dx?: string | number
                dy?: string | number
                textAnchor?: string
                fontFamily?: string
                fontSize?: string | number
                fontWeight?: string | number
                fill?: string
                stroke?: string
                children?: ReactNode
            }
            g: {
                id?: string
                transform?: string
                fill?: string
                stroke?: string
                opacity?: string | number
                children?: ReactNode
            }
            defs: {
                children?: ReactNode
            }
            use: {
                href?: string
                x?: string | number
                y?: string | number
                width?: string | number
                height?: string | number
                children?: ReactNode
            }
            linearGradient: {
                id?: string
                x1?: string | number
                y1?: string | number
                x2?: string | number
                y2?: string | number
                gradientUnits?: string
                children?: ReactNode
            }
            radialGradient: {
                id?: string
                cx?: string | number
                cy?: string | number
                r?: string | number
                fx?: string | number
                fy?: string | number
                gradientUnits?: string
                children?: ReactNode
            }
            stop: {
                offset?: string | number
                stopColor?: string
                stopOpacity?: string | number
                children?: ReactNode
            }
            clipPath: {
                id?: string
                clipPathUnits?: string
                children?: ReactNode
            }
            mask: {
                id?: string
                maskUnits?: string
                maskContentUnits?: string
                children?: ReactNode
            }
            tspan: {
                x?: string | number
                y?: string | number
                dx?: string | number
                dy?: string | number
                children?: ReactNode
            }
        }
    }
}
