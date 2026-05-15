
import { Context } from './Context'


class OpenMeteoError extends Error {

  isOpenMeteoError = true

  sdk = 'OpenMeteo'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenMeteoError
}

