# SpacexRest TypeScript SDK



The TypeScript SDK for the SpacexRest API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Capsule()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/spacex-rest-sdk/releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SpacexRestSDK } from '@voxgig-sdk/spacex-rest'

const client = new SpacexRestSDK()
```

### 2. List capsule records

`list()` resolves to an array of Capsule ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const capsules = await client.Capsule().list()

for (const capsule of capsules) {
  console.log(capsule)
}
```

### 3. Load a capsule

`load()` returns the entity directly and throws on failure:

```ts
try {
  const capsule = await client.Capsule().load({ id: 'example_id' })
  console.log(capsule)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const landpads = await client.Landpad().list()
  console.log(landpads)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = SpacexRestSDK.test()

const landpad = await client.Landpad().list()
// landpad is the entity, populated with mock response data
// — call landpad.data() for the record itself
console.log(landpad)
```

You can also use the instance method:

```ts
const client = new SpacexRestSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Landpad()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new SpacexRestSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SPACEX_REST_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### SpacexRestSDK

#### Constructor

```ts
new SpacexRestSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Capsule(data?)` | `CapsuleEntity` | Create a Capsule entity instance. |
| `Core(data?)` | `CoreEntity` | Create a Core entity instance. |
| `Crew(data?)` | `CrewEntity` | Create a Crew entity instance. |
| `Landpad(data?)` | `LandpadEntity` | Create a Landpad entity instance. |
| `Launch(data?)` | `LaunchEntity` | Create a Launch entity instance. |
| `Launchpad(data?)` | `LaunchpadEntity` | Create a Launchpad entity instance. |
| `Payload(data?)` | `PayloadEntity` | Create a Payload entity instance. |
| `Roadster(data?)` | `RoadsterEntity` | Create a Roadster entity instance. |
| `Rocket(data?)` | `RocketEntity` | Create a Rocket entity instance. |
| `Ship(data?)` | `ShipEntity` | Create a Ship entity instance. |
| `Starlink(data?)` | `StarlinkEntity` | Create a Starlink entity instance. |
| `tester(testopts?, sdkopts?)` | `SpacexRestSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `SpacexRestSDK.test(testopts?, sdkopts?)` | `SpacexRestSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SpacexRestSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/starlink`



## Entities


### Capsule

Create an instance: `const capsule = client.Capsule()`

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
| `launches` | `any[]` | Launch IDs |
| `reuse_count` | `number` | Number of times capsule has been reused |
| `serial` | `string` | Capsule serial number |
| `status` | `string` | Capsule status |
| `type` | `string` | Capsule type |
| `water_landings` | `number` | Number of water landings |

#### Example: Load

```ts
const capsule = await client.Capsule().load({ id: 'capsule_id' })
```

#### Example: List

```ts
const capsules = await client.Capsule().list()
```


### Core

Create an instance: `const core = client.Core()`

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
| `launches` | `any[]` | Launch IDs |
| `reuse_count` | `number` | Number of times core has been reused |
| `rtls_attempts` | `number` | Number of return to launch site attempts |
| `rtls_landings` | `number` | Number of successful RTLS landings |
| `serial` | `string` | Core serial number |
| `status` | `string` | Core status (active, inactive, unknown, expended, lost, retired) |

#### Example: Load

```ts
const core = await client.Core().load({ id: 'core_id' })
```

#### Example: List

```ts
const cores = await client.Core().list()
```


### Crew

Create an instance: `const crew = client.Crew()`

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
| `launches` | `any[]` | Launch IDs |
| `name` | `string` | Crew member name |
| `status` | `string` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | Wikipedia URL |

#### Example: Load

```ts
const crew = await client.Crew().load({ id: 'crew_id' })
```

#### Example: List

```ts
const crews = await client.Crew().list()
```


### Landpad

Create an instance: `const landpad = client.Landpad()`

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
| `launches` | `any[]` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `number` | Longitude |
| `name` | `string` | Landing pad name |
| `region` | `string` | Region |
| `status` | `string` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | Wikipedia URL |

#### Example: Load

```ts
const landpad = await client.Landpad().load({ id: 'landpad_id' })
```

#### Example: List

```ts
const landpads = await client.Landpad().list()
```


### Launch

Create an instance: `const launch = client.Launch()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_update` | `boolean` | Whether the launch data is automatically updated |
| `capsules` | `any[]` | Capsule IDs |
| `core` | `string` | Core ID |
| `cores` | `any[]` |  |
| `crew` | `any[]` | Crew member IDs |
| `date_local` | `string` | Launch date in local time |
| `date_precision` | `string` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `number` | Launch date in unix timestamp |
| `date_utc` | `string` | Launch date in UTC |
| `details` | `string` | Launch details |
| `failures` | `any[]` | Launch failures |
| `fairings` | `Record<string, any>` |  |
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
| `links` | `Record<string, any>` |  |
| `name` | `string` | Launch name |
| `net` | `boolean` | No earlier than |
| `payloads` | `any[]` | Payload IDs |
| `reused` | `boolean` | Whether core was reused |
| `rocket` | `string` | Rocket ID |
| `ships` | `any[]` | Ship IDs |
| `static_fire_date_unix` | `number` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | Static fire date in UTC |
| `success` | `boolean` | Launch success status |
| `tdb` | `boolean` | To be determined |
| `upcoming` | `boolean` | Whether the launch is upcoming |
| `window` | `number` | Launch window in seconds |

