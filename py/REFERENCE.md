# OpenMeteo Python SDK Reference

Complete API reference for the OpenMeteo Python SDK.


## OpenMeteoSDK

### Constructor

```python
from open-meteo_sdk import OpenMeteoSDK

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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## HistoricalEntity

```python
historical = client.Historical()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Historical().load({"id": "historical_id"})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.MarineForecast().load({"id": "marine_forecast_id"})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.WeatherForecast().load({"id": "weather_forecast_id"})
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

