# SpacexRest Golang SDK



The Golang SDK for the SpacexRest API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

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

capsule, err := client.Capsule(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(capsule) // the loaded mock data
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    capsule, err := client.Capsule(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // capsule is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Capsule

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"land_landing"` |  |
| `"last_update"` |  |
| `"launch"` |  |
| `"reuse_count"` |  |
| `"serial"` |  |
| `"status"` |  |
| `"type"` |  |
| `"water_landing"` |  |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `"asds_attempt"` |  |
| `"asds_landing"` |  |
| `"block"` |  |
| `"id"` |  |
| `"last_update"` |  |
| `"launch"` |  |
| `"reuse_count"` |  |
| `"rtls_attempt"` |  |
| `"rtls_landing"` |  |
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
| `"launch"` |  |
| `"name"` |  |
| `"status"` |  |
| `"wikipedia"` |  |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `"detail"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"landing_attempt"` |  |
| `"landing_success"` |  |
| `"latitude"` |  |
| `"launch"` |  |
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
| `"capsule"` |  |
| `"core"` |  |
| `"crew"` |  |
| `"date_local"` |  |
| `"date_precision"` |  |
| `"date_unix"` |  |
| `"date_utc"` |  |
| `"detail"` |  |
| `"failure"` |  |
| `"fairing"` |  |
| `"flight"` |  |
| `"flight_number"` |  |
| `"gridfin"` |  |
| `"id"` |  |
| `"landing_attempt"` |  |
| `"landing_success"` |  |
| `"landing_type"` |  |
| `"landpad"` |  |
| `"launchpad"` |  |
| `"leg"` |  |
| `"link"` |  |
| `"name"` |  |
| `"net"` |  |
| `"payload"` |  |
| `"reused"` |  |
| `"rocket"` |  |
| `"ship"` |  |
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
| `"detail"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"latitude"` |  |
| `"launch"` |  |
| `"launch_attempt"` |  |
| `"launch_success"` |  |
| `"locality"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"region"` |  |
| `"rocket"` |  |
| `"status"` |  |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `"apoapsis_km"` |  |
| `"arg_of_pericenter"` |  |
| `"customer"` |  |
| `"eccentricity"` |  |
| `"epoch"` |  |
| `"id"` |  |
| `"inclination_deg"` |  |
| `"launch"` |  |
| `"lifespan_year"` |  |
| `"longitude"` |  |
| `"manufacturer"` |  |
| `"mass_kg"` |  |
| `"mass_lb"` |  |
| `"mean_anomaly"` |  |
| `"mean_motion"` |  |
| `"name"` |  |
| `"nationality"` |  |
| `"norad_id"` |  |
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
| `"detail"` |  |
| `"earth_distance_km"` |  |
| `"earth_distance_mi"` |  |
| `"eccentricity"` |  |
| `"epoch_jd"` |  |
| `"flickr_image"` |  |
| `"id"` |  |
| `"inclination"` |  |
| `"launch_date_unix"` |  |
| `"launch_date_utc"` |  |
| `"launch_mass_kg"` |  |
| `"launch_mass_lb"` |  |
| `"longitude"` |  |
| `"mars_distance_km"` |  |
| `"mars_distance_mi"` |  |
| `"name"` |  |
| `"norad_id"` |  |
| `"orbit_type"` |  |
| `"periapsis_arg"` |  |
| `"periapsis_au"` |  |
| `"period_day"` |  |
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
| `"booster"` |  |
| `"company"` |  |
| `"cost_per_launch"` |  |
| `"country"` |  |
| `"description"` |  |
| `"diameter"` |  |
| `"first_flight"` |  |
| `"flickr_image"` |  |
| `"height"` |  |
| `"id"` |  |
| `"mass"` |  |
| `"name"` |  |
| `"stage"` |  |
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
| `"launch"` |  |
| `"legacy_id"` |  |
| `"link"` |  |
| `"longitude"` |  |
| `"mass_kg"` |  |
| `"mass_lb"` |  |
| `"mmsi"` |  |
| `"model"` |  |
| `"name"` |  |
| `"role"` |  |
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
| `"space_track"` |  |
| `"velocity_km"` |  |
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
| `id` | ``$STRING`` |  |
| `land_landing` | ``$INTEGER`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `water_landing` | ``$INTEGER`` |  |

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
| `asds_attempt` | ``$INTEGER`` |  |
| `asds_landing` | ``$INTEGER`` |  |
| `block` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `rtls_attempt` | ``$INTEGER`` |  |
| `rtls_landing` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |

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
| `agency` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$INTEGER`` |  |
| `landing_success` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `auto_update` | ``$BOOLEAN`` |  |
| `capsule` | ``$ARRAY`` |  |
| `core` | ``$ARRAY`` |  |
| `crew` | ``$ARRAY`` |  |
| `date_local` | ``$STRING`` |  |
| `date_precision` | ``$STRING`` |  |
| `date_unix` | ``$INTEGER`` |  |
| `date_utc` | ``$STRING`` |  |
| `detail` | ``$STRING`` |  |
| `failure` | ``$ARRAY`` |  |
| `fairing` | ``$OBJECT`` |  |
| `flight` | ``$INTEGER`` |  |
| `flight_number` | ``$INTEGER`` |  |
| `gridfin` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$BOOLEAN`` |  |
| `landing_success` | ``$BOOLEAN`` |  |
| `landing_type` | ``$STRING`` |  |
| `landpad` | ``$STRING`` |  |
| `launchpad` | ``$STRING`` |  |
| `leg` | ``$BOOLEAN`` |  |
| `link` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `net` | ``$BOOLEAN`` |  |
| `payload` | ``$ARRAY`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `rocket` | ``$STRING`` |  |
| `ship` | ``$ARRAY`` |  |
| `static_fire_date_unix` | ``$INTEGER`` |  |
| `static_fire_date_utc` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `tdb` | ``$BOOLEAN`` |  |
| `upcoming` | ``$BOOLEAN`` |  |
| `window` | ``$INTEGER`` |  |

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
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `launch_attempt` | ``$INTEGER`` |  |
| `launch_success` | ``$INTEGER`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `rocket` | ``$ARRAY`` |  |
| `status` | ``$STRING`` |  |

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
| `apoapsis_km` | ``$NUMBER`` |  |
| `arg_of_pericenter` | ``$NUMBER`` |  |
| `customer` | ``$ARRAY`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `inclination_deg` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `lifespan_year` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `manufacturer` | ``$ARRAY`` |  |
| `mass_kg` | ``$NUMBER`` |  |
| `mass_lb` | ``$NUMBER`` |  |
| `mean_anomaly` | ``$NUMBER`` |  |
| `mean_motion` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `nationality` | ``$ARRAY`` |  |
| `norad_id` | ``$ARRAY`` |  |
| `orbit` | ``$STRING`` |  |
| `periapsis_km` | ``$NUMBER`` |  |
| `period_min` | ``$NUMBER`` |  |
| `raan` | ``$NUMBER`` |  |
| `reference_system` | ``$STRING`` |  |
| `regime` | ``$STRING`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `semi_major_axis_km` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |

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
| `apoapsis_au` | ``$NUMBER`` |  |
| `detail` | ``$STRING`` |  |
| `earth_distance_km` | ``$NUMBER`` |  |
| `earth_distance_mi` | ``$NUMBER`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch_jd` | ``$NUMBER`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `inclination` | ``$NUMBER`` |  |
| `launch_date_unix` | ``$INTEGER`` |  |
| `launch_date_utc` | ``$STRING`` |  |
| `launch_mass_kg` | ``$INTEGER`` |  |
| `launch_mass_lb` | ``$INTEGER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mars_distance_km` | ``$NUMBER`` |  |
| `mars_distance_mi` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `norad_id` | ``$INTEGER`` |  |
| `orbit_type` | ``$STRING`` |  |
| `periapsis_arg` | ``$NUMBER`` |  |
| `periapsis_au` | ``$NUMBER`` |  |
| `period_day` | ``$NUMBER`` |  |
| `semi_major_axis_au` | ``$NUMBER`` |  |
| `speed_kph` | ``$NUMBER`` |  |
| `speed_mph` | ``$NUMBER`` |  |
| `video` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `active` | ``$BOOLEAN`` |  |
| `booster` | ``$INTEGER`` |  |
| `company` | ``$STRING`` |  |
| `cost_per_launch` | ``$INTEGER`` |  |
| `country` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `diameter` | ``$OBJECT`` |  |
| `first_flight` | ``$STRING`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `height` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `mass` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `stage` | ``$INTEGER`` |  |
| `success_rate_pct` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `abs` | ``$INTEGER`` |  |
| `class` | ``$INTEGER`` |  |
| `course_deg` | ``$NUMBER`` |  |
| `home_port` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `imo` | ``$INTEGER`` |  |
| `last_ais_update` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `legacy_id` | ``$STRING`` |  |
| `link` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mass_kg` | ``$INTEGER`` |  |
| `mass_lb` | ``$INTEGER`` |  |
| `mmsi` | ``$INTEGER`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `role` | ``$ARRAY`` |  |
| `speed_kn` | ``$NUMBER`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `year_built` | ``$INTEGER`` |  |

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
| `height_km` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `space_track` | ``$OBJECT`` |  |
| `velocity_km` | ``$NUMBER`` |  |
| `version` | ``$STRING`` |  |

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
capsule := client.Capsule(nil)
capsule.Load(map[string]any{"id": "example_id"}, nil)

// capsule.Data() now returns the loaded capsule data
// capsule.Match() returns the last match criteria
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
