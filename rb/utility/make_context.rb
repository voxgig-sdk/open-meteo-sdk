# OpenMeteo SDK utility: make_context
require_relative '../core/context'
module OpenMeteoUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenMeteoContext.new(ctxmap, basectx)
  }
end
