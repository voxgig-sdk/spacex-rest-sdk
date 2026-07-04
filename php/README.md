# SpacexRest PHP SDK



The PHP SDK for the SpacexRest API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/spacex-rest-sdk/releases](https://github.com/voxgig-sdk/spacex-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'spacexrest_sdk.php';

$client = new SpacexRestSDK();
```

### 2. List capsule records

```php
try {
    // list() returns an array of Capsule records — iterate directly.
    $capsules = $client->Capsule()->list();
    foreach ($capsules as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a capsule

```php
try {
    // load() returns the bare Capsule record (throws on error).
    $capsule = $client->Capsule()->load(["id" => "example_id"]);
    print_r($capsule);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = SpacexRestSDK::test([
    "entity" => ["capsule" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$capsule = $client->Capsule()->load(["id" => "test01"]);
print_r($capsule);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new SpacexRestSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
SPACEX_REST_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### SpacexRestSDK

```php
require_once 'spacexrest_sdk.php';
$client = new SpacexRestSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = SpacexRestSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### SpacexRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Capsule` | `($data): CapsuleEntity` | Create a Capsule entity instance. |
| `Core` | `($data): CoreEntity` | Create a Core entity instance. |
| `Crew` | `($data): CrewEntity` | Create a Crew entity instance. |
| `Landpad` | `($data): LandpadEntity` | Create a Landpad entity instance. |
| `Launch` | `($data): LaunchEntity` | Create a Launch entity instance. |
| `Launchpad` | `($data): LaunchpadEntity` | Create a Launchpad entity instance. |
| `Payload` | `($data): PayloadEntity` | Create a Payload entity instance. |
| `Roadster` | `($data): RoadsterEntity` | Create a Roadster entity instance. |
| `Rocket` | `($data): RocketEntity` | Create a Rocket entity instance. |
| `Ship` | `($data): ShipEntity` | Create a Ship entity instance. |
| `Starlink` | `($data): StarlinkEntity` | Create a Starlink entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$capsule = $client->Capsule();`

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

```php
// load() returns the bare Capsule record (throws on error).
$capsule = $client->Capsule()->load(["id" => "capsule_id"]);
```

#### Example: List

```php
// list() returns an array of Capsule records (throws on error).
$capsules = $client->Capsule()->list();
```


### Core

Create an instance: `$core = $client->Core();`

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

```php
// load() returns the bare Core record (throws on error).
$core = $client->Core()->load(["id" => "core_id"]);
```

#### Example: List

```php
// list() returns an array of Core records (throws on error).
$cores = $client->Core()->list();
```


### Crew

Create an instance: `$crew = $client->Crew();`

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

```php
// load() returns the bare Crew record (throws on error).
$crew = $client->Crew()->load(["id" => "crew_id"]);
```

#### Example: List

```php
// list() returns an array of Crew records (throws on error).
$crews = $client->Crew()->list();
```


### Landpad

Create an instance: `$landpad = $client->Landpad();`

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

```php
// load() returns the bare Landpad record (throws on error).
$landpad = $client->Landpad()->load(["id" => "landpad_id"]);
```

#### Example: List

```php
// list() returns an array of Landpad records (throws on error).
$landpads = $client->Landpad()->list();
```


### Launch

Create an instance: `$launch = $client->Launch();`

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

```php
// load() returns the bare Launch record (throws on error).
$launch = $client->Launch()->load(["id" => "launch_id"]);
```

#### Example: List

```php
// list() returns an array of Launch records (throws on error).
$launchs = $client->Launch()->list();
```


### Launchpad

Create an instance: `$launchpad = $client->Launchpad();`

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

```php
// load() returns the bare Launchpad record (throws on error).
$launchpad = $client->Launchpad()->load(["id" => "launchpad_id"]);
```

#### Example: List

```php
// list() returns an array of Launchpad records (throws on error).
$launchpads = $client->Launchpad()->list();
```


### Payload

Create an instance: `$payload = $client->Payload();`

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

```php
// load() returns the bare Payload record (throws on error).
$payload = $client->Payload()->load(["id" => "payload_id"]);
```

#### Example: List

```php
// list() returns an array of Payload records (throws on error).
$payloads = $client->Payload()->list();
```


### Roadster

Create an instance: `$roadster = $client->Roadster();`

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

```php
// list() returns an array of Roadster records (throws on error).
$roadsters = $client->Roadster()->list();
```


### Rocket

Create an instance: `$rocket = $client->Rocket();`

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

```php
// load() returns the bare Rocket record (throws on error).
$rocket = $client->Rocket()->load(["id" => "rocket_id"]);
```

#### Example: List

```php
// list() returns an array of Rocket records (throws on error).
$rockets = $client->Rocket()->list();
```


### Ship

Create an instance: `$ship = $client->Ship();`

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

```php
// load() returns the bare Ship record (throws on error).
$ship = $client->Ship()->load(["id" => "ship_id"]);
```

#### Example: List

```php
// list() returns an array of Ship records (throws on error).
$ships = $client->Ship()->list();
```


### Starlink

Create an instance: `$starlink = $client->Starlink();`

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

```php
// load() returns the bare Starlink record (throws on error).
$starlink = $client->Starlink()->load(["id" => "starlink_id"]);
```

#### Example: List

```php
// list() returns an array of Starlink records (throws on error).
$starlinks = $client->Starlink()->list();
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── spacexrest_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`spacexrest_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$capsule = $client->Capsule();
$capsule->load(["id" => "example_id"]);

// $capsule->dataGet() now returns the loaded capsule data
// $capsule->matchGet() returns the last match criteria
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
