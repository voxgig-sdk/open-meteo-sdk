<?php
declare(strict_types=1);

// OpenMeteo SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenMeteoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenMeteoBaseFeature();
            case "test":
                return new OpenMeteoTestFeature();
            default:
                return new OpenMeteoBaseFeature();
        }
    }
}
