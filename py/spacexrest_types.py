# Typed models for the SpacexRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Capsule:
    id: Optional[str] = None
    land_landing: Optional[int] = None
    last_update: Optional[str] = None
    launch: Optional[list] = None
    reuse_count: Optional[int] = None
    serial: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    water_landing: Optional[int] = None


@dataclass
class CapsuleLoadMatch:
    id: str


@dataclass
class CapsuleListMatch:
    id: Optional[str] = None
    land_landing: Optional[int] = None
    last_update: Optional[str] = None
    launch: Optional[list] = None
    reuse_count: Optional[int] = None
    serial: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    water_landing: Optional[int] = None


@dataclass
class Core:
    asds_attempt: Optional[int] = None
    asds_landing: Optional[int] = None
    block: Optional[int] = None
    id: Optional[str] = None
    last_update: Optional[str] = None
    launch: Optional[list] = None
    reuse_count: Optional[int] = None
    rtls_attempt: Optional[int] = None
    rtls_landing: Optional[int] = None
    serial: Optional[str] = None
    status: Optional[str] = None


@dataclass
class CoreLoadMatch:
    id: str


@dataclass
class CoreListMatch:
    asds_attempt: Optional[int] = None
    asds_landing: Optional[int] = None
    block: Optional[int] = None
    id: Optional[str] = None
    last_update: Optional[str] = None
    launch: Optional[list] = None
    reuse_count: Optional[int] = None
    rtls_attempt: Optional[int] = None
    rtls_landing: Optional[int] = None
    serial: Optional[str] = None
    status: Optional[str] = None


@dataclass
class Crew:
    agency: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    launch: Optional[list] = None
    name: Optional[str] = None
    status: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class CrewLoadMatch:
    id: str


@dataclass
class CrewListMatch:
    agency: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    launch: Optional[list] = None
    name: Optional[str] = None
    status: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class Landpad:
    detail: Optional[str] = None
    full_name: Optional[str] = None
    id: Optional[str] = None
    landing_attempt: Optional[int] = None
    landing_success: Optional[int] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    locality: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    region: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class LandpadLoadMatch:
    id: str


@dataclass
class LandpadListMatch:
    detail: Optional[str] = None
    full_name: Optional[str] = None
    id: Optional[str] = None
    landing_attempt: Optional[int] = None
    landing_success: Optional[int] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    locality: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    region: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class Launch:
    auto_update: Optional[bool] = None
    capsule: Optional[list] = None
    core: Optional[list] = None
    crew: Optional[list] = None
    date_local: Optional[str] = None
    date_precision: Optional[str] = None
    date_unix: Optional[int] = None
    date_utc: Optional[str] = None
    detail: Optional[str] = None
    failure: Optional[list] = None
    fairing: Optional[dict] = None
    flight: Optional[int] = None
    flight_number: Optional[int] = None
    gridfin: Optional[bool] = None
    id: Optional[str] = None
    landing_attempt: Optional[bool] = None
    landing_success: Optional[bool] = None
    landing_type: Optional[str] = None
    landpad: Optional[str] = None
    launchpad: Optional[str] = None
    leg: Optional[bool] = None
    link: Optional[dict] = None
    name: Optional[str] = None
    net: Optional[bool] = None
    payload: Optional[list] = None
    reused: Optional[bool] = None
    rocket: Optional[str] = None
    ship: Optional[list] = None
    static_fire_date_unix: Optional[int] = None
    static_fire_date_utc: Optional[str] = None
    success: Optional[bool] = None
    tdb: Optional[bool] = None
    upcoming: Optional[bool] = None
    window: Optional[int] = None


@dataclass
class LaunchLoadMatch:
    id: str


@dataclass
class LaunchListMatch:
    auto_update: Optional[bool] = None
    capsule: Optional[list] = None
    core: Optional[list] = None
    crew: Optional[list] = None
    date_local: Optional[str] = None
    date_precision: Optional[str] = None
    date_unix: Optional[int] = None
    date_utc: Optional[str] = None
    detail: Optional[str] = None
    failure: Optional[list] = None
    fairing: Optional[dict] = None
    flight: Optional[int] = None
    flight_number: Optional[int] = None
    gridfin: Optional[bool] = None
    id: Optional[str] = None
    landing_attempt: Optional[bool] = None
    landing_success: Optional[bool] = None
    landing_type: Optional[str] = None
    landpad: Optional[str] = None
    launchpad: Optional[str] = None
    leg: Optional[bool] = None
    link: Optional[dict] = None
    name: Optional[str] = None
    net: Optional[bool] = None
    payload: Optional[list] = None
    reused: Optional[bool] = None
    rocket: Optional[str] = None
    ship: Optional[list] = None
    static_fire_date_unix: Optional[int] = None
    static_fire_date_utc: Optional[str] = None
    success: Optional[bool] = None
    tdb: Optional[bool] = None
    upcoming: Optional[bool] = None
    window: Optional[int] = None


