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
    daily_unit: dict
    elevation: float
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int


class HistoricalLoadMatch(TypedDict, total=False):
    daily: dict
    daily_unit: dict
    elevation: float
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int


class MarineForecast(TypedDict, total=False):
    daily: dict
    daily_unit: dict
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int


class MarineForecastLoadMatch(TypedDict, total=False):
    daily: dict
    daily_unit: dict
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int


class WeatherForecast(TypedDict, total=False):
    current: dict
    current_unit: dict
    daily: dict
    daily_unit: dict
    elevation: float
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int


class WeatherForecastLoadMatch(TypedDict, total=False):
    current: dict
    current_unit: dict
    daily: dict
    daily_unit: dict
    elevation: float
    generationtime_m: float
    hourly: dict
    hourly_unit: dict
    latitude: float
    longitude: float
    timezone: str
    timezone_abbreviation: str
    utc_offset_second: int
