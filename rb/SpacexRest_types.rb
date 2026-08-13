# frozen_string_literal: true

# Typed models for the SpacexRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Capsule entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] land_landings
#   @return [Integer, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] reuse_count
#   @return [Integer, nil]
#
# @!attribute [rw] serial
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] water_landings
#   @return [Integer, nil]
Capsule = Struct.new(
  :id,
  :land_landings,
  :last_update,
  :launches,
  :reuse_count,
  :serial,
  :status,
  :type,
  :water_landings,
  keyword_init: true
)

# Request payload for Capsule#load.
#
# @!attribute [rw] id
#   @return [String]
CapsuleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Capsule#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] land_landings
#   @return [Integer, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] reuse_count
#   @return [Integer, nil]
#
# @!attribute [rw] serial
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] water_landings
#   @return [Integer, nil]
CapsuleListMatch = Struct.new(
  :id,
  :land_landings,
  :last_update,
  :launches,
  :reuse_count,
  :serial,
  :status,
  :type,
  :water_landings,
  keyword_init: true
)

# Core entity data model.
#
# @!attribute [rw] asds_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] asds_landings
#   @return [Integer, nil]
#
# @!attribute [rw] block
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] reuse_count
#   @return [Integer, nil]
#
# @!attribute [rw] rtls_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] rtls_landings
#   @return [Integer, nil]
#
# @!attribute [rw] serial
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Core = Struct.new(
  :asds_attempts,
  :asds_landings,
  :block,
  :id,
  :last_update,
  :launches,
  :reuse_count,
  :rtls_attempts,
  :rtls_landings,
  :serial,
  :status,
  keyword_init: true
)

# Request payload for Core#load.
#
# @!attribute [rw] id
#   @return [String]
CoreLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Core#list.
#
# @!attribute [rw] asds_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] asds_landings
#   @return [Integer, nil]
#
# @!attribute [rw] block
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] reuse_count
#   @return [Integer, nil]
#
# @!attribute [rw] rtls_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] rtls_landings
#   @return [Integer, nil]
#
# @!attribute [rw] serial
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
CoreListMatch = Struct.new(
  :asds_attempts,
  :asds_landings,
  :block,
  :id,
  :last_update,
  :launches,
  :reuse_count,
  :rtls_attempts,
  :rtls_landings,
  :serial,
  :status,
  keyword_init: true
)

# Crew entity data model.
#
# @!attribute [rw] agency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
Crew = Struct.new(
  :agency,
  :id,
  :image,
  :launches,
  :name,
  :status,
  :wikipedia,
  keyword_init: true
)

# Request payload for Crew#load.
#
# @!attribute [rw] id
#   @return [String]
CrewLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Crew#list.
#
# @!attribute [rw] agency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
CrewListMatch = Struct.new(
  :agency,
  :id,
  :image,
  :launches,
  :name,
  :status,
  :wikipedia,
  keyword_init: true
)

# Landpad entity data model.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] landing_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] landing_successes
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] locality
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
Landpad = Struct.new(
  :details,
  :full_name,
  :id,
  :landing_attempts,
  :landing_successes,
  :latitude,
  :launches,
  :locality,
  :longitude,
  :name,
  :region,
  :status,
  :type,
  :wikipedia,
  keyword_init: true
)

# Request payload for Landpad#load.
#
# @!attribute [rw] id
#   @return [String]
LandpadLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Landpad#list.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] landing_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] landing_successes
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] locality
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
LandpadListMatch = Struct.new(
  :details,
  :full_name,
  :id,
  :landing_attempts,
  :landing_successes,
  :latitude,
  :launches,
  :locality,
  :longitude,
  :name,
  :region,
  :status,
  :type,
  :wikipedia,
  keyword_init: true
)

