import supertest, { SuperTest, Test, Response } from 'supertest'
import { defaultErrMsg as ValidatorErr } from 'jet-validator'
import insertUrlParams from 'inserturlparams'

import app from '@src/server'

import Contact from '@src/models/Contact'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import Paths from 'spec/support/Paths'
import { TReqBody } from 'spec/support/types'

// StatusCodes
const { OK, CREATED, NOT_FOUND, BAD_REQUEST } = HttpStatusCodes

const DummyGetAllUsers = [
  Contact.new(undefined, '9554409177', 'sean.maxwell@gmail.com'),
  Contact.new(undefined, '9554409188', 'john.smith@gmail.com'),
  Contact.new(undefined, '9554409199', 'gordan.freeman@gmail.com'),
] as const

const DummyUserData = {
  contact: Contact.new(undefined, '9554409199', 'gordan.freeman@gmail.com'),
} as const

describe('ContactRouter', () => {
  let agent: SuperTest<Test>

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app)
    done()
  })

  describe(`"POST:${Paths.Identify.Post}"`, () => {
    const ERROR_MSG = `${ValidatorErr}"user".`

    const callApi = (reqBody: TReqBody) =>
      agent.post(Paths.Identify.Post).type('form').send(reqBody)

    it(
      `should return a status code of "${CREATED}" if the request was ` +
        'successful.',
      (done) => {
        // Spy
        // spyOn(UserRepo, 'add').and.resolveTo()
        // Call api
        callApi(DummyUserData).end((_: Error, res: Response) => {
          expect(res.status).toBe(CREATED)
          expect(res.body.error).toBeUndefined()
          done()
        })
      }
    )

    // Missing param
    it(
      'should return a JSON object with an error message of ' +
        `"${ERROR_MSG}" and a status code of "${BAD_REQUEST}" if the user ` +
        'param was missing.',
      (done) => {
        // Call api
        callApi({}).end((_: Error, res: Response) => {
          expect(res.status).toBe(BAD_REQUEST)
          expect(res.body.error).toBe(ERROR_MSG)
          done()
        })
      }
    )
  })
})
