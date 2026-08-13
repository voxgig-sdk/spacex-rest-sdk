# SpacexRest Golang SDK



The Golang SDK for the SpacexRest API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Capsule(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/spacex-rest-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/spacex-rest-sdk/go=../spacex-rest-sdk/go
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
    sdk "github.com/voxgig-sdk/spacex-rest-sdk/go"
)

func main() {
    client := sdk.New()

    // List capsule records — the value is the array of records itself.
    capsules, err := client.Capsule(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range capsules.([]any) {
        fmt.Println(item)
    }

    // Load a single capsule — the value is the loaded record.
    capsule, err := client.Capsule(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(capsule)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
landpads, err := client.Landpad(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = landpads
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

landpad, err := client.Landpad(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(landpad) // the returned mock data
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

client := sdk.NewSpacexRestSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SPACEX_REST_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewSpacexRestSDK

```go
func NewSpacexRestSDK(options map[string]any) *SpacexRestSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *SpacexRestSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SpacexRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Capsule` | `(data map[string]any) SpacexRestEntity` | Create a Capsule entity instance. |
| `Core` | `(data map[string]any) SpacexRestEntity` | Create a Core entity instance. |
| `Crew` | `(data map[string]any) SpacexRestEntity` | Create a Crew entity instance. |
| `Landpad` | `(data map[string]any) SpacexRestEntity` | Create a Landpad entity instance. |
| `Launch` | `(data map[string]any) SpacexRestEntity` | Create a Launch entity instance. |
| `Launchpad` | `(data map[string]any) SpacexRestEntity` | Create a Launchpad entity instance. |
| `Payload` | `(data map[string]any) SpacexRestEntity` | Create a Payload entity instance. |
| `Roadster` | `(data map[string]any) SpacexRestEntity` | Create a Roadster entity instance. |
| `Rocket` | `(data map[string]any) SpacexRestEntity` | Create a Rocket entity instance. |
| `Ship` | `(data map[string]any) SpacexRestEntity` | Create a Ship entity instance. |
| `Starlink` | `(data map[string]any) SpacexRestEntity` | Create a Starlink entity instance. |

### Entity interface (SpacexRestEntity)

All entities implement the `SpacexRestEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
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
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    capsule, err := client.Capsule(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // capsule is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Capsule

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"land_landings"` |  |
| `"last_update"` |  |
| `"launches"` |  |
| `"reuse_count"` |  |
| `"serial"` |  |
| `"status"` |  |
| `"type"` |  |
| `"water_landings"` |  |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `"asds_attempts"` |  |
| `"asds_landings"` |  |
| `"block"` |  |
| `"id"` |  |
| `"last_update"` |  |
| `"launches"` |  |
| `"reuse_count"` |  |
| `"rtls_attempts"` |  |
| `"rtls_landings"` |  |
| `"serial"` |  |
| `"status"` |  |

Operations: List, Load.

API path: `/cores`

#### Crew

| Field | Description |
| --- | --- |
| `"agency"` |  |
| `"id"` |  |
| `"image"` |  |
| `"launches"` |  |
| `"name"` |  |
| `"status"` |  |
| `"wikipedia"` |  |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `"details"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"landing_attempts"` |  |
| `"landing_successes"` |  |
| `"latitude"` |  |
| `"launches"` |  |
| `"locality"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"region"` |  |
| `"status"` |  |
| `"type"` |  |
| `"wikipedia"` |  |

Operations: List, Load.

API path: `/landpads`

#### Launch

| Field | Description |
| --- | --- |
| `"auto_update"` |  |
| `"capsules"` |  |
| `"core"` |  |
| `"cores"` |  |
| `"crew"` |  |
| `"date_local"` |  |
| `"date_precision"` |  |
| `"date_unix"` |  |
| `"date_utc"` |  |
| `"details"` |  |
| `"failures"` |  |
| `"fairings"` |  |
| `"flight"` |  |
| `"flight_number"` |  |
| `"gridfins"` |  |
| `"id"` |  |
| `"landing_attempt"` |  |
| `"landing_success"` |  |
| `"landing_type"` |  |
| `"landpad"` |  |
| `"launchpad"` |  |
| `"legs"` |  |
| `"links"` |  |
| `"name"` |  |
| `"net"` |  |
| `"payloads"` |  |
| `"reused"` |  |
| `"rocket"` |  |
| `"ships"` |  |
| `"static_fire_date_unix"` |  |
| `"static_fire_date_utc"` |  |
| `"success"` |  |
| `"tdb"` |  |
| `"upcoming"` |  |
| `"window"` |  |

Operations: List, Load.

API path: `/launches`

#### Launchpad

| Field | Description |
| --- | --- |
| `"details"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"latitude"` |  |
| `"launch_attempts"` |  |
| `"launch_successes"` |  |
| `"launches"` |  |
| `"locality"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"region"` |  |
| `"rockets"` |  |
| `"status"` |  |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `"apoapsis_km"` |  |
| `"arg_of_pericenter"` |  |
| `"customers"` |  |
| `"eccentricity"` |  |
| `"epoch"` |  |
| `"id"` |  |
| `"inclination_deg"` |  |
| `"launch"` |  |
| `"lifespan_years"` |  |
| `"longitude"` |  |
| `"manufacturers"` |  |
| `"mass_kg"` |  |
| `"mass_lbs"` |  |
| `"mean_anomaly"` |  |
| `"mean_motion"` |  |
| `"name"` |  |
| `"nationalities"` |  |
| `"norad_ids"` |  |
| `"orbit"` |  |
| `"periapsis_km"` |  |
| `"period_min"` |  |
| `"raan"` |  |
| `"reference_system"` |  |
| `"regime"` |  |
| `"reused"` |  |
| `"semi_major_axis_km"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/payloads`

#### Roadster

| Field | Description |
| --- | --- |
| `"apoapsis_au"` |  |
| `"details"` |  |
| `"earth_distance_km"` |  |
| `"earth_distance_mi"` |  |
| `"eccentricity"` |  |
| `"epoch_jd"` |  |
| `"flickr_images"` |  |
| `"id"` |  |
| `"inclination"` |  |
| `"launch_date_unix"` |  |
| `"launch_date_utc"` |  |
| `"launch_mass_kg"` |  |
| `"launch_mass_lbs"` |  |
| `"longitude"` |  |
| `"mars_distance_km"` |  |
| `"mars_distance_mi"` |  |
| `"name"` |  |
| `"norad_id"` |  |
| `"orbit_type"` |  |
| `"periapsis_arg"` |  |
| `"periapsis_au"` |  |
| `"period_days"` |  |
| `"semi_major_axis_au"` |  |
| `"speed_kph"` |  |
| `"speed_mph"` |  |
| `"video"` |  |
| `"wikipedia"` |  |

Operations: List.

API path: `/roadster`

#### Rocket

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"boosters"` |  |
| `"company"` |  |
| `"cost_per_launch"` |  |
| `"country"` |  |
| `"description"` |  |
| `"diameter"` |  |
| `"first_flight"` |  |
| `"flickr_images"` |  |
| `"height"` |  |
| `"id"` |  |
| `"mass"` |  |
| `"name"` |  |
| `"stages"` |  |
| `"success_rate_pct"` |  |
| `"type"` |  |
| `"wikipedia"` |  |

Operations: List, Load.

API path: `/rockets`

#### Ship

| Field | Description |
| --- | --- |
| `"abs"` |  |
| `"class"` |  |
| `"course_deg"` |  |
| `"home_port"` |  |
| `"id"` |  |
| `"image"` |  |
| `"imo"` |  |
| `"last_ais_update"` |  |
| `"latitude"` |  |
| `"launches"` |  |
| `"legacy_id"` |  |
| `"link"` |  |
| `"longitude"` |  |
| `"mass_kg"` |  |
| `"mass_lbs"` |  |
| `"mmsi"` |  |
| `"model"` |  |
| `"name"` |  |
| `"roles"` |  |
| `"speed_kn"` |  |
| `"status"` |  |
| `"type"` |  |
| `"year_built"` |  |

Operations: List, Load.

API path: `/ships`

#### Starlink

| Field | Description |
| --- | --- |
| `"height_km"` |  |
| `"id"` |  |
| `"latitude"` |  |
| `"launch"` |  |
| `"longitude"` |  |
| `"spaceTrack"` |  |
| `"velocity_kms"` |  |
| `"version"` |  |

Operations: List, Load.

API path: `/starlink`



## Entities


### Capsule

Create an instance: `capsule := client.Capsule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `land_landings` | `int` |  |
| `last_update` | `string` |  |
| `launches` | `[]any` |  |
| `reuse_count` | `int` |  |
| `serial` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `water_landings` | `int` |  |

#### Example: Load

```go
capsule, err := client.Capsule(nil).Load(map[string]any{"id": "capsule_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(capsule) // the loaded record
```

#### Example: List

```go
capsules, err := client.Capsule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(capsules) // the array of records
```


### Core

Create an instance: `core := client.Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asds_attempts` | `int` |  |
| `asds_landings` | `int` |  |
| `block` | `int` |  |
| `id` | `string` |  |
| `last_update` | `string` |  |
| `launches` | `[]any` |  |
| `reuse_count` | `int` |  |
| `rtls_attempts` | `int` |  |
| `rtls_landings` | `int` |  |
| `serial` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```go
core, err := client.Core(nil).Load(map[string]any{"id": "core_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(core) // the loaded record
```

#### Example: List

```go
cores, err := client.Core(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cores) // the array of records
```


### Crew

Create an instance: `crew := client.Crew(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `launches` | `[]any` |  |
| `name` | `string` |  |
| `status` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```go
crew, err := client.Crew(nil).Load(map[string]any{"id": "crew_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(crew) // the loaded record
```

#### Example: List

```go
crews, err := client.Crew(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(crews) // the array of records
```


### Landpad

Create an instance: `landpad := client.Landpad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `landing_attempts` | `int` |  |
| `landing_successes` | `int` |  |
| `latitude` | `float64` |  |
| `launches` | `[]any` |  |
| `locality` | `string` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```go
landpad, err := client.Landpad(nil).Load(map[string]any{"id": "landpad_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(landpad) // the loaded record
```

#### Example: List

```go
landpads, err := client.Landpad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(landpads) // the array of records
```


### Launch

Create an instance: `launch := client.Launch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | `bool` |  |
| `capsules` | `[]any` |  |
| `core` | `string` |  |
| `cores` | `[]any` |  |
| `crew` | `[]any` |  |
| `date_local` | `string` |  |
| `date_precision` | `string` |  |
| `date_unix` | `int` |  |
| `date_utc` | `string` |  |
| `details` | `string` |  |
| `failures` | `[]any` |  |
| `fairings` | `map[string]any` |  |
| `flight` | `int` |  |
| `flight_number` | `int` |  |
| `gridfins` | `bool` |  |
| `id` | `string` |  |
| `landing_attempt` | `bool` |  |
| `landing_success` | `bool` |  |
| `landing_type` | `string` |  |
| `landpad` | `string` |  |
| `launchpad` | `string` |  |
| `legs` | `bool` |  |
| `links` | `map[string]any` |  |
| `name` | `string` |  |
| `net` | `bool` |  |
| `payloads` | `[]any` |  |
| `reused` | `bool` |  |
| `rocket` | `string` |  |
| `ships` | `[]any` |  |
| `static_fire_date_unix` | `int` |  |
| `static_fire_date_utc` | `string` |  |
| `success` | `bool` |  |
| `tdb` | `bool` |  |
| `upcoming` | `bool` |  |
| `window` | `int` |  |

#### Example: Load

```go
launch, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(launch) // the loaded record
```

#### Example: List

```go
launchs, err := client.Launch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(launchs) // the array of records
```


### Launchpad

Create an instance: `launchpad := client.Launchpad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `latitude` | `float64` |  |
| `launch_attempts` | `int` |  |
| `launch_successes` | `int` |  |
| `launches` | `[]any` |  |
| `locality` | `string` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `rockets` | `[]any` |  |
| `status` | `string` |  |

#### Example: Load

```go
launchpad, err := client.Launchpad(nil).Load(map[string]any{"id": "launchpad_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(launchpad) // the loaded record
```

#### Example: List

```go
launchpads, err := client.Launchpad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(launchpads) // the array of records
```


### Payload

Create an instance: `payload := client.Payload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_km` | `float64` |  |
| `arg_of_pericenter` | `float64` |  |
| `customers` | `[]any` |  |
| `eccentricity` | `float64` |  |
| `epoch` | `string` |  |
| `id` | `string` |  |
| `inclination_deg` | `float64` |  |
| `launch` | `string` |  |
| `lifespan_years` | `float64` |  |
| `longitude` | `float64` |  |
| `manufacturers` | `[]any` |  |
| `mass_kg` | `float64` |  |
| `mass_lbs` | `float64` |  |
| `mean_anomaly` | `float64` |  |
| `mean_motion` | `float64` |  |
| `name` | `string` |  |
| `nationalities` | `[]any` |  |
| `norad_ids` | `[]any` |  |
| `orbit` | `string` |  |
| `periapsis_km` | `float64` |  |
| `period_min` | `float64` |  |
| `raan` | `float64` |  |
| `reference_system` | `string` |  |
| `regime` | `string` |  |
| `reused` | `bool` |  |
| `semi_major_axis_km` | `float64` |  |
| `type` | `string` |  |

#### Example: Load

```go
payload, err := client.Payload(nil).Load(map[string]any{"id": "payload_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(payload) // the loaded record
```

#### Example: List

```go
payloads, err := client.Payload(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(payloads) // the array of records
```


### Roadster

Create an instance: `roadster := client.Roadster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_au` | `float64` |  |
| `details` | `string` |  |
| `earth_distance_km` | `float64` |  |
| `earth_distance_mi` | `float64` |  |
| `eccentricity` | `float64` |  |
| `epoch_jd` | `float64` |  |
| `flickr_images` | `[]any` |  |
| `id` | `string` |  |
| `inclination` | `float64` |  |
| `launch_date_unix` | `int` |  |
| `launch_date_utc` | `string` |  |
| `launch_mass_kg` | `int` |  |
| `launch_mass_lbs` | `int` |  |
| `longitude` | `float64` |  |
| `mars_distance_km` | `float64` |  |
| `mars_distance_mi` | `float64` |  |
| `name` | `string` |  |
| `norad_id` | `int` |  |
| `orbit_type` | `string` |  |
| `periapsis_arg` | `float64` |  |
| `periapsis_au` | `float64` |  |
| `period_days` | `float64` |  |
| `semi_major_axis_au` | `float64` |  |
| `speed_kph` | `float64` |  |
| `speed_mph` | `float64` |  |
| `video` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: List

```go
roadsters, err := client.Roadster(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(roadsters) // the array of records
```


### Rocket

Create an instance: `rocket := client.Rocket(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `boosters` | `int` |  |
| `company` | `string` |  |
| `cost_per_launch` | `int` |  |
| `country` | `string` |  |
| `description` | `string` |  |
| `diameter` | `map[string]any` |  |
| `first_flight` | `string` |  |
| `flickr_images` | `[]any` |  |
| `height` | `map[string]any` |  |
| `id` | `string` |  |
| `mass` | `map[string]any` |  |
| `name` | `string` |  |
| `stages` | `int` |  |
| `success_rate_pct` | `float64` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```go
rocket, err := client.Rocket(nil).Load(map[string]any{"id": "rocket_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(rocket) // the loaded record
```

#### Example: List

```go
rockets, err := client.Rocket(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rockets) // the array of records
```


### Ship

Create an instance: `ship := client.Ship(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abs` | `int` |  |
| `class` | `int` |  |
| `course_deg` | `float64` |  |
| `home_port` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `imo` | `int` |  |
| `last_ais_update` | `string` |  |
| `latitude` | `float64` |  |
| `launches` | `[]any` |  |
| `legacy_id` | `string` |  |
| `link` | `string` |  |
| `longitude` | `float64` |  |
| `mass_kg` | `int` |  |
| `mass_lbs` | `int` |  |
| `mmsi` | `int` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `roles` | `[]any` |  |
| `speed_kn` | `float64` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `year_built` | `int` |  |

#### Example: Load

```go
ship, err := client.Ship(nil).Load(map[string]any{"id": "ship_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ship) // the loaded record
```

#### Example: List

```go
ships, err := client.Ship(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ships) // the array of records
```


### Starlink

Create an instance: `starlink := client.Starlink(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height_km` | `float64` |  |
| `id` | `string` |  |
| `latitude` | `float64` |  |
| `launch` | `string` |  |
| `longitude` | `float64` |  |
| `spaceTrack` | `map[string]any` |  |
| `velocity_kms` | `float64` |  |
| `version` | `string` |  |

#### Example: Load

```go
starlink, err := client.Starlink(nil).Load(map[string]any{"id": "starlink_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(starlink) // the loaded record
```

#### Example: List

```go
starlinks, err := client.Starlink(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(starlinks) // the array of records
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
github.com/voxgig-sdk/spacex-rest-sdk/go/
├── spacex-rest.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/spacex-rest-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
landpad := client.Landpad(nil)
landpad.List(nil, nil)

// landpad.Data() now returns the landpad data from the last list
// landpad.Match() returns the last match criteria
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
