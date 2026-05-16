# SpacexRest SDK utility: feature_add
module SpacexRestUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
