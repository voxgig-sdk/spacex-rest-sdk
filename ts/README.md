# SpacexRest TypeScript SDK

The TypeScript SDK for the SpacexRest API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install spacex-rest
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SpacexRestSDK } from 'spacex-rest'

const client = new SpacexRestSDK({
  apikey: process.env.SPACEX-REST_APIKEY,
})
```

### 2. List capsules

```ts
const result = await client.Capsule().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a capsule

```ts
const result = await client.Capsule().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new SpacexRestSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SPACEX-REST_TEST_LIVE=TRUE
SPACEX-REST_APIKEY=<your-key>
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
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SpacexRestSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `id` | ``$STRING`` |  |
| `land_landing` | ``$INTEGER`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `water_landing` | ``$INTEGER`` |  |

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
| `asds_attempt` | ``$INTEGER`` |  |
| `asds_landing` | ``$INTEGER`` |  |
| `block` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `last_update` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `reuse_count` | ``$INTEGER`` |  |
| `rtls_attempt` | ``$INTEGER`` |  |
| `rtls_landing` | ``$INTEGER`` |  |
| `serial` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |

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
| `agency` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `launch` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$INTEGER`` |  |
| `landing_success` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `auto_update` | ``$BOOLEAN`` |  |
| `capsule` | ``$ARRAY`` |  |
| `core` | ``$ARRAY`` |  |
| `crew` | ``$ARRAY`` |  |
| `date_local` | ``$STRING`` |  |
| `date_precision` | ``$STRING`` |  |
| `date_unix` | ``$INTEGER`` |  |
| `date_utc` | ``$STRING`` |  |
| `detail` | ``$STRING`` |  |
| `failure` | ``$ARRAY`` |  |
| `fairing` | ``$OBJECT`` |  |
| `flight` | ``$INTEGER`` |  |
| `flight_number` | ``$INTEGER`` |  |
| `gridfin` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `landing_attempt` | ``$BOOLEAN`` |  |
| `landing_success` | ``$BOOLEAN`` |  |
| `landing_type` | ``$STRING`` |  |
| `landpad` | ``$STRING`` |  |
| `launchpad` | ``$STRING`` |  |
| `leg` | ``$BOOLEAN`` |  |
| `link` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `net` | ``$BOOLEAN`` |  |
| `payload` | ``$ARRAY`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `rocket` | ``$STRING`` |  |
| `ship` | ``$ARRAY`` |  |
| `static_fire_date_unix` | ``$INTEGER`` |  |
| `static_fire_date_utc` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `tdb` | ``$BOOLEAN`` |  |
| `upcoming` | ``$BOOLEAN`` |  |
| `window` | ``$INTEGER`` |  |

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
| `detail` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `launch_attempt` | ``$INTEGER`` |  |
| `launch_success` | ``$INTEGER`` |  |
| `locality` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `rocket` | ``$ARRAY`` |  |
| `status` | ``$STRING`` |  |

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
| `apoapsis_km` | ``$NUMBER`` |  |
| `arg_of_pericenter` | ``$NUMBER`` |  |
| `customer` | ``$ARRAY`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `inclination_deg` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `lifespan_year` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `manufacturer` | ``$ARRAY`` |  |
| `mass_kg` | ``$NUMBER`` |  |
| `mass_lb` | ``$NUMBER`` |  |
| `mean_anomaly` | ``$NUMBER`` |  |
| `mean_motion` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `nationality` | ``$ARRAY`` |  |
| `norad_id` | ``$ARRAY`` |  |
| `orbit` | ``$STRING`` |  |
| `periapsis_km` | ``$NUMBER`` |  |
| `period_min` | ``$NUMBER`` |  |
| `raan` | ``$NUMBER`` |  |
| `reference_system` | ``$STRING`` |  |
| `regime` | ``$STRING`` |  |
| `reused` | ``$BOOLEAN`` |  |
| `semi_major_axis_km` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |

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
| `apoapsis_au` | ``$NUMBER`` |  |
| `detail` | ``$STRING`` |  |
| `earth_distance_km` | ``$NUMBER`` |  |
| `earth_distance_mi` | ``$NUMBER`` |  |
| `eccentricity` | ``$NUMBER`` |  |
| `epoch_jd` | ``$NUMBER`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `inclination` | ``$NUMBER`` |  |
| `launch_date_unix` | ``$INTEGER`` |  |
| `launch_date_utc` | ``$STRING`` |  |
| `launch_mass_kg` | ``$INTEGER`` |  |
| `launch_mass_lb` | ``$INTEGER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mars_distance_km` | ``$NUMBER`` |  |
| `mars_distance_mi` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `norad_id` | ``$INTEGER`` |  |
| `orbit_type` | ``$STRING`` |  |
| `periapsis_arg` | ``$NUMBER`` |  |
| `periapsis_au` | ``$NUMBER`` |  |
| `period_day` | ``$NUMBER`` |  |
| `semi_major_axis_au` | ``$NUMBER`` |  |
| `speed_kph` | ``$NUMBER`` |  |
| `speed_mph` | ``$NUMBER`` |  |
| `video` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `active` | ``$BOOLEAN`` |  |
| `booster` | ``$INTEGER`` |  |
| `company` | ``$STRING`` |  |
| `cost_per_launch` | ``$INTEGER`` |  |
| `country` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `diameter` | ``$OBJECT`` |  |
| `first_flight` | ``$STRING`` |  |
| `flickr_image` | ``$ARRAY`` |  |
| `height` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `mass` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `stage` | ``$INTEGER`` |  |
| `success_rate_pct` | ``$NUMBER`` |  |
| `type` | ``$STRING`` |  |
| `wikipedia` | ``$STRING`` |  |

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
| `abs` | ``$INTEGER`` |  |
| `class` | ``$INTEGER`` |  |
| `course_deg` | ``$NUMBER`` |  |
| `home_port` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `imo` | ``$INTEGER`` |  |
| `last_ais_update` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$ARRAY`` |  |
| `legacy_id` | ``$STRING`` |  |
| `link` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `mass_kg` | ``$INTEGER`` |  |
| `mass_lb` | ``$INTEGER`` |  |
| `mmsi` | ``$INTEGER`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `role` | ``$ARRAY`` |  |
| `speed_kn` | ``$NUMBER`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `year_built` | ``$INTEGER`` |  |

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
| `height_km` | ``$NUMBER`` |  |
| `id` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `launch` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `space_track` | ``$OBJECT`` |  |
| `velocity_km` | ``$NUMBER`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const starlink = await client.Starlink().load({ id: 'starlink_id' })
```

#### Example: List

```ts
const starlinks = await client.Starlink().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { SpacexRestSDK } from 'spacex-rest'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
