# OpenMeteo PHP SDK



The PHP SDK for the OpenMeteo API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Historical()` — with named operations (`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/open-meteo-sdk/releases](https://github.com/voxgig-sdk/open-meteo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openmeteo_sdk.php';

$client = new OpenMeteoSDK([
    "apikey" => getenv("OPEN_METEO_APIKEY"),
]);
```

### 3. Load a historical

```php
try {
    // load() returns the ENTITY — call data_get() for the Historical record (throws on error).
    $historical = $client->Historical()->load(["end_date" => "example_end_date", "latitude" => 1, "longitude" => 1, "start_date" => "example_start_date"]);
    print_r($historical);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $marineforecast = $client->MarineForecast()->load(["latitude" => 1, "longitude" => 1]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpenMeteoSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$marineforecast = $client->MarineForecast()->load(["latitude" => 1, "longitude" => 1]);
print_r($marineforecast);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenMeteoSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_METEO_TEST_LIVE=TRUE
OPEN_METEO_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenMeteoSDK

```php
require_once 'openmeteo_sdk.php';
$client = new OpenMeteoSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenMeteoSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenMeteoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Historical` | `($data): HistoricalEntity` | Create a Historical entity instance. |
| `MarineForecast` | `($data): MarineForecastEntity` | Create a MarineForecast entity instance. |
| `WeatherForecast` | `($data): WeatherForecastEntity` | Create a WeatherForecast entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Historical

| Field | Description |
| --- | --- |
| `daily` |  |
| `daily_units` |  |
| `elevation` |  |
| `generationtime_ms` |  |
| `hourly` |  |
| `hourly_units` |  |
| `latitude` |  |
| `longitude` |  |
| `timezone` |  |
| `timezone_abbreviation` |  |
| `utc_offset_seconds` |  |

Operations: Load.

API path: `/v1/historical`

#### MarineForecast

| Field | Description |
| --- | --- |
| `daily` |  |
| `daily_units` |  |
| `generationtime_ms` |  |
| `hourly` |  |
| `hourly_units` |  |
| `latitude` |  |
| `longitude` |  |
| `timezone` |  |
| `timezone_abbreviation` |  |
| `utc_offset_seconds` |  |

Operations: Load.

API path: `/v1/marine-weather`

#### WeatherForecast

| Field | Description |
| --- | --- |
| `current` | Current weather conditions |
| `current_units` | Units for current weather variables |
| `daily` | Daily weather data |
| `daily_units` | Units for daily weather variables |
| `elevation` | Elevation in meters above sea level |
| `generationtime_ms` | Generation time of the weather data in milliseconds |
| `hourly` | Hourly weather data |
| `hourly_units` | Units for hourly weather variables |
| `latitude` | WGS84 latitude of the location |
| `longitude` | WGS84 longitude of the location |
| `timezone` | Timezone identifier |
| `timezone_abbreviation` | Timezone abbreviation |
| `utc_offset_seconds` | UTC offset in seconds |

Operations: Load.

API path: `/v1/forecast`



## Entities


### Historical

Create an instance: `$historical = $client->Historical();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `array` |  |
| `daily_units` | `array` |  |
| `elevation` | `float` |  |
| `generationtime_ms` | `float` |  |
| `hourly` | `array` |  |
| `hourly_units` | `array` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_seconds` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Historical record (throws on error).
$historical = $client->Historical()->load(["end_date" => "end_date", "latitude" => 1, "longitude" => 1, "start_date" => "start_date"]);
```


### MarineForecast

Create an instance: `$marine_forecast = $client->MarineForecast();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `array` |  |
| `daily_units` | `array` |  |
| `generationtime_ms` | `float` |  |
| `hourly` | `array` |  |
| `hourly_units` | `array` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_seconds` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MarineForecast record (throws on error).
$marine_forecast = $client->MarineForecast()->load(["latitude" => 1, "longitude" => 1]);
```


### WeatherForecast

Create an instance: `$weather_forecast = $client->WeatherForecast();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `array` | Current weather conditions |
| `current_units` | `array` | Units for current weather variables |
| `daily` | `array` | Daily weather data |
| `daily_units` | `array` | Units for daily weather variables |
| `elevation` | `float` | Elevation in meters above sea level |
| `generationtime_ms` | `float` | Generation time of the weather data in milliseconds |
| `hourly` | `array` | Hourly weather data |
| `hourly_units` | `array` | Units for hourly weather variables |
| `latitude` | `float` | WGS84 latitude of the location |
| `longitude` | `float` | WGS84 longitude of the location |
| `timezone` | `string` | Timezone identifier |
| `timezone_abbreviation` | `string` | Timezone abbreviation |
| `utc_offset_seconds` | `int` | UTC offset in seconds |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WeatherForecast record (throws on error).
$weather_forecast = $client->WeatherForecast()->load(["latitude" => 1, "longitude" => 1]);
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openmeteo_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openmeteo_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$marineforecast = $client->MarineForecast();
$marineforecast->load(["latitude" => 1, "longitude" => 1]);

// $marineforecast->data_get() now returns the marineforecast data from the last load
// $marineforecast->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
