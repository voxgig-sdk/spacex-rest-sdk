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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "land_landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "last_update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reuse_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "serial",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "water_landings",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "asds_landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "block",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reuse_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rtls_attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rtls_landings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "serial",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landing_attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "landing_successes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
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
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "capsules",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "core",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cores",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "crew",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "date_local",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_precision",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_unix",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date_utc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "failures",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fairings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "flight",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "flight_number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "gridfins",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landing_attempt",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "landing_success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "landing_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "landpad",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launchpad",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legs",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "net",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "payloads",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "reused",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "rocket",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ships",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "static_fire_date_unix",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "static_fire_date_utc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tdb",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "upcoming",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "window",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch_attempts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_successes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rockets",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "arg_of_pericenter",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "customers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "eccentricity",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "epoch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inclination_deg",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lifespan_years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "manufacturers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "mass_kg",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mass_lbs",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean_anomaly",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean_motion",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nationalities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "norad_ids",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "orbit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "periapsis_km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "period_min",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "raan",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "reference_system",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reused",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "semi_major_axis_km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "type",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "details",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "earth_distance_km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "earth_distance_mi",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "eccentricity",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "epoch_jd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "flickr_images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inclination",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch_date_unix",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_date_utc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launch_mass_kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_mass_lbs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mars_distance_km",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mars_distance_mi",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "norad_id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "orbit_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "periapsis_arg",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "periapsis_au",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "period_days",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "semi_major_axis_au",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "speed_kph",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "speed_mph",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wikipedia",
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
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "boosters",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_per_launch",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mass",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "success_rate_pct",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "type",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "course_deg",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "home_port",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "imo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "last_ais_update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "legacy_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mass_kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mass_lbs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mmsi",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "roles",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "speed_kn",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year_built",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "spaceTrack",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "velocity_kms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "version",
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
