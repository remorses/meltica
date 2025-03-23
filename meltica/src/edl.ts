import { XmlDocument, XmlElement } from 'xmldoc'
import { Timecode } from 'timecode'

interface MltXmlParserOptions {
    useBaseNameForReelName?: boolean
    useBaseNameForClipComment?: boolean
    channelsAV?: string
}

interface Producer {
    id: string
    inTime: string
    outTime: string
    reel_name?: string
    resource?: string
    'shotcut:hash'?: string
    [key: string]: any
}

interface PlaylistEvent {
    producer: string
    inTime: string
    outTime: string
    transition: string
    transitionLength?: number
}

interface Playlist {
    id: string
    format: string
    events: PlaylistEvent[]
}

export class MltXmlParser {
    private useBaseNameForReelName: boolean
    private useBaseNameForClipComment: boolean
    private channelsAV: string
    private xmldoc: XmlDocument
    private framerate: number

    constructor(xmlString: string, options: MltXmlParserOptions = {}) {
        this.useBaseNameForReelName = options.useBaseNameForReelName ?? true
        this.useBaseNameForClipComment =
            options.useBaseNameForClipComment ?? true
        this.channelsAV = options.channelsAV ?? 'AA/V'
        this.xmldoc = new XmlDocument(xmlString)
        const projectMeta = this.xmldoc.childNamed('profile')
        if (!projectMeta) {
            throw new Error('Could not find profile element in XML')
        }
        this.framerate =
            parseFloat(projectMeta.attr.frame_rate_num) /
            parseFloat(projectMeta.attr.frame_rate_den)
    }

    private get<T>(
        dict: Record<string, any>,
        name: string,
        defaultValue: T,
    ): T {
        return typeof dict === 'object' && name in dict
            ? dict[name]
            : defaultValue
    }

    private prepadString(
        str: string | number,
        len: number,
        chr: string,
    ): string {
        const padding = Array(len - String(str).length + 1).join(chr)
        return padding + str
    }

    private Timecode(value: string | number): any {
        if (typeof value === 'string') {
            // Determine if this is a MLT "clock" time string.
            if (value.length === 12 && (value[8] === '.' || value[8] === ',')) {
                // Convert the milliseconds portion to frame units.
                const ms = parseFloat(value.substring(9, 12))
                const fr = Math.round((ms / 1000) * this.framerate).toString()
                value =
                    value.substring(0, 8) + ':' + this.prepadString(fr, 2, '0')
            } else if (value.indexOf(':') === -1) {
                value = parseInt(value)
            }
        }
        // Return a Timecode object.
        return Timecode.init({
            framerate: this.framerate,
            timecode: value,
        })
    }

    private getTrackByProducerId(id: string): XmlElement | null {
        let result: XmlElement | null = null
        this.xmldoc.childrenNamed('tractor').forEach((tractor) => {
            const node = tractor.childWithAttribute('producer', id)
            if (node?.name === 'track') result = node
        })
        return result
    }

    getPlaylists(): Playlist[] {
        const playlistList: Playlist[] = []
        const playlists = this.xmldoc.childrenNamed('playlist')

        playlists.forEach((p) => {
            const eventList: PlaylistEvent[] = []
            const plDict: Playlist = {
                id: p.attr.id,
                format: 'V',
                events: [],
            }

            p.childrenNamed('property').forEach((fe) => {
                if (fe.attr.name === 'shotcut:audio') plDict.format = 'A'
                else if (fe.attr.name === 'shotcut:video')
                    plDict.format = this.channelsAV
            })

            const track = this.getTrackByProducerId(p.attr.id)
            if (track?.attr?.hide) {
                if (track.attr.hide === 'audio') {
                    if (plDict.format === 'A') return // skip muted audio tracks
                    plDict.format = 'V' // muted video track
                } else if (track.attr.hide === 'video') {
                    if (plDict.format === 'V') return // skip muted and hidden tracks
                    if (plDict.format.indexOf('V') !== -1) plDict.format = 'A' // hidden audio/video track
                } else if (track.attr.hide === 'both') {
                    return // skip muted and hidden tracks
                }
            }

            p.children.forEach((event) => {
                if (event instanceof XmlElement && 'length' in event.attr) {
                    const out = this.Timecode(event.attr['length'])
                    // MLT blacks are 1 frame longer than "out".
                    out.subtract(this.Timecode(1))
                    eventList.push({
                        producer: 'black',
                        inTime: this.Timecode(0).toString(),
                        outTime: out.toString(),
                        transition: '',
                    })
                }

                if (event instanceof XmlElement && 'producer' in event.attr) {
                    if (event.attr.producer.substring(0, 7) === 'tractor') {
                        // dissolve or wipe transition
                        this.xmldoc
                            .childrenNamed('tractor')
                            .forEach((tractor) => {
                                if (tractor.attr.id === event.attr.producer) {
                                    let count = 0
                                    tractor
                                        .childrenNamed('track')
                                        .forEach((track) => {
                                            if (!count) {
                                                eventList.push({
                                                    producer:
                                                        track.attr.producer,
                                                    inTime: track.attr.in,
                                                    outTime: track.attr.in,
                                                    transition: 'C',
                                                })
                                            } else {
                                                const length = this.Timecode(
                                                    track.attr.out,
                                                )
                                                length.subtract(
                                                    this.Timecode(
                                                        track.attr.in,
                                                    ),
                                                )
                                                length.add(this.Timecode(1))
                                                eventList.push({
                                                    producer:
                                                        track.attr.producer,
                                                    inTime: track.attr.in,
                                                    outTime: track.attr.out,
                                                    transition: 'D',
                                                    transitionLength:
                                                        length.frame_count,
                                                })
                                            }
                                            count += 1
                                        })
                                }
                            })
                    } else if (event.attr.producer !== 'black') {
                        eventList.push({
                            producer: event.attr.producer.replace(' ', '_'),
                            inTime: event.attr.in,
                            outTime: event.attr.out,
                            transition: 'C',
                        })
                    }
                }
            })

            plDict.events = eventList
            playlistList.push(plDict)
        })

        return playlistList
    }

