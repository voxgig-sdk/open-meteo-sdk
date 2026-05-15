<?php
declare(strict_types=1);

// OpenMeteo SDK utility: prepare_body

class OpenMeteoPrepareBody
{
    public static function call(OpenMeteoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
