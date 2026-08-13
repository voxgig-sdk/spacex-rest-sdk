# SpacexRest Golang SDK Reference

Complete API reference for the SpacexRest Golang SDK.


## SpacexRestSDK

### Constructor

```go
func NewSpacexRestSDK(options map[string]any) *SpacexRestSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *SpacexRestSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *SpacexRestSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Capsule(data map[string]any) SpacexRestEntity`

Create a new `Capsule` entity instance. Pass `nil` for no initial data.

#### `Core(data map[string]any) SpacexRestEntity`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Crew(data map[string]any) SpacexRestEntity`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Landpad(data map[string]any) SpacexRestEntity`

Create a new `Landpad` entity instance. Pass `nil` for no initial data.

#### `Launch(data map[string]any) SpacexRestEntity`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `Launchpad(data map[string]any) SpacexRestEntity`

Create a new `Launchpad` entity instance. Pass `nil` for no initial data.

#### `Payload(data map[string]any) SpacexRestEntity`

Create a new `Payload` entity instance. Pass `nil` for no initial data.

#### `Roadster(data map[string]any) SpacexRestEntity`

Create a new `Roadster` entity instance. Pass `nil` for no initial data.

#### `Rocket(data map[string]any) SpacexRestEntity`

Create a new `Rocket` entity instance. Pass `nil` for no initial data.

#### `Ship(data map[string]any) SpacexRestEntity`

Create a new `Ship` entity instance. Pass `nil` for no initial data.

#### `Starlink(data map[string]any) SpacexRestEntity`

Create a new `Starlink` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CapsuleEntity

