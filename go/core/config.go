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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.open-meteo.com",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "apikey",
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
						"title": "Daily",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily_units",
						"title": "Daily Units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "elevation",
						"title": "Elevation",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "generationtime_ms",
						"title": "Generationtime Ms",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "hourly",
						"title": "Hourly",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hourly_units",
						"title": "Hourly Units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"title": "Timezone Abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"title": "Utc Offset Seconds",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/historical",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "historical",
									},
								},
								"parts": []any{
									"v1",
									"historical",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "precipitation_unit",
											"orig": "precipitation_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "mm",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "temperature_unit",
											"orig": "temperature_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "celsius",
										},
										map[string]any{
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
											"kind": "query",
											"example": "iso8601",
										},
										map[string]any{
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
											"kind": "query",
											"example": "GMT",
										},
										map[string]any{
											"name": "wind_speed_unit",
											"orig": "wind_speed_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "kmh",
										},
									},
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
						"title": "Daily",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily_units",
						"title": "Daily Units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "generationtime_ms",
						"title": "Generationtime Ms",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "hourly",
						"title": "Hourly",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hourly_units",
						"title": "Hourly Units",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"title": "Timezone Abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"title": "Utc Offset Seconds",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/marine-weather",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "marine-weather",
									},
								},
								"parts": []any{
									"v1",
									"marine-weather",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "forecast_day",
											"orig": "forecast_day",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 7,
										},
										map[string]any{
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "past_day",
											"orig": "past_day",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
											"kind": "query",
											"example": "iso8601",
										},
										map[string]any{
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
											"kind": "query",
											"example": "GMT",
										},
									},
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
						"title": "Current",
						"type": "`$OBJECT`",
						"short": "Current weather conditions",
					},
					map[string]any{
						"name": "current_units",
						"title": "Current Units",
						"type": "`$OBJECT`",
						"short": "Units for current weather variables",
					},
					map[string]any{
						"name": "daily",
						"title": "Daily",
						"type": "`$OBJECT`",
						"short": "Daily weather data",
					},
					map[string]any{
						"name": "daily_units",
						"title": "Daily Units",
						"type": "`$OBJECT`",
						"short": "Units for daily weather variables",
					},
					map[string]any{
						"name": "elevation",
						"title": "Elevation",
						"type": "`$NUMBER`",
						"short": "Elevation in meters above sea level",
						"format": "float",
					},
					map[string]any{
						"name": "generationtime_ms",
						"title": "Generationtime Ms",
						"type": "`$NUMBER`",
						"short": "Generation time of the weather data in milliseconds",
						"format": "float",
					},
					map[string]any{
						"name": "hourly",
						"title": "Hourly",
						"type": "`$OBJECT`",
						"short": "Hourly weather data",
					},
					map[string]any{
						"name": "hourly_units",
						"title": "Hourly Units",
						"type": "`$OBJECT`",
						"short": "Units for hourly weather variables",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "WGS84 latitude of the location",
						"format": "float",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "WGS84 longitude of the location",
						"format": "float",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
						"short": "Timezone identifier",
					},
					map[string]any{
						"name": "timezone_abbreviation",
						"title": "Timezone Abbreviation",
						"type": "`$STRING`",
						"short": "Timezone abbreviation",
					},
					map[string]any{
						"name": "utc_offset_seconds",
						"title": "Utc Offset Seconds",
						"type": "`$INTEGER`",
						"short": "UTC offset in seconds",
					},
				},
				"name": "weather_forecast",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/forecast",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "forecast",
									},
								},
								"parts": []any{
									"v1",
									"forecast",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "apikey",
											"orig": "apikey",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cell_selection",
											"orig": "cell_selection",
											"type": "`$STRING`",
											"kind": "query",
											"example": "land",
										},
										map[string]any{
											"name": "current",
											"orig": "current",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "daily",
											"orig": "daily",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "elevation",
											"orig": "elevation",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30",
										},
										map[string]any{
											"name": "end_hour",
											"orig": "end_hour",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30T12:00",
										},
										map[string]any{
											"name": "end_minutely_15",
											"orig": "end_minutely_15",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30T12:00",
										},
										map[string]any{
											"name": "forecast_day",
											"orig": "forecast_day",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 7,
										},
										map[string]any{
											"name": "forecast_hour",
											"orig": "forecast_hour",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "forecast_minutely_15",
											"orig": "forecast_minutely_15",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "hourly",
											"orig": "hourly",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 52.52,
										},
										map[string]any{
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 13.41,
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "past_day",
											"orig": "past_day",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "past_hour",
											"orig": "past_hour",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "past_minutely_15",
											"orig": "past_minutely_15",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "precipitation_unit",
											"orig": "precipitation_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "mm",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30",
										},
										map[string]any{
											"name": "start_hour",
											"orig": "start_hour",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30T12:00",
										},
										map[string]any{
											"name": "start_minutely_15",
											"orig": "start_minutely_15",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2022-06-30T12:00",
										},
										map[string]any{
											"name": "temperature_unit",
											"orig": "temperature_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "celsius",
										},
										map[string]any{
											"name": "timeformat",
											"orig": "timeformat",
											"type": "`$STRING`",
											"kind": "query",
											"example": "iso8601",
										},
										map[string]any{
											"name": "timezone",
											"orig": "timezone",
											"type": "`$STRING`",
											"kind": "query",
											"example": "auto",
										},
										map[string]any{
											"name": "wind_speed_unit",
											"orig": "wind_speed_unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "kmh",
										},
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
