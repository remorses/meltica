import { describe, it, expect } from 'vitest'

import { formatSecondsToTime, isNodeElement } from './rendering'

import { renderAsync, createContext, useContext } from 'jsx-xml'

import { create, fragment } from 'xmlbuilder2'
import { sleep } from '@/utils'

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
