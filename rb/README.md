# SpacexRest Ruby SDK



The Ruby SDK for the SpacexRest API — an entity-oriented client using idiomatic Ruby conventions.

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

### 2. List capsules

```ruby
begin
  result = client.capsule.list
  if result.is_a?(Array)
    result.each do |item|
      d = item.data_get
      puts "#{d["id"]} #{d["name"]}"
    end
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a capsule

```ruby
begin
  result = client.capsule.load({ "id" => "example_id" })
  puts result
rescue => err
  warn "load failed: #{err}"
end
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
  warn result["err"]
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

Create a mock client for unit testing — no server required:

```ruby
client = SpacexRestSDK.test

result = client.capsule.load({ "id" => "test01" })
# result contains mock response data
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
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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

Create an instance: `const capsule = client.capsule`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `land_landing` | ``$INTEGER`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `water_landing` | ``$INTEGER`` |  |

#### Example: Load

```ts
const capsule = await client.capsule.load({ id: 'capsule_id' })
```

#### Example: List

```ts
const capsules = await client.capsule.list()
```


### Core

Create an instance: `const core = client.core`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asds_attempt` | ``$INTEGER`` |  |
| `asds_landing` | ``$INTEGER`` |  |
| `block` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `rtls_attempt` | ``$INTEGER`` |  |
| `rtls_landing` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const core = await client.core.load({ id: 'core_id' })
```

#### Example: List

```ts
const cores = await client.core.list()
```


### Crew

Create an instance: `const crew = client.crew`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

#### Example: Load

```ts
const crew = await client.crew.load({ id: 'crew_id' })
```

#### Example: List

```ts
const crews = await client.crew.list()
```


### Landpad

Create an instance: `const landpad = client.landpad`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$INTEGER`` |  |
| `landing_success` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

#### Example: Load

```ts
const landpad = await client.landpad.load({ id: 'landpad_id' })
```

#### Example: List

```ts
const landpads = await client.landpad.list()
```


### Launch

Create an instance: `const launch = client.launch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | ``$BOOLEAN`` |  |
| `capsule` | ``$ARRAY`` |  |
| `core` | ``$ARRAY`` |  |
| `crew` | ``$ARRAY`` |  |
| `date_local` | ``$STRING`` |  |
| `date_precision` | ``$STRING`` |  |
| `date_unix` | ``$INTEGER`` |  |
| `date_utc` | ``$STRING`` |  |
| `detail` | ``$STRING`` |  |
| `failure` | ``$ARRAY`` |  |
| `fairing` | ``$OBJECT`` |  |
| `flight` | ``$INTEGER`` |  |
| `flight_number` | ``$INTEGER`` |  |
| `gridfin` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$BOOLEAN`` |  |
| `landing_success` | ``$BOOLEAN`` |  |
| `landing_type` | ``$STRING`` |  |
| `landpad` | ``$STRING`` |  |
| `launchpad` | ``$STRING`` |  |
| `leg` | ``$BOOLEAN`` |  |
| `link` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `net` | ``$BOOLEAN`` |  |
| `payload` | ``$ARRAY`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `rocket` | ``$STRING`` |  |
| `ship` | ``$ARRAY`` |  |
| `static_fire_date_unix` | ``$INTEGER`` |  |
| `static_fire_date_utc` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `tdb` | ``$BOOLEAN`` |  |
| `upcoming` | ``$BOOLEAN`` |  |
| `window` | ``$INTEGER`` |  |

#### Example: Load

```ts
const launch = await client.launch.load({ id: 'launch_id' })
```

#### Example: List

```ts
const launchs = await client.launch.list()
```


### Launchpad

Create an instance: `const launchpad = client.launchpad`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `launch_attempt` | ``$INTEGER`` |  |
| `launch_success` | ``$INTEGER`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `rocket` | ``$ARRAY`` |  |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const launchpad = await client.launchpad.load({ id: 'launchpad_id' })
```

#### Example: List

```ts
const launchpads = await client.launchpad.list()
```


### Payload

