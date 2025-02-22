import { ReactNode } from 'react'

declare global {
    namespace JSX {
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
            // ... rest of your type definitions ...
        }
    }
} 