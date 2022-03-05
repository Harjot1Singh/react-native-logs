import { createLogger } from '../src'

const log = createLogger()

log.debug('some debug message')
log.info('Info!')
log.warn('Warning!')
log.error('Oh no!')

log.setEnabled(false)
log.error('Should never appear')
log.setEnabled(true)

log.error('should appear')
