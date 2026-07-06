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
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
Historical = Struct.new(
  :daily,
  :daily_unit,
  :elevation,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

# Request payload for Historical#load.
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
HistoricalLoadMatch = Struct.new(
  :daily,
  :daily_unit,
  :elevation,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

# MarineForecast entity data model.
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
MarineForecast = Struct.new(
  :daily,
  :daily_unit,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

# Request payload for MarineForecast#load.
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
MarineForecastLoadMatch = Struct.new(
  :daily,
  :daily_unit,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

# WeatherForecast entity data model.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] current_unit
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
WeatherForecast = Struct.new(
  :current,
  :current_unit,
  :daily,
  :daily_unit,
  :elevation,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

# Request payload for WeatherForecast#load.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] current_unit
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] daily_unit
#   @return [Hash, nil]
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] generationtime_m
#   @return [Float, nil]
#
# @!attribute [rw] hourly
#   @return [Hash, nil]
#
# @!attribute [rw] hourly_unit
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
# @!attribute [rw] utc_offset_second
#   @return [Integer, nil]
WeatherForecastLoadMatch = Struct.new(
  :current,
  :current_unit,
  :daily,
  :daily_unit,
  :elevation,
  :generationtime_m,
  :hourly,
  :hourly_unit,
  :latitude,
  :longitude,
  :timezone,
  :timezone_abbreviation,
  :utc_offset_second,
  keyword_init: true
)

