# Typed models for the SpacexRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Capsule(TypedDict, total=False):
    id: str
    land_landings: int
    last_update: str
    launches: list
    reuse_count: int
    serial: str
    status: str
    type: str
    water_landings: int


class CapsuleLoadMatch(TypedDict):
    id: str


class CapsuleListMatch(TypedDict, total=False):
    id: str
    land_landings: int
    last_update: str
    launches: list
    reuse_count: int
    serial: str
    status: str
    type: str
    water_landings: int


class Core(TypedDict, total=False):
    asds_attempts: int
    asds_landings: int
    block: int
    id: str
    last_update: str
    launches: list
    reuse_count: int
    rtls_attempts: int
    rtls_landings: int
    serial: str
    status: str


class CoreLoadMatch(TypedDict):
    id: str


class CoreListMatch(TypedDict, total=False):
    asds_attempts: int
    asds_landings: int
    block: int
    id: str
    last_update: str
    launches: list
    reuse_count: int
    rtls_attempts: int
    rtls_landings: int
    serial: str
    status: str


class Crew(TypedDict, total=False):
    agency: str
    id: str
    image: str
    launches: list
    name: str
    status: str
    wikipedia: str


class CrewLoadMatch(TypedDict):
    id: str


class CrewListMatch(TypedDict, total=False):
    agency: str
    id: str
    image: str
    launches: list
    name: str
    status: str
    wikipedia: str


class Landpad(TypedDict, total=False):
    details: str
    full_name: str
    id: str
    landing_attempts: int
    landing_successes: int
    latitude: float
    launches: list
    locality: str
    longitude: float
    name: str
    region: str
    status: str
    type: str
    wikipedia: str


class LandpadLoadMatch(TypedDict):
    id: str


class LandpadListMatch(TypedDict, total=False):
    details: str
    full_name: str
    id: str
    landing_attempts: int
    landing_successes: int
    latitude: float
    launches: list
    locality: str
    longitude: float
    name: str
    region: str
    status: str
    type: str
    wikipedia: str


class Launch(TypedDict, total=False):
    auto_update: bool
    capsules: list
    core: str
    cores: list
    crew: list
    date_local: str
    date_precision: str
    date_unix: int
    date_utc: str
    details: str
    failures: list
    fairings: dict
    flight: int
    flight_number: int
    gridfins: bool
    id: str
    landing_attempt: bool
    landing_success: bool
    landing_type: str
    landpad: str
    launchpad: str
    legs: bool
    links: dict
    name: str
    net: bool
    payloads: list
    reused: bool
    rocket: str
    ships: list
    static_fire_date_unix: int
    static_fire_date_utc: str
    success: bool
    tdb: bool
    upcoming: bool
    window: int


class LaunchLoadMatch(TypedDict):
    id: str


class LaunchListMatch(TypedDict, total=False):
    auto_update: bool
    capsules: list
    core: str
    cores: list
    crew: list
    date_local: str
    date_precision: str
    date_unix: int
    date_utc: str
    details: str
    failures: list
    fairings: dict
    flight: int
    flight_number: int
    gridfins: bool
    id: str
    landing_attempt: bool
    landing_success: bool
    landing_type: str
    landpad: str
    launchpad: str
    legs: bool
    links: dict
    name: str
    net: bool
    payloads: list
    reused: bool
    rocket: str
    ships: list
    static_fire_date_unix: int
    static_fire_date_utc: str
    success: bool
    tdb: bool
    upcoming: bool
    window: int


class Launchpad(TypedDict, total=False):
    details: str
    full_name: str
    id: str
    latitude: float
    launch_attempts: int
    launch_successes: int
    launches: list
    locality: str
    longitude: float
    name: str
    region: str
    rockets: list
    status: str


class LaunchpadLoadMatch(TypedDict):
    id: str


class LaunchpadListMatch(TypedDict, total=False):
    details: str
    full_name: str
    id: str
    latitude: float
    launch_attempts: int
    launch_successes: int
    launches: list
    locality: str
    longitude: float
    name: str
    region: str
    rockets: list
    status: str


class Payload(TypedDict, total=False):
    apoapsis_km: float
    arg_of_pericenter: float
    customers: list
    eccentricity: float
    epoch: str
    id: str
    inclination_deg: float
    launch: str
    lifespan_years: float
    longitude: float
    manufacturers: list
    mass_kg: float
    mass_lbs: float
    mean_anomaly: float
    mean_motion: float
    name: str
    nationalities: list
    norad_ids: list
    orbit: str
    periapsis_km: float
    period_min: float
    raan: float
    reference_system: str
    regime: str
    reused: bool
    semi_major_axis_km: float
    type: str


