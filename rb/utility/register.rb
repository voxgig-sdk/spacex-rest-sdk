# SpacexRest SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SpacexRestUtility.registrar = ->(u) {
  u.clean = SpacexRestUtilities::Clean
  u.done = SpacexRestUtilities::Done
  u.make_error = SpacexRestUtilities::MakeError
  u.feature_add = SpacexRestUtilities::FeatureAdd
  u.feature_hook = SpacexRestUtilities::FeatureHook
  u.feature_init = SpacexRestUtilities::FeatureInit
  u.fetcher = SpacexRestUtilities::Fetcher
  u.make_fetch_def = SpacexRestUtilities::MakeFetchDef
  u.make_context = SpacexRestUtilities::MakeContext
  u.make_options = SpacexRestUtilities::MakeOptions
  u.make_request = SpacexRestUtilities::MakeRequest
  u.make_response = SpacexRestUtilities::MakeResponse
  u.make_result = SpacexRestUtilities::MakeResult
  u.make_point = SpacexRestUtilities::MakePoint
  u.make_spec = SpacexRestUtilities::MakeSpec
  u.make_url = SpacexRestUtilities::MakeUrl
  u.param = SpacexRestUtilities::Param
  u.prepare_auth = SpacexRestUtilities::PrepareAuth
  u.prepare_body = SpacexRestUtilities::PrepareBody
  u.prepare_headers = SpacexRestUtilities::PrepareHeaders
  u.prepare_method = SpacexRestUtilities::PrepareMethod
  u.prepare_params = SpacexRestUtilities::PrepareParams
  u.prepare_path = SpacexRestUtilities::PreparePath
  u.prepare_query = SpacexRestUtilities::PrepareQuery
  u.graphql_body = SpacexRestUtilities::GraphqlBody
  u.graphql_errors = SpacexRestUtilities::GraphqlErrors
  u.result_basic = SpacexRestUtilities::ResultBasic
  u.result_body = SpacexRestUtilities::ResultBody
  u.result_headers = SpacexRestUtilities::ResultHeaders
  u.transform_request = SpacexRestUtilities::TransformRequest
  u.transform_response = SpacexRestUtilities::TransformResponse
}
