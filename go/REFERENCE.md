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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `land_landing` | ``$INTEGER`` | No |  |
| `last_update` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `reuse_count` | ``$INTEGER`` | No |  |
| `serial` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `water_landing` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Capsule(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Capsule(nil).Load(map[string]any{"id": "capsule_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempt` | ``$INTEGER`` | No |  |
| `asds_landing` | ``$INTEGER`` | No |  |
| `block` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `last_update` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `reuse_count` | ``$INTEGER`` | No |  |
| `rtls_attempt` | ``$INTEGER`` | No |  |
| `rtls_landing` | ``$INTEGER`` | No |  |
| `serial` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Core(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Core(nil).Load(map[string]any{"id": "core_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Crew(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Crew(nil).Load(map[string]any{"id": "crew_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `landing_attempt` | ``$INTEGER`` | No |  |
| `landing_success` | ``$INTEGER`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `locality` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Landpad(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Landpad(nil).Load(map[string]any{"id": "landpad_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | ``$BOOLEAN`` | No |  |
| `capsule` | ``$ARRAY`` | No |  |
| `core` | ``$ARRAY`` | No |  |
| `crew` | ``$ARRAY`` | No |  |
| `date_local` | ``$STRING`` | No |  |
| `date_precision` | ``$STRING`` | No |  |
| `date_unix` | ``$INTEGER`` | No |  |
| `date_utc` | ``$STRING`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `failure` | ``$ARRAY`` | No |  |
| `fairing` | ``$OBJECT`` | No |  |
| `flight` | ``$INTEGER`` | No |  |
| `flight_number` | ``$INTEGER`` | No |  |
| `gridfin` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `landing_attempt` | ``$BOOLEAN`` | No |  |
| `landing_success` | ``$BOOLEAN`` | No |  |
| `landing_type` | ``$STRING`` | No |  |
| `landpad` | ``$STRING`` | No |  |
| `launchpad` | ``$STRING`` | No |  |
| `leg` | ``$BOOLEAN`` | No |  |
| `link` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `net` | ``$BOOLEAN`` | No |  |
| `payload` | ``$ARRAY`` | No |  |
| `reused` | ``$BOOLEAN`` | No |  |
| `rocket` | ``$STRING`` | No |  |
| `ship` | ``$ARRAY`` | No |  |
| `static_fire_date_unix` | ``$INTEGER`` | No |  |
| `static_fire_date_utc` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `tdb` | ``$BOOLEAN`` | No |  |
| `upcoming` | ``$BOOLEAN`` | No |  |
| `window` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launch(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `launch_attempt` | ``$INTEGER`` | No |  |
| `launch_success` | ``$INTEGER`` | No |  |
| `locality` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |
| `rocket` | ``$ARRAY`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launchpad(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launchpad(nil).Load(map[string]any{"id": "launchpad_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | ``$NUMBER`` | No |  |
| `arg_of_pericenter` | ``$NUMBER`` | No |  |
| `customer` | ``$ARRAY`` | No |  |
| `eccentricity` | ``$NUMBER`` | No |  |
| `epoch` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `inclination_deg` | ``$NUMBER`` | No |  |
| `launch` | ``$STRING`` | No |  |
| `lifespan_year` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `manufacturer` | ``$ARRAY`` | No |  |
| `mass_kg` | ``$NUMBER`` | No |  |
| `mass_lb` | ``$NUMBER`` | No |  |
| `mean_anomaly` | ``$NUMBER`` | No |  |
| `mean_motion` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nationality` | ``$ARRAY`` | No |  |
| `norad_id` | ``$ARRAY`` | No |  |
| `orbit` | ``$STRING`` | No |  |
| `periapsis_km` | ``$NUMBER`` | No |  |
| `period_min` | ``$NUMBER`` | No |  |
| `raan` | ``$NUMBER`` | No |  |
| `reference_system` | ``$STRING`` | No |  |
| `regime` | ``$STRING`` | No |  |
| `reused` | ``$BOOLEAN`` | No |  |
| `semi_major_axis_km` | ``$NUMBER`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Payload(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Payload(nil).Load(map[string]any{"id": "payload_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | ``$NUMBER`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `earth_distance_km` | ``$NUMBER`` | No |  |
| `earth_distance_mi` | ``$NUMBER`` | No |  |
| `eccentricity` | ``$NUMBER`` | No |  |
| `epoch_jd` | ``$NUMBER`` | No |  |
| `flickr_image` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `inclination` | ``$NUMBER`` | No |  |
| `launch_date_unix` | ``$INTEGER`` | No |  |
| `launch_date_utc` | ``$STRING`` | No |  |
| `launch_mass_kg` | ``$INTEGER`` | No |  |
| `launch_mass_lb` | ``$INTEGER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `mars_distance_km` | ``$NUMBER`` | No |  |
| `mars_distance_mi` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `norad_id` | ``$INTEGER`` | No |  |
| `orbit_type` | ``$STRING`` | No |  |
| `periapsis_arg` | ``$NUMBER`` | No |  |
| `periapsis_au` | ``$NUMBER`` | No |  |
| `period_day` | ``$NUMBER`` | No |  |
| `semi_major_axis_au` | ``$NUMBER`` | No |  |
| `speed_kph` | ``$NUMBER`` | No |  |
| `speed_mph` | ``$NUMBER`` | No |  |
| `video` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Roadster(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | ``$BOOLEAN`` | No |  |
| `booster` | ``$INTEGER`` | No |  |
| `company` | ``$STRING`` | No |  |
| `cost_per_launch` | ``$INTEGER`` | No |  |
| `country` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$OBJECT`` | No |  |
| `first_flight` | ``$STRING`` | No |  |
| `flickr_image` | ``$ARRAY`` | No |  |
| `height` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `mass` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `stage` | ``$INTEGER`` | No |  |
| `success_rate_pct` | ``$NUMBER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rocket(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Rocket(nil).Load(map[string]any{"id": "rocket_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | ``$INTEGER`` | No |  |
| `class` | ``$INTEGER`` | No |  |
| `course_deg` | ``$NUMBER`` | No |  |
| `home_port` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `imo` | ``$INTEGER`` | No |  |
| `last_ais_update` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `legacy_id` | ``$STRING`` | No |  |
| `link` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `mass_kg` | ``$INTEGER`` | No |  |
| `mass_lb` | ``$INTEGER`` | No |  |
| `mmsi` | ``$INTEGER`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `role` | ``$ARRAY`` | No |  |
| `speed_kn` | ``$NUMBER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `year_built` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ship(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Ship(nil).Load(map[string]any{"id": "ship_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `space_track` | ``$OBJECT`` | No |  |
| `velocity_km` | ``$NUMBER`` | No |  |
| `version` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Starlink(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Starlink(nil).Load(map[string]any{"id": "starlink_id"}, nil)
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

