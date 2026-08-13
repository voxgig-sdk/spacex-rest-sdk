<?php
declare(strict_types=1);

// Typed models for the SpacexRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Capsule entity data model. */
class Capsule
{
    public ?string $id = null;
    public ?int $land_landings = null;
    public ?string $last_update = null;
    public ?array $launches = null;
    public ?int $reuse_count = null;
    public ?string $serial = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?int $water_landings = null;
}

/** Request payload for Capsule#load. */
class CapsuleLoadMatch
{
    public string $id;
}

/** Request payload for Capsule#list. */
class CapsuleListMatch
{
    public ?string $id = null;
    public ?int $land_landings = null;
    public ?string $last_update = null;
    public ?array $launches = null;
    public ?int $reuse_count = null;
    public ?string $serial = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?int $water_landings = null;
}

/** Core entity data model. */
class Core
{
    public ?int $asds_attempts = null;
    public ?int $asds_landings = null;
    public ?int $block = null;
    public ?string $id = null;
    public ?string $last_update = null;
    public ?array $launches = null;
    public ?int $reuse_count = null;
    public ?int $rtls_attempts = null;
    public ?int $rtls_landings = null;
    public ?string $serial = null;
    public ?string $status = null;
}

/** Request payload for Core#load. */
class CoreLoadMatch
{
    public string $id;
}

/** Request payload for Core#list. */
class CoreListMatch
{
    public ?int $asds_attempts = null;
    public ?int $asds_landings = null;
    public ?int $block = null;
    public ?string $id = null;
    public ?string $last_update = null;
    public ?array $launches = null;
    public ?int $reuse_count = null;
    public ?int $rtls_attempts = null;
    public ?int $rtls_landings = null;
    public ?string $serial = null;
    public ?string $status = null;
}

/** Crew entity data model. */
class Crew
{
    public ?string $agency = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?array $launches = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $wikipedia = null;
}

/** Request payload for Crew#load. */
class CrewLoadMatch
{
    public string $id;
}

/** Request payload for Crew#list. */
class CrewListMatch
{
    public ?string $agency = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?array $launches = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $wikipedia = null;
}

/** Landpad entity data model. */
class Landpad
{
    public ?string $details = null;
    public ?string $full_name = null;
    public ?string $id = null;
    public ?int $landing_attempts = null;
    public ?int $landing_successes = null;
    public ?float $latitude = null;
    public ?array $launches = null;
    public ?string $locality = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?string $wikipedia = null;
}

/** Request payload for Landpad#load. */
class LandpadLoadMatch
{
    public string $id;
}

/** Request payload for Landpad#list. */
class LandpadListMatch
{
    public ?string $details = null;
    public ?string $full_name = null;
    public ?string $id = null;
    public ?int $landing_attempts = null;
    public ?int $landing_successes = null;
    public ?float $latitude = null;
    public ?array $launches = null;
    public ?string $locality = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?string $wikipedia = null;
}

/** Launch entity data model. */
class Launch
{
    public ?bool $auto_update = null;
    public ?array $capsules = null;
    public ?string $core = null;
    public ?array $cores = null;
    public ?array $crew = null;
    public ?string $date_local = null;
    public ?string $date_precision = null;
    public ?int $date_unix = null;
    public ?string $date_utc = null;
    public ?string $details = null;
    public ?array $failures = null;
    public ?array $fairings = null;
    public ?int $flight = null;
    public ?int $flight_number = null;
    public ?bool $gridfins = null;
    public ?string $id = null;
    public ?bool $landing_attempt = null;
    public ?bool $landing_success = null;
    public ?string $landing_type = null;
    public ?string $landpad = null;
    public ?string $launchpad = null;
    public ?bool $legs = null;
    public ?array $links = null;
    public ?string $name = null;
    public ?bool $net = null;
    public ?array $payloads = null;
    public ?bool $reused = null;
    public ?string $rocket = null;
    public ?array $ships = null;
    public ?int $static_fire_date_unix = null;
    public ?string $static_fire_date_utc = null;
    public ?bool $success = null;
    public ?bool $tdb = null;
    public ?bool $upcoming = null;
    public ?int $window = null;
}

/** Request payload for Launch#load. */
class LaunchLoadMatch
{
    public string $id;
}

