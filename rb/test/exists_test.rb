# OpenMeteo SDK exists test

require "minitest/autorun"
require_relative "../OpenMeteo_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenMeteoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
