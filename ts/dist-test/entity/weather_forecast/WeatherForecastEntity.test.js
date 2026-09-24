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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "current": { "a": true, "h": "Current", "n": "current", "r": false, "sh": "Current weather conditions", "t": "`$OBJECT`", "key$": "current", "index$": 0 }, "current_units": { "a": true, "h": "Current Units", "n": "current_units", "r": false, "sh": "Units for current weather variables", "t": "`$OBJECT`", "key$": "current_units", "index$": 1 }, "daily": { "a": true, "h": "Daily", "n": "daily", "r": false, "sh": "Daily weather data", "t": "`$OBJECT`", "key$": "daily", "index$": 2 }, "daily_units": { "a": true, "h": "Daily Units", "n": "daily_units", "r": false, "sh": "Units for daily weather variables", "t": "`$OBJECT`", "key$": "daily_units", "index$": 3 }, "elevation": { "a": true, "fo": "float", "h": "Elevation", "n": "elevation", "r": false, "sh": "Elevation in meters above sea level", "t": "`$NUMBER`", "key$": "elevation", "index$": 4 }, "generationtime_ms": { "a": true, "fo": "float", "h": "Generationtime Ms", "n": "generationtime_ms", "r": false, "sh": "Generation time of the weather data in milliseconds", "t": "`$NUMBER`", "key$": "generationtime_ms", "index$": 5 }, "hourly": { "a": true, "h": "Hourly", "n": "hourly", "r": false, "sh": "Hourly weather data", "t": "`$OBJECT`", "key$": "hourly", "index$": 6 }, "hourly_units": { "a": true, "h": "Hourly Units", "n": "hourly_units", "r": false, "sh": "Units for hourly weather variables", "t": "`$OBJECT`", "key$": "hourly_units", "index$": 7 }, "latitude": { "a": true, "fo": "float", "h": "Latitude", "n": "latitude", "r": false, "sh": "WGS84 latitude of the location", "t": "`$NUMBER`", "key$": "latitude", "index$": 8 }, "longitude": { "a": true, "fo": "float", "h": "Longitude", "n": "longitude", "r": false, "sh": "WGS84 longitude of the location", "t": "`$NUMBER`", "key$": "longitude", "index$": 9 }, "timezone": { "a": true, "h": "Timezone", "n": "timezone", "r": false, "sh": "Timezone identifier", "t": "`$STRING`", "key$": "timezone", "index$": 10 }, "timezone_abbreviation": { "a": true, "h": "Timezone Abbreviation", "n": "timezone_abbreviation", "r": false, "sh": "Timezone abbreviation", "t": "`$STRING`", "key$": "timezone_abbreviation", "index$": 11 }, "utc_offset_seconds": { "a": true, "h": "Utc Offset Seconds", "n": "utc_offset_seconds", "r": false, "sh": "UTC offset in seconds", "t": "`$INTEGER`", "key$": "utc_offset_seconds", "index$": 12 } }, "name": "weather_forecast", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/forecast", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "apikey", "or": "apikey", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "land", "k": "query", "n": "cell_selection", "or": "cell_selection", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "current", "or": "current", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "k": "query", "n": "daily", "or": "daily", "r": false, "t": "`$ARRAY`", "index$": 3 }, { "a": true, "k": "query", "n": "elevation", "or": "elevation", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "ex": "2022-06-30", "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "2022-06-30T12:00", "k": "query", "n": "end_hour", "or": "end_hour", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "2022-06-30T12:00", "k": "query", "n": "end_minutely_15", "or": "end_minutely_15", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": 7, "k": "query", "n": "forecast_day", "or": "forecast_day", "r": false, "t": "`$INTEGER`", "index$": 8 }, { "a": true, "k": "query", "n": "forecast_hour", "or": "forecast_hour", "r": false, "t": "`$INTEGER`", "index$": 9 }, { "a": true, "k": "query", "n": "forecast_minutely_15", "or": "forecast_minutely_15", "r": false, "t": "`$INTEGER`", "index$": 10 }, { "a": true, "k": "query", "n": "hourly", "or": "hourly", "r": false, "t": "`$ARRAY`", "index$": 11 }, { "a": true, "ex": 52.52, "k": "query", "n": "latitude", "or": "latitude", "r": true, "t": "`$NUMBER`", "index$": 12 }, { "a": true, "ex": 13.41, "k": "query", "n": "longitude", "or": "longitude", "r": true, "t": "`$NUMBER`", "index$": 13 }, { "a": true, "k": "query", "n": "model", "or": "model", "r": false, "t": "`$STRING`", "index$": 14 }, { "a": true, "ex": 0, "k": "query", "n": "past_day", "or": "past_day", "r": false, "t": "`$INTEGER`", "index$": 15 }, { "a": true, "k": "query", "n": "past_hour", "or": "past_hour", "r": false, "t": "`$INTEGER`", "index$": 16 }, { "a": true, "k": "query", "n": "past_minutely_15", "or": "past_minutely_15", "r": false, "t": "`$INTEGER`", "index$": 17 }, { "a": true, "ex": "mm", "k": "query", "n": "precipitation_unit", "or": "precipitation_unit", "r": false, "t": "`$STRING`", "index$": 18 }, { "a": true, "ex": "2022-06-30", "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 19 }, { "a": true, "ex": "2022-06-30T12:00", "k": "query", "n": "start_hour", "or": "start_hour", "r": false, "t": "`$STRING`", "index$": 20 }, { "a": true, "ex": "2022-06-30T12:00", "k": "query", "n": "start_minutely_15", "or": "start_minutely_15", "r": false, "t": "`$STRING`", "index$": 21 }, { "a": true, "ex": "celsius", "k": "query", "n": "temperature_unit", "or": "temperature_unit", "r": false, "t": "`$STRING`", "index$": 22 }, { "a": true, "ex": "iso8601", "k": "query", "n": "timeformat", "or": "timeformat", "r": false, "t": "`$STRING`", "index$": 23 }, { "a": true, "ex": "auto", "k": "query", "n": "timezone", "or": "timezone", "r": false, "t": "`$STRING`", "index$": 24 }, { "a": true, "ex": "kmh", "k": "query", "n": "wind_speed_unit", "or": "wind_speed_unit", "r": false, "t": "`$STRING`", "index$": 25 }] }, "k": "http", "m": "GET", "o": "/v1/forecast", "q": { "exist": ["apikey", "cell_selection", "current", "daily", "elevation", "end_date", "end_hour", "end_minutely_15", "forecast_day", "forecast_hour", "forecast_minutely_15", "hourly", "latitude", "longitude", "model", "past_day", "past_hour", "past_minutely_15", "precipitation_unit", "start_date", "start_hour", "start_minutely_15", "temperature_unit", "timeformat", "timezone", "wind_speed_unit"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "forecast" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weather_forecast", "name__orig": "weather_forecast", "Name": "WeatherForecast", "name_": "weather_forecast", "name-": "weather-forecast", "NAME": "WEATHER_FORECAST", "index$": 2 }, { "active": true, "entity": "weather_forecast", "key$": "BasicWeatherForecastFlow", "kind": "basic", "name": "BasicWeatherForecastFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "weather_forecast_ref01", "srcdatavar": "weather_forecast_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weather_forecast_ref01" } }], "index$": 0 }] }, 'WeatherForecast', { "GET /v1/forecast": { "protocol": "http", "operationId": "getWeatherForecast", "responses": { "200": { "description": "Successful weather forecast response", "content": { "application/json": { "schema": { "type": "object", "properties": { "latitude": { "description": "WGS84 latitude of the location", "format": "float", "key$": "latitude", "type": "number" }, "longitude": { "description": "WGS84 longitude of the location", "format": "float", "key$": "longitude", "type": "number" }, "elevation": { "description": "Elevation in meters above sea level", "format": "float", "key$": "elevation", "type": "number" }, "generationtime_ms": { "description": "Generation time of the weather data in milliseconds", "format": "float", "key$": "generationtime_ms", "type": "number" }, "utc_offset_seconds": { "description": "UTC offset in seconds", "key$": "utc_offset_seconds", "type": "integer" }, "timezone": { "description": "Timezone identifier", "key$": "timezone", "type": "string" }, "timezone_abbreviation": { "description": "Timezone abbreviation", "key$": "timezone_abbreviation", "type": "string" }, "hourly": { "additionalProperties": { "items": { "type": "number" }, "type": "array" }, "description": "Hourly weather data", "key$": "hourly", "properties": { "time": { "description": "Array of timestamps", "items": { "type": "string" }, "type": "array" } }, "type": "object" }, "hourly_units": { "additionalProperties": { "type": "string" }, "description": "Units for hourly weather variables", "key$": "hourly_units", "type": "object" }, "daily": { "additionalProperties": { "items": {}, "type": "array" }, "description": "Daily weather data", "key$": "daily", "properties": { "time": { "description": "Array of dates", "items": { "type": "string" }, "type": "array" } }, "type": "object" }, "daily_units": { "additionalProperties": { "type": "string" }, "description": "Units for daily weather variables", "key$": "daily_units", "type": "object" }, "current": { "additionalProperties": { "type": "number" }, "description": "Current weather conditions", "key$": "current", "properties": { "interval": { "description": "Update interval in seconds", "type": "integer" }, "time": { "description": "Current timestamp", "type": "string" } }, "type": "object" }, "current_units": { "additionalProperties": { "type": "string" }, "description": "Units for current weather variables", "key$": "current_units", "type": "object" } }, "x-ref": "#/components/schemas/WeatherForecastResponse", "index$": 0 } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "boolean", "example": true }, "reason": { "type": "string", "description": "Description of the error" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "latitude", "in": "query", "description": "Geographical WGS84 latitude of the location. Multiple coordinates can be comma separated.", "required": true, "schema": { "type": "number", "format": "float", "example": 52.52 }, "index$": 0 }, { "name": "longitude", "in": "query", "description": "Geographical WGS84 longitude of the location. Multiple coordinates can be comma separated. Use negative values for locations west of Greenwich.", "required": true, "schema": { "type": "number", "format": "float", "example": 13.41 }, "index$": 1 }, { "name": "elevation", "in": "query", "description": "The elevation used for statistical downscaling. Per default, a 90 meter digital elevation model is used. Set to 'nan' to disable downscaling.", "required": false, "schema": { "type": "number", "format": "float" }, "index$": 2 }, { "name": "hourly", "in": "query", "description": "A list of weather variables which should be returned. Values can be comma separated. Available variables include: temperature_2m, relative_humidity_2m, dewpoint_2m, apparent_temperature, precipitation_probability, precipitation, rain, showers, snowfall, snow_depth, weather_code, pressure_msl, surface_pressure, cloud_cover, cloud_cover_low, cloud_cover_mid, cloud_cover_high, visibility, evapotranspiration, et0_fao_evapotranspiration, vapour_pressure_deficit, wind_speed_10m, wind_speed_80m, wind_speed_120m, wind_speed_180m, wind_direction_10m, wind_direction_80m, wind_direction_120m, wind_direction_180m, wind_gusts_10m, temperature_80m, temperature_120m, temperature_180m, soil_temperature_0cm, soil_temperature_6cm, soil_temperature_18cm, soil_temperature_54cm, soil_moisture_0_1cm, soil_moisture_1_3cm, soil_moisture_3_9cm, soil_moisture_9_27cm, soil_moisture_27_81cm, uv_index, uv_index_clear_sky, is_day, sunshine_duration, cape, lifted_index, convective_inhibition, freezing_level_height, boundary_layer_height, shortwave_radiation, direct_radiation, diffuse_radiation, direct_normal_irradiance, global_tilted_irradiance, terrestrial_radiation, and many more.", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": false, "index$": 3 }, { "name": "daily", "in": "query", "description": "A list of daily weather variable aggregations which should be returned. Values can be comma separated. Available variables include: weather_code, temperature_2m_max, temperature_2m_min, apparent_temperature_max, apparent_temperature_min, sunrise, sunset, daylight_duration, sunshine_duration, uv_index_max, uv_index_clear_sky_max, precipitation_sum, rain_sum, showers_sum, snowfall_sum, precipitation_hours, precipitation_probability_max, wind_speed_10m_max, wind_gusts_10m_max, wind_direction_10m_dominant, shortwave_radiation_sum, et0_fao_evapotranspiration, and many more.", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": false, "index$": 4 }, { "name": "current", "in": "query", "description": "A list of weather variables to get current conditions. Based on 15-minutely weather model data. Available variables include: temperature_2m, relative_humidity_2m, apparent_temperature, is_day, precipitation, rain, showers, snowfall, weather_code, cloud_cover, pressure_msl, surface_pressure, wind_speed_10m, wind_direction_10m, wind_gusts_10m.", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": false, "index$": 5 }, { "name": "temperature_unit", "in": "query", "description": "Temperature unit. Options: celsius, fahrenheit", "required": false, "schema": { "type": "string", "enum": ["celsius", "fahrenheit"], "default": "celsius" }, "index$": 6 }, { "name": "wind_speed_unit", "in": "query", "description": "Wind speed unit. Options: kmh, ms, mph, kn", "required": false, "schema": { "type": "string", "enum": ["kmh", "ms", "mph", "kn"], "default": "kmh" }, "index$": 7 }, { "name": "precipitation_unit", "in": "query", "description": "Precipitation unit. Options: mm, inch", "required": false, "schema": { "type": "string", "enum": ["mm", "inch"], "default": "mm" }, "index$": 8 }, { "name": "timeformat", "in": "query", "description": "Time format. Options: iso8601, unixtime", "required": false, "schema": { "type": "string", "enum": ["iso8601", "unixtime"], "default": "iso8601" }, "index$": 9 }, { "name": "timezone", "in": "query", "description": "If timezone is set, all timestamps are returned as local-time. Any time zone name from the time zone database is supported. If 'auto' is set, the coordinates will be automatically resolved to the local time zone. Required if daily weather variables are specified.", "required": false, "schema": { "type": "string", "default": "GMT", "example": "auto" }, "index$": 10 }, { "name": "past_days", "in": "query", "description": "If past_days is set, yesterday or the day before yesterday data are also returned.", "required": false, "schema": { "type": "integer", "minimum": 0, "maximum": 92, "default": 0 }, "index$": 11 }, { "name": "forecast_days", "in": "query", "description": "Per default, only 7 days are returned. Up to 16 days of forecast are possible.", "required": false, "schema": { "type": "integer", "minimum": 0, "maximum": 16, "default": 7 }, "index$": 12 }, { "name": "forecast_hours", "in": "query", "description": "Similar to forecast_days, the number of timesteps of hourly data can be controlled. Instead of using the current day as a reference, the current hour is used.", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 13 }, { "name": "forecast_minutely_15", "in": "query", "description": "Similar to forecast_days, the number of timesteps of 15-minutely data can be controlled. Instead of using the current day as a reference, the current 15-minute time-step is used.", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 14 }, { "name": "past_hours", "in": "query", "description": "The number of timesteps of past hourly data to return.", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 15 }, { "name": "past_minutely_15", "in": "query", "description": "The number of timesteps of past 15-minutely data to return.", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 16 }, { "name": "start_date", "in": "query", "description": "The start date of the time interval to get weather data. Must be specified as an ISO8601 date (e.g. 2022-06-30).", "required": false, "schema": { "type": "string", "format": "date", "example": "2022-06-30" }, "index$": 17 }, { "name": "end_date", "in": "query", "description": "The end date of the time interval to get weather data. Must be specified as an ISO8601 date (e.g. 2022-06-30).", "required": false, "schema": { "type": "string", "format": "date", "example": "2022-06-30" }, "index$": 18 }, { "name": "start_hour", "in": "query", "description": "The start time of the time interval to get hourly weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2022-06-30T12:00" }, "index$": 19 }, { "name": "end_hour", "in": "query", "description": "The end time of the time interval to get hourly weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2022-06-30T12:00" }, "index$": 20 }, { "name": "start_minutely_15", "in": "query", "description": "The start time of the time interval to get 15-minutely weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2022-06-30T12:00" }, "index$": 21 }, { "name": "end_minutely_15", "in": "query", "description": "The end time of the time interval to get 15-minutely weather data. Must be specified as an ISO8601 date with time (e.g. 2022-06-30T12:00).", "required": false, "schema": { "type": "string", "format": "date-time", "example": "2022-06-30T12:00" }, "index$": 22 }, { "name": "models", "in": "query", "description": "Manually select one or more weather models. By default the best suitable weather model is selected automatically. Options include: best_match, ecmwf_ifs025, ecmwf_aifs025, cma_grapes_global, bom_access_global, gfs_seamless, gfs_global, gfs_hrrr, gfs_graphcast, jma_seamless, jma_msm, jma_gsm, kma_seamless, icon_seamless, icon_global, icon_eu, icon_d2, gem_seamless, gem_global, gem_regional, gem_hrdps_continental, arpege_seamless, arpege_world, arpege_europe, arome_france, arome_france_hd, meteofrance_seamless, metno_seamless, harmonie_arome_europe, knmi_seamless, dmi_seamless, ukmo_seamless, ukmo_uk2km, iconwave_seamless, iconwave_ch1, iconwave_ch2, and more.", "required": false, "schema": { "type": "string" }, "index$": 23 }, { "name": "cell_selection", "in": "query", "description": "Set a preference how grid-cells are selected. Options: land, sea, nearest. Default is land, which finds a suitable grid-cell on land with similar elevation to the requested coordinates. Sea prefers grid-cells on sea. Nearest selects the nearest possible grid-cell.", "required": false, "schema": { "type": "string", "enum": ["land", "sea", "nearest"], "default": "land" }, "index$": 24 }, { "name": "apikey", "in": "query", "description": "Only required for commercial use to authenticate your API request.", "required": false, "schema": { "type": "string" }, "index$": 25 }], "securitySource": "unspecified", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "apikey", "description": "API key for commercial use. Non-commercial use does not require an API key." } } } });
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