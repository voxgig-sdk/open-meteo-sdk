# OpenMeteo TypeScript SDK



The TypeScript SDK for the OpenMeteo API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Historical()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/open-meteo-sdk/releases](https://github.com/voxgig-sdk/open-meteo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenMeteoSDK } from '@voxgig-sdk/open-meteo-sdk'

const client = new OpenMeteoSDK({
  apikey: process.env.OPEN_METEO_APIKEY,
})
```

### 3. Load a historical

`load()` returns the entity directly and throws on failure:

```ts
try {
  const historical = await client.Historical().load({ end_date: 'example_end_date', latitude: 1, longitude: 1, start_date: 'example_start_date' })
  console.log(historical)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const marineforecast = await client.MarineForecast().load({ latitude: 1, longitude: 1 })
  console.log(marineforecast)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenMeteoSDK.test()

const marineforecast = await client.MarineForecast().load({ latitude: 1, longitude: 1 })
// marineforecast is the entity, populated with mock response data
// — call marineforecast.data() for the record itself
console.log(marineforecast)
```

You can also use the instance method:

```ts
const client = new OpenMeteoSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.MarineForecast()

// First call runs the operation and stores its result
await entity.load({ latitude: 1, longitude: 1 })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenMeteoSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_METEO_TEST_LIVE=TRUE
OPEN_METEO_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### OpenMeteoSDK

#### Constructor

```ts
new OpenMeteoSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Historical(data?)` | `HistoricalEntity` | Create a Historical entity instance. |
| `MarineForecast(data?)` | `MarineForecastEntity` | Create a MarineForecast entity instance. |
| `WeatherForecast(data?)` | `WeatherForecastEntity` | Create a WeatherForecast entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenMeteoSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenMeteoSDK.test(testopts?, sdkopts?)` | `OpenMeteoSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenMeteoSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

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

Operations: load.

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

Operations: load.

API path: `/v1/forecast`



## Entities


### Historical

Create an instance: `const historical = client.Historical()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `Record<string, any>` |  |
| `daily_units` | `Record<string, any>` |  |
| `elevation` | `number` |  |
| `generationtime_ms` | `number` |  |
| `hourly` | `Record<string, any>` |  |
| `hourly_units` | `Record<string, any>` |  |
| `latitude` | `number` |  |
| `longitude` | `number` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_seconds` | `number` |  |

#### Example: Load

```ts
const historical = await client.Historical().load({ end_date: 'end_date', latitude: 1, longitude: 1, start_date: 'start_date' })
```


### MarineForecast

Create an instance: `const marine_forecast = client.MarineForecast()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `Record<string, any>` |  |
| `daily_units` | `Record<string, any>` |  |
| `generationtime_ms` | `number` |  |
| `hourly` | `Record<string, any>` |  |
| `hourly_units` | `Record<string, any>` |  |
| `latitude` | `number` |  |
| `longitude` | `number` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_seconds` | `number` |  |

#### Example: Load

```ts
const marine_forecast = await client.MarineForecast().load({ latitude: 1, longitude: 1 })
```


### WeatherForecast

Create an instance: `const weather_forecast = client.WeatherForecast()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `Record<string, any>` | Current weather conditions |
| `current_units` | `Record<string, any>` | Units for current weather variables |
| `daily` | `Record<string, any>` | Daily weather data |
| `daily_units` | `Record<string, any>` | Units for daily weather variables |
| `elevation` | `number` | Elevation in meters above sea level |
| `generationtime_ms` | `number` | Generation time of the weather data in milliseconds |
| `hourly` | `Record<string, any>` | Hourly weather data |
| `hourly_units` | `Record<string, any>` | Units for hourly weather variables |
| `latitude` | `number` | WGS84 latitude of the location |
| `longitude` | `number` | WGS84 longitude of the location |
| `timezone` | `string` | Timezone identifier |
| `timezone_abbreviation` | `string` | Timezone abbreviation |
| `utc_offset_seconds` | `number` | UTC offset in seconds |

#### Example: Load

```ts
const weather_forecast = await client.WeatherForecast().load({ latitude: 1, longitude: 1 })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
open-meteo/
├── src/
│   ├── OpenMeteoSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenMeteoSDK } from '@voxgig-sdk/open-meteo-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const marineforecast = client.MarineForecast()
await marineforecast.load({ latitude: 1, longitude: 1 })

// marineforecast.data() now returns the marineforecast data from the last `load`
// marineforecast.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
