# OpenMeteo SDK feature factory

from openmeteo_sdk.feature.base_feature import OpenMeteoBaseFeature
from openmeteo_sdk.feature.test_feature import OpenMeteoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenMeteoBaseFeature(),
        "test": lambda: OpenMeteoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
