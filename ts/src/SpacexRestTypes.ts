// Typed models for the SpacexRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Capsule {
  id?: string
  land_landing?: number
  last_update?: string
  launch?: any[]
  reuse_count?: number
  serial?: string
  status?: string
  type?: string
  water_landing?: number
}

export interface CapsuleLoadMatch {
  id: string
}

export interface CapsuleListMatch {
  id?: string
  land_landing?: number
  last_update?: string
  launch?: any[]
  reuse_count?: number
  serial?: string
  status?: string
  type?: string
  water_landing?: number
}

export interface Core {
  asds_attempt?: number
  asds_landing?: number
  block?: number
  id?: string
  last_update?: string
  launch?: any[]
  reuse_count?: number
  rtls_attempt?: number
  rtls_landing?: number
  serial?: string
  status?: string
}

export interface CoreLoadMatch {
  id: string
}

export interface CoreListMatch {
  asds_attempt?: number
  asds_landing?: number
  block?: number
  id?: string
  last_update?: string
  launch?: any[]
  reuse_count?: number
  rtls_attempt?: number
  rtls_landing?: number
  serial?: string
  status?: string
}

export interface Crew {
  agency?: string
  id?: string
  image?: string
  launch?: any[]
  name?: string
  status?: string
  wikipedia?: string
}

export interface CrewLoadMatch {
  id: string
}

export interface CrewListMatch {
  agency?: string
  id?: string
  image?: string
  launch?: any[]
  name?: string
  status?: string
  wikipedia?: string
}

export interface Landpad {
  detail?: string
  full_name?: string
  id?: string
  landing_attempt?: number
  landing_success?: number
  latitude?: number
  launch?: any[]
  locality?: string
  longitude?: number
  name?: string
  region?: string
  status?: string
  type?: string
  wikipedia?: string
}

export interface LandpadLoadMatch {
  id: string
}

export interface LandpadListMatch {
  detail?: string
  full_name?: string
  id?: string
  landing_attempt?: number
  landing_success?: number
  latitude?: number
  launch?: any[]
  locality?: string
  longitude?: number
  name?: string
  region?: string
  status?: string
  type?: string
  wikipedia?: string
}

export interface Launch {
  auto_update?: boolean
  capsule?: any[]
  core?: any[]
  crew?: any[]
  date_local?: string
  date_precision?: string
  date_unix?: number
  date_utc?: string
  detail?: string
  failure?: any[]
  fairing?: Record<string, any>
  flight?: number
  flight_number?: number
  gridfin?: boolean
  id?: string
  landing_attempt?: boolean
  landing_success?: boolean
  landing_type?: string
  landpad?: string
  launchpad?: string
  leg?: boolean
  link?: Record<string, any>
  name?: string
  net?: boolean
  payload?: any[]
  reused?: boolean
  rocket?: string
  ship?: any[]
  static_fire_date_unix?: number
  static_fire_date_utc?: string
  success?: boolean
  tdb?: boolean
  upcoming?: boolean
  window?: number
}

export interface LaunchLoadMatch {
  id: string
}

export interface LaunchListMatch {
  auto_update?: boolean
  capsule?: any[]
  core?: any[]
  crew?: any[]
  date_local?: string
  date_precision?: string
  date_unix?: number
  date_utc?: string
  detail?: string
  failure?: any[]
  fairing?: Record<string, any>
  flight?: number
  flight_number?: number
  gridfin?: boolean
  id?: string
  landing_attempt?: boolean
  landing_success?: boolean
  landing_type?: string
  landpad?: string
  launchpad?: string
  leg?: boolean
  link?: Record<string, any>
  name?: string
  net?: boolean
  payload?: any[]
  reused?: boolean
  rocket?: string
  ship?: any[]
  static_fire_date_unix?: number
  static_fire_date_utc?: string
  success?: boolean
  tdb?: boolean
  upcoming?: boolean
  window?: number
}

export interface Launchpad {
  detail?: string
  full_name?: string
  id?: string
  latitude?: number
  launch?: any[]
  launch_attempt?: number
  launch_success?: number
  locality?: string
  longitude?: number
  name?: string
  region?: string
  rocket?: any[]
  status?: string
}

export interface LaunchpadLoadMatch {
  id: string
}

export interface LaunchpadListMatch {
  detail?: string
  full_name?: string
  id?: string
  latitude?: number
  launch?: any[]
  launch_attempt?: number
  launch_success?: number
  locality?: string
  longitude?: number
  name?: string
  region?: string
  rocket?: any[]
  status?: string
}

export interface Payload {
  apoapsis_km?: number
  arg_of_pericenter?: number
  customer?: any[]
  eccentricity?: number
  epoch?: string
  id?: string
  inclination_deg?: number
  launch?: string
  lifespan_year?: number
  longitude?: number
  manufacturer?: any[]
  mass_kg?: number
  mass_lb?: number
  mean_anomaly?: number
  mean_motion?: number
  name?: string
  nationality?: any[]
  norad_id?: any[]
  orbit?: string
  periapsis_km?: number
  period_min?: number
  raan?: number
  reference_system?: string
  regime?: string
  reused?: boolean
  semi_major_axis_km?: number
  type?: string
}

