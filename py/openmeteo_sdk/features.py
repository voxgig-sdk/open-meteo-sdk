# OpenMeteo SDK feature factory

from openmeteo_sdk.feature.base_feature import OpenMeteoBaseFeature
from openmeteo_sdk.feature.ratelimit_feature import OpenMeteoRatelimitFeature
from openmeteo_sdk.feature.retry_feature import OpenMeteoRetryFeature
from openmeteo_sdk.feature.test_feature import OpenMeteoTestFeature
from openmeteo_sdk.feature.timeout_feature import OpenMeteoTimeoutFeature


_FEATURES = {
    "base": lambda: OpenMeteoBaseFeature(),
    "ratelimit": lambda: OpenMeteoRatelimitFeature(),
    "retry": lambda: OpenMeteoRetryFeature(),
    "test": lambda: OpenMeteoTestFeature(),
    "timeout": lambda: OpenMeteoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
