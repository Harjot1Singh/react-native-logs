import {
  Readable,
  Writable,
  Duplex,
  Transform,
  ReadableOptions,
  DuplexOptions,
  PassThrough,
  WritableOptions,
} from 'readable-stream'

export type CreateTransportOptions = {
  onLog: (message: string) => void
}

export const createTransport = ({ onLog }: CreateTransportOptions) =>
  new Writable({
    write: (message: Buffer, _encoding: string, callback: () => void) => {
      onLog(message.toString())
      callback()
    },
  })

createTransport({ onLog: (m: string) => console.log(m) })
