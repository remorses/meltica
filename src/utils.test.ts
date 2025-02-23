import { describe, it, expect } from 'vitest'

import { formatSecondsToTime } from './rendering'

describe('formatSecondsToTime', () => {
    it('formats seconds to HH:MM:SS.mmm format', () => {
        expect(formatSecondsToTime(0)).toMatchInlineSnapshot(`"0:0:0"`)
        expect(formatSecondsToTime(1.5)).toMatchInlineSnapshot(`"0:0:1"`)
        expect(formatSecondsToTime(61)).toMatchInlineSnapshot(`"0:1:1"`)
        expect(formatSecondsToTime(3661.123)).toMatchInlineSnapshot(
            `"1:1:1"`,
        )
    })
})
