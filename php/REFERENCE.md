# OpenMeteo PHP SDK Reference

Complete API reference for the OpenMeteo PHP SDK.


## OpenMeteoSDK

### Constructor

```php
require_once __DIR__ . '/openmeteo_sdk.php';

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

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OpenMeteoUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

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

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## HistoricalEntity

```php
$historical = $client->Historical();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `array` | No |  |
| `daily_units` | `array` | No |  |
| `elevation` | `float` | No |  |
| `generationtime_ms` | `float` | No |  |
| `hourly` | `array` | No |  |
| `hourly_units` | `array` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_seconds` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Historical()->load(["end_date" => "end_date", "latitude" => 1, "longitude" => 1, "start_date" => "start_date"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HistoricalEntity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarineForecastEntity

```php
$marine_forecast = $client->MarineForecast();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `array` | No |  |
| `daily_units` | `array` | No |  |
| `generationtime_ms` | `float` | No |  |
| `hourly` | `array` | No |  |
| `hourly_units` | `array` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `timezone` | `string` | No |  |
| `timezone_abbreviation` | `string` | No |  |
| `utc_offset_seconds` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MarineForecast()->load(["latitude" => 1, "longitude" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarineForecastEntity`

Create a new `MarineForecastEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WeatherForecastEntity

```php
$weather_forecast = $client->WeatherForecast();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `array` | No | Current weather conditions |
| `current_units` | `array` | No | Units for current weather variables |
| `daily` | `array` | No | Daily weather data |
| `daily_units` | `array` | No | Units for daily weather variables |
| `elevation` | `float` | No | Elevation in meters above sea level |
| `generationtime_ms` | `float` | No | Generation time of the weather data in milliseconds |
| `hourly` | `array` | No | Hourly weather data |
| `hourly_units` | `array` | No | Units for hourly weather variables |
| `latitude` | `float` | No | WGS84 latitude of the location |
| `longitude` | `float` | No | WGS84 longitude of the location |
| `timezone` | `string` | No | Timezone identifier |
| `timezone_abbreviation` | `string` | No | Timezone abbreviation |
| `utc_offset_seconds` | `int` | No | UTC offset in seconds |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WeatherForecast()->load(["latitude" => 1, "longitude" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WeatherForecastEntity`

Create a new `WeatherForecastEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```php
$client = new OpenMeteoSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

