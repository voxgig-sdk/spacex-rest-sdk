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
| `id` | `string` | No | Capsule serial number |
| `land_landings` | `number` | No | Number of land landings |
| `last_update` | `string` | No | Last update about the capsule |
| `launches` | `any[]` | No | Launch IDs |
| `reuse_count` | `number` | No | Number of times capsule has been reused |
| `serial` | `string` | No | Capsule serial number |
| `status` | `string` | No | Capsule status |
| `type` | `string` | No | Capsule type |
| `water_landings` | `number` | No | Number of water landings |

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
| `asds_attempts` | `number` | No | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `number` | No | Number of successful ASDS landings |
| `block` | `number` | No | Core block number |
| `id` | `string` | No | Core serial number |
| `last_update` | `string` | No | Last update about the core |
| `launches` | `any[]` | No | Launch IDs |
| `reuse_count` | `number` | No | Number of times core has been reused |
| `rtls_attempts` | `number` | No | Number of return to launch site attempts |
| `rtls_landings` | `number` | No | Number of successful RTLS landings |
| `serial` | `string` | No | Core serial number |
| `status` | `string` | No | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | No | Agency |
| `id` | `string` | No | Crew member ID |
| `image` | `string` | No | Image URL |
| `launches` | `any[]` | No | Launch IDs |
| `name` | `string` | No | Crew member name |
| `status` | `string` | No | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `details` | `string` | No | Landing pad details |
| `full_name` | `string` | No | Full landing pad name |
| `id` | `string` | No | Landing pad ID |
| `landing_attempts` | `number` | No | Number of landing attempts |
| `landing_successes` | `number` | No | Number of successful landings |
| `latitude` | `number` | No | Latitude |
| `launches` | `any[]` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `number` | No | Longitude |
| `name` | `string` | No | Landing pad name |
| `region` | `string` | No | Region |
| `status` | `string` | No | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | No | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `auto_update` | `boolean` | No | Whether the launch data is automatically updated |
| `capsules` | `any[]` | No | Capsule IDs |
| `core` | `string` | No | Core ID |
| `cores` | `any[]` | No |  |
| `crew` | `any[]` | No | Crew member IDs |
| `date_local` | `string` | No | Launch date in local time |
| `date_precision` | `string` | No | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `number` | No | Launch date in unix timestamp |
| `date_utc` | `string` | No | Launch date in UTC |
| `details` | `string` | No | Launch details |
| `failures` | `any[]` | No | Launch failures |
| `fairings` | `Record<string, any>` | No |  |
| `flight` | `number` | No | Core flight number |
| `flight_number` | `number` | No | Flight number |
| `gridfins` | `boolean` | No | Whether core has grid fins |
| `id` | `string` | No | Launch ID |
| `landing_attempt` | `boolean` | No | Whether landing was attempted |
| `landing_success` | `boolean` | No | Whether landing was successful |
| `landing_type` | `string` | No | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | No | Landing pad ID |
| `launchpad` | `string` | No | Launchpad ID |
| `legs` | `boolean` | No | Whether core has legs |
| `links` | `Record<string, any>` | No |  |
| `name` | `string` | No | Launch name |
| `net` | `boolean` | No | No earlier than |
| `payloads` | `any[]` | No | Payload IDs |
| `reused` | `boolean` | No | Whether core was reused |
| `rocket` | `string` | No | Rocket ID |
| `ships` | `any[]` | No | Ship IDs |
| `static_fire_date_unix` | `number` | No | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | No | Static fire date in UTC |
| `success` | `boolean` | No | Launch success status |
| `tdb` | `boolean` | No | To be determined |
| `upcoming` | `boolean` | No | Whether the launch is upcoming |
| `window` | `number` | No | Launch window in seconds |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `latest` | `/launches/latest` | `client.Launch().list({ $action: 'latest', ... })` |
| `past` | `/launches/past` | `client.Launch().list({ $action: 'past', ... })` |
| `upcoming` | `/launches/upcoming` | `client.Launch().list({ $action: 'upcoming', ... })` |

An action returns that action's OWN response, which is not necessarily a
Launch record — check the API definition for its shape.

