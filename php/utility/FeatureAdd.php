<?php
declare(strict_types=1);

// OpenMeteo SDK utility: feature_add

class OpenMeteoFeatureAdd
{
    public static function call(OpenMeteoContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
