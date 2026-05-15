# OpenMeteo SDK utility: feature_add
module OpenMeteoUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
