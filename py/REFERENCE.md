# SpacexRest Python SDK Reference

Complete API reference for the SpacexRest Python SDK.


## SpacexRestSDK

### Constructor

```python
from spacexrest_sdk import SpacexRestSDK

client = SpacexRestSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SpacexRestSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = SpacexRestSDK.test()
```


### Instance Methods

#### `Capsule(data=None)`

Create a new `CapsuleEntity` instance. Pass `None` for no initial data.

#### `Core(data=None)`

Create a new `CoreEntity` instance. Pass `None` for no initial data.

#### `Crew(data=None)`

Create a new `CrewEntity` instance. Pass `None` for no initial data.

#### `Landpad(data=None)`

Create a new `LandpadEntity` instance. Pass `None` for no initial data.

#### `Launch(data=None)`

Create a new `LaunchEntity` instance. Pass `None` for no initial data.

#### `Launchpad(data=None)`

Create a new `LaunchpadEntity` instance. Pass `None` for no initial data.

#### `Payload(data=None)`

Create a new `PayloadEntity` instance. Pass `None` for no initial data.

#### `Roadster(data=None)`

Create a new `RoadsterEntity` instance. Pass `None` for no initial data.

#### `Rocket(data=None)`

Create a new `RocketEntity` instance. Pass `None` for no initial data.

#### `Ship(data=None)`

Create a new `ShipEntity` instance. Pass `None` for no initial data.

#### `Starlink(data=None)`

