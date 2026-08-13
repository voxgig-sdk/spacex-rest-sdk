# SpacexRest SDK exists test

import pytest
from spacexrest_sdk import SpacexRestSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SpacexRestSDK.test(None, None)
        assert testsdk is not None
