import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "capsule",
    "accessor": "Capsule",
    "op": "list",
    "method": "GET",
    "path": "/capsules",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "type": "x",
        "status": "x",
        "serial": "x",
        "launches": [
          "x"
        ],
        "last_update": "x",
        "land_landings": 1,
        "water_landings": 1,
        "reuse_count": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "capsule",
    "accessor": "Capsule",
    "op": "load",
    "method": "GET",
    "path": "/capsules/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "type": "x",
      "status": "x",
      "serial": "x",
      "launches": [
        "x"
      ],
      "last_update": "x",
      "land_landings": 1,
      "water_landings": 1,
      "reuse_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "core",
    "accessor": "Core",
    "op": "list",
    "method": "GET",
    "path": "/cores",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "block": 1,
        "reuse_count": 1,
        "rtls_attempts": 1,
        "rtls_landings": 1,
        "asds_attempts": 1,
        "asds_landings": 1,
        "last_update": "x",
        "launches": [
          "x"
        ],
        "serial": "x",
        "status": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "core",
    "accessor": "Core",
    "op": "load",
    "method": "GET",
    "path": "/cores/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "block": 1,
      "reuse_count": 1,
      "rtls_attempts": 1,
      "rtls_landings": 1,
      "asds_attempts": 1,
      "asds_landings": 1,
      "last_update": "x",
      "launches": [
        "x"
      ],
      "serial": "x",
      "status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "crew",
    "accessor": "Crew",
    "op": "list",
    "method": "GET",
    "path": "/crew",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "agency": "x",
        "image": "x",
        "wikipedia": "x",
        "launches": [
          "x"
        ],
        "status": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "crew",
    "accessor": "Crew",
    "op": "load",
    "method": "GET",
    "path": "/crew/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "agency": "x",
      "image": "x",
      "wikipedia": "x",
      "launches": [
        "x"
      ],
      "status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "landpad",
    "accessor": "Landpad",
    "op": "list",
    "method": "GET",
    "path": "/landpads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "full_name": "x",
        "status": "x",
        "type": "x",
        "locality": "x",
        "region": "x",
        "latitude": 1,
        "longitude": 1,
        "landing_attempts": 1,
        "landing_successes": 1,
        "wikipedia": "x",
        "details": "x",
        "launches": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "landpad",
    "accessor": "Landpad",
    "op": "load",
    "method": "GET",
    "path": "/landpads/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "full_name": "x",
      "status": "x",
      "type": "x",
      "locality": "x",
      "region": "x",
      "latitude": 1,
      "longitude": 1,
      "landing_attempts": 1,
      "landing_successes": 1,
      "wikipedia": "x",
      "details": "x",
      "launches": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "launch",
    "accessor": "Launch",
    "op": "list",
    "method": "GET",
    "path": "/launches",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "flight_number": 1,
        "name": "x",
        "date_utc": "2026-01-01T00:00:00Z",
        "date_unix": 1,
        "date_local": "2026-01-01T00:00:00Z",
        "date_precision": "x",
        "static_fire_date_utc": "2026-01-01T00:00:00Z",
        "static_fire_date_unix": 1,
        "tdb": true,
        "net": true,
        "window": 1,
        "rocket": "x",
        "success": true,
        "failures": [
          {}
        ],
        "upcoming": true,
        "details": "x",
        "fairings": {
          "reused": true,
          "recovery_attempt": true,
          "recovered": true,
          "ships": [
            "x"
          ]
        },
        "crew": [
          "x"
        ],
        "ships": [
          "x"
        ],
        "capsules": [
          "x"
        ],
        "payloads": [
          "x"
        ],
        "launchpad": "x",
        "cores": [
          {
            "core": "x",
            "flight": 1,
            "gridfins": true,
            "legs": true,
            "reused": true,
            "landing_attempt": true,
            "landing_success": true,
            "landing_type": "x",
            "landpad": "x"
          }
        ],
        "links": {
          "patch": {
            "small": "x",
            "large": "x"
          },
          "reddit": {
            "campaign": "x",
            "launch": "x",
            "media": "x",
            "recovery": "x"
          },
          "flickr": {
            "small": [
              "x"
            ],
            "original": [
              "x"
            ]
          },
          "presskit": "x",
          "webcast": "x",
          "youtube_id": "x",
          "article": "x",
          "wikipedia": "x"
        },
        "auto_update": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "launch",
    "accessor": "Launch",
    "op": "list",
    "method": "GET",
    "path": "/launches/latest",
    "action": "latest",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "flight_number": 1,
      "name": "x",
      "date_utc": "2026-01-01T00:00:00Z",
      "date_unix": 1,
      "date_local": "2026-01-01T00:00:00Z",
      "date_precision": "x",
      "static_fire_date_utc": "2026-01-01T00:00:00Z",
      "static_fire_date_unix": 1,
      "tdb": true,
      "net": true,
      "window": 1,
      "rocket": "x",
      "success": true,
      "failures": [
        {}
      ],
      "upcoming": true,
      "details": "x",
      "fairings": {
        "reused": true,
        "recovery_attempt": true,
        "recovered": true,
        "ships": [
          "x"
        ]
      },
      "crew": [
        "x"
      ],
      "ships": [
        "x"
      ],
      "capsules": [
        "x"
      ],
      "payloads": [
        "x"
      ],
      "launchpad": "x",
      "cores": [
        {
          "core": "x",
          "flight": 1,
          "gridfins": true,
          "legs": true,
          "reused": true,
          "landing_attempt": true,
          "landing_success": true,
          "landing_type": "x",
          "landpad": "x"
        }
      ],
      "links": {
        "patch": {
          "small": "x",
          "large": "x"
        },
        "reddit": {
          "campaign": "x",
          "launch": "x",
          "media": "x",
          "recovery": "x"
        },
        "flickr": {
          "small": [
            "x"
          ],
          "original": [
            "x"
          ]
        },
        "presskit": "x",
        "webcast": "x",
        "youtube_id": "x",
        "article": "x",
        "wikipedia": "x"
      },
      "auto_update": true
    },
    "idField": "id"
  },
  {
    "entity": "launch",
    "accessor": "Launch",
    "op": "list",
    "method": "GET",
    "path": "/launches/past",
    "action": "past",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "flight_number": 1,
        "name": "x",
        "date_utc": "2026-01-01T00:00:00Z",
        "date_unix": 1,
        "date_local": "2026-01-01T00:00:00Z",
        "date_precision": "x",
        "static_fire_date_utc": "2026-01-01T00:00:00Z",
        "static_fire_date_unix": 1,
        "tdb": true,
        "net": true,
        "window": 1,
        "rocket": "x",
        "success": true,
        "failures": [
          {}
        ],
        "upcoming": true,
        "details": "x",
        "fairings": {
          "reused": true,
          "recovery_attempt": true,
          "recovered": true,
          "ships": [
            "x"
          ]
        },
        "crew": [
          "x"
        ],
        "ships": [
          "x"
        ],
        "capsules": [
          "x"
        ],
        "payloads": [
          "x"
        ],
        "launchpad": "x",
        "cores": [
          {
            "core": "x",
            "flight": 1,
            "gridfins": true,
            "legs": true,
            "reused": true,
            "landing_attempt": true,
            "landing_success": true,
            "landing_type": "x",
            "landpad": "x"
          }
        ],
        "links": {
          "patch": {
            "small": "x",
            "large": "x"
          },
          "reddit": {
            "campaign": "x",
            "launch": "x",
            "media": "x",
            "recovery": "x"
          },
          "flickr": {
            "small": [
              "x"
            ],
            "original": [
              "x"
            ]
          },
          "presskit": "x",
          "webcast": "x",
          "youtube_id": "x",
          "article": "x",
          "wikipedia": "x"
        },
        "auto_update": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "launch",
    "accessor": "Launch",
    "op": "list",
    "method": "GET",
    "path": "/launches/upcoming",
    "action": "upcoming",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "flight_number": 1,
        "name": "x",
        "date_utc": "2026-01-01T00:00:00Z",
        "date_unix": 1,
        "date_local": "2026-01-01T00:00:00Z",
        "date_precision": "x",
        "static_fire_date_utc": "2026-01-01T00:00:00Z",
        "static_fire_date_unix": 1,
        "tdb": true,
        "net": true,
        "window": 1,
        "rocket": "x",
        "success": true,
        "failures": [
          {}
        ],
        "upcoming": true,
        "details": "x",
        "fairings": {
          "reused": true,
          "recovery_attempt": true,
          "recovered": true,
          "ships": [
            "x"
          ]
        },
        "crew": [
          "x"
        ],
        "ships": [
          "x"
        ],
        "capsules": [
          "x"
        ],
        "payloads": [
          "x"
        ],
        "launchpad": "x",
        "cores": [
          {
            "core": "x",
            "flight": 1,
            "gridfins": true,
            "legs": true,
            "reused": true,
            "landing_attempt": true,
            "landing_success": true,
            "landing_type": "x",
            "landpad": "x"
          }
        ],
        "links": {
          "patch": {
            "small": "x",
            "large": "x"
          },
          "reddit": {
            "campaign": "x",
            "launch": "x",
            "media": "x",
            "recovery": "x"
          },
          "flickr": {
            "small": [
              "x"
            ],
            "original": [
              "x"
            ]
          },
          "presskit": "x",
          "webcast": "x",
          "youtube_id": "x",
          "article": "x",
          "wikipedia": "x"
        },
        "auto_update": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "launch",
    "accessor": "Launch",
    "op": "load",
    "method": "GET",
    "path": "/launches/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "flight_number": 1,
      "name": "x",
      "date_utc": "2026-01-01T00:00:00Z",
      "date_unix": 1,
      "date_local": "2026-01-01T00:00:00Z",
      "date_precision": "x",
      "static_fire_date_utc": "2026-01-01T00:00:00Z",
      "static_fire_date_unix": 1,
      "tdb": true,
      "net": true,
      "window": 1,
      "rocket": "x",
      "success": true,
      "failures": [
        {}
      ],
      "upcoming": true,
      "details": "x",
      "fairings": {
        "reused": true,
        "recovery_attempt": true,
        "recovered": true,
        "ships": [
          "x"
        ]
      },
      "crew": [
        "x"
      ],
      "ships": [
        "x"
      ],
      "capsules": [
        "x"
      ],
      "payloads": [
        "x"
      ],
      "launchpad": "x",
      "cores": [
        {
          "core": "x",
          "flight": 1,
          "gridfins": true,
          "legs": true,
          "reused": true,
          "landing_attempt": true,
          "landing_success": true,
          "landing_type": "x",
          "landpad": "x"
        }
      ],
      "links": {
        "patch": {
          "small": "x",
          "large": "x"
        },
        "reddit": {
          "campaign": "x",
          "launch": "x",
          "media": "x",
          "recovery": "x"
        },
        "flickr": {
          "small": [
            "x"
          ],
          "original": [
            "x"
          ]
        },
        "presskit": "x",
        "webcast": "x",
        "youtube_id": "x",
        "article": "x",
        "wikipedia": "x"
      },
      "auto_update": true
    },
    "idField": "id"
  },
  {
    "entity": "launchpad",
    "accessor": "Launchpad",
    "op": "list",
    "method": "GET",
    "path": "/launchpads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "full_name": "x",
        "status": "x",
        "locality": "x",
        "region": "x",
        "latitude": 1,
        "longitude": 1,
        "launch_attempts": 1,
        "launch_successes": 1,
        "rockets": [
          "x"
        ],
        "launches": [
          "x"
        ],
        "details": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "launchpad",
    "accessor": "Launchpad",
    "op": "load",
    "method": "GET",
    "path": "/launchpads/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "full_name": "x",
      "status": "x",
      "locality": "x",
      "region": "x",
      "latitude": 1,
      "longitude": 1,
      "launch_attempts": 1,
      "launch_successes": 1,
      "rockets": [
        "x"
      ],
      "launches": [
        "x"
      ],
      "details": "x"
    },
    "idField": "id"
  },
  {
    "entity": "payload",
    "accessor": "Payload",
    "op": "list",
    "method": "GET",
    "path": "/payloads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "type": "x",
        "reused": true,
        "launch": "x",
        "customers": [
          "x"
        ],
        "norad_ids": [
          1
        ],
        "nationalities": [
          "x"
        ],
        "manufacturers": [
          "x"
        ],
        "mass_kg": 1,
        "mass_lbs": 1,
        "orbit": "x",
        "reference_system": "x",
        "regime": "x",
        "longitude": 1,
        "semi_major_axis_km": 1,
        "eccentricity": 1,
        "periapsis_km": 1,
        "apoapsis_km": 1,
        "inclination_deg": 1,
        "period_min": 1,
        "lifespan_years": 1,
        "epoch": "x",
        "mean_motion": 1,
        "raan": 1,
        "arg_of_pericenter": 1,
        "mean_anomaly": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "payload",
    "accessor": "Payload",
    "op": "load",
    "method": "GET",
    "path": "/payloads/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "type": "x",
      "reused": true,
      "launch": "x",
      "customers": [
        "x"
      ],
      "norad_ids": [
        1
      ],
      "nationalities": [
        "x"
      ],
      "manufacturers": [
        "x"
      ],
      "mass_kg": 1,
      "mass_lbs": 1,
      "orbit": "x",
      "reference_system": "x",
      "regime": "x",
      "longitude": 1,
      "semi_major_axis_km": 1,
      "eccentricity": 1,
      "periapsis_km": 1,
      "apoapsis_km": 1,
      "inclination_deg": 1,
      "period_min": 1,
      "lifespan_years": 1,
      "epoch": "x",
      "mean_motion": 1,
      "raan": 1,
      "arg_of_pericenter": 1,
      "mean_anomaly": 1
    },
    "idField": "id"
  },
  {
    "entity": "roadster",
    "accessor": "Roadster",
    "op": "list",
    "method": "GET",
    "path": "/roadster",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "launch_date_utc": "2026-01-01T00:00:00Z",
      "launch_date_unix": 1,
      "launch_mass_kg": 1,
      "launch_mass_lbs": 1,
      "norad_id": 1,
      "epoch_jd": 1,
      "orbit_type": "x",
      "apoapsis_au": 1,
      "periapsis_au": 1,
      "semi_major_axis_au": 1,
      "eccentricity": 1,
      "inclination": 1,
      "longitude": 1,
      "periapsis_arg": 1,
      "period_days": 1,
      "speed_kph": 1,
      "speed_mph": 1,
      "earth_distance_km": 1,
      "earth_distance_mi": 1,
      "mars_distance_km": 1,
      "mars_distance_mi": 1,
      "flickr_images": [
        "x"
      ],
      "wikipedia": "x",
      "video": "x",
      "details": "x"
    },
    "idField": "id"
  },
  {
    "entity": "rocket",
    "accessor": "Rocket",
    "op": "list",
    "method": "GET",
    "path": "/rockets",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "type": "x",
        "active": true,
        "stages": 1,
        "boosters": 1,
        "cost_per_launch": 1,
        "success_rate_pct": 1,
        "first_flight": "2026-01-01",
        "country": "x",
        "company": "x",
        "height": {
          "meters": 1,
          "feet": 1
        },
        "diameter": {
          "meters": 1,
          "feet": 1
        },
        "mass": {
          "kg": 1,
          "lb": 1
        },
        "flickr_images": [
          "x"
        ],
        "description": "x",
        "wikipedia": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "rocket",
    "accessor": "Rocket",
    "op": "load",
    "method": "GET",
    "path": "/rockets/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "type": "x",
      "active": true,
      "stages": 1,
      "boosters": 1,
      "cost_per_launch": 1,
      "success_rate_pct": 1,
      "first_flight": "2026-01-01",
      "country": "x",
      "company": "x",
      "height": {
        "meters": 1,
        "feet": 1
      },
      "diameter": {
        "meters": 1,
        "feet": 1
      },
      "mass": {
        "kg": 1,
        "lb": 1
      },
      "flickr_images": [
        "x"
      ],
      "description": "x",
      "wikipedia": "x"
    },
    "idField": "id"
  },
  {
    "entity": "ship",
    "accessor": "Ship",
    "op": "list",
    "method": "GET",
    "path": "/ships",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "legacy_id": "x",
        "model": "x",
        "type": "x",
        "roles": [
          "x"
        ],
        "imo": 1,
        "mmsi": 1,
        "abs": 1,
        "class": 1,
        "mass_kg": 1,
        "mass_lbs": 1,
        "year_built": 1,
        "home_port": "x",
        "status": "x",
        "speed_kn": 1,
        "course_deg": 1,
        "latitude": 1,
        "longitude": 1,
        "last_ais_update": "x",
        "link": "x",
        "image": "x",
        "launches": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "ship",
    "accessor": "Ship",
    "op": "load",
    "method": "GET",
    "path": "/ships/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "legacy_id": "x",
      "model": "x",
      "type": "x",
      "roles": [
        "x"
      ],
      "imo": 1,
      "mmsi": 1,
      "abs": 1,
      "class": 1,
      "mass_kg": 1,
      "mass_lbs": 1,
      "year_built": 1,
      "home_port": "x",
      "status": "x",
      "speed_kn": 1,
      "course_deg": 1,
      "latitude": 1,
      "longitude": 1,
      "last_ais_update": "x",
      "link": "x",
      "image": "x",
      "launches": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "starlink",
    "accessor": "Starlink",
    "op": "list",
    "method": "GET",
    "path": "/starlink",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "version": "x",
        "launch": "x",
        "longitude": 1,
        "latitude": 1,
        "height_km": 1,
        "velocity_kms": 1,
        "spaceTrack": {}
      }
    ],
    "idField": "id"
  },
  {
    "entity": "starlink",
    "accessor": "Starlink",
    "op": "load",
    "method": "GET",
    "path": "/starlink/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "version": "x",
      "launch": "x",
      "longitude": 1,
      "latitude": 1,
      "height_km": 1,
      "velocity_kms": 1,
      "spaceTrack": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
