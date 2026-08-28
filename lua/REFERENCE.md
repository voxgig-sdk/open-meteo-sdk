# OpenMeteo Lua SDK Reference

Complete API reference for the OpenMeteo Lua SDK.


## OpenMeteoSDK

### Constructor

```lua
local sdk = require("open-meteo_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Historical(data)`

Create a new `Historical` entity instance. Pass `nil` for no initial data.

#### `MarineForecast(data)`

Create a new `MarineForecast` entity instance. Pass `nil` for no initial data.

#### `WeatherForecast(data)`

Create a new `WeatherForecast` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## HistoricalEntity

```lua
local historical = client:Historical(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `table` | No |  |
| `daily_units` | `table` | No |  |
| `elevation` | `number` | No |  |
| `generationtime_ms` | `number` | No |  |
| `hourly` | `table` | No |  |
| `hourly_units` | `table` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_seconds` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Historical():load({ end_date = "end_date", latitude = 1, longitude = 1, start_date = "start_date" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarineForecastEntity

```lua
local marine_forecast = client:MarineForecast(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `table` | No |  |
| `daily_units` | `table` | No |  |
| `generationtime_ms` | `number` | No |  |
| `hourly` | `table` | No |  |
| `hourly_units` | `table` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_seconds` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MarineForecast():load({ latitude = 1, longitude = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarineForecastEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WeatherForecastEntity

```lua
local weather_forecast = client:WeatherForecast(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `table` | No | Current weather conditions |
| `current_units` | `table` | No | Units for current weather variables |
| `daily` | `table` | No | Daily weather data |
| `daily_units` | `table` | No | Units for daily weather variables |
| `elevation` | `number` | No | Elevation in meters above sea level |
| `generationtime_ms` | `number` | No | Generation time of the weather data in milliseconds |
| `hourly` | `table` | No | Hourly weather data |
| `hourly_units` | `table` | No | Units for hourly weather variables |
| `latitude` | `number` | No | WGS84 latitude of the location |
| `longitude` | `number` | No | WGS84 longitude of the location |
| `timezone` | `string` | No | Timezone identifier |
| `timezone_abbreviation` | `string` | No | Timezone abbreviation |
| `utc_offset_seconds` | `number` | No | UTC offset in seconds |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WeatherForecast():load({ latitude = 1, longitude = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

