import { InteractionManager } from 'react-native'
import { mapValues } from 'lodash'
import state from './helpers/state'
import { createTransport } from './transports'
import ConsoleTransport from './transports/console'

type Levels = { [key: string]: number }

const defaultLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const

export type CreateLoggerOptions<TLevels> = {
  levels: TLevels
  severity: keyof TLevels
  async: boolean
  asyncFn: (callback: () => void) => void
  enabled: boolean
  dateFormat: 'time' | 'local' | 'utc' | 'iso'
  namespace: string
  transport: ReturnType<typeof createTransport>
}

export const createLogger = <TLevels extends Levels = typeof defaultLevels>(
  options: Partial<CreateLoggerOptions<TLevels>> = {}
) => {
  const {
    enabled = true,
    levels = defaultLevels,
    async = true,
    asyncFn = InteractionManager.runAfterInteractions,
    dateFormat = 'time',
    severity = 'debug',
    namespace = '',
    transport = ConsoleTransport,
  } = options
  const { set: setEnabled, get: getEnabled } = state(enabled)
  const { set: setSeverity, get: getSeverity } = state(severity)

  const formatMessage = (message: string) => {}

  const createLogMethod = (level: keyof TLevels) => (message: string) =>
    asyncFn(() => {
      if (!getEnabled()) return

      formatMessage(message)
      transport.write(message)
    })

  const logMethods = mapValues(levels, (_, key: string) => createLogMethod(key))

  const extend = (newNameSpace: string) =>
    createLogger({
      ...options,
      namespace: [namespace, newNameSpace].filter((x) => x).join('.'),
    })

  return {
    ...logMethods,
    setSeverity,
    getSeverity,
    extend,
    setEnabled,
    getEnabled,
  }
}

export { createTransport }
