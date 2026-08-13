# SpacexRest Lua SDK Reference

Complete API reference for the SpacexRest Lua SDK.


## SpacexRestSDK

### Constructor

```lua
local sdk = require("spacex-rest_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Capsule(data)`

Create a new `Capsule` entity instance. Pass `nil` for no initial data.

#### `Core(data)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Crew(data)`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Landpad(data)`

Create a new `Landpad` entity instance. Pass `nil` for no initial data.

#### `Launch(data)`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `Launchpad(data)`

Create a new `Launchpad` entity instance. Pass `nil` for no initial data.

#### `Payload(data)`

Create a new `Payload` entity instance. Pass `nil` for no initial data.

#### `Roadster(data)`

Create a new `Roadster` entity instance. Pass `nil` for no initial data.

#### `Rocket(data)`

Create a new `Rocket` entity instance. Pass `nil` for no initial data.

#### `Ship(data)`

Create a new `Ship` entity instance. Pass `nil` for no initial data.

#### `Starlink(data)`

Create a new `Starlink` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CapsuleEntity

```lua
local capsule = client:Capsule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `land_landings` | `number` | No |  |
| `last_update` | `string` | No |  |
| `launches` | `table` | No |  |
| `reuse_count` | `number` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `water_landings` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Capsule():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Capsule():load({ id = "capsule_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoreEntity

```lua
local core = client:Core(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempts` | `number` | No |  |
| `asds_landings` | `number` | No |  |
| `block` | `number` | No |  |
| `id` | `string` | No |  |
| `last_update` | `string` | No |  |
| `launches` | `table` | No |  |
| `reuse_count` | `number` | No |  |
| `rtls_attempts` | `number` | No |  |
| `rtls_landings` | `number` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Core():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Core():load({ id = "core_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CrewEntity

```lua
local crew = client:Crew(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launches` | `table` | No |  |
| `name` | `string` | No |  |
| `status` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Crew():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Crew():load({ id = "crew_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LandpadEntity

```lua
local landpad = client:Landpad(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `landing_attempts` | `number` | No |  |
| `landing_successes` | `number` | No |  |
| `latitude` | `number` | No |  |
| `launches` | `table` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `number` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Landpad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Landpad():load({ id = "landpad_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LandpadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LaunchEntity

```lua
local launch = client:Launch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | `boolean` | No |  |
| `capsules` | `table` | No |  |
| `core` | `string` | No |  |
| `cores` | `table` | No |  |
| `crew` | `table` | No |  |
| `date_local` | `string` | No |  |
| `date_precision` | `string` | No |  |
| `date_unix` | `number` | No |  |
| `date_utc` | `string` | No |  |
| `details` | `string` | No |  |
| `failures` | `table` | No |  |
| `fairings` | `table` | No |  |
| `flight` | `number` | No |  |
| `flight_number` | `number` | No |  |
| `gridfins` | `boolean` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `boolean` | No |  |
| `landing_success` | `boolean` | No |  |
| `landing_type` | `string` | No |  |
| `landpad` | `string` | No |  |
| `launchpad` | `string` | No |  |
| `legs` | `boolean` | No |  |
| `links` | `table` | No |  |
| `name` | `string` | No |  |
| `net` | `boolean` | No |  |
| `payloads` | `table` | No |  |
| `reused` | `boolean` | No |  |
| `rocket` | `string` | No |  |
| `ships` | `table` | No |  |
| `static_fire_date_unix` | `number` | No |  |
| `static_fire_date_utc` | `string` | No |  |
| `success` | `boolean` | No |  |
| `tdb` | `boolean` | No |  |
| `upcoming` | `boolean` | No |  |
| `window` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Launch():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Launch():load({ id = "launch_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LaunchpadEntity

```lua
local launchpad = client:Launchpad(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launch_attempts` | `number` | No |  |
| `launch_successes` | `number` | No |  |
| `launches` | `table` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `number` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `rockets` | `table` | No |  |
| `status` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Launchpad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Launchpad():load({ id = "launchpad_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PayloadEntity

```lua
local payload = client:Payload(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | `number` | No |  |
| `arg_of_pericenter` | `number` | No |  |
| `customers` | `table` | No |  |
| `eccentricity` | `number` | No |  |
| `epoch` | `string` | No |  |
| `id` | `string` | No |  |
| `inclination_deg` | `number` | No |  |
| `launch` | `string` | No |  |
| `lifespan_years` | `number` | No |  |
| `longitude` | `number` | No |  |
| `manufacturers` | `table` | No |  |
| `mass_kg` | `number` | No |  |
| `mass_lbs` | `number` | No |  |
| `mean_anomaly` | `number` | No |  |
| `mean_motion` | `number` | No |  |
| `name` | `string` | No |  |
| `nationalities` | `table` | No |  |
| `norad_ids` | `table` | No |  |
| `orbit` | `string` | No |  |
| `periapsis_km` | `number` | No |  |
| `period_min` | `number` | No |  |
| `raan` | `number` | No |  |
| `reference_system` | `string` | No |  |
| `regime` | `string` | No |  |
| `reused` | `boolean` | No |  |
| `semi_major_axis_km` | `number` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Payload():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Payload():load({ id = "payload_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayloadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RoadsterEntity

```lua
local roadster = client:Roadster(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | `number` | No |  |
| `details` | `string` | No |  |
| `earth_distance_km` | `number` | No |  |
| `earth_distance_mi` | `number` | No |  |
| `eccentricity` | `number` | No |  |
| `epoch_jd` | `number` | No |  |
| `flickr_images` | `table` | No |  |
| `id` | `string` | No |  |
| `inclination` | `number` | No |  |
| `launch_date_unix` | `number` | No |  |
| `launch_date_utc` | `string` | No |  |
| `launch_mass_kg` | `number` | No |  |
| `launch_mass_lbs` | `number` | No |  |
| `longitude` | `number` | No |  |
| `mars_distance_km` | `number` | No |  |
| `mars_distance_mi` | `number` | No |  |
| `name` | `string` | No |  |
| `norad_id` | `number` | No |  |
| `orbit_type` | `string` | No |  |
| `periapsis_arg` | `number` | No |  |
| `periapsis_au` | `number` | No |  |
| `period_days` | `number` | No |  |
| `semi_major_axis_au` | `number` | No |  |
| `speed_kph` | `number` | No |  |
| `speed_mph` | `number` | No |  |
| `video` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Roadster():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RocketEntity

```lua
local rocket = client:Rocket(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No |  |
| `boosters` | `number` | No |  |
| `company` | `string` | No |  |
| `cost_per_launch` | `number` | No |  |
| `country` | `string` | No |  |
| `description` | `string` | No |  |
| `diameter` | `table` | No |  |
| `first_flight` | `string` | No |  |
| `flickr_images` | `table` | No |  |
| `height` | `table` | No |  |
| `id` | `string` | No |  |
| `mass` | `table` | No |  |
| `name` | `string` | No |  |
| `stages` | `number` | No |  |
| `success_rate_pct` | `number` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rocket():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Rocket():load({ id = "rocket_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RocketEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ShipEntity

```lua
local ship = client:Ship(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | `number` | No |  |
| `class` | `number` | No |  |
| `course_deg` | `number` | No |  |
| `home_port` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `imo` | `number` | No |  |
| `last_ais_update` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launches` | `table` | No |  |
| `legacy_id` | `string` | No |  |
| `link` | `string` | No |  |
| `longitude` | `number` | No |  |
| `mass_kg` | `number` | No |  |
| `mass_lbs` | `number` | No |  |
| `mmsi` | `number` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `roles` | `table` | No |  |
| `speed_kn` | `number` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `year_built` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ship():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ship():load({ id = "ship_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShipEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StarlinkEntity

```lua
local starlink = client:Starlink(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | `number` | No |  |
| `id` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launch` | `string` | No |  |
| `longitude` | `number` | No |  |
| `spaceTrack` | `table` | No |  |
| `velocity_kms` | `number` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Starlink():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Starlink():load({ id = "starlink_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

