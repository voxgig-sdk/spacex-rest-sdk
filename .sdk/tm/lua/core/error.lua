-- SpacexRest SDK error

local json = require("dkjson")

local SpacexRestError = {}
SpacexRestError.__index = SpacexRestError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function SpacexRestError.new(code, msg, ctx)
  local self = setmetatable({}, SpacexRestError)
  self.is_sdk_error = true
  self.sdk = "SpacexRest"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function SpacexRestError:context()
  return CONTEXT[self]
end


function SpacexRestError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function SpacexRestError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function SpacexRestError:to_json()
  return json.encode(self:to_table())
end


function SpacexRestError:__tostring()
  return self.msg
end


function SpacexRestError.__tojson(self)
  return self:to_json()
end


return SpacexRestError
