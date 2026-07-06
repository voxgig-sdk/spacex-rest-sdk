# SpacexRest Ruby SDK Reference

Complete API reference for the SpacexRest Ruby SDK.


## SpacexRestSDK

### Constructor

```ruby
require_relative 'SpacexRest_sdk'

client = SpacexRestSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SpacexRestSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = SpacexRestSDK.test
```


### Instance Methods

#### `Capsule(data = nil)`

Create a new `Capsule` entity instance. Pass `nil` for no initial data.

#### `Core(data = nil)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Crew(data = nil)`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Landpad(data = nil)`

Create a new `Landpad` entity instance. Pass `nil` for no initial data.

#### `Launch(data = nil)`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `Launchpad(data = nil)`

Create a new `Launchpad` entity instance. Pass `nil` for no initial data.

#### `Payload(data = nil)`

Create a new `Payload` entity instance. Pass `nil` for no initial data.

#### `Roadster(data = nil)`

Create a new `Roadster` entity instance. Pass `nil` for no initial data.

#### `Rocket(data = nil)`

Create a new `Rocket` entity instance. Pass `nil` for no initial data.

#### `Ship(data = nil)`

Create a new `Ship` entity instance. Pass `nil` for no initial data.

#### `Starlink(data = nil)`

Create a new `Starlink` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CapsuleEntity

