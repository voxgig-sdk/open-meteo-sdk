<?php
declare(strict_types=1);

// Typed models for the OpenMeteo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Historical entity data model. */
class Historical
{
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $elevation = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

/** Request payload for Historical#load. */
class HistoricalLoadMatch
{
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $elevation = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

/** MarineForecast entity data model. */
class MarineForecast
{
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

/** Request payload for MarineForecast#load. */
class MarineForecastLoadMatch
{
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

/** WeatherForecast entity data model. */
class WeatherForecast
{
    public ?array $current = null;
    public ?array $current_unit = null;
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $elevation = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

/** Request payload for WeatherForecast#load. */
class WeatherForecastLoadMatch
{
    public ?array $current = null;
    public ?array $current_unit = null;
    public ?array $daily = null;
    public ?array $daily_unit = null;
    public ?float $elevation = null;
    public ?float $generationtime_m = null;
    public ?array $hourly = null;
    public ?array $hourly_unit = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_second = null;
}

