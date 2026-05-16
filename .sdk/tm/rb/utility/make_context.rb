# SpacexRest SDK utility: make_context
require_relative '../core/context'
module SpacexRestUtilities
  MakeContext = ->(ctxmap, basectx) {
    SpacexRestContext.new(ctxmap, basectx)
  }
end
