
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenMeteoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenMeteoSDK.test()
    equal(testsdk instanceof OpenMeteoSDK, true,
      'OpenMeteoSDK.test() must return a client synchronously')
  })

})
