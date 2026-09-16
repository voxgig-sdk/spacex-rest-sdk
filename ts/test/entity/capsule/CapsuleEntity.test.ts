

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SpacexRestSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'capsule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Capsule serial number","type":"`$STRING`","index$":0},{"active":true,"name":"land_landings","req":false,"short":"Number of land landings","type":"`$INTEGER`","index$":1},{"active":true,"name":"last_update","req":false,"short":"Last update about the capsule","type":"`$STRING`","index$":2},{"active":true,"name":"launches","req":false,"short":"Launch IDs","type":"`$ARRAY`","index$":3},{"active":true,"name":"reuse_count","req":false,"short":"Number of times capsule has been reused","type":"`$INTEGER`","index$":4},{"active":true,"name":"serial","req":false,"short":"Capsule serial number","type":"`$STRING`","index$":5},{"active":true,"name":"status","req":false,"short":"Capsule status","type":"`$STRING`","index$":6},{"active":true,"name":"type","req":false,"short":"Capsule type","type":"`$STRING`","index$":7},{"active":true,"name":"water_landings","req":false,"short":"Number of water landings","type":"`$INTEGER`","index$":8}],"id":{"field":"id","name":"id"},"name":"capsule","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /capsules","json":"{\"operationId\":\"getAllCapsules\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Capsule serial number\",\"type\":\"string\"},\"land_landings\":{\"description\":\"Number of land landings\",\"type\":\"integer\"},\"last_update\":{\"description\":\"Last update about the capsule\",\"nullable\":true,\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"reuse_count\":{\"description\":\"Number of times capsule has been reused\",\"type\":\"integer\"},\"serial\":{\"description\":\"Capsule serial number\",\"type\":\"string\"},\"status\":{\"description\":\"Capsule status\",\"type\":\"string\"},\"type\":{\"description\":\"Capsule type\",\"type\":\"string\"},\"water_landings\":{\"description\":\"Number of water landings\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/capsules","segments":[{"lit":"capsules"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /capsules/{id}","json":"{\"operationId\":\"getOneCapsule\",\"parameters\":[{\"description\":\"Capsule ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Capsule serial number\",\"type\":\"string\"},\"land_landings\":{\"description\":\"Number of land landings\",\"type\":\"integer\"},\"last_update\":{\"description\":\"Last update about the capsule\",\"nullable\":true,\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"reuse_count\":{\"description\":\"Number of times capsule has been reused\",\"type\":\"integer\"},\"serial\":{\"description\":\"Capsule serial number\",\"type\":\"string\"},\"status\":{\"description\":\"Capsule status\",\"type\":\"string\"},\"type\":{\"description\":\"Capsule type\",\"type\":\"string\"},\"water_landings\":{\"description\":\"Number of water landings\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Capsule not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/capsules/{id}","segments":[{"lit":"capsules"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"capsule","name__orig":"capsule","Name":"Capsule","name_":"capsule","name-":"capsule","NAME":"CAPSULE","index$":0}, {"active":true,"entity":"capsule","key$":"BasicCapsuleFlow","kind":"basic","name":"BasicCapsuleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"capsule_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"capsule_ref01","srcdatavar":"capsule_ref01_data","suffix":"_dt0"},"match":{"id":"capsule01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-capsule_ref01"}}],"index$":1}]}, 'Capsule')
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
  
