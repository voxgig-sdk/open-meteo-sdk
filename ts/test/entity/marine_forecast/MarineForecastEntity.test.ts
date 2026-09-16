

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"daily","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"daily_units","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"format":"float","name":"generationtime_ms","req":false,"type":"`$NUMBER`","index$":2},{"active":true,"name":"hourly","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"hourly_units","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"format":"float","name":"latitude","req":false,"type":"`$NUMBER`","index$":5},{"active":true,"format":"float","name":"longitude","req":false,"type":"`$NUMBER`","index$":6},{"active":true,"name":"timezone","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"timezone_abbreviation","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"utc_offset_seconds","req":false,"type":"`$INTEGER`","index$":9}],"name":"marine_forecast","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"daily","orig":"daily","reqd":false,"type":"`$ARRAY`","index$":0},{"active":true,"example":7,"kind":"query","name":"forecast_day","orig":"forecast_day","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"hourly","orig":"hourly","reqd":false,"type":"`$ARRAY`","index$":2},{"active":true,"kind":"query","name":"latitude","orig":"latitude","reqd":true,"type":"`$NUMBER`","index$":3},{"active":true,"kind":"query","name":"longitude","orig":"longitude","reqd":true,"type":"`$NUMBER`","index$":4},{"active":true,"example":0,"kind":"query","name":"past_day","orig":"past_day","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"example":"iso8601","kind":"query","name":"timeformat","orig":"timeformat","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":"GMT","kind":"query","name":"timezone","orig":"timezone","reqd":false,"type":"`$STRING`","index$":7}]},"contract":{"id":"GET /v1/marine-weather","json":"{\"operationId\":\"getMarineForecast\",\"parameters\":[{\"description\":\"Geographical WGS84 latitude of the location\",\"in\":\"query\",\"name\":\"latitude\",\"required\":true,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Geographical WGS84 longitude of the location\",\"in\":\"query\",\"name\":\"longitude\",\"required\":true,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"A list of marine weather variables. Available variables include: wave_height, wave_direction, wave_period, wind_wave_height, wind_wave_direction, wind_wave_period, wind_wave_peak_period, swell_wave_height, swell_wave_direction, swell_wave_period, swell_wave_peak_period, ocean_current_velocity, ocean_current_direction.\",\"explode\":false,\"in\":\"query\",\"name\":\"hourly\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"A list of daily marine weather variable aggregations\",\"explode\":false,\"in\":\"query\",\"name\":\"daily\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Timezone for timestamps\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"GMT\",\"type\":\"string\"}},{\"description\":\"Time format\",\"in\":\"query\",\"name\":\"timeformat\",\"required\":false,\"schema\":{\"default\":\"iso8601\",\"enum\":[\"iso8601\",\"unixtime\"],\"type\":\"string\"}},{\"description\":\"Number of forecast days\",\"in\":\"query\",\"name\":\"forecast_days\",\"required\":false,\"schema\":{\"default\":7,\"maximum\":16,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Number of past days to include\",\"in\":\"query\",\"name\":\"past_days\",\"required\":false,\"schema\":{\"default\":0,\"maximum\":92,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"daily\":{\"additionalProperties\":{\"items\":{},\"type\":\"array\"},\"properties\":{\"time\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"daily_units\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"generationtime_ms\":{\"format\":\"float\",\"type\":\"number\"},\"hourly\":{\"additionalProperties\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"properties\":{\"time\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"hourly_units\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"latitude\":{\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"format\":\"float\",\"type\":\"number\"},\"timezone\":{\"type\":\"string\"},\"timezone_abbreviation\":{\"type\":\"string\"},\"utc_offset_seconds\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful marine forecast response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":true,\"type\":\"boolean\"},\"reason\":{\"description\":\"Description of the error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for commercial use. Non-commercial use does not require an API key.\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/marine-weather","segments":[{"lit":"v1"},{"lit":"marine-weather"}],"select":{"exist":["daily","forecast_day","hourly","latitude","longitude","past_day","timeformat","timezone"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"marine_forecast","name__orig":"marine_forecast","Name":"MarineForecast","name_":"marine_forecast","name-":"marine-forecast","NAME":"MARINE_FORECAST","index$":1}, {"active":true,"entity":"marine_forecast","key$":"BasicMarineForecastFlow","kind":"basic","name":"BasicMarineForecastFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"marine_forecast_ref01","srcdatavar":"marine_forecast_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-marine_forecast_ref01"}}],"index$":0}]}, 'MarineForecast')
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
  
