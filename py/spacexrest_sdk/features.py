# SpacexRest SDK feature factory

from spacexrest_sdk.feature.base_feature import SpacexRestBaseFeature
from spacexrest_sdk.feature.ratelimit_feature import SpacexRestRatelimitFeature
from spacexrest_sdk.feature.retry_feature import SpacexRestRetryFeature
from spacexrest_sdk.feature.test_feature import SpacexRestTestFeature
from spacexrest_sdk.feature.timeout_feature import SpacexRestTimeoutFeature


_FEATURES = {
    "base": lambda: SpacexRestBaseFeature(),
    "ratelimit": lambda: SpacexRestRatelimitFeature(),
    "retry": lambda: SpacexRestRetryFeature(),
    "test": lambda: SpacexRestTestFeature(),
    "timeout": lambda: SpacexRestTimeoutFeature(),
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
