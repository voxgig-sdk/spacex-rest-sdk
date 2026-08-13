# SpacexRest PHP SDK



The PHP SDK for the SpacexRest API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Capsule()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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
        echo $item["id"] . " " . $item["land_landings"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a capsule

```php
try {
    // load() returns the ENTITY — call data_get() for the Capsule record (throws on error).
    $capsule = $client->Capsule()->load(["id" => "example_id"]);
    print_r($capsule);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $landpads = $client->Landpad()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    "entity" => ["landpad" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$landpad = $client->Landpad()->list();
print_r($landpad);
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
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `land_landings` |  |
| `last_update` |  |
| `launches` |  |
| `reuse_count` |  |
| `serial` |  |
| `status` |  |
| `type` |  |
| `water_landings` |  |

Operations: List, Load.

API path: `/capsules`

#### Core

| Field | Description |
| --- | --- |
| `asds_attempts` |  |
| `asds_landings` |  |
| `block` |  |
| `id` |  |
| `last_update` |  |
| `launches` |  |
| `reuse_count` |  |
| `rtls_attempts` |  |
| `rtls_landings` |  |
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
| `launches` |  |
| `name` |  |
| `status` |  |
| `wikipedia` |  |

Operations: List, Load.

API path: `/crew`

#### Landpad

| Field | Description |
| --- | --- |
| `details` |  |
| `full_name` |  |
| `id` |  |
| `landing_attempts` |  |
| `landing_successes` |  |
| `latitude` |  |
| `launches` |  |
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
| `capsules` |  |
| `core` |  |
| `cores` |  |
| `crew` |  |
| `date_local` |  |
| `date_precision` |  |
| `date_unix` |  |
| `date_utc` |  |
| `details` |  |
| `failures` |  |
| `fairings` |  |
| `flight` |  |
| `flight_number` |  |
| `gridfins` |  |
| `id` |  |
| `landing_attempt` |  |
| `landing_success` |  |
| `landing_type` |  |
| `landpad` |  |
| `launchpad` |  |
| `legs` |  |
| `links` |  |
| `name` |  |
| `net` |  |
| `payloads` |  |
| `reused` |  |
| `rocket` |  |
| `ships` |  |
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
| `details` |  |
| `full_name` |  |
| `id` |  |
| `latitude` |  |
| `launch_attempts` |  |
| `launch_successes` |  |
| `launches` |  |
| `locality` |  |
| `longitude` |  |
| `name` |  |
| `region` |  |
| `rockets` |  |
| `status` |  |

Operations: List, Load.

API path: `/launchpads`

#### Payload

| Field | Description |
| --- | --- |
| `apoapsis_km` |  |
| `arg_of_pericenter` |  |
| `customers` |  |
| `eccentricity` |  |
| `epoch` |  |
| `id` |  |
| `inclination_deg` |  |
| `launch` |  |
| `lifespan_years` |  |
| `longitude` |  |
| `manufacturers` |  |
| `mass_kg` |  |
| `mass_lbs` |  |
| `mean_anomaly` |  |
| `mean_motion` |  |
| `name` |  |
| `nationalities` |  |
| `norad_ids` |  |
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
| `details` |  |
| `earth_distance_km` |  |
| `earth_distance_mi` |  |
| `eccentricity` |  |
| `epoch_jd` |  |
| `flickr_images` |  |
| `id` |  |
| `inclination` |  |
| `launch_date_unix` |  |
| `launch_date_utc` |  |
| `launch_mass_kg` |  |
| `launch_mass_lbs` |  |
| `longitude` |  |
| `mars_distance_km` |  |
| `mars_distance_mi` |  |
| `name` |  |
| `norad_id` |  |
| `orbit_type` |  |
| `periapsis_arg` |  |
| `periapsis_au` |  |
| `period_days` |  |
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
| `boosters` |  |
| `company` |  |
| `cost_per_launch` |  |
| `country` |  |
| `description` |  |
| `diameter` |  |
| `first_flight` |  |
| `flickr_images` |  |
| `height` |  |
| `id` |  |
| `mass` |  |
| `name` |  |
| `stages` |  |
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
| `launches` |  |
| `legacy_id` |  |
| `link` |  |
| `longitude` |  |
| `mass_kg` |  |
| `mass_lbs` |  |
| `mmsi` |  |
| `model` |  |
| `name` |  |
| `roles` |  |
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
| `spaceTrack` |  |
| `velocity_kms` |  |
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
| `id` | `string` |  |
| `land_landings` | `int` |  |
| `last_update` | `string` |  |
| `launches` | `array` |  |
| `reuse_count` | `int` |  |
| `serial` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `water_landings` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Capsule record (throws on error).
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
| `asds_attempts` | `int` |  |
| `asds_landings` | `int` |  |
| `block` | `int` |  |
| `id` | `string` |  |
| `last_update` | `string` |  |
| `launches` | `array` |  |
| `reuse_count` | `int` |  |
| `rtls_attempts` | `int` |  |
| `rtls_landings` | `int` |  |
| `serial` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Core record (throws on error).
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
| `agency` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `launches` | `array` |  |
| `name` | `string` |  |
| `status` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Crew record (throws on error).
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
| `details` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `landing_attempts` | `int` |  |
| `landing_successes` | `int` |  |
| `latitude` | `float` |  |
| `launches` | `array` |  |
| `locality` | `string` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Landpad record (throws on error).
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
| `auto_update` | `bool` |  |
| `capsules` | `array` |  |
| `core` | `string` |  |
| `cores` | `array` |  |
| `crew` | `array` |  |
| `date_local` | `string` |  |
| `date_precision` | `string` |  |
| `date_unix` | `int` |  |
| `date_utc` | `string` |  |
| `details` | `string` |  |
| `failures` | `array` |  |
| `fairings` | `array` |  |
| `flight` | `int` |  |
| `flight_number` | `int` |  |
| `gridfins` | `bool` |  |
| `id` | `string` |  |
| `landing_attempt` | `bool` |  |
| `landing_success` | `bool` |  |
| `landing_type` | `string` |  |
| `landpad` | `string` |  |
| `launchpad` | `string` |  |
| `legs` | `bool` |  |
| `links` | `array` |  |
| `name` | `string` |  |
| `net` | `bool` |  |
| `payloads` | `array` |  |
| `reused` | `bool` |  |
| `rocket` | `string` |  |
| `ships` | `array` |  |
| `static_fire_date_unix` | `int` |  |
| `static_fire_date_utc` | `string` |  |
| `success` | `bool` |  |
| `tdb` | `bool` |  |
| `upcoming` | `bool` |  |
| `window` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Launch record (throws on error).
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
| `details` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `latitude` | `float` |  |
| `launch_attempts` | `int` |  |
| `launch_successes` | `int` |  |
| `launches` | `array` |  |
| `locality` | `string` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `region` | `string` |  |
| `rockets` | `array` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Launchpad record (throws on error).
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
| `apoapsis_km` | `float` |  |
| `arg_of_pericenter` | `float` |  |
| `customers` | `array` |  |
| `eccentricity` | `float` |  |
| `epoch` | `string` |  |
| `id` | `string` |  |
| `inclination_deg` | `float` |  |
| `launch` | `string` |  |
| `lifespan_years` | `float` |  |
| `longitude` | `float` |  |
| `manufacturers` | `array` |  |
| `mass_kg` | `float` |  |
| `mass_lbs` | `float` |  |
| `mean_anomaly` | `float` |  |
| `mean_motion` | `float` |  |
| `name` | `string` |  |
| `nationalities` | `array` |  |
| `norad_ids` | `array` |  |
| `orbit` | `string` |  |
| `periapsis_km` | `float` |  |
| `period_min` | `float` |  |
| `raan` | `float` |  |
| `reference_system` | `string` |  |
| `regime` | `string` |  |
| `reused` | `bool` |  |
| `semi_major_axis_km` | `float` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Payload record (throws on error).
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
| `apoapsis_au` | `float` |  |
| `details` | `string` |  |
| `earth_distance_km` | `float` |  |
| `earth_distance_mi` | `float` |  |
| `eccentricity` | `float` |  |
| `epoch_jd` | `float` |  |
| `flickr_images` | `array` |  |
| `id` | `string` |  |
| `inclination` | `float` |  |
| `launch_date_unix` | `int` |  |
| `launch_date_utc` | `string` |  |
| `launch_mass_kg` | `int` |  |
| `launch_mass_lbs` | `int` |  |
| `longitude` | `float` |  |
| `mars_distance_km` | `float` |  |
| `mars_distance_mi` | `float` |  |
| `name` | `string` |  |
| `norad_id` | `int` |  |
| `orbit_type` | `string` |  |
| `periapsis_arg` | `float` |  |
| `periapsis_au` | `float` |  |
| `period_days` | `float` |  |
| `semi_major_axis_au` | `float` |  |
| `speed_kph` | `float` |  |
| `speed_mph` | `float` |  |
| `video` | `string` |  |
| `wikipedia` | `string` |  |

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
| `active` | `bool` |  |
| `boosters` | `int` |  |
| `company` | `string` |  |
| `cost_per_launch` | `int` |  |
| `country` | `string` |  |
| `description` | `string` |  |
| `diameter` | `array` |  |
| `first_flight` | `string` |  |
| `flickr_images` | `array` |  |
| `height` | `array` |  |
| `id` | `string` |  |
| `mass` | `array` |  |
| `name` | `string` |  |
| `stages` | `int` |  |
| `success_rate_pct` | `float` |  |
| `type` | `string` |  |
| `wikipedia` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Rocket record (throws on error).
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
| `abs` | `int` |  |
| `class` | `int` |  |
| `course_deg` | `float` |  |
| `home_port` | `string` |  |
| `id` | `string` |  |
| `image` | `string` |  |
| `imo` | `int` |  |
| `last_ais_update` | `string` |  |
| `latitude` | `float` |  |
| `launches` | `array` |  |
| `legacy_id` | `string` |  |
| `link` | `string` |  |
| `longitude` | `float` |  |
| `mass_kg` | `int` |  |
| `mass_lbs` | `int` |  |
| `mmsi` | `int` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `roles` | `array` |  |
| `speed_kn` | `float` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `year_built` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Ship record (throws on error).
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
| `height_km` | `float` |  |
| `id` | `string` |  |
| `latitude` | `float` |  |
| `launch` | `string` |  |
| `longitude` | `float` |  |
| `spaceTrack` | `array` |  |
| `velocity_kms` | `float` |  |
| `version` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Starlink record (throws on error).
$starlink = $client->Starlink()->load(["id" => "starlink_id"]);
```

#### Example: List

```php
// list() returns an array of Starlink records (throws on error).
$starlinks = $client->Starlink()->list();
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$landpad = $client->Landpad();
$landpad->list();

// $landpad->data_get() now returns the landpad data from the last list
// $landpad->match_get() returns the last match criteria
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
