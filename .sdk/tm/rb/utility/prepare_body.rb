# SpacexRest SDK utility: prepare_body
require_relative 'media'
module SpacexRestUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return SpacexRestUtilities.raw_body(ctx.reqdata) if SpacexRestUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
