
import { Context } from './Context'


class SpacexRestError extends Error {

  isSpacexRestError = true

  sdk = 'SpacexRest'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SpacexRestError
}

