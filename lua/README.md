# SpacexRest Lua SDK



The Lua SDK for the SpacexRest API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Capsule()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("spacex-rest_sdk")

local client = sdk.new()
```

### 2. List capsule records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local capsules, err = client:Capsule():list()
if err then error(err) end

for _, item in ipairs(capsules) do
  print(item["id"], item["last_update"])
end
```

### 3. Load a capsule

```lua
local capsule, err = client:Capsule():load({ id = "example_id" })
if err then error(err) end
print(capsule)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local capsules, err = client:Capsule():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Capsule():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### SpacexRestSDK

```lua
local sdk = require("spacex-rest_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SpacexRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local capsule, err = client:Capsule():load({ id = "example_id" })
    if err then error(err) end
    -- capsule is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local capsule = client:Capsule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `land_landing` | `number` |  |
| `last_update` | `string` |  |
| `launch` | `table` |  |
| `reuse_count` | `number` |  |
| `serial` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `water_landing` | `number` |  |

#### Example: Load

```lua
local capsule, err = client:Capsule():load({ id = "capsule_id" })
```

#### Example: List

```lua
local capsules, err = client:Capsule():list()
```


### Core

Create an instance: `local core = client:Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asds_attempt` | `number` |  |
| `asds_landing` | `number` |  |
| `block` | `number` |  |
| `id` | `string` |  |
| `last_update` | `string` |  |
| `launch` | `table` |  |
| `reuse_count` | `number` |  |
| `rtls_attempt` | `number` |  |
| `rtls_landing` | `number` |  |
| `serial` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local core, err = client:Core():load({ id = "core_id" })
```

#### Example: List

```lua
local cores, err = client:Core():list()
```


### Crew

Create an instance: `local crew = client:Crew(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `launch` | `table` |  |
| `name` | `string` |  |
| `status` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```lua
local crew, err = client:Crew():load({ id = "crew_id" })
```

#### Example: List

```lua
local crews, err = client:Crew():list()
```


### Landpad

Create an instance: `local landpad = client:Landpad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `landing_attempt` | `number` |  |
| `landing_success` | `number` |  |
| `latitude` | `number` |  |
| `launch` | `table` |  |
| `locality` | `string` |  |
| `longitude` | `number` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```lua
local landpad, err = client:Landpad():load({ id = "landpad_id" })
```

#### Example: List

```lua
local landpads, err = client:Landpad():list()
```


### Launch

Create an instance: `local launch = client:Launch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | `boolean` |  |
| `capsule` | `table` |  |
| `core` | `table` |  |
| `crew` | `table` |  |
| `date_local` | `string` |  |
| `date_precision` | `string` |  |
| `date_unix` | `number` |  |
| `date_utc` | `string` |  |
| `detail` | `string` |  |
| `failure` | `table` |  |
| `fairing` | `table` |  |
| `flight` | `number` |  |
| `flight_number` | `number` |  |
| `gridfin` | `boolean` |  |
| `id` | `string` |  |
| `landing_attempt` | `boolean` |  |
| `landing_success` | `boolean` |  |
| `landing_type` | `string` |  |
| `landpad` | `string` |  |
| `launchpad` | `string` |  |
| `leg` | `boolean` |  |
| `link` | `table` |  |
| `name` | `string` |  |
| `net` | `boolean` |  |
| `payload` | `table` |  |
| `reused` | `boolean` |  |
| `rocket` | `string` |  |
| `ship` | `table` |  |
| `static_fire_date_unix` | `number` |  |
| `static_fire_date_utc` | `string` |  |
| `success` | `boolean` |  |
| `tdb` | `boolean` |  |
| `upcoming` | `boolean` |  |
| `window` | `number` |  |

#### Example: Load

```lua
local launch, err = client:Launch():load({ id = "launch_id" })
```

#### Example: List

```lua
local launchs, err = client:Launch():list()
```


### Launchpad

Create an instance: `local launchpad = client:Launchpad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `table` |  |
| `launch_attempt` | `number` |  |
| `launch_success` | `number` |  |
| `locality` | `string` |  |
| `longitude` | `number` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `rocket` | `table` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local launchpad, err = client:Launchpad():load({ id = "launchpad_id" })
```

#### Example: List

```lua
local launchpads, err = client:Launchpad():list()
```


### Payload

Create an instance: `local payload = client:Payload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_km` | `number` |  |
| `arg_of_pericenter` | `number` |  |
| `customer` | `table` |  |
| `eccentricity` | `number` |  |
| `epoch` | `string` |  |
| `id` | `string` |  |
| `inclination_deg` | `number` |  |
| `launch` | `string` |  |
| `lifespan_year` | `number` |  |
| `longitude` | `number` |  |
| `manufacturer` | `table` |  |
| `mass_kg` | `number` |  |
| `mass_lb` | `number` |  |
| `mean_anomaly` | `number` |  |
| `mean_motion` | `number` |  |
| `name` | `string` |  |
| `nationality` | `table` |  |
| `norad_id` | `table` |  |
| `orbit` | `string` |  |
| `periapsis_km` | `number` |  |
| `period_min` | `number` |  |
| `raan` | `number` |  |
| `reference_system` | `string` |  |
| `regime` | `string` |  |
| `reused` | `boolean` |  |
| `semi_major_axis_km` | `number` |  |
| `type` | `string` |  |

#### Example: Load

```lua
local payload, err = client:Payload():load({ id = "payload_id" })
```

#### Example: List

```lua
local payloads, err = client:Payload():list()
```


### Roadster

Create an instance: `local roadster = client:Roadster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_au` | `number` |  |
| `detail` | `string` |  |
| `earth_distance_km` | `number` |  |
| `earth_distance_mi` | `number` |  |
| `eccentricity` | `number` |  |
| `epoch_jd` | `number` |  |
| `flickr_image` | `table` |  |
| `id` | `string` |  |
| `inclination` | `number` |  |
| `launch_date_unix` | `number` |  |
| `launch_date_utc` | `string` |  |
| `launch_mass_kg` | `number` |  |
| `launch_mass_lb` | `number` |  |
| `longitude` | `number` |  |
| `mars_distance_km` | `number` |  |
| `mars_distance_mi` | `number` |  |
| `name` | `string` |  |
| `norad_id` | `number` |  |
| `orbit_type` | `string` |  |
| `periapsis_arg` | `number` |  |
| `periapsis_au` | `number` |  |
| `period_day` | `number` |  |
| `semi_major_axis_au` | `number` |  |
| `speed_kph` | `number` |  |
| `speed_mph` | `number` |  |
| `video` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: List

```lua
local roadsters, err = client:Roadster():list()
```


### Rocket

Create an instance: `local rocket = client:Rocket(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `booster` | `number` |  |
| `company` | `string` |  |
| `cost_per_launch` | `number` |  |
| `country` | `string` |  |
| `description` | `string` |  |
| `diameter` | `table` |  |
| `first_flight` | `string` |  |
| `flickr_image` | `table` |  |
| `height` | `table` |  |
| `id` | `string` |  |
| `mass` | `table` |  |
| `name` | `string` |  |
| `stage` | `number` |  |
| `success_rate_pct` | `number` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```lua
local rocket, err = client:Rocket():load({ id = "rocket_id" })
```

#### Example: List

```lua
local rockets, err = client:Rocket():list()
```


### Ship

Create an instance: `local ship = client:Ship(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abs` | `number` |  |
| `class` | `number` |  |
| `course_deg` | `number` |  |
| `home_port` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `imo` | `number` |  |
| `last_ais_update` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `table` |  |
| `legacy_id` | `string` |  |
| `link` | `string` |  |
| `longitude` | `number` |  |
| `mass_kg` | `number` |  |
| `mass_lb` | `number` |  |
| `mmsi` | `number` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `role` | `table` |  |
| `speed_kn` | `number` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `year_built` | `number` |  |

#### Example: Load

```lua
local ship, err = client:Ship():load({ id = "ship_id" })
```

#### Example: List

```lua
local ships, err = client:Ship():list()
```


### Starlink

Create an instance: `local starlink = client:Starlink(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height_km` | `number` |  |
| `id` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `string` |  |
| `longitude` | `number` |  |
| `space_track` | `table` |  |
| `velocity_km` | `number` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local starlink, err = client:Starlink():load({ id = "starlink_id" })
```

#### Example: List

```lua
local starlinks, err = client:Starlink():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── spacex-rest_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`spacex-rest_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local capsule = client:Capsule()
capsule:list()

-- capsule:data_get() now returns the capsule data from the last list
-- capsule:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
