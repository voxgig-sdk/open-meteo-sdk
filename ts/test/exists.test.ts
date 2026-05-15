
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenMeteoSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenMeteoSDK.test()
    equal(null !== testsdk, true)
  })

})