@dataclass
class Launchpad:
    detail: Optional[str] = None
    full_name: Optional[str] = None
    id: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    launch_attempt: Optional[int] = None
    launch_success: Optional[int] = None
    locality: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    region: Optional[str] = None
    rocket: Optional[list] = None
    status: Optional[str] = None


@dataclass
class LaunchpadLoadMatch:
    id: str


@dataclass
class LaunchpadListMatch:
    detail: Optional[str] = None
    full_name: Optional[str] = None
    id: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    launch_attempt: Optional[int] = None
    launch_success: Optional[int] = None
    locality: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    region: Optional[str] = None
    rocket: Optional[list] = None
    status: Optional[str] = None


@dataclass
class Payload:
    apoapsis_km: Optional[float] = None
    arg_of_pericenter: Optional[float] = None
    customer: Optional[list] = None
    eccentricity: Optional[float] = None
    epoch: Optional[str] = None
    id: Optional[str] = None
    inclination_deg: Optional[float] = None
    launch: Optional[str] = None
    lifespan_year: Optional[float] = None
    longitude: Optional[float] = None
    manufacturer: Optional[list] = None
    mass_kg: Optional[float] = None
    mass_lb: Optional[float] = None
    mean_anomaly: Optional[float] = None
    mean_motion: Optional[float] = None
    name: Optional[str] = None
    nationality: Optional[list] = None
    norad_id: Optional[list] = None
    orbit: Optional[str] = None
    periapsis_km: Optional[float] = None
    period_min: Optional[float] = None
    raan: Optional[float] = None
    reference_system: Optional[str] = None
    regime: Optional[str] = None
    reused: Optional[bool] = None
    semi_major_axis_km: Optional[float] = None
    type: Optional[str] = None


@dataclass
class PayloadLoadMatch:
    id: str


@dataclass
class PayloadListMatch:
    apoapsis_km: Optional[float] = None
    arg_of_pericenter: Optional[float] = None
    customer: Optional[list] = None
    eccentricity: Optional[float] = None
    epoch: Optional[str] = None
    id: Optional[str] = None
    inclination_deg: Optional[float] = None
    launch: Optional[str] = None
    lifespan_year: Optional[float] = None
    longitude: Optional[float] = None
    manufacturer: Optional[list] = None
    mass_kg: Optional[float] = None
    mass_lb: Optional[float] = None
    mean_anomaly: Optional[float] = None
    mean_motion: Optional[float] = None
    name: Optional[str] = None
    nationality: Optional[list] = None
    norad_id: Optional[list] = None
    orbit: Optional[str] = None
    periapsis_km: Optional[float] = None
    period_min: Optional[float] = None
    raan: Optional[float] = None
    reference_system: Optional[str] = None
    regime: Optional[str] = None
    reused: Optional[bool] = None
    semi_major_axis_km: Optional[float] = None
    type: Optional[str] = None


