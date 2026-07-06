// Typed models for the OpenMeteo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Historical {
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  elevation?: number
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

export interface HistoricalLoadMatch {
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  elevation?: number
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

export interface MarineForecast {
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

export interface MarineForecastLoadMatch {
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

export interface WeatherForecast {
  current?: Record<string, any>
  current_unit?: Record<string, any>
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  elevation?: number
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

export interface WeatherForecastLoadMatch {
  current?: Record<string, any>
  current_unit?: Record<string, any>
  daily?: Record<string, any>
  daily_unit?: Record<string, any>
  elevation?: number
  generationtime_m?: number
  hourly?: Record<string, any>
  hourly_unit?: Record<string, any>
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_second?: number
}

