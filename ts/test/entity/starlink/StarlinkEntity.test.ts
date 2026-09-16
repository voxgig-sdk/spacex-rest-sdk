

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


describe('StarlinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Starlink()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'starlink.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"height_km","req":false,"short":"Current height in kilometers","type":"`$NUMBER`","index$":0},{"active":true,"name":"id","req":false,"short":"Starlink satellite ID","type":"`$STRING`","index$":1},{"active":true,"name":"latitude","req":false,"short":"Current latitude","type":"`$NUMBER`","index$":2},{"active":true,"name":"launch","req":false,"short":"Launch ID","type":"`$STRING`","index$":3},{"active":true,"name":"longitude","req":false,"short":"Current longitude","type":"`$NUMBER`","index$":4},{"active":true,"name":"spaceTrack","req":false,"short":"Space-Track.org data","type":"`$OBJECT`","index$":5},{"active":true,"name":"velocity_kms","req":false,"short":"Current velocity in km/s","type":"`$NUMBER`","index$":6},{"active":true,"name":"version","req":false,"short":"Satellite version","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"starlink","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /starlink","json":"{\"operationId\":\"getAllStarlink\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"height_km\":{\"description\":\"Current height in kilometers\",\"type\":\"number\"},\"id\":{\"description\":\"Starlink satellite ID\",\"type\":\"string\"},\"latitude\":{\"description\":\"Current latitude\",\"type\":\"number\"},\"launch\":{\"description\":\"Launch ID\",\"type\":\"string\"},\"longitude\":{\"description\":\"Current longitude\",\"type\":\"number\"},\"spaceTrack\":{\"description\":\"Space-Track.org data\",\"type\":\"object\"},\"velocity_kms\":{\"description\":\"Current velocity in km/s\",\"type\":\"number\"},\"version\":{\"description\":\"Satellite version\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/starlink","segments":[{"lit":"starlink"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /starlink/{id}","json":"{\"operationId\":\"getOneStarlink\",\"parameters\":[{\"description\":\"Starlink satellite ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"height_km\":{\"description\":\"Current height in kilometers\",\"type\":\"number\"},\"id\":{\"description\":\"Starlink satellite ID\",\"type\":\"string\"},\"latitude\":{\"description\":\"Current latitude\",\"type\":\"number\"},\"launch\":{\"description\":\"Launch ID\",\"type\":\"string\"},\"longitude\":{\"description\":\"Current longitude\",\"type\":\"number\"},\"spaceTrack\":{\"description\":\"Space-Track.org data\",\"type\":\"object\"},\"velocity_kms\":{\"description\":\"Current velocity in km/s\",\"type\":\"number\"},\"version\":{\"description\":\"Satellite version\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Starlink satellite not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/starlink/{id}","segments":[{"lit":"starlink"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.spaceTrack`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"starlink","name__orig":"starlink","Name":"Starlink","name_":"starlink","name-":"starlink","NAME":"STARLINK","index$":10}, {"active":true,"entity":"starlink","key$":"BasicStarlinkFlow","kind":"basic","name":"BasicStarlinkFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"starlink_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"starlink_ref01","srcdatavar":"starlink_ref01_data","suffix":"_dt0"},"match":{"id":"starlink01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-starlink_ref01"}}],"index$":1}]}, 'Starlink')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let starlink_ref01_data = Object.values(setup.data.existing.starlink)[0] as any

    // LIST
    const starlink_ref01_ent = client.Starlink()
    const starlink_ref01_match: any = {}

    const starlink_ref01_list = (await starlink_ref01_ent.list(starlink_ref01_match)).map((e: any) => e.data())


    // LOAD
    const starlink_ref01_match_dt0: any = {}
    starlink_ref01_match_dt0.id = starlink_ref01_data.id
    const starlink_ref01_data_dt0 = (await starlink_ref01_ent.load(starlink_ref01_match_dt0)).data()
    assert(starlink_ref01_data_dt0.id === starlink_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/starlink/StarlinkTestData.json')

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
    ['starlink01','starlink02','starlink03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_STARLINK_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_STARLINK_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_STARLINK_ENTID']
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
  