# Launch entity data model.
#
# @!attribute [rw] auto_update
#   @return [Boolean, nil]
#
# @!attribute [rw] capsules
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [String, nil]
#
# @!attribute [rw] cores
#   @return [Array, nil]
#
# @!attribute [rw] crew
#   @return [Array, nil]
#
# @!attribute [rw] date_local
#   @return [String, nil]
#
# @!attribute [rw] date_precision
#   @return [String, nil]
#
# @!attribute [rw] date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] date_utc
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] failures
#   @return [Array, nil]
#
# @!attribute [rw] fairings
#   @return [Hash, nil]
#
# @!attribute [rw] flight
#   @return [Integer, nil]
#
# @!attribute [rw] flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] gridfins
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] landing_attempt
#   @return [Boolean, nil]
#
# @!attribute [rw] landing_success
#   @return [Boolean, nil]
#
# @!attribute [rw] landing_type
#   @return [String, nil]
#
# @!attribute [rw] landpad
#   @return [String, nil]
#
# @!attribute [rw] launchpad
#   @return [String, nil]
#
# @!attribute [rw] legs
#   @return [Boolean, nil]
#
# @!attribute [rw] links
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] net
#   @return [Boolean, nil]
#
# @!attribute [rw] payloads
#   @return [Array, nil]
#
# @!attribute [rw] reused
#   @return [Boolean, nil]
#
# @!attribute [rw] rocket
#   @return [String, nil]
#
# @!attribute [rw] ships
#   @return [Array, nil]
#
# @!attribute [rw] static_fire_date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] static_fire_date_utc
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] tdb
#   @return [Boolean, nil]
#
# @!attribute [rw] upcoming
#   @return [Boolean, nil]
#
# @!attribute [rw] window
#   @return [Integer, nil]
Launch = Struct.new(
  :auto_update,
  :capsules,
  :core,
  :cores,
  :crew,
  :date_local,
  :date_precision,
  :date_unix,
  :date_utc,
  :details,
  :failures,
  :fairings,
  :flight,
  :flight_number,
  :gridfins,
  :id,
  :landing_attempt,
  :landing_success,
  :landing_type,
  :landpad,
  :launchpad,
  :legs,
  :links,
  :name,
  :net,
  :payloads,
  :reused,
  :rocket,
  :ships,
  :static_fire_date_unix,
  :static_fire_date_utc,
  :success,
  :tdb,
  :upcoming,
  :window,
  keyword_init: true
)

# Request payload for Launch#load.
#
# @!attribute [rw] id
#   @return [String]
LaunchLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Launch#list.
#
# @!attribute [rw] auto_update
#   @return [Boolean, nil]
#
# @!attribute [rw] capsules
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [String, nil]
#
# @!attribute [rw] cores
#   @return [Array, nil]
#
# @!attribute [rw] crew
#   @return [Array, nil]
#
# @!attribute [rw] date_local
#   @return [String, nil]
#
# @!attribute [rw] date_precision
#   @return [String, nil]
#
# @!attribute [rw] date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] date_utc
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] failures
#   @return [Array, nil]
#
# @!attribute [rw] fairings
#   @return [Hash, nil]
#
# @!attribute [rw] flight
#   @return [Integer, nil]
#
# @!attribute [rw] flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] gridfins
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] landing_attempt
#   @return [Boolean, nil]
#
# @!attribute [rw] landing_success
#   @return [Boolean, nil]
#
# @!attribute [rw] landing_type
#   @return [String, nil]
#
# @!attribute [rw] landpad
#   @return [String, nil]
#
# @!attribute [rw] launchpad
#   @return [String, nil]
#
# @!attribute [rw] legs
#   @return [Boolean, nil]
#
# @!attribute [rw] links
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] net
#   @return [Boolean, nil]
#
# @!attribute [rw] payloads
#   @return [Array, nil]
#
# @!attribute [rw] reused
#   @return [Boolean, nil]
#
# @!attribute [rw] rocket
#   @return [String, nil]
#
# @!attribute [rw] ships
#   @return [Array, nil]
#
# @!attribute [rw] static_fire_date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] static_fire_date_utc
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] tdb
#   @return [Boolean, nil]
#
# @!attribute [rw] upcoming
#   @return [Boolean, nil]
#
# @!attribute [rw] window
#   @return [Integer, nil]
LaunchListMatch = Struct.new(
  :auto_update,
  :capsules,
  :core,
  :cores,
  :crew,
  :date_local,
  :date_precision,
  :date_unix,
  :date_utc,
  :details,
  :failures,
  :fairings,
  :flight,
  :flight_number,
  :gridfins,
  :id,
  :landing_attempt,
  :landing_success,
  :landing_type,
  :landpad,
  :launchpad,
  :legs,
  :links,
  :name,
  :net,
  :payloads,
  :reused,
  :rocket,
  :ships,
  :static_fire_date_unix,
  :static_fire_date_utc,
  :success,
  :tdb,
  :upcoming,
  :window,
  keyword_init: true
)

