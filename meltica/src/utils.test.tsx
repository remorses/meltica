import { describe, expect, it } from 'vitest'

import { createContext, render, renderAsync, useContext } from 'xmlize'
import { isNodeElement } from './rendering'

import { WorkflowIcon } from 'lucide-react'
import { create, fragment } from 'xmlbuilder2'

import { isXmlBuilder, sleep } from 'meltica/src/utils'
import { formatSecondsToTime, parseTimeToSeconds } from 'meltica/src/time'

describe('renderAsync', () => {
    it('should render a component that returns xmlbuilder', async () => {
        // Simple component that returns text
        function TextComponent() {
            return create('<z>Hello, world!</z>')
        }

        const result = await renderAsync(<TextComponent />)
        expect(result.end({ headless: true })).toMatchInlineSnapshot(
            `"<z>Hello, world!</z>"`,
        )
    })
    it('xmlbuilder attributes can be objects', async () => {
        // Simple component that returns text
        function TextComponent() {
            // @ts-ignore
            return <div style={{ color: 'red' }}>Hello, world!</div>
        }

        const result = await renderAsync(<TextComponent />)
        expect(result.end({ headless: true })).toMatchInlineSnapshot(
            `"<div style="[object Object]">Hello, world!</div>"`,
        )
    })
    it('render can use React components', async () => {
        // Simple component that returns text
        function TextComponent() {
            return <WorkflowIcon />
        }

        const result = render(<TextComponent />)
        expect(result.end({ headless: true })).toMatchInlineSnapshot(
            `"<svg key="null" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow"><rect key="by2w9f" width="8" height="8" x="3" y="3" rx="2"/><path key="xkn7yn" d="M7 11v4a2 2 0 0 0 2 2h4"/><rect key="1cgmvn" width="8" height="8" x="13" y="13" rx="2"/></svg>"`,
        )
    })

    it('create txt on fragment', async () => {
        const c = fragment({})
        c.txt('Hello, world!')
        expect(c.end({ headless: true })).toMatchInlineSnapshot(
            `"Hello, world!"`,
        )
    })
    it('create ele and txt on fragment', async () => {
        const c = fragment({})
        c.ele('z').txt('Hello, world!').up().ele('z').txt('Hello, world!')
        expect(c.end({ headless: true })).toMatchInlineSnapshot(
            `"<z>Hello, world!</z><z>Hello, world!</z>"`,
        )
    })

    it('should convert XML to object with toObject', async () => {
        // Test based on the soundtrack chain from video.mlt
        const xml = `
        <chain id="soundtrack" in="00:00:00.000" out="00:02:15.115">
            <property name="meta.media.0.stream.type">audio</property>
            <property name="meta.media.0.codec.sample_fmt">fltp</property>
        </chain>`

        const xmlObj = create(xml)
        const result = xmlObj.toObject({ group: true })
        const res = [...xmlObj.node.childNodes!.values()].map((x) => {
            if (!isNodeElement(x)) {
                return
            }
            const { nodeName, nodeType, attributes } = x
            return {
                nodeName,
                nodeType,
                ...Object.fromEntries(
                    [...(attributes || [])].map((attr) => [
                        attr.name,
                        attr.value,
                    ]),
                ),
            }
        })
        expect(res).toMatchInlineSnapshot(`
          [
            {
              "id": "soundtrack",
              "in": "00:00:00.000",
              "nodeName": "chain",
              "nodeType": 1,
              "out": "00:02:15.115",
            },
          ]
        `)

        expect(result).toMatchInlineSnapshot(`
          {
            "chain": {
              "@": {
                "id": "soundtrack",
                "in": "00:00:00.000",
                "out": "00:02:15.115",
              },
              "property": [
                {
                  "#": "audio",
                  "@name": "meta.media.0.stream.type",
                },
                {
                  "#": "fltp",
                  "@name": "meta.media.0.codec.sample_fmt",
                },
              ],
            },
          }
        `)
    })
    it('xmlbuilder support object syntax with attributes', async () => {
        // Simple component that returns text
        function TextComponent() {
            return create({
                producer: {
                    id: 'mainTractor',
                    title: 'Shotcut version 25.01.25',
                    in: 0,
                },
            })
        }

        const result = await renderAsync(<TextComponent />)
        expect(
            result.end({ headless: true, prettyPrint: true }),
        ).toMatchInlineSnapshot(
            `
          "<producer>
            <id>mainTractor</id>
            <title>Shotcut version 25.01.25</title>
            <in>0</in>
          </producer>"
        `,
        )
        const obj = {
            producer: {
                id: 'mainTractor',
                title: 'Shotcut version 25.01.25',
                in: '0',
            },
        }
        expect(create(obj).toObject({})).toStrictEqual(obj)
    })
})

const exampleContext = createContext({ key: 'default' })

describe('nested context', () => {
    it('should override parent context with nested provider', async () => {
        function NestedContextComponent() {
            const outerValue = useContext(exampleContext)

            return (
                <div>
                    <div>Outer: {outerValue.key}</div>
                    <exampleContext.Provider value={{ key: 'nested' }}>
                        <NestedChild />
                    </exampleContext.Provider>
                </div>
            )
        }

        function NestedChild() {
            const innerValue = useContext(exampleContext)
            return <div>Inner: {innerValue.key}</div>
        }

        const result = await renderAsync(
            <exampleContext.Provider value={{ key: 'parent' }}>
                <NestedContextComponent />
            </exampleContext.Provider>,
        )

        expect(result.end({ headless: true })).toMatchInlineSnapshot(
            `"<div><div>Outer: parent</div><div>Inner: nested</div></div>"`,
        )
    })
})

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
        expect(formatSecondsToTime(-1.5)).toMatchInlineSnapshot(
            `"-00:00:01.500"`,
        )
    })
})


describe('parseTimeToSeconds', () => {
    it('parses HH:MM:SS.mmm format to seconds', () => {
        expect(parseTimeToSeconds('00:00:00.000')).toBe(0)
        expect(parseTimeToSeconds('00:00:01.500')).toBe(1.5)
        expect(parseTimeToSeconds('00:01:01.000')).toBe(61)
        expect(parseTimeToSeconds('01:01:01.123')).toBe(3661.123)
        expect(parseTimeToSeconds('-00:00:01.500')).toBe(-1.5)
    })

    it('throws error for invalid time format', () => {
        expect(() => parseTimeToSeconds('invalid')).toThrow('Invalid time format')
        expect(() => parseTimeToSeconds('00:00')).toThrow('Invalid time format')
        expect(() => parseTimeToSeconds('aa:bb:cc.ddd')).toThrow('Invalid time components')
    })
})
