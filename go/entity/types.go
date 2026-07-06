// Typed models for the SpacexRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Capsule is the typed data model for the capsule entity.
type Capsule struct {
	Id *string `json:"id,omitempty"`
	LandLanding *int `json:"land_landing,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	ReuseCount *int `json:"reuse_count,omitempty"`
	Serial *string `json:"serial,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	WaterLanding *int `json:"water_landing,omitempty"`
}

// CapsuleLoadMatch is the typed request payload for Capsule.LoadTyped.
type CapsuleLoadMatch struct {
	Id string `json:"id"`
}

// CapsuleListMatch is the typed request payload for Capsule.ListTyped.
type CapsuleListMatch struct {
	Id *string `json:"id,omitempty"`
	LandLanding *int `json:"land_landing,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	ReuseCount *int `json:"reuse_count,omitempty"`
	Serial *string `json:"serial,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	WaterLanding *int `json:"water_landing,omitempty"`
}

// Core is the typed data model for the core entity.
type Core struct {
	AsdsAttempt *int `json:"asds_attempt,omitempty"`
	AsdsLanding *int `json:"asds_landing,omitempty"`
	Block *int `json:"block,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	ReuseCount *int `json:"reuse_count,omitempty"`
	RtlsAttempt *int `json:"rtls_attempt,omitempty"`
	RtlsLanding *int `json:"rtls_landing,omitempty"`
	Serial *string `json:"serial,omitempty"`
	Status *string `json:"status,omitempty"`
}

// CoreLoadMatch is the typed request payload for Core.LoadTyped.
type CoreLoadMatch struct {
	Id string `json:"id"`
}

// CoreListMatch is the typed request payload for Core.ListTyped.
type CoreListMatch struct {
	AsdsAttempt *int `json:"asds_attempt,omitempty"`
	AsdsLanding *int `json:"asds_landing,omitempty"`
	Block *int `json:"block,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	ReuseCount *int `json:"reuse_count,omitempty"`
	RtlsAttempt *int `json:"rtls_attempt,omitempty"`
	RtlsLanding *int `json:"rtls_landing,omitempty"`
	Serial *string `json:"serial,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Crew is the typed data model for the crew entity.
type Crew struct {
	Agency *string `json:"agency,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// CrewLoadMatch is the typed request payload for Crew.LoadTyped.
type CrewLoadMatch struct {
	Id string `json:"id"`
}

// CrewListMatch is the typed request payload for Crew.ListTyped.
type CrewListMatch struct {
	Agency *string `json:"agency,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// Landpad is the typed data model for the landpad entity.
type Landpad struct {
	Detail *string `json:"detail,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Id *string `json:"id,omitempty"`
	LandingAttempt *int `json:"landing_attempt,omitempty"`
	LandingSuccess *int `json:"landing_success,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// LandpadLoadMatch is the typed request payload for Landpad.LoadTyped.
type LandpadLoadMatch struct {
	Id string `json:"id"`
}

// LandpadListMatch is the typed request payload for Landpad.ListTyped.
type LandpadListMatch struct {
	Detail *string `json:"detail,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Id *string `json:"id,omitempty"`
	LandingAttempt *int `json:"landing_attempt,omitempty"`
	LandingSuccess *int `json:"landing_success,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// Launch is the typed data model for the launch entity.
type Launch struct {
	AutoUpdate *bool `json:"auto_update,omitempty"`
	Capsule *[]any `json:"capsule,omitempty"`
	Core *[]any `json:"core,omitempty"`
	Crew *[]any `json:"crew,omitempty"`
	DateLocal *string `json:"date_local,omitempty"`
	DatePrecision *string `json:"date_precision,omitempty"`
	DateUnix *int `json:"date_unix,omitempty"`
	DateUtc *string `json:"date_utc,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Failure *[]any `json:"failure,omitempty"`
	Fairing *map[string]any `json:"fairing,omitempty"`
	Flight *int `json:"flight,omitempty"`
	FlightNumber *int `json:"flight_number,omitempty"`
	Gridfin *bool `json:"gridfin,omitempty"`
	Id *string `json:"id,omitempty"`
	LandingAttempt *bool `json:"landing_attempt,omitempty"`
	LandingSuccess *bool `json:"landing_success,omitempty"`
	LandingType *string `json:"landing_type,omitempty"`
	Landpad *string `json:"landpad,omitempty"`
	Launchpad *string `json:"launchpad,omitempty"`
	Leg *bool `json:"leg,omitempty"`
	Link *map[string]any `json:"link,omitempty"`
	Name *string `json:"name,omitempty"`
	Net *bool `json:"net,omitempty"`
	Payload *[]any `json:"payload,omitempty"`
	Reused *bool `json:"reused,omitempty"`
	Rocket *string `json:"rocket,omitempty"`
	Ship *[]any `json:"ship,omitempty"`
	StaticFireDateUnix *int `json:"static_fire_date_unix,omitempty"`
	StaticFireDateUtc *string `json:"static_fire_date_utc,omitempty"`
	Success *bool `json:"success,omitempty"`
	Tdb *bool `json:"tdb,omitempty"`
	Upcoming *bool `json:"upcoming,omitempty"`
	Window *int `json:"window,omitempty"`
}

// LaunchLoadMatch is the typed request payload for Launch.LoadTyped.
type LaunchLoadMatch struct {
	Id string `json:"id"`
}

// LaunchListMatch is the typed request payload for Launch.ListTyped.
type LaunchListMatch struct {
	AutoUpdate *bool `json:"auto_update,omitempty"`
	Capsule *[]any `json:"capsule,omitempty"`
	Core *[]any `json:"core,omitempty"`
	Crew *[]any `json:"crew,omitempty"`
	DateLocal *string `json:"date_local,omitempty"`
	DatePrecision *string `json:"date_precision,omitempty"`
	DateUnix *int `json:"date_unix,omitempty"`
	DateUtc *string `json:"date_utc,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Failure *[]any `json:"failure,omitempty"`
	Fairing *map[string]any `json:"fairing,omitempty"`
	Flight *int `json:"flight,omitempty"`
	FlightNumber *int `json:"flight_number,omitempty"`
	Gridfin *bool `json:"gridfin,omitempty"`
	Id *string `json:"id,omitempty"`
	LandingAttempt *bool `json:"landing_attempt,omitempty"`
	LandingSuccess *bool `json:"landing_success,omitempty"`
	LandingType *string `json:"landing_type,omitempty"`
	Landpad *string `json:"landpad,omitempty"`
	Launchpad *string `json:"launchpad,omitempty"`
	Leg *bool `json:"leg,omitempty"`
	Link *map[string]any `json:"link,omitempty"`
	Name *string `json:"name,omitempty"`
	Net *bool `json:"net,omitempty"`
	Payload *[]any `json:"payload,omitempty"`
	Reused *bool `json:"reused,omitempty"`
	Rocket *string `json:"rocket,omitempty"`
	Ship *[]any `json:"ship,omitempty"`
	StaticFireDateUnix *int `json:"static_fire_date_unix,omitempty"`
	StaticFireDateUtc *string `json:"static_fire_date_utc,omitempty"`
	Success *bool `json:"success,omitempty"`
	Tdb *bool `json:"tdb,omitempty"`
	Upcoming *bool `json:"upcoming,omitempty"`
	Window *int `json:"window,omitempty"`
}

// Launchpad is the typed data model for the launchpad entity.
type Launchpad struct {
	Detail *string `json:"detail,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	LaunchAttempt *int `json:"launch_attempt,omitempty"`
	LaunchSuccess *int `json:"launch_success,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Rocket *[]any `json:"rocket,omitempty"`
	Status *string `json:"status,omitempty"`
}

// LaunchpadLoadMatch is the typed request payload for Launchpad.LoadTyped.
type LaunchpadLoadMatch struct {
	Id string `json:"id"`
}

// LaunchpadListMatch is the typed request payload for Launchpad.ListTyped.
type LaunchpadListMatch struct {
	Detail *string `json:"detail,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	LaunchAttempt *int `json:"launch_attempt,omitempty"`
	LaunchSuccess *int `json:"launch_success,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Rocket *[]any `json:"rocket,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Payload is the typed data model for the payload entity.
type Payload struct {
	ApoapsisKm *float64 `json:"apoapsis_km,omitempty"`
	ArgOfPericenter *float64 `json:"arg_of_pericenter,omitempty"`
	Customer *[]any `json:"customer,omitempty"`
	Eccentricity *float64 `json:"eccentricity,omitempty"`
	Epoch *string `json:"epoch,omitempty"`
	Id *string `json:"id,omitempty"`
	InclinationDeg *float64 `json:"inclination_deg,omitempty"`
	Launch *string `json:"launch,omitempty"`
	LifespanYear *float64 `json:"lifespan_year,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Manufacturer *[]any `json:"manufacturer,omitempty"`
	MassKg *float64 `json:"mass_kg,omitempty"`
	MassLb *float64 `json:"mass_lb,omitempty"`
	MeanAnomaly *float64 `json:"mean_anomaly,omitempty"`
	MeanMotion *float64 `json:"mean_motion,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *[]any `json:"nationality,omitempty"`
	NoradId *[]any `json:"norad_id,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	PeriapsisKm *float64 `json:"periapsis_km,omitempty"`
	PeriodMin *float64 `json:"period_min,omitempty"`
	Raan *float64 `json:"raan,omitempty"`
	ReferenceSystem *string `json:"reference_system,omitempty"`
	Regime *string `json:"regime,omitempty"`
	Reused *bool `json:"reused,omitempty"`
	SemiMajorAxisKm *float64 `json:"semi_major_axis_km,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PayloadLoadMatch is the typed request payload for Payload.LoadTyped.
type PayloadLoadMatch struct {
	Id string `json:"id"`
}

// PayloadListMatch is the typed request payload for Payload.ListTyped.
type PayloadListMatch struct {
	ApoapsisKm *float64 `json:"apoapsis_km,omitempty"`
	ArgOfPericenter *float64 `json:"arg_of_pericenter,omitempty"`
	Customer *[]any `json:"customer,omitempty"`
	Eccentricity *float64 `json:"eccentricity,omitempty"`
	Epoch *string `json:"epoch,omitempty"`
	Id *string `json:"id,omitempty"`
	InclinationDeg *float64 `json:"inclination_deg,omitempty"`
	Launch *string `json:"launch,omitempty"`
	LifespanYear *float64 `json:"lifespan_year,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Manufacturer *[]any `json:"manufacturer,omitempty"`
	MassKg *float64 `json:"mass_kg,omitempty"`
	MassLb *float64 `json:"mass_lb,omitempty"`
	MeanAnomaly *float64 `json:"mean_anomaly,omitempty"`
	MeanMotion *float64 `json:"mean_motion,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *[]any `json:"nationality,omitempty"`
	NoradId *[]any `json:"norad_id,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	PeriapsisKm *float64 `json:"periapsis_km,omitempty"`
	PeriodMin *float64 `json:"period_min,omitempty"`
	Raan *float64 `json:"raan,omitempty"`
	ReferenceSystem *string `json:"reference_system,omitempty"`
	Regime *string `json:"regime,omitempty"`
	Reused *bool `json:"reused,omitempty"`
	SemiMajorAxisKm *float64 `json:"semi_major_axis_km,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Roadster is the typed data model for the roadster entity.
type Roadster struct {
	ApoapsisAu *float64 `json:"apoapsis_au,omitempty"`
	Detail *string `json:"detail,omitempty"`
	EarthDistanceKm *float64 `json:"earth_distance_km,omitempty"`
	EarthDistanceMi *float64 `json:"earth_distance_mi,omitempty"`
	Eccentricity *float64 `json:"eccentricity,omitempty"`
	EpochJd *float64 `json:"epoch_jd,omitempty"`
	FlickrImage *[]any `json:"flickr_image,omitempty"`
	Id *string `json:"id,omitempty"`
	Inclination *float64 `json:"inclination,omitempty"`
	LaunchDateUnix *int `json:"launch_date_unix,omitempty"`
	LaunchDateUtc *string `json:"launch_date_utc,omitempty"`
	LaunchMassKg *int `json:"launch_mass_kg,omitempty"`
	LaunchMassLb *int `json:"launch_mass_lb,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MarsDistanceKm *float64 `json:"mars_distance_km,omitempty"`
	MarsDistanceMi *float64 `json:"mars_distance_mi,omitempty"`
	Name *string `json:"name,omitempty"`
	NoradId *int `json:"norad_id,omitempty"`
	OrbitType *string `json:"orbit_type,omitempty"`
	PeriapsisArg *float64 `json:"periapsis_arg,omitempty"`
	PeriapsisAu *float64 `json:"periapsis_au,omitempty"`
	PeriodDay *float64 `json:"period_day,omitempty"`
	SemiMajorAxisAu *float64 `json:"semi_major_axis_au,omitempty"`
	SpeedKph *float64 `json:"speed_kph,omitempty"`
	SpeedMph *float64 `json:"speed_mph,omitempty"`
	Video *string `json:"video,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// RoadsterListMatch is the typed request payload for Roadster.ListTyped.
type RoadsterListMatch struct {
	ApoapsisAu *float64 `json:"apoapsis_au,omitempty"`
	Detail *string `json:"detail,omitempty"`
	EarthDistanceKm *float64 `json:"earth_distance_km,omitempty"`
	EarthDistanceMi *float64 `json:"earth_distance_mi,omitempty"`
	Eccentricity *float64 `json:"eccentricity,omitempty"`
	EpochJd *float64 `json:"epoch_jd,omitempty"`
	FlickrImage *[]any `json:"flickr_image,omitempty"`
	Id *string `json:"id,omitempty"`
	Inclination *float64 `json:"inclination,omitempty"`
	LaunchDateUnix *int `json:"launch_date_unix,omitempty"`
	LaunchDateUtc *string `json:"launch_date_utc,omitempty"`
	LaunchMassKg *int `json:"launch_mass_kg,omitempty"`
	LaunchMassLb *int `json:"launch_mass_lb,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MarsDistanceKm *float64 `json:"mars_distance_km,omitempty"`
	MarsDistanceMi *float64 `json:"mars_distance_mi,omitempty"`
	Name *string `json:"name,omitempty"`
	NoradId *int `json:"norad_id,omitempty"`
	OrbitType *string `json:"orbit_type,omitempty"`
	PeriapsisArg *float64 `json:"periapsis_arg,omitempty"`
	PeriapsisAu *float64 `json:"periapsis_au,omitempty"`
	PeriodDay *float64 `json:"period_day,omitempty"`
	SemiMajorAxisAu *float64 `json:"semi_major_axis_au,omitempty"`
	SpeedKph *float64 `json:"speed_kph,omitempty"`
	SpeedMph *float64 `json:"speed_mph,omitempty"`
	Video *string `json:"video,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// Rocket is the typed data model for the rocket entity.
type Rocket struct {
	Active *bool `json:"active,omitempty"`
	Booster *int `json:"booster,omitempty"`
	Company *string `json:"company,omitempty"`
	CostPerLaunch *int `json:"cost_per_launch,omitempty"`
	Country *string `json:"country,omitempty"`
	Description *string `json:"description,omitempty"`
	Diameter *map[string]any `json:"diameter,omitempty"`
	FirstFlight *string `json:"first_flight,omitempty"`
	FlickrImage *[]any `json:"flickr_image,omitempty"`
	Height *map[string]any `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Mass *map[string]any `json:"mass,omitempty"`
	Name *string `json:"name,omitempty"`
	Stage *int `json:"stage,omitempty"`
	SuccessRatePct *float64 `json:"success_rate_pct,omitempty"`
	Type *string `json:"type,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// RocketLoadMatch is the typed request payload for Rocket.LoadTyped.
type RocketLoadMatch struct {
	Id string `json:"id"`
}

// RocketListMatch is the typed request payload for Rocket.ListTyped.
type RocketListMatch struct {
	Active *bool `json:"active,omitempty"`
	Booster *int `json:"booster,omitempty"`
	Company *string `json:"company,omitempty"`
	CostPerLaunch *int `json:"cost_per_launch,omitempty"`
	Country *string `json:"country,omitempty"`
	Description *string `json:"description,omitempty"`
	Diameter *map[string]any `json:"diameter,omitempty"`
	FirstFlight *string `json:"first_flight,omitempty"`
	FlickrImage *[]any `json:"flickr_image,omitempty"`
	Height *map[string]any `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Mass *map[string]any `json:"mass,omitempty"`
	Name *string `json:"name,omitempty"`
	Stage *int `json:"stage,omitempty"`
	SuccessRatePct *float64 `json:"success_rate_pct,omitempty"`
	Type *string `json:"type,omitempty"`
	Wikipedia *string `json:"wikipedia,omitempty"`
}

// Ship is the typed data model for the ship entity.
type Ship struct {
	Abs *int `json:"abs,omitempty"`
	Class *int `json:"class,omitempty"`
	CourseDeg *float64 `json:"course_deg,omitempty"`
	HomePort *string `json:"home_port,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Imo *int `json:"imo,omitempty"`
	LastAisUpdate *string `json:"last_ais_update,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	LegacyId *string `json:"legacy_id,omitempty"`
	Link *string `json:"link,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MassKg *int `json:"mass_kg,omitempty"`
	MassLb *int `json:"mass_lb,omitempty"`
	Mmsi *int `json:"mmsi,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *[]any `json:"role,omitempty"`
	SpeedKn *float64 `json:"speed_kn,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	YearBuilt *int `json:"year_built,omitempty"`
}

// ShipLoadMatch is the typed request payload for Ship.LoadTyped.
type ShipLoadMatch struct {
	Id string `json:"id"`
}

// ShipListMatch is the typed request payload for Ship.ListTyped.
type ShipListMatch struct {
	Abs *int `json:"abs,omitempty"`
	Class *int `json:"class,omitempty"`
	CourseDeg *float64 `json:"course_deg,omitempty"`
	HomePort *string `json:"home_port,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Imo *int `json:"imo,omitempty"`
	LastAisUpdate *string `json:"last_ais_update,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *[]any `json:"launch,omitempty"`
	LegacyId *string `json:"legacy_id,omitempty"`
	Link *string `json:"link,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MassKg *int `json:"mass_kg,omitempty"`
	MassLb *int `json:"mass_lb,omitempty"`
	Mmsi *int `json:"mmsi,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *[]any `json:"role,omitempty"`
	SpeedKn *float64 `json:"speed_kn,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	YearBuilt *int `json:"year_built,omitempty"`
}

// Starlink is the typed data model for the starlink entity.
type Starlink struct {
	HeightKm *float64 `json:"height_km,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *string `json:"launch,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	SpaceTrack *map[string]any `json:"space_track,omitempty"`
	VelocityKm *float64 `json:"velocity_km,omitempty"`
	Version *string `json:"version,omitempty"`
}

// StarlinkLoadMatch is the typed request payload for Starlink.LoadTyped.
type StarlinkLoadMatch struct {
	Id string `json:"id"`
}

// StarlinkListMatch is the typed request payload for Starlink.ListTyped.
type StarlinkListMatch struct {
	HeightKm *float64 `json:"height_km,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Launch *string `json:"launch,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	SpaceTrack *map[string]any `json:"space_track,omitempty"`
	VelocityKm *float64 `json:"velocity_km,omitempty"`
	Version *string `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