# Launchpad entity data model.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launch_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] launch_successes
#   @return [Integer, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] locality
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] rockets
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Launchpad = Struct.new(
  :details,
  :full_name,
  :id,
  :latitude,
  :launch_attempts,
  :launch_successes,
  :launches,
  :locality,
  :longitude,
  :name,
  :region,
  :rockets,
  :status,
  keyword_init: true
)

# Request payload for Launchpad#load.
#
# @!attribute [rw] id
#   @return [String]
LaunchpadLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Launchpad#list.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launch_attempts
#   @return [Integer, nil]
#
# @!attribute [rw] launch_successes
#   @return [Integer, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] locality
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] rockets
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
LaunchpadListMatch = Struct.new(
  :details,
  :full_name,
  :id,
  :latitude,
  :launch_attempts,
  :launch_successes,
  :launches,
  :locality,
  :longitude,
  :name,
  :region,
  :rockets,
  :status,
  keyword_init: true
)

# Payload entity data model.
#
# @!attribute [rw] apoapsis_km
#   @return [Float, nil]
#
# @!attribute [rw] arg_of_pericenter
#   @return [Float, nil]
#
# @!attribute [rw] customers
#   @return [Array, nil]
#
# @!attribute [rw] eccentricity
#   @return [Float, nil]
#
# @!attribute [rw] epoch
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inclination_deg
#   @return [Float, nil]
#
# @!attribute [rw] launch
#   @return [String, nil]
#
# @!attribute [rw] lifespan_years
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] manufacturers
#   @return [Array, nil]
#
# @!attribute [rw] mass_kg
#   @return [Float, nil]
#
# @!attribute [rw] mass_lbs
#   @return [Float, nil]
#
# @!attribute [rw] mean_anomaly
#   @return [Float, nil]
#
# @!attribute [rw] mean_motion
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nationalities
#   @return [Array, nil]
#
# @!attribute [rw] norad_ids
#   @return [Array, nil]
#
# @!attribute [rw] orbit
#   @return [String, nil]
#
# @!attribute [rw] periapsis_km
#   @return [Float, nil]
#
# @!attribute [rw] period_min
#   @return [Float, nil]
#
# @!attribute [rw] raan
#   @return [Float, nil]
#
# @!attribute [rw] reference_system
#   @return [String, nil]
#
# @!attribute [rw] regime
#   @return [String, nil]
#
# @!attribute [rw] reused
#   @return [Boolean, nil]
#
# @!attribute [rw] semi_major_axis_km
#   @return [Float, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Payload = Struct.new(
  :apoapsis_km,
  :arg_of_pericenter,
  :customers,
  :eccentricity,
  :epoch,
  :id,
  :inclination_deg,
  :launch,
  :lifespan_years,
  :longitude,
  :manufacturers,
  :mass_kg,
  :mass_lbs,
  :mean_anomaly,
  :mean_motion,
  :name,
  :nationalities,
  :norad_ids,
  :orbit,
  :periapsis_km,
  :period_min,
  :raan,
  :reference_system,
  :regime,
  :reused,
  :semi_major_axis_km,
  :type,
  keyword_init: true
)

