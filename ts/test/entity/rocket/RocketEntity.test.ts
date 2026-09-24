

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"h":"Active","n":"active","r":false,"sh":"Whether the rocket is active","t":"`$BOOLEAN`","key$":"active","index$":0},"boosters":{"a":true,"h":"Boosters","n":"boosters","r":false,"sh":"Number of boosters","t":"`$INTEGER`","key$":"boosters","index$":1},"company":{"a":true,"h":"Company","n":"company","r":false,"sh":"Company","t":"`$STRING`","key$":"company","index$":2},"cost_per_launch":{"a":true,"h":"Cost Per Launch","n":"cost_per_launch","r":false,"sh":"Cost per launch in USD","t":"`$INTEGER`","key$":"cost_per_launch","index$":3},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country of origin","t":"`$STRING`","key$":"country","index$":4},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":5},"diameter":{"a":true,"h":"Diameter","n":"diameter","r":false,"t":"`$OBJECT`","key$":"diameter","index$":6},"first_flight":{"a":true,"fo":"date","h":"First Flight","n":"first_flight","r":false,"sh":"Date of first flight","t":"`$STRING`","key$":"first_flight","index$":7},"flickr_images":{"a":true,"h":"Flickr Images","n":"flickr_images","r":false,"t":"`$ARRAY`","key$":"flickr_images","index$":8},"height":{"a":true,"h":"Height","n":"height","r":false,"t":"`$OBJECT`","key$":"height","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Rocket ID","t":"`$STRING`","key$":"id","index$":10},"mass":{"a":true,"h":"Mass","n":"mass","r":false,"t":"`$OBJECT`","key$":"mass","index$":11},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Rocket name","t":"`$STRING`","key$":"name","index$":12},"stages":{"a":true,"h":"Stages","n":"stages","r":false,"sh":"Number of stages","t":"`$INTEGER`","key$":"stages","index$":13},"success_rate_pct":{"a":true,"h":"Success Rate Pct","n":"success_rate_pct","r":false,"sh":"Success rate percentage","t":"`$NUMBER`","key$":"success_rate_pct","index$":14},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Rocket type","t":"`$STRING`","key$":"type","index$":15},"wikipedia":{"a":true,"h":"Wikipedia","n":"wikipedia","r":false,"t":"`$STRING`","key$":"wikipedia","index$":16}},"id":{"field":"id","name":"id"},"name":"rocket","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /rockets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/rockets","q":{},"r":{},"s":[{"lit":"rockets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /rockets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/rockets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"rockets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rocket","name__orig":"rocket","Name":"Rocket","name_":"rocket","name-":"rocket","NAME":"ROCKET","index$":8}, {"active":true,"entity":"rocket","key$":"BasicRocketFlow","kind":"basic","name":"BasicRocketFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"rocket_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"rocket_ref01","srcdatavar":"rocket_ref01_data","suffix":"_dt0"},"m":{"id":"rocket01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rocket_ref01"}}],"index$":1}]}, 'Rocket', {"GET /rockets":{"protocol":"http","operationId":"getAllRockets","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Rocket ID","key$":"id"},"name":{"type":"string","description":"Rocket name","key$":"name"},"type":{"type":"string","description":"Rocket type","key$":"type"},"active":{"type":"boolean","description":"Whether the rocket is active","key$":"active"},"stages":{"type":"integer","description":"Number of stages","key$":"stages"},"boosters":{"type":"integer","description":"Number of boosters","key$":"boosters"},"cost_per_launch":{"type":"integer","description":"Cost per launch in USD","key$":"cost_per_launch"},"success_rate_pct":{"type":"number","description":"Success rate percentage","key$":"success_rate_pct"},"first_flight":{"type":"string","format":"date","description":"Date of first flight","key$":"first_flight"},"country":{"type":"string","description":"Country of origin","key$":"country"},"company":{"type":"string","description":"Company","key$":"company"},"height":{"type":"object","properties":{"meters":{"type":"number"},"feet":{"type":"number"}},"key$":"height"},"diameter":{"type":"object","properties":{"meters":{"type":"number"},"feet":{"type":"number"}},"key$":"diameter"},"mass":{"type":"object","properties":{"kg":{"type":"integer"},"lb":{"type":"integer"}},"key$":"mass"},"flickr_images":{"type":"array","items":{"type":"string"},"key$":"flickr_images"},"description":{"type":"string","key$":"description"},"wikipedia":{"type":"string","key$":"wikipedia"}},"x-ref":"#/components/schemas/Rocket","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /rockets/{id}":{"protocol":"http","operationId":"getOneRocket","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Rocket ID","key$":"id"},"name":{"type":"string","description":"Rocket name","key$":"name"},"type":{"type":"string","description":"Rocket type","key$":"type"},"active":{"type":"boolean","description":"Whether the rocket is active","key$":"active"},"stages":{"type":"integer","description":"Number of stages","key$":"stages"},"boosters":{"type":"integer","description":"Number of boosters","key$":"boosters"},"cost_per_launch":{"type":"integer","description":"Cost per launch in USD","key$":"cost_per_launch"},"success_rate_pct":{"type":"number","description":"Success rate percentage","key$":"success_rate_pct"},"first_flight":{"type":"string","format":"date","description":"Date of first flight","key$":"first_flight"},"country":{"type":"string","description":"Country of origin","key$":"country"},"company":{"type":"string","description":"Company","key$":"company"},"height":{"type":"object","properties":{"meters":{"type":"number"},"feet":{"type":"number"}},"key$":"height"},"diameter":{"type":"object","properties":{"meters":{"type":"number"},"feet":{"type":"number"}},"key$":"diameter"},"mass":{"type":"object","properties":{"kg":{"type":"integer"},"lb":{"type":"integer"}},"key$":"mass"},"flickr_images":{"type":"array","items":{"type":"string"},"key$":"flickr_images"},"description":{"type":"string","key$":"description"},"wikipedia":{"type":"string","key$":"wikipedia"}},"x-ref":"#/components/schemas/Rocket","index$":0}}}},"404":{"description":"Rocket not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Rocket ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
