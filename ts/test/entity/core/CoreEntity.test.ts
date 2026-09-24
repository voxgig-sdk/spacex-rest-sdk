

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"asds_attempts":{"a":true,"h":"Asds Attempts","n":"asds_attempts","r":false,"sh":"Number of autonomous spaceport drone ship landing attempts","t":"`$INTEGER`","key$":"asds_attempts","index$":0},"asds_landings":{"a":true,"h":"Asds Landings","n":"asds_landings","r":false,"sh":"Number of successful ASDS landings","t":"`$INTEGER`","key$":"asds_landings","index$":1},"block":{"a":true,"h":"Block","n":"block","r":false,"sh":"Core block number","t":"`$INTEGER`","key$":"block","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Core serial number","t":"`$STRING`","key$":"id","index$":3},"last_update":{"a":true,"h":"Last Update","n":"last_update","r":false,"sh":"Last update about the core","t":"`$STRING`","key$":"last_update","index$":4},"launches":{"a":true,"h":"Launches","n":"launches","r":false,"sh":"Launch IDs","t":"`$ARRAY`","key$":"launches","index$":5},"reuse_count":{"a":true,"h":"Reuse Count","n":"reuse_count","r":false,"sh":"Number of times core has been reused","t":"`$INTEGER`","key$":"reuse_count","index$":6},"rtls_attempts":{"a":true,"h":"Rtls Attempts","n":"rtls_attempts","r":false,"sh":"Number of return to launch site attempts","t":"`$INTEGER`","key$":"rtls_attempts","index$":7},"rtls_landings":{"a":true,"h":"Rtls Landings","n":"rtls_landings","r":false,"sh":"Number of successful RTLS landings","t":"`$INTEGER`","key$":"rtls_landings","index$":8},"serial":{"a":true,"h":"Serial","n":"serial","r":false,"sh":"Core serial number","t":"`$STRING`","key$":"serial","index$":9},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Core status (active, inactive, unknown, expended, lost, retired)","t":"`$STRING`","key$":"status","index$":10}},"id":{"field":"id","name":"id"},"name":"core","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cores","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/cores","q":{},"r":{},"s":[{"lit":"cores"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /cores/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/cores/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"cores"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"core","name__orig":"core","Name":"Core","name_":"core","name-":"core","NAME":"CORE","index$":1}, {"active":true,"entity":"core","key$":"BasicCoreFlow","kind":"basic","name":"BasicCoreFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"core_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"core_ref01","srcdatavar":"core_ref01_data","suffix":"_dt0"},"m":{"id":"core01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-core_ref01"}}],"index$":1}]}, 'Core', {"GET /cores":{"protocol":"http","operationId":"getAllCores","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Core serial number","key$":"id"},"block":{"type":"integer","nullable":true,"description":"Core block number","key$":"block"},"reuse_count":{"type":"integer","description":"Number of times core has been reused","key$":"reuse_count"},"rtls_attempts":{"type":"integer","description":"Number of return to launch site attempts","key$":"rtls_attempts"},"rtls_landings":{"type":"integer","description":"Number of successful RTLS landings","key$":"rtls_landings"},"asds_attempts":{"type":"integer","description":"Number of autonomous spaceport drone ship landing attempts","key$":"asds_attempts"},"asds_landings":{"type":"integer","description":"Number of successful ASDS landings","key$":"asds_landings"},"last_update":{"type":"string","nullable":true,"description":"Last update about the core","key$":"last_update"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"},"serial":{"type":"string","description":"Core serial number","key$":"serial"},"status":{"type":"string","description":"Core status (active, inactive, unknown, expended, lost, retired)","key$":"status"}},"x-ref":"#/components/schemas/Core","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /cores/{id}":{"protocol":"http","operationId":"getOneCore","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Core serial number","key$":"id"},"block":{"type":"integer","nullable":true,"description":"Core block number","key$":"block"},"reuse_count":{"type":"integer","description":"Number of times core has been reused","key$":"reuse_count"},"rtls_attempts":{"type":"integer","description":"Number of return to launch site attempts","key$":"rtls_attempts"},"rtls_landings":{"type":"integer","description":"Number of successful RTLS landings","key$":"rtls_landings"},"asds_attempts":{"type":"integer","description":"Number of autonomous spaceport drone ship landing attempts","key$":"asds_attempts"},"asds_landings":{"type":"integer","description":"Number of successful ASDS landings","key$":"asds_landings"},"last_update":{"type":"string","nullable":true,"description":"Last update about the core","key$":"last_update"},"launches":{"type":"array","items":{"type":"string"},"description":"Launch IDs","key$":"launches"},"serial":{"type":"string","description":"Core serial number","key$":"serial"},"status":{"type":"string","description":"Core status (active, inactive, unknown, expended, lost, retired)","key$":"status"}},"x-ref":"#/components/schemas/Core","index$":0}}}},"404":{"description":"Core not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Core ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