# Request payload for Payload#load.
#
# @!attribute [rw] id
#   @return [String]
PayloadLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Payload#list.
#
# @!attribute [rw] apoapsis_km
#   @return [Float, nil]
#
# @!attribute [rw] arg_of_pericenter
#   @return [Float, nil]
#
# @!attribute [rw] customers
#   @return [Array, nil]
#
# @!attribute [rw] eccentricity
#   @return [Float, nil]
#
# @!attribute [rw] epoch
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inclination_deg
#   @return [Float, nil]
#
# @!attribute [rw] launch
#   @return [String, nil]
#
# @!attribute [rw] lifespan_years
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] manufacturers
#   @return [Array, nil]
#
# @!attribute [rw] mass_kg
#   @return [Float, nil]
#
# @!attribute [rw] mass_lbs
#   @return [Float, nil]
#
# @!attribute [rw] mean_anomaly
#   @return [Float, nil]
#
# @!attribute [rw] mean_motion
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nationalities
#   @return [Array, nil]
#
# @!attribute [rw] norad_ids
#   @return [Array, nil]
#
# @!attribute [rw] orbit
#   @return [String, nil]
#
# @!attribute [rw] periapsis_km
#   @return [Float, nil]
#
# @!attribute [rw] period_min
#   @return [Float, nil]
#
# @!attribute [rw] raan
#   @return [Float, nil]
#
# @!attribute [rw] reference_system
#   @return [String, nil]
#
# @!attribute [rw] regime
#   @return [String, nil]
#
# @!attribute [rw] reused
#   @return [Boolean, nil]
#
# @!attribute [rw] semi_major_axis_km
#   @return [Float, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PayloadListMatch = Struct.new(
  :apoapsis_km,
  :arg_of_pericenter,
  :customers,
  :eccentricity,
  :epoch,
  :id,
  :inclination_deg,
  :launch,
  :lifespan_years,
  :longitude,
  :manufacturers,
  :mass_kg,
  :mass_lbs,
  :mean_anomaly,
  :mean_motion,
  :name,
  :nationalities,
  :norad_ids,
  :orbit,
  :periapsis_km,
  :period_min,
  :raan,
  :reference_system,
  :regime,
  :reused,
  :semi_major_axis_km,
  :type,
  keyword_init: true
)

# Roadster entity data model.
#
# @!attribute [rw] apoapsis_au
#   @return [Float, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] earth_distance_km
#   @return [Float, nil]
#
# @!attribute [rw] earth_distance_mi
#   @return [Float, nil]
#
# @!attribute [rw] eccentricity
#   @return [Float, nil]
#
# @!attribute [rw] epoch_jd
#   @return [Float, nil]
#
# @!attribute [rw] flickr_images
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inclination
#   @return [Float, nil]
#
# @!attribute [rw] launch_date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] launch_date_utc
#   @return [String, nil]
#
# @!attribute [rw] launch_mass_kg
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass_lbs
#   @return [Integer, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] mars_distance_km
#   @return [Float, nil]
#
# @!attribute [rw] mars_distance_mi
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] norad_id
#   @return [Integer, nil]
#
# @!attribute [rw] orbit_type
#   @return [String, nil]
#
# @!attribute [rw] periapsis_arg
#   @return [Float, nil]
#
# @!attribute [rw] periapsis_au
#   @return [Float, nil]
#
# @!attribute [rw] period_days
#   @return [Float, nil]
#
# @!attribute [rw] semi_major_axis_au
#   @return [Float, nil]
#
# @!attribute [rw] speed_kph
#   @return [Float, nil]
#
# @!attribute [rw] speed_mph
#   @return [Float, nil]
#
# @!attribute [rw] video
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
Roadster = Struct.new(
  :apoapsis_au,
  :details,
  :earth_distance_km,
  :earth_distance_mi,
  :eccentricity,
  :epoch_jd,
  :flickr_images,
  :id,
  :inclination,
  :launch_date_unix,
  :launch_date_utc,
  :launch_mass_kg,
  :launch_mass_lbs,
  :longitude,
  :mars_distance_km,
  :mars_distance_mi,
  :name,
  :norad_id,
  :orbit_type,
  :periapsis_arg,
  :periapsis_au,
  :period_days,
  :semi_major_axis_au,
  :speed_kph,
  :speed_mph,
  :video,
  :wikipedia,
  keyword_init: true
)

