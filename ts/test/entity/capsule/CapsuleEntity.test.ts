

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SpacexRestSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CapsuleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Capsule()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('capsule hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SpacexRestSDK.test(offline).Capsule().stream('list')) { }
    }, /offline/)

    for await (const _item of SpacexRestSDK.test(offline).Capsule()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SpacexRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Capsule().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SpacexRestSDK.test().Capsule().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SpacexRestSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Capsule().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Capsule().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SpacexRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Capsule().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'capsule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Capsule serial number","t":"`$STRING`","key$":"id","index$":0},"land_landings":{"a":true,"h":"Land Landings","n":"land_landings","r":false,"sh":"Number of land landings","t":"`$INTEGER`","key$":"land_landings","index$":1},"last_update":{"a":true,"h":"Last Update","n":"last_update","r":false,"sh":"Last update about the capsule","t":"`$STRING`","key$":"last_update","index$":2},"launches":{"a":true,"h":"Launches","n":"launches","r":false,"sh":"Launch IDs","t":"`$ARRAY`","key$":"launches","index$":3},"reuse_count":{"a":true,"h":"Reuse Count","n":"reuse_count","r":false,"sh":"Number of times capsule has been reused","t":"`$INTEGER`","key$":"reuse_count","index$":4},"serial":{"a":true,"h":"Serial","n":"serial","r":false,"sh":"Capsule serial number","t":"`$STRING`","key$":"serial","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Capsule status","t":"`$STRING`","key$":"status","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Capsule type","t":"`$STRING`","key$":"type","index$":7},"water_landings":{"a":true,"h":"Water Landings","n":"water_landings","r":false,"sh":"Number of water landings","t":"`$INTEGER`","key$":"water_landings","index$":8}},"id":{"field":"id","name":"id"},"name":"capsule","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /capsules","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/capsules","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"capsules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /capsules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/capsules/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"capsules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"capsule","name__orig":"capsule","Name":"Capsule","name_":"capsule","name-":"capsule","NAME":"CAPSULE","index$":0}, {"active":true,"entity":"capsule","key$":"BasicCapsuleFlow","kind":"basic","name":"BasicCapsuleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"capsule_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"capsule_ref01","srcdatavar":"capsule_ref01_data","suffix":"_dt0"},"m":{"id":"capsule01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-capsule_ref01"}}],"index$":1}]}, 'Capsule', {"GET /capsules":{"protocol":"http","parameters":[]},"GET /capsules/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Capsule ID","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let capsule_ref01_data = Object.values(setup.data.existing.capsule)[0] as any

    // LIST
    const capsule_ref01_ent = client.Capsule()
    const capsule_ref01_match: any = {}

    const capsule_ref01_list = (await capsule_ref01_ent.list(capsule_ref01_match)).map((e: any) => e.data())


    // LOAD
    const capsule_ref01_match_dt0: any = {}
    capsule_ref01_match_dt0.id = capsule_ref01_data.id
    const capsule_ref01_data_dt0 = (await capsule_ref01_ent.load(capsule_ref01_match_dt0)).data()
    assert(capsule_ref01_data_dt0.id === capsule_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/capsule/CapsuleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SpacexRestSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['capsule01','capsule02','capsule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_CAPSULE_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_CAPSULE_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_CAPSULE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SpacexRestSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SPACEX_REST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