/** Request payload for Launch#list. */
class LaunchListMatch
{
    public ?bool $auto_update = null;
    public ?array $capsules = null;
    public ?string $core = null;
    public ?array $cores = null;
    public ?array $crew = null;
    public ?string $date_local = null;
    public ?string $date_precision = null;
    public ?int $date_unix = null;
    public ?string $date_utc = null;
    public ?string $details = null;
    public ?array $failures = null;
    public ?array $fairings = null;
    public ?int $flight = null;
    public ?int $flight_number = null;
    public ?bool $gridfins = null;
    public ?string $id = null;
    public ?bool $landing_attempt = null;
    public ?bool $landing_success = null;
    public ?string $landing_type = null;
    public ?string $landpad = null;
    public ?string $launchpad = null;
    public ?bool $legs = null;
    public ?array $links = null;
    public ?string $name = null;
    public ?bool $net = null;
    public ?array $payloads = null;
    public ?bool $reused = null;
    public ?string $rocket = null;
    public ?array $ships = null;
    public ?int $static_fire_date_unix = null;
    public ?string $static_fire_date_utc = null;
    public ?bool $success = null;
    public ?bool $tdb = null;
    public ?bool $upcoming = null;
    public ?int $window = null;
}

/** Launchpad entity data model. */
class Launchpad
{
    public ?string $details = null;
    public ?string $full_name = null;
    public ?string $id = null;
    public ?float $latitude = null;
    public ?int $launch_attempts = null;
    public ?int $launch_successes = null;
    public ?array $launches = null;
    public ?string $locality = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?array $rockets = null;
    public ?string $status = null;
}

/** Request payload for Launchpad#load. */
class LaunchpadLoadMatch
{
    public string $id;
}

/** Request payload for Launchpad#list. */
class LaunchpadListMatch
{
    public ?string $details = null;
    public ?string $full_name = null;
    public ?string $id = null;
    public ?float $latitude = null;
    public ?int $launch_attempts = null;
    public ?int $launch_successes = null;
    public ?array $launches = null;
    public ?string $locality = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?array $rockets = null;
    public ?string $status = null;
}

/** Payload entity data model. */
class Payload
{
    public ?float $apoapsis_km = null;
    public ?float $arg_of_pericenter = null;
    public ?array $customers = null;
    public ?float $eccentricity = null;
    public ?string $epoch = null;
    public ?string $id = null;
    public ?float $inclination_deg = null;
    public ?string $launch = null;
    public ?float $lifespan_years = null;
    public ?float $longitude = null;
    public ?array $manufacturers = null;
    public ?float $mass_kg = null;
    public ?float $mass_lbs = null;
    public ?float $mean_anomaly = null;
    public ?float $mean_motion = null;
    public ?string $name = null;
    public ?array $nationalities = null;
    public ?array $norad_ids = null;
    public ?string $orbit = null;
    public ?float $periapsis_km = null;
    public ?float $period_min = null;
    public ?float $raan = null;
    public ?string $reference_system = null;
    public ?string $regime = null;
    public ?bool $reused = null;
    public ?float $semi_major_axis_km = null;
    public ?string $type = null;
}

/** Request payload for Payload#load. */
class PayloadLoadMatch
{
    public string $id;
}

/** Request payload for Payload#list. */
class PayloadListMatch
{
    public ?float $apoapsis_km = null;
    public ?float $arg_of_pericenter = null;
    public ?array $customers = null;
    public ?float $eccentricity = null;
    public ?string $epoch = null;
    public ?string $id = null;
    public ?float $inclination_deg = null;
    public ?string $launch = null;
    public ?float $lifespan_years = null;
    public ?float $longitude = null;
    public ?array $manufacturers = null;
    public ?float $mass_kg = null;
    public ?float $mass_lbs = null;
    public ?float $mean_anomaly = null;
    public ?float $mean_motion = null;
    public ?string $name = null;
    public ?array $nationalities = null;
    public ?array $norad_ids = null;
    public ?string $orbit = null;
    public ?float $periapsis_km = null;
    public ?float $period_min = null;
    public ?float $raan = null;
    public ?string $reference_system = null;
    public ?string $regime = null;
    public ?bool $reused = null;
    public ?float $semi_major_axis_km = null;
    public ?string $type = null;
}

/** Roadster entity data model. */
class Roadster
{
    public ?float $apoapsis_au = null;
    public ?string $details = null;
    public ?float $earth_distance_km = null;
    public ?float $earth_distance_mi = null;
    public ?float $eccentricity = null;
    public ?float $epoch_jd = null;
    public ?array $flickr_images = null;
    public ?string $id = null;
    public ?float $inclination = null;
    public ?int $launch_date_unix = null;
    public ?string $launch_date_utc = null;
    public ?int $launch_mass_kg = null;
    public ?int $launch_mass_lbs = null;
    public ?float $longitude = null;
    public ?float $mars_distance_km = null;
    public ?float $mars_distance_mi = null;
    public ?string $name = null;
    public ?int $norad_id = null;
    public ?string $orbit_type = null;
    public ?float $periapsis_arg = null;
    public ?float $periapsis_au = null;
    public ?float $period_days = null;
    public ?float $semi_major_axis_au = null;
    public ?float $speed_kph = null;
    public ?float $speed_mph = null;
    public ?string $video = null;
    public ?string $wikipedia = null;
}

