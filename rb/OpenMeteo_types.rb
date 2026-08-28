# frozen_string_literal: true

# Typed models for the OpenMeteo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Historical entity data model.
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_units
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_ms
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_units
#   @return [Hash, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] timezone_abbreviation
#   @return [String, nil]
#
# @!attribute [rw] utc_offset_seconds
#   @return [Integer, nil]
Historical = Struct.new(
  :daily,
  :daily_units,
  :elevation,
  :generationtime_ms,
  :hourly,
  :hourly_units,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_seconds,
  keyword_init: true
)

# Request payload for Historical#load.
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] end_date
#   @return [String]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] precipitation_unit
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String]
#
# @!attribute [rw] temperature_unit
#   @return [String, nil]
#
# @!attribute [rw] timeformat
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] wind_speed_unit
#   @return [String, nil]
HistoricalLoadMatch = Struct.new(
  :daily,
  :end_date,
  :hourly,
  :latitude,
  :longitude,
  :precipitation_unit,
  :start_date,
  :temperature_unit,
  :timeformat,
  :timezone,
  :wind_speed_unit,
  keyword_init: true
)

# MarineForecast entity data model.
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_units
#   @return [Hash, nil]
#
# @!attribute [rw] generationtime_ms
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_units
#   @return [Hash, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] timezone_abbreviation
#   @return [String, nil]
#
# @!attribute [rw] utc_offset_seconds
#   @return [Integer, nil]
MarineForecast = Struct.new(
  :daily,
  :daily_units,
  :generationtime_ms,
  :hourly,
  :hourly_units,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_seconds,
  keyword_init: true
)

# Request payload for MarineForecast#load.
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] forecast_day
#   @return [Integer, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] past_day
#   @return [Integer, nil]
#
# @!attribute [rw] timeformat
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
MarineForecastLoadMatch = Struct.new(
  :daily,
  :forecast_day,
  :hourly,
  :latitude,
  :longitude,
  :past_day,
  :timeformat,
  :timezone,
  keyword_init: true
)

# WeatherForecast entity data model.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] current_units
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_units
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_ms
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_units
#   @return [Hash, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] timezone_abbreviation
#   @return [String, nil]
#
# @!attribute [rw] utc_offset_seconds
#   @return [Integer, nil]
WeatherForecast = Struct.new(
  :current,
  :current_units,
  :daily,
  :daily_units,
  :elevation,
  :generationtime_ms,
  :hourly,
  :hourly_units,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_seconds,
  keyword_init: true
)

# Request payload for WeatherForecast#load.
#
# @!attribute [rw] apikey
#   @return [String, nil]
#
# @!attribute [rw] cell_selection
#   @return [String, nil]
#
# @!attribute [rw] current
#   @return [Array, nil]
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] end_hour
#   @return [String, nil]
#
# @!attribute [rw] end_minutely_15
#   @return [String, nil]
#
# @!attribute [rw] forecast_day
#   @return [Integer, nil]
#
# @!attribute [rw] forecast_hour
#   @return [Integer, nil]
#
# @!attribute [rw] forecast_minutely_15
#   @return [Integer, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] past_day
#   @return [Integer, nil]
#
# @!attribute [rw] past_hour
#   @return [Integer, nil]
#
# @!attribute [rw] past_minutely_15
#   @return [Integer, nil]
#
# @!attribute [rw] precipitation_unit
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] start_hour
#   @return [String, nil]
#
# @!attribute [rw] start_minutely_15
#   @return [String, nil]
#
# @!attribute [rw] temperature_unit
#   @return [String, nil]
#
# @!attribute [rw] timeformat
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] wind_speed_unit
#   @return [String, nil]
WeatherForecastLoadMatch = Struct.new(
  :apikey,
  :cell_selection,
  :current,
  :daily,
  :elevation,
  :end_date,
  :end_hour,
  :end_minutely_15,
  :forecast_day,
  :forecast_hour,
  :forecast_minutely_15,
  :hourly,
  :latitude,
  :longitude,
  :model,
  :past_day,
  :past_hour,
  :past_minutely_15,
  :precipitation_unit,
  :start_date,
  :start_hour,
  :start_minutely_15,
  :temperature_unit,
  :timeformat,
  :timezone,
  :wind_speed_unit,
  keyword_init: true
)

