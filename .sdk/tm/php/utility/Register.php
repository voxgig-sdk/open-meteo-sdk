<?php
declare(strict_types=1);

// OpenMeteo SDK utility registration

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

OpenMeteoUtility::setRegistrar(function (OpenMeteoUtility $u): void {
    $u->clean = [OpenMeteoClean::class, 'call'];
    $u->done = [OpenMeteoDone::class, 'call'];
    $u->make_error = [OpenMeteoMakeError::class, 'call'];
    $u->feature_add = [OpenMeteoFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenMeteoFeatureHook::class, 'call'];
    $u->feature_init = [OpenMeteoFeatureInit::class, 'call'];
    $u->fetcher = [OpenMeteoFetcher::class, 'call'];
    $u->make_fetch_def = [OpenMeteoMakeFetchDef::class, 'call'];
    $u->make_context = [OpenMeteoMakeContext::class, 'call'];
    $u->make_options = [OpenMeteoMakeOptions::class, 'call'];
    $u->make_request = [OpenMeteoMakeRequest::class, 'call'];
    $u->make_response = [OpenMeteoMakeResponse::class, 'call'];
    $u->make_result = [OpenMeteoMakeResult::class, 'call'];
    $u->make_point = [OpenMeteoMakePoint::class, 'call'];
    $u->make_spec = [OpenMeteoMakeSpec::class, 'call'];
    $u->make_url = [OpenMeteoMakeUrl::class, 'call'];
    $u->param = [OpenMeteoParam::class, 'call'];
    $u->prepare_auth = [OpenMeteoPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenMeteoPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenMeteoPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenMeteoPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenMeteoPrepareParams::class, 'call'];
    $u->prepare_path = [OpenMeteoPreparePath::class, 'call'];
    $u->prepare_query = [OpenMeteoPrepareQuery::class, 'call'];
    $u->result_basic = [OpenMeteoResultBasic::class, 'call'];
    $u->result_body = [OpenMeteoResultBody::class, 'call'];
    $u->result_headers = [OpenMeteoResultHeaders::class, 'call'];
    $u->transform_request = [OpenMeteoTransformRequest::class, 'call'];
    $u->transform_response = [OpenMeteoTransformResponse::class, 'call'];
});
