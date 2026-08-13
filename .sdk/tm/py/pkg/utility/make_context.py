# SpacexRest SDK utility: make_context

from projectname_sdk.core.context import SpacexRestContext


def make_context_util(ctxmap, basectx):
    return SpacexRestContext(ctxmap, basectx)
