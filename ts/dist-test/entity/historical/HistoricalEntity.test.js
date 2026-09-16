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
(0, node_test_1.describe)('HistoricalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_METEO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_METEO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenMeteoSDK.test();
        const ent = testsdk.Historical();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_METEO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'historical.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "daily", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "daily_units", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "format": "float", "name": "elevation", "req": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "format": "float", "name": "generationtime_ms", "req": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "hourly", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "hourly_units", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "format": "float", "name": "latitude", "req": false, "type": "`$NUMBER`", "index$": 6 }, { "active": true, "format": "float", "name": "longitude", "req": false, "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "timezone", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "timezone_abbreviation", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "utc_offset_seconds", "req": false, "type": "`$INTEGER`", "index$": 10 }], "name": "historical", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "daily", "orig": "daily", "reqd": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "kind": "query", "name": "end_date", "orig": "end_date", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "hourly", "orig": "hourly", "reqd": false, "type": "`$ARRAY`", "index$": 2 }, { "active": true, "kind": "query", "name": "latitude", "orig": "latitude", "reqd": true, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "kind": "query", "name": "longitude", "orig": "longitude", "reqd": true, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "example": "mm", "kind": "query", "name": "precipitation_unit", "orig": "precipitation_unit", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "start_date", "orig": "start_date", "reqd": true, "type": "`$STRING`", "index$": 6 }, { "active": true, "example": "celsius", "kind": "query", "name": "temperature_unit", "orig": "temperature_unit", "reqd": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "example": "iso8601", "kind": "query", "name": "timeformat", "orig": "timeformat", "reqd": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "example": "GMT", "kind": "query", "name": "timezone", "orig": "timezone", "reqd": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "example": "kmh", "kind": "query", "name": "wind_speed_unit", "orig": "wind_speed_unit", "reqd": false, "type": "`$STRING`", "index$": 10 }] }, "contract": { "id": "GET /v1/historical", "json": "{\"operationId\":\"getHistoricalWeather\",\"parameters\":[{\"description\":\"Geographical WGS84 latitude of the location\",\"in\":\"query\",\"name\":\"latitude\",\"required\":true,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Geographical WGS84 longitude of the location\",\"in\":\"query\",\"name\":\"longitude\",\"required\":true,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"The start date of the historical period (ISO8601 format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"start_date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The end date of the historical period (ISO8601 format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"end_date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"A list of historical hourly weather variables to return\",\"explode\":false,\"in\":\"query\",\"name\":\"hourly\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"A list of historical daily weather variables to return\",\"explode\":false,\"in\":\"query\",\"name\":\"daily\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Temperature unit\",\"in\":\"query\",\"name\":\"temperature_unit\",\"required\":false,\"schema\":{\"default\":\"celsius\",\"enum\":[\"celsius\",\"fahrenheit\"],\"type\":\"string\"}},{\"description\":\"Wind speed unit\",\"in\":\"query\",\"name\":\"wind_speed_unit\",\"required\":false,\"schema\":{\"default\":\"kmh\",\"enum\":[\"kmh\",\"ms\",\"mph\",\"kn\"],\"type\":\"string\"}},{\"description\":\"Precipitation unit\",\"in\":\"query\",\"name\":\"precipitation_unit\",\"required\":false,\"schema\":{\"default\":\"mm\",\"enum\":[\"mm\",\"inch\"],\"type\":\"string\"}},{\"description\":\"Timezone for timestamps\",\"in\":\"query\",\"name\":\"timezone\",\"required\":false,\"schema\":{\"default\":\"GMT\",\"type\":\"string\"}},{\"description\":\"Time format\",\"in\":\"query\",\"name\":\"timeformat\",\"required\":false,\"schema\":{\"default\":\"iso8601\",\"enum\":[\"iso8601\",\"unixtime\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"daily\":{\"additionalProperties\":{\"items\":{},\"type\":\"array\"},\"properties\":{\"time\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"daily_units\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"elevation\":{\"format\":\"float\",\"type\":\"number\"},\"generationtime_ms\":{\"format\":\"float\",\"type\":\"number\"},\"hourly\":{\"additionalProperties\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"properties\":{\"time\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"hourly_units\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"latitude\":{\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"format\":\"float\",\"type\":\"number\"},\"timezone\":{\"type\":\"string\"},\"timezone_abbreviation\":{\"type\":\"string\"},\"utc_offset_seconds\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful historical weather response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":true,\"type\":\"boolean\"},\"reason\":{\"description\":\"Description of the error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for commercial use. Non-commercial use does not require an API key.\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/historical", "segments": [{ "lit": "v1" }, { "lit": "historical" }], "select": { "exist": ["daily", "end_date", "hourly", "latitude", "longitude", "precipitation_unit", "start_date", "temperature_unit", "timeformat", "timezone", "wind_speed_unit"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "historical", "name__orig": "historical", "Name": "Historical", "name_": "historical", "name-": "historical", "NAME": "HISTORICAL", "index$": 0 }, { "active": true, "entity": "historical", "key$": "BasicHistoricalFlow", "kind": "basic", "name": "BasicHistoricalFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "historical_ref01", "srcdatavar": "historical_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-historical_ref01" } }], "index$": 0 }] }, 'Historical');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let historical_ref01_data = Object.values(setup.data.existing.historical)[0];
        // LOAD
        const historical_ref01_ent = client.Historical();
        const historical_ref01_match_dt0 = {};
        const historical_ref01_data_dt0 = (await historical_ref01_ent.load(historical_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != historical_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/historical/HistoricalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenMeteoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['historical01', 'historical02', 'historical03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_METEO_TEST_HISTORICAL_ENTID': idmap,
        'OPEN_METEO_TEST_LIVE': 'FALSE',
        'OPEN_METEO_TEST_EXPLAIN': 'FALSE',
        'OPEN_METEO_APIKEY': '',
    });
    idmap = env['OPEN_METEO_TEST_HISTORICAL_ENTID'];
    const live = 'TRUE' === env.OPEN_METEO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_METEO_TEST_HISTORICAL_ENTID'];
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
//# sourceMappingURL=HistoricalEntity.test.js.map