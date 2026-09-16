

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


describe('LaunchpadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Launchpad()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'launchpad.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"details","req":false,"short":"Launchpad details","type":"`$STRING`","index$":0},{"active":true,"name":"full_name","req":false,"short":"Full launchpad name","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Launchpad ID","type":"`$STRING`","index$":2},{"active":true,"name":"latitude","req":false,"short":"Latitude","type":"`$NUMBER`","index$":3},{"active":true,"name":"launch_attempts","req":false,"short":"Number of launch attempts","type":"`$INTEGER`","index$":4},{"active":true,"name":"launch_successes","req":false,"short":"Number of successful launches","type":"`$INTEGER`","index$":5},{"active":true,"name":"launches","req":false,"short":"Launch IDs","type":"`$ARRAY`","index$":6},{"active":true,"name":"locality","req":false,"short":"Locality","type":"`$STRING`","index$":7},{"active":true,"name":"longitude","req":false,"short":"Longitude","type":"`$NUMBER`","index$":8},{"active":true,"name":"name","req":false,"short":"Launchpad name","type":"`$STRING`","index$":9},{"active":true,"name":"region","req":false,"short":"Region","type":"`$STRING`","index$":10},{"active":true,"name":"rockets","req":false,"short":"Rocket IDs","type":"`$ARRAY`","index$":11},{"active":true,"name":"status","req":false,"short":"Launchpad status (active, inactive, unknown, retired, lost, under construction)","type":"`$STRING`","index$":12}],"id":{"field":"id","name":"id"},"name":"launchpad","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /launchpads","json":"{\"operationId\":\"getAllLaunchpads\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"details\":{\"description\":\"Launchpad details\",\"type\":\"string\"},\"full_name\":{\"description\":\"Full launchpad name\",\"type\":\"string\"},\"id\":{\"description\":\"Launchpad ID\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude\",\"type\":\"number\"},\"launch_attempts\":{\"description\":\"Number of launch attempts\",\"type\":\"integer\"},\"launch_successes\":{\"description\":\"Number of successful launches\",\"type\":\"integer\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"locality\":{\"description\":\"Locality\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Launchpad name\",\"type\":\"string\"},\"region\":{\"description\":\"Region\",\"type\":\"string\"},\"rockets\":{\"description\":\"Rocket IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"description\":\"Launchpad status (active, inactive, unknown, retired, lost, under construction)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/launchpads","segments":[{"lit":"launchpads"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /launchpads/{id}","json":"{\"operationId\":\"getOneLaunchpad\",\"parameters\":[{\"description\":\"Launchpad ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"details\":{\"description\":\"Launchpad details\",\"type\":\"string\"},\"full_name\":{\"description\":\"Full launchpad name\",\"type\":\"string\"},\"id\":{\"description\":\"Launchpad ID\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude\",\"type\":\"number\"},\"launch_attempts\":{\"description\":\"Number of launch attempts\",\"type\":\"integer\"},\"launch_successes\":{\"description\":\"Number of successful launches\",\"type\":\"integer\"},\"launches\":{\"description\":\"Launch IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"locality\":{\"description\":\"Locality\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude\",\"type\":\"number\"},\"name\":{\"description\":\"Launchpad name\",\"type\":\"string\"},\"region\":{\"description\":\"Region\",\"type\":\"string\"},\"rockets\":{\"description\":\"Rocket IDs\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"description\":\"Launchpad status (active, inactive, unknown, retired, lost, under construction)\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Launchpad not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/launchpads/{id}","segments":[{"lit":"launchpads"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"launchpad","name__orig":"launchpad","Name":"Launchpad","name_":"launchpad","name-":"launchpad","NAME":"LAUNCHPAD","index$":5}, {"active":true,"entity":"launchpad","key$":"BasicLaunchpadFlow","kind":"basic","name":"BasicLaunchpadFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"launchpad_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"launchpad_ref01","srcdatavar":"launchpad_ref01_data","suffix":"_dt0"},"match":{"id":"launchpad01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-launchpad_ref01"}}],"index$":1}]}, 'Launchpad')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launchpad_ref01_data = Object.values(setup.data.existing.launchpad)[0] as any

    // LIST
    const launchpad_ref01_ent = client.Launchpad()
    const launchpad_ref01_match: any = {}

    const launchpad_ref01_list = (await launchpad_ref01_ent.list(launchpad_ref01_match)).map((e: any) => e.data())


    // LOAD
    const launchpad_ref01_match_dt0: any = {}
    launchpad_ref01_match_dt0.id = launchpad_ref01_data.id
    const launchpad_ref01_data_dt0 = (await launchpad_ref01_ent.load(launchpad_ref01_match_dt0)).data()
    assert(launchpad_ref01_data_dt0.id === launchpad_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launchpad/LaunchpadTestData.json')

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
    ['launchpad01','launchpad02','launchpad03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_LAUNCHPAD_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_LAUNCHPAD_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_LAUNCHPAD_ENTID']
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
  
