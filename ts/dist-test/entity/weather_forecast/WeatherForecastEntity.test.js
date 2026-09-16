"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WeatherForecastEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_METEO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_METEO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenMeteoSDK.test();
        const ent = testsdk.WeatherForecast();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_METEO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'weather_forecast.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "current", "req": false, "short": "Current weather conditions", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "current_units", "req": false, "short": "Units for current weather variables", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "daily", "req": false, "short": "Daily weather data", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "daily_units", "req": false, "short": "Units for daily weather variables", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "format": "float", "name": "elevation", "req": false, "short": "Elevation in meters above sea level", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "format": "float", "name": "generationtime_ms", "req": false, "short": "Generation time of the weather data in milliseconds", "type": "`$NUMBER`", "index$": 5 }, { "active": true, "name": "hourly", "req": false, "short": "Hourly weather data", "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "hourly_units", "req": false, "short": "Units for hourly weather variables", "type": "`$OBJECT`", "index$": 7 }, { "active": true, "format": "float", "name": "latitude", "req": false, "short": "WGS84 latitude of the location", "type": "`$NUMBER`", "index$": 8 }, { "active": true, "format": "float", "name": "longitude", "req": false, "short": "WGS84 longitude of the location", "type": "`$NUMBER`", "index$": 9 }, { "active": true, "name": "timezone", "req": false, "short": "Timezone identifier", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "timezone_abbreviation", "req": false, "short": "Timezone abbreviation", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "utc_offset_seconds", "req": false, "short": "UTC offset in seconds", "type": "`$INTEGER`", "index$": 12 }], "name": "weather_forecast", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "apikey", "orig": "apikey", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "land", "kind": "query", "name": "cell_selection", "orig": "cell_selection", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "current", "orig": "current", "reqd": false, "type": "`$ARRAY`", "index$": 2 }, { "active": true, "kind": "query", "name": "daily", "orig": "daily", "reqd": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "kind": "query", "name": "elevation", "orig": "elevation", "reqd": false, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "example": "2022-06-30", "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "example": "2022-06-30T12:00", "kind": "query", "name": "end_hour", "orig": "end_hour", "reqd": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "example": "2022-06-30T12:00", "kind": "query", "name": "end_minutely_15", "orig": "end_minutely_15", "reqd": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "example": 7, "kind": "query", "name": "forecast_day", "orig": "forecast_day", "reqd": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "kind": "query", "name": "forecast_hour", "orig": "forecast_hour", "reqd": false, "type": "`$INTEGER`", "index$": 9 }, { "active": true, "kind": "query", "name": "forecast_minutely_15", "orig": "forecast_minutely_15", "reqd": false, "type": "`$INTEGER`", "index$": 10 }, { "active": true, "kind": "query", "name": "hourly", "orig": "hourly", "reqd": false, "type": "`$ARRAY`", "index$": 11 }, { "active": true, "example": 52.52, "kind": "query", "name": "latitude", "orig": "latitude", "reqd": true, "type": "`$NUMBER`", "index$": 12 }, { "active": true, "example": 13.41, "kind": "query", "name": "longitude", "orig": "longitude", "reqd": true, "type": "`$NUMBER`", "index$": 13 }, { "active": true, "kind": "query", "name": "model", "orig": "model", "reqd": false, "type": "`$STRING`", "index$": 14 }, { "active": true, "example": 0, "kind": "query", "name": "past_day", "orig": "past_day", "reqd": false, "type": "`$INTEGER`", "index$": 15 }, { "active": true, "kind": "query", "name": "past_hour", "orig": "past_hour", "reqd": false, "type": "`$INTEGER`", "index$": 16 }, { "active": true, "kind": "query", "name": "past_minutely_15", "orig": "past_minutely_15", "reqd": false, "type": "`$INTEGER`", "index$": 17 }, { "active": true, "example": "mm", "kind": "query", "name": "precipitation_unit", "orig": "precipitation_unit", "reqd": false, "type": "`$STRING`", "index$": 18 }, { "active": true, "example": "2022-06-30", "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$STRING`", "index$": 19 }, { "active": true, "example": "2022-06-30T12:00", "kind": "query", "name": "start_hour", "orig": "start_hour", "reqd": false, "type": "`$STRING`", "index$": 20 }, { "active": true, "example": "2022-06-30T12:00", "kind": "query", "name": "start_minutely_15", "orig": "start_minutely_15", "reqd": false, "type": "`$STRING`", "index$": 21 }, { "active": true, "example": "celsius", "kind": "query", "name": "temperature_unit", "orig": "temperature_unit", "reqd": false, "type": "`$STRING`", "index$": 22 }, { "active": true, "example": "iso8601", "kind": "query", "name": "timeformat", "orig": "timeformat", "reqd": false, "type": "`$STRING`", "index$": 23 }, { "active": true, "example": "auto", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 24 }, { "active": true, "example": "kmh", "kind": "query", "name": "wind_speed_unit", "orig": "wind_speed_unit", "reqd": false, "type": "`$STRING`", "index$": 25 }] }, "contract": { "id": "GET /v1/forecast", "json": "{\"operationId\":\"getWeatherForecast\",\"parameters\":[{\"description\":\"Geographical WGS84 latitude of the location. Multiple coordinates can be comma separated.\",\"in\":\"query\",\"name\":\"latitude\",\"required\":true,\"schema\":{\"example\":52.52,\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Geographical WGS84 longitude of the location. Multiple coordinates can be comma separated. Use negative values for locations west of Greenwich.\",\"in\":\"query\",\"name\":\"longitude\",\"required\":true,\"schema\":{\"example\":13.41,\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"The elevation used for statistical downscaling. Per default, a 90 meter digital elevation model is used. Set to 'nan' to disable downscaling.\",\"in\":\"query\",\"name\":\"elevation\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"A list of weather variables which should be returned. Values can be comma separated. Available variables include: temperature_2m, relative_humidity_2m, dewpoint_2m, apparent_temperature, precipitation_probability, precipitation, rain, showers, snowfall, snow_depth, weather_code, pressure_msl, surface_pressure, cloud_cover, cloud_cover_low, cloud_cover_mid, cloud_cover_high, visibility, evapotranspiration, et0_fao_evapotranspiration, vapour_pressure_deficit, wind_speed_10m, wind_speed_80m, wind_speed_120m, wind_speed_180m, wind_direction_10m, wind_direction_80m, wind_direction_120m, wind_direction_180m, wind_gusts_10m, temperature_80m, temperature_120m, temperature_180m, soil_temperature_0cm, soil_temperature_6cm, soil_temperature_18cm, soil_temperature_54cm, soil_moisture_0_1cm, soil_moisture_1_3cm, soil_moisture_3_9cm, soil_moisture_9_27cm, soil_moisture_27_81cm, uv_index, uv_index_clear_sky, is_day, sunshine_duration, cape, lifted_index, convective_inhibition, freezing_level_height, boundary_layer_height, shortwave_radiation, direct_radiation, diffuse_radiation, direct_normal_irradiance, global_tilted_irradiance, terrestrial_radiation, and many more.\",\"explode\":false,\"in\":\"query\",\"name\":\"hourly\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"A list of daily weather variable aggregations which should be returned. Values can be comma separated. Available variables include: weather_code, temperature_2m_max, temperature_2m_min, apparent_temperature_max, apparent_temperature_min, sunrise, sunset, daylight_duration, sunshine_duration, uv_index_max, uv_index_clear_sky_max, precipitation_sum, rain_sum, showers_sum, snowfall_sum, precipitation_hours, precipitation_probability_max, wind_speed_10m_max, wind_gusts_10m_max, wind_direction_10m_dominant, shortwave_radiation_sum, et0_fao_evapotranspiration, and many more.\",\"explode\":false,\"in\":\"query\",\"name\":\"daily\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"A list of weather variables to get current conditions. Based on 15-minutely weather model data. Available variables include: temperature_2m, relative_humidity_2m, apparent_temperature, is_day, precipitation, rain, showers, snowfall, weather_code, cloud_cover, pressure_msl, surface_pressure, wind_speed_10m, wind_direction_10m, wind_gusts_10m.\",\"explode\":false,\"in\":\"query\",\"name\":\"current\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Temperature unit. Options: celsius, fahrenheit\",\"in\":\"query\",\"name\":\"temperature_unit\",\"required\":false,\"schema\":{\"default\":\"celsius\",\"enum\":[\"celsius\",\"fahrenheit\"],\"type\":\"string\"}},{\"description\":\"Wind speed unit. Options: kmh, ms, mph, kn\",\"in\":\"query\",\"name\":\"wind_speed_unit\",\"required\":false,\"schema\":{\"default\":\"kmh\",\"enum\":[\"kmh\",\"ms\",\"mph\",\"kn\"],\"type\":\"string\"}},{\"description\":\"Precipitation unit. Options: mm, inch\",\"in\":\"query\",\"name\":\"precipitation_unit\",\"required\":false,\"schema\":{\"default\":\"mm\",\"enum\":[\"mm\",\"inch\"],\"type\":\"string\"}},{\"description\":\"Time format. Options: iso8601, unixtime\",\"in\":\"query\",\"name\":\"timeformat\",\"required\":false,\"schema\":{\"default\":\"iso8601\",\"enum\":[\"iso8601\",\"unixtime\"],\"type\":\"string\"}},{\"description\":\"If timezone is set, all timestamps are returned as local-time. Any time zone name from the time zone database is supported. If 'auto' is set, the coordinates will be automatically resolved to the local time zone. Required if daily weather variables are specified.\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"GMT\",\"example\":\"auto\",\"type\":\"string\"}},{\"description\":\"If past_days is set, yesterday or the day before yesterday data are also returned.\",\"in\":\"query\",\"name\":\"past_days\",\"required\":false,\"schema\":{\"default\":0,\"maximum\":92,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Per default, only 7 days are returned. Up to 16 days of forecast are possible.\",\"in\":\"query\",\"name\":\"forecast_days\",\"required\":false,\"schema\":{\"default\":7,\"maximum\":16,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Similar to forecast_days, the number of timesteps of hourly data can be controlled. Instead of using the current day as a reference, the current hour is used.\",\"in\":\"query\",\"name\":\"forecast_hours\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Similar to forecast_days, the number of timesteps of 15-minutely data can be controlled. Instead of using the current day as a reference, the current 15-minute time-step is used.\",\"in\":\"query\",\"name\":\"forecast_minutely_15\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The number of timesteps of past hourly data to return.\",\"in\":\"query\",\"name\":\"past_hours\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The number of timesteps of past 15-minutely data to return.\",\"in\":\"query\",\"name\":\"past_minutely_15\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The start date of the time interval to get weather data. Must be specified as an ISO8601 date (e.g. 2022-06-30).\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"example\":\"2022-06-30\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The end date of the time interval to get weather data. Must be specified as an ISO8601 date (e.g. 2022-06-30).\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"example\":\"2022-06-30\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The start time of the time interval to get hourly weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).\",\"in\":\"query\",\"name\":\"start_hour\",\"required\":false,\"schema\":{\"example\":\"2022-06-30T12:00\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"The end time of the time interval to get hourly weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).\",\"in\":\"query\",\"name\":\"end_hour\",\"required\":false,\"schema\":{\"example\":\"2022-06-30T12:00\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"The start time of the time interval to get 15-minutely weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).\",\"in\":\"query\",\"name\":\"start_minutely_15\",\"required\":false,\"schema\":{\"example\":\"2022-06-30T12:00\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"The end time of the time interval to get 15-minutely weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).\",\"in\":\"query\",\"name\":\"end_minutely_15\",\"required\":false,\"schema\":{\"example\":\"2022-06-30T12:00\",\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Manually select one or more weather models. By default the best suitable weather model is selected automatically. Options include: best_match, ecmwf_ifs025, ecmwf_aifs025, cma_grapes_global, bom_access_global, gfs_seamless, gfs_global, gfs_hrrr, gfs_graphcast, jma_seamless, jma_msm, jma_gsm, kma_seamless, icon_seamless, icon_global, icon_eu, icon_d2, gem_seamless, gem_global, gem_regional, gem_hrdps_continental, arpege_seamless, arpege_world, arpege_europe, arome_france, arome_france_hd, meteofrance_seamless, metno_seamless, harmonie_arome_europe, knmi_seamless, dmi_seamless, ukmo_seamless, ukmo_uk2km, iconwave_seamless, iconwave_ch1, iconwave_ch2, and more.\",\"in\":\"query\",\"name\":\"models\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Set a preference how grid-cells are selected. Options: land, sea, nearest. Default is land, which finds a suitable grid-cell on land with similar elevation to the requested coordinates. Sea prefers grid-cells on sea. Nearest selects the nearest possible grid-cell.\",\"in\":\"query\",\"name\":\"cell_selection\",\"required\":false,\"schema\":{\"default\":\"land\",\"enum\":[\"land\",\"sea\",\"nearest\"],\"type\":\"string\"}},{\"description\":\"Only required for commercial use to authenticate your API request.\",\"in\":\"query\",\"name\":\"apikey\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"current\":{\"additionalProperties\":{\"type\":\"number\"},\"description\":\"Current weather conditions\",\"properties\":{\"interval\":{\"description\":\"Update interval in seconds\",\"type\":\"integer\"},\"time\":{\"description\":\"Current timestamp\",\"type\":\"string\"}},\"type\":\"object\"},\"current_units\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Units for current weather variables\",\"type\":\"object\"},\"daily\":{\"additionalProperties\":{\"items\":{},\"type\":\"array\"},\"description\":\"Daily weather data\",\"properties\":{\"time\":{\"description\":\"Array of dates\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"daily_units\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Units for daily weather variables\",\"type\":\"object\"},\"elevation\":{\"description\":\"Elevation in meters above sea level\",\"format\":\"float\",\"type\":\"number\"},\"generationtime_ms\":{\"description\":\"Generation time of the weather data in milliseconds\",\"format\":\"float\",\"type\":\"number\"},\"hourly\":{\"additionalProperties\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"description\":\"Hourly weather data\",\"properties\":{\"time\":{\"description\":\"Array of timestamps\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"hourly_units\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Units for hourly weather variables\",\"type\":\"object\"},\"latitude\":{\"description\":\"WGS84 latitude of the location\",\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"WGS84 longitude of the location\",\"format\":\"float\",\"type\":\"number\"},\"timezone\":{\"description\":\"Timezone identifier\",\"type\":\"string\"},\"timezone_abbreviation\":{\"description\":\"Timezone abbreviation\",\"type\":\"string\"},\"utc_offset_seconds\":{\"description\":\"UTC offset in seconds\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful weather forecast response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":true,\"type\":\"boolean\"},\"reason\":{\"description\":\"Description of the error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for commercial use. Non-commercial use does not require an API key.\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/forecast", "segments": [{ "lit": "v1" }, { "lit": "forecast" }], "select": { "exist": ["apikey", "cell_selection", "current", "daily", "elevation", "end_date", "end_hour", "end_minutely_15", "forecast_day", "forecast_hour", "forecast_minutely_15", "hourly", "latitude", "longitude", "model", "past_day", "past_hour", "past_minutely_15", "precipitation_unit", "start_date", "start_hour", "start_minutely_15", "temperature_unit", "timeformat", "timezone", "wind_speed_unit"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weather_forecast", "name__orig": "weather_forecast", "Name": "WeatherForecast", "name_": "weather_forecast", "name-": "weather-forecast", "NAME": "WEATHER_FORECAST", "index$": 2 }, { "active": true, "entity": "weather_forecast", "key$": "BasicWeatherForecastFlow", "kind": "basic", "name": "BasicWeatherForecastFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "weather_forecast_ref01", "srcdatavar": "weather_forecast_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weather_forecast_ref01" } }], "index$": 0 }] }, 'WeatherForecast');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let weather_forecast_ref01_data = Object.values(setup.data.existing.weather_forecast)[0];
        // LOAD
        const weather_forecast_ref01_ent = client.WeatherForecast();
        const weather_forecast_ref01_match_dt0 = {};
        const weather_forecast_ref01_data_dt0 = (await weather_forecast_ref01_ent.load(weather_forecast_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != weather_forecast_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/weather_forecast/WeatherForecastTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenMeteoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['weather_forecast01', 'weather_forecast02', 'weather_forecast03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_METEO_TEST_WEATHER_FORECAST_ENTID': idmap,
        'OPEN_METEO_TEST_LIVE': 'FALSE',
        'OPEN_METEO_TEST_EXPLAIN': 'FALSE',
        'OPEN_METEO_APIKEY': '',
    });
    idmap = env['OPEN_METEO_TEST_WEATHER_FORECAST_ENTID'];
    const live = 'TRUE' === env.OPEN_METEO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_METEO_TEST_WEATHER_FORECAST_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenMeteoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=WeatherForecastEntity.test.js.map