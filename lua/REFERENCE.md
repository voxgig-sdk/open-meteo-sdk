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
| `daily_unit` | `table` | No |  |
| `elevation` | `number` | No |  |
| `generationtime_m` | `number` | No |  |
| `hourly` | `table` | No |  |
| `hourly_unit` | `table` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_second` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Historical():load()
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
| `daily_unit` | `table` | No |  |
| `generationtime_m` | `number` | No |  |
| `hourly` | `table` | No |  |
| `hourly_unit` | `table` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_second` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MarineForecast():load()
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
| `current` | `table` | No |  |
| `current_unit` | `table` | No |  |
| `daily` | `table` | No |  |
| `daily_unit` | `table` | No |  |
| `elevation` | `number` | No |  |
| `generationtime_m` | `number` | No |  |
| `hourly` | `table` | No |  |
| `hourly_unit` | `table` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_second` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WeatherForecast():load()
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

