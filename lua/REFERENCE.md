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
local capsule = client:capsule(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:capsule():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:capsule():load({ id = "capsule_id" })
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
local core = client:core(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:core():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:core():load({ id = "core_id" })
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
local crew = client:crew(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:crew():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:crew():load({ id = "crew_id" })
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
local landpad = client:landpad(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:landpad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:landpad():load({ id = "landpad_id" })
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
local launch = client:launch(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:launch():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:launch():load({ id = "launch_id" })
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
local launchpad = client:launchpad(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:launchpad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:launchpad():load({ id = "launchpad_id" })
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
local payload = client:payload(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:payload():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:payload():load({ id = "payload_id" })
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
local roadster = client:roadster(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:roadster():list()
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
local rocket = client:rocket(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:rocket():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:rocket():load({ id = "rocket_id" })
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
local ship = client:ship(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ship():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ship():load({ id = "ship_id" })
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
local starlink = client:starlink(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:starlink():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:starlink():load({ id = "starlink_id" })
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

