

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


describe('CrewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Crew()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'crew.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agency":{"a":true,"h":"Agency","n":"agency","r":false,"sh":"Agency","t":"`$STRING`","key$":"agency","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Crew member ID","t":"`$STRING`","key$":"id","index$":1},"image":{"a":true,"h":"Image","n":"image","r":false,"sh":"Image URL","t":"`$STRING`","key$":"image","index$":2},"launches":{"a":true,"h":"Launches","n":"launches","r":false,"sh":"Launch IDs","t":"`$ARRAY`","key$":"launches","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Crew member name","t":"`$STRING`","key$":"name","index$":4},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status (active, inactive, retired, unknown)","t":"`$STRING`","key$":"status","index$":5},"wikipedia":{"a":true,"h":"Wikipedia","n":"wikipedia","r":false,"sh":"Wikipedia URL","t":"`$STRING`","key$":"wikipedia","index$":6}},"id":{"field":"id","name":"id"},"name":"crew","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /crew","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/crew","q":{},"r":{},"s":[{"lit":"crew"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /crew/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/crew/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"crew"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"crew","name__orig":"crew","Name":"Crew","name_":"crew","name-":"crew","NAME":"CREW","index$":2}, {"active":true,"entity":"crew","key$":"BasicCrewFlow","kind":"basic","name":"BasicCrewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"crew_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"crew_ref01","srcdatavar":"crew_ref01_data","suffix":"_dt0"},"m":{"id":"crew01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-crew_ref01"}}],"index$":1}]}, 'Crew', {"GET /crew":{"protocol":"http","operationId":"getAllCrew","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Crew member ID","key$":"id"},"name":{"type":"string","description":"Crew member name","key$":"name"},"agency":{"type":"string","description":"Agency","key$":"agency"},"image":{"type":"string","description":"Image URL","key$":"image"},"wikipedia":{"type":"string","description":"Wikipedia URL","key$":"wikipedia"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"},"status":{"type":"string","description":"Status (active, inactive, retired, unknown)","key$":"status"}},"x-ref":"#/components/schemas/Crew","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /crew/{id}":{"protocol":"http","operationId":"getOneCrew","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Crew member ID","key$":"id"},"name":{"type":"string","description":"Crew member name","key$":"name"},"agency":{"type":"string","description":"Agency","key$":"agency"},"image":{"type":"string","description":"Image URL","key$":"image"},"wikipedia":{"type":"string","description":"Wikipedia URL","key$":"wikipedia"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"},"status":{"type":"string","description":"Status (active, inactive, retired, unknown)","key$":"status"}},"x-ref":"#/components/schemas/Crew","index$":0}}}},"404":{"description":"Crew member not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Crew member ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let crew_ref01_data = Object.values(setup.data.existing.crew)[0] as any

    // LIST
    const crew_ref01_ent = client.Crew()
    const crew_ref01_match: any = {}

    const crew_ref01_list = (await crew_ref01_ent.list(crew_ref01_match)).map((e: any) => e.data())


    // LOAD
    const crew_ref01_match_dt0: any = {}
    crew_ref01_match_dt0.id = crew_ref01_data.id
    const crew_ref01_data_dt0 = (await crew_ref01_ent.load(crew_ref01_match_dt0)).data()
    assert(crew_ref01_data_dt0.id === crew_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/crew/CrewTestData.json')

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
    ['crew01','crew02','crew03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_CREW_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_CREW_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_CREW_ENTID']
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
  