class PayloadLoadMatch(TypedDict):
    id: str


class PayloadListMatch(TypedDict, total=False):
    apoapsis_km: float
    arg_of_pericenter: float
    customers: list
    eccentricity: float
    epoch: str
    id: str
    inclination_deg: float
    launch: str
    lifespan_years: float
    longitude: float
    manufacturers: list
    mass_kg: float
    mass_lbs: float
    mean_anomaly: float
    mean_motion: float
    name: str
    nationalities: list
    norad_ids: list
    orbit: str
    periapsis_km: float
    period_min: float
    raan: float
    reference_system: str
    regime: str
    reused: bool
    semi_major_axis_km: float
    type: str


class Roadster(TypedDict, total=False):
    apoapsis_au: float
    details: str
    earth_distance_km: float
    earth_distance_mi: float
    eccentricity: float
    epoch_jd: float
    flickr_images: list
    id: str
    inclination: float
    launch_date_unix: int
    launch_date_utc: str
    launch_mass_kg: int
    launch_mass_lbs: int
    longitude: float
    mars_distance_km: float
    mars_distance_mi: float
    name: str
    norad_id: int
    orbit_type: str
    periapsis_arg: float
    periapsis_au: float
    period_days: float
    semi_major_axis_au: float
    speed_kph: float
    speed_mph: float
    video: str
    wikipedia: str


class RoadsterListMatch(TypedDict, total=False):
    apoapsis_au: float
    details: str
    earth_distance_km: float
    earth_distance_mi: float
    eccentricity: float
    epoch_jd: float
    flickr_images: list
    id: str
    inclination: float
    launch_date_unix: int
    launch_date_utc: str
    launch_mass_kg: int
    launch_mass_lbs: int
    longitude: float
    mars_distance_km: float
    mars_distance_mi: float
    name: str
    norad_id: int
    orbit_type: str
    periapsis_arg: float
    periapsis_au: float
    period_days: float
    semi_major_axis_au: float
    speed_kph: float
    speed_mph: float
    video: str
    wikipedia: str


class Rocket(TypedDict, total=False):
    active: bool
    boosters: int
    company: str
    cost_per_launch: int
    country: str
    description: str
    diameter: dict
    first_flight: str
    flickr_images: list
    height: dict
    id: str
    mass: dict
    name: str
    stages: int
    success_rate_pct: float
    type: str
    wikipedia: str


class RocketLoadMatch(TypedDict):
    id: str


class RocketListMatch(TypedDict, total=False):
    active: bool
    boosters: int
    company: str
    cost_per_launch: int
    country: str
    description: str
    diameter: dict
    first_flight: str
    flickr_images: list
    height: dict
    id: str
    mass: dict
    name: str
    stages: int
    success_rate_pct: float
    type: str
    wikipedia: str


class Ship(TypedDict, total=False):
    abs: int
    course_deg: float
    home_port: str
    id: str
    image: str
    imo: int
    last_ais_update: str
    latitude: float
    launches: list
    legacy_id: str
    link: str
    longitude: float
    mass_kg: int
    mass_lbs: int
    mmsi: int
    model: str
    name: str
    roles: list
    speed_kn: float
    status: str
    type: str
    year_built: int


class ShipLoadMatch(TypedDict):
    id: str


class ShipListMatch(TypedDict, total=False):
    abs: int
    course_deg: float
    home_port: str
    id: str
    image: str
    imo: int
    last_ais_update: str
    latitude: float
    launches: list
    legacy_id: str
    link: str
    longitude: float
    mass_kg: int
    mass_lbs: int
    mmsi: int
    model: str
    name: str
    roles: list
    speed_kn: float
    status: str
    type: str
    year_built: int


class Starlink(TypedDict, total=False):
    height_km: float
    id: str
    latitude: float
    launch: str
    longitude: float
    spaceTrack: dict
    velocity_kms: float
    version: str


class StarlinkLoadMatch(TypedDict):
    id: str


class StarlinkListMatch(TypedDict, total=False):
    height_km: float
    id: str
    latitude: float
    launch: str
    longitude: float
    spaceTrack: dict
    velocity_kms: float
    version: str
