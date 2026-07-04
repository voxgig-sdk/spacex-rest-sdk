# SpacexRest Python SDK Reference

Complete API reference for the SpacexRest Python SDK.


## SpacexRestSDK

### Constructor

```python
from spacex-rest_sdk import SpacexRestSDK

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
| `id` | ``$STRING`` | No |  |
| `land_landing` | ``$INTEGER`` | No |  |
| `last_update` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `reuse_count` | ``$INTEGER`` | No |  |
| `serial` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `water_landing` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Capsule().list({})
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
| `asds_attempt` | ``$INTEGER`` | No |  |
| `asds_landing` | ``$INTEGER`` | No |  |
| `block` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `last_update` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `reuse_count` | ``$INTEGER`` | No |  |
| `rtls_attempt` | ``$INTEGER`` | No |  |
| `rtls_landing` | ``$INTEGER`` | No |  |
| `serial` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Core().list({})
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
| `agency` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Crew().list({})
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
| `detail` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `landing_attempt` | ``$INTEGER`` | No |  |
| `landing_success` | ``$INTEGER`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `locality` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Landpad().list({})
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
| `auto_update` | ``$BOOLEAN`` | No |  |
| `capsule` | ``$ARRAY`` | No |  |
| `core` | ``$ARRAY`` | No |  |
| `crew` | ``$ARRAY`` | No |  |
| `date_local` | ``$STRING`` | No |  |
| `date_precision` | ``$STRING`` | No |  |
| `date_unix` | ``$INTEGER`` | No |  |
| `date_utc` | ``$STRING`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `failure` | ``$ARRAY`` | No |  |
| `fairing` | ``$OBJECT`` | No |  |
| `flight` | ``$INTEGER`` | No |  |
| `flight_number` | ``$INTEGER`` | No |  |
| `gridfin` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `landing_attempt` | ``$BOOLEAN`` | No |  |
| `landing_success` | ``$BOOLEAN`` | No |  |
| `landing_type` | ``$STRING`` | No |  |
| `landpad` | ``$STRING`` | No |  |
| `launchpad` | ``$STRING`` | No |  |
| `leg` | ``$BOOLEAN`` | No |  |
| `link` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `net` | ``$BOOLEAN`` | No |  |
| `payload` | ``$ARRAY`` | No |  |
| `reused` | ``$BOOLEAN`` | No |  |
| `rocket` | ``$STRING`` | No |  |
| `ship` | ``$ARRAY`` | No |  |
| `static_fire_date_unix` | ``$INTEGER`` | No |  |
| `static_fire_date_utc` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `tdb` | ``$BOOLEAN`` | No |  |
| `upcoming` | ``$BOOLEAN`` | No |  |
| `window` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Launch().list({})
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
| `detail` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `launch_attempt` | ``$INTEGER`` | No |  |
| `launch_success` | ``$INTEGER`` | No |  |
| `locality` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |
| `rocket` | ``$ARRAY`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Launchpad().list({})
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
| `apoapsis_km` | ``$NUMBER`` | No |  |
| `arg_of_pericenter` | ``$NUMBER`` | No |  |
| `customer` | ``$ARRAY`` | No |  |
| `eccentricity` | ``$NUMBER`` | No |  |
| `epoch` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `inclination_deg` | ``$NUMBER`` | No |  |
| `launch` | ``$STRING`` | No |  |
| `lifespan_year` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `manufacturer` | ``$ARRAY`` | No |  |
| `mass_kg` | ``$NUMBER`` | No |  |
| `mass_lb` | ``$NUMBER`` | No |  |
| `mean_anomaly` | ``$NUMBER`` | No |  |
| `mean_motion` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nationality` | ``$ARRAY`` | No |  |
| `norad_id` | ``$ARRAY`` | No |  |
| `orbit` | ``$STRING`` | No |  |
| `periapsis_km` | ``$NUMBER`` | No |  |
| `period_min` | ``$NUMBER`` | No |  |
| `raan` | ``$NUMBER`` | No |  |
| `reference_system` | ``$STRING`` | No |  |
| `regime` | ``$STRING`` | No |  |
| `reused` | ``$BOOLEAN`` | No |  |
| `semi_major_axis_km` | ``$NUMBER`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Payload().list({})
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
| `apoapsis_au` | ``$NUMBER`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `earth_distance_km` | ``$NUMBER`` | No |  |
| `earth_distance_mi` | ``$NUMBER`` | No |  |
| `eccentricity` | ``$NUMBER`` | No |  |
| `epoch_jd` | ``$NUMBER`` | No |  |
| `flickr_image` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `inclination` | ``$NUMBER`` | No |  |
| `launch_date_unix` | ``$INTEGER`` | No |  |
| `launch_date_utc` | ``$STRING`` | No |  |
| `launch_mass_kg` | ``$INTEGER`` | No |  |
| `launch_mass_lb` | ``$INTEGER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `mars_distance_km` | ``$NUMBER`` | No |  |
| `mars_distance_mi` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `norad_id` | ``$INTEGER`` | No |  |
| `orbit_type` | ``$STRING`` | No |  |
| `periapsis_arg` | ``$NUMBER`` | No |  |
| `periapsis_au` | ``$NUMBER`` | No |  |
| `period_day` | ``$NUMBER`` | No |  |
| `semi_major_axis_au` | ``$NUMBER`` | No |  |
| `speed_kph` | ``$NUMBER`` | No |  |
| `speed_mph` | ``$NUMBER`` | No |  |
| `video` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Roadster().list({})
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
| `active` | ``$BOOLEAN`` | No |  |
| `booster` | ``$INTEGER`` | No |  |
| `company` | ``$STRING`` | No |  |
| `cost_per_launch` | ``$INTEGER`` | No |  |
| `country` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$OBJECT`` | No |  |
| `first_flight` | ``$STRING`` | No |  |
| `flickr_image` | ``$ARRAY`` | No |  |
| `height` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `mass` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `stage` | ``$INTEGER`` | No |  |
| `success_rate_pct` | ``$NUMBER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `wikipedia` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Rocket().list({})
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
| `abs` | ``$INTEGER`` | No |  |
| `class` | ``$INTEGER`` | No |  |
| `course_deg` | ``$NUMBER`` | No |  |
| `home_port` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `imo` | ``$INTEGER`` | No |  |
| `last_ais_update` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$ARRAY`` | No |  |
| `legacy_id` | ``$STRING`` | No |  |
| `link` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `mass_kg` | ``$INTEGER`` | No |  |
| `mass_lb` | ``$INTEGER`` | No |  |
| `mmsi` | ``$INTEGER`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `role` | ``$ARRAY`` | No |  |
| `speed_kn` | ``$NUMBER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `year_built` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Ship().list({})
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
| `height_km` | ``$NUMBER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `launch` | ``$STRING`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `space_track` | ``$OBJECT`` | No |  |
| `velocity_km` | ``$NUMBER`` | No |  |
| `version` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Starlink().list({})
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

