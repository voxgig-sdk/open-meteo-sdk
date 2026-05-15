-- OpenMeteo SDK error

local OpenMeteoError = {}
OpenMeteoError.__index = OpenMeteoError


function OpenMeteoError.new(code, msg, ctx)
  local self = setmetatable({}, OpenMeteoError)
  self.is_sdk_error = true
  self.sdk = "OpenMeteo"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenMeteoError:error()
  return self.msg
end


function OpenMeteoError:__tostring()
  return self.msg
end


return OpenMeteoError
