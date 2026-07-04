# SpacexRest PHP SDK Reference

Complete API reference for the SpacexRest PHP SDK.


## SpacexRestSDK

### Constructor

```php
require_once __DIR__ . '/spacex-rest_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$capsule = $client->capsule();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->capsule()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->capsule()->load(["id" => "capsule_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CapsuleEntity`

Create a new `CapsuleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->core();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->core()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->core()->load(["id" => "core_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CrewEntity

```php
$crew = $client->crew();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->crew()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->crew()->load(["id" => "crew_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CrewEntity`

Create a new `CrewEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LandpadEntity

```php
$landpad = $client->landpad();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->landpad()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->landpad()->load(["id" => "landpad_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LandpadEntity`

Create a new `LandpadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LaunchEntity

```php
$launch = $client->launch();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->launch()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->launch()->load(["id" => "launch_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LaunchEntity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LaunchpadEntity

```php
$launchpad = $client->launchpad();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->launchpad()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->launchpad()->load(["id" => "launchpad_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LaunchpadEntity`

Create a new `LaunchpadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PayloadEntity

```php
$payload = $client->payload();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->payload()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->payload()->load(["id" => "payload_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PayloadEntity`

Create a new `PayloadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RoadsterEntity

```php
$roadster = $client->roadster();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->roadster()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RoadsterEntity`

Create a new `RoadsterEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RocketEntity

```php
$rocket = $client->rocket();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->rocket()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->rocket()->load(["id" => "rocket_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RocketEntity`

Create a new `RocketEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ShipEntity

```php
$ship = $client->ship();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->ship()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ship()->load(["id" => "ship_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ShipEntity`

Create a new `ShipEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StarlinkEntity

```php
$starlink = $client->starlink();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->starlink()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->starlink()->load(["id" => "starlink_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StarlinkEntity`

Create a new `StarlinkEntity` instance with the same client and
options.

#### `getName(): string`

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

