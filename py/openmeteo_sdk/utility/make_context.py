# OpenMeteo SDK utility: make_context

from openmeteo_sdk.core.context import OpenMeteoContext


def make_context_util(ctxmap, basectx):
    return OpenMeteoContext(ctxmap, basectx)
