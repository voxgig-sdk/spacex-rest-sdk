<?php
declare(strict_types=1);

// SpacexRest SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SpacexRestFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SpacexRestBaseFeature();
            case "test":
                return new SpacexRestTestFeature();
            default:
                return new SpacexRestBaseFeature();
        }
    }
}
