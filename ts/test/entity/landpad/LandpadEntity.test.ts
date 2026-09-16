

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


describe('LandpadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Landpad()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'landpad.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"details","req":false,"short":"Landing pad details","type":"`$STRING`","index$":0},{"active":true,"name":"full_name","req":false,"short":"Full landing pad name","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Landing pad ID","type":"`$STRING`","index$":2},{"active":true,"name":"landing_attempts","req":false,"short":"Number of landing attempts","type":"`$INTEGER`","index$":3},{"active":true,"name":"landing_successes","req":false,"short":"Number of successful landings","type":"`$INTEGER`","index$":4},{"active":true,"name":"latitude","req":false,"short":"Latitude","type":"`$NUMBER`","index$":5},{"active":true,"name":"launches","req":false,"short":"Launch IDs","type":"`$ARRAY`","index$":6},{"active":true,"name":"locality","req":false,"short":"Locality","type":"`$STRING`","index$":7},{"active":true,"name":"longitude","req":false,"short":"Longitude","type":"`$NUMBER`","index$":8},{"active":true,"name":"name","req":false,"short":"Landing pad name","type":"`$STRING`","index$":9},{"active":true,"name":"region","req":false,"short":"Region","type":"`$STRING`","index$":10},{"active":true,"name":"status","req":false,"short":"Landing pad status (active, inactive, unknown, retired, lost, under construction)","type":"`$STRING`","index$":11},{"active":true,"name":"type","req":false,"short":"Landing pad type (ASDS, RTLS)","type":"`$STRING`","index$":12},{"active":true,"name":"wikipedia","req":false,"short":"Wikipedia URL","type":"`$STRING`","index$":13}],"id":{"field":"id","name":"id"},"name":"landpad","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /landpads","json":"{\"operationId\":\"getAllLandpads\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"details\":{\"description\":\"Landing pad details\",\"type\":\"string\"},\"full_name\":{\"description\":\"Full landing pad name\",\"type\":\"string\"},\"id\":{\"description\":\"Landing pad ID\",\"type\":\"string\"},\"landing_attempts\":{\"description\":\"Number of landing attempts\",\"type\":\"integer\"},\"landing_successes\":{\"description\":\"Number of successful landings\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude\",\"type\":\"number\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"locality\":{\"description\":\"Locality\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Landing pad name\",\"type\":\"string\"},\"region\":{\"description\":\"Region\",\"type\":\"string\"},\"status\":{\"description\":\"Landing pad status (active, inactive, unknown, retired, lost, under construction)\",\"type\":\"string\"},\"type\":{\"description\":\"Landing pad type (ASDS, RTLS)\",\"type\":\"string\"},\"wikipedia\":{\"description\":\"Wikipedia URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/landpads","segments":[{"lit":"landpads"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /landpads/{id}","json":"{\"operationId\":\"getOneLandpad\",\"parameters\":[{\"description\":\"Landing pad ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"details\":{\"description\":\"Landing pad details\",\"type\":\"string\"},\"full_name\":{\"description\":\"Full landing pad name\",\"type\":\"string\"},\"id\":{\"description\":\"Landing pad ID\",\"type\":\"string\"},\"landing_attempts\":{\"description\":\"Number of landing attempts\",\"type\":\"integer\"},\"landing_successes\":{\"description\":\"Number of successful landings\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude\",\"type\":\"number\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"locality\":{\"description\":\"Locality\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Landing pad name\",\"type\":\"string\"},\"region\":{\"description\":\"Region\",\"type\":\"string\"},\"status\":{\"description\":\"Landing pad status (active, inactive, unknown, retired, lost, under construction)\",\"type\":\"string\"},\"type\":{\"description\":\"Landing pad type (ASDS, RTLS)\",\"type\":\"string\"},\"wikipedia\":{\"description\":\"Wikipedia URL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Landing pad not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/landpads/{id}","segments":[{"lit":"landpads"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"landpad","name__orig":"landpad","Name":"Landpad","name_":"landpad","name-":"landpad","NAME":"LANDPAD","index$":3}, {"active":true,"entity":"landpad","key$":"BasicLandpadFlow","kind":"basic","name":"BasicLandpadFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"landpad_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"landpad_ref01","srcdatavar":"landpad_ref01_data","suffix":"_dt0"},"match":{"id":"landpad01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-landpad_ref01"}}],"index$":1}]}, 'Landpad')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let landpad_ref01_data = Object.values(setup.data.existing.landpad)[0] as any

    // LIST
    const landpad_ref01_ent = client.Landpad()
    const landpad_ref01_match: any = {}

    const landpad_ref01_list = (await landpad_ref01_ent.list(landpad_ref01_match)).map((e: any) => e.data())


    // LOAD
    const landpad_ref01_match_dt0: any = {}
    landpad_ref01_match_dt0.id = landpad_ref01_data.id
    const landpad_ref01_data_dt0 = (await landpad_ref01_ent.load(landpad_ref01_match_dt0)).data()
    assert(landpad_ref01_data_dt0.id === landpad_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/landpad/LandpadTestData.json')

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
    ['landpad01','landpad02','landpad03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_LANDPAD_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_LANDPAD_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_LANDPAD_ENTID']
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
  
