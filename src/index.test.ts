import { createLogger } from '.'

describe('asd', () => {
  it('should x', () => {
    const log = createLogger()

    log.info('hey test')
    log.debug('debug test')
    log.warn('warn test')
    log.error('error test')

    log.info({ test: 'x' })
  })
})
