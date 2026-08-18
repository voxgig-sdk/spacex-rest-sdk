-- SpacexRest SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "SpacexRest",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "land_landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "last_update",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reuse_count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "serial",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "water_landings",
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
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "asds_landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "block",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_update",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reuse_count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rtls_attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rtls_landings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "serial",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landing_attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "landing_successes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "locality",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
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
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "capsules",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "core",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cores",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "crew",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "date_local",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date_precision",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date_unix",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "date_utc",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "failures",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "fairings",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "flight",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "flight_number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "gridfins",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landing_attempt",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "landing_success",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "landing_type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "landpad",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launchpad",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "legs",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "links",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "net",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "payloads",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "reused",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "rocket",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ships",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "static_fire_date_unix",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "static_fire_date_utc",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "success",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "tdb",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "upcoming",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "window",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch_attempts",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_successes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "locality",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rockets",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
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
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "arg_of_pericenter",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "customers",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "eccentricity",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "epoch",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inclination_deg",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lifespan_years",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "manufacturers",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "mass_kg",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mass_lbs",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mean_anomaly",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mean_motion",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nationalities",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "norad_ids",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "orbit",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "periapsis_km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "period_min",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "raan",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "reference_system",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regime",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reused",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "semi_major_axis_km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "type",
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
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "details",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "earth_distance_km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "earth_distance_mi",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "eccentricity",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "epoch_jd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "flickr_images",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inclination",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch_date_unix",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_date_utc",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "launch_mass_kg",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "launch_mass_lbs",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mars_distance_km",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mars_distance_mi",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "norad_id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "orbit_type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "periapsis_arg",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "periapsis_au",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "period_days",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "semi_major_axis_au",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "speed_kph",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "speed_mph",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "video",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "wikipedia",
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
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "boosters",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "company",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cost_per_launch",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "country",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mass",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "stages",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "success_rate_pct",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "type",
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
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "course_deg",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "home_port",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "imo",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "last_ais_update",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "legacy_id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "link",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "mass_kg",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mass_lbs",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mmsi",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "model",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "roles",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "speed_kn",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year_built",
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
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "launch",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "spaceTrack",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "velocity_kms",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "version",
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
