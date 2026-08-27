package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenMeteo",
			"slug": "open-meteo",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.open-meteo.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"historical": map[string]any{},
				"marine_forecast": map[string]any{},
				"weather_forecast": map[string]any{},
			},
		},
		"entity": map[string]any{
			"historical": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "daily",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily_units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "elevation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "generationtime_ms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "hourly",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hourly_units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "timezone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"type": "`$INTEGER`",
					},
				},
				"name": "historical",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "mm",
											"kind": "query",
											"name": "precipitation_unit",
											"orig": "precipitation_unit",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "celsius",
											"kind": "query",
											"name": "temperature_unit",
											"orig": "temperature_unit",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "iso8601",
											"kind": "query",
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "GMT",
											"kind": "query",
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "kmh",
											"kind": "query",
											"name": "wind_speed_unit",
											"orig": "wind_speed_unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/historical",
								"parts": []any{
									"v1",
									"historical",
								},
								"select": map[string]any{
									"exist": []any{
										"daily",
										"end_date",
										"hourly",
										"latitude",
										"longitude",
										"precipitation_unit",
										"start_date",
										"temperature_unit",
										"timeformat",
										"timezone",
										"wind_speed_unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"marine_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "daily",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily_units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "generationtime_ms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "hourly",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hourly_units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "timezone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"type": "`$INTEGER`",
					},
				},
				"name": "marine_forecast",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": 7,
											"kind": "query",
											"name": "forecast_day",
											"orig": "forecast_day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "past_day",
											"orig": "past_day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "iso8601",
											"kind": "query",
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "GMT",
											"kind": "query",
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/marine-weather",
								"parts": []any{
									"v1",
									"marine-weather",
								},
								"select": map[string]any{
									"exist": []any{
										"daily",
										"forecast_day",
										"hourly",
										"latitude",
										"longitude",
										"past_day",
										"timeformat",
										"timezone",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weather_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "current",
						"short": "Current weather conditions",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "current_units",
						"short": "Units for current weather variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily",
						"short": "Daily weather data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily_units",
						"short": "Units for daily weather variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "elevation",
						"short": "Elevation in meters above sea level",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "generationtime_ms",
						"short": "Generation time of the weather data in milliseconds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "hourly",
						"short": "Hourly weather data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hourly_units",
						"short": "Units for hourly weather variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "latitude",
						"short": "WGS84 latitude of the location",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "WGS84 longitude of the location",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "timezone",
						"short": "Timezone identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"short": "Timezone abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"short": "UTC offset in seconds",
						"type": "`$INTEGER`",
					},
				},
				"name": "weather_forecast",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "apikey",
											"orig": "apikey",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "land",
											"kind": "query",
											"name": "cell_selection",
											"orig": "cell_selection",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "current",
											"orig": "current",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "elevation",
											"orig": "elevation",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "2022-06-30",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2022-06-30T12:00",
											"kind": "query",
											"name": "end_hour",
											"orig": "end_hour",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2022-06-30T12:00",
											"kind": "query",
											"name": "end_minutely_15",
											"orig": "end_minutely_15",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 7,
											"kind": "query",
											"name": "forecast_day",
											"orig": "forecast_day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "forecast_hour",
											"orig": "forecast_hour",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "forecast_minutely_15",
											"orig": "forecast_minutely_15",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": 52.52,
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 13.41,
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "past_day",
											"orig": "past_day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "past_hour",
											"orig": "past_hour",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "past_minutely_15",
											"orig": "past_minutely_15",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "mm",
											"kind": "query",
											"name": "precipitation_unit",
											"orig": "precipitation_unit",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2022-06-30",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2022-06-30T12:00",
											"kind": "query",
											"name": "start_hour",
											"orig": "start_hour",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2022-06-30T12:00",
											"kind": "query",
											"name": "start_minutely_15",
											"orig": "start_minutely_15",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "celsius",
											"kind": "query",
											"name": "temperature_unit",
											"orig": "temperature_unit",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "iso8601",
											"kind": "query",
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "auto",
											"kind": "query",
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "kmh",
											"kind": "query",
											"name": "wind_speed_unit",
											"orig": "wind_speed_unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/forecast",
								"parts": []any{
									"v1",
									"forecast",
								},
								"select": map[string]any{
									"exist": []any{
										"apikey",
										"cell_selection",
										"current",
										"daily",
										"elevation",
										"end_date",
										"end_hour",
										"end_minutely_15",
										"forecast_day",
										"forecast_hour",
										"forecast_minutely_15",
										"hourly",
										"latitude",
										"longitude",
										"model",
										"past_day",
										"past_hour",
										"past_minutely_15",
										"precipitation_unit",
										"start_date",
										"start_hour",
										"start_minutely_15",
										"temperature_unit",
										"timeformat",
										"timezone",
										"wind_speed_unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
