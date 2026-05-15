<?php
declare(strict_types=1);

// OpenMeteo SDK utility: result_body

class OpenMeteoResultBody
{
    public static function call(OpenMeteoContext $ctx): ?OpenMeteoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
