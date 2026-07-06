// Typed models for the OpenMeteo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Historical is the typed data model for the historical entity.
type Historical struct {
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	Elevation *float64 `json:"elevation,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// HistoricalLoadMatch is the typed request payload for Historical.LoadTyped.
type HistoricalLoadMatch struct {
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	Elevation *float64 `json:"elevation,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// MarineForecast is the typed data model for the marine_forecast entity.
type MarineForecast struct {
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// MarineForecastLoadMatch is the typed request payload for MarineForecast.LoadTyped.
type MarineForecastLoadMatch struct {
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// WeatherForecast is the typed data model for the weather_forecast entity.
type WeatherForecast struct {
	Current *map[string]any `json:"current,omitempty"`
	CurrentUnit *map[string]any `json:"current_unit,omitempty"`
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	Elevation *float64 `json:"elevation,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// WeatherForecastLoadMatch is the typed request payload for WeatherForecast.LoadTyped.
type WeatherForecastLoadMatch struct {
	Current *map[string]any `json:"current,omitempty"`
	CurrentUnit *map[string]any `json:"current_unit,omitempty"`
	Daily *map[string]any `json:"daily,omitempty"`
	DailyUnit *map[string]any `json:"daily_unit,omitempty"`
	Elevation *float64 `json:"elevation,omitempty"`
	GenerationtimeM *float64 `json:"generationtime_m,omitempty"`
	Hourly *map[string]any `json:"hourly,omitempty"`
	HourlyUnit *map[string]any `json:"hourly_unit,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TimezoneAbbreviation *string `json:"timezone_abbreviation,omitempty"`
	UtcOffsetSecond *int `json:"utc_offset_second,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
