

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Landing pad details","t":"`$STRING`","key$":"details","index$":0},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":false,"sh":"Full landing pad name","t":"`$STRING`","key$":"full_name","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Landing pad ID","t":"`$STRING`","key$":"id","index$":2},"landing_attempts":{"a":true,"h":"Landing Attempts","n":"landing_attempts","r":false,"sh":"Number of landing attempts","t":"`$INTEGER`","key$":"landing_attempts","index$":3},"landing_successes":{"a":true,"h":"Landing Successes","n":"landing_successes","r":false,"sh":"Number of successful landings","t":"`$INTEGER`","key$":"landing_successes","index$":4},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude","t":"`$NUMBER`","key$":"latitude","index$":5},"launches":{"a":true,"h":"Launches","n":"launches","r":false,"sh":"Launch IDs","t":"`$ARRAY`","key$":"launches","index$":6},"locality":{"a":true,"h":"Locality","n":"locality","r":false,"sh":"Locality","t":"`$STRING`","key$":"locality","index$":7},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude","t":"`$NUMBER`","key$":"longitude","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Landing pad name","t":"`$STRING`","key$":"name","index$":9},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region","t":"`$STRING`","key$":"region","index$":10},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Landing pad status (active, inactive, unknown, retired, lost, under construction)","t":"`$STRING`","key$":"status","index$":11},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Landing pad type (ASDS, RTLS)","t":"`$STRING`","key$":"type","index$":12},"wikipedia":{"a":true,"h":"Wikipedia","n":"wikipedia","r":false,"sh":"Wikipedia URL","t":"`$STRING`","key$":"wikipedia","index$":13}},"id":{"field":"id","name":"id"},"name":"landpad","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /landpads","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/landpads","q":{},"r":{},"s":[{"lit":"landpads"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /landpads/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/landpads/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"landpads"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"landpad","name__orig":"landpad","Name":"Landpad","name_":"landpad","name-":"landpad","NAME":"LANDPAD","index$":3}, {"active":true,"entity":"landpad","key$":"BasicLandpadFlow","kind":"basic","name":"BasicLandpadFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"landpad_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"landpad_ref01","srcdatavar":"landpad_ref01_data","suffix":"_dt0"},"m":{"id":"landpad01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-landpad_ref01"}}],"index$":1}]}, 'Landpad', {"GET /landpads":{"protocol":"http","operationId":"getAllLandpads","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Landing pad ID","key$":"id"},"name":{"type":"string","description":"Landing pad name","key$":"name"},"full_name":{"type":"string","description":"Full landing pad name","key$":"full_name"},"status":{"type":"string","description":"Landing pad status (active, inactive, unknown, retired, lost, under construction)","key$":"status"},"type":{"type":"string","description":"Landing pad type (ASDS, RTLS)","key$":"type"},"locality":{"type":"string","description":"Locality","key$":"locality"},"region":{"type":"string","description":"Region","key$":"region"},"latitude":{"type":"number","description":"Latitude","key$":"latitude"},"longitude":{"type":"number","description":"Longitude","key$":"longitude"},"landing_attempts":{"type":"integer","description":"Number of landing attempts","key$":"landing_attempts"},"landing_successes":{"type":"integer","description":"Number of successful landings","key$":"landing_successes"},"wikipedia":{"type":"string","description":"Wikipedia URL","key$":"wikipedia"},"details":{"type":"string","description":"Landing pad details","key$":"details"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"}},"x-ref":"#/components/schemas/Landpad","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /landpads/{id}":{"protocol":"http","operationId":"getOneLandpad","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Landing pad ID","key$":"id"},"name":{"type":"string","description":"Landing pad name","key$":"name"},"full_name":{"type":"string","description":"Full landing pad name","key$":"full_name"},"status":{"type":"string","description":"Landing pad status (active, inactive, unknown, retired, lost, under construction)","key$":"status"},"type":{"type":"string","description":"Landing pad type (ASDS, RTLS)","key$":"type"},"locality":{"type":"string","description":"Locality","key$":"locality"},"region":{"type":"string","description":"Region","key$":"region"},"latitude":{"type":"number","description":"Latitude","key$":"latitude"},"longitude":{"type":"number","description":"Longitude","key$":"longitude"},"landing_attempts":{"type":"integer","description":"Number of landing attempts","key$":"landing_attempts"},"landing_successes":{"type":"integer","description":"Number of successful landings","key$":"landing_successes"},"wikipedia":{"type":"string","description":"Wikipedia URL","key$":"wikipedia"},"details":{"type":"string","description":"Landing pad details","key$":"details"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"}},"x-ref":"#/components/schemas/Landpad","index$":0}}}},"404":{"description":"Landing pad not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Landing pad ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
