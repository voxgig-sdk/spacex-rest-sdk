package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SpacexRest",
			"slug": "spacex-rest",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.spacexdata.com/v5",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"capsule": map[string]any{},
				"core": map[string]any{},
				"crew": map[string]any{},
				"landpad": map[string]any{},
				"launch": map[string]any{},
				"launchpad": map[string]any{},
				"payload": map[string]any{},
				"roadster": map[string]any{},
				"rocket": map[string]any{},
				"ship": map[string]any{},
				"starlink": map[string]any{},
			},
		},
		"entity": map[string]any{
			"capsule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Capsule serial number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "land_landings",
						"short": "Number of land landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "last_update",
						"short": "Last update about the capsule",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reuse_count",
						"short": "Number of times capsule has been reused",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "serial",
						"short": "Capsule serial number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Capsule status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Capsule type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "water_landings",
						"short": "Number of water landings",
						"type": "`$INTEGER`",
					},
				},
				"name": "capsule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/capsules",
								"parts": []any{
									"capsules",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/capsules/{id}",
								"parts": []any{
									"capsules",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"core": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asds_attempts",
						"short": "Number of autonomous spaceport drone ship landing attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "asds_landings",
						"short": "Number of successful ASDS landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "block",
						"short": "Core block number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Core serial number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_update",
						"short": "Last update about the core",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reuse_count",
						"short": "Number of times core has been reused",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rtls_attempts",
						"short": "Number of return to launch site attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rtls_landings",
						"short": "Number of successful RTLS landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "serial",
						"short": "Core serial number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Core status (active, inactive, unknown, expended, lost, retired)",
						"type": "`$STRING`",
					},
				},
				"name": "core",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/cores",
								"parts": []any{
									"cores",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cores/{id}",
								"parts": []any{
									"cores",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"crew": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agency",
						"short": "Agency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Crew member ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "Image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Crew member name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Status (active, inactive, retired, unknown)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
						"short": "Wikipedia URL",
						"type": "`$STRING`",
					},
				},
				"name": "crew",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/crew",
								"parts": []any{
									"crew",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/crew/{id}",
								"parts": []any{
									"crew",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"landpad": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "details",
						"short": "Landing pad details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_name",
						"short": "Full landing pad name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Landing pad ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landing_attempts",
						"short": "Number of landing attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "landing_successes",
						"short": "Number of successful landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "locality",
						"short": "Locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Landing pad name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Landing pad status (active, inactive, unknown, retired, lost, under construction)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Landing pad type (ASDS, RTLS)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
						"short": "Wikipedia URL",
						"type": "`$STRING`",
					},
				},
				"name": "landpad",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/landpads",
								"parts": []any{
									"landpads",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/landpads/{id}",
								"parts": []any{
									"landpads",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"launch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auto_update",
						"short": "Whether the launch data is automatically updated",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "capsules",
						"short": "Capsule IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "core",
						"short": "Core ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cores",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "crew",
						"short": "Crew member IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "date_local",
						"short": "Launch date in local time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_precision",
						"short": "Date precision (hour, day, month, quarter, half, year)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_unix",
						"short": "Launch date in unix timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date_utc",
						"short": "Launch date in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "details",
						"short": "Launch details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "failures",
						"short": "Launch failures",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fairings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "flight",
						"short": "Core flight number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "flight_number",
						"short": "Flight number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "gridfins",
						"short": "Whether core has grid fins",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "Launch ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landing_attempt",
						"short": "Whether landing was attempted",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "landing_success",
						"short": "Whether landing was successful",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "landing_type",
						"short": "Landing type (ASDS, RTLS, Ocean)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landpad",
						"short": "Landing pad ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launchpad",
						"short": "Launchpad ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legs",
						"short": "Whether core has legs",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"short": "Launch name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "net",
						"short": "No earlier than",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "payloads",
						"short": "Payload IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reused",
						"short": "Whether core was reused",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "rocket",
						"short": "Rocket ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ships",
						"short": "Ship IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "static_fire_date_unix",
						"short": "Static fire date in unix timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "static_fire_date_utc",
						"short": "Static fire date in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"short": "Launch success status",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tdb",
						"short": "To be determined",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "upcoming",
						"short": "Whether the launch is upcoming",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "window",
						"short": "Launch window in seconds",
						"type": "`$INTEGER`",
					},
				},
				"name": "launch",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/launches",
								"parts": []any{
									"launches",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/launches/latest",
								"parts": []any{
									"launches",
									"latest",
								},
								"select": map[string]any{
									"$action": "latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/launches/past",
								"parts": []any{
									"launches",
									"past",
								},
								"select": map[string]any{
									"$action": "past",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/launches/upcoming",
								"parts": []any{
									"launches",
									"upcoming",
								},
								"select": map[string]any{
									"$action": "upcoming",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/launches/{id}",
								"parts": []any{
									"launches",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"launchpad": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "details",
						"short": "Launchpad details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_name",
						"short": "Full launchpad name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Launchpad ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch_attempts",
						"short": "Number of launch attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_successes",
						"short": "Number of successful launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "locality",
						"short": "Locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Launchpad name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rockets",
						"short": "Rocket IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"short": "Launchpad status (active, inactive, unknown, retired, lost, under construction)",
						"type": "`$STRING`",
					},
				},
				"name": "launchpad",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/launchpads",
								"parts": []any{
									"launchpads",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/launchpads/{id}",
								"parts": []any{
									"launchpads",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"payload": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "apoapsis_km",
						"short": "Apoapsis in km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "arg_of_pericenter",
						"short": "Argument of pericenter",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "customers",
						"short": "Customers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "eccentricity",
						"short": "Eccentricity",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "epoch",
						"short": "Epoch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Payload ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inclination_deg",
						"short": "Inclination in degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch",
						"short": "Launch ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lifespan_years",
						"short": "Lifespan in years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "manufacturers",
						"short": "Manufacturers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "mass_kg",
						"short": "Payload mass in kilograms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mass_lbs",
						"short": "Payload mass in pounds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean_anomaly",
						"short": "Mean anomaly",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean_motion",
						"short": "Mean motion",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Payload name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nationalities",
						"short": "Nationalities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "norad_ids",
						"short": "NORAD IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "orbit",
						"short": "Orbit type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "periapsis_km",
						"short": "Periapsis in km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "period_min",
						"short": "Orbital period in minutes",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "raan",
						"short": "Right ascension of the ascending node",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "reference_system",
						"short": "Reference system",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regime",
						"short": "Orbit regime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reused",
						"short": "Whether the payload was reused",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "semi_major_axis_km",
						"short": "Semi-major axis in km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "type",
						"short": "Payload type",
						"type": "`$STRING`",
					},
				},
				"name": "payload",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/payloads",
								"parts": []any{
									"payloads",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payloads/{id}",
								"parts": []any{
									"payloads",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"roadster": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "apoapsis_au",
						"short": "Apoapsis in AU",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "details",
						"short": "Details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "earth_distance_km",
						"short": "Distance from Earth in km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "earth_distance_mi",
						"short": "Distance from Earth in miles",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "eccentricity",
						"short": "Eccentricity",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "epoch_jd",
						"short": "Epoch in Julian Date",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "flickr_images",
						"short": "Flickr images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Roadster ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inclination",
						"short": "Inclination",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch_date_unix",
						"short": "Launch date in unix timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_date_utc",
						"short": "Launch date in UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launch_mass_kg",
						"short": "Launch mass in kilograms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_mass_lbs",
						"short": "Launch mass in pounds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mars_distance_km",
						"short": "Distance from Mars in km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mars_distance_mi",
						"short": "Distance from Mars in miles",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Roadster name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "norad_id",
						"short": "NORAD ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "orbit_type",
						"short": "Orbit type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "periapsis_arg",
						"short": "Argument of periapsis",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "periapsis_au",
						"short": "Periapsis in AU",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "period_days",
						"short": "Orbital period in days",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "semi_major_axis_au",
						"short": "Semi-major axis in AU",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "speed_kph",
						"short": "Speed in km/h",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "speed_mph",
						"short": "Speed in mph",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "video",
						"short": "Video URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
						"short": "Wikipedia URL",
						"type": "`$STRING`",
					},
				},
				"name": "roadster",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/roadster",
								"parts": []any{
									"roadster",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.flickr_images`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rocket": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"short": "Whether the rocket is active",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "boosters",
						"short": "Number of boosters",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "company",
						"short": "Company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_per_launch",
						"short": "Cost per launch in USD",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country",
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "first_flight",
						"short": "Date of first flight",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flickr_images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "height",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Rocket ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mass",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"short": "Rocket name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stages",
						"short": "Number of stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "success_rate_pct",
						"short": "Success rate percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "type",
						"short": "Rocket type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
						"type": "`$STRING`",
					},
				},
				"name": "rocket",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rockets",
								"parts": []any{
									"rockets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/rockets/{id}",
								"parts": []any{
									"rockets",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ship": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abs",
						"short": "ABS number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "class",
						"short": "Ship class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "course_deg",
						"short": "Course in degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "home_port",
						"short": "Home port",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Ship ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "Image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "imo",
						"short": "IMO number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "last_ais_update",
						"short": "Last AIS update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launches",
						"short": "Launch IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "legacy_id",
						"short": "Legacy ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"short": "Link to ship info",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mass_kg",
						"short": "Mass in kilograms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mass_lbs",
						"short": "Mass in pounds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mmsi",
						"short": "MMSI number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "model",
						"short": "Ship model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Ship name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "roles",
						"short": "Ship roles",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "speed_kn",
						"short": "Speed in knots",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "status",
						"short": "Ship status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Ship type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year_built",
						"short": "Year built",
						"type": "`$INTEGER`",
					},
				},
				"name": "ship",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ships",
								"parts": []any{
									"ships",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ships/{id}",
								"parts": []any{
									"ships",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"starlink": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "height_km",
						"short": "Current height in kilometers",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"short": "Starlink satellite ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Current latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch",
						"short": "Launch ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Current longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "spaceTrack",
						"short": "Space-Track.org data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "velocity_kms",
						"short": "Current velocity in km/s",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "version",
						"short": "Satellite version",
						"type": "`$STRING`",
					},
				},
				"name": "starlink",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/starlink",
								"parts": []any{
									"starlink",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/starlink/{id}",
								"parts": []any{
									"starlink",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.spaceTrack`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
