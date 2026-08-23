# SpacexRest Python SDK



The Python SDK for the SpacexRest API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Capsule()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from spacexrest_sdk import SpacexRestSDK

client = SpacexRestSDK()
```

### 2. List capsule records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    capsules = client.Capsule().list()
    for capsule in capsules:
        print(capsule)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a capsule

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    capsule = client.Capsule().load({"id": "example_id"})
    print(capsule)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    landpads = client.Landpad().list()
    print(landpads)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = SpacexRestSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
landpad = client.Landpad().list()
# landpad contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = SpacexRestSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### SpacexRestSDK

```python
from spacexrest_sdk import SpacexRestSDK

client = SpacexRestSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = SpacexRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### SpacexRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `capsule = client.Capsule()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | Capsule serial number |
| `land_landings` | `int` | Number of land landings |
| `last_update` | `str` | Last update about the capsule |
| `launches` | `list` | Launch IDs |
| `reuse_count` | `int` | Number of times capsule has been reused |
| `serial` | `str` | Capsule serial number |
| `status` | `str` | Capsule status |
| `type` | `str` | Capsule type |
| `water_landings` | `int` | Number of water landings |

#### Example: Load

```python
capsule = client.Capsule().load({"id": "capsule_id"})
```

#### Example: List

```python
capsules = client.Capsule().list()
```


### Core

Create an instance: `core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asds_attempts` | `int` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `int` | Number of successful ASDS landings |
| `block` | `int` | Core block number |
| `id` | `str` | Core serial number |
| `last_update` | `str` | Last update about the core |
| `launches` | `list` | Launch IDs |
| `reuse_count` | `int` | Number of times core has been reused |
| `rtls_attempts` | `int` | Number of return to launch site attempts |
| `rtls_landings` | `int` | Number of successful RTLS landings |
| `serial` | `str` | Core serial number |
| `status` | `str` | Core status (active, inactive, unknown, expended, lost, retired) |

#### Example: Load

```python
core = client.Core().load({"id": "core_id"})
```

#### Example: List

```python
cores = client.Core().list()
```


### Crew

Create an instance: `crew = client.Crew()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `str` | Agency |
| `id` | `str` | Crew member ID |
| `image` | `str` | Image URL |
| `launches` | `list` | Launch IDs |
| `name` | `str` | Crew member name |
| `status` | `str` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `str` | Wikipedia URL |

#### Example: Load

```python
crew = client.Crew().load({"id": "crew_id"})
```

#### Example: List

```python
crews = client.Crew().list()
```


### Landpad

Create an instance: `landpad = client.Landpad()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `str` | Landing pad details |
| `full_name` | `str` | Full landing pad name |
| `id` | `str` | Landing pad ID |
| `landing_attempts` | `int` | Number of landing attempts |
| `landing_successes` | `int` | Number of successful landings |
| `latitude` | `float` | Latitude |
| `launches` | `list` | Launch IDs |
| `locality` | `str` | Locality |
| `longitude` | `float` | Longitude |
| `name` | `str` | Landing pad name |
| `region` | `str` | Region |
| `status` | `str` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `str` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `str` | Wikipedia URL |

#### Example: Load

```python
landpad = client.Landpad().load({"id": "landpad_id"})
```

#### Example: List

```python
landpads = client.Landpad().list()
```


### Launch

