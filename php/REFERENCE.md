# SpacexRest PHP SDK Reference

Complete API reference for the SpacexRest PHP SDK.


## SpacexRestSDK

### Constructor

```php
require_once __DIR__ . '/spacexrest_sdk.php';

$client = new SpacexRestSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SpacexRestSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = SpacexRestSDK::test();
```


### Instance Methods

#### `Capsule($data = null)`

Create a new `CapsuleEntity` instance. Pass `null` for no initial data.

#### `Core($data = null)`

Create a new `CoreEntity` instance. Pass `null` for no initial data.

#### `Crew($data = null)`

Create a new `CrewEntity` instance. Pass `null` for no initial data.

#### `Landpad($data = null)`

Create a new `LandpadEntity` instance. Pass `null` for no initial data.

#### `Launch($data = null)`

Create a new `LaunchEntity` instance. Pass `null` for no initial data.

#### `Launchpad($data = null)`

Create a new `LaunchpadEntity` instance. Pass `null` for no initial data.

#### `Payload($data = null)`

Create a new `PayloadEntity` instance. Pass `null` for no initial data.

#### `Roadster($data = null)`

Create a new `RoadsterEntity` instance. Pass `null` for no initial data.

#### `Rocket($data = null)`

Create a new `RocketEntity` instance. Pass `null` for no initial data.

#### `Ship($data = null)`

Create a new `ShipEntity` instance. Pass `null` for no initial data.

#### `Starlink($data = null)`

