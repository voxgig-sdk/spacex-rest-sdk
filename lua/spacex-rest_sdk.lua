-- SpacexRest SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local SpacexRestSDK = {}
SpacexRestSDK.__index = SpacexRestSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

SpacexRestSDK._make_feature = _make_feature


function SpacexRestSDK.new(options)
  local self = setmetatable({}, SpacexRestSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function SpacexRestSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function SpacexRestSDK:get_utility()
  return Utility.copy(self._utility)
end


function SpacexRestSDK:get_root_ctx()
  return self._rootctx
end


function SpacexRestSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function SpacexRestSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Capsule():list() / client:Capsule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Capsule(data)
  local EntityMod = require("entity.capsule_entity")
  if data == nil then
    if self._capsule == nil then
      self._capsule = EntityMod.new(self, nil)
    end
    return self._capsule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Core():list() / client:Core():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Core(data)
  local EntityMod = require("entity.core_entity")
  if data == nil then
    if self._core == nil then
      self._core = EntityMod.new(self, nil)
    end
    return self._core
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Crew():list() / client:Crew():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Crew(data)
  local EntityMod = require("entity.crew_entity")
  if data == nil then
    if self._crew == nil then
      self._crew = EntityMod.new(self, nil)
    end
    return self._crew
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Landpad():list() / client:Landpad():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Landpad(data)
  local EntityMod = require("entity.landpad_entity")
  if data == nil then
    if self._landpad == nil then
      self._landpad = EntityMod.new(self, nil)
    end
    return self._landpad
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Launch():list() / client:Launch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Launch(data)
  local EntityMod = require("entity.launch_entity")
  if data == nil then
    if self._launch == nil then
      self._launch = EntityMod.new(self, nil)
    end
    return self._launch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Launchpad():list() / client:Launchpad():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Launchpad(data)
  local EntityMod = require("entity.launchpad_entity")
  if data == nil then
    if self._launchpad == nil then
      self._launchpad = EntityMod.new(self, nil)
    end
    return self._launchpad
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Payload():list() / client:Payload():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Payload(data)
  local EntityMod = require("entity.payload_entity")
  if data == nil then
    if self._payload == nil then
      self._payload = EntityMod.new(self, nil)
    end
    return self._payload
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Roadster():list() / client:Roadster():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Roadster(data)
  local EntityMod = require("entity.roadster_entity")
  if data == nil then
    if self._roadster == nil then
      self._roadster = EntityMod.new(self, nil)
    end
    return self._roadster
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Rocket():list() / client:Rocket():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Rocket(data)
  local EntityMod = require("entity.rocket_entity")
  if data == nil then
    if self._rocket == nil then
      self._rocket = EntityMod.new(self, nil)
    end
    return self._rocket
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ship():list() / client:Ship():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Ship(data)
  local EntityMod = require("entity.ship_entity")
  if data == nil then
    if self._ship == nil then
      self._ship = EntityMod.new(self, nil)
    end
    return self._ship
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Starlink():list() / client:Starlink():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function SpacexRestSDK:Starlink(data)
  local EntityMod = require("entity.starlink_entity")
  if data == nil then
    if self._starlink == nil then
      self._starlink = EntityMod.new(self, nil)
    end
    return self._starlink
  end
  return EntityMod.new(self, data)
end




function SpacexRestSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = SpacexRestSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return SpacexRestSDK
