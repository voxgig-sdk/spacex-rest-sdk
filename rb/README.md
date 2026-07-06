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
    puts "#{item["id"]} #{item["land_landing"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a capsule

```ruby
begin
  # load returns the bare Capsule record (raises on error).
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
  capsules = client.Capsule.list()
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
  "entity" => { "capsule" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
capsule = client.Capsule.list()
puts capsule
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
| `id` |  |
| `land_landing` |  |
| `last_update` |  |
| `launch` |  |
| `reuse_count` |  |
| `serial` |  |
| `status` |  |
| `type` |  |
| `water_landing` |  |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `asds_attempt` |  |
| `asds_landing` |  |
| `block` |  |
| `id` |  |
| `last_update` |  |
| `launch` |  |
| `reuse_count` |  |
| `rtls_attempt` |  |
| `rtls_landing` |  |
| `serial` |  |
| `status` |  |

Operations: List, Load.

API path: `/cores`

#### Crew

| Field | Description |
| --- | --- |
| `agency` |  |
| `id` |  |
| `image` |  |
| `launch` |  |
| `name` |  |
| `status` |  |
| `wikipedia` |  |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `detail` |  |
| `full_name` |  |
| `id` |  |
| `landing_attempt` |  |
| `landing_success` |  |
| `latitude` |  |
| `launch` |  |
| `locality` |  |
| `longitude` |  |
| `name` |  |
| `region` |  |
| `status` |  |
| `type` |  |
| `wikipedia` |  |

Operations: List, Load.

API path: `/landpads`

#### Launch

| Field | Description |
| --- | --- |
| `auto_update` |  |
| `capsule` |  |
| `core` |  |
| `crew` |  |
| `date_local` |  |
| `date_precision` |  |
| `date_unix` |  |
| `date_utc` |  |
| `detail` |  |
| `failure` |  |
| `fairing` |  |
| `flight` |  |
| `flight_number` |  |
| `gridfin` |  |
| `id` |  |
| `landing_attempt` |  |
| `landing_success` |  |
| `landing_type` |  |
| `landpad` |  |
| `launchpad` |  |
| `leg` |  |
| `link` |  |
| `name` |  |
| `net` |  |
| `payload` |  |
| `reused` |  |
| `rocket` |  |
| `ship` |  |
| `static_fire_date_unix` |  |
| `static_fire_date_utc` |  |
| `success` |  |
| `tdb` |  |
| `upcoming` |  |
| `window` |  |

Operations: List, Load.

API path: `/launches`

#### Launchpad

| Field | Description |
| --- | --- |
| `detail` |  |
| `full_name` |  |
| `id` |  |
| `latitude` |  |
| `launch` |  |
| `launch_attempt` |  |
| `launch_success` |  |
| `locality` |  |
| `longitude` |  |
| `name` |  |
| `region` |  |
| `rocket` |  |
| `status` |  |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `apoapsis_km` |  |
| `arg_of_pericenter` |  |
| `customer` |  |
| `eccentricity` |  |
| `epoch` |  |
| `id` |  |
| `inclination_deg` |  |
| `launch` |  |
| `lifespan_year` |  |
| `longitude` |  |
| `manufacturer` |  |
| `mass_kg` |  |
| `mass_lb` |  |
| `mean_anomaly` |  |
| `mean_motion` |  |
| `name` |  |
| `nationality` |  |
| `norad_id` |  |
| `orbit` |  |
| `periapsis_km` |  |
| `period_min` |  |
| `raan` |  |
| `reference_system` |  |
| `regime` |  |
| `reused` |  |
| `semi_major_axis_km` |  |
| `type` |  |

Operations: List, Load.

API path: `/payloads`

#### Roadster

| Field | Description |
| --- | --- |
| `apoapsis_au` |  |
| `detail` |  |
| `earth_distance_km` |  |
| `earth_distance_mi` |  |
| `eccentricity` |  |
| `epoch_jd` |  |
| `flickr_image` |  |
| `id` |  |
| `inclination` |  |
| `launch_date_unix` |  |
| `launch_date_utc` |  |
| `launch_mass_kg` |  |
| `launch_mass_lb` |  |
| `longitude` |  |
| `mars_distance_km` |  |
| `mars_distance_mi` |  |
| `name` |  |
| `norad_id` |  |
| `orbit_type` |  |
| `periapsis_arg` |  |
| `periapsis_au` |  |
| `period_day` |  |
| `semi_major_axis_au` |  |
| `speed_kph` |  |
| `speed_mph` |  |
| `video` |  |
| `wikipedia` |  |

Operations: List.

API path: `/roadster`

#### Rocket

| Field | Description |
| --- | --- |
| `active` |  |
| `booster` |  |
| `company` |  |
| `cost_per_launch` |  |
| `country` |  |
| `description` |  |
| `diameter` |  |
| `first_flight` |  |
| `flickr_image` |  |
| `height` |  |
| `id` |  |
| `mass` |  |
| `name` |  |
| `stage` |  |
| `success_rate_pct` |  |
| `type` |  |
| `wikipedia` |  |

Operations: List, Load.

API path: `/rockets`

#### Ship

| Field | Description |
| --- | --- |
| `abs` |  |
| `class` |  |
| `course_deg` |  |
| `home_port` |  |
| `id` |  |
| `image` |  |
| `imo` |  |
| `last_ais_update` |  |
| `latitude` |  |
| `launch` |  |
| `legacy_id` |  |
| `link` |  |
| `longitude` |  |
| `mass_kg` |  |
| `mass_lb` |  |
| `mmsi` |  |
| `model` |  |
| `name` |  |
| `role` |  |
| `speed_kn` |  |
| `status` |  |
| `type` |  |
| `year_built` |  |

Operations: List, Load.

API path: `/ships`

#### Starlink

| Field | Description |
| --- | --- |
| `height_km` |  |
| `id` |  |
| `latitude` |  |
| `launch` |  |
| `longitude` |  |
| `space_track` |  |
| `velocity_km` |  |
| `version` |  |

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
| `id` | `String` |  |
| `land_landing` | `Integer` |  |
| `last_update` | `String` |  |
| `launch` | `Array` |  |
| `reuse_count` | `Integer` |  |
| `serial` | `String` |  |
| `status` | `String` |  |
| `type` | `String` |  |
| `water_landing` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Capsule record (raises on error).
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
| `asds_attempt` | `Integer` |  |
| `asds_landing` | `Integer` |  |
| `block` | `Integer` |  |
| `id` | `String` |  |
| `last_update` | `String` |  |
| `launch` | `Array` |  |
| `reuse_count` | `Integer` |  |
| `rtls_attempt` | `Integer` |  |
| `rtls_landing` | `Integer` |  |
| `serial` | `String` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Core record (raises on error).
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
| `agency` | `String` |  |
| `id` | `String` |  |
| `image` | `String` |  |
| `launch` | `Array` |  |
| `name` | `String` |  |
| `status` | `String` |  |
| `wikipedia` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Crew record (raises on error).
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
| `detail` | `String` |  |
| `full_name` | `String` |  |
| `id` | `String` |  |
| `landing_attempt` | `Integer` |  |
| `landing_success` | `Integer` |  |
| `latitude` | `Float` |  |
| `launch` | `Array` |  |
| `locality` | `String` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |
| `region` | `String` |  |
| `status` | `String` |  |
| `type` | `String` |  |
| `wikipedia` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Landpad record (raises on error).
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
| `auto_update` | `Boolean` |  |
| `capsule` | `Array` |  |
| `core` | `Array` |  |
| `crew` | `Array` |  |
| `date_local` | `String` |  |
| `date_precision` | `String` |  |
| `date_unix` | `Integer` |  |
| `date_utc` | `String` |  |
| `detail` | `String` |  |
| `failure` | `Array` |  |
| `fairing` | `Hash` |  |
| `flight` | `Integer` |  |
| `flight_number` | `Integer` |  |
| `gridfin` | `Boolean` |  |
| `id` | `String` |  |
| `landing_attempt` | `Boolean` |  |
| `landing_success` | `Boolean` |  |
| `landing_type` | `String` |  |
| `landpad` | `String` |  |
| `launchpad` | `String` |  |
| `leg` | `Boolean` |  |
| `link` | `Hash` |  |
| `name` | `String` |  |
| `net` | `Boolean` |  |
| `payload` | `Array` |  |
| `reused` | `Boolean` |  |
| `rocket` | `String` |  |
| `ship` | `Array` |  |
| `static_fire_date_unix` | `Integer` |  |
| `static_fire_date_utc` | `String` |  |
| `success` | `Boolean` |  |
| `tdb` | `Boolean` |  |
| `upcoming` | `Boolean` |  |
| `window` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Launch record (raises on error).
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
| `detail` | `String` |  |
| `full_name` | `String` |  |
| `id` | `String` |  |
| `latitude` | `Float` |  |
| `launch` | `Array` |  |
| `launch_attempt` | `Integer` |  |
| `launch_success` | `Integer` |  |
| `locality` | `String` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |
| `region` | `String` |  |
| `rocket` | `Array` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Launchpad record (raises on error).
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
| `apoapsis_km` | `Float` |  |
| `arg_of_pericenter` | `Float` |  |
| `customer` | `Array` |  |
| `eccentricity` | `Float` |  |
| `epoch` | `String` |  |
| `id` | `String` |  |
| `inclination_deg` | `Float` |  |
| `launch` | `String` |  |
| `lifespan_year` | `Float` |  |
| `longitude` | `Float` |  |
| `manufacturer` | `Array` |  |
| `mass_kg` | `Float` |  |
| `mass_lb` | `Float` |  |
| `mean_anomaly` | `Float` |  |
| `mean_motion` | `Float` |  |
| `name` | `String` |  |
| `nationality` | `Array` |  |
| `norad_id` | `Array` |  |
| `orbit` | `String` |  |
| `periapsis_km` | `Float` |  |
| `period_min` | `Float` |  |
| `raan` | `Float` |  |
| `reference_system` | `String` |  |
| `regime` | `String` |  |
| `reused` | `Boolean` |  |
| `semi_major_axis_km` | `Float` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Payload record (raises on error).
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
| `apoapsis_au` | `Float` |  |
| `detail` | `String` |  |
| `earth_distance_km` | `Float` |  |
| `earth_distance_mi` | `Float` |  |
| `eccentricity` | `Float` |  |
| `epoch_jd` | `Float` |  |
| `flickr_image` | `Array` |  |
| `id` | `String` |  |
| `inclination` | `Float` |  |
| `launch_date_unix` | `Integer` |  |
| `launch_date_utc` | `String` |  |
| `launch_mass_kg` | `Integer` |  |
| `launch_mass_lb` | `Integer` |  |
| `longitude` | `Float` |  |
| `mars_distance_km` | `Float` |  |
| `mars_distance_mi` | `Float` |  |
| `name` | `String` |  |
| `norad_id` | `Integer` |  |
| `orbit_type` | `String` |  |
| `periapsis_arg` | `Float` |  |
| `periapsis_au` | `Float` |  |
| `period_day` | `Float` |  |
| `semi_major_axis_au` | `Float` |  |
| `speed_kph` | `Float` |  |
| `speed_mph` | `Float` |  |
| `video` | `String` |  |
| `wikipedia` | `String` |  |

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
| `active` | `Boolean` |  |
| `booster` | `Integer` |  |
| `company` | `String` |  |
| `cost_per_launch` | `Integer` |  |
| `country` | `String` |  |
| `description` | `String` |  |
| `diameter` | `Hash` |  |
| `first_flight` | `String` |  |
| `flickr_image` | `Array` |  |
| `height` | `Hash` |  |
| `id` | `String` |  |
| `mass` | `Hash` |  |
| `name` | `String` |  |
| `stage` | `Integer` |  |
| `success_rate_pct` | `Float` |  |
| `type` | `String` |  |
| `wikipedia` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Rocket record (raises on error).
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
| `abs` | `Integer` |  |
| `class` | `Integer` |  |
| `course_deg` | `Float` |  |
| `home_port` | `String` |  |
| `id` | `String` |  |
| `image` | `String` |  |
| `imo` | `Integer` |  |
| `last_ais_update` | `String` |  |
| `latitude` | `Float` |  |
| `launch` | `Array` |  |
| `legacy_id` | `String` |  |
| `link` | `String` |  |
| `longitude` | `Float` |  |
| `mass_kg` | `Integer` |  |
| `mass_lb` | `Integer` |  |
| `mmsi` | `Integer` |  |
| `model` | `String` |  |
| `name` | `String` |  |
| `role` | `Array` |  |
| `speed_kn` | `Float` |  |
| `status` | `String` |  |
| `type` | `String` |  |
| `year_built` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Ship record (raises on error).
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
| `height_km` | `Float` |  |
| `id` | `String` |  |
| `latitude` | `Float` |  |
| `launch` | `String` |  |
| `longitude` | `Float` |  |
| `space_track` | `Hash` |  |
| `velocity_km` | `Float` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Starlink record (raises on error).
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
capsule = client.Capsule
capsule.list()

# capsule.data_get now returns the capsule data from the last list
# capsule.match_get returns the last match criteria
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
