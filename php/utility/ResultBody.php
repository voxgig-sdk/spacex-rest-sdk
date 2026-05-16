<?php
declare(strict_types=1);

// SpacexRest SDK utility: result_body

class SpacexRestResultBody
{
    public static function call(SpacexRestContext $ctx): ?SpacexRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
