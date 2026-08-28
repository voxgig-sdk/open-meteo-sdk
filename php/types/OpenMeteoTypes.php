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
    public ?array $daily_units = null;
    public ?float $elevation = null;
    public ?float $generationtime_ms = null;
    public ?array $hourly = null;
    public ?array $hourly_units = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_seconds = null;
}

/** Request payload for Historical#load. */
class HistoricalLoadMatch
{
    public ?array $daily = null;
    public string $end_date;
    public ?array $hourly = null;
    public float $latitude;
    public float $longitude;
    public ?string $precipitation_unit = null;
    public string $start_date;
    public ?string $temperature_unit = null;
    public ?string $timeformat = null;
    public ?string $timezone = null;
    public ?string $wind_speed_unit = null;
}

/** MarineForecast entity data model. */
class MarineForecast
{
    public ?array $daily = null;
    public ?array $daily_units = null;
    public ?float $generationtime_ms = null;
    public ?array $hourly = null;
    public ?array $hourly_units = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_seconds = null;
}

/** Request payload for MarineForecast#load. */
class MarineForecastLoadMatch
{
    public ?array $daily = null;
    public ?int $forecast_day = null;
    public ?array $hourly = null;
    public float $latitude;
    public float $longitude;
    public ?int $past_day = null;
    public ?string $timeformat = null;
    public ?string $timezone = null;
}

/** WeatherForecast entity data model. */
class WeatherForecast
{
    public ?array $current = null;
    public ?array $current_units = null;
    public ?array $daily = null;
    public ?array $daily_units = null;
    public ?float $elevation = null;
    public ?float $generationtime_ms = null;
    public ?array $hourly = null;
    public ?array $hourly_units = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $timezone = null;
    public ?string $timezone_abbreviation = null;
    public ?int $utc_offset_seconds = null;
}

/** Request payload for WeatherForecast#load. */
class WeatherForecastLoadMatch
{
    public ?string $apikey = null;
    public ?string $cell_selection = null;
    public ?array $current = null;
    public ?array $daily = null;
    public ?float $elevation = null;
    public ?string $end_date = null;
    public ?string $end_hour = null;
    public ?string $end_minutely_15 = null;
    public ?int $forecast_day = null;
    public ?int $forecast_hour = null;
    public ?int $forecast_minutely_15 = null;
    public ?array $hourly = null;
    public float $latitude;
    public float $longitude;
    public ?string $model = null;
    public ?int $past_day = null;
    public ?int $past_hour = null;
    public ?int $past_minutely_15 = null;
    public ?string $precipitation_unit = null;
    public ?string $start_date = null;
    public ?string $start_hour = null;
    public ?string $start_minutely_15 = null;
    public ?string $temperature_unit = null;
    public ?string $timeformat = null;
    public ?string $timezone = null;
    public ?string $wind_speed_unit = null;
}

