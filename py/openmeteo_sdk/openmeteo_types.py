# Typed models for the OpenMeteo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Historical(TypedDict, total=False):
    daily: dict
    daily_units: dict
    elevation: float
    generationtime_ms: float
    hourly: dict
    hourly_units: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_seconds: int


class HistoricalLoadMatchRequired(TypedDict):
    end_date: str
    latitude: float
    longitude: float
    start_date: str


class HistoricalLoadMatch(HistoricalLoadMatchRequired, total=False):
    daily: list
    hourly: list
    precipitation_unit: str
    temperature_unit: str
    timeformat: str
    timezone: str
    wind_speed_unit: str


class MarineForecast(TypedDict, total=False):
    daily: dict
    daily_units: dict
    generationtime_ms: float
    hourly: dict
    hourly_units: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_seconds: int


class MarineForecastLoadMatchRequired(TypedDict):
    latitude: float
    longitude: float


class MarineForecastLoadMatch(MarineForecastLoadMatchRequired, total=False):
    daily: list
    forecast_day: int
    hourly: list
    past_day: int
    timeformat: str
    timezone: str


class WeatherForecast(TypedDict, total=False):
    current: dict
    current_units: dict
    daily: dict
    daily_units: dict
    elevation: float
    generationtime_ms: float
    hourly: dict
    hourly_units: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_seconds: int


class WeatherForecastLoadMatchRequired(TypedDict):
    latitude: float
    longitude: float


class WeatherForecastLoadMatch(WeatherForecastLoadMatchRequired, total=False):
    apikey: str
    cell_selection: str
    current: list
    daily: list
    elevation: float
    end_date: str
    end_hour: str
    end_minutely_15: str
    forecast_day: int
    forecast_hour: int
    forecast_minutely_15: int
    hourly: list
    model: str
    past_day: int
    past_hour: int
    past_minutely_15: int
    precipitation_unit: str
    start_date: str
    start_hour: str
    start_minutely_15: str
    temperature_unit: str
    timeformat: str
    timezone: str
    wind_speed_unit: str
