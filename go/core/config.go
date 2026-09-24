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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Id",
						"type": "`$STRING`",
						"short": "Capsule serial number",
					},
					map[string]any{
						"name": "land_landings",
						"title": "Land Landings",
						"type": "`$INTEGER`",
						"short": "Number of land landings",
					},
					map[string]any{
						"name": "last_update",
						"title": "Last Update",
						"type": "`$STRING`",
						"short": "Last update about the capsule",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "reuse_count",
						"title": "Reuse Count",
						"type": "`$INTEGER`",
						"short": "Number of times capsule has been reused",
					},
					map[string]any{
						"name": "serial",
						"title": "Serial",
						"type": "`$STRING`",
						"short": "Capsule serial number",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Capsule status",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Capsule type",
					},
					map[string]any{
						"name": "water_landings",
						"title": "Water Landings",
						"type": "`$INTEGER`",
						"short": "Number of water landings",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "capsule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/capsules",
								"segments": []any{
									map[string]any{
										"lit": "capsules",
									},
								},
								"parts": []any{
									"capsules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/capsules/{id}",
								"segments": []any{
									map[string]any{
										"lit": "capsules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"capsules",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Asds Attempts",
						"type": "`$INTEGER`",
						"short": "Number of autonomous spaceport drone ship landing attempts",
					},
					map[string]any{
						"name": "asds_landings",
						"title": "Asds Landings",
						"type": "`$INTEGER`",
						"short": "Number of successful ASDS landings",
					},
					map[string]any{
						"name": "block",
						"title": "Block",
						"type": "`$INTEGER`",
						"short": "Core block number",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Core serial number",
					},
					map[string]any{
						"name": "last_update",
						"title": "Last Update",
						"type": "`$STRING`",
						"short": "Last update about the core",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "reuse_count",
						"title": "Reuse Count",
						"type": "`$INTEGER`",
						"short": "Number of times core has been reused",
					},
					map[string]any{
						"name": "rtls_attempts",
						"title": "Rtls Attempts",
						"type": "`$INTEGER`",
						"short": "Number of return to launch site attempts",
					},
					map[string]any{
						"name": "rtls_landings",
						"title": "Rtls Landings",
						"type": "`$INTEGER`",
						"short": "Number of successful RTLS landings",
					},
					map[string]any{
						"name": "serial",
						"title": "Serial",
						"type": "`$STRING`",
						"short": "Core serial number",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Core status (active, inactive, unknown, expended, lost, retired)",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "core",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cores",
								"segments": []any{
									map[string]any{
										"lit": "cores",
									},
								},
								"parts": []any{
									"cores",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cores/{id}",
								"segments": []any{
									map[string]any{
										"lit": "cores",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cores",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Agency",
						"type": "`$STRING`",
						"short": "Agency",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Crew member ID",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "Image URL",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Crew member name",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Status (active, inactive, retired, unknown)",
					},
					map[string]any{
						"name": "wikipedia",
						"title": "Wikipedia",
						"type": "`$STRING`",
						"short": "Wikipedia URL",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "crew",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/crew",
								"segments": []any{
									map[string]any{
										"lit": "crew",
									},
								},
								"parts": []any{
									"crew",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/crew/{id}",
								"segments": []any{
									map[string]any{
										"lit": "crew",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"crew",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Details",
						"type": "`$STRING`",
						"short": "Landing pad details",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"short": "Full landing pad name",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Landing pad ID",
					},
					map[string]any{
						"name": "landing_attempts",
						"title": "Landing Attempts",
						"type": "`$INTEGER`",
						"short": "Number of landing attempts",
					},
					map[string]any{
						"name": "landing_successes",
						"title": "Landing Successes",
						"type": "`$INTEGER`",
						"short": "Number of successful landings",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "locality",
						"title": "Locality",
						"type": "`$STRING`",
						"short": "Locality",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Landing pad name",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"short": "Region",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Landing pad status (active, inactive, unknown, retired, lost, under construction)",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Landing pad type (ASDS, RTLS)",
					},
					map[string]any{
						"name": "wikipedia",
						"title": "Wikipedia",
						"type": "`$STRING`",
						"short": "Wikipedia URL",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "landpad",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/landpads",
								"segments": []any{
									map[string]any{
										"lit": "landpads",
									},
								},
								"parts": []any{
									"landpads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/landpads/{id}",
								"segments": []any{
									map[string]any{
										"lit": "landpads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"landpads",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Auto Update",
						"type": "`$BOOLEAN`",
						"short": "Whether the launch data is automatically updated",
					},
					map[string]any{
						"name": "capsules",
						"title": "Capsules",
						"type": "`$ARRAY`",
						"short": "Capsule IDs",
					},
					map[string]any{
						"name": "cores",
						"title": "Cores",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "crew",
						"title": "Crew",
						"type": "`$ARRAY`",
						"short": "Crew member IDs",
					},
					map[string]any{
						"name": "date_local",
						"title": "Date Local",
						"type": "`$STRING`",
						"short": "Launch date in local time",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_precision",
						"title": "Date Precision",
						"type": "`$STRING`",
						"short": "Date precision (hour, day, month, quarter, half, year)",
					},
					map[string]any{
						"name": "date_unix",
						"title": "Date Unix",
						"type": "`$INTEGER`",
						"short": "Launch date in unix timestamp",
					},
					map[string]any{
						"name": "date_utc",
						"title": "Date Utc",
						"type": "`$STRING`",
						"short": "Launch date in UTC",
						"format": "date-time",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$STRING`",
						"short": "Launch details",
					},
					map[string]any{
						"name": "failures",
						"title": "Failures",
						"type": "`$ARRAY`",
						"short": "Launch failures",
					},
					map[string]any{
						"name": "fairings",
						"title": "Fairings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "flight_number",
						"title": "Flight Number",
						"type": "`$INTEGER`",
						"short": "Flight number",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Launch ID",
					},
					map[string]any{
						"name": "launchpad",
						"title": "Launchpad",
						"type": "`$STRING`",
						"short": "Launchpad ID",
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Launch name",
					},
					map[string]any{
						"name": "net",
						"title": "Net",
						"type": "`$BOOLEAN`",
						"short": "No earlier than",
					},
					map[string]any{
						"name": "payloads",
						"title": "Payloads",
						"type": "`$ARRAY`",
						"short": "Payload IDs",
					},
					map[string]any{
						"name": "rocket",
						"title": "Rocket",
						"type": "`$STRING`",
						"short": "Rocket ID",
					},
					map[string]any{
						"name": "ships",
						"title": "Ships",
						"type": "`$ARRAY`",
						"short": "Ship IDs",
					},
					map[string]any{
						"name": "static_fire_date_unix",
						"title": "Static Fire Date Unix",
						"type": "`$INTEGER`",
						"short": "Static fire date in unix timestamp",
					},
					map[string]any{
						"name": "static_fire_date_utc",
						"title": "Static Fire Date Utc",
						"type": "`$STRING`",
						"short": "Static fire date in UTC",
						"format": "date-time",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"short": "Launch success status",
					},
					map[string]any{
						"name": "tdb",
						"title": "Tdb",
						"type": "`$BOOLEAN`",
						"short": "To be determined",
					},
					map[string]any{
						"name": "upcoming",
						"title": "Upcoming",
						"type": "`$BOOLEAN`",
						"short": "Whether the launch is upcoming",
					},
					map[string]any{
						"name": "window",
						"title": "Window",
						"type": "`$INTEGER`",
						"short": "Launch window in seconds",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "launch",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launches",
								"segments": []any{
									map[string]any{
										"lit": "launches",
									},
								},
								"parts": []any{
									"launches",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launches/latest",
								"segments": []any{
									map[string]any{
										"lit": "launches",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"parts": []any{
									"launches",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "latest",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launches/past",
								"segments": []any{
									map[string]any{
										"lit": "launches",
									},
									map[string]any{
										"lit": "past",
									},
								},
								"parts": []any{
									"launches",
									"past",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "past",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launches/upcoming",
								"segments": []any{
									map[string]any{
										"lit": "launches",
									},
									map[string]any{
										"lit": "upcoming",
									},
								},
								"parts": []any{
									"launches",
									"upcoming",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "upcoming",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launches/{id}",
								"segments": []any{
									map[string]any{
										"lit": "launches",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"launches",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Details",
						"type": "`$STRING`",
						"short": "Launchpad details",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"short": "Full launchpad name",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Launchpad ID",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "launch_attempts",
						"title": "Launch Attempts",
						"type": "`$INTEGER`",
						"short": "Number of launch attempts",
					},
					map[string]any{
						"name": "launch_successes",
						"title": "Launch Successes",
						"type": "`$INTEGER`",
						"short": "Number of successful launches",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "locality",
						"title": "Locality",
						"type": "`$STRING`",
						"short": "Locality",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Launchpad name",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"short": "Region",
					},
					map[string]any{
						"name": "rockets",
						"title": "Rockets",
						"type": "`$ARRAY`",
						"short": "Rocket IDs",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Launchpad status (active, inactive, unknown, retired, lost, under construction)",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "launchpad",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launchpads",
								"segments": []any{
									map[string]any{
										"lit": "launchpads",
									},
								},
								"parts": []any{
									"launchpads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/launchpads/{id}",
								"segments": []any{
									map[string]any{
										"lit": "launchpads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"launchpads",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Apoapsis Km",
						"type": "`$NUMBER`",
						"short": "Apoapsis in km",
					},
					map[string]any{
						"name": "arg_of_pericenter",
						"title": "Arg Of Pericenter",
						"type": "`$NUMBER`",
						"short": "Argument of pericenter",
					},
					map[string]any{
						"name": "customers",
						"title": "Customers",
						"type": "`$ARRAY`",
						"short": "Customers",
					},
					map[string]any{
						"name": "eccentricity",
						"title": "Eccentricity",
						"type": "`$NUMBER`",
						"short": "Eccentricity",
					},
					map[string]any{
						"name": "epoch",
						"title": "Epoch",
						"type": "`$STRING`",
						"short": "Epoch",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Payload ID",
					},
					map[string]any{
						"name": "inclination_deg",
						"title": "Inclination Deg",
						"type": "`$NUMBER`",
						"short": "Inclination in degrees",
					},
					map[string]any{
						"name": "launch",
						"title": "Launch",
						"type": "`$STRING`",
						"short": "Launch ID",
					},
					map[string]any{
						"name": "lifespan_years",
						"title": "Lifespan Years",
						"type": "`$NUMBER`",
						"short": "Lifespan in years",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "manufacturers",
						"title": "Manufacturers",
						"type": "`$ARRAY`",
						"short": "Manufacturers",
					},
					map[string]any{
						"name": "mass_kg",
						"title": "Mass Kg",
						"type": "`$NUMBER`",
						"short": "Payload mass in kilograms",
					},
					map[string]any{
						"name": "mass_lbs",
						"title": "Mass Lbs",
						"type": "`$NUMBER`",
						"short": "Payload mass in pounds",
					},
					map[string]any{
						"name": "mean_anomaly",
						"title": "Mean Anomaly",
						"type": "`$NUMBER`",
						"short": "Mean anomaly",
					},
					map[string]any{
						"name": "mean_motion",
						"title": "Mean Motion",
						"type": "`$NUMBER`",
						"short": "Mean motion",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Payload name",
					},
					map[string]any{
						"name": "nationalities",
						"title": "Nationalities",
						"type": "`$ARRAY`",
						"short": "Nationalities",
					},
					map[string]any{
						"name": "norad_ids",
						"title": "Norad Ids",
						"type": "`$ARRAY`",
						"short": "NORAD IDs",
					},
					map[string]any{
						"name": "orbit",
						"title": "Orbit",
						"type": "`$STRING`",
						"short": "Orbit type",
					},
					map[string]any{
						"name": "periapsis_km",
						"title": "Periapsis Km",
						"type": "`$NUMBER`",
						"short": "Periapsis in km",
					},
					map[string]any{
						"name": "period_min",
						"title": "Period Min",
						"type": "`$NUMBER`",
						"short": "Orbital period in minutes",
					},
					map[string]any{
						"name": "raan",
						"title": "Raan",
						"type": "`$NUMBER`",
						"short": "Right ascension of the ascending node",
					},
					map[string]any{
						"name": "reference_system",
						"title": "Reference System",
						"type": "`$STRING`",
						"short": "Reference system",
					},
					map[string]any{
						"name": "regime",
						"title": "Regime",
						"type": "`$STRING`",
						"short": "Orbit regime",
					},
					map[string]any{
						"name": "reused",
						"title": "Reused",
						"type": "`$BOOLEAN`",
						"short": "Whether the payload was reused",
					},
					map[string]any{
						"name": "semi_major_axis_km",
						"title": "Semi Major Axis Km",
						"type": "`$NUMBER`",
						"short": "Semi-major axis in km",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Payload type",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "payload",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payloads",
								"segments": []any{
									map[string]any{
										"lit": "payloads",
									},
								},
								"parts": []any{
									"payloads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payloads/{id}",
								"segments": []any{
									map[string]any{
										"lit": "payloads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payloads",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Apoapsis Au",
						"type": "`$NUMBER`",
						"short": "Apoapsis in AU",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$STRING`",
						"short": "Details",
					},
					map[string]any{
						"name": "earth_distance_km",
						"title": "Earth Distance Km",
						"type": "`$NUMBER`",
						"short": "Distance from Earth in km",
					},
					map[string]any{
						"name": "earth_distance_mi",
						"title": "Earth Distance Mi",
						"type": "`$NUMBER`",
						"short": "Distance from Earth in miles",
					},
					map[string]any{
						"name": "eccentricity",
						"title": "Eccentricity",
						"type": "`$NUMBER`",
						"short": "Eccentricity",
					},
					map[string]any{
						"name": "epoch_jd",
						"title": "Epoch Jd",
						"type": "`$NUMBER`",
						"short": "Epoch in Julian Date",
					},
					map[string]any{
						"name": "flickr_images",
						"title": "Flickr Images",
						"type": "`$ARRAY`",
						"short": "Flickr images",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Roadster ID",
					},
					map[string]any{
						"name": "inclination",
						"title": "Inclination",
						"type": "`$NUMBER`",
						"short": "Inclination",
					},
					map[string]any{
						"name": "launch_date_unix",
						"title": "Launch Date Unix",
						"type": "`$INTEGER`",
						"short": "Launch date in unix timestamp",
					},
					map[string]any{
						"name": "launch_date_utc",
						"title": "Launch Date Utc",
						"type": "`$STRING`",
						"short": "Launch date in UTC",
						"format": "date-time",
					},
					map[string]any{
						"name": "launch_mass_kg",
						"title": "Launch Mass Kg",
						"type": "`$INTEGER`",
						"short": "Launch mass in kilograms",
					},
					map[string]any{
						"name": "launch_mass_lbs",
						"title": "Launch Mass Lbs",
						"type": "`$INTEGER`",
						"short": "Launch mass in pounds",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "mars_distance_km",
						"title": "Mars Distance Km",
						"type": "`$NUMBER`",
						"short": "Distance from Mars in km",
					},
					map[string]any{
						"name": "mars_distance_mi",
						"title": "Mars Distance Mi",
						"type": "`$NUMBER`",
						"short": "Distance from Mars in miles",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Roadster name",
					},
					map[string]any{
						"name": "norad_id",
						"title": "Norad Id",
						"type": "`$INTEGER`",
						"short": "NORAD ID",
					},
					map[string]any{
						"name": "orbit_type",
						"title": "Orbit Type",
						"type": "`$STRING`",
						"short": "Orbit type",
					},
					map[string]any{
						"name": "periapsis_arg",
						"title": "Periapsis Arg",
						"type": "`$NUMBER`",
						"short": "Argument of periapsis",
					},
					map[string]any{
						"name": "periapsis_au",
						"title": "Periapsis Au",
						"type": "`$NUMBER`",
						"short": "Periapsis in AU",
					},
					map[string]any{
						"name": "period_days",
						"title": "Period Days",
						"type": "`$NUMBER`",
						"short": "Orbital period in days",
					},
					map[string]any{
						"name": "semi_major_axis_au",
						"title": "Semi Major Axis Au",
						"type": "`$NUMBER`",
						"short": "Semi-major axis in AU",
					},
					map[string]any{
						"name": "speed_kph",
						"title": "Speed Kph",
						"type": "`$NUMBER`",
						"short": "Speed in km/h",
					},
					map[string]any{
						"name": "speed_mph",
						"title": "Speed Mph",
						"type": "`$NUMBER`",
						"short": "Speed in mph",
					},
					map[string]any{
						"name": "video",
						"title": "Video",
						"type": "`$STRING`",
						"short": "Video URL",
					},
					map[string]any{
						"name": "wikipedia",
						"title": "Wikipedia",
						"type": "`$STRING`",
						"short": "Wikipedia URL",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "roadster",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/roadster",
								"segments": []any{
									map[string]any{
										"lit": "roadster",
									},
								},
								"parts": []any{
									"roadster",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.flickr_images`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Active",
						"type": "`$BOOLEAN`",
						"short": "Whether the rocket is active",
					},
					map[string]any{
						"name": "boosters",
						"title": "Boosters",
						"type": "`$INTEGER`",
						"short": "Number of boosters",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
						"short": "Company",
					},
					map[string]any{
						"name": "cost_per_launch",
						"title": "Cost Per Launch",
						"type": "`$INTEGER`",
						"short": "Cost per launch in USD",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country of origin",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"title": "Diameter",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "first_flight",
						"title": "First Flight",
						"type": "`$STRING`",
						"short": "Date of first flight",
						"format": "date",
					},
					map[string]any{
						"name": "flickr_images",
						"title": "Flickr Images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Rocket ID",
					},
					map[string]any{
						"name": "mass",
						"title": "Mass",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Rocket name",
					},
					map[string]any{
						"name": "stages",
						"title": "Stages",
						"type": "`$INTEGER`",
						"short": "Number of stages",
					},
					map[string]any{
						"name": "success_rate_pct",
						"title": "Success Rate Pct",
						"type": "`$NUMBER`",
						"short": "Success rate percentage",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Rocket type",
					},
					map[string]any{
						"name": "wikipedia",
						"title": "Wikipedia",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "rocket",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rockets",
								"segments": []any{
									map[string]any{
										"lit": "rockets",
									},
								},
								"parts": []any{
									"rockets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rockets/{id}",
								"segments": []any{
									map[string]any{
										"lit": "rockets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"rockets",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Abs",
						"type": "`$INTEGER`",
						"short": "ABS number",
					},
					map[string]any{
						"name": "class",
						"title": "Class",
						"type": "`$INTEGER`",
						"short": "Ship class",
					},
					map[string]any{
						"name": "course_deg",
						"title": "Course Deg",
						"type": "`$NUMBER`",
						"short": "Course in degrees",
					},
					map[string]any{
						"name": "home_port",
						"title": "Home Port",
						"type": "`$STRING`",
						"short": "Home port",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Ship ID",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "Image URL",
					},
					map[string]any{
						"name": "imo",
						"title": "Imo",
						"type": "`$INTEGER`",
						"short": "IMO number",
					},
					map[string]any{
						"name": "last_ais_update",
						"title": "Last Ais Update",
						"type": "`$STRING`",
						"short": "Last AIS update timestamp",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude",
					},
					map[string]any{
						"name": "launches",
						"title": "Launches",
						"type": "`$ARRAY`",
						"short": "Launch IDs",
					},
					map[string]any{
						"name": "legacy_id",
						"title": "Legacy Id",
						"type": "`$STRING`",
						"short": "Legacy ID",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"short": "Link to ship info",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude",
					},
					map[string]any{
						"name": "mass_kg",
						"title": "Mass Kg",
						"type": "`$INTEGER`",
						"short": "Mass in kilograms",
					},
					map[string]any{
						"name": "mass_lbs",
						"title": "Mass Lbs",
						"type": "`$INTEGER`",
						"short": "Mass in pounds",
					},
					map[string]any{
						"name": "mmsi",
						"title": "Mmsi",
						"type": "`$INTEGER`",
						"short": "MMSI number",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"short": "Ship model",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Ship name",
					},
					map[string]any{
						"name": "roles",
						"title": "Roles",
						"type": "`$ARRAY`",
						"short": "Ship roles",
					},
					map[string]any{
						"name": "speed_kn",
						"title": "Speed Kn",
						"type": "`$NUMBER`",
						"short": "Speed in knots",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Ship status",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Ship type",
					},
					map[string]any{
						"name": "year_built",
						"title": "Year Built",
						"type": "`$INTEGER`",
						"short": "Year built",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "ship",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ships",
								"segments": []any{
									map[string]any{
										"lit": "ships",
									},
								},
								"parts": []any{
									"ships",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ships/{id}",
								"segments": []any{
									map[string]any{
										"lit": "ships",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"ships",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Height Km",
						"type": "`$NUMBER`",
						"short": "Current height in kilometers",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Starlink satellite ID",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Current latitude",
					},
					map[string]any{
						"name": "launch",
						"title": "Launch",
						"type": "`$STRING`",
						"short": "Launch ID",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Current longitude",
					},
					map[string]any{
						"name": "spaceTrack",
						"title": "Space Track",
						"type": "`$OBJECT`",
						"short": "Space-Track.org data",
					},
					map[string]any{
						"name": "velocity_kms",
						"title": "Velocity Kms",
						"type": "`$NUMBER`",
						"short": "Current velocity in km/s",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"short": "Satellite version",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "starlink",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/starlink",
								"segments": []any{
									map[string]any{
										"lit": "starlink",
									},
								},
								"parts": []any{
									"starlink",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/starlink/{id}",
								"segments": []any{
									map[string]any{
										"lit": "starlink",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"starlink",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.spaceTrack`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