/** Request payload for Roadster#list. */
class RoadsterListMatch
{
    public ?float $apoapsis_au = null;
    public ?string $details = null;
    public ?float $earth_distance_km = null;
    public ?float $earth_distance_mi = null;
    public ?float $eccentricity = null;
    public ?float $epoch_jd = null;
    public ?array $flickr_images = null;
    public ?string $id = null;
    public ?float $inclination = null;
    public ?int $launch_date_unix = null;
    public ?string $launch_date_utc = null;
    public ?int $launch_mass_kg = null;
    public ?int $launch_mass_lbs = null;
    public ?float $longitude = null;
    public ?float $mars_distance_km = null;
    public ?float $mars_distance_mi = null;
    public ?string $name = null;
    public ?int $norad_id = null;
    public ?string $orbit_type = null;
    public ?float $periapsis_arg = null;
    public ?float $periapsis_au = null;
    public ?float $period_days = null;
    public ?float $semi_major_axis_au = null;
    public ?float $speed_kph = null;
    public ?float $speed_mph = null;
    public ?string $video = null;
    public ?string $wikipedia = null;
}

/** Rocket entity data model. */
class Rocket
{
    public ?bool $active = null;
    public ?int $boosters = null;
    public ?string $company = null;
    public ?int $cost_per_launch = null;
    public ?string $country = null;
    public ?string $description = null;
    public ?array $diameter = null;
    public ?string $first_flight = null;
    public ?array $flickr_images = null;
    public ?array $height = null;
    public ?string $id = null;
    public ?array $mass = null;
    public ?string $name = null;
    public ?int $stages = null;
    public ?float $success_rate_pct = null;
    public ?string $type = null;
    public ?string $wikipedia = null;
}

/** Request payload for Rocket#load. */
class RocketLoadMatch
{
    public string $id;
}

/** Request payload for Rocket#list. */
class RocketListMatch
{
    public ?bool $active = null;
    public ?int $boosters = null;
    public ?string $company = null;
    public ?int $cost_per_launch = null;
    public ?string $country = null;
    public ?string $description = null;
    public ?array $diameter = null;
    public ?string $first_flight = null;
    public ?array $flickr_images = null;
    public ?array $height = null;
    public ?string $id = null;
    public ?array $mass = null;
    public ?string $name = null;
    public ?int $stages = null;
    public ?float $success_rate_pct = null;
    public ?string $type = null;
    public ?string $wikipedia = null;
}

/** Ship entity data model. */
class Ship
{
    public ?int $abs = null;
    public ?int $class = null;
    public ?float $course_deg = null;
    public ?string $home_port = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?int $imo = null;
    public ?string $last_ais_update = null;
    public ?float $latitude = null;
    public ?array $launches = null;
    public ?string $legacy_id = null;
    public ?string $link = null;
    public ?float $longitude = null;
    public ?int $mass_kg = null;
    public ?int $mass_lbs = null;
    public ?int $mmsi = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?array $roles = null;
    public ?float $speed_kn = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?int $year_built = null;
}

/** Request payload for Ship#load. */
class ShipLoadMatch
{
    public string $id;
}

/** Request payload for Ship#list. */
class ShipListMatch
{
    public ?int $abs = null;
    public ?int $class = null;
    public ?float $course_deg = null;
    public ?string $home_port = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?int $imo = null;
    public ?string $last_ais_update = null;
    public ?float $latitude = null;
    public ?array $launches = null;
    public ?string $legacy_id = null;
    public ?string $link = null;
    public ?float $longitude = null;
    public ?int $mass_kg = null;
    public ?int $mass_lbs = null;
    public ?int $mmsi = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?array $roles = null;
    public ?float $speed_kn = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?int $year_built = null;
}

/** Starlink entity data model. */
class Starlink
{
    public ?float $height_km = null;
    public ?string $id = null;
    public ?float $latitude = null;
    public ?string $launch = null;
    public ?float $longitude = null;
    public ?array $spaceTrack = null;
    public ?float $velocity_kms = null;
    public ?string $version = null;
}

/** Request payload for Starlink#load. */
class StarlinkLoadMatch
{
    public string $id;
}

/** Request payload for Starlink#list. */
class StarlinkListMatch
{
    public ?float $height_km = null;
    public ?string $id = null;
    public ?float $latitude = null;
    public ?string $launch = null;
    public ?float $longitude = null;
    public ?array $spaceTrack = null;
    public ?float $velocity_kms = null;
    public ?string $version = null;
}

