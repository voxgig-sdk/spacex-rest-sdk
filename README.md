# SpacexRest SDK

Open-source REST API for SpaceX launches, rockets, capsules, cores, crew, payloads, pads, and Starlink data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About SpaceX REST API

The [SpaceX REST API](https://github.com/r-spacex/SpaceX-API) is an open-source, community-maintained catalogue of SpaceX launches, vehicles, infrastructure, crew, and Starlink satellites. It is run by volunteer contributors at the [r-spacex](https://github.com/r-spacex) GitHub organisation and is independent of SpaceX itself. This SDK targets the `v5` base URL at `https://api.spacexdata.com/v5`.

What you can pull from the API:

- Past, upcoming, and "latest"/"next" launches with mission details and payloads.
- Rockets, cores, and capsules — including reuse history and current status.
- Launchpads and landing pads, with locations and status.
- Crew members, payloads, the Tesla Roadster trajectory, ships, and Starlink satellite TLE data.

The API is read-only and CORS-enabled, so it can be called directly from browser apps. No API key or authentication is required for the public endpoints. Published rate-limit numbers are not documented in the public docs; treat the service as best-effort and cache responses where possible.

## Try it

**TypeScript**
```bash
npm install spacex-rest
```

**Python**
```bash
pip install spacex-rest-sdk
```

**PHP**
```bash
composer require voxgig/spacex-rest-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/spacex-rest-sdk/go
```

**Ruby**
```bash
gem install spacex-rest-sdk
```

**Lua**
```bash
luarocks install spacex-rest-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { SpacexRestSDK } from 'spacex-rest'

const client = new SpacexRestSDK({})

// List all capsules
const capsules = await client.Capsule().list()
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
cd go-mcp && go build -o spacex-rest-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "spacex-rest": {
      "command": "/abs/path/to/spacex-rest-mcp"
    }
  }
}
```

## Entities

The API exposes 11 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Capsule** | Dragon capsule serial numbers with reuse counts, status, and mission history — `/capsules`. | `/capsules` |
| **Core** | First-stage booster cores, including reuse, landing attempts, and current status — `/cores`. | `/cores` |
| **Crew** | Astronauts and crew members who have flown on SpaceX missions, with agency and status — `/crew`. | `/crew` |
| **Landpad** | Landing pads and droneships used for booster recovery, with location and status — `/landpads`. | `/landpads` |
| **Launch** | Launch missions (past, upcoming, latest, next) with payloads, cores, links, and outcomes — `/launches`. | `/launches` |
| **Launchpad** | Launch facilities such as LC-39A or SLC-40, with location, status, and associated rockets — `/launchpads`. | `/launchpads` |
| **Payload** | Payloads carried on launches, including mass, orbit, customers, and manufacturer — `/payloads`. | `/payloads` |
| **Roadster** | Telemetry for the Tesla Roadster launched on Falcon Heavy's demo flight — `/roadster`. | `/roadster` |
| **Rocket** | Rocket families (Falcon 1, Falcon 9, Falcon Heavy, Starship) with specs and success rates — `/rockets`. | `/rockets` |
| **Ship** | Recovery and support ships in the SpaceX fleet, with roles, ports, and status — `/ships`. | `/ships` |
| **Starlink** | Individual Starlink satellites with TLE orbital elements and launch references — `/starlink`. | `/starlink` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from spacexrest_sdk import SpacexRestSDK

client = SpacexRestSDK({})

# List all capsules
capsules, err = client.Capsule(None).list(None, None)

# Load a specific capsule
capsule, err = client.Capsule(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'spacexrest_sdk.php';

$client = new SpacexRestSDK([]);

// List all capsules
[$capsules, $err] = $client->Capsule(null)->list(null, null);

// Load a specific capsule
[$capsule, $err] = $client->Capsule(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/spacex-rest-sdk/go"

client := sdk.NewSpacexRestSDK(map[string]any{})

// List all capsules
capsules, err := client.Capsule(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "SpacexRest_sdk"

client = SpacexRestSDK.new({})

# List all capsules
capsules, err = client.Capsule(nil).list(nil, nil)

# Load a specific capsule
capsule, err = client.Capsule(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("spacex-rest_sdk")

local client = sdk.new({})

-- List all capsules
local capsules, err = client:Capsule(nil):list(nil, nil)

-- Load a specific capsule
local capsule, err = client:Capsule(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = SpacexRestSDK.test()
const result = await client.Capsule().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = SpacexRestSDK.test(None, None)
result, err = client.Capsule(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = SpacexRestSDK::test(null, null);
[$result, $err] = $client->Capsule(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Capsule(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SpacexRestSDK.test(nil, nil)
result, err = client.Capsule(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Capsule(nil):load(
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

## Using the SpaceX REST API

- Upstream: [https://github.com/r-spacex/SpaceX-API](https://github.com/r-spacex/SpaceX-API)
- API docs: [https://github.com/r-spacex/SpaceX-API/tree/master/docs](https://github.com/r-spacex/SpaceX-API/tree/master/docs)

- Source code and data are released under the [Apache License 2.0](https://github.com/r-spacex/SpaceX-API/blob/master/LICENSE).
- Maintained by the [r-spacex](https://github.com/r-spacex) community; this project is **not affiliated with, endorsed by, or associated with Space Exploration Technologies Corp** (SpaceX).
- Attribution to the r-spacex project is appreciated when reusing data.
- Operational status and backups are published separately at [status.spacexdata.com](https://status.spacexdata.com) and [backups.spacexdata.com](https://backups.spacexdata.com).

---

Generated from the SpaceX REST API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
