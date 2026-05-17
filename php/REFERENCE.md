# OpenMeteo PHP SDK Reference

Complete API reference for the OpenMeteo PHP SDK.


## OpenMeteoSDK

### Constructor

```php
require_once __DIR__ . '/open-meteo_sdk.php';

$client = new OpenMeteoSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMeteoSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenMeteoSDK::test();
```


### Instance Methods

#### `Historical($data = null)`

Create a new `HistoricalEntity` instance. Pass `null` for no initial data.

#### `MarineForecast($data = null)`

Create a new `MarineForecastEntity` instance. Pass `null` for no initial data.

#### `WeatherForecast($data = null)`

Create a new `WeatherForecastEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## HistoricalEntity

```php
$historical = $client->Historical();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Historical()->load(["id" => "historical_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HistoricalEntity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MarineForecastEntity

```php
$marine_forecast = $client->MarineForecast();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->MarineForecast()->load(["id" => "marine_forecast_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MarineForecastEntity`

Create a new `MarineForecastEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WeatherForecastEntity

```php
$weather_forecast = $client->WeatherForecast();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->WeatherForecast()->load(["id" => "weather_forecast_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WeatherForecastEntity`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OpenMeteoSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