Create a new `StarlinkEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CapsuleEntity

```python
capsule = client.Capsule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `land_landing` | `int` | No |  |
| `last_update` | `str` | No |  |
| `launch` | `list` | No |  |
| `reuse_count` | `int` | No |  |
| `serial` | `str` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |
| `water_landing` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Capsule().list()
for capsule in results:
    print(capsule)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Capsule().load({"id": "capsule_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CapsuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoreEntity

```python
core = client.Core()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempt` | `int` | No |  |
| `asds_landing` | `int` | No |  |
| `block` | `int` | No |  |
| `id` | `str` | No |  |
| `last_update` | `str` | No |  |
| `launch` | `list` | No |  |
| `reuse_count` | `int` | No |  |
| `rtls_attempt` | `int` | No |  |
| `rtls_landing` | `int` | No |  |
| `serial` | `str` | No |  |
| `status` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Core().list()
for core in results:
    print(core)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Core().load({"id": "core_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CrewEntity

```python
crew = client.Crew()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `str` | No |  |
| `id` | `str` | No |  |
| `image` | `str` | No |  |
| `launch` | `list` | No |  |
| `name` | `str` | No |  |
| `status` | `str` | No |  |
| `wikipedia` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Crew().list()
for crew in results:
    print(crew)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Crew().load({"id": "crew_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CrewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LandpadEntity

```python
landpad = client.Landpad()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `str` | No |  |
| `full_name` | `str` | No |  |
| `id` | `str` | No |  |
| `landing_attempt` | `int` | No |  |
| `landing_success` | `int` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `list` | No |  |
| `locality` | `str` | No |  |
| `longitude` | `float` | No |  |
| `name` | `str` | No |  |
| `region` | `str` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |
| `wikipedia` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Landpad().list()
for landpad in results:
    print(landpad)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Landpad().load({"id": "landpad_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LandpadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LaunchEntity

```python
launch = client.Launch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | `bool` | No |  |
| `capsule` | `list` | No |  |
| `core` | `list` | No |  |
| `crew` | `list` | No |  |
| `date_local` | `str` | No |  |
| `date_precision` | `str` | No |  |
| `date_unix` | `int` | No |  |
| `date_utc` | `str` | No |  |
| `detail` | `str` | No |  |
| `failure` | `list` | No |  |
| `fairing` | `dict` | No |  |
| `flight` | `int` | No |  |
| `flight_number` | `int` | No |  |
| `gridfin` | `bool` | No |  |
| `id` | `str` | No |  |
| `landing_attempt` | `bool` | No |  |
| `landing_success` | `bool` | No |  |
| `landing_type` | `str` | No |  |
| `landpad` | `str` | No |  |
| `launchpad` | `str` | No |  |
| `leg` | `bool` | No |  |
| `link` | `dict` | No |  |
| `name` | `str` | No |  |
| `net` | `bool` | No |  |
| `payload` | `list` | No |  |
| `reused` | `bool` | No |  |
| `rocket` | `str` | No |  |
| `ship` | `list` | No |  |
| `static_fire_date_unix` | `int` | No |  |
| `static_fire_date_utc` | `str` | No |  |
| `success` | `bool` | No |  |
| `tdb` | `bool` | No |  |
| `upcoming` | `bool` | No |  |
| `window` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Launch().list()
for launch in results:
    print(launch)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Launch().load({"id": "launch_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LaunchpadEntity

```python
launchpad = client.Launchpad()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `str` | No |  |
| `full_name` | `str` | No |  |
| `id` | `str` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `list` | No |  |
| `launch_attempt` | `int` | No |  |
| `launch_success` | `int` | No |  |
| `locality` | `str` | No |  |
| `longitude` | `float` | No |  |
| `name` | `str` | No |  |
| `region` | `str` | No |  |
| `rocket` | `list` | No |  |
| `status` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Launchpad().list()
for launchpad in results:
    print(launchpad)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Launchpad().load({"id": "launchpad_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchpadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PayloadEntity

```python
payload = client.Payload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | `float` | No |  |
| `arg_of_pericenter` | `float` | No |  |
| `customer` | `list` | No |  |
| `eccentricity` | `float` | No |  |
| `epoch` | `str` | No |  |
| `id` | `str` | No |  |
| `inclination_deg` | `float` | No |  |
| `launch` | `str` | No |  |
| `lifespan_year` | `float` | No |  |
| `longitude` | `float` | No |  |
| `manufacturer` | `list` | No |  |
| `mass_kg` | `float` | No |  |
| `mass_lb` | `float` | No |  |
| `mean_anomaly` | `float` | No |  |
| `mean_motion` | `float` | No |  |
| `name` | `str` | No |  |
| `nationality` | `list` | No |  |
| `norad_id` | `list` | No |  |
| `orbit` | `str` | No |  |
| `periapsis_km` | `float` | No |  |
| `period_min` | `float` | No |  |
| `raan` | `float` | No |  |
| `reference_system` | `str` | No |  |
| `regime` | `str` | No |  |
| `reused` | `bool` | No |  |
| `semi_major_axis_km` | `float` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Payload().list()
for payload in results:
    print(payload)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Payload().load({"id": "payload_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayloadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RoadsterEntity

```python
roadster = client.Roadster()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | `float` | No |  |
| `detail` | `str` | No |  |
| `earth_distance_km` | `float` | No |  |
| `earth_distance_mi` | `float` | No |  |
| `eccentricity` | `float` | No |  |
| `epoch_jd` | `float` | No |  |
| `flickr_image` | `list` | No |  |
| `id` | `str` | No |  |
| `inclination` | `float` | No |  |
| `launch_date_unix` | `int` | No |  |
| `launch_date_utc` | `str` | No |  |
| `launch_mass_kg` | `int` | No |  |
| `launch_mass_lb` | `int` | No |  |
| `longitude` | `float` | No |  |
| `mars_distance_km` | `float` | No |  |
| `mars_distance_mi` | `float` | No |  |
| `name` | `str` | No |  |
| `norad_id` | `int` | No |  |
| `orbit_type` | `str` | No |  |
| `periapsis_arg` | `float` | No |  |
| `periapsis_au` | `float` | No |  |
| `period_day` | `float` | No |  |
| `semi_major_axis_au` | `float` | No |  |
| `speed_kph` | `float` | No |  |
| `speed_mph` | `float` | No |  |
| `video` | `str` | No |  |
| `wikipedia` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Roadster().list()
for roadster in results:
    print(roadster)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoadsterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RocketEntity

```python
rocket = client.Rocket()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `booster` | `int` | No |  |
| `company` | `str` | No |  |
| `cost_per_launch` | `int` | No |  |
| `country` | `str` | No |  |
| `description` | `str` | No |  |
| `diameter` | `dict` | No |  |
| `first_flight` | `str` | No |  |
| `flickr_image` | `list` | No |  |
| `height` | `dict` | No |  |
| `id` | `str` | No |  |
| `mass` | `dict` | No |  |
| `name` | `str` | No |  |
| `stage` | `int` | No |  |
| `success_rate_pct` | `float` | No |  |
| `type` | `str` | No |  |
| `wikipedia` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rocket().list()
for rocket in results:
    print(rocket)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Rocket().load({"id": "rocket_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RocketEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ShipEntity

```python
ship = client.Ship()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | `int` | No |  |
| `class` | `int` | No |  |
| `course_deg` | `float` | No |  |
| `home_port` | `str` | No |  |
| `id` | `str` | No |  |
| `image` | `str` | No |  |
| `imo` | `int` | No |  |
| `last_ais_update` | `str` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `list` | No |  |
| `legacy_id` | `str` | No |  |
| `link` | `str` | No |  |
| `longitude` | `float` | No |  |
| `mass_kg` | `int` | No |  |
| `mass_lb` | `int` | No |  |
| `mmsi` | `int` | No |  |
| `model` | `str` | No |  |
| `name` | `str` | No |  |
| `role` | `list` | No |  |
| `speed_kn` | `float` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |
| `year_built` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ship().list()
for ship in results:
    print(ship)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ship().load({"id": "ship_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShipEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StarlinkEntity

```python
starlink = client.Starlink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | `float` | No |  |
| `id` | `str` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `str` | No |  |
| `longitude` | `float` | No |  |
| `space_track` | `dict` | No |  |
| `velocity_km` | `float` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Starlink().list()
for starlink in results:
    print(starlink)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Starlink().load({"id": "starlink_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StarlinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = SpacexRestSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