#### Example: Load

```ts
const launch = await client.Launch().load({ id: 'launch_id' })
```

#### Example: List

```ts
const launchs = await client.Launch().list()
```


### Launchpad

Create an instance: `const launchpad = client.Launchpad()`

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
| `launches` | `any[]` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `number` | Longitude |
| `name` | `string` | Launchpad name |
| `region` | `string` | Region |
| `rockets` | `any[]` | Rocket IDs |
| `status` | `string` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

#### Example: Load

```ts
const launchpad = await client.Launchpad().load({ id: 'launchpad_id' })
```

#### Example: List

```ts
const launchpads = await client.Launchpad().list()
```


### Payload

Create an instance: `const payload = client.Payload()`

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
| `customers` | `any[]` | Customers |
| `eccentricity` | `number` | Eccentricity |
| `epoch` | `string` | Epoch |
| `id` | `string` | Payload ID |
| `inclination_deg` | `number` | Inclination in degrees |
| `launch` | `string` | Launch ID |
| `lifespan_years` | `number` | Lifespan in years |
| `longitude` | `number` | Longitude |
| `manufacturers` | `any[]` | Manufacturers |
| `mass_kg` | `number` | Payload mass in kilograms |
| `mass_lbs` | `number` | Payload mass in pounds |
| `mean_anomaly` | `number` | Mean anomaly |
| `mean_motion` | `number` | Mean motion |
| `name` | `string` | Payload name |
| `nationalities` | `any[]` | Nationalities |
| `norad_ids` | `any[]` | NORAD IDs |
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

```ts
const payload = await client.Payload().load({ id: 'payload_id' })
```

#### Example: List

```ts
const payloads = await client.Payload().list()
```


### Roadster

Create an instance: `const roadster = client.Roadster()`

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
| `flickr_images` | `any[]` | Flickr images |
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

```ts
const roadsters = await client.Roadster().list()
```


### Rocket

Create an instance: `const rocket = client.Rocket()`

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
| `diameter` | `Record<string, any>` |  |
| `first_flight` | `string` | Date of first flight |
| `flickr_images` | `any[]` |  |
| `height` | `Record<string, any>` |  |
| `id` | `string` | Rocket ID |
| `mass` | `Record<string, any>` |  |
| `name` | `string` | Rocket name |
| `stages` | `number` | Number of stages |
| `success_rate_pct` | `number` | Success rate percentage |
| `type` | `string` | Rocket type |
| `wikipedia` | `string` |  |

#### Example: Load

```ts
const rocket = await client.Rocket().load({ id: 'rocket_id' })
```

#### Example: List

```ts
const rockets = await client.Rocket().list()
```


### Ship

Create an instance: `const ship = client.Ship()`

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
| `launches` | `any[]` | Launch IDs |
| `legacy_id` | `string` | Legacy ID |
| `link` | `string` | Link to ship info |
| `longitude` | `number` | Longitude |
| `mass_kg` | `number` | Mass in kilograms |
| `mass_lbs` | `number` | Mass in pounds |
| `mmsi` | `number` | MMSI number |
| `model` | `string` | Ship model |
| `name` | `string` | Ship name |
| `roles` | `any[]` | Ship roles |
| `speed_kn` | `number` | Speed in knots |
| `status` | `string` | Ship status |
| `type` | `string` | Ship type |
| `year_built` | `number` | Year built |

#### Example: Load

```ts
const ship = await client.Ship().load({ id: 'ship_id' })
```

#### Example: List

```ts
const ships = await client.Ship().list()
```


### Starlink

Create an instance: `const starlink = client.Starlink()`

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
| `spaceTrack` | `Record<string, any>` | Space-Track.org data |
| `velocity_kms` | `number` | Current velocity in km/s |
| `version` | `string` | Satellite version |

#### Example: Load

```ts
const starlink = await client.Starlink().load({ id: 'starlink_id' })
```

#### Example: List

```ts
const starlinks = await client.Starlink().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
spacex-rest/
├── src/
│   ├── SpacexRestSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { SpacexRestSDK } from '@voxgig-sdk/spacex-rest'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const landpad = client.Landpad()
await landpad.list()

// landpad.data() now returns the landpad data from the last `list`
// landpad.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
