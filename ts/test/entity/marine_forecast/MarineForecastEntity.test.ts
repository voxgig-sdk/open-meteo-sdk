

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenMeteoSDK, BaseFeature, stdutil } from '../../..'

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


describe('MarineForecastEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_METEO_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_METEO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenMeteoSDK.test()
    const ent = testsdk.MarineForecast()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_METEO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'marine_forecast.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"daily":{"a":true,"h":"Daily","n":"daily","r":false,"t":"`$OBJECT`","key$":"daily","index$":0},"daily_units":{"a":true,"h":"Daily Units","n":"daily_units","r":false,"t":"`$OBJECT`","key$":"daily_units","index$":1},"generationtime_ms":{"a":true,"fo":"float","h":"Generationtime Ms","n":"generationtime_ms","r":false,"t":"`$NUMBER`","key$":"generationtime_ms","index$":2},"hourly":{"a":true,"h":"Hourly","n":"hourly","r":false,"t":"`$OBJECT`","key$":"hourly","index$":3},"hourly_units":{"a":true,"h":"Hourly Units","n":"hourly_units","r":false,"t":"`$OBJECT`","key$":"hourly_units","index$":4},"latitude":{"a":true,"fo":"float","h":"Latitude","n":"latitude","r":false,"t":"`$NUMBER`","key$":"latitude","index$":5},"longitude":{"a":true,"fo":"float","h":"Longitude","n":"longitude","r":false,"t":"`$NUMBER`","key$":"longitude","index$":6},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":false,"t":"`$STRING`","key$":"timezone","index$":7},"timezone_abbreviation":{"a":true,"h":"Timezone Abbreviation","n":"timezone_abbreviation","r":false,"t":"`$STRING`","key$":"timezone_abbreviation","index$":8},"utc_offset_seconds":{"a":true,"h":"Utc Offset Seconds","n":"utc_offset_seconds","r":false,"t":"`$INTEGER`","key$":"utc_offset_seconds","index$":9}},"name":"marine_forecast","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/marine-weather","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"daily","or":"daily","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"ex":7,"k":"query","n":"forecast_day","or":"forecast_day","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"hourly","or":"hourly","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"k":"query","n":"latitude","or":"latitude","r":true,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"longitude","or":"longitude","r":true,"t":"`$NUMBER`","index$":4},{"a":true,"ex":0,"k":"query","n":"past_day","or":"past_day","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":"iso8601","k":"query","n":"timeformat","or":"timeformat","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"GMT","k":"query","n":"timezone","or":"timezone","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/v1/marine-weather","q":{"exist":["daily","forecast_day","hourly","latitude","longitude","past_day","timeformat","timezone"]},"r":{},"s":[{"lit":"v1"},{"lit":"marine-weather"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"marine_forecast","name__orig":"marine_forecast","Name":"MarineForecast","name_":"marine_forecast","name-":"marine-forecast","NAME":"MARINE_FORECAST","index$":1}, {"active":true,"entity":"marine_forecast","key$":"BasicMarineForecastFlow","kind":"basic","name":"BasicMarineForecastFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"marine_forecast_ref01","srcdatavar":"marine_forecast_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-marine_forecast_ref01"}}],"index$":0}]}, 'MarineForecast', {"GET /v1/marine-weather":{"protocol":"http","operationId":"getMarineForecast","responses":{"200":{"description":"Successful marine forecast response","content":{"application/json":{"schema":{"type":"object","properties":{"latitude":{"format":"float","key$":"latitude","type":"number"},"longitude":{"format":"float","key$":"longitude","type":"number"},"generationtime_ms":{"format":"float","key$":"generationtime_ms","type":"number"},"utc_offset_seconds":{"key$":"utc_offset_seconds","type":"integer"},"timezone":{"key$":"timezone","type":"string"},"timezone_abbreviation":{"key$":"timezone_abbreviation","type":"string"},"hourly":{"additionalProperties":{"items":{"type":"number"},"type":"array"},"key$":"hourly","properties":{"time":{"items":{"type":"string"},"type":"array"}},"type":"object"},"hourly_units":{"additionalProperties":{"type":"string"},"key$":"hourly_units","type":"object"},"daily":{"additionalProperties":{"items":{},"type":"array"},"key$":"daily","properties":{"time":{"items":{"type":"string"},"type":"array"}},"type":"object"},"daily_units":{"additionalProperties":{"type":"string"},"key$":"daily_units","type":"object"}},"x-ref":"#/components/schemas/MarineForecastResponse","index$":0}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"boolean","example":true},"reason":{"type":"string","description":"Description of the error"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"latitude","in":"query","description":"Geographical WGS84 latitude of the location","required":true,"schema":{"type":"number","format":"float"},"index$":0},{"name":"longitude","in":"query","description":"Geographical WGS84 longitude of the location","required":true,"schema":{"type":"number","format":"float"},"index$":1},{"name":"hourly","in":"query","description":"A list of marine weather variables. Available variables include: wave_height, wave_direction, wave_period, wind_wave_height, wind_wave_direction, wind_wave_period, wind_wave_peak_period, swell_wave_height, swell_wave_direction, swell_wave_period, swell_wave_peak_period, ocean_current_velocity, ocean_current_direction.","required":false,"schema":{"type":"array","items":{"type":"string"}},"style":"form","explode":false,"index$":2},{"name":"daily","in":"query","description":"A list of daily marine weather variable aggregations","required":false,"schema":{"type":"array","items":{"type":"string"}},"style":"form","explode":false,"index$":3},{"name":"timezone","in":"query","description":"Timezone for timestamps","required":false,"schema":{"type":"string","default":"GMT"},"index$":4},{"name":"timeformat","in":"query","description":"Time format","required":false,"schema":{"type":"string","enum":["iso8601","unixtime"],"default":"iso8601"},"index$":5},{"name":"forecast_days","in":"query","description":"Number of forecast days","required":false,"schema":{"type":"integer","minimum":0,"maximum":16,"default":7},"index$":6},{"name":"past_days","in":"query","description":"Number of past days to include","required":false,"schema":{"type":"integer","minimum":0,"maximum":92,"default":0},"index$":7}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"apikey","description":"API key for commercial use. Non-commercial use does not require an API key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let marine_forecast_ref01_data = Object.values(setup.data.existing.marine_forecast)[0] as any

    // LOAD
    const marine_forecast_ref01_ent = client.MarineForecast()
    const marine_forecast_ref01_match_dt0: any = {}
    const marine_forecast_ref01_data_dt0 = (await marine_forecast_ref01_ent.load(marine_forecast_ref01_match_dt0)).data()
    assert(null != marine_forecast_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/marine_forecast/MarineForecastTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenMeteoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['marine_forecast01','marine_forecast02','marine_forecast03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_METEO_TEST_MARINE_FORECAST_ENTID': idmap,
    'OPEN_METEO_TEST_LIVE': 'FALSE',
    'OPEN_METEO_TEST_EXPLAIN': 'FALSE',
    'OPEN_METEO_APIKEY': '',
  })

  idmap = env['OPEN_METEO_TEST_MARINE_FORECAST_ENTID']

  const live = 'TRUE' === env.OPEN_METEO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_METEO_TEST_MARINE_FORECAST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenMeteoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.OPEN_METEO_APIKEY,
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
    explain: 'TRUE' === env.OPEN_METEO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
