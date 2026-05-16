<?php
declare(strict_types=1);

// SpacexRest SDK utility: result_headers

class SpacexRestResultHeaders
{
    public static function call(SpacexRestContext $ctx): ?SpacexRestResult
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
