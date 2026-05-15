# OpenMeteo Golang SDK

The Golang SDK for the OpenMeteo API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/open-meteo-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/open-meteo-sdk=../path/to/github.com/voxgig-sdk/open-meteo-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/open-meteo-sdk"
    "github.com/voxgig-sdk/open-meteo-sdk/core"
)

func main() {
    client := sdk.NewOpenMeteoSDK(map[string]any{
        "apikey": os.Getenv("OPEN-METEO_APIKEY"),
    })
```

### 3. Load a historical

```go
    result, err = client.Historical(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
OPEN-METEO_TEST_LIVE=TRUE
OPEN-METEO_APIKEY=<your-key>
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
| `Marine` | `(data map[string]any) OpenMeteoEntity` | Create a Marine entity instance. |
| `WeatherForecast` | `(data map[string]any) OpenMeteoEntity` | Create a WeatherForecast entity instance. |

### Entity interface (OpenMeteoEntity)

All entities implement the `OpenMeteoEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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

#### Marine

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

API path: `/v1/marine`

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
| `daily` | ``$OBJECT`` |  |
| `daily_unit` | ``$OBJECT`` |  |
| `elevation` | ``$NUMBER`` |  |
| `generationtime_m` | ``$NUMBER`` |  |
| `hourly` | ``$OBJECT`` |  |
| `hourly_unit` | ``$OBJECT`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `timezone` | ``$STRING`` |  |
| `timezone_abbreviation` | ``$STRING`` |  |
| `utc_offset_second` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Historical(nil).Load(map[string]any{"id": "historical_id"}, nil)
```


### Marine

Create an instance: `marine := client.Marine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | ``$OBJECT`` |  |
| `daily_unit` | ``$OBJECT`` |  |
| `generationtime_m` | ``$NUMBER`` |  |
| `hourly` | ``$OBJECT`` |  |
| `hourly_unit` | ``$OBJECT`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `timezone` | ``$STRING`` |  |
| `timezone_abbreviation` | ``$STRING`` |  |
| `utc_offset_second` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Marine(nil).Load(map[string]any{"id": "marine_id"}, nil)
```


### WeatherForecast

Create an instance: `weather_forecast := client.WeatherForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | ``$OBJECT`` |  |
| `current_unit` | ``$OBJECT`` |  |
| `daily` | ``$OBJECT`` |  |
| `daily_unit` | ``$OBJECT`` |  |
| `elevation` | ``$NUMBER`` |  |
| `generationtime_m` | ``$NUMBER`` |  |
| `hourly` | ``$OBJECT`` |  |
| `hourly_unit` | ``$OBJECT`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `timezone` | ``$STRING`` |  |
| `timezone_abbreviation` | ``$STRING`` |  |
| `utc_offset_second` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.WeatherForecast(nil).Load(map[string]any{"id": "weather_forecast_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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
github.com/voxgig-sdk/open-meteo-sdk/
├── open-meteo.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/open-meteo-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
