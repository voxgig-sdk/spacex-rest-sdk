<?php
declare(strict_types=1);

// SpacexRest SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SpacexRestUtility::setRegistrar(function (SpacexRestUtility $u): void {
    $u->clean = [SpacexRestClean::class, 'call'];
    $u->done = [SpacexRestDone::class, 'call'];
    $u->make_error = [SpacexRestMakeError::class, 'call'];
    $u->feature_add = [SpacexRestFeatureAdd::class, 'call'];
    $u->feature_hook = [SpacexRestFeatureHook::class, 'call'];
    $u->feature_init = [SpacexRestFeatureInit::class, 'call'];
    $u->fetcher = [SpacexRestFetcher::class, 'call'];
    $u->make_fetch_def = [SpacexRestMakeFetchDef::class, 'call'];
    $u->make_context = [SpacexRestMakeContext::class, 'call'];
    $u->make_options = [SpacexRestMakeOptions::class, 'call'];
    $u->make_request = [SpacexRestMakeRequest::class, 'call'];
    $u->make_response = [SpacexRestMakeResponse::class, 'call'];
    $u->make_result = [SpacexRestMakeResult::class, 'call'];
    $u->make_point = [SpacexRestMakePoint::class, 'call'];
    $u->make_spec = [SpacexRestMakeSpec::class, 'call'];
    $u->make_url = [SpacexRestMakeUrl::class, 'call'];
    $u->param = [SpacexRestParam::class, 'call'];
    $u->prepare_auth = [SpacexRestPrepareAuth::class, 'call'];
    $u->prepare_body = [SpacexRestPrepareBody::class, 'call'];
    $u->prepare_headers = [SpacexRestPrepareHeaders::class, 'call'];
    $u->prepare_method = [SpacexRestPrepareMethod::class, 'call'];
    $u->prepare_params = [SpacexRestPrepareParams::class, 'call'];
    $u->prepare_path = [SpacexRestPreparePath::class, 'call'];
    $u->prepare_query = [SpacexRestPrepareQuery::class, 'call'];
    $u->result_basic = [SpacexRestResultBasic::class, 'call'];
    $u->result_body = [SpacexRestResultBody::class, 'call'];
    $u->result_headers = [SpacexRestResultHeaders::class, 'call'];
    $u->transform_request = [SpacexRestTransformRequest::class, 'call'];
    $u->transform_response = [SpacexRestTransformResponse::class, 'call'];
});
