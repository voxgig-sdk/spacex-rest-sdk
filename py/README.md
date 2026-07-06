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

`load()` returns the bare record (a `dict`) and raises on error.

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
    capsules = client.Capsule().list()
    print(capsules)
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

# Entity ops return the bare record and raise on error.
capsule = client.Capsule().list()
# capsule contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `capsule = client.Capsule()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `land_landing` | `int` |  |
| `last_update` | `str` |  |
| `launch` | `list` |  |
| `reuse_count` | `int` |  |
| `serial` | `str` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `water_landing` | `int` |  |

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
| `asds_attempt` | `int` |  |
| `asds_landing` | `int` |  |
| `block` | `int` |  |
| `id` | `str` |  |
| `last_update` | `str` |  |
| `launch` | `list` |  |
| `reuse_count` | `int` |  |
| `rtls_attempt` | `int` |  |
| `rtls_landing` | `int` |  |
| `serial` | `str` |  |
| `status` | `str` |  |

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
| `agency` | `str` |  |
| `id` | `str` |  |
| `image` | `str` |  |
| `launch` | `list` |  |
| `name` | `str` |  |
| `status` | `str` |  |
| `wikipedia` | `str` |  |

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
| `detail` | `str` |  |
| `full_name` | `str` |  |
| `id` | `str` |  |
| `landing_attempt` | `int` |  |
| `landing_success` | `int` |  |
| `latitude` | `float` |  |
| `launch` | `list` |  |
| `locality` | `str` |  |
| `longitude` | `float` |  |
| `name` | `str` |  |
| `region` | `str` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `wikipedia` | `str` |  |

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
| `auto_update` | `bool` |  |
| `capsule` | `list` |  |
| `core` | `list` |  |
| `crew` | `list` |  |
| `date_local` | `str` |  |
| `date_precision` | `str` |  |
| `date_unix` | `int` |  |
| `date_utc` | `str` |  |
| `detail` | `str` |  |
| `failure` | `list` |  |
| `fairing` | `dict` |  |
| `flight` | `int` |  |
| `flight_number` | `int` |  |
| `gridfin` | `bool` |  |
| `id` | `str` |  |
| `landing_attempt` | `bool` |  |
| `landing_success` | `bool` |  |
| `landing_type` | `str` |  |
| `landpad` | `str` |  |
| `launchpad` | `str` |  |
| `leg` | `bool` |  |
| `link` | `dict` |  |
| `name` | `str` |  |
| `net` | `bool` |  |
| `payload` | `list` |  |
| `reused` | `bool` |  |
| `rocket` | `str` |  |
| `ship` | `list` |  |
| `static_fire_date_unix` | `int` |  |
| `static_fire_date_utc` | `str` |  |
| `success` | `bool` |  |
| `tdb` | `bool` |  |
| `upcoming` | `bool` |  |
| `window` | `int` |  |

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
| `detail` | `str` |  |
| `full_name` | `str` |  |
| `id` | `str` |  |
| `latitude` | `float` |  |
| `launch` | `list` |  |
| `launch_attempt` | `int` |  |
| `launch_success` | `int` |  |
| `locality` | `str` |  |
| `longitude` | `float` |  |
| `name` | `str` |  |
| `region` | `str` |  |
| `rocket` | `list` |  |
| `status` | `str` |  |

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
| `apoapsis_km` | `float` |  |
| `arg_of_pericenter` | `float` |  |
| `customer` | `list` |  |
| `eccentricity` | `float` |  |
| `epoch` | `str` |  |
| `id` | `str` |  |
| `inclination_deg` | `float` |  |
| `launch` | `str` |  |
| `lifespan_year` | `float` |  |
| `longitude` | `float` |  |
| `manufacturer` | `list` |  |
| `mass_kg` | `float` |  |
| `mass_lb` | `float` |  |
| `mean_anomaly` | `float` |  |
| `mean_motion` | `float` |  |
| `name` | `str` |  |
| `nationality` | `list` |  |
| `norad_id` | `list` |  |
| `orbit` | `str` |  |
| `periapsis_km` | `float` |  |
| `period_min` | `float` |  |
| `raan` | `float` |  |
| `reference_system` | `str` |  |
| `regime` | `str` |  |
| `reused` | `bool` |  |
| `semi_major_axis_km` | `float` |  |
| `type` | `str` |  |

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
| `apoapsis_au` | `float` |  |
| `detail` | `str` |  |
| `earth_distance_km` | `float` |  |
| `earth_distance_mi` | `float` |  |
| `eccentricity` | `float` |  |
| `epoch_jd` | `float` |  |
| `flickr_image` | `list` |  |
| `id` | `str` |  |
| `inclination` | `float` |  |
| `launch_date_unix` | `int` |  |
| `launch_date_utc` | `str` |  |
| `launch_mass_kg` | `int` |  |
| `launch_mass_lb` | `int` |  |
| `longitude` | `float` |  |
| `mars_distance_km` | `float` |  |
| `mars_distance_mi` | `float` |  |
| `name` | `str` |  |
| `norad_id` | `int` |  |
| `orbit_type` | `str` |  |
| `periapsis_arg` | `float` |  |
| `periapsis_au` | `float` |  |
| `period_day` | `float` |  |
| `semi_major_axis_au` | `float` |  |
| `speed_kph` | `float` |  |
| `speed_mph` | `float` |  |
| `video` | `str` |  |
| `wikipedia` | `str` |  |

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
| `active` | `bool` |  |
| `booster` | `int` |  |
| `company` | `str` |  |
| `cost_per_launch` | `int` |  |
| `country` | `str` |  |
| `description` | `str` |  |
| `diameter` | `dict` |  |
| `first_flight` | `str` |  |
| `flickr_image` | `list` |  |
| `height` | `dict` |  |
| `id` | `str` |  |
| `mass` | `dict` |  |
| `name` | `str` |  |
| `stage` | `int` |  |
| `success_rate_pct` | `float` |  |
| `type` | `str` |  |
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
| `abs` | `int` |  |
| `class` | `int` |  |
| `course_deg` | `float` |  |
| `home_port` | `str` |  |
| `id` | `str` |  |
| `image` | `str` |  |
| `imo` | `int` |  |
| `last_ais_update` | `str` |  |
| `latitude` | `float` |  |
| `launch` | `list` |  |
| `legacy_id` | `str` |  |
| `link` | `str` |  |
| `longitude` | `float` |  |
| `mass_kg` | `int` |  |
| `mass_lb` | `int` |  |
| `mmsi` | `int` |  |
| `model` | `str` |  |
| `name` | `str` |  |
| `role` | `list` |  |
| `speed_kn` | `float` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `year_built` | `int` |  |

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
| `height_km` | `float` |  |
| `id` | `str` |  |
| `latitude` | `float` |  |
| `launch` | `str` |  |
| `longitude` | `float` |  |
| `space_track` | `dict` |  |
| `velocity_km` | `float` |  |
| `version` | `str` |  |

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
capsule = client.Capsule()
capsule.list()

# capsule.data_get() now returns the capsule data from the last list
# capsule.match_get() returns the last match criteria
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
