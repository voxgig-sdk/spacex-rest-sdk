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
| `id` | `string` | No | Capsule serial number |
| `land_landings` | `int` | No | Number of land landings |
| `last_update` | `string` | No | Last update about the capsule |
| `launches` | `[]any` | No | Launch IDs |
| `reuse_count` | `int` | No | Number of times capsule has been reused |
| `serial` | `string` | No | Capsule serial number |
| `status` | `string` | No | Capsule status |
| `type` | `string` | No | Capsule type |
| `water_landings` | `int` | No | Number of water landings |

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
| `asds_attempts` | `int` | No | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `int` | No | Number of successful ASDS landings |
| `block` | `int` | No | Core block number |
| `id` | `string` | No | Core serial number |
| `last_update` | `string` | No | Last update about the core |
| `launches` | `[]any` | No | Launch IDs |
| `reuse_count` | `int` | No | Number of times core has been reused |
| `rtls_attempts` | `int` | No | Number of return to launch site attempts |
| `rtls_landings` | `int` | No | Number of successful RTLS landings |
| `serial` | `string` | No | Core serial number |
| `status` | `string` | No | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | No | Agency |
| `id` | `string` | No | Crew member ID |
| `image` | `string` | No | Image URL |
| `launches` | `[]any` | No | Launch IDs |
| `name` | `string` | No | Crew member name |
| `status` | `string` | No | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `details` | `string` | No | Landing pad details |
| `full_name` | `string` | No | Full landing pad name |
| `id` | `string` | No | Landing pad ID |
| `landing_attempts` | `int` | No | Number of landing attempts |
| `landing_successes` | `int` | No | Number of successful landings |
| `latitude` | `float64` | No | Latitude |
| `launches` | `[]any` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `float64` | No | Longitude |
| `name` | `string` | No | Landing pad name |
| `region` | `string` | No | Region |
| `status` | `string` | No | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | No | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `auto_update` | `bool` | No | Whether the launch data is automatically updated |
| `capsules` | `[]any` | No | Capsule IDs |
| `core` | `string` | No | Core ID |
| `cores` | `[]any` | No |  |
| `crew` | `[]any` | No | Crew member IDs |
| `date_local` | `string` | No | Launch date in local time |
| `date_precision` | `string` | No | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `int` | No | Launch date in unix timestamp |
| `date_utc` | `string` | No | Launch date in UTC |
| `details` | `string` | No | Launch details |
| `failures` | `[]any` | No | Launch failures |
| `fairings` | `map[string]any` | No |  |
| `flight` | `int` | No | Core flight number |
| `flight_number` | `int` | No | Flight number |
| `gridfins` | `bool` | No | Whether core has grid fins |
| `id` | `string` | No | Launch ID |
| `landing_attempt` | `bool` | No | Whether landing was attempted |
| `landing_success` | `bool` | No | Whether landing was successful |
| `landing_type` | `string` | No | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | No | Landing pad ID |
| `launchpad` | `string` | No | Launchpad ID |
| `legs` | `bool` | No | Whether core has legs |
| `links` | `map[string]any` | No |  |
| `name` | `string` | No | Launch name |
| `net` | `bool` | No | No earlier than |
| `payloads` | `[]any` | No | Payload IDs |
| `reused` | `bool` | No | Whether core was reused |
| `rocket` | `string` | No | Rocket ID |
| `ships` | `[]any` | No | Ship IDs |
| `static_fire_date_unix` | `int` | No | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | No | Static fire date in UTC |
| `success` | `bool` | No | Launch success status |
| `tdb` | `bool` | No | To be determined |
| `upcoming` | `bool` | No | Whether the launch is upcoming |
| `window` | `int` | No | Launch window in seconds |

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
| `details` | `string` | No | Launchpad details |
| `full_name` | `string` | No | Full launchpad name |
| `id` | `string` | No | Launchpad ID |
| `latitude` | `float64` | No | Latitude |
| `launch_attempts` | `int` | No | Number of launch attempts |
| `launch_successes` | `int` | No | Number of successful launches |
| `launches` | `[]any` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `float64` | No | Longitude |
| `name` | `string` | No | Launchpad name |
| `region` | `string` | No | Region |
| `rockets` | `[]any` | No | Rocket IDs |
| `status` | `string` | No | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `float64` | No | Apoapsis in km |
| `arg_of_pericenter` | `float64` | No | Argument of pericenter |
| `customers` | `[]any` | No | Customers |
| `eccentricity` | `float64` | No | Eccentricity |
| `epoch` | `string` | No | Epoch |
| `id` | `string` | No | Payload ID |
| `inclination_deg` | `float64` | No | Inclination in degrees |
| `launch` | `string` | No | Launch ID |
| `lifespan_years` | `float64` | No | Lifespan in years |
| `longitude` | `float64` | No | Longitude |
| `manufacturers` | `[]any` | No | Manufacturers |
| `mass_kg` | `float64` | No | Payload mass in kilograms |
| `mass_lbs` | `float64` | No | Payload mass in pounds |
| `mean_anomaly` | `float64` | No | Mean anomaly |
| `mean_motion` | `float64` | No | Mean motion |
| `name` | `string` | No | Payload name |
| `nationalities` | `[]any` | No | Nationalities |
| `norad_ids` | `[]any` | No | NORAD IDs |
| `orbit` | `string` | No | Orbit type |
| `periapsis_km` | `float64` | No | Periapsis in km |
| `period_min` | `float64` | No | Orbital period in minutes |
| `raan` | `float64` | No | Right ascension of the ascending node |
| `reference_system` | `string` | No | Reference system |
| `regime` | `string` | No | Orbit regime |
| `reused` | `bool` | No | Whether the payload was reused |
| `semi_major_axis_km` | `float64` | No | Semi-major axis in km |
| `type` | `string` | No | Payload type |

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
| `apoapsis_au` | `float64` | No | Apoapsis in AU |
| `details` | `string` | No | Details |
| `earth_distance_km` | `float64` | No | Distance from Earth in km |
| `earth_distance_mi` | `float64` | No | Distance from Earth in miles |
| `eccentricity` | `float64` | No | Eccentricity |
| `epoch_jd` | `float64` | No | Epoch in Julian Date |
| `flickr_images` | `[]any` | No | Flickr images |
| `id` | `string` | No | Roadster ID |
| `inclination` | `float64` | No | Inclination |
| `launch_date_unix` | `int` | No | Launch date in unix timestamp |
| `launch_date_utc` | `string` | No | Launch date in UTC |
| `launch_mass_kg` | `int` | No | Launch mass in kilograms |
| `launch_mass_lbs` | `int` | No | Launch mass in pounds |
| `longitude` | `float64` | No | Longitude |
| `mars_distance_km` | `float64` | No | Distance from Mars in km |
| `mars_distance_mi` | `float64` | No | Distance from Mars in miles |
| `name` | `string` | No | Roadster name |
| `norad_id` | `int` | No | NORAD ID |
| `orbit_type` | `string` | No | Orbit type |
| `periapsis_arg` | `float64` | No | Argument of periapsis |
| `periapsis_au` | `float64` | No | Periapsis in AU |
| `period_days` | `float64` | No | Orbital period in days |
| `semi_major_axis_au` | `float64` | No | Semi-major axis in AU |
| `speed_kph` | `float64` | No | Speed in km/h |
| `speed_mph` | `float64` | No | Speed in mph |
| `video` | `string` | No | Video URL |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `active` | `bool` | No | Whether the rocket is active |
| `boosters` | `int` | No | Number of boosters |
| `company` | `string` | No | Company |
| `cost_per_launch` | `int` | No | Cost per launch in USD |
| `country` | `string` | No | Country of origin |
| `description` | `string` | No |  |
| `diameter` | `map[string]any` | No |  |
| `first_flight` | `string` | No | Date of first flight |
| `flickr_images` | `[]any` | No |  |
| `height` | `map[string]any` | No |  |
| `id` | `string` | No | Rocket ID |
| `mass` | `map[string]any` | No |  |
| `name` | `string` | No | Rocket name |
| `stages` | `int` | No | Number of stages |
| `success_rate_pct` | `float64` | No | Success rate percentage |
| `type` | `string` | No | Rocket type |
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
| `abs` | `int` | No | ABS number |
| `class` | `int` | No | Ship class |
| `course_deg` | `float64` | No | Course in degrees |
| `home_port` | `string` | No | Home port |
| `id` | `string` | No | Ship ID |
| `image` | `string` | No | Image URL |
| `imo` | `int` | No | IMO number |
| `last_ais_update` | `string` | No | Last AIS update timestamp |
| `latitude` | `float64` | No | Latitude |
| `launches` | `[]any` | No | Launch IDs |
| `legacy_id` | `string` | No | Legacy ID |
| `link` | `string` | No | Link to ship info |
| `longitude` | `float64` | No | Longitude |
| `mass_kg` | `int` | No | Mass in kilograms |
| `mass_lbs` | `int` | No | Mass in pounds |
| `mmsi` | `int` | No | MMSI number |
| `model` | `string` | No | Ship model |
| `name` | `string` | No | Ship name |
| `roles` | `[]any` | No | Ship roles |
| `speed_kn` | `float64` | No | Speed in knots |
| `status` | `string` | No | Ship status |
| `type` | `string` | No | Ship type |
| `year_built` | `int` | No | Year built |

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
| `height_km` | `float64` | No | Current height in kilometers |
| `id` | `string` | No | Starlink satellite ID |
| `latitude` | `float64` | No | Current latitude |
| `launch` | `string` | No | Launch ID |
| `longitude` | `float64` | No | Current longitude |
| `spaceTrack` | `map[string]any` | No | Space-Track.org data |
| `velocity_kms` | `float64` | No | Current velocity in km/s |
| `version` | `string` | No | Satellite version |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

