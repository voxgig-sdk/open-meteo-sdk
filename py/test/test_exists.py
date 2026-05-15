# ProjectName SDK exists test

import pytest
from openmeteo_sdk import OpenMeteoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenMeteoSDK.test(None, None)
        assert testsdk is not None
