-- SpacexRest SDK exists test

local sdk = require("spacex-rest_sdk")

describe("SpacexRestSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
