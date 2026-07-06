# SpacexRest TypeScript SDK



The TypeScript SDK for the SpacexRest API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Capsule()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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

`list()` resolves to an array of Capsule objects — iterate it directly:

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
  const capsules = await client.Capsule().list()
  console.log(capsules)
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

const capsule = await client.Capsule().list()
// capsule is a bare entity populated with mock response data
console.log(capsule)
```

You can also use the instance method:

```ts
const client = new SpacexRestSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Capsule()

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
| `id` |  |
| `land_landing` |  |
| `last_update` |  |
| `launch` |  |
| `reuse_count` |  |
| `serial` |  |
| `status` |  |
| `type` |  |
| `water_landing` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list.

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

Operations: list, load.

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

Operations: list, load.

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
| `id` | `string` |  |
| `land_landing` | `number` |  |
| `last_update` | `string` |  |
| `launch` | `any[]` |  |
| `reuse_count` | `number` |  |
| `serial` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `water_landing` | `number` |  |

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
| `asds_attempt` | `number` |  |
| `asds_landing` | `number` |  |
| `block` | `number` |  |
| `id` | `string` |  |
| `last_update` | `string` |  |
| `launch` | `any[]` |  |
| `reuse_count` | `number` |  |
| `rtls_attempt` | `number` |  |
| `rtls_landing` | `number` |  |
| `serial` | `string` |  |
| `status` | `string` |  |

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
| `agency` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `launch` | `any[]` |  |
| `name` | `string` |  |
| `status` | `string` |  |
| `wikipedia` | `string` |  |

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
| `detail` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `landing_attempt` | `number` |  |
| `landing_success` | `number` |  |
| `latitude` | `number` |  |
| `launch` | `any[]` |  |
| `locality` | `string` |  |
| `longitude` | `number` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

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
| `auto_update` | `boolean` |  |
| `capsule` | `any[]` |  |
| `core` | `any[]` |  |
| `crew` | `any[]` |  |
| `date_local` | `string` |  |
| `date_precision` | `string` |  |
| `date_unix` | `number` |  |
| `date_utc` | `string` |  |
| `detail` | `string` |  |
| `failure` | `any[]` |  |
| `fairing` | `Record<string, any>` |  |
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
| `link` | `Record<string, any>` |  |
| `name` | `string` |  |
| `net` | `boolean` |  |
| `payload` | `any[]` |  |
| `reused` | `boolean` |  |
| `rocket` | `string` |  |
| `ship` | `any[]` |  |
| `static_fire_date_unix` | `number` |  |
| `static_fire_date_utc` | `string` |  |
| `success` | `boolean` |  |
| `tdb` | `boolean` |  |
| `upcoming` | `boolean` |  |
| `window` | `number` |  |

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
| `detail` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `any[]` |  |
| `launch_attempt` | `number` |  |
| `launch_success` | `number` |  |
| `locality` | `string` |  |
| `longitude` | `number` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `rocket` | `any[]` |  |
| `status` | `string` |  |

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
| `apoapsis_km` | `number` |  |
| `arg_of_pericenter` | `number` |  |
| `customer` | `any[]` |  |
| `eccentricity` | `number` |  |
| `epoch` | `string` |  |
| `id` | `string` |  |
| `inclination_deg` | `number` |  |
| `launch` | `string` |  |
| `lifespan_year` | `number` |  |
| `longitude` | `number` |  |
| `manufacturer` | `any[]` |  |
| `mass_kg` | `number` |  |
| `mass_lb` | `number` |  |
| `mean_anomaly` | `number` |  |
| `mean_motion` | `number` |  |
| `name` | `string` |  |
| `nationality` | `any[]` |  |
| `norad_id` | `any[]` |  |
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
| `apoapsis_au` | `number` |  |
| `detail` | `string` |  |
| `earth_distance_km` | `number` |  |
| `earth_distance_mi` | `number` |  |
| `eccentricity` | `number` |  |
| `epoch_jd` | `number` |  |
| `flickr_image` | `any[]` |  |
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
| `active` | `boolean` |  |
| `booster` | `number` |  |
| `company` | `string` |  |
| `cost_per_launch` | `number` |  |
| `country` | `string` |  |
| `description` | `string` |  |
| `diameter` | `Record<string, any>` |  |
| `first_flight` | `string` |  |
| `flickr_image` | `any[]` |  |
| `height` | `Record<string, any>` |  |
| `id` | `string` |  |
| `mass` | `Record<string, any>` |  |
| `name` | `string` |  |
| `stage` | `number` |  |
| `success_rate_pct` | `number` |  |
| `type` | `string` |  |
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
| `abs` | `number` |  |
| `class` | `number` |  |
| `course_deg` | `number` |  |
| `home_port` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `imo` | `number` |  |
| `last_ais_update` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `any[]` |  |
| `legacy_id` | `string` |  |
| `link` | `string` |  |
| `longitude` | `number` |  |
| `mass_kg` | `number` |  |
| `mass_lb` | `number` |  |
| `mmsi` | `number` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `role` | `any[]` |  |
| `speed_kn` | `number` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `year_built` | `number` |  |

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
| `height_km` | `number` |  |
| `id` | `string` |  |
| `latitude` | `number` |  |
| `launch` | `string` |  |
| `longitude` | `number` |  |
| `space_track` | `Record<string, any>` |  |
| `velocity_km` | `number` |  |
| `version` | `string` |  |

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
const capsule = client.Capsule()
await capsule.list()

// capsule.data() now returns the capsule data from the last `list`
// capsule.match() returns the last match criteria
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
