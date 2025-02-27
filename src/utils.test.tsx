import { describe, it, expect } from 'vitest'

import { formatSecondsToTime } from './rendering'

import { renderAsync, createContext, useContext } from 'jsx-xml'

import { create } from 'xmlbuilder2'
import { sleep } from '@/utils'

describe('renderAsync', () => {
    it('should render a component that returns text', async () => {
        // Simple component that returns text
        function TextComponent() {
            return create('<z>Hello, world!</z>')
        }

        const result = await renderAsync(<TextComponent />)
        expect(result.end({ headless: true })).toMatchInlineSnapshot(
            `"<z>Hello, world!</z>"`,
        )
    })
})

const exampleContext = createContext({ key: 'default' })

describe('context', () => {
    it('concurrent useContext should have their context scoped', async () => {
        function ParentComponent({ key }) {
            return (
                <exampleContext.Provider value={{ key }}>
                    <div>
                        <FirstSibling key={key} />
                        <SecondSibling key={key} />
                    </div>
                </exampleContext.Provider>
            )
        }

        async function FirstSibling({ key }) {
            const value = useContext(exampleContext)
            await sleep()
            expect(value.key).toBe(key)
            return <div>First: {value.key}</div>
        }

        async function SecondSibling({ key }) {
            const value = useContext(exampleContext)
            await sleep()
            expect(value.key).toBe(key)
            return <div>Second: {value.key}</div>
        }

        const keys = ['default', 'key1', 'key2', 'updated-by-first-sibling']
        const results = await Promise.all(
            keys.map(async (key) => {
                const result = await renderAsync(<ParentComponent key={key} />)
                return result.end({ headless: true })
            }),
        )

        expect(results).toMatchInlineSnapshot(
            `
          [
            "<div><div>First: default</div><div>Second: default</div></div>",
            "<div><div>First: key1</div><div>Second: key1</div></div>",
            "<div><div>First: key2</div><div>Second: key2</div></div>",
            "<div><div>First: updated-by-first-sibling</div><div>Second: updated-by-first-sibling</div></div>",
          ]
        `,
        )
    })
})

describe('formatSecondsToTime', () => {
    it('formats seconds to HH:MM:SS.mmm format', () => {
        expect(formatSecondsToTime(0)).toMatchInlineSnapshot(`"00:00:00.000"`)
        expect(formatSecondsToTime(1.5)).toMatchInlineSnapshot(`"00:00:01.500"`)
        expect(formatSecondsToTime(61)).toMatchInlineSnapshot(`"00:01:01.000"`)
        expect(formatSecondsToTime(3661.123)).toMatchInlineSnapshot(
            `"01:01:01.123"`,
        )
        expect(formatSecondsToTime('00:01:01.000')).toMatchInlineSnapshot(
            `"00:01:01.000"`,
        )
        expect(formatSecondsToTime('3.65')).toMatchInlineSnapshot(
            `"00:00:03.649"`,
        )
        expect(formatSecondsToTime('0')).toMatchInlineSnapshot(`"00:00:00.000"`)
        expect(formatSecondsToTime(undefined)).toMatchInlineSnapshot(
            `undefined`,
        )
    })
})
