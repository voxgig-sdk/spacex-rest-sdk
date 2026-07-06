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
| `id` | `string` | No |  |
| `land_landing` | `number` | No |  |
| `last_update` | `string` | No |  |
| `launch` | `any[]` | No |  |
| `reuse_count` | `number` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `water_landing` | `number` | No |  |

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
| `asds_attempt` | `number` | No |  |
| `asds_landing` | `number` | No |  |
| `block` | `number` | No |  |
| `id` | `string` | No |  |
| `last_update` | `string` | No |  |
| `launch` | `any[]` | No |  |
| `reuse_count` | `number` | No |  |
| `rtls_attempt` | `number` | No |  |
| `rtls_landing` | `number` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |

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
| `agency` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch` | `any[]` | No |  |
| `name` | `string` | No |  |
| `status` | `string` | No |  |
| `wikipedia` | `string` | No |  |

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
| `detail` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `number` | No |  |
| `landing_success` | `number` | No |  |
| `latitude` | `number` | No |  |
| `launch` | `any[]` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `number` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

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
| `auto_update` | `boolean` | No |  |
| `capsule` | `any[]` | No |  |
| `core` | `any[]` | No |  |
| `crew` | `any[]` | No |  |
| `date_local` | `string` | No |  |
| `date_precision` | `string` | No |  |
| `date_unix` | `number` | No |  |
| `date_utc` | `string` | No |  |
| `detail` | `string` | No |  |
| `failure` | `any[]` | No |  |
| `fairing` | `Record<string, any>` | No |  |
| `flight` | `number` | No |  |
| `flight_number` | `number` | No |  |
| `gridfin` | `boolean` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `boolean` | No |  |
| `landing_success` | `boolean` | No |  |
| `landing_type` | `string` | No |  |
| `landpad` | `string` | No |  |
| `launchpad` | `string` | No |  |
| `leg` | `boolean` | No |  |
| `link` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `net` | `boolean` | No |  |
| `payload` | `any[]` | No |  |
| `reused` | `boolean` | No |  |
| `rocket` | `string` | No |  |
| `ship` | `any[]` | No |  |
| `static_fire_date_unix` | `number` | No |  |
| `static_fire_date_utc` | `string` | No |  |
| `success` | `boolean` | No |  |
| `tdb` | `boolean` | No |  |
| `upcoming` | `boolean` | No |  |
| `window` | `number` | No |  |

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
| `detail` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launch` | `any[]` | No |  |
| `launch_attempt` | `number` | No |  |
| `launch_success` | `number` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `number` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `rocket` | `any[]` | No |  |
| `status` | `string` | No |  |

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
| `apoapsis_km` | `number` | No |  |
| `arg_of_pericenter` | `number` | No |  |
| `customer` | `any[]` | No |  |
| `eccentricity` | `number` | No |  |
| `epoch` | `string` | No |  |
| `id` | `string` | No |  |
| `inclination_deg` | `number` | No |  |
| `launch` | `string` | No |  |
| `lifespan_year` | `number` | No |  |
| `longitude` | `number` | No |  |
| `manufacturer` | `any[]` | No |  |
| `mass_kg` | `number` | No |  |
| `mass_lb` | `number` | No |  |
| `mean_anomaly` | `number` | No |  |
| `mean_motion` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `any[]` | No |  |
| `norad_id` | `any[]` | No |  |
| `orbit` | `string` | No |  |
| `periapsis_km` | `number` | No |  |
| `period_min` | `number` | No |  |
| `raan` | `number` | No |  |
| `reference_system` | `string` | No |  |
| `regime` | `string` | No |  |
| `reused` | `boolean` | No |  |
| `semi_major_axis_km` | `number` | No |  |
| `type` | `string` | No |  |

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
| `apoapsis_au` | `number` | No |  |
| `detail` | `string` | No |  |
| `earth_distance_km` | `number` | No |  |
| `earth_distance_mi` | `number` | No |  |
| `eccentricity` | `number` | No |  |
| `epoch_jd` | `number` | No |  |
| `flickr_image` | `any[]` | No |  |
| `id` | `string` | No |  |
| `inclination` | `number` | No |  |
| `launch_date_unix` | `number` | No |  |
| `launch_date_utc` | `string` | No |  |
| `launch_mass_kg` | `number` | No |  |
| `launch_mass_lb` | `number` | No |  |
| `longitude` | `number` | No |  |
| `mars_distance_km` | `number` | No |  |
| `mars_distance_mi` | `number` | No |  |
| `name` | `string` | No |  |
| `norad_id` | `number` | No |  |
| `orbit_type` | `string` | No |  |
| `periapsis_arg` | `number` | No |  |
| `periapsis_au` | `number` | No |  |
| `period_day` | `number` | No |  |
| `semi_major_axis_au` | `number` | No |  |
| `speed_kph` | `number` | No |  |
| `speed_mph` | `number` | No |  |
| `video` | `string` | No |  |
| `wikipedia` | `string` | No |  |

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
| `active` | `boolean` | No |  |
| `booster` | `number` | No |  |
| `company` | `string` | No |  |
| `cost_per_launch` | `number` | No |  |
| `country` | `string` | No |  |
| `description` | `string` | No |  |
| `diameter` | `Record<string, any>` | No |  |
| `first_flight` | `string` | No |  |
| `flickr_image` | `any[]` | No |  |
| `height` | `Record<string, any>` | No |  |
| `id` | `string` | No |  |
| `mass` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `stage` | `number` | No |  |
| `success_rate_pct` | `number` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

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
| `abs` | `number` | No |  |
| `class` | `number` | No |  |
| `course_deg` | `number` | No |  |
| `home_port` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `imo` | `number` | No |  |
| `last_ais_update` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launch` | `any[]` | No |  |
| `legacy_id` | `string` | No |  |
| `link` | `string` | No |  |
| `longitude` | `number` | No |  |
| `mass_kg` | `number` | No |  |
| `mass_lb` | `number` | No |  |
| `mmsi` | `number` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `role` | `any[]` | No |  |
| `speed_kn` | `number` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `year_built` | `number` | No |  |

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
| `height_km` | `number` | No |  |
| `id` | `string` | No |  |
| `latitude` | `number` | No |  |
| `launch` | `string` | No |  |
| `longitude` | `number` | No |  |
| `space_track` | `Record<string, any>` | No |  |
| `velocity_km` | `number` | No |  |
| `version` | `string` | No |  |

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

