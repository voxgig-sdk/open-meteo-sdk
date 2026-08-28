# OpenMeteo Python SDK Reference

Complete API reference for the OpenMeteo Python SDK.


## OpenMeteoSDK

### Constructor

```python
from openmeteo_sdk import OpenMeteoSDK

client = OpenMeteoSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMeteoSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenMeteoSDK.test()
```


### Instance Methods

#### `Historical(data=None)`

Create a new `HistoricalEntity` instance. Pass `None` for no initial data.

#### `MarineForecast(data=None)`

Create a new `MarineForecastEntity` instance. Pass `None` for no initial data.

#### `WeatherForecast(data=None)`

Create a new `WeatherForecastEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## HistoricalEntity

```python
historical = client.Historical()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `dict` | No |  |
| `daily_units` | `dict` | No |  |
| `elevation` | `float` | No |  |
| `generationtime_ms` | `float` | No |  |
| `hourly` | `dict` | No |  |
| `hourly_units` | `dict` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `timezone` | `str` | No |  |
| `timezone_abbreviation` | `str` | No |  |
| `utc_offset_seconds` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Historical().load({"end_date": "end_date", "latitude": 1, "longitude": 1, "start_date": "start_date"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoricalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarineForecastEntity

```python
marine_forecast = client.MarineForecast()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `dict` | No |  |
| `daily_units` | `dict` | No |  |
| `generationtime_ms` | `float` | No |  |
| `hourly` | `dict` | No |  |
| `hourly_units` | `dict` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `timezone` | `str` | No |  |
| `timezone_abbreviation` | `str` | No |  |
| `utc_offset_seconds` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MarineForecast().load({"latitude": 1, "longitude": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarineForecastEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WeatherForecastEntity

```python
weather_forecast = client.WeatherForecast()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `dict` | No | Current weather conditions |
| `current_units` | `dict` | No | Units for current weather variables |
| `daily` | `dict` | No | Daily weather data |
| `daily_units` | `dict` | No | Units for daily weather variables |
| `elevation` | `float` | No | Elevation in meters above sea level |
| `generationtime_ms` | `float` | No | Generation time of the weather data in milliseconds |
| `hourly` | `dict` | No | Hourly weather data |
| `hourly_units` | `dict` | No | Units for hourly weather variables |
| `latitude` | `float` | No | WGS84 latitude of the location |
| `longitude` | `float` | No | WGS84 longitude of the location |
| `timezone` | `str` | No | Timezone identifier |
| `timezone_abbreviation` | `str` | No | Timezone abbreviation |
| `utc_offset_seconds` | `int` | No | UTC offset in seconds |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WeatherForecast().load({"latitude": 1, "longitude": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeatherForecastEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpenMeteoSDK({
    "feature": {
        "test": {"active": True},
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

