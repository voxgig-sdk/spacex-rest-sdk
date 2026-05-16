<?php
declare(strict_types=1);

// SpacexRest SDK utility: feature_add

class SpacexRestFeatureAdd
{
    public static function call(SpacexRestContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
