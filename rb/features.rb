# SpacexRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SpacexRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      SpacexRestBaseFeature.new
    when "test"
      SpacexRestTestFeature.new
    else
      SpacexRestBaseFeature.new
    end
  end
end
