# SpacexRest SDK exists test

require "minitest/autorun"
require_relative "../SpacexRest_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SpacexRestSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