# Request payload for Roadster#list.
#
# @!attribute [rw] apoapsis_au
#   @return [Float, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] earth_distance_km
#   @return [Float, nil]
#
# @!attribute [rw] earth_distance_mi
#   @return [Float, nil]
#
# @!attribute [rw] eccentricity
#   @return [Float, nil]
#
# @!attribute [rw] epoch_jd
#   @return [Float, nil]
#
# @!attribute [rw] flickr_images
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inclination
#   @return [Float, nil]
#
# @!attribute [rw] launch_date_unix
#   @return [Integer, nil]
#
# @!attribute [rw] launch_date_utc
#   @return [String, nil]
#
# @!attribute [rw] launch_mass_kg
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass_lbs
#   @return [Integer, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] mars_distance_km
#   @return [Float, nil]
#
# @!attribute [rw] mars_distance_mi
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] norad_id
#   @return [Integer, nil]
#
# @!attribute [rw] orbit_type
#   @return [String, nil]
#
# @!attribute [rw] periapsis_arg
#   @return [Float, nil]
#
# @!attribute [rw] periapsis_au
#   @return [Float, nil]
#
# @!attribute [rw] period_days
#   @return [Float, nil]
#
# @!attribute [rw] semi_major_axis_au
#   @return [Float, nil]
#
# @!attribute [rw] speed_kph
#   @return [Float, nil]
#
# @!attribute [rw] speed_mph
#   @return [Float, nil]
#
# @!attribute [rw] video
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
RoadsterListMatch = Struct.new(
  :apoapsis_au,
  :details,
  :earth_distance_km,
  :earth_distance_mi,
  :eccentricity,
  :epoch_jd,
  :flickr_images,
  :id,
  :inclination,
  :launch_date_unix,
  :launch_date_utc,
  :launch_mass_kg,
  :launch_mass_lbs,
  :longitude,
  :mars_distance_km,
  :mars_distance_mi,
  :name,
  :norad_id,
  :orbit_type,
  :periapsis_arg,
  :periapsis_au,
  :period_days,
  :semi_major_axis_au,
  :speed_kph,
  :speed_mph,
  :video,
  :wikipedia,
  keyword_init: true
)

# Rocket entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] boosters
#   @return [Integer, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] cost_per_launch
#   @return [Integer, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Hash, nil]
#
# @!attribute [rw] first_flight
#   @return [String, nil]
#
# @!attribute [rw] flickr_images
#   @return [Array, nil]
#
# @!attribute [rw] height
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mass
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stages
#   @return [Integer, nil]
#
# @!attribute [rw] success_rate_pct
#   @return [Float, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
Rocket = Struct.new(
  :active,
  :boosters,
  :company,
  :cost_per_launch,
  :country,
  :description,
  :diameter,
  :first_flight,
  :flickr_images,
  :height,
  :id,
  :mass,
  :name,
  :stages,
  :success_rate_pct,
  :type,
  :wikipedia,
  keyword_init: true
)

