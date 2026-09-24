
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SpacexRest',
        slug: "spacex-rest",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.spacexdata.com/v5",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        capsule: {
        },
  
        core: {
        },
  
        crew: {
        },
  
        landpad: {
        },
  
        launch: {
        },
  
        launchpad: {
        },
  
        payload: {
        },
  
        roadster: {
        },
  
        rocket: {
        },
  
        ship: {
        },
  
        starlink: {
        },
  
    }
  }


  entity = {
    "capsule": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Capsule serial number"
        },
        {
          "name": "land_landings",
          "title": "Land Landings",
          "type": "`$INTEGER`",
          "short": "Number of land landings"
        },
        {
          "name": "last_update",
          "title": "Last Update",
          "type": "`$STRING`",
          "short": "Last update about the capsule"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "reuse_count",
          "title": "Reuse Count",
          "type": "`$INTEGER`",
          "short": "Number of times capsule has been reused"
        },
        {
          "name": "serial",
          "title": "Serial",
          "type": "`$STRING`",
          "short": "Capsule serial number"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Capsule status"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Capsule type"
        },
        {
          "name": "water_landings",
          "title": "Water Landings",
          "type": "`$INTEGER`",
          "short": "Number of water landings"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "capsule",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/capsules",
              "segments": [
                {
                  "lit": "capsules"
                }
              ],
              "parts": [
                "capsules"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/capsules/{id}",
              "segments": [
                {
                  "lit": "capsules"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "capsules",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "core": {
      "fields": [
        {
          "name": "asds_attempts",
          "title": "Asds Attempts",
          "type": "`$INTEGER`",
          "short": "Number of autonomous spaceport drone ship landing attempts"
        },
        {
          "name": "asds_landings",
          "title": "Asds Landings",
          "type": "`$INTEGER`",
          "short": "Number of successful ASDS landings"
        },
        {
          "name": "block",
          "title": "Block",
          "type": "`$INTEGER`",
          "short": "Core block number"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Core serial number"
        },
        {
          "name": "last_update",
          "title": "Last Update",
          "type": "`$STRING`",
          "short": "Last update about the core"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "reuse_count",
          "title": "Reuse Count",
          "type": "`$INTEGER`",
          "short": "Number of times core has been reused"
        },
        {
          "name": "rtls_attempts",
          "title": "Rtls Attempts",
          "type": "`$INTEGER`",
          "short": "Number of return to launch site attempts"
        },
        {
          "name": "rtls_landings",
          "title": "Rtls Landings",
          "type": "`$INTEGER`",
          "short": "Number of successful RTLS landings"
        },
        {
          "name": "serial",
          "title": "Serial",
          "type": "`$STRING`",
          "short": "Core serial number"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Core status (active, inactive, unknown, expended, lost, retired)"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "core",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/cores",
              "segments": [
                {
                  "lit": "cores"
                }
              ],
              "parts": [
                "cores"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/cores/{id}",
              "segments": [
                {
                  "lit": "cores"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "cores",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "crew": {
      "fields": [
        {
          "name": "agency",
          "title": "Agency",
          "type": "`$STRING`",
          "short": "Agency"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Crew member ID"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "short": "Image URL"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Crew member name"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Status (active, inactive, retired, unknown)"
        },
        {
          "name": "wikipedia",
          "title": "Wikipedia",
          "type": "`$STRING`",
          "short": "Wikipedia URL"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "crew",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crew",
              "segments": [
                {
                  "lit": "crew"
                }
              ],
              "parts": [
                "crew"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crew/{id}",
              "segments": [
                {
                  "lit": "crew"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "crew",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "landpad": {
      "fields": [
        {
          "name": "details",
          "title": "Details",
          "type": "`$STRING`",
          "short": "Landing pad details"
        },
        {
          "name": "full_name",
          "title": "Full Name",
          "type": "`$STRING`",
          "short": "Full landing pad name"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Landing pad ID"
        },
        {
          "name": "landing_attempts",
          "title": "Landing Attempts",
          "type": "`$INTEGER`",
          "short": "Number of landing attempts"
        },
        {
          "name": "landing_successes",
          "title": "Landing Successes",
          "type": "`$INTEGER`",
          "short": "Number of successful landings"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "locality",
          "title": "Locality",
          "type": "`$STRING`",
          "short": "Locality"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Landing pad name"
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "short": "Region"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Landing pad status (active, inactive, unknown, retired, lost, under construction)"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Landing pad type (ASDS, RTLS)"
        },
        {
          "name": "wikipedia",
          "title": "Wikipedia",
          "type": "`$STRING`",
          "short": "Wikipedia URL"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "landpad",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/landpads",
              "segments": [
                {
                  "lit": "landpads"
                }
              ],
              "parts": [
                "landpads"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/landpads/{id}",
              "segments": [
                {
                  "lit": "landpads"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "landpads",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "launch": {
      "fields": [
        {
          "name": "auto_update",
          "title": "Auto Update",
          "type": "`$BOOLEAN`",
          "short": "Whether the launch data is automatically updated"
        },
        {
          "name": "capsules",
          "title": "Capsules",
          "type": "`$ARRAY`",
          "short": "Capsule IDs"
        },
        {
          "name": "cores",
          "title": "Cores",
          "type": "`$ARRAY`"
        },
        {
          "name": "crew",
          "title": "Crew",
          "type": "`$ARRAY`",
          "short": "Crew member IDs"
        },
        {
          "name": "date_local",
          "title": "Date Local",
          "type": "`$STRING`",
          "short": "Launch date in local time",
          "format": "date-time"
        },
        {
          "name": "date_precision",
          "title": "Date Precision",
          "type": "`$STRING`",
          "short": "Date precision (hour, day, month, quarter, half, year)"
        },
        {
          "name": "date_unix",
          "title": "Date Unix",
          "type": "`$INTEGER`",
          "short": "Launch date in unix timestamp"
        },
        {
          "name": "date_utc",
          "title": "Date Utc",
          "type": "`$STRING`",
          "short": "Launch date in UTC",
          "format": "date-time"
        },
        {
          "name": "details",
          "title": "Details",
          "type": "`$STRING`",
          "short": "Launch details"
        },
        {
          "name": "failures",
          "title": "Failures",
          "type": "`$ARRAY`",
          "short": "Launch failures"
        },
        {
          "name": "fairings",
          "title": "Fairings",
          "type": "`$OBJECT`"
        },
        {
          "name": "flight_number",
          "title": "Flight Number",
          "type": "`$INTEGER`",
          "short": "Flight number"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Launch ID"
        },
        {
          "name": "launchpad",
          "title": "Launchpad",
          "type": "`$STRING`",
          "short": "Launchpad ID"
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Launch name"
        },
        {
          "name": "net",
          "title": "Net",
          "type": "`$BOOLEAN`",
          "short": "No earlier than"
        },
        {
          "name": "payloads",
          "title": "Payloads",
          "type": "`$ARRAY`",
          "short": "Payload IDs"
        },
        {
          "name": "rocket",
          "title": "Rocket",
          "type": "`$STRING`",
          "short": "Rocket ID"
        },
        {
          "name": "ships",
          "title": "Ships",
          "type": "`$ARRAY`",
          "short": "Ship IDs"
        },
        {
          "name": "static_fire_date_unix",
          "title": "Static Fire Date Unix",
          "type": "`$INTEGER`",
          "short": "Static fire date in unix timestamp"
        },
        {
          "name": "static_fire_date_utc",
          "title": "Static Fire Date Utc",
          "type": "`$STRING`",
          "short": "Static fire date in UTC",
          "format": "date-time"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "short": "Launch success status"
        },
        {
          "name": "tdb",
          "title": "Tdb",
          "type": "`$BOOLEAN`",
          "short": "To be determined"
        },
        {
          "name": "upcoming",
          "title": "Upcoming",
          "type": "`$BOOLEAN`",
          "short": "Whether the launch is upcoming"
        },
        {
          "name": "window",
          "title": "Window",
          "type": "`$INTEGER`",
          "short": "Launch window in seconds"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "launch",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launches",
              "segments": [
                {
                  "lit": "launches"
                }
              ],
              "parts": [
                "launches"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launches/latest",
              "segments": [
                {
                  "lit": "launches"
                },
                {
                  "lit": "latest"
                }
              ],
              "parts": [
                "launches",
                "latest"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "latest"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launches/past",
              "segments": [
                {
                  "lit": "launches"
                },
                {
                  "lit": "past"
                }
              ],
              "parts": [
                "launches",
                "past"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "past"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launches/upcoming",
              "segments": [
                {
                  "lit": "launches"
                },
                {
                  "lit": "upcoming"
                }
              ],
              "parts": [
                "launches",
                "upcoming"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "upcoming"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launches/{id}",
              "segments": [
                {
                  "lit": "launches"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "launches",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "launchpad": {
      "fields": [
        {
          "name": "details",
          "title": "Details",
          "type": "`$STRING`",
          "short": "Launchpad details"
        },
        {
          "name": "full_name",
          "title": "Full Name",
          "type": "`$STRING`",
          "short": "Full launchpad name"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Launchpad ID"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude"
        },
        {
          "name": "launch_attempts",
          "title": "Launch Attempts",
          "type": "`$INTEGER`",
          "short": "Number of launch attempts"
        },
        {
          "name": "launch_successes",
          "title": "Launch Successes",
          "type": "`$INTEGER`",
          "short": "Number of successful launches"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "locality",
          "title": "Locality",
          "type": "`$STRING`",
          "short": "Locality"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Launchpad name"
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "short": "Region"
        },
        {
          "name": "rockets",
          "title": "Rockets",
          "type": "`$ARRAY`",
          "short": "Rocket IDs"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Launchpad status (active, inactive, unknown, retired, lost, under construction)"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "launchpad",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launchpads",
              "segments": [
                {
                  "lit": "launchpads"
                }
              ],
              "parts": [
                "launchpads"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/launchpads/{id}",
              "segments": [
                {
                  "lit": "launchpads"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "launchpads",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "payload": {
      "fields": [
        {
          "name": "apoapsis_km",
          "title": "Apoapsis Km",
          "type": "`$NUMBER`",
          "short": "Apoapsis in km"
        },
        {
          "name": "arg_of_pericenter",
          "title": "Arg Of Pericenter",
          "type": "`$NUMBER`",
          "short": "Argument of pericenter"
        },
        {
          "name": "customers",
          "title": "Customers",
          "type": "`$ARRAY`",
          "short": "Customers"
        },
        {
          "name": "eccentricity",
          "title": "Eccentricity",
          "type": "`$NUMBER`",
          "short": "Eccentricity"
        },
        {
          "name": "epoch",
          "title": "Epoch",
          "type": "`$STRING`",
          "short": "Epoch"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Payload ID"
        },
        {
          "name": "inclination_deg",
          "title": "Inclination Deg",
          "type": "`$NUMBER`",
          "short": "Inclination in degrees"
        },
        {
          "name": "launch",
          "title": "Launch",
          "type": "`$STRING`",
          "short": "Launch ID"
        },
        {
          "name": "lifespan_years",
          "title": "Lifespan Years",
          "type": "`$NUMBER`",
          "short": "Lifespan in years"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude"
        },
        {
          "name": "manufacturers",
          "title": "Manufacturers",
          "type": "`$ARRAY`",
          "short": "Manufacturers"
        },
        {
          "name": "mass_kg",
          "title": "Mass Kg",
          "type": "`$NUMBER`",
          "short": "Payload mass in kilograms"
        },
        {
          "name": "mass_lbs",
          "title": "Mass Lbs",
          "type": "`$NUMBER`",
          "short": "Payload mass in pounds"
        },
        {
          "name": "mean_anomaly",
          "title": "Mean Anomaly",
          "type": "`$NUMBER`",
          "short": "Mean anomaly"
        },
        {
          "name": "mean_motion",
          "title": "Mean Motion",
          "type": "`$NUMBER`",
          "short": "Mean motion"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Payload name"
        },
        {
          "name": "nationalities",
          "title": "Nationalities",
          "type": "`$ARRAY`",
          "short": "Nationalities"
        },
        {
          "name": "norad_ids",
          "title": "Norad Ids",
          "type": "`$ARRAY`",
          "short": "NORAD IDs"
        },
        {
          "name": "orbit",
          "title": "Orbit",
          "type": "`$STRING`",
          "short": "Orbit type"
        },
        {
          "name": "periapsis_km",
          "title": "Periapsis Km",
          "type": "`$NUMBER`",
          "short": "Periapsis in km"
        },
        {
          "name": "period_min",
          "title": "Period Min",
          "type": "`$NUMBER`",
          "short": "Orbital period in minutes"
        },
        {
          "name": "raan",
          "title": "Raan",
          "type": "`$NUMBER`",
          "short": "Right ascension of the ascending node"
        },
        {
          "name": "reference_system",
          "title": "Reference System",
          "type": "`$STRING`",
          "short": "Reference system"
        },
        {
          "name": "regime",
          "title": "Regime",
          "type": "`$STRING`",
          "short": "Orbit regime"
        },
        {
          "name": "reused",
          "title": "Reused",
          "type": "`$BOOLEAN`",
          "short": "Whether the payload was reused"
        },
        {
          "name": "semi_major_axis_km",
          "title": "Semi Major Axis Km",
          "type": "`$NUMBER`",
          "short": "Semi-major axis in km"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Payload type"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "payload",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/payloads",
              "segments": [
                {
                  "lit": "payloads"
                }
              ],
              "parts": [
                "payloads"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/payloads/{id}",
              "segments": [
                {
                  "lit": "payloads"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "payloads",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "roadster": {
      "fields": [
        {
          "name": "apoapsis_au",
          "title": "Apoapsis Au",
          "type": "`$NUMBER`",
          "short": "Apoapsis in AU"
        },
        {
          "name": "details",
          "title": "Details",
          "type": "`$STRING`",
          "short": "Details"
        },
        {
          "name": "earth_distance_km",
          "title": "Earth Distance Km",
          "type": "`$NUMBER`",
          "short": "Distance from Earth in km"
        },
        {
          "name": "earth_distance_mi",
          "title": "Earth Distance Mi",
          "type": "`$NUMBER`",
          "short": "Distance from Earth in miles"
        },
        {
          "name": "eccentricity",
          "title": "Eccentricity",
          "type": "`$NUMBER`",
          "short": "Eccentricity"
        },
        {
          "name": "epoch_jd",
          "title": "Epoch Jd",
          "type": "`$NUMBER`",
          "short": "Epoch in Julian Date"
        },
        {
          "name": "flickr_images",
          "title": "Flickr Images",
          "type": "`$ARRAY`",
          "short": "Flickr images"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Roadster ID"
        },
        {
          "name": "inclination",
          "title": "Inclination",
          "type": "`$NUMBER`",
          "short": "Inclination"
        },
        {
          "name": "launch_date_unix",
          "title": "Launch Date Unix",
          "type": "`$INTEGER`",
          "short": "Launch date in unix timestamp"
        },
        {
          "name": "launch_date_utc",
          "title": "Launch Date Utc",
          "type": "`$STRING`",
          "short": "Launch date in UTC",
          "format": "date-time"
        },
        {
          "name": "launch_mass_kg",
          "title": "Launch Mass Kg",
          "type": "`$INTEGER`",
          "short": "Launch mass in kilograms"
        },
        {
          "name": "launch_mass_lbs",
          "title": "Launch Mass Lbs",
          "type": "`$INTEGER`",
          "short": "Launch mass in pounds"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude"
        },
        {
          "name": "mars_distance_km",
          "title": "Mars Distance Km",
          "type": "`$NUMBER`",
          "short": "Distance from Mars in km"
        },
        {
          "name": "mars_distance_mi",
          "title": "Mars Distance Mi",
          "type": "`$NUMBER`",
          "short": "Distance from Mars in miles"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Roadster name"
        },
        {
          "name": "norad_id",
          "title": "Norad Id",
          "type": "`$INTEGER`",
          "short": "NORAD ID"
        },
        {
          "name": "orbit_type",
          "title": "Orbit Type",
          "type": "`$STRING`",
          "short": "Orbit type"
        },
        {
          "name": "periapsis_arg",
          "title": "Periapsis Arg",
          "type": "`$NUMBER`",
          "short": "Argument of periapsis"
        },
        {
          "name": "periapsis_au",
          "title": "Periapsis Au",
          "type": "`$NUMBER`",
          "short": "Periapsis in AU"
        },
        {
          "name": "period_days",
          "title": "Period Days",
          "type": "`$NUMBER`",
          "short": "Orbital period in days"
        },
        {
          "name": "semi_major_axis_au",
          "title": "Semi Major Axis Au",
          "type": "`$NUMBER`",
          "short": "Semi-major axis in AU"
        },
        {
          "name": "speed_kph",
          "title": "Speed Kph",
          "type": "`$NUMBER`",
          "short": "Speed in km/h"
        },
        {
          "name": "speed_mph",
          "title": "Speed Mph",
          "type": "`$NUMBER`",
          "short": "Speed in mph"
        },
        {
          "name": "video",
          "title": "Video",
          "type": "`$STRING`",
          "short": "Video URL"
        },
        {
          "name": "wikipedia",
          "title": "Wikipedia",
          "type": "`$STRING`",
          "short": "Wikipedia URL"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "roadster",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/roadster",
              "segments": [
                {
                  "lit": "roadster"
                }
              ],
              "parts": [
                "roadster"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.flickr_images`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rocket": {
      "fields": [
        {
          "name": "active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "short": "Whether the rocket is active"
        },
        {
          "name": "boosters",
          "title": "Boosters",
          "type": "`$INTEGER`",
          "short": "Number of boosters"
        },
        {
          "name": "company",
          "title": "Company",
          "type": "`$STRING`",
          "short": "Company"
        },
        {
          "name": "cost_per_launch",
          "title": "Cost Per Launch",
          "type": "`$INTEGER`",
          "short": "Cost per launch in USD"
        },
        {
          "name": "country",
          "title": "Country",
          "type": "`$STRING`",
          "short": "Country of origin"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "diameter",
          "title": "Diameter",
          "type": "`$OBJECT`"
        },
        {
          "name": "first_flight",
          "title": "First Flight",
          "type": "`$STRING`",
          "short": "Date of first flight",
          "format": "date"
        },
        {
          "name": "flickr_images",
          "title": "Flickr Images",
          "type": "`$ARRAY`"
        },
        {
          "name": "height",
          "title": "Height",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Rocket ID"
        },
        {
          "name": "mass",
          "title": "Mass",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Rocket name"
        },
        {
          "name": "stages",
          "title": "Stages",
          "type": "`$INTEGER`",
          "short": "Number of stages"
        },
        {
          "name": "success_rate_pct",
          "title": "Success Rate Pct",
          "type": "`$NUMBER`",
          "short": "Success rate percentage"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Rocket type"
        },
        {
          "name": "wikipedia",
          "title": "Wikipedia",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "rocket",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/rockets",
              "segments": [
                {
                  "lit": "rockets"
                }
              ],
              "parts": [
                "rockets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/rockets/{id}",
              "segments": [
                {
                  "lit": "rockets"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "rockets",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ship": {
      "fields": [
        {
          "name": "abs",
          "title": "Abs",
          "type": "`$INTEGER`",
          "short": "ABS number"
        },
        {
          "name": "class",
          "title": "Class",
          "type": "`$INTEGER`",
          "short": "Ship class"
        },
        {
          "name": "course_deg",
          "title": "Course Deg",
          "type": "`$NUMBER`",
          "short": "Course in degrees"
        },
        {
          "name": "home_port",
          "title": "Home Port",
          "type": "`$STRING`",
          "short": "Home port"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Ship ID"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "short": "Image URL"
        },
        {
          "name": "imo",
          "title": "Imo",
          "type": "`$INTEGER`",
          "short": "IMO number"
        },
        {
          "name": "last_ais_update",
          "title": "Last Ais Update",
          "type": "`$STRING`",
          "short": "Last AIS update timestamp"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude"
        },
        {
          "name": "launches",
          "title": "Launches",
          "type": "`$ARRAY`",
          "short": "Launch IDs"
        },
        {
          "name": "legacy_id",
          "title": "Legacy Id",
          "type": "`$STRING`",
          "short": "Legacy ID"
        },
        {
          "name": "link",
          "title": "Link",
          "type": "`$STRING`",
          "short": "Link to ship info"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude"
        },
        {
          "name": "mass_kg",
          "title": "Mass Kg",
          "type": "`$INTEGER`",
          "short": "Mass in kilograms"
        },
        {
          "name": "mass_lbs",
          "title": "Mass Lbs",
          "type": "`$INTEGER`",
          "short": "Mass in pounds"
        },
        {
          "name": "mmsi",
          "title": "Mmsi",
          "type": "`$INTEGER`",
          "short": "MMSI number"
        },
        {
          "name": "model",
          "title": "Model",
          "type": "`$STRING`",
          "short": "Ship model"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Ship name"
        },
        {
          "name": "roles",
          "title": "Roles",
          "type": "`$ARRAY`",
          "short": "Ship roles"
        },
        {
          "name": "speed_kn",
          "title": "Speed Kn",
          "type": "`$NUMBER`",
          "short": "Speed in knots"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Ship status"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Ship type"
        },
        {
          "name": "year_built",
          "title": "Year Built",
          "type": "`$INTEGER`",
          "short": "Year built"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "ship",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/ships",
              "segments": [
                {
                  "lit": "ships"
                }
              ],
              "parts": [
                "ships"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/ships/{id}",
              "segments": [
                {
                  "lit": "ships"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "ships",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "starlink": {
      "fields": [
        {
          "name": "height_km",
          "title": "Height Km",
          "type": "`$NUMBER`",
          "short": "Current height in kilometers"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Starlink satellite ID"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Current latitude"
        },
        {
          "name": "launch",
          "title": "Launch",
          "type": "`$STRING`",
          "short": "Launch ID"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Current longitude"
        },
        {
          "name": "spaceTrack",
          "title": "Space Track",
          "type": "`$OBJECT`",
          "short": "Space-Track.org data"
        },
        {
          "name": "velocity_kms",
          "title": "Velocity Kms",
          "type": "`$NUMBER`",
          "short": "Current velocity in km/s"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`",
          "short": "Satellite version"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "starlink",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/starlink",
              "segments": [
                {
                  "lit": "starlink"
                }
              ],
              "parts": [
                "starlink"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/starlink/{id}",
              "segments": [
                {
                  "lit": "starlink"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "starlink",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.spaceTrack`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