```ts
const result = await client.Launch().list({
  $action: 'latest',
  /* ...the action's own arguments */
})
```

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
| `details` | `string` | No | Launchpad details |
| `full_name` | `string` | No | Full launchpad name |
| `id` | `string` | No | Launchpad ID |
| `latitude` | `number` | No | Latitude |
| `launch_attempts` | `number` | No | Number of launch attempts |
| `launch_successes` | `number` | No | Number of successful launches |
| `launches` | `any[]` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `number` | No | Longitude |
| `name` | `string` | No | Launchpad name |
| `region` | `string` | No | Region |
| `rockets` | `any[]` | No | Rocket IDs |
| `status` | `string` | No | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `number` | No | Apoapsis in km |
| `arg_of_pericenter` | `number` | No | Argument of pericenter |
| `customers` | `any[]` | No | Customers |
| `eccentricity` | `number` | No | Eccentricity |
| `epoch` | `string` | No | Epoch |
| `id` | `string` | No | Payload ID |
| `inclination_deg` | `number` | No | Inclination in degrees |
| `launch` | `string` | No | Launch ID |
| `lifespan_years` | `number` | No | Lifespan in years |
| `longitude` | `number` | No | Longitude |
| `manufacturers` | `any[]` | No | Manufacturers |
| `mass_kg` | `number` | No | Payload mass in kilograms |
| `mass_lbs` | `number` | No | Payload mass in pounds |
| `mean_anomaly` | `number` | No | Mean anomaly |
| `mean_motion` | `number` | No | Mean motion |
| `name` | `string` | No | Payload name |
| `nationalities` | `any[]` | No | Nationalities |
| `norad_ids` | `any[]` | No | NORAD IDs |
| `orbit` | `string` | No | Orbit type |
| `periapsis_km` | `number` | No | Periapsis in km |
| `period_min` | `number` | No | Orbital period in minutes |
| `raan` | `number` | No | Right ascension of the ascending node |
| `reference_system` | `string` | No | Reference system |
| `regime` | `string` | No | Orbit regime |
| `reused` | `boolean` | No | Whether the payload was reused |
| `semi_major_axis_km` | `number` | No | Semi-major axis in km |
| `type` | `string` | No | Payload type |

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
| `apoapsis_au` | `number` | No | Apoapsis in AU |
| `details` | `string` | No | Details |
| `earth_distance_km` | `number` | No | Distance from Earth in km |
| `earth_distance_mi` | `number` | No | Distance from Earth in miles |
| `eccentricity` | `number` | No | Eccentricity |
| `epoch_jd` | `number` | No | Epoch in Julian Date |
| `flickr_images` | `any[]` | No | Flickr images |
| `id` | `string` | No | Roadster ID |
| `inclination` | `number` | No | Inclination |
| `launch_date_unix` | `number` | No | Launch date in unix timestamp |
| `launch_date_utc` | `string` | No | Launch date in UTC |
| `launch_mass_kg` | `number` | No | Launch mass in kilograms |
| `launch_mass_lbs` | `number` | No | Launch mass in pounds |
| `longitude` | `number` | No | Longitude |
| `mars_distance_km` | `number` | No | Distance from Mars in km |
| `mars_distance_mi` | `number` | No | Distance from Mars in miles |
| `name` | `string` | No | Roadster name |
| `norad_id` | `number` | No | NORAD ID |
| `orbit_type` | `string` | No | Orbit type |
| `periapsis_arg` | `number` | No | Argument of periapsis |
| `periapsis_au` | `number` | No | Periapsis in AU |
| `period_days` | `number` | No | Orbital period in days |
| `semi_major_axis_au` | `number` | No | Semi-major axis in AU |
| `speed_kph` | `number` | No | Speed in km/h |
| `speed_mph` | `number` | No | Speed in mph |
| `video` | `string` | No | Video URL |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `active` | `boolean` | No | Whether the rocket is active |
| `boosters` | `number` | No | Number of boosters |
| `company` | `string` | No | Company |
| `cost_per_launch` | `number` | No | Cost per launch in USD |
| `country` | `string` | No | Country of origin |
| `description` | `string` | No |  |
| `diameter` | `Record<string, any>` | No |  |
| `first_flight` | `string` | No | Date of first flight |
| `flickr_images` | `any[]` | No |  |
| `height` | `Record<string, any>` | No |  |
| `id` | `string` | No | Rocket ID |
| `mass` | `Record<string, any>` | No |  |
| `name` | `string` | No | Rocket name |
| `stages` | `number` | No | Number of stages |
| `success_rate_pct` | `number` | No | Success rate percentage |
| `type` | `string` | No | Rocket type |
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
| `abs` | `number` | No | ABS number |
| `class` | `number` | No | Ship class |
| `course_deg` | `number` | No | Course in degrees |
| `home_port` | `string` | No | Home port |
| `id` | `string` | No | Ship ID |
| `image` | `string` | No | Image URL |
| `imo` | `number` | No | IMO number |
| `last_ais_update` | `string` | No | Last AIS update timestamp |
| `latitude` | `number` | No | Latitude |
| `launches` | `any[]` | No | Launch IDs |
| `legacy_id` | `string` | No | Legacy ID |
| `link` | `string` | No | Link to ship info |
| `longitude` | `number` | No | Longitude |
| `mass_kg` | `number` | No | Mass in kilograms |
| `mass_lbs` | `number` | No | Mass in pounds |
| `mmsi` | `number` | No | MMSI number |
| `model` | `string` | No | Ship model |
| `name` | `string` | No | Ship name |
| `roles` | `any[]` | No | Ship roles |
| `speed_kn` | `number` | No | Speed in knots |
| `status` | `string` | No | Ship status |
| `type` | `string` | No | Ship type |
| `year_built` | `number` | No | Year built |

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
| `height_km` | `number` | No | Current height in kilometers |
| `id` | `string` | No | Starlink satellite ID |
| `latitude` | `number` | No | Current latitude |
| `launch` | `string` | No | Launch ID |
| `longitude` | `number` | No | Current longitude |
| `spaceTrack` | `Record<string, any>` | No | Space-Track.org data |
| `velocity_kms` | `number` | No | Current velocity in km/s |
| `version` | `string` | No | Satellite version |

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

