

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"agency","req":false,"short":"Agency","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Crew member ID","type":"`$STRING`","index$":1},{"active":true,"name":"image","req":false,"short":"Image URL","type":"`$STRING`","index$":2},{"active":true,"name":"launches","req":false,"short":"Launch IDs","type":"`$ARRAY`","index$":3},{"active":true,"name":"name","req":false,"short":"Crew member name","type":"`$STRING`","index$":4},{"active":true,"name":"status","req":false,"short":"Status (active, inactive, retired, unknown)","type":"`$STRING`","index$":5},{"active":true,"name":"wikipedia","req":false,"short":"Wikipedia URL","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"crew","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /crew","json":"{\"operationId\":\"getAllCrew\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"agency\":{\"description\":\"Agency\",\"type\":\"string\"},\"id\":{\"description\":\"Crew member ID\",\"type\":\"string\"},\"image\":{\"description\":\"Image URL\",\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Crew member name\",\"type\":\"string\"},\"status\":{\"description\":\"Status (active, inactive, retired, unknown)\",\"type\":\"string\"},\"wikipedia\":{\"description\":\"Wikipedia URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crew","segments":[{"lit":"crew"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /crew/{id}","json":"{\"operationId\":\"getOneCrew\",\"parameters\":[{\"description\":\"Crew member ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agency\":{\"description\":\"Agency\",\"type\":\"string\"},\"id\":{\"description\":\"Crew member ID\",\"type\":\"string\"},\"image\":{\"description\":\"Image URL\",\"type\":\"string\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Crew member name\",\"type\":\"string\"},\"status\":{\"description\":\"Status (active, inactive, retired, unknown)\",\"type\":\"string\"},\"wikipedia\":{\"description\":\"Wikipedia URL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Crew member not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crew/{id}","segments":[{"lit":"crew"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"crew","name__orig":"crew","Name":"Crew","name_":"crew","name-":"crew","NAME":"CREW","index$":2}, {"active":true,"entity":"crew","key$":"BasicCrewFlow","kind":"basic","name":"BasicCrewFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"crew_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"crew_ref01","srcdatavar":"crew_ref01_data","suffix":"_dt0"},"match":{"id":"crew01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-crew_ref01"}}],"index$":1}]}, 'Crew')
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
  
