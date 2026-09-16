

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


describe('CoreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Core()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'core.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"asds_attempts","req":false,"short":"Number of autonomous spaceport drone ship landing attempts","type":"`$INTEGER`","index$":0},{"active":true,"name":"asds_landings","req":false,"short":"Number of successful ASDS landings","type":"`$INTEGER`","index$":1},{"active":true,"name":"block","req":false,"short":"Core block number","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"short":"Core serial number","type":"`$STRING`","index$":3},{"active":true,"name":"last_update","req":false,"short":"Last update about the core","type":"`$STRING`","index$":4},{"active":true,"name":"launches","req":false,"short":"Launch IDs","type":"`$ARRAY`","index$":5},{"active":true,"name":"reuse_count","req":false,"short":"Number of times core has been reused","type":"`$INTEGER`","index$":6},{"active":true,"name":"rtls_attempts","req":false,"short":"Number of return to launch site attempts","type":"`$INTEGER`","index$":7},{"active":true,"name":"rtls_landings","req":false,"short":"Number of successful RTLS landings","type":"`$INTEGER`","index$":8},{"active":true,"name":"serial","req":false,"short":"Core serial number","type":"`$STRING`","index$":9},{"active":true,"name":"status","req":false,"short":"Core status (active, inactive, unknown, expended, lost, retired)","type":"`$STRING`","index$":10}],"id":{"field":"id","name":"id"},"name":"core","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /cores","json":"{\"operationId\":\"getAllCores\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"asds_attempts\":{\"description\":\"Number of autonomous spaceport drone ship landing attempts\",\"type\":\"integer\"},\"asds_landings\":{\"description\":\"Number of successful ASDS landings\",\"type\":\"integer\"},\"block\":{\"description\":\"Core block number\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Core serial number\",\"type\":\"string\"},\"last_update\":{\"description\":\"Last update about the core\",\"nullable\":true,\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"reuse_count\":{\"description\":\"Number of times core has been reused\",\"type\":\"integer\"},\"rtls_attempts\":{\"description\":\"Number of return to launch site attempts\",\"type\":\"integer\"},\"rtls_landings\":{\"description\":\"Number of successful RTLS landings\",\"type\":\"integer\"},\"serial\":{\"description\":\"Core serial number\",\"type\":\"string\"},\"status\":{\"description\":\"Core status (active, inactive, unknown, expended, lost, retired)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cores","segments":[{"lit":"cores"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cores/{id}","json":"{\"operationId\":\"getOneCore\",\"parameters\":[{\"description\":\"Core ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"asds_attempts\":{\"description\":\"Number of autonomous spaceport drone ship landing attempts\",\"type\":\"integer\"},\"asds_landings\":{\"description\":\"Number of successful ASDS landings\",\"type\":\"integer\"},\"block\":{\"description\":\"Core block number\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Core serial number\",\"type\":\"string\"},\"last_update\":{\"description\":\"Last update about the core\",\"nullable\":true,\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"reuse_count\":{\"description\":\"Number of times core has been reused\",\"type\":\"integer\"},\"rtls_attempts\":{\"description\":\"Number of return to launch site attempts\",\"type\":\"integer\"},\"rtls_landings\":{\"description\":\"Number of successful RTLS landings\",\"type\":\"integer\"},\"serial\":{\"description\":\"Core serial number\",\"type\":\"string\"},\"status\":{\"description\":\"Core status (active, inactive, unknown, expended, lost, retired)\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Core not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cores/{id}","segments":[{"lit":"cores"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"core","name__orig":"core","Name":"Core","name_":"core","name-":"core","NAME":"CORE","index$":1}, {"active":true,"entity":"core","key$":"BasicCoreFlow","kind":"basic","name":"BasicCoreFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"core_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"core_ref01","srcdatavar":"core_ref01_data","suffix":"_dt0"},"match":{"id":"core01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-core_ref01"}}],"index$":1}]}, 'Core')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let core_ref01_data = Object.values(setup.data.existing.core)[0] as any

    // LIST
    const core_ref01_ent = client.Core()
    const core_ref01_match: any = {}

    const core_ref01_list = (await core_ref01_ent.list(core_ref01_match)).map((e: any) => e.data())


    // LOAD
    const core_ref01_match_dt0: any = {}
    core_ref01_match_dt0.id = core_ref01_data.id
    const core_ref01_data_dt0 = (await core_ref01_ent.load(core_ref01_match_dt0)).data()
    assert(core_ref01_data_dt0.id === core_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/core/CoreTestData.json')

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
    ['core01','core02','core03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_CORE_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_CORE_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_CORE_ENTID']
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
  
