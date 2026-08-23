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
| `id` | `string` | No | Capsule serial number |
| `land_landings` | `int` | No | Number of land landings |
| `last_update` | `string` | No | Last update about the capsule |
| `launches` | `array` | No | Launch IDs |
| `reuse_count` | `int` | No | Number of times capsule has been reused |
| `serial` | `string` | No | Capsule serial number |
| `status` | `string` | No | Capsule status |
| `type` | `string` | No | Capsule type |
| `water_landings` | `int` | No | Number of water landings |

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
| `asds_attempts` | `int` | No | Number of autonomous spaceport drone ship landing attempts |
| `asds_landings` | `int` | No | Number of successful ASDS landings |
| `block` | `int` | No | Core block number |
| `id` | `string` | No | Core serial number |
| `last_update` | `string` | No | Last update about the core |
| `launches` | `array` | No | Launch IDs |
| `reuse_count` | `int` | No | Number of times core has been reused |
| `rtls_attempts` | `int` | No | Number of return to launch site attempts |
| `rtls_landings` | `int` | No | Number of successful RTLS landings |
| `serial` | `string` | No | Core serial number |
| `status` | `string` | No | Core status (active, inactive, unknown, expended, lost, retired) |

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
| `agency` | `string` | No | Agency |
| `id` | `string` | No | Crew member ID |
| `image` | `string` | No | Image URL |
| `launches` | `array` | No | Launch IDs |
| `name` | `string` | No | Crew member name |
| `status` | `string` | No | Status (active, inactive, retired, unknown) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `details` | `string` | No | Landing pad details |
| `full_name` | `string` | No | Full landing pad name |
| `id` | `string` | No | Landing pad ID |
| `landing_attempts` | `int` | No | Number of landing attempts |
| `landing_successes` | `int` | No | Number of successful landings |
| `latitude` | `float` | No | Latitude |
| `launches` | `array` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `float` | No | Longitude |
| `name` | `string` | No | Landing pad name |
| `region` | `string` | No | Region |
| `status` | `string` | No | Landing pad status (active, inactive, unknown, retired, lost, under construction) |
| `type` | `string` | No | Landing pad type (ASDS, RTLS) |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `auto_update` | `bool` | No | Whether the launch data is automatically updated |
| `capsules` | `array` | No | Capsule IDs |
| `core` | `string` | No | Core ID |
| `cores` | `array` | No |  |
| `crew` | `array` | No | Crew member IDs |
| `date_local` | `string` | No | Launch date in local time |
| `date_precision` | `string` | No | Date precision (hour, day, month, quarter, half, year) |
| `date_unix` | `int` | No | Launch date in unix timestamp |
| `date_utc` | `string` | No | Launch date in UTC |
| `details` | `string` | No | Launch details |
| `failures` | `array` | No | Launch failures |
| `fairings` | `array` | No |  |
| `flight` | `int` | No | Core flight number |
| `flight_number` | `int` | No | Flight number |
| `gridfins` | `bool` | No | Whether core has grid fins |
| `id` | `string` | No | Launch ID |
| `landing_attempt` | `bool` | No | Whether landing was attempted |
| `landing_success` | `bool` | No | Whether landing was successful |
| `landing_type` | `string` | No | Landing type (ASDS, RTLS, Ocean) |
| `landpad` | `string` | No | Landing pad ID |
| `launchpad` | `string` | No | Launchpad ID |
| `legs` | `bool` | No | Whether core has legs |
| `links` | `array` | No |  |
| `name` | `string` | No | Launch name |
| `net` | `bool` | No | No earlier than |
| `payloads` | `array` | No | Payload IDs |
| `reused` | `bool` | No | Whether core was reused |
| `rocket` | `string` | No | Rocket ID |
| `ships` | `array` | No | Ship IDs |
| `static_fire_date_unix` | `int` | No | Static fire date in unix timestamp |
| `static_fire_date_utc` | `string` | No | Static fire date in UTC |
| `success` | `bool` | No | Launch success status |
| `tdb` | `bool` | No | To be determined |
| `upcoming` | `bool` | No | Whether the launch is upcoming |
| `window` | `int` | No | Launch window in seconds |

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
| `details` | `string` | No | Launchpad details |
| `full_name` | `string` | No | Full launchpad name |
| `id` | `string` | No | Launchpad ID |
| `latitude` | `float` | No | Latitude |
| `launch_attempts` | `int` | No | Number of launch attempts |
| `launch_successes` | `int` | No | Number of successful launches |
| `launches` | `array` | No | Launch IDs |
| `locality` | `string` | No | Locality |
| `longitude` | `float` | No | Longitude |
| `name` | `string` | No | Launchpad name |
| `region` | `string` | No | Region |
| `rockets` | `array` | No | Rocket IDs |
| `status` | `string` | No | Launchpad status (active, inactive, unknown, retired, lost, under construction) |

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
| `apoapsis_km` | `float` | No | Apoapsis in km |
| `arg_of_pericenter` | `float` | No | Argument of pericenter |
| `customers` | `array` | No | Customers |
| `eccentricity` | `float` | No | Eccentricity |
| `epoch` | `string` | No | Epoch |
| `id` | `string` | No | Payload ID |
| `inclination_deg` | `float` | No | Inclination in degrees |
| `launch` | `string` | No | Launch ID |
| `lifespan_years` | `float` | No | Lifespan in years |
| `longitude` | `float` | No | Longitude |
| `manufacturers` | `array` | No | Manufacturers |
| `mass_kg` | `float` | No | Payload mass in kilograms |
| `mass_lbs` | `float` | No | Payload mass in pounds |
| `mean_anomaly` | `float` | No | Mean anomaly |
| `mean_motion` | `float` | No | Mean motion |
| `name` | `string` | No | Payload name |
| `nationalities` | `array` | No | Nationalities |
| `norad_ids` | `array` | No | NORAD IDs |
| `orbit` | `string` | No | Orbit type |
| `periapsis_km` | `float` | No | Periapsis in km |
| `period_min` | `float` | No | Orbital period in minutes |
| `raan` | `float` | No | Right ascension of the ascending node |
| `reference_system` | `string` | No | Reference system |
| `regime` | `string` | No | Orbit regime |
| `reused` | `bool` | No | Whether the payload was reused |
| `semi_major_axis_km` | `float` | No | Semi-major axis in km |
| `type` | `string` | No | Payload type |

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
| `apoapsis_au` | `float` | No | Apoapsis in AU |
| `details` | `string` | No | Details |
| `earth_distance_km` | `float` | No | Distance from Earth in km |
| `earth_distance_mi` | `float` | No | Distance from Earth in miles |
| `eccentricity` | `float` | No | Eccentricity |
| `epoch_jd` | `float` | No | Epoch in Julian Date |
| `flickr_images` | `array` | No | Flickr images |
| `id` | `string` | No | Roadster ID |
| `inclination` | `float` | No | Inclination |
| `launch_date_unix` | `int` | No | Launch date in unix timestamp |
| `launch_date_utc` | `string` | No | Launch date in UTC |
| `launch_mass_kg` | `int` | No | Launch mass in kilograms |
| `launch_mass_lbs` | `int` | No | Launch mass in pounds |
| `longitude` | `float` | No | Longitude |
| `mars_distance_km` | `float` | No | Distance from Mars in km |
| `mars_distance_mi` | `float` | No | Distance from Mars in miles |
| `name` | `string` | No | Roadster name |
| `norad_id` | `int` | No | NORAD ID |
| `orbit_type` | `string` | No | Orbit type |
| `periapsis_arg` | `float` | No | Argument of periapsis |
| `periapsis_au` | `float` | No | Periapsis in AU |
| `period_days` | `float` | No | Orbital period in days |
| `semi_major_axis_au` | `float` | No | Semi-major axis in AU |
| `speed_kph` | `float` | No | Speed in km/h |
| `speed_mph` | `float` | No | Speed in mph |
| `video` | `string` | No | Video URL |
| `wikipedia` | `string` | No | Wikipedia URL |

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
| `active` | `bool` | No | Whether the rocket is active |
| `boosters` | `int` | No | Number of boosters |
| `company` | `string` | No | Company |
| `cost_per_launch` | `int` | No | Cost per launch in USD |
| `country` | `string` | No | Country of origin |
| `description` | `string` | No |  |
| `diameter` | `array` | No |  |
| `first_flight` | `string` | No | Date of first flight |
| `flickr_images` | `array` | No |  |
| `height` | `array` | No |  |
| `id` | `string` | No | Rocket ID |
| `mass` | `array` | No |  |
| `name` | `string` | No | Rocket name |
| `stages` | `int` | No | Number of stages |
| `success_rate_pct` | `float` | No | Success rate percentage |
| `type` | `string` | No | Rocket type |
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
| `abs` | `int` | No | ABS number |
| `class` | `int` | No | Ship class |
| `course_deg` | `float` | No | Course in degrees |
| `home_port` | `string` | No | Home port |
| `id` | `string` | No | Ship ID |
| `image` | `string` | No | Image URL |
| `imo` | `int` | No | IMO number |
| `last_ais_update` | `string` | No | Last AIS update timestamp |
| `latitude` | `float` | No | Latitude |
| `launches` | `array` | No | Launch IDs |
| `legacy_id` | `string` | No | Legacy ID |
| `link` | `string` | No | Link to ship info |
| `longitude` | `float` | No | Longitude |
| `mass_kg` | `int` | No | Mass in kilograms |
| `mass_lbs` | `int` | No | Mass in pounds |
| `mmsi` | `int` | No | MMSI number |
| `model` | `string` | No | Ship model |
| `name` | `string` | No | Ship name |
| `roles` | `array` | No | Ship roles |
| `speed_kn` | `float` | No | Speed in knots |
| `status` | `string` | No | Ship status |
| `type` | `string` | No | Ship type |
| `year_built` | `int` | No | Year built |

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
| `height_km` | `float` | No | Current height in kilometers |
| `id` | `string` | No | Starlink satellite ID |
| `latitude` | `float` | No | Current latitude |
| `launch` | `string` | No | Launch ID |
| `longitude` | `float` | No | Current longitude |
| `spaceTrack` | `array` | No | Space-Track.org data |
| `velocity_kms` | `float` | No | Current velocity in km/s |
| `version` | `string` | No | Satellite version |

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