# Request payload for Rocket#load.
#
# @!attribute [rw] id
#   @return [String]
RocketLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Rocket#list.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] boosters
#   @return [Integer, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] cost_per_launch
#   @return [Integer, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Hash, nil]
#
# @!attribute [rw] first_flight
#   @return [String, nil]
#
# @!attribute [rw] flickr_images
#   @return [Array, nil]
#
# @!attribute [rw] height
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mass
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stages
#   @return [Integer, nil]
#
# @!attribute [rw] success_rate_pct
#   @return [Float, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wikipedia
#   @return [String, nil]
RocketListMatch = Struct.new(
  :active,
  :boosters,
  :company,
  :cost_per_launch,
  :country,
  :description,
  :diameter,
  :first_flight,
  :flickr_images,
  :height,
  :id,
  :mass,
  :name,
  :stages,
  :success_rate_pct,
  :type,
  :wikipedia,
  keyword_init: true
)

# Ship entity data model.
#
# @!attribute [rw] abs
#   @return [Integer, nil]
#
# @!attribute [rw] class
#   @return [Integer, nil]
#
# @!attribute [rw] course_deg
#   @return [Float, nil]
#
# @!attribute [rw] home_port
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] imo
#   @return [Integer, nil]
#
# @!attribute [rw] last_ais_update
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] legacy_id
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] mass_kg
#   @return [Integer, nil]
#
# @!attribute [rw] mass_lbs
#   @return [Integer, nil]
#
# @!attribute [rw] mmsi
#   @return [Integer, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] roles
#   @return [Array, nil]
#
# @!attribute [rw] speed_kn
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year_built
#   @return [Integer, nil]
Ship = Struct.new(
  :abs,
  :class,
  :course_deg,
  :home_port,
  :id,
  :image,
  :imo,
  :last_ais_update,
  :latitude,
  :launches,
  :legacy_id,
  :link,
  :longitude,
  :mass_kg,
  :mass_lbs,
  :mmsi,
  :model,
  :name,
  :roles,
  :speed_kn,
  :status,
  :type,
  :year_built,
  keyword_init: true
)

# Request payload for Ship#load.
#
# @!attribute [rw] id
#   @return [String]
ShipLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Ship#list.
#
# @!attribute [rw] abs
#   @return [Integer, nil]
#
# @!attribute [rw] class
#   @return [Integer, nil]
#
# @!attribute [rw] course_deg
#   @return [Float, nil]
#
# @!attribute [rw] home_port
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] imo
#   @return [Integer, nil]
#
# @!attribute [rw] last_ais_update
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launches
#   @return [Array, nil]
#
# @!attribute [rw] legacy_id
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] mass_kg
#   @return [Integer, nil]
#
# @!attribute [rw] mass_lbs
#   @return [Integer, nil]
#
# @!attribute [rw] mmsi
#   @return [Integer, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] roles
#   @return [Array, nil]
#
# @!attribute [rw] speed_kn
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year_built
#   @return [Integer, nil]
ShipListMatch = Struct.new(
  :abs,
  :class,
  :course_deg,
  :home_port,
  :id,
  :image,
  :imo,
  :last_ais_update,
  :latitude,
  :launches,
  :legacy_id,
  :link,
  :longitude,
  :mass_kg,
  :mass_lbs,
  :mmsi,
  :model,
  :name,
  :roles,
  :speed_kn,
  :status,
  :type,
  :year_built,
  keyword_init: true
)

# Starlink entity data model.
#
# @!attribute [rw] height_km
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launch
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] spaceTrack
#   @return [Hash, nil]
#
# @!attribute [rw] velocity_kms
#   @return [Float, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Starlink = Struct.new(
  :height_km,
  :id,
  :latitude,
  :launch,
  :longitude,
  :spaceTrack,
  :velocity_kms,
  :version,
  keyword_init: true
)

# Request payload for Starlink#load.
#
# @!attribute [rw] id
#   @return [String]
StarlinkLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Starlink#list.
#
# @!attribute [rw] height_km
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] launch
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] spaceTrack
#   @return [Hash, nil]
#
# @!attribute [rw] velocity_kms
#   @return [Float, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
StarlinkListMatch = Struct.new(
  :height_km,
  :id,
  :latitude,
  :launch,
  :longitude,
  :spaceTrack,
  :velocity_kms,
  :version,
  keyword_init: true
)

