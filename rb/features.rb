# OpenMeteo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenMeteoFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenMeteoBaseFeature.new
    when "ratelimit"
      OpenMeteoRatelimitFeature.new
    when "retry"
      OpenMeteoRetryFeature.new
    when "test"
      OpenMeteoTestFeature.new
    when "timeout"
      OpenMeteoTimeoutFeature.new
    else
      OpenMeteoBaseFeature.new
    end
  end
end
