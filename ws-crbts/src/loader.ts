/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import mpeg from 'mpegts.js'
import { abort } from 'process'

// Add missing type imports
enum LoaderStatus {
    kConnecting = 0,
    kBuffering = 1,
    kError = 2,
    kComplete = 3,
}

enum LoaderErrors {
    EXCEPTION = 0,
}

class RuntimeException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'RuntimeException'
    }
}

abstract class LoaderCallbacks extends mpeg.BaseLoader {
    _onDataArrival:
        | ((
              chunk: ArrayBuffer,
              byteStart: number,
              receivedLength?: number,
          ) => void)
        | null = null
    _onError:
        | ((
              errorType: LoaderErrors,
              errorInfo: { code: number; msg: string },
          ) => void)
        | null = null
    _onComplete: ((rangeFrom: number, rangeTo: number) => void) | null = null
}

// For MPEG-TS/FLV over WebSocket live stream
export class MyWebSocketLoader extends LoaderCallbacks {
    private TAG: string
    private needStash: boolean
    ws: WebSocket | null
    private requestAbort: boolean
    private receivedLength: number

    static isSupported(): boolean {
        try {
            return typeof self.WebSocket !== 'undefined'
        } catch (e) {
            return false
        }
    }

    static singleton: MyWebSocketLoader

    constructor() {
        super('websocket-loader')
        this.TAG = 'WebSocketLoader'
        MyWebSocketLoader.singleton = this

        this.needStash = true

        this.ws = null
        this.requestAbort = false
        this.receivedLength = 0
    }

    destroy(): void {
        if (this.ws) {
            this.abort()
        }
        super.destroy()
    }

    open(dataSource: { url: string }): void {
        try {
            let ws = (this.ws = new self.WebSocket(dataSource.url))
            ws.binaryType = 'arraybuffer'
            ws.onopen = this.onWebSocketOpen.bind(this)
            ws.onclose = this.onWebSocketClose.bind(this)
            ws.onmessage = this.onWebSocketMessage.bind(this)
            ws.onerror = this.onWebSocketError.bind(this)

            this._status = LoaderStatus.kConnecting
        } catch (e: any) {
            this._status = LoaderStatus.kError

            let info = { code: e.code, msg: e.message }

            if (this._onError) {
                this._onError(LoaderErrors.EXCEPTION, info)
            } else {
                throw new RuntimeException(info.msg)
            }
        }
    }

    abort(): void {
        let ws = this.ws
        if (ws && (ws.readyState === 0 || ws.readyState === 1)) {
            // CONNECTING || OPEN
            this.requestAbort = true
            ws.close()
        }

        this.ws = null
        this._status = LoaderStatus.kComplete
    }

    private onWebSocketOpen(e: Event): void {
        this._status = LoaderStatus.kBuffering
    }

    private onWebSocketClose(e: CloseEvent): void {
        if (this.requestAbort === true) {
            this.requestAbort = false
            return
        }

        this._status = LoaderStatus.kComplete

        if (this._onComplete) {
            this._onComplete(0, this.receivedLength - 1)
        }
    }

    private onWebSocketMessage(e: MessageEvent): void {
        if (e.data instanceof ArrayBuffer) {
            this.dispatchArrayBuffer(e.data)
        } else if (e.data instanceof Blob) {
            let reader = new FileReader()
            reader.onload = () => {
                this.dispatchArrayBuffer(reader.result as ArrayBuffer)
            }
            reader.readAsArrayBuffer(e.data)
        } else {
            // non binary message
        }
    }

    private dispatchArrayBuffer(arraybuffer: ArrayBuffer): void {
        let chunk = arraybuffer
        let byteStart = this.receivedLength
        this.receivedLength += chunk.byteLength

        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this.receivedLength)
        }
    }

    private onWebSocketError(e: Event): void {
        this._status = LoaderStatus.kError

        const error = e as ErrorEvent
        let info = {
            code: error.error?.code || -1,
            msg: error.message || 'WebSocket Error',
        }

        if (this._onError) {
            this._onError(LoaderErrors.EXCEPTION, info)
        } else {
            throw new RuntimeException(info.msg)
        }
    }
}