Create an instance: `launch = client.Launch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | `bool` | Whether the launch data is automatically updated |
| `capsules` | `list` | Capsule IDs |
| `core` | `str` | Core ID |
| `cores` | `list` |  |
| `crew` | `list` | Crew member IDs |
| `date_local` | `str` | Launch date in local time |
| `date_precision` | `str` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `int` | Launch date in unix timestamp |
| `date_utc` | `str` | Launch date in UTC |
| `details` | `str` | Launch details |
| `failures` | `list` | Launch failures |
| `fairings` | `dict` |  |
| `flight` | `int` | Core flight number |
| `flight_number` | `int` | Flight number |
| `gridfins` | `bool` | Whether core has grid fins |
| `id` | `str` | Launch ID |
| `landing_attempt` | `bool` | Whether landing was attempted |
| `landing_success` | `bool` | Whether landing was successful |
| `landing_type` | `str` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `str` | Landing pad ID |
| `launchpad` | `str` | Launchpad ID |
| `legs` | `bool` | Whether core has legs |
| `links` | `dict` |  |
| `name` | `str` | Launch name |
| `net` | `bool` | No earlier than |
| `payloads` | `list` | Payload IDs |
| `reused` | `bool` | Whether core was reused |
| `rocket` | `str` | Rocket ID |
| `ships` | `list` | Ship IDs |
| `static_fire_date_unix` | `int` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `str` | Static fire date in UTC |
| `success` | `bool` | Launch success status |
| `tdb` | `bool` | To be determined |
| `upcoming` | `bool` | Whether the launch is upcoming |
| `window` | `int` | Launch window in seconds |

#### Example: Load

```python
launch = client.Launch().load({"id": "launch_id"})
```

#### Example: List

```python
launchs = client.Launch().list()
```


### Launchpad

Create an instance: `launchpad = client.Launchpad()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `str` | Launchpad details |
| `full_name` | `str` | Full launchpad name |
| `id` | `str` | Launchpad ID |
| `latitude` | `float` | Latitude |
| `launch_attempts` | `int` | Number of launch attempts |
| `launch_successes` | `int` | Number of successful launches |
| `launches` | `list` | Launch IDs |
| `locality` | `str` | Locality |
| `longitude` | `float` | Longitude |
| `name` | `str` | Launchpad name |
| `region` | `str` | Region |
| `rockets` | `list` | Rocket IDs |
| `status` | `str` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

#### Example: Load

```python
launchpad = client.Launchpad().load({"id": "launchpad_id"})
```

#### Example: List

```python
launchpads = client.Launchpad().list()
```


### Payload

Create an instance: `payload = client.Payload()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_km` | `float` | Apoapsis in km |
| `arg_of_pericenter` | `float` | Argument of pericenter |
| `customers` | `list` | Customers |
| `eccentricity` | `float` | Eccentricity |
| `epoch` | `str` | Epoch |
| `id` | `str` | Payload ID |
| `inclination_deg` | `float` | Inclination in degrees |
| `launch` | `str` | Launch ID |
| `lifespan_years` | `float` | Lifespan in years |
| `longitude` | `float` | Longitude |
| `manufacturers` | `list` | Manufacturers |
| `mass_kg` | `float` | Payload mass in kilograms |
| `mass_lbs` | `float` | Payload mass in pounds |
| `mean_anomaly` | `float` | Mean anomaly |
| `mean_motion` | `float` | Mean motion |
| `name` | `str` | Payload name |
| `nationalities` | `list` | Nationalities |
| `norad_ids` | `list` | NORAD IDs |
| `orbit` | `str` | Orbit type |
| `periapsis_km` | `float` | Periapsis in km |
| `period_min` | `float` | Orbital period in minutes |
| `raan` | `float` | Right ascension of the ascending node |
| `reference_system` | `str` | Reference system |
| `regime` | `str` | Orbit regime |
| `reused` | `bool` | Whether the payload was reused |
| `semi_major_axis_km` | `float` | Semi-major axis in km |
| `type` | `str` | Payload type |

#### Example: Load

```python
payload = client.Payload().load({"id": "payload_id"})
```

#### Example: List

```python
payloads = client.Payload().list()
```


### Roadster

