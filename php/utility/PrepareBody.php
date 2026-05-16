<?php
declare(strict_types=1);

// SpacexRest SDK utility: prepare_body

class SpacexRestPrepareBody
{
    public static function call(SpacexRestContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
