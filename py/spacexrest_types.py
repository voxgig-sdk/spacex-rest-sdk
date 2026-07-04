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
    land_landing: int
    last_update: str
    launch: list
    reuse_count: int
    serial: str
    status: str
    type: str
    water_landing: int


class CapsuleLoadMatch(TypedDict):
    id: str


class CapsuleListMatch(TypedDict, total=False):
    id: str
    land_landing: int
    last_update: str
    launch: list
    reuse_count: int
    serial: str
    status: str
    type: str
    water_landing: int


class Core(TypedDict, total=False):
    asds_attempt: int
    asds_landing: int
    block: int
    id: str
    last_update: str
    launch: list
    reuse_count: int
    rtls_attempt: int
    rtls_landing: int
    serial: str
    status: str


class CoreLoadMatch(TypedDict):
    id: str


class CoreListMatch(TypedDict, total=False):
    asds_attempt: int
    asds_landing: int
    block: int
    id: str
    last_update: str
    launch: list
    reuse_count: int
    rtls_attempt: int
    rtls_landing: int
    serial: str
    status: str


class Crew(TypedDict, total=False):
    agency: str
    id: str
    image: str
    launch: list
    name: str
    status: str
    wikipedia: str


class CrewLoadMatch(TypedDict):
    id: str


class CrewListMatch(TypedDict, total=False):
    agency: str
    id: str
    image: str
    launch: list
    name: str
    status: str
    wikipedia: str


class Landpad(TypedDict, total=False):
    detail: str
    full_name: str
    id: str
    landing_attempt: int
    landing_success: int
    latitude: float
    launch: list
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
    detail: str
    full_name: str
    id: str
    landing_attempt: int
    landing_success: int
    latitude: float
    launch: list
    locality: str
    longitude: float
    name: str
    region: str
    status: str
    type: str
    wikipedia: str


class Launch(TypedDict, total=False):
    auto_update: bool
    capsule: list
    core: list
    crew: list
    date_local: str
    date_precision: str
    date_unix: int
    date_utc: str
    detail: str
    failure: list
    fairing: dict
    flight: int
    flight_number: int
    gridfin: bool
    id: str
    landing_attempt: bool
    landing_success: bool
    landing_type: str
    landpad: str
    launchpad: str
    leg: bool
    link: dict
    name: str
    net: bool
    payload: list
    reused: bool
    rocket: str
    ship: list
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
    capsule: list
    core: list
    crew: list
    date_local: str
    date_precision: str
    date_unix: int
    date_utc: str
    detail: str
    failure: list
    fairing: dict
    flight: int
    flight_number: int
    gridfin: bool
    id: str
    landing_attempt: bool
    landing_success: bool
    landing_type: str
    landpad: str
    launchpad: str
    leg: bool
    link: dict
    name: str
    net: bool
    payload: list
    reused: bool
    rocket: str
    ship: list
    static_fire_date_unix: int
    static_fire_date_utc: str
    success: bool
    tdb: bool
    upcoming: bool
    window: int


class Launchpad(TypedDict, total=False):
    detail: str
    full_name: str
    id: str
    latitude: float
    launch: list
    launch_attempt: int
    launch_success: int
    locality: str
    longitude: float
    name: str
    region: str
    rocket: list
    status: str


class LaunchpadLoadMatch(TypedDict):
    id: str


class LaunchpadListMatch(TypedDict, total=False):
    detail: str
    full_name: str
    id: str
    latitude: float
    launch: list
    launch_attempt: int
    launch_success: int
    locality: str
    longitude: float
    name: str
    region: str
    rocket: list
    status: str


class Payload(TypedDict, total=False):
    apoapsis_km: float
    arg_of_pericenter: float
    customer: list
    eccentricity: float
    epoch: str
    id: str
    inclination_deg: float
    launch: str
    lifespan_year: float
    longitude: float
    manufacturer: list
    mass_kg: float
    mass_lb: float
    mean_anomaly: float
    mean_motion: float
    name: str
    nationality: list
    norad_id: list
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
    customer: list
    eccentricity: float
    epoch: str
    id: str
    inclination_deg: float
    launch: str
    lifespan_year: float
    longitude: float
    manufacturer: list
    mass_kg: float
    mass_lb: float
    mean_anomaly: float
    mean_motion: float
    name: str
    nationality: list
    norad_id: list
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
    detail: str
    earth_distance_km: float
    earth_distance_mi: float
    eccentricity: float
    epoch_jd: float
    flickr_image: list
    id: str
    inclination: float
    launch_date_unix: int
    launch_date_utc: str
    launch_mass_kg: int
    launch_mass_lb: int
    longitude: float
    mars_distance_km: float
    mars_distance_mi: float
    name: str
    norad_id: int
    orbit_type: str
    periapsis_arg: float
    periapsis_au: float
    period_day: float
    semi_major_axis_au: float
    speed_kph: float
    speed_mph: float
    video: str
    wikipedia: str


class RoadsterListMatch(TypedDict, total=False):
    apoapsis_au: float
    detail: str
    earth_distance_km: float
    earth_distance_mi: float
    eccentricity: float
    epoch_jd: float
    flickr_image: list
    id: str
    inclination: float
    launch_date_unix: int
    launch_date_utc: str
    launch_mass_kg: int
    launch_mass_lb: int
    longitude: float
    mars_distance_km: float
    mars_distance_mi: float
    name: str
    norad_id: int
    orbit_type: str
    periapsis_arg: float
    periapsis_au: float
    period_day: float
    semi_major_axis_au: float
    speed_kph: float
    speed_mph: float
    video: str
    wikipedia: str


class Rocket(TypedDict, total=False):
    active: bool
    booster: int
    company: str
    cost_per_launch: int
    country: str
    description: str
    diameter: dict
    first_flight: str
    flickr_image: list
    height: dict
    id: str
    mass: dict
    name: str
    stage: int
    success_rate_pct: float
    type: str
    wikipedia: str


class RocketLoadMatch(TypedDict):
    id: str


class RocketListMatch(TypedDict, total=False):
    active: bool
    booster: int
    company: str
    cost_per_launch: int
    country: str
    description: str
    diameter: dict
    first_flight: str
    flickr_image: list
    height: dict
    id: str
    mass: dict
    name: str
    stage: int
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
    launch: list
    legacy_id: str
    link: str
    longitude: float
    mass_kg: int
    mass_lb: int
    mmsi: int
    model: str
    name: str
    role: list
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
    launch: list
    legacy_id: str
    link: str
    longitude: float
    mass_kg: int
    mass_lb: int
    mmsi: int
    model: str
    name: str
    role: list
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
    space_track: dict
    velocity_km: float
    version: str


class StarlinkLoadMatch(TypedDict):
    id: str


class StarlinkListMatch(TypedDict, total=False):
    height_km: float
    id: str
    latitude: float
    launch: str
    longitude: float
    space_track: dict
    velocity_km: float
    version: str