```go
capsule := client.Capsule(nil)
fmt.Println(capsule.GetName()) // "capsule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `land_landings` | `int` | No |  |
| `last_update` | `string` | No |  |
| `launches` | `[]any` | No |  |
| `reuse_count` | `int` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `water_landings` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Capsule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Capsule(nil).Load(map[string]any{"id": "capsule_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CoreEntity

```go
core := client.Core(nil)
fmt.Println(core.GetName()) // "core"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempts` | `int` | No |  |
| `asds_landings` | `int` | No |  |
| `block` | `int` | No |  |
| `id` | `string` | No |  |
| `last_update` | `string` | No |  |
| `launches` | `[]any` | No |  |
| `reuse_count` | `int` | No |  |
| `rtls_attempts` | `int` | No |  |
| `rtls_landings` | `int` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Core(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Core(nil).Load(map[string]any{"id": "core_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CrewEntity

```go
crew := client.Crew(nil)
fmt.Println(crew.GetName()) // "crew"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launches` | `[]any` | No |  |
| `name` | `string` | No |  |
| `status` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Crew(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Crew(nil).Load(map[string]any{"id": "crew_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LandpadEntity

```go
landpad := client.Landpad(nil)
fmt.Println(landpad.GetName()) // "landpad"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `landing_attempts` | `int` | No |  |
| `landing_successes` | `int` | No |  |
| `latitude` | `float64` | No |  |
| `launches` | `[]any` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `float64` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Landpad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Landpad(nil).Load(map[string]any{"id": "landpad_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LandpadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LaunchEntity

```go
launch := client.Launch(nil)
fmt.Println(launch.GetName()) // "launch"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | `bool` | No |  |
| `capsules` | `[]any` | No |  |
| `core` | `string` | No |  |
| `cores` | `[]any` | No |  |
| `crew` | `[]any` | No |  |
| `date_local` | `string` | No |  |
| `date_precision` | `string` | No |  |
| `date_unix` | `int` | No |  |
| `date_utc` | `string` | No |  |
| `details` | `string` | No |  |
| `failures` | `[]any` | No |  |
| `fairings` | `map[string]any` | No |  |
| `flight` | `int` | No |  |
| `flight_number` | `int` | No |  |
| `gridfins` | `bool` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `bool` | No |  |
| `landing_success` | `bool` | No |  |
| `landing_type` | `string` | No |  |
| `landpad` | `string` | No |  |
| `launchpad` | `string` | No |  |
| `legs` | `bool` | No |  |
| `links` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `net` | `bool` | No |  |
| `payloads` | `[]any` | No |  |
| `reused` | `bool` | No |  |
| `rocket` | `string` | No |  |
| `ships` | `[]any` | No |  |
| `static_fire_date_unix` | `int` | No |  |
| `static_fire_date_utc` | `string` | No |  |
| `success` | `bool` | No |  |
| `tdb` | `bool` | No |  |
| `upcoming` | `bool` | No |  |
| `window` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LaunchpadEntity

```go
launchpad := client.Launchpad(nil)
fmt.Println(launchpad.GetName()) // "launchpad"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `latitude` | `float64` | No |  |
| `launch_attempts` | `int` | No |  |
| `launch_successes` | `int` | No |  |
| `launches` | `[]any` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `float64` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `rockets` | `[]any` | No |  |
| `status` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launchpad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launchpad(nil).Load(map[string]any{"id": "launchpad_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PayloadEntity

```go
payload := client.Payload(nil)
fmt.Println(payload.GetName()) // "payload"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | `float64` | No |  |
| `arg_of_pericenter` | `float64` | No |  |
| `customers` | `[]any` | No |  |
| `eccentricity` | `float64` | No |  |
| `epoch` | `string` | No |  |
| `id` | `string` | No |  |
| `inclination_deg` | `float64` | No |  |
| `launch` | `string` | No |  |
| `lifespan_years` | `float64` | No |  |
| `longitude` | `float64` | No |  |
| `manufacturers` | `[]any` | No |  |
| `mass_kg` | `float64` | No |  |
| `mass_lbs` | `float64` | No |  |
| `mean_anomaly` | `float64` | No |  |
| `mean_motion` | `float64` | No |  |
| `name` | `string` | No |  |
| `nationalities` | `[]any` | No |  |
| `norad_ids` | `[]any` | No |  |
| `orbit` | `string` | No |  |
| `periapsis_km` | `float64` | No |  |
| `period_min` | `float64` | No |  |
| `raan` | `float64` | No |  |
| `reference_system` | `string` | No |  |
| `regime` | `string` | No |  |
| `reused` | `bool` | No |  |
| `semi_major_axis_km` | `float64` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Payload(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Payload(nil).Load(map[string]any{"id": "payload_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PayloadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RoadsterEntity

```go
roadster := client.Roadster(nil)
fmt.Println(roadster.GetName()) // "roadster"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | `float64` | No |  |
| `details` | `string` | No |  |
| `earth_distance_km` | `float64` | No |  |
| `earth_distance_mi` | `float64` | No |  |
| `eccentricity` | `float64` | No |  |
| `epoch_jd` | `float64` | No |  |
| `flickr_images` | `[]any` | No |  |
| `id` | `string` | No |  |
| `inclination` | `float64` | No |  |
| `launch_date_unix` | `int` | No |  |
| `launch_date_utc` | `string` | No |  |
| `launch_mass_kg` | `int` | No |  |
| `launch_mass_lbs` | `int` | No |  |
| `longitude` | `float64` | No |  |
| `mars_distance_km` | `float64` | No |  |
| `mars_distance_mi` | `float64` | No |  |
| `name` | `string` | No |  |
| `norad_id` | `int` | No |  |
| `orbit_type` | `string` | No |  |
| `periapsis_arg` | `float64` | No |  |
| `periapsis_au` | `float64` | No |  |
| `period_days` | `float64` | No |  |
| `semi_major_axis_au` | `float64` | No |  |
| `speed_kph` | `float64` | No |  |
| `speed_mph` | `float64` | No |  |
| `video` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Roadster(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RocketEntity

```go
rocket := client.Rocket(nil)
fmt.Println(rocket.GetName()) // "rocket"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `boosters` | `int` | No |  |
| `company` | `string` | No |  |
| `cost_per_launch` | `int` | No |  |
| `country` | `string` | No |  |
| `description` | `string` | No |  |
| `diameter` | `map[string]any` | No |  |
| `first_flight` | `string` | No |  |
| `flickr_images` | `[]any` | No |  |
| `height` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `mass` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `stages` | `int` | No |  |
| `success_rate_pct` | `float64` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rocket(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Rocket(nil).Load(map[string]any{"id": "rocket_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RocketEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ShipEntity

```go
ship := client.Ship(nil)
fmt.Println(ship.GetName()) // "ship"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | `int` | No |  |
| `class` | `int` | No |  |
| `course_deg` | `float64` | No |  |
| `home_port` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `imo` | `int` | No |  |
| `last_ais_update` | `string` | No |  |
| `latitude` | `float64` | No |  |
| `launches` | `[]any` | No |  |
| `legacy_id` | `string` | No |  |
| `link` | `string` | No |  |
| `longitude` | `float64` | No |  |
| `mass_kg` | `int` | No |  |
| `mass_lbs` | `int` | No |  |
| `mmsi` | `int` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `roles` | `[]any` | No |  |
| `speed_kn` | `float64` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `year_built` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ship(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Ship(nil).Load(map[string]any{"id": "ship_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ShipEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StarlinkEntity

```go
starlink := client.Starlink(nil)
fmt.Println(starlink.GetName()) // "starlink"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | `float64` | No |  |
| `id` | `string` | No |  |
| `latitude` | `float64` | No |  |
| `launch` | `string` | No |  |
| `longitude` | `float64` | No |  |
| `spaceTrack` | `map[string]any` | No |  |
| `velocity_kms` | `float64` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Starlink(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Starlink(nil).Load(map[string]any{"id": "starlink_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewSpacexRestSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

