# OpenMeteo Ruby SDK Reference

Complete API reference for the OpenMeteo Ruby SDK.


## OpenMeteoSDK

### Constructor

```ruby
require_relative 'open-meteo_sdk'

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

#### `Marine(data = nil)`

Create a new `Marine` entity instance. Pass `nil` for no initial data.

#### `WeatherForecast(data = nil)`

Create a new `WeatherForecast` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## HistoricalEntity

```ruby
historical = client.Historical
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | ``$OBJECT`` | No |  |
| `daily_unit` | ``$OBJECT`` | No |  |
| `elevation` | ``$NUMBER`` | No |  |
| `generationtime_m` | ``$NUMBER`` | No |  |
| `hourly` | ``$OBJECT`` | No |  |
| `hourly_unit` | ``$OBJECT`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `timezone` | ``$STRING`` | No |  |
| `timezone_abbreviation` | ``$STRING`` | No |  |
| `utc_offset_second` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Historical.load({ "id" => "historical_id" })
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

## MarineEntity

```ruby
marine = client.Marine
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | ``$OBJECT`` | No |  |
| `daily_unit` | ``$OBJECT`` | No |  |
| `generationtime_m` | ``$NUMBER`` | No |  |
| `hourly` | ``$OBJECT`` | No |  |
| `hourly_unit` | ``$OBJECT`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `timezone` | ``$STRING`` | No |  |
| `timezone_abbreviation` | ``$STRING`` | No |  |
| `utc_offset_second` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Marine.load({ "id" => "marine_id" })
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

Create a new `MarineEntity` instance with the same client and
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
| `current` | ``$OBJECT`` | No |  |
| `current_unit` | ``$OBJECT`` | No |  |
| `daily` | ``$OBJECT`` | No |  |
| `daily_unit` | ``$OBJECT`` | No |  |
| `elevation` | ``$NUMBER`` | No |  |
| `generationtime_m` | ``$NUMBER`` | No |  |
| `hourly` | ``$OBJECT`` | No |  |
| `hourly_unit` | ``$OBJECT`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `timezone` | ``$STRING`` | No |  |
| `timezone_abbreviation` | ``$STRING`` | No |  |
| `utc_offset_second` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.WeatherForecast.load({ "id" => "weather_forecast_id" })
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

