import { Request, Response, Router } from 'express'

import Paths from '@src/constants/Paths'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { Contact } from '@src/models/Contact'
import ContactService from '@src/services/contact'

const identifyRouter = Router()

identifyRouter.post(Paths.Identify.Post, async (req: Request, res: Response) => {
  console.log(req.body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const contact = new Contact({ ...req.body })

  const response = await ContactService.identify(contact)

  return res.status(HttpStatusCodes.OK).send(response)
})

export default identifyRouter
