# SpacexRest SDK feature factory

from spacexrest_sdk.feature.base_feature import SpacexRestBaseFeature
from spacexrest_sdk.feature.test_feature import SpacexRestTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SpacexRestBaseFeature(),
        "test": lambda: SpacexRestTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
