# OpenMeteo TypeScript SDK Reference

Complete API reference for the OpenMeteo TypeScript SDK.


## OpenMeteoSDK

### Constructor

```ts
new OpenMeteoSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMeteoSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenMeteoSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenMeteoSDK` instance in test mode.


### Instance Methods

#### `Historical(data?: object)`

Create a new `Historical` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HistoricalEntity` instance.

#### `MarineForecast(data?: object)`

Create a new `MarineForecast` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarineForecastEntity` instance.

#### `WeatherForecast(data?: object)`

Create a new `WeatherForecast` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WeatherForecastEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenMeteoSDK.test()`.

**Returns:** `OpenMeteoSDK` instance in test mode.


---

## HistoricalEntity

```ts
const historical = client.Historical()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Historical().load({ id: 'historical_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMeteoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarineForecastEntity

```ts
const marine_forecast = client.MarineForecast()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MarineForecast().load({ id: 'marine_forecast_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarineForecastEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMeteoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WeatherForecastEntity

```ts
const weather_forecast = client.WeatherForecast()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WeatherForecast().load({ id: 'weather_forecast_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMeteoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenMeteoSDK({
  feature: {
    test: { active: true },
  }
})
```

