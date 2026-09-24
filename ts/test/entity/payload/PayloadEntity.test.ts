

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


describe('PayloadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Payload()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'payload.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"apoapsis_km":{"a":true,"h":"Apoapsis Km","n":"apoapsis_km","r":false,"sh":"Apoapsis in km","t":"`$NUMBER`","key$":"apoapsis_km","index$":0},"arg_of_pericenter":{"a":true,"h":"Arg Of Pericenter","n":"arg_of_pericenter","r":false,"sh":"Argument of pericenter","t":"`$NUMBER`","key$":"arg_of_pericenter","index$":1},"customers":{"a":true,"h":"Customers","n":"customers","r":false,"sh":"Customers","t":"`$ARRAY`","key$":"customers","index$":2},"eccentricity":{"a":true,"h":"Eccentricity","n":"eccentricity","r":false,"sh":"Eccentricity","t":"`$NUMBER`","key$":"eccentricity","index$":3},"epoch":{"a":true,"h":"Epoch","n":"epoch","r":false,"sh":"Epoch","t":"`$STRING`","key$":"epoch","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Payload ID","t":"`$STRING`","key$":"id","index$":5},"inclination_deg":{"a":true,"h":"Inclination Deg","n":"inclination_deg","r":false,"sh":"Inclination in degrees","t":"`$NUMBER`","key$":"inclination_deg","index$":6},"launch":{"a":true,"h":"Launch","n":"launch","r":false,"sh":"Launch ID","t":"`$STRING`","key$":"launch","index$":7},"lifespan_years":{"a":true,"h":"Lifespan Years","n":"lifespan_years","r":false,"sh":"Lifespan in years","t":"`$NUMBER`","key$":"lifespan_years","index$":8},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude","t":"`$NUMBER`","key$":"longitude","index$":9},"manufacturers":{"a":true,"h":"Manufacturers","n":"manufacturers","r":false,"sh":"Manufacturers","t":"`$ARRAY`","key$":"manufacturers","index$":10},"mass_kg":{"a":true,"h":"Mass Kg","n":"mass_kg","r":false,"sh":"Payload mass in kilograms","t":"`$NUMBER`","key$":"mass_kg","index$":11},"mass_lbs":{"a":true,"h":"Mass Lbs","n":"mass_lbs","r":false,"sh":"Payload mass in pounds","t":"`$NUMBER`","key$":"mass_lbs","index$":12},"mean_anomaly":{"a":true,"h":"Mean Anomaly","n":"mean_anomaly","r":false,"sh":"Mean anomaly","t":"`$NUMBER`","key$":"mean_anomaly","index$":13},"mean_motion":{"a":true,"h":"Mean Motion","n":"mean_motion","r":false,"sh":"Mean motion","t":"`$NUMBER`","key$":"mean_motion","index$":14},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Payload name","t":"`$STRING`","key$":"name","index$":15},"nationalities":{"a":true,"h":"Nationalities","n":"nationalities","r":false,"sh":"Nationalities","t":"`$ARRAY`","key$":"nationalities","index$":16},"norad_ids":{"a":true,"h":"Norad Ids","n":"norad_ids","r":false,"sh":"NORAD IDs","t":"`$ARRAY`","key$":"norad_ids","index$":17},"orbit":{"a":true,"h":"Orbit","n":"orbit","r":false,"sh":"Orbit type","t":"`$STRING`","key$":"orbit","index$":18},"periapsis_km":{"a":true,"h":"Periapsis Km","n":"periapsis_km","r":false,"sh":"Periapsis in km","t":"`$NUMBER`","key$":"periapsis_km","index$":19},"period_min":{"a":true,"h":"Period Min","n":"period_min","r":false,"sh":"Orbital period in minutes","t":"`$NUMBER`","key$":"period_min","index$":20},"raan":{"a":true,"h":"Raan","n":"raan","r":false,"sh":"Right ascension of the ascending node","t":"`$NUMBER`","key$":"raan","index$":21},"reference_system":{"a":true,"h":"Reference System","n":"reference_system","r":false,"sh":"Reference system","t":"`$STRING`","key$":"reference_system","index$":22},"regime":{"a":true,"h":"Regime","n":"regime","r":false,"sh":"Orbit regime","t":"`$STRING`","key$":"regime","index$":23},"reused":{"a":true,"h":"Reused","n":"reused","r":false,"sh":"Whether the payload was reused","t":"`$BOOLEAN`","key$":"reused","index$":24},"semi_major_axis_km":{"a":true,"h":"Semi Major Axis Km","n":"semi_major_axis_km","r":false,"sh":"Semi-major axis in km","t":"`$NUMBER`","key$":"semi_major_axis_km","index$":25},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Payload type","t":"`$STRING`","key$":"type","index$":26}},"id":{"field":"id","name":"id"},"name":"payload","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /payloads","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/payloads","q":{},"r":{},"s":[{"lit":"payloads"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payloads/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payloads/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"payloads"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"payload","name__orig":"payload","Name":"Payload","name_":"payload","name-":"payload","NAME":"PAYLOAD","index$":6}, {"active":true,"entity":"payload","key$":"BasicPayloadFlow","kind":"basic","name":"BasicPayloadFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"payload_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"payload_ref01","srcdatavar":"payload_ref01_data","suffix":"_dt0"},"m":{"id":"payload01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-payload_ref01"}}],"index$":1}]}, 'Payload', {"GET /payloads":{"protocol":"http","operationId":"getAllPayloads","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Payload ID","key$":"id"},"name":{"type":"string","description":"Payload name","key$":"name"},"type":{"type":"string","description":"Payload type","key$":"type"},"reused":{"type":"boolean","description":"Whether the payload was reused","key$":"reused"},"launch":{"type":"string","description":"Launch ID","key$":"launch"},"customers":{"type":"array","items":{"type":"string"},"description":"Customers","key$":"customers"},"norad_ids":{"type":"array","items":{"type":"integer"},"description":"NORAD IDs","key$":"norad_ids"},"nationalities":{"type":"array","items":{"type":"string"},"description":"Nationalities","key$":"nationalities"},"manufacturers":{"type":"array","items":{"type":"string"},"description":"Manufacturers","key$":"manufacturers"},"mass_kg":{"type":"number","nullable":true,"description":"Payload mass in kilograms","key$":"mass_kg"},"mass_lbs":{"type":"number","nullable":true,"description":"Payload mass in pounds","key$":"mass_lbs"},"orbit":{"type":"string","description":"Orbit type","key$":"orbit"},"reference_system":{"type":"string","description":"Reference system","key$":"reference_system"},"regime":{"type":"string","description":"Orbit regime","key$":"regime"},"longitude":{"type":"number","nullable":true,"description":"Longitude","key$":"longitude"},"semi_major_axis_km":{"type":"number","nullable":true,"description":"Semi-major axis in km","key$":"semi_major_axis_km"},"eccentricity":{"type":"number","nullable":true,"description":"Eccentricity","key$":"eccentricity"},"periapsis_km":{"type":"number","nullable":true,"description":"Periapsis in km","key$":"periapsis_km"},"apoapsis_km":{"type":"number","nullable":true,"description":"Apoapsis in km","key$":"apoapsis_km"},"inclination_deg":{"type":"number","nullable":true,"description":"Inclination in degrees","key$":"inclination_deg"},"period_min":{"type":"number","nullable":true,"description":"Orbital period in minutes","key$":"period_min"},"lifespan_years":{"type":"number","nullable":true,"description":"Lifespan in years","key$":"lifespan_years"},"epoch":{"type":"string","nullable":true,"description":"Epoch","key$":"epoch"},"mean_motion":{"type":"number","nullable":true,"description":"Mean motion","key$":"mean_motion"},"raan":{"type":"number","nullable":true,"description":"Right ascension of the ascending node","key$":"raan"},"arg_of_pericenter":{"type":"number","nullable":true,"description":"Argument of pericenter","key$":"arg_of_pericenter"},"mean_anomaly":{"type":"number","nullable":true,"description":"Mean anomaly","key$":"mean_anomaly"}},"x-ref":"#/components/schemas/Payload","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /payloads/{id}":{"protocol":"http","operationId":"getOnePayload","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Payload ID","key$":"id"},"name":{"type":"string","description":"Payload name","key$":"name"},"type":{"type":"string","description":"Payload type","key$":"type"},"reused":{"type":"boolean","description":"Whether the payload was reused","key$":"reused"},"launch":{"type":"string","description":"Launch ID","key$":"launch"},"customers":{"type":"array","items":{"type":"string"},"description":"Customers","key$":"customers"},"norad_ids":{"type":"array","items":{"type":"integer"},"description":"NORAD IDs","key$":"norad_ids"},"nationalities":{"type":"array","items":{"type":"string"},"description":"Nationalities","key$":"nationalities"},"manufacturers":{"type":"array","items":{"type":"string"},"description":"Manufacturers","key$":"manufacturers"},"mass_kg":{"type":"number","nullable":true,"description":"Payload mass in kilograms","key$":"mass_kg"},"mass_lbs":{"type":"number","nullable":true,"description":"Payload mass in pounds","key$":"mass_lbs"},"orbit":{"type":"string","description":"Orbit type","key$":"orbit"},"reference_system":{"type":"string","description":"Reference system","key$":"reference_system"},"regime":{"type":"string","description":"Orbit regime","key$":"regime"},"longitude":{"type":"number","nullable":true,"description":"Longitude","key$":"longitude"},"semi_major_axis_km":{"type":"number","nullable":true,"description":"Semi-major axis in km","key$":"semi_major_axis_km"},"eccentricity":{"type":"number","nullable":true,"description":"Eccentricity","key$":"eccentricity"},"periapsis_km":{"type":"number","nullable":true,"description":"Periapsis in km","key$":"periapsis_km"},"apoapsis_km":{"type":"number","nullable":true,"description":"Apoapsis in km","key$":"apoapsis_km"},"inclination_deg":{"type":"number","nullable":true,"description":"Inclination in degrees","key$":"inclination_deg"},"period_min":{"type":"number","nullable":true,"description":"Orbital period in minutes","key$":"period_min"},"lifespan_years":{"type":"number","nullable":true,"description":"Lifespan in years","key$":"lifespan_years"},"epoch":{"type":"string","nullable":true,"description":"Epoch","key$":"epoch"},"mean_motion":{"type":"number","nullable":true,"description":"Mean motion","key$":"mean_motion"},"raan":{"type":"number","nullable":true,"description":"Right ascension of the ascending node","key$":"raan"},"arg_of_pericenter":{"type":"number","nullable":true,"description":"Argument of pericenter","key$":"arg_of_pericenter"},"mean_anomaly":{"type":"number","nullable":true,"description":"Mean anomaly","key$":"mean_anomaly"}},"x-ref":"#/components/schemas/Payload","index$":0}}}},"404":{"description":"Payload not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Payload ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let payload_ref01_data = Object.values(setup.data.existing.payload)[0] as any

    // LIST
    const payload_ref01_ent = client.Payload()
    const payload_ref01_match: any = {}

    const payload_ref01_list = (await payload_ref01_ent.list(payload_ref01_match)).map((e: any) => e.data())


    // LOAD
    const payload_ref01_match_dt0: any = {}
    payload_ref01_match_dt0.id = payload_ref01_data.id
    const payload_ref01_data_dt0 = (await payload_ref01_ent.load(payload_ref01_match_dt0)).data()
    assert(payload_ref01_data_dt0.id === payload_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/payload/PayloadTestData.json')

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
    ['payload01','payload02','payload03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_PAYLOAD_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_PAYLOAD_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_PAYLOAD_ENTID']
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
  
