# OpenMeteo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenMeteoFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenMeteoBaseFeature.new
    when "test"
      OpenMeteoTestFeature.new
    else
      OpenMeteoBaseFeature.new
    end
  end
end
