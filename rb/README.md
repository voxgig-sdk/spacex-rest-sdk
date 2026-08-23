# SpacexRest Ruby SDK



The Ruby SDK for the SpacexRest API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Capsule` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/spacex-rest-sdk/releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "SpacexRest_sdk"

client = SpacexRestSDK.new
```

### 2. List capsule records

```ruby
begin
  # list returns an Array of Capsule records — iterate directly.
  capsules = client.Capsule.list
  capsules.each do |item|
    puts "#{item["id"]} #{item["land_landings"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a capsule

```ruby
begin
  # load returns the ENTITY — call data_get for the Capsule record (raises on error).
  capsule = client.Capsule.load({ "id" => "example_id" })
  puts capsule
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  landpads = client.Landpad.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = SpacexRestSDK.test({
  "entity" => { "landpad" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
landpad = client.Landpad.list()
puts landpad
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = SpacexRestSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### SpacexRestSDK

```ruby
require_relative "SpacexRest_sdk"
client = SpacexRestSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = SpacexRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SpacexRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Capsule` | `(data) -> CapsuleEntity` | Create a Capsule entity instance. |
| `Core` | `(data) -> CoreEntity` | Create a Core entity instance. |
| `Crew` | `(data) -> CrewEntity` | Create a Crew entity instance. |
| `Landpad` | `(data) -> LandpadEntity` | Create a Landpad entity instance. |
| `Launch` | `(data) -> LaunchEntity` | Create a Launch entity instance. |
| `Launchpad` | `(data) -> LaunchpadEntity` | Create a Launchpad entity instance. |
| `Payload` | `(data) -> PayloadEntity` | Create a Payload entity instance. |
| `Roadster` | `(data) -> RoadsterEntity` | Create a Roadster entity instance. |
| `Rocket` | `(data) -> RocketEntity` | Create a Rocket entity instance. |
| `Ship` | `(data) -> ShipEntity` | Create a Ship entity instance. |
| `Starlink` | `(data) -> StarlinkEntity` | Create a Starlink entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `SpacexRestError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Capsule

| Field | Description |
| --- | --- |
| `id` | Capsule serial number |
| `land_landings` | Number of land landings |
| `last_update` | Last update about the capsule |
| `launches` | Launch IDs |
| `reuse_count` | Number of times capsule has been reused |
| `serial` | Capsule serial number |
| `status` | Capsule status |
| `type` | Capsule type |
| `water_landings` | Number of water landings |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `asds_attempts` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | Number of successful ASDS landings |
| `block` | Core block number |
| `id` | Core serial number |
| `last_update` | Last update about the core |
| `launches` | Launch IDs |
| `reuse_count` | Number of times core has been reused |
| `rtls_attempts` | Number of return to launch site attempts |
| `rtls_landings` | Number of successful RTLS landings |
| `serial` | Core serial number |
| `status` | Core status (active, inactive, unknown, expended, lost, retired) |

Operations: List, Load.

API path: `/cores`

#### Crew

| Field | Description |
| --- | --- |
| `agency` | Agency |
| `id` | Crew member ID |
| `image` | Image URL |
| `launches` | Launch IDs |
| `name` | Crew member name |
| `status` | Status (active, inactive, retired, unknown) |
| `wikipedia` | Wikipedia URL |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `details` | Landing pad details |
| `full_name` | Full landing pad name |
| `id` | Landing pad ID |
| `landing_attempts` | Number of landing attempts |
| `landing_successes` | Number of successful landings |
| `latitude` | Latitude |
| `launches` | Launch IDs |
| `locality` | Locality |
| `longitude` | Longitude |
| `name` | Landing pad name |
| `region` | Region |
| `status` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | Wikipedia URL |

Operations: List, Load.

API path: `/landpads`

#### Launch

| Field | Description |
| --- | --- |
| `auto_update` | Whether the launch data is automatically updated |
| `capsules` | Capsule IDs |
| `core` | Core ID |
| `cores` |  |
| `crew` | Crew member IDs |
| `date_local` | Launch date in local time |
| `date_precision` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | Launch date in unix timestamp |
| `date_utc` | Launch date in UTC |
| `details` | Launch details |
| `failures` | Launch failures |
| `fairings` |  |
| `flight` | Core flight number |
| `flight_number` | Flight number |
| `gridfins` | Whether core has grid fins |
| `id` | Launch ID |
| `landing_attempt` | Whether landing was attempted |
| `landing_success` | Whether landing was successful |
| `landing_type` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | Landing pad ID |
| `launchpad` | Launchpad ID |
| `legs` | Whether core has legs |
| `links` |  |
| `name` | Launch name |
| `net` | No earlier than |
| `payloads` | Payload IDs |
| `reused` | Whether core was reused |
| `rocket` | Rocket ID |
| `ships` | Ship IDs |
| `static_fire_date_unix` | Static fire date in unix timestamp |
| `static_fire_date_utc` | Static fire date in UTC |
| `success` | Launch success status |
| `tdb` | To be determined |
| `upcoming` | Whether the launch is upcoming |
| `window` | Launch window in seconds |

Operations: List, Load.

API path: `/launches`

#### Launchpad

| Field | Description |
| --- | --- |
| `details` | Launchpad details |
| `full_name` | Full launchpad name |
| `id` | Launchpad ID |
| `latitude` | Latitude |
| `launch_attempts` | Number of launch attempts |
| `launch_successes` | Number of successful launches |
| `launches` | Launch IDs |
| `locality` | Locality |
| `longitude` | Longitude |
| `name` | Launchpad name |
| `region` | Region |
| `rockets` | Rocket IDs |
| `status` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `apoapsis_km` | Apoapsis in km |
| `arg_of_pericenter` | Argument of pericenter |
| `customers` | Customers |
| `eccentricity` | Eccentricity |
| `epoch` | Epoch |
| `id` | Payload ID |
| `inclination_deg` | Inclination in degrees |
| `launch` | Launch ID |
| `lifespan_years` | Lifespan in years |
| `longitude` | Longitude |
| `manufacturers` | Manufacturers |
| `mass_kg` | Payload mass in kilograms |
| `mass_lbs` | Payload mass in pounds |
| `mean_anomaly` | Mean anomaly |
| `mean_motion` | Mean motion |
| `name` | Payload name |
| `nationalities` | Nationalities |
| `norad_ids` | NORAD IDs |
| `orbit` | Orbit type |
| `periapsis_km` | Periapsis in km |
| `period_min` | Orbital period in minutes |
| `raan` | Right ascension of the ascending node |
| `reference_system` | Reference system |
| `regime` | Orbit regime |
| `reused` | Whether the payload was reused |
| `semi_major_axis_km` | Semi-major axis in km |
| `type` | Payload type |

Operations: List, Load.

API path: `/payloads`

#### Roadster

| Field | Description |
| --- | --- |
| `apoapsis_au` | Apoapsis in AU |
| `details` | Details |
| `earth_distance_km` | Distance from Earth in km |
| `earth_distance_mi` | Distance from Earth in miles |
| `eccentricity` | Eccentricity |
| `epoch_jd` | Epoch in Julian Date |
| `flickr_images` | Flickr images |
| `id` | Roadster ID |
| `inclination` | Inclination |
| `launch_date_unix` | Launch date in unix timestamp |
| `launch_date_utc` | Launch date in UTC |
| `launch_mass_kg` | Launch mass in kilograms |
| `launch_mass_lbs` | Launch mass in pounds |
| `longitude` | Longitude |
| `mars_distance_km` | Distance from Mars in km |
| `mars_distance_mi` | Distance from Mars in miles |
| `name` | Roadster name |
| `norad_id` | NORAD ID |
| `orbit_type` | Orbit type |
| `periapsis_arg` | Argument of periapsis |
| `periapsis_au` | Periapsis in AU |
| `period_days` | Orbital period in days |
| `semi_major_axis_au` | Semi-major axis in AU |
| `speed_kph` | Speed in km/h |
| `speed_mph` | Speed in mph |
| `video` | Video URL |
| `wikipedia` | Wikipedia URL |

Operations: List.

API path: `/roadster`

#### Rocket

| Field | Description |
| --- | --- |
| `active` | Whether the rocket is active |
| `boosters` | Number of boosters |
| `company` | Company |
| `cost_per_launch` | Cost per launch in USD |
| `country` | Country of origin |
| `description` |  |
| `diameter` |  |
| `first_flight` | Date of first flight |
| `flickr_images` |  |
| `height` |  |
| `id` | Rocket ID |
| `mass` |  |
| `name` | Rocket name |
| `stages` | Number of stages |
| `success_rate_pct` | Success rate percentage |
| `type` | Rocket type |
| `wikipedia` |  |

Operations: List, Load.

API path: `/rockets`

#### Ship

| Field | Description |
| --- | --- |
| `abs` | ABS number |
| `class` | Ship class |
| `course_deg` | Course in degrees |
| `home_port` | Home port |
| `id` | Ship ID |
| `image` | Image URL |
| `imo` | IMO number |
| `last_ais_update` | Last AIS update timestamp |
| `latitude` | Latitude |
| `launches` | Launch IDs |
| `legacy_id` | Legacy ID |
| `link` | Link to ship info |
| `longitude` | Longitude |
| `mass_kg` | Mass in kilograms |
| `mass_lbs` | Mass in pounds |
| `mmsi` | MMSI number |
| `model` | Ship model |
| `name` | Ship name |
| `roles` | Ship roles |
| `speed_kn` | Speed in knots |
| `status` | Ship status |
| `type` | Ship type |
| `year_built` | Year built |

Operations: List, Load.

API path: `/ships`

#### Starlink

| Field | Description |
| --- | --- |
| `height_km` | Current height in kilometers |
| `id` | Starlink satellite ID |
| `latitude` | Current latitude |
| `launch` | Launch ID |
| `longitude` | Current longitude |
| `spaceTrack` | Space-Track.org data |
| `velocity_kms` | Current velocity in km/s |
| `version` | Satellite version |

Operations: List, Load.

API path: `/starlink`



## Entities


### Capsule

Create an instance: `capsule = client.Capsule`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` | Capsule serial number |
| `land_landings` | `Integer` | Number of land landings |
| `last_update` | `String` | Last update about the capsule |
| `launches` | `Array` | Launch IDs |
| `reuse_count` | `Integer` | Number of times capsule has been reused |
| `serial` | `String` | Capsule serial number |
| `status` | `String` | Capsule status |
| `type` | `String` | Capsule type |
| `water_landings` | `Integer` | Number of water landings |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Capsule record (raises on error).
capsule = client.Capsule.load({ "id" => "capsule_id" })
```

#### Example: List

```ruby
# list returns an Array of Capsule records (raises on error).
capsules = client.Capsule.list
```


### Core

Create an instance: `core = client.Core`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asds_attempts` | `Integer` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `Integer` | Number of successful ASDS landings |
| `block` | `Integer` | Core block number |
| `id` | `String` | Core serial number |
| `last_update` | `String` | Last update about the core |
| `launches` | `Array` | Launch IDs |
| `reuse_count` | `Integer` | Number of times core has been reused |
| `rtls_attempts` | `Integer` | Number of return to launch site attempts |
| `rtls_landings` | `Integer` | Number of successful RTLS landings |
| `serial` | `String` | Core serial number |
| `status` | `String` | Core status (active, inactive, unknown, expended, lost, retired) |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Core record (raises on error).
core = client.Core.load({ "id" => "core_id" })
```

#### Example: List

```ruby
# list returns an Array of Core records (raises on error).
cores = client.Core.list
```


### Crew

Create an instance: `crew = client.Crew`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `String` | Agency |
| `id` | `String` | Crew member ID |
| `image` | `String` | Image URL |
| `launches` | `Array` | Launch IDs |
| `name` | `String` | Crew member name |
| `status` | `String` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `String` | Wikipedia URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Crew record (raises on error).
crew = client.Crew.load({ "id" => "crew_id" })
```

#### Example: List

```ruby
# list returns an Array of Crew records (raises on error).
crews = client.Crew.list
```


### Landpad

Create an instance: `landpad = client.Landpad`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `String` | Landing pad details |
| `full_name` | `String` | Full landing pad name |
| `id` | `String` | Landing pad ID |
| `landing_attempts` | `Integer` | Number of landing attempts |
| `landing_successes` | `Integer` | Number of successful landings |
| `latitude` | `Float` | Latitude |
| `launches` | `Array` | Launch IDs |
| `locality` | `String` | Locality |
| `longitude` | `Float` | Longitude |
| `name` | `String` | Landing pad name |
| `region` | `String` | Region |
| `status` | `String` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `String` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `String` | Wikipedia URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Landpad record (raises on error).
landpad = client.Landpad.load({ "id" => "landpad_id" })
```

#### Example: List

```ruby
# list returns an Array of Landpad records (raises on error).
landpads = client.Landpad.list
```


### Launch

Create an instance: `launch = client.Launch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | `Boolean` | Whether the launch data is automatically updated |
| `capsules` | `Array` | Capsule IDs |
| `core` | `String` | Core ID |
| `cores` | `Array` |  |
| `crew` | `Array` | Crew member IDs |
| `date_local` | `String` | Launch date in local time |
| `date_precision` | `String` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `Integer` | Launch date in unix timestamp |
| `date_utc` | `String` | Launch date in UTC |
| `details` | `String` | Launch details |
| `failures` | `Array` | Launch failures |
| `fairings` | `Hash` |  |
| `flight` | `Integer` | Core flight number |
| `flight_number` | `Integer` | Flight number |
| `gridfins` | `Boolean` | Whether core has grid fins |
| `id` | `String` | Launch ID |
| `landing_attempt` | `Boolean` | Whether landing was attempted |
| `landing_success` | `Boolean` | Whether landing was successful |
| `landing_type` | `String` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `String` | Landing pad ID |
| `launchpad` | `String` | Launchpad ID |
| `legs` | `Boolean` | Whether core has legs |
| `links` | `Hash` |  |
| `name` | `String` | Launch name |
| `net` | `Boolean` | No earlier than |
| `payloads` | `Array` | Payload IDs |
| `reused` | `Boolean` | Whether core was reused |
| `rocket` | `String` | Rocket ID |
| `ships` | `Array` | Ship IDs |
| `static_fire_date_unix` | `Integer` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `String` | Static fire date in UTC |
| `success` | `Boolean` | Launch success status |
| `tdb` | `Boolean` | To be determined |
| `upcoming` | `Boolean` | Whether the launch is upcoming |
| `window` | `Integer` | Launch window in seconds |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Launch record (raises on error).
launch = client.Launch.load({ "id" => "launch_id" })
```

#### Example: List

```ruby
# list returns an Array of Launch records (raises on error).
launchs = client.Launch.list
```


### Launchpad

Create an instance: `launchpad = client.Launchpad`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `String` | Launchpad details |
| `full_name` | `String` | Full launchpad name |
| `id` | `String` | Launchpad ID |
| `latitude` | `Float` | Latitude |
| `launch_attempts` | `Integer` | Number of launch attempts |
| `launch_successes` | `Integer` | Number of successful launches |
| `launches` | `Array` | Launch IDs |
| `locality` | `String` | Locality |
| `longitude` | `Float` | Longitude |
| `name` | `String` | Launchpad name |
| `region` | `String` | Region |
| `rockets` | `Array` | Rocket IDs |
| `status` | `String` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Launchpad record (raises on error).
launchpad = client.Launchpad.load({ "id" => "launchpad_id" })
```

#### Example: List

```ruby
# list returns an Array of Launchpad records (raises on error).
launchpads = client.Launchpad.list
```


### Payload

Create an instance: `payload = client.Payload`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_km` | `Float` | Apoapsis in km |
| `arg_of_pericenter` | `Float` | Argument of pericenter |
| `customers` | `Array` | Customers |
| `eccentricity` | `Float` | Eccentricity |
| `epoch` | `String` | Epoch |
| `id` | `String` | Payload ID |
| `inclination_deg` | `Float` | Inclination in degrees |
| `launch` | `String` | Launch ID |
| `lifespan_years` | `Float` | Lifespan in years |
| `longitude` | `Float` | Longitude |
| `manufacturers` | `Array` | Manufacturers |
| `mass_kg` | `Float` | Payload mass in kilograms |
| `mass_lbs` | `Float` | Payload mass in pounds |
| `mean_anomaly` | `Float` | Mean anomaly |
| `mean_motion` | `Float` | Mean motion |
| `name` | `String` | Payload name |
| `nationalities` | `Array` | Nationalities |
| `norad_ids` | `Array` | NORAD IDs |
| `orbit` | `String` | Orbit type |
| `periapsis_km` | `Float` | Periapsis in km |
| `period_min` | `Float` | Orbital period in minutes |
| `raan` | `Float` | Right ascension of the ascending node |
| `reference_system` | `String` | Reference system |
| `regime` | `String` | Orbit regime |
| `reused` | `Boolean` | Whether the payload was reused |
| `semi_major_axis_km` | `Float` | Semi-major axis in km |
| `type` | `String` | Payload type |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Payload record (raises on error).
payload = client.Payload.load({ "id" => "payload_id" })
```

#### Example: List

```ruby
# list returns an Array of Payload records (raises on error).
payloads = client.Payload.list
```


### Roadster

Create an instance: `roadster = client.Roadster`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_au` | `Float` | Apoapsis in AU |
| `details` | `String` | Details |
| `earth_distance_km` | `Float` | Distance from Earth in km |
| `earth_distance_mi` | `Float` | Distance from Earth in miles |
| `eccentricity` | `Float` | Eccentricity |
| `epoch_jd` | `Float` | Epoch in Julian Date |
| `flickr_images` | `Array` | Flickr images |
| `id` | `String` | Roadster ID |
| `inclination` | `Float` | Inclination |
| `launch_date_unix` | `Integer` | Launch date in unix timestamp |
| `launch_date_utc` | `String` | Launch date in UTC |
| `launch_mass_kg` | `Integer` | Launch mass in kilograms |
| `launch_mass_lbs` | `Integer` | Launch mass in pounds |
| `longitude` | `Float` | Longitude |
| `mars_distance_km` | `Float` | Distance from Mars in km |
| `mars_distance_mi` | `Float` | Distance from Mars in miles |
| `name` | `String` | Roadster name |
| `norad_id` | `Integer` | NORAD ID |
| `orbit_type` | `String` | Orbit type |
| `periapsis_arg` | `Float` | Argument of periapsis |
| `periapsis_au` | `Float` | Periapsis in AU |
| `period_days` | `Float` | Orbital period in days |
| `semi_major_axis_au` | `Float` | Semi-major axis in AU |
| `speed_kph` | `Float` | Speed in km/h |
| `speed_mph` | `Float` | Speed in mph |
| `video` | `String` | Video URL |
| `wikipedia` | `String` | Wikipedia URL |

#### Example: List

```ruby
# list returns an Array of Roadster records (raises on error).
roadsters = client.Roadster.list
```


### Rocket

Create an instance: `rocket = client.Rocket`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | Whether the rocket is active |
| `boosters` | `Integer` | Number of boosters |
| `company` | `String` | Company |
| `cost_per_launch` | `Integer` | Cost per launch in USD |
| `country` | `String` | Country of origin |
| `description` | `String` |  |
| `diameter` | `Hash` |  |
| `first_flight` | `String` | Date of first flight |
| `flickr_images` | `Array` |  |
| `height` | `Hash` |  |
| `id` | `String` | Rocket ID |
| `mass` | `Hash` |  |
| `name` | `String` | Rocket name |
| `stages` | `Integer` | Number of stages |
| `success_rate_pct` | `Float` | Success rate percentage |
| `type` | `String` | Rocket type |
| `wikipedia` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Rocket record (raises on error).
rocket = client.Rocket.load({ "id" => "rocket_id" })
```

#### Example: List

```ruby
# list returns an Array of Rocket records (raises on error).
rockets = client.Rocket.list
```


### Ship

Create an instance: `ship = client.Ship`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abs` | `Integer` | ABS number |
| `class` | `Integer` | Ship class |
| `course_deg` | `Float` | Course in degrees |
| `home_port` | `String` | Home port |
| `id` | `String` | Ship ID |
| `image` | `String` | Image URL |
| `imo` | `Integer` | IMO number |
| `last_ais_update` | `String` | Last AIS update timestamp |
| `latitude` | `Float` | Latitude |
| `launches` | `Array` | Launch IDs |
| `legacy_id` | `String` | Legacy ID |
| `link` | `String` | Link to ship info |
| `longitude` | `Float` | Longitude |
| `mass_kg` | `Integer` | Mass in kilograms |
| `mass_lbs` | `Integer` | Mass in pounds |
| `mmsi` | `Integer` | MMSI number |
| `model` | `String` | Ship model |
| `name` | `String` | Ship name |
| `roles` | `Array` | Ship roles |
| `speed_kn` | `Float` | Speed in knots |
| `status` | `String` | Ship status |
| `type` | `String` | Ship type |
| `year_built` | `Integer` | Year built |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Ship record (raises on error).
ship = client.Ship.load({ "id" => "ship_id" })
```

#### Example: List

```ruby
# list returns an Array of Ship records (raises on error).
ships = client.Ship.list
```


### Starlink

Create an instance: `starlink = client.Starlink`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height_km` | `Float` | Current height in kilometers |
| `id` | `String` | Starlink satellite ID |
| `latitude` | `Float` | Current latitude |
| `launch` | `String` | Launch ID |
| `longitude` | `Float` | Current longitude |
| `spaceTrack` | `Hash` | Space-Track.org data |
| `velocity_kms` | `Float` | Current velocity in km/s |
| `version` | `String` | Satellite version |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Starlink record (raises on error).
starlink = client.Starlink.load({ "id" => "starlink_id" })
```

#### Example: List

```ruby
# list returns an Array of Starlink records (raises on error).
starlinks = client.Starlink.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── SpacexRest_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`SpacexRest_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
landpad = client.Landpad
landpad.list()

# landpad.data_get now returns the landpad data from the last list
# landpad.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