Create an instance: `const payload = client.payload`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_km` | ``$NUMBER`` |  |
| `arg_of_pericenter` | ``$NUMBER`` |  |
| `customer` | ``$ARRAY`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `inclination_deg` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `lifespan_year` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `manufacturer` | ``$ARRAY`` |  |
| `mass_kg` | ``$NUMBER`` |  |
| `mass_lb` | ``$NUMBER`` |  |
| `mean_anomaly` | ``$NUMBER`` |  |
| `mean_motion` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `nationality` | ``$ARRAY`` |  |
| `norad_id` | ``$ARRAY`` |  |
| `orbit` | ``$STRING`` |  |
| `periapsis_km` | ``$NUMBER`` |  |
| `period_min` | ``$NUMBER`` |  |
| `raan` | ``$NUMBER`` |  |
| `reference_system` | ``$STRING`` |  |
| `regime` | ``$STRING`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `semi_major_axis_km` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const payload = await client.payload.load({ id: 'payload_id' })
```

#### Example: List

```ts
const payloads = await client.payload.list()
```


### Roadster

Create an instance: `const roadster = client.roadster`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_au` | ``$NUMBER`` |  |
| `detail` | ``$STRING`` |  |
| `earth_distance_km` | ``$NUMBER`` |  |
| `earth_distance_mi` | ``$NUMBER`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch_jd` | ``$NUMBER`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `inclination` | ``$NUMBER`` |  |
| `launch_date_unix` | ``$INTEGER`` |  |
| `launch_date_utc` | ``$STRING`` |  |
| `launch_mass_kg` | ``$INTEGER`` |  |
| `launch_mass_lb` | ``$INTEGER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mars_distance_km` | ``$NUMBER`` |  |
| `mars_distance_mi` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `norad_id` | ``$INTEGER`` |  |
| `orbit_type` | ``$STRING`` |  |
| `periapsis_arg` | ``$NUMBER`` |  |
| `periapsis_au` | ``$NUMBER`` |  |
| `period_day` | ``$NUMBER`` |  |
| `semi_major_axis_au` | ``$NUMBER`` |  |
| `speed_kph` | ``$NUMBER`` |  |
| `speed_mph` | ``$NUMBER`` |  |
| `video` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

#### Example: List

```ts
const roadsters = await client.roadster.list()
```


### Rocket

Create an instance: `const rocket = client.rocket`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | ``$BOOLEAN`` |  |
| `booster` | ``$INTEGER`` |  |
| `company` | ``$STRING`` |  |
| `cost_per_launch` | ``$INTEGER`` |  |
| `country` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `diameter` | ``$OBJECT`` |  |
| `first_flight` | ``$STRING`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `height` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `mass` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `stage` | ``$INTEGER`` |  |
| `success_rate_pct` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

#### Example: Load

```ts
const rocket = await client.rocket.load({ id: 'rocket_id' })
```

#### Example: List

```ts
const rockets = await client.rocket.list()
```


### Ship

Create an instance: `const ship = client.ship`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abs` | ``$INTEGER`` |  |
| `class` | ``$INTEGER`` |  |
| `course_deg` | ``$NUMBER`` |  |
| `home_port` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `imo` | ``$INTEGER`` |  |
| `last_ais_update` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `legacy_id` | ``$STRING`` |  |
| `link` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mass_kg` | ``$INTEGER`` |  |
| `mass_lb` | ``$INTEGER`` |  |
| `mmsi` | ``$INTEGER`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `role` | ``$ARRAY`` |  |
| `speed_kn` | ``$NUMBER`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `year_built` | ``$INTEGER`` |  |

#### Example: Load

```ts
const ship = await client.ship.load({ id: 'ship_id' })
```

#### Example: List

```ts
const ships = await client.ship.list()
```


### Starlink

Create an instance: `const starlink = client.starlink`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height_km` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `space_track` | ``$OBJECT`` |  |
| `velocity_km` | ``$NUMBER`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const starlink = await client.starlink.load({ id: 'starlink_id' })
```

#### Example: List

```ts
const starlinks = await client.starlink.list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
capsule = client.capsule
capsule.load({ "id" => "example_id" })

# capsule.data_get now returns the loaded capsule data
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
