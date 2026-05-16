-- SpacexRest SDK error

local SpacexRestError = {}
SpacexRestError.__index = SpacexRestError


function SpacexRestError.new(code, msg, ctx)
  local self = setmetatable({}, SpacexRestError)
  self.is_sdk_error = true
  self.sdk = "SpacexRest"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SpacexRestError:error()
  return self.msg
end


function SpacexRestError:__tostring()
  return self.msg
end


return SpacexRestError
