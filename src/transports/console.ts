import { createTransport } from '.'

const ConsoleTransport = createTransport({
  onLog: (...data: any[]) => {
    console.log(data)
  },
})

export default ConsoleTransport
