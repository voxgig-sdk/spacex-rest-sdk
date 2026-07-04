# SpacexRest TypeScript SDK Reference

Complete API reference for the SpacexRest TypeScript SDK.


## SpacexRestSDK

### Constructor

```ts
new SpacexRestSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SpacexRestSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SpacexRestSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SpacexRestSDK` instance in test mode.


### Instance Methods

#### `Capsule(data?: object)`

Create a new `Capsule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CapsuleEntity` instance.

#### `Core(data?: object)`

Create a new `Core` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoreEntity` instance.

#### `Crew(data?: object)`

Create a new `Crew` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrewEntity` instance.

#### `Landpad(data?: object)`

Create a new `Landpad` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LandpadEntity` instance.

#### `Launch(data?: object)`

Create a new `Launch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LaunchEntity` instance.

#### `Launchpad(data?: object)`

Create a new `Launchpad` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LaunchpadEntity` instance.

#### `Payload(data?: object)`

Create a new `Payload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PayloadEntity` instance.

#### `Roadster(data?: object)`

Create a new `Roadster` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RoadsterEntity` instance.

#### `Rocket(data?: object)`

Create a new `Rocket` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RocketEntity` instance.

#### `Ship(data?: object)`

Create a new `Ship` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ShipEntity` instance.

#### `Starlink(data?: object)`

Create a new `Starlink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StarlinkEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SpacexRestSDK.test()`.

**Returns:** `SpacexRestSDK` instance in test mode.


---

## CapsuleEntity

```ts
const capsule = client.Capsule()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Capsule().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Capsule().load({ id: 'capsule_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoreEntity

```ts
const core = client.Core()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Core().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Core().load({ id: 'core_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CrewEntity

```ts
const crew = client.Crew()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Crew().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Crew().load({ id: 'crew_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrewEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LandpadEntity

```ts
const landpad = client.Landpad()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Landpad().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Landpad().load({ id: 'landpad_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LandpadEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LaunchEntity

```ts
const launch = client.Launch()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Launch().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Launch().load({ id: 'launch_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LaunchEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LaunchpadEntity

```ts
const launchpad = client.Launchpad()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Launchpad().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Launchpad().load({ id: 'launchpad_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PayloadEntity

```ts
const payload = client.Payload()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Payload().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Payload().load({ id: 'payload_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PayloadEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RoadsterEntity

```ts
const roadster = client.Roadster()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Roadster().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RocketEntity

```ts
const rocket = client.Rocket()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rocket().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Rocket().load({ id: 'rocket_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RocketEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ShipEntity

```ts
const ship = client.Ship()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ship().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Ship().load({ id: 'ship_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ShipEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StarlinkEntity

```ts
const starlink = client.Starlink()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Starlink().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Starlink().load({ id: 'starlink_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpacexRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new SpacexRestSDK({
  feature: {
    test: { active: true },
  }
})
```

