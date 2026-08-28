# OpenMeteo Ruby SDK Reference

Complete API reference for the OpenMeteo Ruby SDK.


## OpenMeteoSDK

### Constructor

```ruby
require_relative 'OpenMeteo_sdk'

client = OpenMeteoSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMeteoSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenMeteoSDK.test
```


### Instance Methods

#### `Historical(data = nil)`

Create a new `Historical` entity instance. Pass `nil` for no initial data.

#### `MarineForecast(data = nil)`

Create a new `MarineForecast` entity instance. Pass `nil` for no initial data.

#### `WeatherForecast(data = nil)`

Create a new `WeatherForecast` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## HistoricalEntity

```ruby
historical = client.Historical
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `Hash` | No |  |
| `daily_units` | `Hash` | No |  |
| `elevation` | `Float` | No |  |
| `generationtime_ms` | `Float` | No |  |
| `hourly` | `Hash` | No |  |
| `hourly_units` | `Hash` | No |  |
| `latitude` | `Float` | No |  |
| `longitude` | `Float` | No |  |
| `timezone` | `String` | No |  |
| `timezone_abbreviation` | `String` | No |  |
| `utc_offset_seconds` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Historical.load({ "end_date" => "end_date", "latitude" => 1, "longitude" => 1, "start_date" => "start_date" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarineForecastEntity

```ruby
marine_forecast = client.MarineForecast
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `Hash` | No |  |
| `daily_units` | `Hash` | No |  |
| `generationtime_ms` | `Float` | No |  |
| `hourly` | `Hash` | No |  |
| `hourly_units` | `Hash` | No |  |
| `latitude` | `Float` | No |  |
| `longitude` | `Float` | No |  |
| `timezone` | `String` | No |  |
| `timezone_abbreviation` | `String` | No |  |
| `utc_offset_seconds` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MarineForecast.load({ "latitude" => 1, "longitude" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarineForecastEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WeatherForecastEntity

```ruby
weather_forecast = client.WeatherForecast
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `Hash` | No | Current weather conditions |
| `current_units` | `Hash` | No | Units for current weather variables |
| `daily` | `Hash` | No | Daily weather data |
| `daily_units` | `Hash` | No | Units for daily weather variables |
| `elevation` | `Float` | No | Elevation in meters above sea level |
| `generationtime_ms` | `Float` | No | Generation time of the weather data in milliseconds |
| `hourly` | `Hash` | No | Hourly weather data |
| `hourly_units` | `Hash` | No | Units for hourly weather variables |
| `latitude` | `Float` | No | WGS84 latitude of the location |
| `longitude` | `Float` | No | WGS84 longitude of the location |
| `timezone` | `String` | No | Timezone identifier |
| `timezone_abbreviation` | `String` | No | Timezone abbreviation |
| `utc_offset_seconds` | `Integer` | No | UTC offset in seconds |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WeatherForecast.load({ "latitude" => 1, "longitude" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OpenMeteoSDK.new({
  "feature" => {
    "test" => { "active" => true },
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

