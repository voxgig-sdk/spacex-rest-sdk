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
| `id` | `String` | No | Capsule serial number |
| `land_landings` | `Integer` | No | Number of land landings |
| `last_update` | `String` | No | Last update about the capsule |
| `launches` | `Array` | No | Launch IDs |
| `reuse_count` | `Integer` | No | Number of times capsule has been reused |
| `serial` | `String` | No | Capsule serial number |
| `status` | `String` | No | Capsule status |
| `type` | `String` | No | Capsule type |
| `water_landings` | `Integer` | No | Number of water landings |

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
| `asds_attempts` | `Integer` | No | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `Integer` | No | Number of successful ASDS landings |
| `block` | `Integer` | No | Core block number |
| `id` | `String` | No | Core serial number |
| `last_update` | `String` | No | Last update about the core |
| `launches` | `Array` | No | Launch IDs |
| `reuse_count` | `Integer` | No | Number of times core has been reused |
| `rtls_attempts` | `Integer` | No | Number of return to launch site attempts |
| `rtls_landings` | `Integer` | No | Number of successful RTLS landings |
| `serial` | `String` | No | Core serial number |
| `status` | `String` | No | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `String` | No | Agency |
| `id` | `String` | No | Crew member ID |
| `image` | `String` | No | Image URL |
| `launches` | `Array` | No | Launch IDs |
| `name` | `String` | No | Crew member name |
| `status` | `String` | No | Status (active, inactive, retired, unknown) |
| `wikipedia` | `String` | No | Wikipedia URL |

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
| `details` | `String` | No | Landing pad details |
| `full_name` | `String` | No | Full landing pad name |
| `id` | `String` | No | Landing pad ID |
| `landing_attempts` | `Integer` | No | Number of landing attempts |
| `landing_successes` | `Integer` | No | Number of successful landings |
| `latitude` | `Float` | No | Latitude |
| `launches` | `Array` | No | Launch IDs |
| `locality` | `String` | No | Locality |
| `longitude` | `Float` | No | Longitude |
| `name` | `String` | No | Landing pad name |
| `region` | `String` | No | Region |
| `status` | `String` | No | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `String` | No | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `String` | No | Wikipedia URL |

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
| `auto_update` | `Boolean` | No | Whether the launch data is automatically updated |
| `capsules` | `Array` | No | Capsule IDs |
| `core` | `String` | No | Core ID |
| `cores` | `Array` | No |  |
| `crew` | `Array` | No | Crew member IDs |
| `date_local` | `String` | No | Launch date in local time |
| `date_precision` | `String` | No | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `Integer` | No | Launch date in unix timestamp |
| `date_utc` | `String` | No | Launch date in UTC |
| `details` | `String` | No | Launch details |
| `failures` | `Array` | No | Launch failures |
| `fairings` | `Hash` | No |  |
| `flight` | `Integer` | No | Core flight number |
| `flight_number` | `Integer` | No | Flight number |
| `gridfins` | `Boolean` | No | Whether core has grid fins |
| `id` | `String` | No | Launch ID |
| `landing_attempt` | `Boolean` | No | Whether landing was attempted |
| `landing_success` | `Boolean` | No | Whether landing was successful |
| `landing_type` | `String` | No | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `String` | No | Landing pad ID |
| `launchpad` | `String` | No | Launchpad ID |
| `legs` | `Boolean` | No | Whether core has legs |
| `links` | `Hash` | No |  |
| `name` | `String` | No | Launch name |
| `net` | `Boolean` | No | No earlier than |
| `payloads` | `Array` | No | Payload IDs |
| `reused` | `Boolean` | No | Whether core was reused |
| `rocket` | `String` | No | Rocket ID |
| `ships` | `Array` | No | Ship IDs |
| `static_fire_date_unix` | `Integer` | No | Static fire date in unix timestamp |
| `static_fire_date_utc` | `String` | No | Static fire date in UTC |
| `success` | `Boolean` | No | Launch success status |
| `tdb` | `Boolean` | No | To be determined |
| `upcoming` | `Boolean` | No | Whether the launch is upcoming |
| `window` | `Integer` | No | Launch window in seconds |

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
| `details` | `String` | No | Launchpad details |
| `full_name` | `String` | No | Full launchpad name |
| `id` | `String` | No | Launchpad ID |
| `latitude` | `Float` | No | Latitude |
| `launch_attempts` | `Integer` | No | Number of launch attempts |
| `launch_successes` | `Integer` | No | Number of successful launches |
| `launches` | `Array` | No | Launch IDs |
| `locality` | `String` | No | Locality |
| `longitude` | `Float` | No | Longitude |
| `name` | `String` | No | Launchpad name |
| `region` | `String` | No | Region |
| `rockets` | `Array` | No | Rocket IDs |
| `status` | `String` | No | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `Float` | No | Apoapsis in km |
| `arg_of_pericenter` | `Float` | No | Argument of pericenter |
| `customers` | `Array` | No | Customers |
| `eccentricity` | `Float` | No | Eccentricity |
| `epoch` | `String` | No | Epoch |
| `id` | `String` | No | Payload ID |
| `inclination_deg` | `Float` | No | Inclination in degrees |
| `launch` | `String` | No | Launch ID |
| `lifespan_years` | `Float` | No | Lifespan in years |
| `longitude` | `Float` | No | Longitude |
| `manufacturers` | `Array` | No | Manufacturers |
| `mass_kg` | `Float` | No | Payload mass in kilograms |
| `mass_lbs` | `Float` | No | Payload mass in pounds |
| `mean_anomaly` | `Float` | No | Mean anomaly |
| `mean_motion` | `Float` | No | Mean motion |
| `name` | `String` | No | Payload name |
| `nationalities` | `Array` | No | Nationalities |
| `norad_ids` | `Array` | No | NORAD IDs |
| `orbit` | `String` | No | Orbit type |
| `periapsis_km` | `Float` | No | Periapsis in km |
| `period_min` | `Float` | No | Orbital period in minutes |
| `raan` | `Float` | No | Right ascension of the ascending node |
| `reference_system` | `String` | No | Reference system |
| `regime` | `String` | No | Orbit regime |
| `reused` | `Boolean` | No | Whether the payload was reused |
| `semi_major_axis_km` | `Float` | No | Semi-major axis in km |
| `type` | `String` | No | Payload type |

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
| `apoapsis_au` | `Float` | No | Apoapsis in AU |
| `details` | `String` | No | Details |
| `earth_distance_km` | `Float` | No | Distance from Earth in km |
| `earth_distance_mi` | `Float` | No | Distance from Earth in miles |
| `eccentricity` | `Float` | No | Eccentricity |
| `epoch_jd` | `Float` | No | Epoch in Julian Date |
| `flickr_images` | `Array` | No | Flickr images |
| `id` | `String` | No | Roadster ID |
| `inclination` | `Float` | No | Inclination |
| `launch_date_unix` | `Integer` | No | Launch date in unix timestamp |
| `launch_date_utc` | `String` | No | Launch date in UTC |
| `launch_mass_kg` | `Integer` | No | Launch mass in kilograms |
| `launch_mass_lbs` | `Integer` | No | Launch mass in pounds |
| `longitude` | `Float` | No | Longitude |
| `mars_distance_km` | `Float` | No | Distance from Mars in km |
| `mars_distance_mi` | `Float` | No | Distance from Mars in miles |
| `name` | `String` | No | Roadster name |
| `norad_id` | `Integer` | No | NORAD ID |
| `orbit_type` | `String` | No | Orbit type |
| `periapsis_arg` | `Float` | No | Argument of periapsis |
| `periapsis_au` | `Float` | No | Periapsis in AU |
| `period_days` | `Float` | No | Orbital period in days |
| `semi_major_axis_au` | `Float` | No | Semi-major axis in AU |
| `speed_kph` | `Float` | No | Speed in km/h |
| `speed_mph` | `Float` | No | Speed in mph |
| `video` | `String` | No | Video URL |
| `wikipedia` | `String` | No | Wikipedia URL |

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
| `active` | `Boolean` | No | Whether the rocket is active |
| `boosters` | `Integer` | No | Number of boosters |
| `company` | `String` | No | Company |
| `cost_per_launch` | `Integer` | No | Cost per launch in USD |
| `country` | `String` | No | Country of origin |
| `description` | `String` | No |  |
| `diameter` | `Hash` | No |  |
| `first_flight` | `String` | No | Date of first flight |
| `flickr_images` | `Array` | No |  |
| `height` | `Hash` | No |  |
| `id` | `String` | No | Rocket ID |
| `mass` | `Hash` | No |  |
| `name` | `String` | No | Rocket name |
| `stages` | `Integer` | No | Number of stages |
| `success_rate_pct` | `Float` | No | Success rate percentage |
| `type` | `String` | No | Rocket type |
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
| `abs` | `Integer` | No | ABS number |
| `class` | `Integer` | No | Ship class |
| `course_deg` | `Float` | No | Course in degrees |
| `home_port` | `String` | No | Home port |
| `id` | `String` | No | Ship ID |
| `image` | `String` | No | Image URL |
| `imo` | `Integer` | No | IMO number |
| `last_ais_update` | `String` | No | Last AIS update timestamp |
| `latitude` | `Float` | No | Latitude |
| `launches` | `Array` | No | Launch IDs |
| `legacy_id` | `String` | No | Legacy ID |
| `link` | `String` | No | Link to ship info |
| `longitude` | `Float` | No | Longitude |
| `mass_kg` | `Integer` | No | Mass in kilograms |
| `mass_lbs` | `Integer` | No | Mass in pounds |
| `mmsi` | `Integer` | No | MMSI number |
| `model` | `String` | No | Ship model |
| `name` | `String` | No | Ship name |
| `roles` | `Array` | No | Ship roles |
| `speed_kn` | `Float` | No | Speed in knots |
| `status` | `String` | No | Ship status |
| `type` | `String` | No | Ship type |
| `year_built` | `Integer` | No | Year built |

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
| `height_km` | `Float` | No | Current height in kilometers |
| `id` | `String` | No | Starlink satellite ID |
| `latitude` | `Float` | No | Current latitude |
| `launch` | `String` | No | Launch ID |
| `longitude` | `Float` | No | Current longitude |
| `spaceTrack` | `Hash` | No | Space-Track.org data |
| `velocity_kms` | `Float` | No | Current velocity in km/s |
| `version` | `String` | No | Satellite version |

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

