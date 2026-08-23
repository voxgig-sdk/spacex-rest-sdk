# SpacexRest Golang SDK



The Golang SDK for the SpacexRest API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Capsule(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
| `"id"` | Capsule serial number |
| `"land_landings"` | Number of land landings |
| `"last_update"` | Last update about the capsule |
| `"launches"` | Launch IDs |
| `"reuse_count"` | Number of times capsule has been reused |
| `"serial"` | Capsule serial number |
| `"status"` | Capsule status |
| `"type"` | Capsule type |
| `"water_landings"` | Number of water landings |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `"asds_attempts"` | Number of autonomous spaceport drone ship landing attempts |
| `"asds_landings"` | Number of successful ASDS landings |
| `"block"` | Core block number |
| `"id"` | Core serial number |
| `"last_update"` | Last update about the core |
| `"launches"` | Launch IDs |
| `"reuse_count"` | Number of times core has been reused |
| `"rtls_attempts"` | Number of return to launch site attempts |
| `"rtls_landings"` | Number of successful RTLS landings |
| `"serial"` | Core serial number |
| `"status"` | Core status (active, inactive, unknown, expended, lost, retired) |

Operations: List, Load.

API path: `/cores`

#### Crew

| Field | Description |
| --- | --- |
| `"agency"` | Agency |
| `"id"` | Crew member ID |
| `"image"` | Image URL |
| `"launches"` | Launch IDs |
| `"name"` | Crew member name |
| `"status"` | Status (active, inactive, retired, unknown) |
| `"wikipedia"` | Wikipedia URL |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `"details"` | Landing pad details |
| `"full_name"` | Full landing pad name |
| `"id"` | Landing pad ID |
| `"landing_attempts"` | Number of landing attempts |
| `"landing_successes"` | Number of successful landings |
| `"latitude"` | Latitude |
| `"launches"` | Launch IDs |
| `"locality"` | Locality |
| `"longitude"` | Longitude |
| `"name"` | Landing pad name |
| `"region"` | Region |
| `"status"` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `"type"` | Landing pad type (ASDS, RTLS) |
| `"wikipedia"` | Wikipedia URL |

Operations: List, Load.

API path: `/landpads`

#### Launch

| Field | Description |
| --- | --- |
| `"auto_update"` | Whether the launch data is automatically updated |
| `"capsules"` | Capsule IDs |
| `"core"` | Core ID |
| `"cores"` |  |
| `"crew"` | Crew member IDs |
| `"date_local"` | Launch date in local time |
| `"date_precision"` | Date precision (hour, day, month, quarter, half, year) |
| `"date_unix"` | Launch date in unix timestamp |
| `"date_utc"` | Launch date in UTC |
| `"details"` | Launch details |
| `"failures"` | Launch failures |
| `"fairings"` |  |
| `"flight"` | Core flight number |
| `"flight_number"` | Flight number |
| `"gridfins"` | Whether core has grid fins |
| `"id"` | Launch ID |
| `"landing_attempt"` | Whether landing was attempted |
| `"landing_success"` | Whether landing was successful |
| `"landing_type"` | Landing type (ASDS, RTLS, Ocean) |
| `"landpad"` | Landing pad ID |
| `"launchpad"` | Launchpad ID |
| `"legs"` | Whether core has legs |
| `"links"` |  |
| `"name"` | Launch name |
| `"net"` | No earlier than |
| `"payloads"` | Payload IDs |
| `"reused"` | Whether core was reused |
| `"rocket"` | Rocket ID |
| `"ships"` | Ship IDs |
| `"static_fire_date_unix"` | Static fire date in unix timestamp |
| `"static_fire_date_utc"` | Static fire date in UTC |
| `"success"` | Launch success status |
| `"tdb"` | To be determined |
| `"upcoming"` | Whether the launch is upcoming |
| `"window"` | Launch window in seconds |

Operations: List, Load.

API path: `/launches`

#### Launchpad

| Field | Description |
| --- | --- |
| `"details"` | Launchpad details |
| `"full_name"` | Full launchpad name |
| `"id"` | Launchpad ID |
| `"latitude"` | Latitude |
| `"launch_attempts"` | Number of launch attempts |
| `"launch_successes"` | Number of successful launches |
| `"launches"` | Launch IDs |
| `"locality"` | Locality |
| `"longitude"` | Longitude |
| `"name"` | Launchpad name |
| `"region"` | Region |
| `"rockets"` | Rocket IDs |
| `"status"` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `"apoapsis_km"` | Apoapsis in km |
| `"arg_of_pericenter"` | Argument of pericenter |
| `"customers"` | Customers |
| `"eccentricity"` | Eccentricity |
| `"epoch"` | Epoch |
| `"id"` | Payload ID |
| `"inclination_deg"` | Inclination in degrees |
| `"launch"` | Launch ID |
| `"lifespan_years"` | Lifespan in years |
| `"longitude"` | Longitude |
| `"manufacturers"` | Manufacturers |
| `"mass_kg"` | Payload mass in kilograms |
| `"mass_lbs"` | Payload mass in pounds |
| `"mean_anomaly"` | Mean anomaly |
| `"mean_motion"` | Mean motion |
| `"name"` | Payload name |
| `"nationalities"` | Nationalities |
| `"norad_ids"` | NORAD IDs |
| `"orbit"` | Orbit type |
| `"periapsis_km"` | Periapsis in km |
| `"period_min"` | Orbital period in minutes |
| `"raan"` | Right ascension of the ascending node |
| `"reference_system"` | Reference system |
| `"regime"` | Orbit regime |
| `"reused"` | Whether the payload was reused |
| `"semi_major_axis_km"` | Semi-major axis in km |
| `"type"` | Payload type |

Operations: List, Load.

API path: `/payloads`

#### Roadster

| Field | Description |
| --- | --- |
| `"apoapsis_au"` | Apoapsis in AU |
| `"details"` | Details |
| `"earth_distance_km"` | Distance from Earth in km |
| `"earth_distance_mi"` | Distance from Earth in miles |
| `"eccentricity"` | Eccentricity |
| `"epoch_jd"` | Epoch in Julian Date |
| `"flickr_images"` | Flickr images |
| `"id"` | Roadster ID |
| `"inclination"` | Inclination |
| `"launch_date_unix"` | Launch date in unix timestamp |
| `"launch_date_utc"` | Launch date in UTC |
| `"launch_mass_kg"` | Launch mass in kilograms |
| `"launch_mass_lbs"` | Launch mass in pounds |
| `"longitude"` | Longitude |
| `"mars_distance_km"` | Distance from Mars in km |
| `"mars_distance_mi"` | Distance from Mars in miles |
| `"name"` | Roadster name |
| `"norad_id"` | NORAD ID |
| `"orbit_type"` | Orbit type |
| `"periapsis_arg"` | Argument of periapsis |
| `"periapsis_au"` | Periapsis in AU |
| `"period_days"` | Orbital period in days |
| `"semi_major_axis_au"` | Semi-major axis in AU |
| `"speed_kph"` | Speed in km/h |
| `"speed_mph"` | Speed in mph |
| `"video"` | Video URL |
| `"wikipedia"` | Wikipedia URL |

Operations: List.

API path: `/roadster`

#### Rocket

| Field | Description |
| --- | --- |
| `"active"` | Whether the rocket is active |
| `"boosters"` | Number of boosters |
| `"company"` | Company |
| `"cost_per_launch"` | Cost per launch in USD |
| `"country"` | Country of origin |
| `"description"` |  |
| `"diameter"` |  |
| `"first_flight"` | Date of first flight |
| `"flickr_images"` |  |
| `"height"` |  |
| `"id"` | Rocket ID |
| `"mass"` |  |
| `"name"` | Rocket name |
| `"stages"` | Number of stages |
| `"success_rate_pct"` | Success rate percentage |
| `"type"` | Rocket type |
| `"wikipedia"` |  |

Operations: List, Load.

API path: `/rockets`

#### Ship

| Field | Description |
| --- | --- |
| `"abs"` | ABS number |
| `"class"` | Ship class |
| `"course_deg"` | Course in degrees |
| `"home_port"` | Home port |
| `"id"` | Ship ID |
| `"image"` | Image URL |
| `"imo"` | IMO number |
| `"last_ais_update"` | Last AIS update timestamp |
| `"latitude"` | Latitude |
| `"launches"` | Launch IDs |
| `"legacy_id"` | Legacy ID |
| `"link"` | Link to ship info |
| `"longitude"` | Longitude |
| `"mass_kg"` | Mass in kilograms |
| `"mass_lbs"` | Mass in pounds |
| `"mmsi"` | MMSI number |
| `"model"` | Ship model |
| `"name"` | Ship name |
| `"roles"` | Ship roles |
| `"speed_kn"` | Speed in knots |
| `"status"` | Ship status |
| `"type"` | Ship type |
| `"year_built"` | Year built |

Operations: List, Load.

API path: `/ships`

#### Starlink

| Field | Description |
| --- | --- |
| `"height_km"` | Current height in kilometers |
| `"id"` | Starlink satellite ID |
| `"latitude"` | Current latitude |
| `"launch"` | Launch ID |
| `"longitude"` | Current longitude |
| `"spaceTrack"` | Space-Track.org data |
| `"velocity_kms"` | Current velocity in km/s |
| `"version"` | Satellite version |

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
| `id` | `string` | Capsule serial number |
| `land_landings` | `int` | Number of land landings |
| `last_update` | `string` | Last update about the capsule |
| `launches` | `[]any` | Launch IDs |
| `reuse_count` | `int` | Number of times capsule has been reused |
| `serial` | `string` | Capsule serial number |
| `status` | `string` | Capsule status |
| `type` | `string` | Capsule type |
| `water_landings` | `int` | Number of water landings |

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
| `asds_attempts` | `int` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `int` | Number of successful ASDS landings |
| `block` | `int` | Core block number |
| `id` | `string` | Core serial number |
| `last_update` | `string` | Last update about the core |
| `launches` | `[]any` | Launch IDs |
| `reuse_count` | `int` | Number of times core has been reused |
| `rtls_attempts` | `int` | Number of return to launch site attempts |
| `rtls_landings` | `int` | Number of successful RTLS landings |
| `serial` | `string` | Core serial number |
| `status` | `string` | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | Agency |
| `id` | `string` | Crew member ID |
| `image` | `string` | Image URL |
| `launches` | `[]any` | Launch IDs |
| `name` | `string` | Crew member name |
| `status` | `string` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `details` | `string` | Landing pad details |
| `full_name` | `string` | Full landing pad name |
| `id` | `string` | Landing pad ID |
| `landing_attempts` | `int` | Number of landing attempts |
| `landing_successes` | `int` | Number of successful landings |
| `latitude` | `float64` | Latitude |
| `launches` | `[]any` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `float64` | Longitude |
| `name` | `string` | Landing pad name |
| `region` | `string` | Region |
| `status` | `string` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `auto_update` | `bool` | Whether the launch data is automatically updated |
| `capsules` | `[]any` | Capsule IDs |
| `core` | `string` | Core ID |
| `cores` | `[]any` |  |
| `crew` | `[]any` | Crew member IDs |
| `date_local` | `string` | Launch date in local time |
| `date_precision` | `string` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `int` | Launch date in unix timestamp |
| `date_utc` | `string` | Launch date in UTC |
| `details` | `string` | Launch details |
| `failures` | `[]any` | Launch failures |
| `fairings` | `map[string]any` |  |
| `flight` | `int` | Core flight number |
| `flight_number` | `int` | Flight number |
| `gridfins` | `bool` | Whether core has grid fins |
| `id` | `string` | Launch ID |
| `landing_attempt` | `bool` | Whether landing was attempted |
| `landing_success` | `bool` | Whether landing was successful |
| `landing_type` | `string` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | Landing pad ID |
| `launchpad` | `string` | Launchpad ID |
| `legs` | `bool` | Whether core has legs |
| `links` | `map[string]any` |  |
| `name` | `string` | Launch name |
| `net` | `bool` | No earlier than |
| `payloads` | `[]any` | Payload IDs |
| `reused` | `bool` | Whether core was reused |
| `rocket` | `string` | Rocket ID |
| `ships` | `[]any` | Ship IDs |
| `static_fire_date_unix` | `int` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | Static fire date in UTC |
| `success` | `bool` | Launch success status |
| `tdb` | `bool` | To be determined |
| `upcoming` | `bool` | Whether the launch is upcoming |
| `window` | `int` | Launch window in seconds |

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
| `details` | `string` | Launchpad details |
| `full_name` | `string` | Full launchpad name |
| `id` | `string` | Launchpad ID |
| `latitude` | `float64` | Latitude |
| `launch_attempts` | `int` | Number of launch attempts |
| `launch_successes` | `int` | Number of successful launches |
| `launches` | `[]any` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `float64` | Longitude |
| `name` | `string` | Launchpad name |
| `region` | `string` | Region |
| `rockets` | `[]any` | Rocket IDs |
| `status` | `string` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `float64` | Apoapsis in km |
| `arg_of_pericenter` | `float64` | Argument of pericenter |
| `customers` | `[]any` | Customers |
| `eccentricity` | `float64` | Eccentricity |
| `epoch` | `string` | Epoch |
| `id` | `string` | Payload ID |
| `inclination_deg` | `float64` | Inclination in degrees |
| `launch` | `string` | Launch ID |
| `lifespan_years` | `float64` | Lifespan in years |
| `longitude` | `float64` | Longitude |
| `manufacturers` | `[]any` | Manufacturers |
| `mass_kg` | `float64` | Payload mass in kilograms |
| `mass_lbs` | `float64` | Payload mass in pounds |
| `mean_anomaly` | `float64` | Mean anomaly |
| `mean_motion` | `float64` | Mean motion |
| `name` | `string` | Payload name |
| `nationalities` | `[]any` | Nationalities |
| `norad_ids` | `[]any` | NORAD IDs |
| `orbit` | `string` | Orbit type |
| `periapsis_km` | `float64` | Periapsis in km |
| `period_min` | `float64` | Orbital period in minutes |
| `raan` | `float64` | Right ascension of the ascending node |
| `reference_system` | `string` | Reference system |
| `regime` | `string` | Orbit regime |
| `reused` | `bool` | Whether the payload was reused |
| `semi_major_axis_km` | `float64` | Semi-major axis in km |
| `type` | `string` | Payload type |

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
| `apoapsis_au` | `float64` | Apoapsis in AU |
| `details` | `string` | Details |
| `earth_distance_km` | `float64` | Distance from Earth in km |
| `earth_distance_mi` | `float64` | Distance from Earth in miles |
| `eccentricity` | `float64` | Eccentricity |
| `epoch_jd` | `float64` | Epoch in Julian Date |
| `flickr_images` | `[]any` | Flickr images |
| `id` | `string` | Roadster ID |
| `inclination` | `float64` | Inclination |
| `launch_date_unix` | `int` | Launch date in unix timestamp |
| `launch_date_utc` | `string` | Launch date in UTC |
| `launch_mass_kg` | `int` | Launch mass in kilograms |
| `launch_mass_lbs` | `int` | Launch mass in pounds |
| `longitude` | `float64` | Longitude |
| `mars_distance_km` | `float64` | Distance from Mars in km |
| `mars_distance_mi` | `float64` | Distance from Mars in miles |
| `name` | `string` | Roadster name |
| `norad_id` | `int` | NORAD ID |
| `orbit_type` | `string` | Orbit type |
| `periapsis_arg` | `float64` | Argument of periapsis |
| `periapsis_au` | `float64` | Periapsis in AU |
| `period_days` | `float64` | Orbital period in days |
| `semi_major_axis_au` | `float64` | Semi-major axis in AU |
| `speed_kph` | `float64` | Speed in km/h |
| `speed_mph` | `float64` | Speed in mph |
| `video` | `string` | Video URL |
| `wikipedia` | `string` | Wikipedia URL |

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
| `active` | `bool` | Whether the rocket is active |
| `boosters` | `int` | Number of boosters |
| `company` | `string` | Company |
| `cost_per_launch` | `int` | Cost per launch in USD |
| `country` | `string` | Country of origin |
| `description` | `string` |  |
| `diameter` | `map[string]any` |  |
| `first_flight` | `string` | Date of first flight |
| `flickr_images` | `[]any` |  |
| `height` | `map[string]any` |  |
| `id` | `string` | Rocket ID |
| `mass` | `map[string]any` |  |
| `name` | `string` | Rocket name |
| `stages` | `int` | Number of stages |
| `success_rate_pct` | `float64` | Success rate percentage |
| `type` | `string` | Rocket type |
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
| `abs` | `int` | ABS number |
| `class` | `int` | Ship class |
| `course_deg` | `float64` | Course in degrees |
| `home_port` | `string` | Home port |
| `id` | `string` | Ship ID |
| `image` | `string` | Image URL |
| `imo` | `int` | IMO number |
| `last_ais_update` | `string` | Last AIS update timestamp |
| `latitude` | `float64` | Latitude |
| `launches` | `[]any` | Launch IDs |
| `legacy_id` | `string` | Legacy ID |
| `link` | `string` | Link to ship info |
| `longitude` | `float64` | Longitude |
| `mass_kg` | `int` | Mass in kilograms |
| `mass_lbs` | `int` | Mass in pounds |
| `mmsi` | `int` | MMSI number |
| `model` | `string` | Ship model |
| `name` | `string` | Ship name |
| `roles` | `[]any` | Ship roles |
| `speed_kn` | `float64` | Speed in knots |
| `status` | `string` | Ship status |
| `type` | `string` | Ship type |
| `year_built` | `int` | Year built |

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
| `height_km` | `float64` | Current height in kilometers |
| `id` | `string` | Starlink satellite ID |
| `latitude` | `float64` | Current latitude |
| `launch` | `string` | Launch ID |
| `longitude` | `float64` | Current longitude |
| `spaceTrack` | `map[string]any` | Space-Track.org data |
| `velocity_kms` | `float64` | Current velocity in km/s |
| `version` | `string` | Satellite version |

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
