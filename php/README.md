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
| `id` | Capsule serial number |
| `land_landings` | Number of land landings |
| `last_update` | Last update about the capsule |
| `launches` | Launch IDs |
| `reuse_count` | Number of times capsule has been reused |
| `serial` | Capsule serial number |
| `status` | Capsule status |
| `type` | Capsule type |
| `water_landings` | Number of water landings |

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List.

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

Operations: List, Load.

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

Operations: List, Load.

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
| `id` | `string` | Capsule serial number |
| `land_landings` | `int` | Number of land landings |
| `last_update` | `string` | Last update about the capsule |
| `launches` | `array` | Launch IDs |
| `reuse_count` | `int` | Number of times capsule has been reused |
| `serial` | `string` | Capsule serial number |
| `status` | `string` | Capsule status |
| `type` | `string` | Capsule type |
| `water_landings` | `int` | Number of water landings |

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
| `asds_attempts` | `int` | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `int` | Number of successful ASDS landings |
| `block` | `int` | Core block number |
| `id` | `string` | Core serial number |
| `last_update` | `string` | Last update about the core |
| `launches` | `array` | Launch IDs |
| `reuse_count` | `int` | Number of times core has been reused |
| `rtls_attempts` | `int` | Number of return to launch site attempts |
| `rtls_landings` | `int` | Number of successful RTLS landings |
| `serial` | `string` | Core serial number |
| `status` | `string` | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | Agency |
| `id` | `string` | Crew member ID |
| `image` | `string` | Image URL |
| `launches` | `array` | Launch IDs |
| `name` | `string` | Crew member name |
| `status` | `string` | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `details` | `string` | Landing pad details |
| `full_name` | `string` | Full landing pad name |
| `id` | `string` | Landing pad ID |
| `landing_attempts` | `int` | Number of landing attempts |
| `landing_successes` | `int` | Number of successful landings |
| `latitude` | `float` | Latitude |
| `launches` | `array` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `float` | Longitude |
| `name` | `string` | Landing pad name |
| `region` | `string` | Region |
| `status` | `string` | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | Wikipedia URL |

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
| `auto_update` | `bool` | Whether the launch data is automatically updated |
| `capsules` | `array` | Capsule IDs |
| `core` | `string` | Core ID |
| `cores` | `array` |  |
| `crew` | `array` | Crew member IDs |
| `date_local` | `string` | Launch date in local time |
| `date_precision` | `string` | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `int` | Launch date in unix timestamp |
| `date_utc` | `string` | Launch date in UTC |
| `details` | `string` | Launch details |
| `failures` | `array` | Launch failures |
| `fairings` | `array` |  |
| `flight` | `int` | Core flight number |
| `flight_number` | `int` | Flight number |
| `gridfins` | `bool` | Whether core has grid fins |
| `id` | `string` | Launch ID |
| `landing_attempt` | `bool` | Whether landing was attempted |
| `landing_success` | `bool` | Whether landing was successful |
| `landing_type` | `string` | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | Landing pad ID |
| `launchpad` | `string` | Launchpad ID |
| `legs` | `bool` | Whether core has legs |
| `links` | `array` |  |
| `name` | `string` | Launch name |
| `net` | `bool` | No earlier than |
| `payloads` | `array` | Payload IDs |
| `reused` | `bool` | Whether core was reused |
| `rocket` | `string` | Rocket ID |
| `ships` | `array` | Ship IDs |
| `static_fire_date_unix` | `int` | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | Static fire date in UTC |
| `success` | `bool` | Launch success status |
| `tdb` | `bool` | To be determined |
| `upcoming` | `bool` | Whether the launch is upcoming |
| `window` | `int` | Launch window in seconds |

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
| `details` | `string` | Launchpad details |
| `full_name` | `string` | Full launchpad name |
| `id` | `string` | Launchpad ID |
| `latitude` | `float` | Latitude |
| `launch_attempts` | `int` | Number of launch attempts |
| `launch_successes` | `int` | Number of successful launches |
| `launches` | `array` | Launch IDs |
| `locality` | `string` | Locality |
| `longitude` | `float` | Longitude |
| `name` | `string` | Launchpad name |
| `region` | `string` | Region |
| `rockets` | `array` | Rocket IDs |
| `status` | `string` | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `float` | Apoapsis in km |
| `arg_of_pericenter` | `float` | Argument of pericenter |
| `customers` | `array` | Customers |
| `eccentricity` | `float` | Eccentricity |
| `epoch` | `string` | Epoch |
| `id` | `string` | Payload ID |
| `inclination_deg` | `float` | Inclination in degrees |
| `launch` | `string` | Launch ID |
| `lifespan_years` | `float` | Lifespan in years |
| `longitude` | `float` | Longitude |
| `manufacturers` | `array` | Manufacturers |
| `mass_kg` | `float` | Payload mass in kilograms |
| `mass_lbs` | `float` | Payload mass in pounds |
| `mean_anomaly` | `float` | Mean anomaly |
| `mean_motion` | `float` | Mean motion |
| `name` | `string` | Payload name |
| `nationalities` | `array` | Nationalities |
| `norad_ids` | `array` | NORAD IDs |
| `orbit` | `string` | Orbit type |
| `periapsis_km` | `float` | Periapsis in km |
| `period_min` | `float` | Orbital period in minutes |
| `raan` | `float` | Right ascension of the ascending node |
| `reference_system` | `string` | Reference system |
| `regime` | `string` | Orbit regime |
| `reused` | `bool` | Whether the payload was reused |
| `semi_major_axis_km` | `float` | Semi-major axis in km |
| `type` | `string` | Payload type |

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
| `apoapsis_au` | `float` | Apoapsis in AU |
| `details` | `string` | Details |
| `earth_distance_km` | `float` | Distance from Earth in km |
| `earth_distance_mi` | `float` | Distance from Earth in miles |
| `eccentricity` | `float` | Eccentricity |
| `epoch_jd` | `float` | Epoch in Julian Date |
| `flickr_images` | `array` | Flickr images |
| `id` | `string` | Roadster ID |
| `inclination` | `float` | Inclination |
| `launch_date_unix` | `int` | Launch date in unix timestamp |
| `launch_date_utc` | `string` | Launch date in UTC |
| `launch_mass_kg` | `int` | Launch mass in kilograms |
| `launch_mass_lbs` | `int` | Launch mass in pounds |
| `longitude` | `float` | Longitude |
| `mars_distance_km` | `float` | Distance from Mars in km |
| `mars_distance_mi` | `float` | Distance from Mars in miles |
| `name` | `string` | Roadster name |
| `norad_id` | `int` | NORAD ID |
| `orbit_type` | `string` | Orbit type |
| `periapsis_arg` | `float` | Argument of periapsis |
| `periapsis_au` | `float` | Periapsis in AU |
| `period_days` | `float` | Orbital period in days |
| `semi_major_axis_au` | `float` | Semi-major axis in AU |
| `speed_kph` | `float` | Speed in km/h |
| `speed_mph` | `float` | Speed in mph |
| `video` | `string` | Video URL |
| `wikipedia` | `string` | Wikipedia URL |

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
| `active` | `bool` | Whether the rocket is active |
| `boosters` | `int` | Number of boosters |
| `company` | `string` | Company |
| `cost_per_launch` | `int` | Cost per launch in USD |
| `country` | `string` | Country of origin |
| `description` | `string` |  |
| `diameter` | `array` |  |
| `first_flight` | `string` | Date of first flight |
| `flickr_images` | `array` |  |
| `height` | `array` |  |
| `id` | `string` | Rocket ID |
| `mass` | `array` |  |
| `name` | `string` | Rocket name |
| `stages` | `int` | Number of stages |
| `success_rate_pct` | `float` | Success rate percentage |
| `type` | `string` | Rocket type |
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
| `abs` | `int` | ABS number |
| `class` | `int` | Ship class |
| `course_deg` | `float` | Course in degrees |
| `home_port` | `string` | Home port |
| `id` | `string` | Ship ID |
| `image` | `string` | Image URL |
| `imo` | `int` | IMO number |
| `last_ais_update` | `string` | Last AIS update timestamp |
| `latitude` | `float` | Latitude |
| `launches` | `array` | Launch IDs |
| `legacy_id` | `string` | Legacy ID |
| `link` | `string` | Link to ship info |
| `longitude` | `float` | Longitude |
| `mass_kg` | `int` | Mass in kilograms |
| `mass_lbs` | `int` | Mass in pounds |
| `mmsi` | `int` | MMSI number |
| `model` | `string` | Ship model |
| `name` | `string` | Ship name |
| `roles` | `array` | Ship roles |
| `speed_kn` | `float` | Speed in knots |
| `status` | `string` | Ship status |
| `type` | `string` | Ship type |
| `year_built` | `int` | Year built |

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
| `height_km` | `float` | Current height in kilometers |
| `id` | `string` | Starlink satellite ID |
| `latitude` | `float` | Current latitude |
| `launch` | `string` | Launch ID |
| `longitude` | `float` | Current longitude |
| `spaceTrack` | `array` | Space-Track.org data |
| `velocity_kms` | `float` | Current velocity in km/s |
| `version` | `string` | Satellite version |

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
