import { describe, it, expect } from 'vitest'

import { formatSecondsToTime } from './rendering'

describe('formatSecondsToTime', () => {
    it('formats seconds to HH:MM:SS.mmm format', () => {
        expect(formatSecondsToTime(0)).toMatchInlineSnapshot(`"00:00:00.000"`)
        expect(formatSecondsToTime(1.5)).toMatchInlineSnapshot(`"00:00:01.500"`)
        expect(formatSecondsToTime(61)).toMatchInlineSnapshot(`"00:01:01.000"`)
        expect(formatSecondsToTime(3661.123)).toMatchInlineSnapshot(
            `"01:01:01.123"`,
        )
    })
})
