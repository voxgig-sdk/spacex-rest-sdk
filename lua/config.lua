-- SpacexRest SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "SpacexRest",
      slug = "spacex-rest",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.spacexdata.com/v5",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["capsule"] = {},
        ["core"] = {},
        ["crew"] = {},
        ["landpad"] = {},
        ["launch"] = {},
        ["launchpad"] = {},
        ["payload"] = {},
        ["roadster"] = {},
        ["rocket"] = {},
        ["ship"] = {},
        ["starlink"] = {},
      },
    },
    entity = {
      ["capsule"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Capsule serial number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "land_landings",
            ["short"] = "Number of land landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "last_update",
            ["short"] = "Last update about the capsule",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reuse_count",
            ["short"] = "Number of times capsule has been reused",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "serial",
            ["short"] = "Capsule serial number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Capsule status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Capsule type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "water_landings",
            ["short"] = "Number of water landings",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "capsule",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/capsules",
                ["parts"] = {
                  "capsules",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/capsules/{id}",
                ["parts"] = {
                  "capsules",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["core"] = {
        ["fields"] = {
          {
            ["name"] = "asds_attempts",
            ["short"] = "Number of autonomous spaceport drone ship landing attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "asds_landings",
            ["short"] = "Number of successful ASDS landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "block",
            ["short"] = "Core block number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Core serial number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_update",
            ["short"] = "Last update about the core",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reuse_count",
            ["short"] = "Number of times core has been reused",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rtls_attempts",
            ["short"] = "Number of return to launch site attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rtls_landings",
            ["short"] = "Number of successful RTLS landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "serial",
            ["short"] = "Core serial number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Core status (active, inactive, unknown, expended, lost, retired)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "core",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cores",
                ["parts"] = {
                  "cores",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cores/{id}",
                ["parts"] = {
                  "cores",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["crew"] = {
        ["fields"] = {
          {
            ["name"] = "agency",
            ["short"] = "Agency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Crew member ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "image",
            ["short"] = "Image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["short"] = "Crew member name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Status (active, inactive, retired, unknown)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
            ["short"] = "Wikipedia URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "crew",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/crew",
                ["parts"] = {
                  "crew",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/crew/{id}",
                ["parts"] = {
                  "crew",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["landpad"] = {
        ["fields"] = {
          {
            ["name"] = "details",
            ["short"] = "Landing pad details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_name",
            ["short"] = "Full landing pad name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Landing pad ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landing_attempts",
            ["short"] = "Number of landing attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "landing_successes",
            ["short"] = "Number of successful landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "locality",
            ["short"] = "Locality",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Landing pad name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["short"] = "Region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Landing pad status (active, inactive, unknown, retired, lost, under construction)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Landing pad type (ASDS, RTLS)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
            ["short"] = "Wikipedia URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "landpad",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/landpads",
                ["parts"] = {
                  "landpads",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/landpads/{id}",
                ["parts"] = {
                  "landpads",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["launch"] = {
        ["fields"] = {
          {
            ["name"] = "auto_update",
            ["short"] = "Whether the launch data is automatically updated",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "capsules",
            ["short"] = "Capsule IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "core",
            ["short"] = "Core ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cores",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "crew",
            ["short"] = "Crew member IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "date_local",
            ["short"] = "Launch date in local time",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date_precision",
            ["short"] = "Date precision (hour, day, month, quarter, half, year)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date_unix",
            ["short"] = "Launch date in unix timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "date_utc",
            ["short"] = "Launch date in UTC",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "details",
            ["short"] = "Launch details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "failures",
            ["short"] = "Launch failures",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "fairings",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "flight",
            ["short"] = "Core flight number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "flight_number",
            ["short"] = "Flight number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "gridfins",
            ["short"] = "Whether core has grid fins",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["short"] = "Launch ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landing_attempt",
            ["short"] = "Whether landing was attempted",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "landing_success",
            ["short"] = "Whether landing was successful",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "landing_type",
            ["short"] = "Landing type (ASDS, RTLS, Ocean)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landpad",
            ["short"] = "Landing pad ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launchpad",
            ["short"] = "Launchpad ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "legs",
            ["short"] = "Whether core has legs",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "links",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["short"] = "Launch name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "net",
            ["short"] = "No earlier than",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "payloads",
            ["short"] = "Payload IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reused",
            ["short"] = "Whether core was reused",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "rocket",
            ["short"] = "Rocket ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ships",
            ["short"] = "Ship IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "static_fire_date_unix",
            ["short"] = "Static fire date in unix timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "static_fire_date_utc",
            ["short"] = "Static fire date in UTC",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "success",
            ["short"] = "Launch success status",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "tdb",
            ["short"] = "To be determined",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "upcoming",
            ["short"] = "Whether the launch is upcoming",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "window",
            ["short"] = "Launch window in seconds",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "launch",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launches",
                ["parts"] = {
                  "launches",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launches/latest",
                ["parts"] = {
                  "launches",
                  "latest",
                },
                ["select"] = {
                  ["$action"] = "latest",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launches/past",
                ["parts"] = {
                  "launches",
                  "past",
                },
                ["select"] = {
                  ["$action"] = "past",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launches/upcoming",
                ["parts"] = {
                  "launches",
                  "upcoming",
                },
                ["select"] = {
                  ["$action"] = "upcoming",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launches/{id}",
                ["parts"] = {
                  "launches",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["launchpad"] = {
        ["fields"] = {
          {
            ["name"] = "details",
            ["short"] = "Launchpad details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_name",
            ["short"] = "Full launchpad name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Launchpad ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch_attempts",
            ["short"] = "Number of launch attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_successes",
            ["short"] = "Number of successful launches",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "locality",
            ["short"] = "Locality",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Launchpad name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["short"] = "Region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rockets",
            ["short"] = "Rocket IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["short"] = "Launchpad status (active, inactive, unknown, retired, lost, under construction)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "launchpad",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launchpads",
                ["parts"] = {
                  "launchpads",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/launchpads/{id}",
                ["parts"] = {
                  "launchpads",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["payload"] = {
        ["fields"] = {
          {
            ["name"] = "apoapsis_km",
            ["short"] = "Apoapsis in km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "arg_of_pericenter",
            ["short"] = "Argument of pericenter",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "customers",
            ["short"] = "Customers",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "eccentricity",
            ["short"] = "Eccentricity",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "epoch",
            ["short"] = "Epoch",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Payload ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inclination_deg",
            ["short"] = "Inclination in degrees",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch",
            ["short"] = "Launch ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lifespan_years",
            ["short"] = "Lifespan in years",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "manufacturers",
            ["short"] = "Manufacturers",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "mass_kg",
            ["short"] = "Payload mass in kilograms",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mass_lbs",
            ["short"] = "Payload mass in pounds",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mean_anomaly",
            ["short"] = "Mean anomaly",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mean_motion",
            ["short"] = "Mean motion",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Payload name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nationalities",
            ["short"] = "Nationalities",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "norad_ids",
            ["short"] = "NORAD IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "orbit",
            ["short"] = "Orbit type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "periapsis_km",
            ["short"] = "Periapsis in km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "period_min",
            ["short"] = "Orbital period in minutes",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "raan",
            ["short"] = "Right ascension of the ascending node",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "reference_system",
            ["short"] = "Reference system",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regime",
            ["short"] = "Orbit regime",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reused",
            ["short"] = "Whether the payload was reused",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "semi_major_axis_km",
            ["short"] = "Semi-major axis in km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "type",
            ["short"] = "Payload type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "payload",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/payloads",
                ["parts"] = {
                  "payloads",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/payloads/{id}",
                ["parts"] = {
                  "payloads",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["roadster"] = {
        ["fields"] = {
          {
            ["name"] = "apoapsis_au",
            ["short"] = "Apoapsis in AU",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "details",
            ["short"] = "Details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "earth_distance_km",
            ["short"] = "Distance from Earth in km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "earth_distance_mi",
            ["short"] = "Distance from Earth in miles",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "eccentricity",
            ["short"] = "Eccentricity",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "epoch_jd",
            ["short"] = "Epoch in Julian Date",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "flickr_images",
            ["short"] = "Flickr images",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["short"] = "Roadster ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inclination",
            ["short"] = "Inclination",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch_date_unix",
            ["short"] = "Launch date in unix timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_date_utc",
            ["short"] = "Launch date in UTC",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launch_mass_kg",
            ["short"] = "Launch mass in kilograms",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_mass_lbs",
            ["short"] = "Launch mass in pounds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mars_distance_km",
            ["short"] = "Distance from Mars in km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mars_distance_mi",
            ["short"] = "Distance from Mars in miles",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Roadster name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "norad_id",
            ["short"] = "NORAD ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "orbit_type",
            ["short"] = "Orbit type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "periapsis_arg",
            ["short"] = "Argument of periapsis",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "periapsis_au",
            ["short"] = "Periapsis in AU",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "period_days",
            ["short"] = "Orbital period in days",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "semi_major_axis_au",
            ["short"] = "Semi-major axis in AU",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "speed_kph",
            ["short"] = "Speed in km/h",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "speed_mph",
            ["short"] = "Speed in mph",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "video",
            ["short"] = "Video URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
            ["short"] = "Wikipedia URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "roadster",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/roadster",
                ["parts"] = {
                  "roadster",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.flickr_images`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["rocket"] = {
        ["fields"] = {
          {
            ["name"] = "active",
            ["short"] = "Whether the rocket is active",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "boosters",
            ["short"] = "Number of boosters",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "company",
            ["short"] = "Company",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cost_per_launch",
            ["short"] = "Cost per launch in USD",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "country",
            ["short"] = "Country of origin",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "diameter",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "first_flight",
            ["short"] = "Date of first flight",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "flickr_images",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "height",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["short"] = "Rocket ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mass",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["short"] = "Rocket name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "stages",
            ["short"] = "Number of stages",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "success_rate_pct",
            ["short"] = "Success rate percentage",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "type",
            ["short"] = "Rocket type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "rocket",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rockets",
                ["parts"] = {
                  "rockets",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rockets/{id}",
                ["parts"] = {
                  "rockets",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ship"] = {
        ["fields"] = {
          {
            ["name"] = "abs",
            ["short"] = "ABS number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "class",
            ["short"] = "Ship class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "course_deg",
            ["short"] = "Course in degrees",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "home_port",
            ["short"] = "Home port",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Ship ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "image",
            ["short"] = "Image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "imo",
            ["short"] = "IMO number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "last_ais_update",
            ["short"] = "Last AIS update timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launches",
            ["short"] = "Launch IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "legacy_id",
            ["short"] = "Legacy ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "link",
            ["short"] = "Link to ship info",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mass_kg",
            ["short"] = "Mass in kilograms",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mass_lbs",
            ["short"] = "Mass in pounds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mmsi",
            ["short"] = "MMSI number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "model",
            ["short"] = "Ship model",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Ship name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "roles",
            ["short"] = "Ship roles",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "speed_kn",
            ["short"] = "Speed in knots",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "status",
            ["short"] = "Ship status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Ship type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year_built",
            ["short"] = "Year built",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "ship",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ships",
                ["parts"] = {
                  "ships",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ships/{id}",
                ["parts"] = {
                  "ships",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["starlink"] = {
        ["fields"] = {
          {
            ["name"] = "height_km",
            ["short"] = "Current height in kilometers",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Starlink satellite ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Current latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch",
            ["short"] = "Launch ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Current longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "spaceTrack",
            ["short"] = "Space-Track.org data",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "velocity_kms",
            ["short"] = "Current velocity in km/s",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "version",
            ["short"] = "Satellite version",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "starlink",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/starlink",
                ["parts"] = {
                  "starlink",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/starlink/{id}",
                ["parts"] = {
                  "starlink",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.spaceTrack`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
