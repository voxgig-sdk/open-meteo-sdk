<?php
declare(strict_types=1);

// OpenMeteo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenMeteoMakeContext
{
    public static function call(array $ctxmap, ?OpenMeteoContext $basectx): OpenMeteoContext
    {
        return new OpenMeteoContext($ctxmap, $basectx);
    }
}
