<?php
declare(strict_types=1);

// OpenMeteo SDK utility: result_headers

class OpenMeteoResultHeaders
{
    public static function call(OpenMeteoContext $ctx): ?OpenMeteoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
