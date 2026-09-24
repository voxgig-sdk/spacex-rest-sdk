
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SpacexRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SpacexRestSDK.test()
    equal(testsdk instanceof SpacexRestSDK, true,
      'SpacexRestSDK.test() must return a client synchronously')
  })

})
