# OpenMeteo Golang SDK



The Golang SDK for the OpenMeteo API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Historical(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/open-meteo-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/open-meteo-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/open-meteo-sdk/go=../open-meteo-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/open-meteo-sdk/go"
)

func main() {
    client := sdk.NewOpenMeteoSDK(map[string]any{
        "apikey": os.Getenv("OPEN_METEO_APIKEY"),
    })

    // Load a single historical — the value is the loaded record.
    historical, err := client.Historical(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(historical)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
historical, err := client.Historical(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = historical
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

historical, err := client.Historical(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(historical) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenMeteoSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
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
cd go && go test ./test/...
```


## Reference

### NewOpenMeteoSDK

```go
func NewOpenMeteoSDK(options map[string]any) *OpenMeteoSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenMeteoSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenMeteoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Historical` | `(data map[string]any) OpenMeteoEntity` | Create a Historical entity instance. |
| `MarineForecast` | `(data map[string]any) OpenMeteoEntity` | Create a MarineForecast entity instance. |
| `WeatherForecast` | `(data map[string]any) OpenMeteoEntity` | Create a WeatherForecast entity instance. |

### Entity interface (OpenMeteoEntity)

All entities implement the `OpenMeteoEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    historical, err := client.Historical(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // historical is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Historical

| Field | Description |
| --- | --- |
| `"daily"` |  |
| `"daily_unit"` |  |
| `"elevation"` |  |
| `"generationtime_m"` |  |
| `"hourly"` |  |
| `"hourly_unit"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"timezone"` |  |
| `"timezone_abbreviation"` |  |
| `"utc_offset_second"` |  |

Operations: Load.

API path: `/v1/historical`

#### MarineForecast

| Field | Description |
| --- | --- |
| `"daily"` |  |
| `"daily_unit"` |  |
| `"generationtime_m"` |  |
| `"hourly"` |  |
| `"hourly_unit"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"timezone"` |  |
| `"timezone_abbreviation"` |  |
| `"utc_offset_second"` |  |

Operations: Load.

API path: `/v1/marine-weather`

#### WeatherForecast

| Field | Description |
| --- | --- |
| `"current"` |  |
| `"current_unit"` |  |
| `"daily"` |  |
| `"daily_unit"` |  |
| `"elevation"` |  |
| `"generationtime_m"` |  |
| `"hourly"` |  |
| `"hourly_unit"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"timezone"` |  |
| `"timezone_abbreviation"` |  |
| `"utc_offset_second"` |  |

Operations: Load.

API path: `/v1/forecast`



## Entities


### Historical

Create an instance: `historical := client.Historical(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `map[string]any` |  |
| `daily_unit` | `map[string]any` |  |
| `elevation` | `float64` |  |
| `generationtime_m` | `float64` |  |
| `hourly` | `map[string]any` |  |
| `hourly_unit` | `map[string]any` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_second` | `int` |  |

#### Example: Load

```go
historical, err := client.Historical(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(historical) // the loaded record
```


### MarineForecast

Create an instance: `marineForecast := client.MarineForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `map[string]any` |  |
| `daily_unit` | `map[string]any` |  |
| `generationtime_m` | `float64` |  |
| `hourly` | `map[string]any` |  |
| `hourly_unit` | `map[string]any` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_second` | `int` |  |

#### Example: Load

```go
marineForecast, err := client.MarineForecast(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marineForecast) // the loaded record
```


### WeatherForecast

Create an instance: `weatherForecast := client.WeatherForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `map[string]any` |  |
| `current_unit` | `map[string]any` |  |
| `daily` | `map[string]any` |  |
| `daily_unit` | `map[string]any` |  |
| `elevation` | `float64` |  |
| `generationtime_m` | `float64` |  |
| `hourly` | `map[string]any` |  |
| `hourly_unit` | `map[string]any` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `timezone` | `string` |  |
| `timezone_abbreviation` | `string` |  |
| `utc_offset_second` | `int` |  |

#### Example: Load

```go
weatherForecast, err := client.WeatherForecast(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(weatherForecast) // the loaded record
```


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/open-meteo-sdk/go/
├── open-meteo.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/open-meteo-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
historical := client.Historical(nil)
historical.Load(nil, nil)

// historical.Data() now returns the historical data from the last load
// historical.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