@dataclass
class Roadster:
    apoapsis_au: Optional[float] = None
    detail: Optional[str] = None
    earth_distance_km: Optional[float] = None
    earth_distance_mi: Optional[float] = None
    eccentricity: Optional[float] = None
    epoch_jd: Optional[float] = None
    flickr_image: Optional[list] = None
    id: Optional[str] = None
    inclination: Optional[float] = None
    launch_date_unix: Optional[int] = None
    launch_date_utc: Optional[str] = None
    launch_mass_kg: Optional[int] = None
    launch_mass_lb: Optional[int] = None
    longitude: Optional[float] = None
    mars_distance_km: Optional[float] = None
    mars_distance_mi: Optional[float] = None
    name: Optional[str] = None
    norad_id: Optional[int] = None
    orbit_type: Optional[str] = None
    periapsis_arg: Optional[float] = None
    periapsis_au: Optional[float] = None
    period_day: Optional[float] = None
    semi_major_axis_au: Optional[float] = None
    speed_kph: Optional[float] = None
    speed_mph: Optional[float] = None
    video: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class RoadsterListMatch:
    apoapsis_au: Optional[float] = None
    detail: Optional[str] = None
    earth_distance_km: Optional[float] = None
    earth_distance_mi: Optional[float] = None
    eccentricity: Optional[float] = None
    epoch_jd: Optional[float] = None
    flickr_image: Optional[list] = None
    id: Optional[str] = None
    inclination: Optional[float] = None
    launch_date_unix: Optional[int] = None
    launch_date_utc: Optional[str] = None
    launch_mass_kg: Optional[int] = None
    launch_mass_lb: Optional[int] = None
    longitude: Optional[float] = None
    mars_distance_km: Optional[float] = None
    mars_distance_mi: Optional[float] = None
    name: Optional[str] = None
    norad_id: Optional[int] = None
    orbit_type: Optional[str] = None
    periapsis_arg: Optional[float] = None
    periapsis_au: Optional[float] = None
    period_day: Optional[float] = None
    semi_major_axis_au: Optional[float] = None
    speed_kph: Optional[float] = None
    speed_mph: Optional[float] = None
    video: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class Rocket:
    active: Optional[bool] = None
    booster: Optional[int] = None
    company: Optional[str] = None
    cost_per_launch: Optional[int] = None
    country: Optional[str] = None
    description: Optional[str] = None
    diameter: Optional[dict] = None
    first_flight: Optional[str] = None
    flickr_image: Optional[list] = None
    height: Optional[dict] = None
    id: Optional[str] = None
    mass: Optional[dict] = None
    name: Optional[str] = None
    stage: Optional[int] = None
    success_rate_pct: Optional[float] = None
    type: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class RocketLoadMatch:
    id: str


@dataclass
class RocketListMatch:
    active: Optional[bool] = None
    booster: Optional[int] = None
    company: Optional[str] = None
    cost_per_launch: Optional[int] = None
    country: Optional[str] = None
    description: Optional[str] = None
    diameter: Optional[dict] = None
    first_flight: Optional[str] = None
    flickr_image: Optional[list] = None
    height: Optional[dict] = None
    id: Optional[str] = None
    mass: Optional[dict] = None
    name: Optional[str] = None
    stage: Optional[int] = None
    success_rate_pct: Optional[float] = None
    type: Optional[str] = None
    wikipedia: Optional[str] = None


@dataclass
class Ship:
    abs: Optional[int] = None
    course_deg: Optional[float] = None
    home_port: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    imo: Optional[int] = None
    last_ais_update: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    legacy_id: Optional[str] = None
    link: Optional[str] = None
    longitude: Optional[float] = None
    mass_kg: Optional[int] = None
    mass_lb: Optional[int] = None
    mmsi: Optional[int] = None
    model: Optional[str] = None
    name: Optional[str] = None
    role: Optional[list] = None
    speed_kn: Optional[float] = None
    status: Optional[str] = None
    type: Optional[str] = None
    year_built: Optional[int] = None


@dataclass
class ShipLoadMatch:
    id: str


@dataclass
class ShipListMatch:
    abs: Optional[int] = None
    course_deg: Optional[float] = None
    home_port: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    imo: Optional[int] = None
    last_ais_update: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[list] = None
    legacy_id: Optional[str] = None
    link: Optional[str] = None
    longitude: Optional[float] = None
    mass_kg: Optional[int] = None
    mass_lb: Optional[int] = None
    mmsi: Optional[int] = None
    model: Optional[str] = None
    name: Optional[str] = None
    role: Optional[list] = None
    speed_kn: Optional[float] = None
    status: Optional[str] = None
    type: Optional[str] = None
    year_built: Optional[int] = None


@dataclass
class Starlink:
    height_km: Optional[float] = None
    id: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[str] = None
    longitude: Optional[float] = None
    space_track: Optional[dict] = None
    velocity_km: Optional[float] = None
    version: Optional[str] = None


@dataclass
class StarlinkLoadMatch:
    id: str


@dataclass
class StarlinkListMatch:
    height_km: Optional[float] = None
    id: Optional[str] = None
    latitude: Optional[float] = None
    launch: Optional[str] = None
    longitude: Optional[float] = None
    space_track: Optional[dict] = None
    velocity_km: Optional[float] = None
    version: Optional[str] = None

