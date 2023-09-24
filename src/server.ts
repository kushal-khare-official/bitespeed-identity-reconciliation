import morgan from 'morgan'
import helmet from 'helmet'
import express, { Request, Response } from 'express'
import logger from 'jet-logger'
import 'express-async-errors'


import BaseRouter from '@src/routes/contact'
import Paths from '@src/constants/Paths'

import EnvVars from '@src/constants/EnvVars'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import { NodeEnvs } from '@src/constants/misc'
import { RouteError } from '@src/other/classes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'))
}

if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet())
}

app.use(Paths.Base, BaseRouter)

app.use((err: Error, _: Request, res: Response) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true)
  }
  let status = HttpStatusCodes.BAD_REQUEST
  if (err instanceof RouteError) {
    status = err.status
  }
  return res.status(status).json({ error: err.message })
})

export default app