```ruby
capsule = client.Capsule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `land_landing` | `Integer` | No |  |
| `last_update` | `String` | No |  |
| `launch` | `Array` | No |  |
| `reuse_count` | `Integer` | No |  |
| `serial` | `String` | No |  |
| `status` | `String` | No |  |
| `type` | `String` | No |  |
| `water_landing` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Capsule.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Capsule.load({ "id" => "capsule_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoreEntity

```ruby
core = client.Core
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempt` | `Integer` | No |  |
| `asds_landing` | `Integer` | No |  |
| `block` | `Integer` | No |  |
| `id` | `String` | No |  |
| `last_update` | `String` | No |  |
| `launch` | `Array` | No |  |
| `reuse_count` | `Integer` | No |  |
| `rtls_attempt` | `Integer` | No |  |
| `rtls_landing` | `Integer` | No |  |
| `serial` | `String` | No |  |
| `status` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Core.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Core.load({ "id" => "core_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CrewEntity

```ruby
crew = client.Crew
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `String` | No |  |
| `id` | `String` | No |  |
| `image` | `String` | No |  |
| `launch` | `Array` | No |  |
| `name` | `String` | No |  |
| `status` | `String` | No |  |
| `wikipedia` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Crew.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Crew.load({ "id" => "crew_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LandpadEntity

```ruby
landpad = client.Landpad
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | No |  |
| `full_name` | `String` | No |  |
| `id` | `String` | No |  |
| `landing_attempt` | `Integer` | No |  |
| `landing_success` | `Integer` | No |  |
| `latitude` | `Float` | No |  |
| `launch` | `Array` | No |  |
| `locality` | `String` | No |  |
| `longitude` | `Float` | No |  |
| `name` | `String` | No |  |
| `region` | `String` | No |  |
| `status` | `String` | No |  |
| `type` | `String` | No |  |
| `wikipedia` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Landpad.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Landpad.load({ "id" => "landpad_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LandpadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LaunchEntity

```ruby
launch = client.Launch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | `Boolean` | No |  |
| `capsule` | `Array` | No |  |
| `core` | `Array` | No |  |
| `crew` | `Array` | No |  |
| `date_local` | `String` | No |  |
| `date_precision` | `String` | No |  |
| `date_unix` | `Integer` | No |  |
| `date_utc` | `String` | No |  |
| `detail` | `String` | No |  |
| `failure` | `Array` | No |  |
| `fairing` | `Hash` | No |  |
| `flight` | `Integer` | No |  |
| `flight_number` | `Integer` | No |  |
| `gridfin` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `landing_attempt` | `Boolean` | No |  |
| `landing_success` | `Boolean` | No |  |
| `landing_type` | `String` | No |  |
| `landpad` | `String` | No |  |
| `launchpad` | `String` | No |  |
| `leg` | `Boolean` | No |  |
| `link` | `Hash` | No |  |
| `name` | `String` | No |  |
| `net` | `Boolean` | No |  |
| `payload` | `Array` | No |  |
| `reused` | `Boolean` | No |  |
| `rocket` | `String` | No |  |
| `ship` | `Array` | No |  |
| `static_fire_date_unix` | `Integer` | No |  |
| `static_fire_date_utc` | `String` | No |  |
| `success` | `Boolean` | No |  |
| `tdb` | `Boolean` | No |  |
| `upcoming` | `Boolean` | No |  |
| `window` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Launch.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Launch.load({ "id" => "launch_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LaunchpadEntity

```ruby
launchpad = client.Launchpad
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | No |  |
| `full_name` | `String` | No |  |
| `id` | `String` | No |  |
| `latitude` | `Float` | No |  |
| `launch` | `Array` | No |  |
| `launch_attempt` | `Integer` | No |  |
| `launch_success` | `Integer` | No |  |
| `locality` | `String` | No |  |
| `longitude` | `Float` | No |  |
| `name` | `String` | No |  |
| `region` | `String` | No |  |
| `rocket` | `Array` | No |  |
| `status` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Launchpad.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Launchpad.load({ "id" => "launchpad_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PayloadEntity

```ruby
payload = client.Payload
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | `Float` | No |  |
| `arg_of_pericenter` | `Float` | No |  |
| `customer` | `Array` | No |  |
| `eccentricity` | `Float` | No |  |
| `epoch` | `String` | No |  |
| `id` | `String` | No |  |
| `inclination_deg` | `Float` | No |  |
| `launch` | `String` | No |  |
| `lifespan_year` | `Float` | No |  |
| `longitude` | `Float` | No |  |
| `manufacturer` | `Array` | No |  |
| `mass_kg` | `Float` | No |  |
| `mass_lb` | `Float` | No |  |
| `mean_anomaly` | `Float` | No |  |
| `mean_motion` | `Float` | No |  |
| `name` | `String` | No |  |
| `nationality` | `Array` | No |  |
| `norad_id` | `Array` | No |  |
| `orbit` | `String` | No |  |
| `periapsis_km` | `Float` | No |  |
| `period_min` | `Float` | No |  |
| `raan` | `Float` | No |  |
| `reference_system` | `String` | No |  |
| `regime` | `String` | No |  |
| `reused` | `Boolean` | No |  |
| `semi_major_axis_km` | `Float` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Payload.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Payload.load({ "id" => "payload_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PayloadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RoadsterEntity

```ruby
roadster = client.Roadster
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | `Float` | No |  |
| `detail` | `String` | No |  |
| `earth_distance_km` | `Float` | No |  |
| `earth_distance_mi` | `Float` | No |  |
| `eccentricity` | `Float` | No |  |
| `epoch_jd` | `Float` | No |  |
| `flickr_image` | `Array` | No |  |
| `id` | `String` | No |  |
| `inclination` | `Float` | No |  |
| `launch_date_unix` | `Integer` | No |  |
| `launch_date_utc` | `String` | No |  |
| `launch_mass_kg` | `Integer` | No |  |
| `launch_mass_lb` | `Integer` | No |  |
| `longitude` | `Float` | No |  |
| `mars_distance_km` | `Float` | No |  |
| `mars_distance_mi` | `Float` | No |  |
| `name` | `String` | No |  |
| `norad_id` | `Integer` | No |  |
| `orbit_type` | `String` | No |  |
| `periapsis_arg` | `Float` | No |  |
| `periapsis_au` | `Float` | No |  |
| `period_day` | `Float` | No |  |
| `semi_major_axis_au` | `Float` | No |  |
| `speed_kph` | `Float` | No |  |
| `speed_mph` | `Float` | No |  |
| `video` | `String` | No |  |
| `wikipedia` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Roadster.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RocketEntity

```ruby
rocket = client.Rocket
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | No |  |
| `booster` | `Integer` | No |  |
| `company` | `String` | No |  |
| `cost_per_launch` | `Integer` | No |  |
| `country` | `String` | No |  |
| `description` | `String` | No |  |
| `diameter` | `Hash` | No |  |
| `first_flight` | `String` | No |  |
| `flickr_image` | `Array` | No |  |
| `height` | `Hash` | No |  |
| `id` | `String` | No |  |
| `mass` | `Hash` | No |  |
| `name` | `String` | No |  |
| `stage` | `Integer` | No |  |
| `success_rate_pct` | `Float` | No |  |
| `type` | `String` | No |  |
| `wikipedia` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rocket.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Rocket.load({ "id" => "rocket_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RocketEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShipEntity

```ruby
ship = client.Ship
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | `Integer` | No |  |
| `class` | `Integer` | No |  |
| `course_deg` | `Float` | No |  |
| `home_port` | `String` | No |  |
| `id` | `String` | No |  |
| `image` | `String` | No |  |
| `imo` | `Integer` | No |  |
| `last_ais_update` | `String` | No |  |
| `latitude` | `Float` | No |  |
| `launch` | `Array` | No |  |
| `legacy_id` | `String` | No |  |
| `link` | `String` | No |  |
| `longitude` | `Float` | No |  |
| `mass_kg` | `Integer` | No |  |
| `mass_lb` | `Integer` | No |  |
| `mmsi` | `Integer` | No |  |
| `model` | `String` | No |  |
| `name` | `String` | No |  |
| `role` | `Array` | No |  |
| `speed_kn` | `Float` | No |  |
| `status` | `String` | No |  |
| `type` | `String` | No |  |
| `year_built` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Ship.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Ship.load({ "id" => "ship_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShipEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StarlinkEntity

```ruby
starlink = client.Starlink
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | `Float` | No |  |
| `id` | `String` | No |  |
| `latitude` | `Float` | No |  |
| `launch` | `String` | No |  |
| `longitude` | `Float` | No |  |
| `space_track` | `Hash` | No |  |
| `velocity_km` | `Float` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Starlink.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Starlink.load({ "id" => "starlink_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = SpacexRestSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

