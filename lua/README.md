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
local landpads, err = client:Landpad():list()
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

local result, err = client:Landpad():list()
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

Create an instance: `local capsule = client:Capsule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Capsule serial number |
| `land_landings` | `number` | Number of land landings |
| `last_update` | `string` | Last update about the capsule |
| `launches` | `table` | Launch IDs |
| `reuse_count` | `number` | Number of times capsule has been reused |
| `serial` | `string` | Capsule serial number |
| `status` | `string` | Capsule status |
| `type` | `string` | Capsule type |
| `water_landings` | `number` | Number of water landings |

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
| `asds_attempts` | `number` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `number` | Number of successful ASDS landings |
| `block` | `number` | Core block number |
| `id` | `string` | Core serial number |
| `last_update` | `string` | Last update about the core |
| `launches` | `table` | Launch IDs |
| `reuse_count` | `number` | Number of times core has been reused |
| `rtls_attempts` | `number` | Number of return to launch site attempts |
| `rtls_landings` | `number` | Number of successful RTLS landings |
| `serial` | `string` | Core serial number |
| `status` | `string` | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | Agency |
| `id` | `string` | Crew member ID |
| `image` | `string` | Image URL |
| `launches` | `table` | Launch IDs |
| `name` | `string` | Crew member name |
| `status` | `string` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `details` | `string` | Landing pad details |
| `full_name` | `string` | Full landing pad name |
| `id` | `string` | Landing pad ID |
| `landing_attempts` | `number` | Number of landing attempts |
| `landing_successes` | `number` | Number of successful landings |
| `latitude` | `number` | Latitude |
| `launches` | `table` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `number` | Longitude |
| `name` | `string` | Landing pad name |
| `region` | `string` | Region |
| `status` | `string` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `auto_update` | `boolean` | Whether the launch data is automatically updated |
| `capsules` | `table` | Capsule IDs |
| `core` | `string` | Core ID |
| `cores` | `table` |  |
| `crew` | `table` | Crew member IDs |
| `date_local` | `string` | Launch date in local time |
| `date_precision` | `string` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `number` | Launch date in unix timestamp |
| `date_utc` | `string` | Launch date in UTC |
| `details` | `string` | Launch details |
| `failures` | `table` | Launch failures |
| `fairings` | `table` |  |
| `flight` | `number` | Core flight number |
| `flight_number` | `number` | Flight number |
| `gridfins` | `boolean` | Whether core has grid fins |
| `id` | `string` | Launch ID |
| `landing_attempt` | `boolean` | Whether landing was attempted |
| `landing_success` | `boolean` | Whether landing was successful |
| `landing_type` | `string` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | Landing pad ID |
| `launchpad` | `string` | Launchpad ID |
| `legs` | `boolean` | Whether core has legs |
| `links` | `table` |  |
| `name` | `string` | Launch name |
| `net` | `boolean` | No earlier than |
| `payloads` | `table` | Payload IDs |
| `reused` | `boolean` | Whether core was reused |
| `rocket` | `string` | Rocket ID |
| `ships` | `table` | Ship IDs |
| `static_fire_date_unix` | `number` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | Static fire date in UTC |
| `success` | `boolean` | Launch success status |
| `tdb` | `boolean` | To be determined |
| `upcoming` | `boolean` | Whether the launch is upcoming |
| `window` | `number` | Launch window in seconds |

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
| `details` | `string` | Launchpad details |
| `full_name` | `string` | Full launchpad name |
| `id` | `string` | Launchpad ID |
| `latitude` | `number` | Latitude |
| `launch_attempts` | `number` | Number of launch attempts |
| `launch_successes` | `number` | Number of successful launches |
| `launches` | `table` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `number` | Longitude |
| `name` | `string` | Launchpad name |
| `region` | `string` | Region |
| `rockets` | `table` | Rocket IDs |
| `status` | `string` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `number` | Apoapsis in km |
| `arg_of_pericenter` | `number` | Argument of pericenter |
| `customers` | `table` | Customers |
| `eccentricity` | `number` | Eccentricity |
| `epoch` | `string` | Epoch |
| `id` | `string` | Payload ID |
| `inclination_deg` | `number` | Inclination in degrees |
| `launch` | `string` | Launch ID |
| `lifespan_years` | `number` | Lifespan in years |
| `longitude` | `number` | Longitude |
| `manufacturers` | `table` | Manufacturers |
| `mass_kg` | `number` | Payload mass in kilograms |
| `mass_lbs` | `number` | Payload mass in pounds |
| `mean_anomaly` | `number` | Mean anomaly |
| `mean_motion` | `number` | Mean motion |
| `name` | `string` | Payload name |
| `nationalities` | `table` | Nationalities |
| `norad_ids` | `table` | NORAD IDs |
| `orbit` | `string` | Orbit type |
| `periapsis_km` | `number` | Periapsis in km |
| `period_min` | `number` | Orbital period in minutes |
| `raan` | `number` | Right ascension of the ascending node |
| `reference_system` | `string` | Reference system |
| `regime` | `string` | Orbit regime |
| `reused` | `boolean` | Whether the payload was reused |
| `semi_major_axis_km` | `number` | Semi-major axis in km |
| `type` | `string` | Payload type |

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
| `apoapsis_au` | `number` | Apoapsis in AU |
| `details` | `string` | Details |
| `earth_distance_km` | `number` | Distance from Earth in km |
| `earth_distance_mi` | `number` | Distance from Earth in miles |
| `eccentricity` | `number` | Eccentricity |
| `epoch_jd` | `number` | Epoch in Julian Date |
| `flickr_images` | `table` | Flickr images |
| `id` | `string` | Roadster ID |
| `inclination` | `number` | Inclination |
| `launch_date_unix` | `number` | Launch date in unix timestamp |
| `launch_date_utc` | `string` | Launch date in UTC |
| `launch_mass_kg` | `number` | Launch mass in kilograms |
| `launch_mass_lbs` | `number` | Launch mass in pounds |
| `longitude` | `number` | Longitude |
| `mars_distance_km` | `number` | Distance from Mars in km |
| `mars_distance_mi` | `number` | Distance from Mars in miles |
| `name` | `string` | Roadster name |
| `norad_id` | `number` | NORAD ID |
| `orbit_type` | `string` | Orbit type |
| `periapsis_arg` | `number` | Argument of periapsis |
| `periapsis_au` | `number` | Periapsis in AU |
| `period_days` | `number` | Orbital period in days |
| `semi_major_axis_au` | `number` | Semi-major axis in AU |
| `speed_kph` | `number` | Speed in km/h |
| `speed_mph` | `number` | Speed in mph |
| `video` | `string` | Video URL |
| `wikipedia` | `string` | Wikipedia URL |

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
| `active` | `boolean` | Whether the rocket is active |
| `boosters` | `number` | Number of boosters |
| `company` | `string` | Company |
| `cost_per_launch` | `number` | Cost per launch in USD |
| `country` | `string` | Country of origin |
| `description` | `string` |  |
| `diameter` | `table` |  |
| `first_flight` | `string` | Date of first flight |
| `flickr_images` | `table` |  |
| `height` | `table` |  |
| `id` | `string` | Rocket ID |
| `mass` | `table` |  |
| `name` | `string` | Rocket name |
| `stages` | `number` | Number of stages |
| `success_rate_pct` | `number` | Success rate percentage |
| `type` | `string` | Rocket type |
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
| `abs` | `number` | ABS number |
| `class` | `number` | Ship class |
| `course_deg` | `number` | Course in degrees |
| `home_port` | `string` | Home port |
| `id` | `string` | Ship ID |
| `image` | `string` | Image URL |
| `imo` | `number` | IMO number |
| `last_ais_update` | `string` | Last AIS update timestamp |
| `latitude` | `number` | Latitude |
| `launches` | `table` | Launch IDs |
| `legacy_id` | `string` | Legacy ID |
| `link` | `string` | Link to ship info |
| `longitude` | `number` | Longitude |
| `mass_kg` | `number` | Mass in kilograms |
| `mass_lbs` | `number` | Mass in pounds |
| `mmsi` | `number` | MMSI number |
| `model` | `string` | Ship model |
| `name` | `string` | Ship name |
| `roles` | `table` | Ship roles |
| `speed_kn` | `number` | Speed in knots |
| `status` | `string` | Ship status |
| `type` | `string` | Ship type |
| `year_built` | `number` | Year built |

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
| `height_km` | `number` | Current height in kilometers |
| `id` | `string` | Starlink satellite ID |
| `latitude` | `number` | Current latitude |
| `launch` | `string` | Launch ID |
| `longitude` | `number` | Current longitude |
| `spaceTrack` | `table` | Space-Track.org data |
| `velocity_kms` | `number` | Current velocity in km/s |
| `version` | `string` | Satellite version |

#### Example: Load

```lua
local starlink, err = client:Starlink():load({ id = "starlink_id" })
```

#### Example: List

```lua
local starlinks, err = client:Starlink():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
local landpad = client:Landpad()
landpad:list()

-- landpad:data_get() now returns the landpad data from the last list
-- landpad:match_get() returns the last match criteria
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