export interface PayloadLoadMatch {
  id: string
}

export interface PayloadListMatch {
  apoapsis_km?: number
  arg_of_pericenter?: number
  customer?: any[]
  eccentricity?: number
  epoch?: string
  id?: string
  inclination_deg?: number
  launch?: string
  lifespan_year?: number
  longitude?: number
  manufacturer?: any[]
  mass_kg?: number
  mass_lb?: number
  mean_anomaly?: number
  mean_motion?: number
  name?: string
  nationality?: any[]
  norad_id?: any[]
  orbit?: string
  periapsis_km?: number
  period_min?: number
  raan?: number
  reference_system?: string
  regime?: string
  reused?: boolean
  semi_major_axis_km?: number
  type?: string
}

export interface Roadster {
  apoapsis_au?: number
  detail?: string
  earth_distance_km?: number
  earth_distance_mi?: number
  eccentricity?: number
  epoch_jd?: number
  flickr_image?: any[]
  id?: string
  inclination?: number
  launch_date_unix?: number
  launch_date_utc?: string
  launch_mass_kg?: number
  launch_mass_lb?: number
  longitude?: number
  mars_distance_km?: number
  mars_distance_mi?: number
  name?: string
  norad_id?: number
  orbit_type?: string
  periapsis_arg?: number
  periapsis_au?: number
  period_day?: number
  semi_major_axis_au?: number
  speed_kph?: number
  speed_mph?: number
  video?: string
  wikipedia?: string
}

export interface RoadsterListMatch {
  apoapsis_au?: number
  detail?: string
  earth_distance_km?: number
  earth_distance_mi?: number
  eccentricity?: number
  epoch_jd?: number
  flickr_image?: any[]
  id?: string
  inclination?: number
  launch_date_unix?: number
  launch_date_utc?: string
  launch_mass_kg?: number
  launch_mass_lb?: number
  longitude?: number
  mars_distance_km?: number
  mars_distance_mi?: number
  name?: string
  norad_id?: number
  orbit_type?: string
  periapsis_arg?: number
  periapsis_au?: number
  period_day?: number
  semi_major_axis_au?: number
  speed_kph?: number
  speed_mph?: number
  video?: string
  wikipedia?: string
}

export interface Rocket {
  active?: boolean
  booster?: number
  company?: string
  cost_per_launch?: number
  country?: string
  description?: string
  diameter?: Record<string, any>
  first_flight?: string
  flickr_image?: any[]
  height?: Record<string, any>
  id?: string
  mass?: Record<string, any>
  name?: string
  stage?: number
  success_rate_pct?: number
  type?: string
  wikipedia?: string
}

export interface RocketLoadMatch {
  id: string
}

export interface RocketListMatch {
  active?: boolean
  booster?: number
  company?: string
  cost_per_launch?: number
  country?: string
  description?: string
  diameter?: Record<string, any>
  first_flight?: string
  flickr_image?: any[]
  height?: Record<string, any>
  id?: string
  mass?: Record<string, any>
  name?: string
  stage?: number
  success_rate_pct?: number
  type?: string
  wikipedia?: string
}

export interface Ship {
  abs?: number
  class?: number
  course_deg?: number
  home_port?: string
  id?: string
  image?: string
  imo?: number
  last_ais_update?: string
  latitude?: number
  launch?: any[]
  legacy_id?: string
  link?: string
  longitude?: number
  mass_kg?: number
  mass_lb?: number
  mmsi?: number
  model?: string
  name?: string
  role?: any[]
  speed_kn?: number
  status?: string
  type?: string
  year_built?: number
}

export interface ShipLoadMatch {
  id: string
}

export interface ShipListMatch {
  abs?: number
  class?: number
  course_deg?: number
  home_port?: string
  id?: string
  image?: string
  imo?: number
  last_ais_update?: string
  latitude?: number
  launch?: any[]
  legacy_id?: string
  link?: string
  longitude?: number
  mass_kg?: number
  mass_lb?: number
  mmsi?: number
  model?: string
  name?: string
  role?: any[]
  speed_kn?: number
  status?: string
  type?: string
  year_built?: number
}

export interface Starlink {
  height_km?: number
  id?: string
  latitude?: number
  launch?: string
  longitude?: number
  space_track?: Record<string, any>
  velocity_km?: number
  version?: string
}

export interface StarlinkLoadMatch {
  id: string
}

export interface StarlinkListMatch {
  height_km?: number
  id?: string
  latitude?: number
  launch?: string
  longitude?: number
  space_track?: Record<string, any>
  velocity_km?: number
  version?: string
}