    private makeProducer(p: XmlElement): Producer {
        const pDict: Producer = {
            id: p.attr.id,
            inTime: p.attr.in,
            outTime: p.attr.out,
        }
        p.childrenNamed('property').forEach((property) => {
            pDict[property.attr.name] = property.val
        })
        return pDict
    }

    getProducers(): Producer[] {
        const producerList: Producer[] = []
        const producers = this.xmldoc.childrenNamed('chain')
        producers.forEach((p) => {
            producerList.push(this.makeProducer(p))
        })
        const otherProducers = this.xmldoc.childrenNamed('producer')
        otherProducers.forEach((p) => {
            producerList.push(this.makeProducer(p))
        })
        return producerList
    }

    private linkReferences(): Record<string, Producer> {
        const sourceLinks: Record<string, Producer> = {}
        this.getProducers().forEach((p) => {
            sourceLinks[p.id] = p
            if (!this.useBaseNameForReelName && 'shotcut:hash' in p) {
                sourceLinks[p.id].reel_name = p['shotcut:hash']
            } else if (p.resource) {
                const reelName = this.baseName(p.resource, false)
                sourceLinks[p.id].reel_name = reelName.replace(/\W/g, '_')
            }
        })
        return sourceLinks
    }

    createEdl(): string {
        const sourceLinks = this.linkReferences()
        let EDLfile = ''

        this.getPlaylists().forEach((playlist) => {
            if (
                playlist.id === 'main_bin' ||
                playlist.id === 'main bin' ||
                playlist.id === 'background'
            ) {
                return
            }

            let EdlEventCount = 1
            let progIn = this.Timecode(0) //showtime tally
            let progOut = this.Timecode(0)

            EDLfile += `\n === ${playlist.id} === \n\n`

            playlist.events.forEach((event) => {
                const srcIn = this.Timecode(event.inTime)
                const srcOut = this.Timecode(event.outTime)
                srcOut.add(this.Timecode(1))
                const srcLen = this.Timecode(event.outTime)
                srcLen.add(this.Timecode(1))
                srcLen.subtract(srcIn)
                // increment program tally
                progOut.add(srcLen)

                if (event.producer !== 'black' && sourceLinks[event.producer]) {
                    let reelName = sourceLinks[event.producer].reel_name || ''
                    reelName = (reelName + '         ').substring(0, 8)

                    if (event.transition[0] === 'D') {
                        EdlEventCount -= 1
                    }

                    EDLfile += this.prepadString(EdlEventCount, 3, '0') + '  ' // edit counter
                    EDLfile += reelName + ' ' // "reel name"
                    EDLfile += (playlist.format + '    ').substring(0, 4) + '  ' // channels
                    EDLfile += (event.transition + '    ').substring(0, 4) + ' ' // type of edit/transition

                    if (event.transitionLength != null) {
                        EDLfile +=
                            this.prepadString(event.transitionLength, 3, '0') +
                            ' '
                    } else {
                        EDLfile += '    '
                    }

                    EDLfile += `${srcIn.toString()} ${srcOut.toString()} `
                    EDLfile += `${progIn.toString()} ${progOut.toString()}\n`

                    const producer = sourceLinks[event.producer]
                    if (producer.resource) {
                        let fileName = producer.resource
                        if (this.useBaseNameForClipComment) {
                            fileName = this.baseName(fileName)
                        }
                        EDLfile += '* FROM CLIP NAME: ' + fileName + '\n'
                    }

                    EdlEventCount += 1
                }
                progIn.add(srcLen)
            })
        })

        return EDLfile
    }

    private baseName(fileName: string, keepExtension = true): string {
        let name = fileName
        if (fileName.indexOf('/') !== -1) name = fileName.split('/').pop() || ''
        else if (fileName.indexOf('\\') !== -1)
            name = fileName.split('\\').pop() || ''
        if (keepExtension === false && name.indexOf('.') !== -1) {
            name = name.substring(0, name.indexOf('.'))
        }
        return name
    }
}
