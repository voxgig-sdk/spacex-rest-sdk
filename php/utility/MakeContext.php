<?php
declare(strict_types=1);

// SpacexRest SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SpacexRestMakeContext
{
    public static function call(array $ctxmap, ?SpacexRestContext $basectx): SpacexRestContext
    {
        return new SpacexRestContext($ctxmap, $basectx);
    }
}
