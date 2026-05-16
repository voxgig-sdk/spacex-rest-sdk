
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SpacexRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SpacexRestSDK.test()
    equal(null !== testsdk, true)
  })

})
