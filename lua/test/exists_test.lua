-- ProjectName SDK exists test

local sdk = require("open-meteo_sdk")

describe("OpenMeteoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
