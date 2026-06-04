# OpenMeteo SDK

Free, key-less weather data combining national forecast models into gap-free hourly timeseries

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Open Meteo

[Open-Meteo](https://open-meteo.com) is an open-source weather API that stitches together high-resolution forecast models from national meteorological services into continuous, gap-free hourly timeseries. It is community-run and aimed at developers who want a single coordinate-based endpoint instead of integrating each national service directly. No API key is required for non-commercial use.

**What you get from the API:**
- Hourly forecast variables such as `temperature_2m`, `relative_humidity_2m`, `dew_point_2m`, `apparent_temperature`, `precipitation`, `rain`, `showers`, `snowfall`, `precipitation_probability`, `pressure_msl`, `cloud_cover`, `visibility`, `weather_code`, `wind_speed_10m`, `wind_direction_10m`, `wind_gusts_10m` (with 80m/120m/180m wind variants) and `shortwave_radiation` / `direct_radiation` / `diffuse_radiation`.
- Soil variables (`soil_temperature`, `soil_moisture`) at multiple depths.
- Forecast horizon up to 16 days (default 7); historical archive from 1940 to present via reanalysis datasets.
- Marine variables including wave height, direction and period, plus wind-wave and swell components, sea-surface temperature, ocean currents and sea level height.
- Configurable units (Celsius/Fahrenheit, km/h/mph, mm/inches).

Data is sourced from agencies including DWD (Germany), NOAA (USA), ECMWF, Meteo-France, UK Met Office, JMA, KMA, MeteoSwiss, MET Norway, Environment Canada, Australian BOM, CMA, KNMI and DMI. Historical data uses ERA5, ERA5-Land, ERA5-Ensemble, ECMWF IFS and CERRA. No API key is required on the free tier; usage is capped at 10,000 calls/day (and 600/minute, 5,000/hour, 300,000/month).

## Try it

**TypeScript**
```bash
npm install open-meteo
```

**Python**
```bash
pip install open-meteo-sdk
```

**PHP**
```bash
composer require voxgig/open-meteo-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/open-meteo-sdk/go
```

**Ruby**
```bash
gem install open-meteo-sdk
```

**Lua**
```bash
luarocks install open-meteo-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenMeteoSDK } from 'open-meteo'

const client = new OpenMeteoSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o open-meteo-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "open-meteo": {
      "command": "/abs/path/to/open-meteo-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Historical** | Gap-free historical weather timeseries from 1940 to the present via `/v1/archive`, sourced from ERA5, ERA5-Land, ECMWF IFS and CERRA reanalysis datasets. | `/v1/historical` |
| **MarineForecast** | Hourly marine forecast for a coastal coordinate via `/v1/marine`, returning wave height/direction/period plus wind-wave and swell components, ocean currents and sea-surface temperature. | `/v1/marine-weather` |
| **WeatherForecast** | Hourly and daily weather forecast (up to 16 days) for a latitude/longitude via `/v1/forecast`, covering temperature, precipitation, wind, radiation, pressure, cloud cover and soil variables. | `/v1/forecast` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openmeteo_sdk import OpenMeteoSDK

client = OpenMeteoSDK({})


# Load a specific historical
historical, err = client.Historical(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'openmeteo_sdk.php';

$client = new OpenMeteoSDK([]);


// Load a specific historical
[$historical, $err] = $client->Historical(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/open-meteo-sdk/go"

client := sdk.NewOpenMeteoSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "OpenMeteo_sdk"

client = OpenMeteoSDK.new({})


# Load a specific historical
historical, err = client.Historical(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("open-meteo_sdk")

local client = sdk.new({})


-- Load a specific historical
local historical, err = client:Historical(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenMeteoSDK.test()
const result = await client.Historical().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenMeteoSDK.test(None, None)
result, err = client.Historical(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenMeteoSDK::test(null, null);
[$result, $err] = $client->Historical(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Historical(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenMeteoSDK.test(nil, nil)
result, err = client.Historical(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Historical(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Open Meteo

- Upstream: [https://open-meteo.com](https://open-meteo.com)
- API docs: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

- Weather data is published under **CC BY 4.0** — attribution is required, including for paid commercial use.
- Credit **Open-Meteo** and the underlying national weather services whose models are used (e.g. DWD, NOAA, ECMWF, Meteo-France, UK Met Office, JMA, MeteoSwiss, MET Norway).
- The free API tier is **non-commercial only**; commercial use requires a paid plan via a dedicated customer endpoint — see https://open-meteo.com/en/pricing.
- Free-tier request caps: 600/minute, 5,000/hour, 10,000/day, 300,000/month.

---

Generated from the Open Meteo OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
