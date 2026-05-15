package = "voxgig-sdk-open-meteo"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/open-meteo-sdk.git"
}
description = {
  summary = "OpenMeteo SDK for Lua",
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
    ["open-meteo_sdk"] = "open-meteo_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