Create a new `StarlinkEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): SpacexRestUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CapsuleEntity

```php
$capsule = $client->Capsule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `land_landing` | `int` | No |  |
| `last_update` | `string` | No |  |
| `launch` | `array` | No |  |
| `reuse_count` | `int` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `water_landing` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Capsule()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Capsule()->load(["id" => "capsule_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CapsuleEntity`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->Core();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asds_attempt` | `int` | No |  |
| `asds_landing` | `int` | No |  |
| `block` | `int` | No |  |
| `id` | `string` | No |  |
| `last_update` | `string` | No |  |
| `launch` | `array` | No |  |
| `reuse_count` | `int` | No |  |
| `rtls_attempt` | `int` | No |  |
| `rtls_landing` | `int` | No |  |
| `serial` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Core()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Core()->load(["id" => "core_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CrewEntity

```php
$crew = $client->Crew();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch` | `array` | No |  |
| `name` | `string` | No |  |
| `status` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Crew()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Crew()->load(["id" => "crew_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CrewEntity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LandpadEntity

```php
$landpad = $client->Landpad();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `int` | No |  |
| `landing_success` | `int` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `array` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `float` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Landpad()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Landpad()->load(["id" => "landpad_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LandpadEntity`

Create a new `LandpadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LaunchEntity

```php
$launch = $client->Launch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_update` | `bool` | No |  |
| `capsule` | `array` | No |  |
| `core` | `array` | No |  |
| `crew` | `array` | No |  |
| `date_local` | `string` | No |  |
| `date_precision` | `string` | No |  |
| `date_unix` | `int` | No |  |
| `date_utc` | `string` | No |  |
| `detail` | `string` | No |  |
| `failure` | `array` | No |  |
| `fairing` | `array` | No |  |
| `flight` | `int` | No |  |
| `flight_number` | `int` | No |  |
| `gridfin` | `bool` | No |  |
| `id` | `string` | No |  |
| `landing_attempt` | `bool` | No |  |
| `landing_success` | `bool` | No |  |
| `landing_type` | `string` | No |  |
| `landpad` | `string` | No |  |
| `launchpad` | `string` | No |  |
| `leg` | `bool` | No |  |
| `link` | `array` | No |  |
| `name` | `string` | No |  |
| `net` | `bool` | No |  |
| `payload` | `array` | No |  |
| `reused` | `bool` | No |  |
| `rocket` | `string` | No |  |
| `ship` | `array` | No |  |
| `static_fire_date_unix` | `int` | No |  |
| `static_fire_date_utc` | `string` | No |  |
| `success` | `bool` | No |  |
| `tdb` | `bool` | No |  |
| `upcoming` | `bool` | No |  |
| `window` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Launch()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Launch()->load(["id" => "launch_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LaunchEntity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LaunchpadEntity

```php
$launchpad = $client->Launchpad();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | No |  |
| `full_name` | `string` | No |  |
| `id` | `string` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `array` | No |  |
| `launch_attempt` | `int` | No |  |
| `launch_success` | `int` | No |  |
| `locality` | `string` | No |  |
| `longitude` | `float` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |
| `rocket` | `array` | No |  |
| `status` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Launchpad()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Launchpad()->load(["id" => "launchpad_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LaunchpadEntity`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PayloadEntity

```php
$payload = $client->Payload();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_km` | `float` | No |  |
| `arg_of_pericenter` | `float` | No |  |
| `customer` | `array` | No |  |
| `eccentricity` | `float` | No |  |
| `epoch` | `string` | No |  |
| `id` | `string` | No |  |
| `inclination_deg` | `float` | No |  |
| `launch` | `string` | No |  |
| `lifespan_year` | `float` | No |  |
| `longitude` | `float` | No |  |
| `manufacturer` | `array` | No |  |
| `mass_kg` | `float` | No |  |
| `mass_lb` | `float` | No |  |
| `mean_anomaly` | `float` | No |  |
| `mean_motion` | `float` | No |  |
| `name` | `string` | No |  |
| `nationality` | `array` | No |  |
| `norad_id` | `array` | No |  |
| `orbit` | `string` | No |  |
| `periapsis_km` | `float` | No |  |
| `period_min` | `float` | No |  |
| `raan` | `float` | No |  |
| `reference_system` | `string` | No |  |
| `regime` | `string` | No |  |
| `reused` | `bool` | No |  |
| `semi_major_axis_km` | `float` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Payload()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Payload()->load(["id" => "payload_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PayloadEntity`

Create a new `PayloadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RoadsterEntity

```php
$roadster = $client->Roadster();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apoapsis_au` | `float` | No |  |
| `detail` | `string` | No |  |
| `earth_distance_km` | `float` | No |  |
| `earth_distance_mi` | `float` | No |  |
| `eccentricity` | `float` | No |  |
| `epoch_jd` | `float` | No |  |
| `flickr_image` | `array` | No |  |
| `id` | `string` | No |  |
| `inclination` | `float` | No |  |
| `launch_date_unix` | `int` | No |  |
| `launch_date_utc` | `string` | No |  |
| `launch_mass_kg` | `int` | No |  |
| `launch_mass_lb` | `int` | No |  |
| `longitude` | `float` | No |  |
| `mars_distance_km` | `float` | No |  |
| `mars_distance_mi` | `float` | No |  |
| `name` | `string` | No |  |
| `norad_id` | `int` | No |  |
| `orbit_type` | `string` | No |  |
| `periapsis_arg` | `float` | No |  |
| `periapsis_au` | `float` | No |  |
| `period_day` | `float` | No |  |
| `semi_major_axis_au` | `float` | No |  |
| `speed_kph` | `float` | No |  |
| `speed_mph` | `float` | No |  |
| `video` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Roadster()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RoadsterEntity`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RocketEntity

```php
$rocket = $client->Rocket();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `booster` | `int` | No |  |
| `company` | `string` | No |  |
| `cost_per_launch` | `int` | No |  |
| `country` | `string` | No |  |
| `description` | `string` | No |  |
| `diameter` | `array` | No |  |
| `first_flight` | `string` | No |  |
| `flickr_image` | `array` | No |  |
| `height` | `array` | No |  |
| `id` | `string` | No |  |
| `mass` | `array` | No |  |
| `name` | `string` | No |  |
| `stage` | `int` | No |  |
| `success_rate_pct` | `float` | No |  |
| `type` | `string` | No |  |
| `wikipedia` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rocket()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Rocket()->load(["id" => "rocket_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RocketEntity`

Create a new `RocketEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ShipEntity

```php
$ship = $client->Ship();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abs` | `int` | No |  |
| `class` | `int` | No |  |
| `course_deg` | `float` | No |  |
| `home_port` | `string` | No |  |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `imo` | `int` | No |  |
| `last_ais_update` | `string` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `array` | No |  |
| `legacy_id` | `string` | No |  |
| `link` | `string` | No |  |
| `longitude` | `float` | No |  |
| `mass_kg` | `int` | No |  |
| `mass_lb` | `int` | No |  |
| `mmsi` | `int` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `role` | `array` | No |  |
| `speed_kn` | `float` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `year_built` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ship()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Ship()->load(["id" => "ship_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ShipEntity`

Create a new `ShipEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StarlinkEntity

```php
$starlink = $client->Starlink();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height_km` | `float` | No |  |
| `id` | `string` | No |  |
| `latitude` | `float` | No |  |
| `launch` | `string` | No |  |
| `longitude` | `float` | No |  |
| `space_track` | `array` | No |  |
| `velocity_km` | `float` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Starlink()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Starlink()->load(["id" => "starlink_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StarlinkEntity`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new SpacexRestSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

