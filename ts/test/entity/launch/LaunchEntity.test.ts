

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


describe('LaunchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEX_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpacexRestSDK.test()
    const ent = testsdk.Launch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'launch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auto_update":{"a":true,"h":"Auto Update","n":"auto_update","r":false,"sh":"Whether the launch data is automatically updated","t":"`$BOOLEAN`","key$":"auto_update","index$":0},"capsules":{"a":true,"h":"Capsules","n":"capsules","r":false,"sh":"Capsule IDs","t":"`$ARRAY`","key$":"capsules","index$":1},"cores":{"a":true,"h":"Cores","n":"cores","r":false,"t":"`$ARRAY`","key$":"cores","index$":2},"crew":{"a":true,"h":"Crew","n":"crew","r":false,"sh":"Crew member IDs","t":"`$ARRAY`","key$":"crew","index$":3},"date_local":{"a":true,"fo":"date-time","h":"Date Local","n":"date_local","r":false,"sh":"Launch date in local time","t":"`$STRING`","key$":"date_local","index$":4},"date_precision":{"a":true,"h":"Date Precision","n":"date_precision","r":false,"sh":"Date precision (hour, day, month, quarter, half, year)","t":"`$STRING`","key$":"date_precision","index$":5},"date_unix":{"a":true,"h":"Date Unix","n":"date_unix","r":false,"sh":"Launch date in unix timestamp","t":"`$INTEGER`","key$":"date_unix","index$":6},"date_utc":{"a":true,"fo":"date-time","h":"Date Utc","n":"date_utc","r":false,"sh":"Launch date in UTC","t":"`$STRING`","key$":"date_utc","index$":7},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Launch details","t":"`$STRING`","key$":"details","index$":8},"failures":{"a":true,"h":"Failures","n":"failures","r":false,"sh":"Launch failures","t":"`$ARRAY`","key$":"failures","index$":9},"fairings":{"a":true,"h":"Fairings","n":"fairings","r":false,"t":"`$OBJECT`","key$":"fairings","index$":10},"flight_number":{"a":true,"h":"Flight Number","n":"flight_number","r":false,"sh":"Flight number","t":"`$INTEGER`","key$":"flight_number","index$":11},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Launch ID","t":"`$STRING`","key$":"id","index$":12},"launchpad":{"a":true,"h":"Launchpad","n":"launchpad","r":false,"sh":"Launchpad ID","t":"`$STRING`","key$":"launchpad","index$":13},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$OBJECT`","key$":"links","index$":14},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Launch name","t":"`$STRING`","key$":"name","index$":15},"net":{"a":true,"h":"Net","n":"net","r":false,"sh":"No earlier than","t":"`$BOOLEAN`","key$":"net","index$":16},"payloads":{"a":true,"h":"Payloads","n":"payloads","r":false,"sh":"Payload IDs","t":"`$ARRAY`","key$":"payloads","index$":17},"rocket":{"a":true,"h":"Rocket","n":"rocket","r":false,"sh":"Rocket ID","t":"`$STRING`","key$":"rocket","index$":18},"ships":{"a":true,"h":"Ships","n":"ships","r":false,"sh":"Ship IDs","t":"`$ARRAY`","key$":"ships","index$":19},"static_fire_date_unix":{"a":true,"h":"Static Fire Date Unix","n":"static_fire_date_unix","r":false,"sh":"Static fire date in unix timestamp","t":"`$INTEGER`","key$":"static_fire_date_unix","index$":20},"static_fire_date_utc":{"a":true,"fo":"date-time","h":"Static Fire Date Utc","n":"static_fire_date_utc","r":false,"sh":"Static fire date in UTC","t":"`$STRING`","key$":"static_fire_date_utc","index$":21},"success":{"a":true,"h":"Success","n":"success","r":false,"sh":"Launch success status","t":"`$BOOLEAN`","key$":"success","index$":22},"tdb":{"a":true,"h":"Tdb","n":"tdb","r":false,"sh":"To be determined","t":"`$BOOLEAN`","key$":"tdb","index$":23},"upcoming":{"a":true,"h":"Upcoming","n":"upcoming","r":false,"sh":"Whether the launch is upcoming","t":"`$BOOLEAN`","key$":"upcoming","index$":24},"window":{"a":true,"h":"Window","n":"window","r":false,"sh":"Launch window in seconds","t":"`$INTEGER`","key$":"window","index$":25}},"id":{"field":"id","name":"id"},"name":"launch","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /launches","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/launches","q":{},"r":{},"s":[{"lit":"launches"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /launches/latest","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/launches/latest","q":{"$action":"latest"},"r":{},"s":[{"lit":"launches"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /launches/past","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/launches/past","q":{"$action":"past"},"r":{},"s":[{"lit":"launches"},{"lit":"past"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /launches/upcoming","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/launches/upcoming","q":{"$action":"upcoming"},"r":{},"s":[{"lit":"launches"},{"lit":"upcoming"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /launches/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/launches/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"launches"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"launch","name__orig":"launch","Name":"Launch","name_":"launch","name-":"launch","NAME":"LAUNCH","index$":4}, {"active":true,"entity":"launch","key$":"BasicLaunchFlow","kind":"basic","name":"BasicLaunchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"launch_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"launch_ref01","srcdatavar":"launch_ref01_data","suffix":"_dt0"},"m":{"id":"launch01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-launch_ref01"}}],"index$":1}]}, 'Launch', {"GET /launches":{"protocol":"http","operationId":"getAllLaunches","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"description":"Launch ID","key$":"id","type":"string"},"flight_number":{"description":"Flight number","key$":"flight_number","type":"integer"},"name":{"description":"Launch name","key$":"name","type":"string"},"date_utc":{"description":"Launch date in UTC","format":"date-time","key$":"date_utc","type":"string"},"date_unix":{"description":"Launch date in unix timestamp","key$":"date_unix","type":"integer"},"date_local":{"description":"Launch date in local time","format":"date-time","key$":"date_local","type":"string"},"date_precision":{"description":"Date precision (hour, day, month, quarter, half, year)","key$":"date_precision","type":"string"},"static_fire_date_utc":{"description":"Static fire date in UTC","format":"date-time","key$":"static_fire_date_utc","nullable":true,"type":"string"},"static_fire_date_unix":{"description":"Static fire date in unix timestamp","key$":"static_fire_date_unix","nullable":true,"type":"integer"},"tdb":{"description":"To be determined","key$":"tdb","type":"boolean"},"net":{"description":"No earlier than","key$":"net","type":"boolean"},"window":{"description":"Launch window in seconds","key$":"window","type":"integer"},"rocket":{"description":"Rocket ID","key$":"rocket","type":"string"},"success":{"description":"Launch success status","key$":"success","nullable":true,"type":"boolean"},"failures":{"description":"Launch failures","items":{"type":"object"},"key$":"failures","type":"array"},"upcoming":{"description":"Whether the launch is upcoming","key$":"upcoming","type":"boolean"},"details":{"description":"Launch details","key$":"details","nullable":true,"type":"string"},"fairings":{"key$":"fairings","nullable":true,"properties":{"recovered":{"type":"boolean"},"recovery_attempt":{"type":"boolean"},"reused":{"type":"boolean"},"ships":{"items":{"type":"string"},"type":"array"}},"type":"object"},"crew":{"description":"Crew member IDs","items":{"type":"string"},"key$":"crew","type":"array"},"ships":{"description":"Ship IDs","items":{"type":"string"},"key$":"ships","type":"array"},"capsules":{"description":"Capsule IDs","items":{"type":"string"},"key$":"capsules","type":"array"},"payloads":{"description":"Payload IDs","items":{"type":"string"},"key$":"payloads","type":"array"},"launchpad":{"description":"Launchpad ID","key$":"launchpad","type":"string"},"cores":{"items":{"properties":{"core":{"description":"Core ID","type":"string"},"flight":{"description":"Core flight number","type":"integer"},"gridfins":{"description":"Whether core has grid fins","type":"boolean"},"landing_attempt":{"description":"Whether landing was attempted","type":"boolean"},"landing_success":{"description":"Whether landing was successful","nullable":true,"type":"boolean"},"landing_type":{"description":"Landing type (ASDS, RTLS, Ocean)","nullable":true,"type":"string"},"landpad":{"description":"Landing pad ID","nullable":true,"type":"string"},"legs":{"description":"Whether core has legs","type":"boolean"},"reused":{"description":"Whether core was reused","type":"boolean"}},"type":"object"},"key$":"cores","type":"array"},"links":{"key$":"links","properties":{"article":{"nullable":true,"type":"string"},"flickr":{"properties":{"original":{"items":{"type":"string"},"type":"array"},"small":{"items":{"type":"string"},"type":"array"}},"type":"object"},"patch":{"properties":{"large":{"nullable":true,"type":"string"},"small":{"nullable":true,"type":"string"}},"type":"object"},"presskit":{"nullable":true,"type":"string"},"reddit":{"properties":{"campaign":{"nullable":true,"type":"string"},"launch":{"nullable":true,"type":"string"},"media":{"nullable":true,"type":"string"},"recovery":{"nullable":true,"type":"string"}},"type":"object"},"webcast":{"nullable":true,"type":"string"},"wikipedia":{"nullable":true,"type":"string"},"youtube_id":{"nullable":true,"type":"string"}},"type":"object"},"auto_update":{"description":"Whether the launch data is automatically updated","key$":"auto_update","type":"boolean"}},"x-ref":"#/components/schemas/Launch","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /launches/latest":{"protocol":"http","operationId":"getLatestLaunch","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Launch ID","key$":"id","type":"string"},"flight_number":{"description":"Flight number","key$":"flight_number","type":"integer"},"name":{"description":"Launch name","key$":"name","type":"string"},"date_utc":{"description":"Launch date in UTC","format":"date-time","key$":"date_utc","type":"string"},"date_unix":{"description":"Launch date in unix timestamp","key$":"date_unix","type":"integer"},"date_local":{"description":"Launch date in local time","format":"date-time","key$":"date_local","type":"string"},"date_precision":{"description":"Date precision (hour, day, month, quarter, half, year)","key$":"date_precision","type":"string"},"static_fire_date_utc":{"description":"Static fire date in UTC","format":"date-time","key$":"static_fire_date_utc","nullable":true,"type":"string"},"static_fire_date_unix":{"description":"Static fire date in unix timestamp","key$":"static_fire_date_unix","nullable":true,"type":"integer"},"tdb":{"description":"To be determined","key$":"tdb","type":"boolean"},"net":{"description":"No earlier than","key$":"net","type":"boolean"},"window":{"description":"Launch window in seconds","key$":"window","type":"integer"},"rocket":{"description":"Rocket ID","key$":"rocket","type":"string"},"success":{"description":"Launch success status","key$":"success","nullable":true,"type":"boolean"},"failures":{"description":"Launch failures","items":{"type":"object"},"key$":"failures","type":"array"},"upcoming":{"description":"Whether the launch is upcoming","key$":"upcoming","type":"boolean"},"details":{"description":"Launch details","key$":"details","nullable":true,"type":"string"},"fairings":{"key$":"fairings","nullable":true,"properties":{"recovered":{"type":"boolean"},"recovery_attempt":{"type":"boolean"},"reused":{"type":"boolean"},"ships":{"items":{"type":"string"},"type":"array"}},"type":"object"},"crew":{"description":"Crew member IDs","items":{"type":"string"},"key$":"crew","type":"array"},"ships":{"description":"Ship IDs","items":{"type":"string"},"key$":"ships","type":"array"},"capsules":{"description":"Capsule IDs","items":{"type":"string"},"key$":"capsules","type":"array"},"payloads":{"description":"Payload IDs","items":{"type":"string"},"key$":"payloads","type":"array"},"launchpad":{"description":"Launchpad ID","key$":"launchpad","type":"string"},"cores":{"items":{"properties":{"core":{"description":"Core ID","type":"string"},"flight":{"description":"Core flight number","type":"integer"},"gridfins":{"description":"Whether core has grid fins","type":"boolean"},"landing_attempt":{"description":"Whether landing was attempted","type":"boolean"},"landing_success":{"description":"Whether landing was successful","nullable":true,"type":"boolean"},"landing_type":{"description":"Landing type (ASDS, RTLS, Ocean)","nullable":true,"type":"string"},"landpad":{"description":"Landing pad ID","nullable":true,"type":"string"},"legs":{"description":"Whether core has legs","type":"boolean"},"reused":{"description":"Whether core was reused","type":"boolean"}},"type":"object"},"key$":"cores","type":"array"},"links":{"key$":"links","properties":{"article":{"nullable":true,"type":"string"},"flickr":{"properties":{"original":{"items":{"type":"string"},"type":"array"},"small":{"items":{"type":"string"},"type":"array"}},"type":"object"},"patch":{"properties":{"large":{"nullable":true,"type":"string"},"small":{"nullable":true,"type":"string"}},"type":"object"},"presskit":{"nullable":true,"type":"string"},"reddit":{"properties":{"campaign":{"nullable":true,"type":"string"},"launch":{"nullable":true,"type":"string"},"media":{"nullable":true,"type":"string"},"recovery":{"nullable":true,"type":"string"}},"type":"object"},"webcast":{"nullable":true,"type":"string"},"wikipedia":{"nullable":true,"type":"string"},"youtube_id":{"nullable":true,"type":"string"}},"type":"object"},"auto_update":{"description":"Whether the launch data is automatically updated","key$":"auto_update","type":"boolean"}},"x-ref":"#/components/schemas/Launch"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /launches/past":{"protocol":"http","operationId":"getPastLaunches","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"description":"Launch ID","key$":"id","type":"string"},"flight_number":{"description":"Flight number","key$":"flight_number","type":"integer"},"name":{"description":"Launch name","key$":"name","type":"string"},"date_utc":{"description":"Launch date in UTC","format":"date-time","key$":"date_utc","type":"string"},"date_unix":{"description":"Launch date in unix timestamp","key$":"date_unix","type":"integer"},"date_local":{"description":"Launch date in local time","format":"date-time","key$":"date_local","type":"string"},"date_precision":{"description":"Date precision (hour, day, month, quarter, half, year)","key$":"date_precision","type":"string"},"static_fire_date_utc":{"description":"Static fire date in UTC","format":"date-time","key$":"static_fire_date_utc","nullable":true,"type":"string"},"static_fire_date_unix":{"description":"Static fire date in unix timestamp","key$":"static_fire_date_unix","nullable":true,"type":"integer"},"tdb":{"description":"To be determined","key$":"tdb","type":"boolean"},"net":{"description":"No earlier than","key$":"net","type":"boolean"},"window":{"description":"Launch window in seconds","key$":"window","type":"integer"},"rocket":{"description":"Rocket ID","key$":"rocket","type":"string"},"success":{"description":"Launch success status","key$":"success","nullable":true,"type":"boolean"},"failures":{"description":"Launch failures","items":{"type":"object"},"key$":"failures","type":"array"},"upcoming":{"description":"Whether the launch is upcoming","key$":"upcoming","type":"boolean"},"details":{"description":"Launch details","key$":"details","nullable":true,"type":"string"},"fairings":{"key$":"fairings","nullable":true,"properties":{"recovered":{"type":"boolean"},"recovery_attempt":{"type":"boolean"},"reused":{"type":"boolean"},"ships":{"items":{"type":"string"},"type":"array"}},"type":"object"},"crew":{"description":"Crew member IDs","items":{"type":"string"},"key$":"crew","type":"array"},"ships":{"description":"Ship IDs","items":{"type":"string"},"key$":"ships","type":"array"},"capsules":{"description":"Capsule IDs","items":{"type":"string"},"key$":"capsules","type":"array"},"payloads":{"description":"Payload IDs","items":{"type":"string"},"key$":"payloads","type":"array"},"launchpad":{"description":"Launchpad ID","key$":"launchpad","type":"string"},"cores":{"items":{"properties":{"core":{"description":"Core ID","type":"string"},"flight":{"description":"Core flight number","type":"integer"},"gridfins":{"description":"Whether core has grid fins","type":"boolean"},"landing_attempt":{"description":"Whether landing was attempted","type":"boolean"},"landing_success":{"description":"Whether landing was successful","nullable":true,"type":"boolean"},"landing_type":{"description":"Landing type (ASDS, RTLS, Ocean)","nullable":true,"type":"string"},"landpad":{"description":"Landing pad ID","nullable":true,"type":"string"},"legs":{"description":"Whether core has legs","type":"boolean"},"reused":{"description":"Whether core was reused","type":"boolean"}},"type":"object"},"key$":"cores","type":"array"},"links":{"key$":"links","properties":{"article":{"nullable":true,"type":"string"},"flickr":{"properties":{"original":{"items":{"type":"string"},"type":"array"},"small":{"items":{"type":"string"},"type":"array"}},"type":"object"},"patch":{"properties":{"large":{"nullable":true,"type":"string"},"small":{"nullable":true,"type":"string"}},"type":"object"},"presskit":{"nullable":true,"type":"string"},"reddit":{"properties":{"campaign":{"nullable":true,"type":"string"},"launch":{"nullable":true,"type":"string"},"media":{"nullable":true,"type":"string"},"recovery":{"nullable":true,"type":"string"}},"type":"object"},"webcast":{"nullable":true,"type":"string"},"wikipedia":{"nullable":true,"type":"string"},"youtube_id":{"nullable":true,"type":"string"}},"type":"object"},"auto_update":{"description":"Whether the launch data is automatically updated","key$":"auto_update","type":"boolean"}},"x-ref":"#/components/schemas/Launch","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /launches/upcoming":{"protocol":"http","operationId":"getUpcomingLaunches","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"description":"Launch ID","key$":"id","type":"string"},"flight_number":{"description":"Flight number","key$":"flight_number","type":"integer"},"name":{"description":"Launch name","key$":"name","type":"string"},"date_utc":{"description":"Launch date in UTC","format":"date-time","key$":"date_utc","type":"string"},"date_unix":{"description":"Launch date in unix timestamp","key$":"date_unix","type":"integer"},"date_local":{"description":"Launch date in local time","format":"date-time","key$":"date_local","type":"string"},"date_precision":{"description":"Date precision (hour, day, month, quarter, half, year)","key$":"date_precision","type":"string"},"static_fire_date_utc":{"description":"Static fire date in UTC","format":"date-time","key$":"static_fire_date_utc","nullable":true,"type":"string"},"static_fire_date_unix":{"description":"Static fire date in unix timestamp","key$":"static_fire_date_unix","nullable":true,"type":"integer"},"tdb":{"description":"To be determined","key$":"tdb","type":"boolean"},"net":{"description":"No earlier than","key$":"net","type":"boolean"},"window":{"description":"Launch window in seconds","key$":"window","type":"integer"},"rocket":{"description":"Rocket ID","key$":"rocket","type":"string"},"success":{"description":"Launch success status","key$":"success","nullable":true,"type":"boolean"},"failures":{"description":"Launch failures","items":{"type":"object"},"key$":"failures","type":"array"},"upcoming":{"description":"Whether the launch is upcoming","key$":"upcoming","type":"boolean"},"details":{"description":"Launch details","key$":"details","nullable":true,"type":"string"},"fairings":{"key$":"fairings","nullable":true,"properties":{"recovered":{"type":"boolean"},"recovery_attempt":{"type":"boolean"},"reused":{"type":"boolean"},"ships":{"items":{"type":"string"},"type":"array"}},"type":"object"},"crew":{"description":"Crew member IDs","items":{"type":"string"},"key$":"crew","type":"array"},"ships":{"description":"Ship IDs","items":{"type":"string"},"key$":"ships","type":"array"},"capsules":{"description":"Capsule IDs","items":{"type":"string"},"key$":"capsules","type":"array"},"payloads":{"description":"Payload IDs","items":{"type":"string"},"key$":"payloads","type":"array"},"launchpad":{"description":"Launchpad ID","key$":"launchpad","type":"string"},"cores":{"items":{"properties":{"core":{"description":"Core ID","type":"string"},"flight":{"description":"Core flight number","type":"integer"},"gridfins":{"description":"Whether core has grid fins","type":"boolean"},"landing_attempt":{"description":"Whether landing was attempted","type":"boolean"},"landing_success":{"description":"Whether landing was successful","nullable":true,"type":"boolean"},"landing_type":{"description":"Landing type (ASDS, RTLS, Ocean)","nullable":true,"type":"string"},"landpad":{"description":"Landing pad ID","nullable":true,"type":"string"},"legs":{"description":"Whether core has legs","type":"boolean"},"reused":{"description":"Whether core was reused","type":"boolean"}},"type":"object"},"key$":"cores","type":"array"},"links":{"key$":"links","properties":{"article":{"nullable":true,"type":"string"},"flickr":{"properties":{"original":{"items":{"type":"string"},"type":"array"},"small":{"items":{"type":"string"},"type":"array"}},"type":"object"},"patch":{"properties":{"large":{"nullable":true,"type":"string"},"small":{"nullable":true,"type":"string"}},"type":"object"},"presskit":{"nullable":true,"type":"string"},"reddit":{"properties":{"campaign":{"nullable":true,"type":"string"},"launch":{"nullable":true,"type":"string"},"media":{"nullable":true,"type":"string"},"recovery":{"nullable":true,"type":"string"}},"type":"object"},"webcast":{"nullable":true,"type":"string"},"wikipedia":{"nullable":true,"type":"string"},"youtube_id":{"nullable":true,"type":"string"}},"type":"object"},"auto_update":{"description":"Whether the launch data is automatically updated","key$":"auto_update","type":"boolean"}},"x-ref":"#/components/schemas/Launch","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /launches/{id}":{"protocol":"http","operationId":"getOneLaunch","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Launch ID","key$":"id","type":"string"},"flight_number":{"description":"Flight number","key$":"flight_number","type":"integer"},"name":{"description":"Launch name","key$":"name","type":"string"},"date_utc":{"description":"Launch date in UTC","format":"date-time","key$":"date_utc","type":"string"},"date_unix":{"description":"Launch date in unix timestamp","key$":"date_unix","type":"integer"},"date_local":{"description":"Launch date in local time","format":"date-time","key$":"date_local","type":"string"},"date_precision":{"description":"Date precision (hour, day, month, quarter, half, year)","key$":"date_precision","type":"string"},"static_fire_date_utc":{"description":"Static fire date in UTC","format":"date-time","key$":"static_fire_date_utc","nullable":true,"type":"string"},"static_fire_date_unix":{"description":"Static fire date in unix timestamp","key$":"static_fire_date_unix","nullable":true,"type":"integer"},"tdb":{"description":"To be determined","key$":"tdb","type":"boolean"},"net":{"description":"No earlier than","key$":"net","type":"boolean"},"window":{"description":"Launch window in seconds","key$":"window","type":"integer"},"rocket":{"description":"Rocket ID","key$":"rocket","type":"string"},"success":{"description":"Launch success status","key$":"success","nullable":true,"type":"boolean"},"failures":{"description":"Launch failures","items":{"type":"object"},"key$":"failures","type":"array"},"upcoming":{"description":"Whether the launch is upcoming","key$":"upcoming","type":"boolean"},"details":{"description":"Launch details","key$":"details","nullable":true,"type":"string"},"fairings":{"key$":"fairings","nullable":true,"properties":{"recovered":{"type":"boolean"},"recovery_attempt":{"type":"boolean"},"reused":{"type":"boolean"},"ships":{"items":{"type":"string"},"type":"array"}},"type":"object"},"crew":{"description":"Crew member IDs","items":{"type":"string"},"key$":"crew","type":"array"},"ships":{"description":"Ship IDs","items":{"type":"string"},"key$":"ships","type":"array"},"capsules":{"description":"Capsule IDs","items":{"type":"string"},"key$":"capsules","type":"array"},"payloads":{"description":"Payload IDs","items":{"type":"string"},"key$":"payloads","type":"array"},"launchpad":{"description":"Launchpad ID","key$":"launchpad","type":"string"},"cores":{"items":{"properties":{"core":{"description":"Core ID","type":"string"},"flight":{"description":"Core flight number","type":"integer"},"gridfins":{"description":"Whether core has grid fins","type":"boolean"},"landing_attempt":{"description":"Whether landing was attempted","type":"boolean"},"landing_success":{"description":"Whether landing was successful","nullable":true,"type":"boolean"},"landing_type":{"description":"Landing type (ASDS, RTLS, Ocean)","nullable":true,"type":"string"},"landpad":{"description":"Landing pad ID","nullable":true,"type":"string"},"legs":{"description":"Whether core has legs","type":"boolean"},"reused":{"description":"Whether core was reused","type":"boolean"}},"type":"object"},"key$":"cores","type":"array"},"links":{"key$":"links","properties":{"article":{"nullable":true,"type":"string"},"flickr":{"properties":{"original":{"items":{"type":"string"},"type":"array"},"small":{"items":{"type":"string"},"type":"array"}},"type":"object"},"patch":{"properties":{"large":{"nullable":true,"type":"string"},"small":{"nullable":true,"type":"string"}},"type":"object"},"presskit":{"nullable":true,"type":"string"},"reddit":{"properties":{"campaign":{"nullable":true,"type":"string"},"launch":{"nullable":true,"type":"string"},"media":{"nullable":true,"type":"string"},"recovery":{"nullable":true,"type":"string"}},"type":"object"},"webcast":{"nullable":true,"type":"string"},"wikipedia":{"nullable":true,"type":"string"},"youtube_id":{"nullable":true,"type":"string"}},"type":"object"},"auto_update":{"description":"Whether the launch data is automatically updated","key$":"auto_update","type":"boolean"}},"x-ref":"#/components/schemas/Launch","index$":0}}}},"404":{"description":"Launch not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Launch ID","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launch_ref01_data = Object.values(setup.data.existing.launch)[0] as any

    // LIST
    const launch_ref01_ent = client.Launch()
    const launch_ref01_match: any = {}

    const launch_ref01_list = (await launch_ref01_ent.list(launch_ref01_match)).map((e: any) => e.data())


    // LOAD
    const launch_ref01_match_dt0: any = {}
    launch_ref01_match_dt0.id = launch_ref01_data.id
    const launch_ref01_data_dt0 = (await launch_ref01_ent.load(launch_ref01_match_dt0)).data()
    assert(launch_ref01_data_dt0.id === launch_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launch/LaunchTestData.json')

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
    ['launch01','launch02','launch03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEX_REST_TEST_LAUNCH_ENTID': idmap,
    'SPACEX_REST_TEST_LIVE': 'FALSE',
    'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SPACEX_REST_TEST_LAUNCH_ENTID']

  const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEX_REST_TEST_LAUNCH_ENTID']
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
  
