

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


describe('RocketEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Rocket()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rocket.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"active","req":false,"short":"Whether the rocket is active","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"boosters","req":false,"short":"Number of boosters","type":"`$INTEGER`","index$":1},{"active":true,"name":"company","req":false,"short":"Company","type":"`$STRING`","index$":2},{"active":true,"name":"cost_per_launch","req":false,"short":"Cost per launch in USD","type":"`$INTEGER`","index$":3},{"active":true,"name":"country","req":false,"short":"Country of origin","type":"`$STRING`","index$":4},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"diameter","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"format":"date","name":"first_flight","req":false,"short":"Date of first flight","type":"`$STRING`","index$":7},{"active":true,"name":"flickr_images","req":false,"type":"`$ARRAY`","index$":8},{"active":true,"name":"height","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"id","req":false,"short":"Rocket ID","type":"`$STRING`","index$":10},{"active":true,"name":"mass","req":false,"type":"`$OBJECT`","index$":11},{"active":true,"name":"name","req":false,"short":"Rocket name","type":"`$STRING`","index$":12},{"active":true,"name":"stages","req":false,"short":"Number of stages","type":"`$INTEGER`","index$":13},{"active":true,"name":"success_rate_pct","req":false,"short":"Success rate percentage","type":"`$NUMBER`","index$":14},{"active":true,"name":"type","req":false,"short":"Rocket type","type":"`$STRING`","index$":15},{"active":true,"name":"wikipedia","req":false,"type":"`$STRING`","index$":16}],"id":{"field":"id","name":"id"},"name":"rocket","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /rockets","json":"{\"operationId\":\"getAllRockets\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"active\":{\"description\":\"Whether the rocket is active\",\"type\":\"boolean\"},\"boosters\":{\"description\":\"Number of boosters\",\"type\":\"integer\"},\"company\":{\"description\":\"Company\",\"type\":\"string\"},\"cost_per_launch\":{\"description\":\"Cost per launch in USD\",\"type\":\"integer\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"diameter\":{\"properties\":{\"feet\":{\"type\":\"number\"},\"meters\":{\"type\":\"number\"}},\"type\":\"object\"},\"first_flight\":{\"description\":\"Date of first flight\",\"format\":\"date\",\"type\":\"string\"},\"flickr_images\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"height\":{\"properties\":{\"feet\":{\"type\":\"number\"},\"meters\":{\"type\":\"number\"}},\"type\":\"object\"},\"id\":{\"description\":\"Rocket ID\",\"type\":\"string\"},\"mass\":{\"properties\":{\"kg\":{\"type\":\"integer\"},\"lb\":{\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"description\":\"Rocket name\",\"type\":\"string\"},\"stages\":{\"description\":\"Number of stages\",\"type\":\"integer\"},\"success_rate_pct\":{\"description\":\"Success rate percentage\",\"type\":\"number\"},\"type\":{\"description\":\"Rocket type\",\"type\":\"string\"},\"wikipedia\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rockets","segments":[{"lit":"rockets"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /rockets/{id}","json":"{\"operationId\":\"getOneRocket\",\"parameters\":[{\"description\":\"Rocket ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"active\":{\"description\":\"Whether the rocket is active\",\"type\":\"boolean\"},\"boosters\":{\"description\":\"Number of boosters\",\"type\":\"integer\"},\"company\":{\"description\":\"Company\",\"type\":\"string\"},\"cost_per_launch\":{\"description\":\"Cost per launch in USD\",\"type\":\"integer\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"diameter\":{\"properties\":{\"feet\":{\"type\":\"number\"},\"meters\":{\"type\":\"number\"}},\"type\":\"object\"},\"first_flight\":{\"description\":\"Date of first flight\",\"format\":\"date\",\"type\":\"string\"},\"flickr_images\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"height\":{\"properties\":{\"feet\":{\"type\":\"number\"},\"meters\":{\"type\":\"number\"}},\"type\":\"object\"},\"id\":{\"description\":\"Rocket ID\",\"type\":\"string\"},\"mass\":{\"properties\":{\"kg\":{\"type\":\"integer\"},\"lb\":{\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"description\":\"Rocket name\",\"type\":\"string\"},\"stages\":{\"description\":\"Number of stages\",\"type\":\"integer\"},\"success_rate_pct\":{\"description\":\"Success rate percentage\",\"type\":\"number\"},\"type\":{\"description\":\"Rocket type\",\"type\":\"string\"},\"wikipedia\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Rocket not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rockets/{id}","segments":[{"lit":"rockets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rocket","name__orig":"rocket","Name":"Rocket","name_":"rocket","name-":"rocket","NAME":"ROCKET","index$":8}, {"active":true,"entity":"rocket","key$":"BasicRocketFlow","kind":"basic","name":"BasicRocketFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"rocket_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"rocket_ref01","srcdatavar":"rocket_ref01_data","suffix":"_dt0"},"match":{"id":"rocket01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rocket_ref01"}}],"index$":1}]}, 'Rocket')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rocket_ref01_data = Object.values(setup.data.existing.rocket)[0] as any

    // LIST
    const rocket_ref01_ent = client.Rocket()
    const rocket_ref01_match: any = {}

    const rocket_ref01_list = (await rocket_ref01_ent.list(rocket_ref01_match)).map((e: any) => e.data())


    // LOAD
    const rocket_ref01_match_dt0: any = {}
    rocket_ref01_match_dt0.id = rocket_ref01_data.id
    const rocket_ref01_data_dt0 = (await rocket_ref01_ent.load(rocket_ref01_match_dt0)).data()
    assert(rocket_ref01_data_dt0.id === rocket_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rocket/RocketTestData.json')

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
    ['rocket01','rocket02','rocket03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_ROCKET_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_ROCKET_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_ROCKET_ENTID']
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
  
