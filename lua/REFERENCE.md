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
| `id` | `string` | No | Capsule serial number |
| `land_landings` | `number` | No | Number of land landings |
| `last_update` | `string` | No | Last update about the capsule |
| `launches` | `table` | No | Launch IDs |
| `reuse_count` | `number` | No | Number of times capsule has been reused |
| `serial` | `string` | No | Capsule serial number |
| `status` | `string` | No | Capsule status |
| `type` | `string` | No | Capsule type |
| `water_landings` | `number` | No | Number of water landings |

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
| `asds_attempts` | `number` | No | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `number` | No | Number of successful ASDS landings |
| `block` | `number` | No | Core block number |
| `id` | `string` | No | Core serial number |
| `last_update` | `string` | No | Last update about the core |
| `launches` | `table` | No | Launch IDs |
| `reuse_count` | `number` | No | Number of times core has been reused |
| `rtls_attempts` | `number` | No | Number of return to launch site attempts |
| `rtls_landings` | `number` | No | Number of successful RTLS landings |
| `serial` | `string` | No | Core serial number |
| `status` | `string` | No | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | No | Agency |
| `id` | `string` | No | Crew member ID |
| `image` | `string` | No | Image URL |
| `launches` | `table` | No | Launch IDs |
| `name` | `string` | No | Crew member name |
| `status` | `string` | No | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `details` | `string` | No | Landing pad details |
| `full_name` | `string` | No | Full landing pad name |
| `id` | `string` | No | Landing pad ID |
| `landing_attempts` | `number` | No | Number of landing attempts |
| `landing_successes` | `number` | No | Number of successful landings |
| `latitude` | `number` | No | Latitude |
| `launches` | `table` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `number` | No | Longitude |
| `name` | `string` | No | Landing pad name |
| `region` | `string` | No | Region |
| `status` | `string` | No | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | No | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `auto_update` | `boolean` | No | Whether the launch data is automatically updated |
| `capsules` | `table` | No | Capsule IDs |
| `core` | `string` | No | Core ID |
| `cores` | `table` | No |  |
| `crew` | `table` | No | Crew member IDs |
| `date_local` | `string` | No | Launch date in local time |
| `date_precision` | `string` | No | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `number` | No | Launch date in unix timestamp |
| `date_utc` | `string` | No | Launch date in UTC |
| `details` | `string` | No | Launch details |
| `failures` | `table` | No | Launch failures |
| `fairings` | `table` | No |  |
| `flight` | `number` | No | Core flight number |
| `flight_number` | `number` | No | Flight number |
| `gridfins` | `boolean` | No | Whether core has grid fins |
| `id` | `string` | No | Launch ID |
| `landing_attempt` | `boolean` | No | Whether landing was attempted |
| `landing_success` | `boolean` | No | Whether landing was successful |
| `landing_type` | `string` | No | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | No | Landing pad ID |
| `launchpad` | `string` | No | Launchpad ID |
| `legs` | `boolean` | No | Whether core has legs |
| `links` | `table` | No |  |
| `name` | `string` | No | Launch name |
| `net` | `boolean` | No | No earlier than |
| `payloads` | `table` | No | Payload IDs |
| `reused` | `boolean` | No | Whether core was reused |
| `rocket` | `string` | No | Rocket ID |
| `ships` | `table` | No | Ship IDs |
| `static_fire_date_unix` | `number` | No | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | No | Static fire date in UTC |
| `success` | `boolean` | No | Launch success status |
| `tdb` | `boolean` | No | To be determined |
| `upcoming` | `boolean` | No | Whether the launch is upcoming |
| `window` | `number` | No | Launch window in seconds |

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
| `details` | `string` | No | Launchpad details |
| `full_name` | `string` | No | Full launchpad name |
| `id` | `string` | No | Launchpad ID |
| `latitude` | `number` | No | Latitude |
| `launch_attempts` | `number` | No | Number of launch attempts |
| `launch_successes` | `number` | No | Number of successful launches |
| `launches` | `table` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `number` | No | Longitude |
| `name` | `string` | No | Launchpad name |
| `region` | `string` | No | Region |
| `rockets` | `table` | No | Rocket IDs |
| `status` | `string` | No | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `number` | No | Apoapsis in km |
| `arg_of_pericenter` | `number` | No | Argument of pericenter |
| `customers` | `table` | No | Customers |
| `eccentricity` | `number` | No | Eccentricity |
| `epoch` | `string` | No | Epoch |
| `id` | `string` | No | Payload ID |
| `inclination_deg` | `number` | No | Inclination in degrees |
| `launch` | `string` | No | Launch ID |
| `lifespan_years` | `number` | No | Lifespan in years |
| `longitude` | `number` | No | Longitude |
| `manufacturers` | `table` | No | Manufacturers |
| `mass_kg` | `number` | No | Payload mass in kilograms |
| `mass_lbs` | `number` | No | Payload mass in pounds |
| `mean_anomaly` | `number` | No | Mean anomaly |
| `mean_motion` | `number` | No | Mean motion |
| `name` | `string` | No | Payload name |
| `nationalities` | `table` | No | Nationalities |
| `norad_ids` | `table` | No | NORAD IDs |
| `orbit` | `string` | No | Orbit type |
| `periapsis_km` | `number` | No | Periapsis in km |
| `period_min` | `number` | No | Orbital period in minutes |
| `raan` | `number` | No | Right ascension of the ascending node |
| `reference_system` | `string` | No | Reference system |
| `regime` | `string` | No | Orbit regime |
| `reused` | `boolean` | No | Whether the payload was reused |
| `semi_major_axis_km` | `number` | No | Semi-major axis in km |
| `type` | `string` | No | Payload type |

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
| `apoapsis_au` | `number` | No | Apoapsis in AU |
| `details` | `string` | No | Details |
| `earth_distance_km` | `number` | No | Distance from Earth in km |
| `earth_distance_mi` | `number` | No | Distance from Earth in miles |
| `eccentricity` | `number` | No | Eccentricity |
| `epoch_jd` | `number` | No | Epoch in Julian Date |
| `flickr_images` | `table` | No | Flickr images |
| `id` | `string` | No | Roadster ID |
| `inclination` | `number` | No | Inclination |
| `launch_date_unix` | `number` | No | Launch date in unix timestamp |
| `launch_date_utc` | `string` | No | Launch date in UTC |
| `launch_mass_kg` | `number` | No | Launch mass in kilograms |
| `launch_mass_lbs` | `number` | No | Launch mass in pounds |
| `longitude` | `number` | No | Longitude |
| `mars_distance_km` | `number` | No | Distance from Mars in km |
| `mars_distance_mi` | `number` | No | Distance from Mars in miles |
| `name` | `string` | No | Roadster name |
| `norad_id` | `number` | No | NORAD ID |
| `orbit_type` | `string` | No | Orbit type |
| `periapsis_arg` | `number` | No | Argument of periapsis |
| `periapsis_au` | `number` | No | Periapsis in AU |
| `period_days` | `number` | No | Orbital period in days |
| `semi_major_axis_au` | `number` | No | Semi-major axis in AU |
| `speed_kph` | `number` | No | Speed in km/h |
| `speed_mph` | `number` | No | Speed in mph |
| `video` | `string` | No | Video URL |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `active` | `boolean` | No | Whether the rocket is active |
| `boosters` | `number` | No | Number of boosters |
| `company` | `string` | No | Company |
| `cost_per_launch` | `number` | No | Cost per launch in USD |
| `country` | `string` | No | Country of origin |
| `description` | `string` | No |  |
| `diameter` | `table` | No |  |
| `first_flight` | `string` | No | Date of first flight |
| `flickr_images` | `table` | No |  |
| `height` | `table` | No |  |
| `id` | `string` | No | Rocket ID |
| `mass` | `table` | No |  |
| `name` | `string` | No | Rocket name |
| `stages` | `number` | No | Number of stages |
| `success_rate_pct` | `number` | No | Success rate percentage |
| `type` | `string` | No | Rocket type |
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
| `abs` | `number` | No | ABS number |
| `class` | `number` | No | Ship class |
| `course_deg` | `number` | No | Course in degrees |
| `home_port` | `string` | No | Home port |
| `id` | `string` | No | Ship ID |
| `image` | `string` | No | Image URL |
| `imo` | `number` | No | IMO number |
| `last_ais_update` | `string` | No | Last AIS update timestamp |
| `latitude` | `number` | No | Latitude |
| `launches` | `table` | No | Launch IDs |
| `legacy_id` | `string` | No | Legacy ID |
| `link` | `string` | No | Link to ship info |
| `longitude` | `number` | No | Longitude |
| `mass_kg` | `number` | No | Mass in kilograms |
| `mass_lbs` | `number` | No | Mass in pounds |
| `mmsi` | `number` | No | MMSI number |
| `model` | `string` | No | Ship model |
| `name` | `string` | No | Ship name |
| `roles` | `table` | No | Ship roles |
| `speed_kn` | `number` | No | Speed in knots |
| `status` | `string` | No | Ship status |
| `type` | `string` | No | Ship type |
| `year_built` | `number` | No | Year built |

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
| `height_km` | `number` | No | Current height in kilometers |
| `id` | `string` | No | Starlink satellite ID |
| `latitude` | `number` | No | Current latitude |
| `launch` | `string` | No | Launch ID |
| `longitude` | `number` | No | Current longitude |
| `spaceTrack` | `table` | No | Space-Track.org data |
| `velocity_kms` | `number` | No | Current velocity in km/s |
| `version` | `string` | No | Satellite version |

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