Create an instance: `roadster = client.Roadster()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apoapsis_au` | `float` | Apoapsis in AU |
| `details` | `str` | Details |
| `earth_distance_km` | `float` | Distance from Earth in km |
| `earth_distance_mi` | `float` | Distance from Earth in miles |
| `eccentricity` | `float` | Eccentricity |
| `epoch_jd` | `float` | Epoch in Julian Date |
| `flickr_images` | `list` | Flickr images |
| `id` | `str` | Roadster ID |
| `inclination` | `float` | Inclination |
| `launch_date_unix` | `int` | Launch date in unix timestamp |
| `launch_date_utc` | `str` | Launch date in UTC |
| `launch_mass_kg` | `int` | Launch mass in kilograms |
| `launch_mass_lbs` | `int` | Launch mass in pounds |
| `longitude` | `float` | Longitude |
| `mars_distance_km` | `float` | Distance from Mars in km |
| `mars_distance_mi` | `float` | Distance from Mars in miles |
| `name` | `str` | Roadster name |
| `norad_id` | `int` | NORAD ID |
| `orbit_type` | `str` | Orbit type |
| `periapsis_arg` | `float` | Argument of periapsis |
| `periapsis_au` | `float` | Periapsis in AU |
| `period_days` | `float` | Orbital period in days |
| `semi_major_axis_au` | `float` | Semi-major axis in AU |
| `speed_kph` | `float` | Speed in km/h |
| `speed_mph` | `float` | Speed in mph |
| `video` | `str` | Video URL |
| `wikipedia` | `str` | Wikipedia URL |

#### Example: List

```python
roadsters = client.Roadster().list()
```


### Rocket

Create an instance: `rocket = client.Rocket()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | Whether the rocket is active |
| `boosters` | `int` | Number of boosters |
| `company` | `str` | Company |
| `cost_per_launch` | `int` | Cost per launch in USD |
| `country` | `str` | Country of origin |
| `description` | `str` |  |
| `diameter` | `dict` |  |
| `first_flight` | `str` | Date of first flight |
| `flickr_images` | `list` |  |
| `height` | `dict` |  |
| `id` | `str` | Rocket ID |
| `mass` | `dict` |  |
| `name` | `str` | Rocket name |
| `stages` | `int` | Number of stages |
| `success_rate_pct` | `float` | Success rate percentage |
| `type` | `str` | Rocket type |
| `wikipedia` | `str` |  |

#### Example: Load

```python
rocket = client.Rocket().load({"id": "rocket_id"})
```

#### Example: List

```python
rockets = client.Rocket().list()
```


### Ship

Create an instance: `ship = client.Ship()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abs` | `int` | ABS number |
| `class` | `int` | Ship class |
| `course_deg` | `float` | Course in degrees |
| `home_port` | `str` | Home port |
| `id` | `str` | Ship ID |
| `image` | `str` | Image URL |
| `imo` | `int` | IMO number |
| `last_ais_update` | `str` | Last AIS update timestamp |
| `latitude` | `float` | Latitude |
| `launches` | `list` | Launch IDs |
| `legacy_id` | `str` | Legacy ID |
| `link` | `str` | Link to ship info |
| `longitude` | `float` | Longitude |
| `mass_kg` | `int` | Mass in kilograms |
| `mass_lbs` | `int` | Mass in pounds |
| `mmsi` | `int` | MMSI number |
| `model` | `str` | Ship model |
| `name` | `str` | Ship name |
| `roles` | `list` | Ship roles |
| `speed_kn` | `float` | Speed in knots |
| `status` | `str` | Ship status |
| `type` | `str` | Ship type |
| `year_built` | `int` | Year built |

#### Example: Load

```python
ship = client.Ship().load({"id": "ship_id"})
```

#### Example: List

```python
ships = client.Ship().list()
```


### Starlink

Create an instance: `starlink = client.Starlink()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height_km` | `float` | Current height in kilometers |
| `id` | `str` | Starlink satellite ID |
| `latitude` | `float` | Current latitude |
| `launch` | `str` | Launch ID |
| `longitude` | `float` | Current longitude |
| `spaceTrack` | `dict` | Space-Track.org data |
| `velocity_kms` | `float` | Current velocity in km/s |
| `version` | `str` | Satellite version |

#### Example: Load

```python
starlink = client.Starlink().load({"id": "starlink_id"})
```

#### Example: List

```python
starlinks = client.Starlink().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── spacexrest_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`spacexrest_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
landpad = client.Landpad()
landpad.list()

# landpad.data_get() now returns the landpad data from the last list
# landpad.match_get() returns the last match criteria
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
