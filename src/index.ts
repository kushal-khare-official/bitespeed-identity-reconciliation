import logger from 'jet-logger'
import '@src/pre-start'
import EnvVars from '@src/constants/EnvVars'
import '@src/database'

import server from './server'

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString()

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG))
