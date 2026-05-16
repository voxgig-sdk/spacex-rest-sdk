package = "voxgig-sdk-spacex-rest"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/spacex-rest-sdk.git"
}
description = {
  summary = "SpacexRest SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["spacex-rest_sdk"] = "spacex-rest_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
