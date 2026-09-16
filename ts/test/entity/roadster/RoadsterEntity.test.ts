

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


describe('RoadsterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Roadster()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'roadster.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"apoapsis_au","req":false,"short":"Apoapsis in AU","type":"`$NUMBER`","index$":0},{"active":true,"name":"details","req":false,"short":"Details","type":"`$STRING`","index$":1},{"active":true,"name":"earth_distance_km","req":false,"short":"Distance from Earth in km","type":"`$NUMBER`","index$":2},{"active":true,"name":"earth_distance_mi","req":false,"short":"Distance from Earth in miles","type":"`$NUMBER`","index$":3},{"active":true,"name":"eccentricity","req":false,"short":"Eccentricity","type":"`$NUMBER`","index$":4},{"active":true,"name":"epoch_jd","req":false,"short":"Epoch in Julian Date","type":"`$NUMBER`","index$":5},{"active":true,"name":"flickr_images","req":false,"short":"Flickr images","type":"`$ARRAY`","index$":6},{"active":true,"name":"id","req":false,"short":"Roadster ID","type":"`$STRING`","index$":7},{"active":true,"name":"inclination","req":false,"short":"Inclination","type":"`$NUMBER`","index$":8},{"active":true,"name":"launch_date_unix","req":false,"short":"Launch date in unix timestamp","type":"`$INTEGER`","index$":9},{"active":true,"format":"date-time","name":"launch_date_utc","req":false,"short":"Launch date in UTC","type":"`$STRING`","index$":10},{"active":true,"name":"launch_mass_kg","req":false,"short":"Launch mass in kilograms","type":"`$INTEGER`","index$":11},{"active":true,"name":"launch_mass_lbs","req":false,"short":"Launch mass in pounds","type":"`$INTEGER`","index$":12},{"active":true,"name":"longitude","req":false,"short":"Longitude","type":"`$NUMBER`","index$":13},{"active":true,"name":"mars_distance_km","req":false,"short":"Distance from Mars in km","type":"`$NUMBER`","index$":14},{"active":true,"name":"mars_distance_mi","req":false,"short":"Distance from Mars in miles","type":"`$NUMBER`","index$":15},{"active":true,"name":"name","req":false,"short":"Roadster name","type":"`$STRING`","index$":16},{"active":true,"name":"norad_id","req":false,"short":"NORAD ID","type":"`$INTEGER`","index$":17},{"active":true,"name":"orbit_type","req":false,"short":"Orbit type","type":"`$STRING`","index$":18},{"active":true,"name":"periapsis_arg","req":false,"short":"Argument of periapsis","type":"`$NUMBER`","index$":19},{"active":true,"name":"periapsis_au","req":false,"short":"Periapsis in AU","type":"`$NUMBER`","index$":20},{"active":true,"name":"period_days","req":false,"short":"Orbital period in days","type":"`$NUMBER`","index$":21},{"active":true,"name":"semi_major_axis_au","req":false,"short":"Semi-major axis in AU","type":"`$NUMBER`","index$":22},{"active":true,"name":"speed_kph","req":false,"short":"Speed in km/h","type":"`$NUMBER`","index$":23},{"active":true,"name":"speed_mph","req":false,"short":"Speed in mph","type":"`$NUMBER`","index$":24},{"active":true,"name":"video","req":false,"short":"Video URL","type":"`$STRING`","index$":25},{"active":true,"name":"wikipedia","req":false,"short":"Wikipedia URL","type":"`$STRING`","index$":26}],"id":{"field":"id","name":"id"},"name":"roadster","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /roadster","json":"{\"operationId\":\"getRoadster\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"apoapsis_au\":{\"description\":\"Apoapsis in AU\",\"type\":\"number\"},\"details\":{\"description\":\"Details\",\"type\":\"string\"},\"earth_distance_km\":{\"description\":\"Distance from Earth in km\",\"type\":\"number\"},\"earth_distance_mi\":{\"description\":\"Distance from Earth in miles\",\"type\":\"number\"},\"eccentricity\":{\"description\":\"Eccentricity\",\"type\":\"number\"},\"epoch_jd\":{\"description\":\"Epoch in Julian Date\",\"type\":\"number\"},\"flickr_images\":{\"description\":\"Flickr images\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Roadster ID\",\"type\":\"string\"},\"inclination\":{\"description\":\"Inclination\",\"type\":\"number\"},\"launch_date_unix\":{\"description\":\"Launch date in unix timestamp\",\"type\":\"integer\"},\"launch_date_utc\":{\"description\":\"Launch date in UTC\",\"format\":\"date-time\",\"type\":\"string\"},\"launch_mass_kg\":{\"description\":\"Launch mass in kilograms\",\"type\":\"integer\"},\"launch_mass_lbs\":{\"description\":\"Launch mass in pounds\",\"type\":\"integer\"},\"longitude\":{\"description\":\"Longitude\",\"type\":\"number\"},\"mars_distance_km\":{\"description\":\"Distance from Mars in km\",\"type\":\"number\"},\"mars_distance_mi\":{\"description\":\"Distance from Mars in miles\",\"type\":\"number\"},\"name\":{\"description\":\"Roadster name\",\"type\":\"string\"},\"norad_id\":{\"description\":\"NORAD ID\",\"type\":\"integer\"},\"orbit_type\":{\"description\":\"Orbit type\",\"type\":\"string\"},\"periapsis_arg\":{\"description\":\"Argument of periapsis\",\"type\":\"number\"},\"periapsis_au\":{\"description\":\"Periapsis in AU\",\"type\":\"number\"},\"period_days\":{\"description\":\"Orbital period in days\",\"type\":\"number\"},\"semi_major_axis_au\":{\"description\":\"Semi-major axis in AU\",\"type\":\"number\"},\"speed_kph\":{\"description\":\"Speed in km/h\",\"type\":\"number\"},\"speed_mph\":{\"description\":\"Speed in mph\",\"type\":\"number\"},\"video\":{\"description\":\"Video URL\",\"type\":\"string\"},\"wikipedia\":{\"description\":\"Wikipedia URL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/roadster","segments":[{"lit":"roadster"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.flickr_images`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"roadster","name__orig":"roadster","Name":"Roadster","name_":"roadster","name-":"roadster","NAME":"ROADSTER","index$":7}, {"active":true,"entity":"roadster","key$":"BasicRoadsterFlow","kind":"basic","name":"BasicRoadsterFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"roadster_ref01"}}],"index$":0}]}, 'Roadster')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let roadster_ref01_data = Object.values(setup.data.existing.roadster)[0] as any

    // LIST
    const roadster_ref01_ent = client.Roadster()
    const roadster_ref01_match: any = {}

    const roadster_ref01_list = (await roadster_ref01_ent.list(roadster_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/roadster/RoadsterTestData.json')

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
    ['roadster01','roadster02','roadster03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_ROADSTER_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_ROADSTER_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_ROADSTER_ENTID']
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
  
