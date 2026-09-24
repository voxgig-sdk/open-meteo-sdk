
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OpenMeteo',
        slug: "open-meteo",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.open-meteo.com",

    auth: {
      prefix: '',
      in: 'query',
      name: 'apikey',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        historical: {
        },
  
        marine_forecast: {
        },
  
        weather_forecast: {
        },
  
    }
  }


  entity = {
    "historical": {
      "fields": [
        {
          "name": "daily",
          "title": "Daily",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily_units",
          "title": "Daily Units",
          "type": "`$OBJECT`"
        },
        {
          "name": "elevation",
          "title": "Elevation",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "generationtime_ms",
          "title": "Generationtime Ms",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "hourly",
          "title": "Hourly",
          "type": "`$OBJECT`"
        },
        {
          "name": "hourly_units",
          "title": "Hourly Units",
          "type": "`$OBJECT`"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "timezone",
          "title": "Timezone",
          "type": "`$STRING`"
        },
        {
          "name": "timezone_abbreviation",
          "title": "Timezone Abbreviation",
          "type": "`$STRING`"
        },
        {
          "name": "utc_offset_seconds",
          "title": "Utc Offset Seconds",
          "type": "`$INTEGER`"
        }
      ],
      "name": "historical",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/historical",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "historical"
                }
              ],
              "parts": [
                "v1",
                "historical"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "daily",
                    "orig": "daily",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "hourly",
                    "orig": "hourly",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "precipitation_unit",
                    "orig": "precipitation_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "mm"
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "temperature_unit",
                    "orig": "temperature_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "celsius"
                  },
                  {
                    "name": "timeformat",
                    "orig": "timeformat",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "iso8601"
                  },
                  {
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "GMT"
                  },
                  {
                    "name": "wind_speed_unit",
                    "orig": "wind_speed_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "kmh"
                  }
                ]
              },
              "select": {
                "exist": [
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
                  "wind_speed_unit"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "marine_forecast": {
      "fields": [
        {
          "name": "daily",
          "title": "Daily",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily_units",
          "title": "Daily Units",
          "type": "`$OBJECT`"
        },
        {
          "name": "generationtime_ms",
          "title": "Generationtime Ms",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "hourly",
          "title": "Hourly",
          "type": "`$OBJECT`"
        },
        {
          "name": "hourly_units",
          "title": "Hourly Units",
          "type": "`$OBJECT`"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "format": "float"
        },
        {
          "name": "timezone",
          "title": "Timezone",
          "type": "`$STRING`"
        },
        {
          "name": "timezone_abbreviation",
          "title": "Timezone Abbreviation",
          "type": "`$STRING`"
        },
        {
          "name": "utc_offset_seconds",
          "title": "Utc Offset Seconds",
          "type": "`$INTEGER`"
        }
      ],
      "name": "marine_forecast",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/marine-weather",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "marine-weather"
                }
              ],
              "parts": [
                "v1",
                "marine-weather"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "daily",
                    "orig": "daily",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "forecast_day",
                    "orig": "forecast_day",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 7
                  },
                  {
                    "name": "hourly",
                    "orig": "hourly",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "past_day",
                    "orig": "past_day",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "timeformat",
                    "orig": "timeformat",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "iso8601"
                  },
                  {
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "GMT"
                  }
                ]
              },
              "select": {
                "exist": [
                  "daily",
                  "forecast_day",
                  "hourly",
                  "latitude",
                  "longitude",
                  "past_day",
                  "timeformat",
                  "timezone"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "weather_forecast": {
      "fields": [
        {
          "name": "current",
          "title": "Current",
          "type": "`$OBJECT`",
          "short": "Current weather conditions"
        },
        {
          "name": "current_units",
          "title": "Current Units",
          "type": "`$OBJECT`",
          "short": "Units for current weather variables"
        },
        {
          "name": "daily",
          "title": "Daily",
          "type": "`$OBJECT`",
          "short": "Daily weather data"
        },
        {
          "name": "daily_units",
          "title": "Daily Units",
          "type": "`$OBJECT`",
          "short": "Units for daily weather variables"
        },
        {
          "name": "elevation",
          "title": "Elevation",
          "type": "`$NUMBER`",
          "short": "Elevation in meters above sea level",
          "format": "float"
        },
        {
          "name": "generationtime_ms",
          "title": "Generationtime Ms",
          "type": "`$NUMBER`",
          "short": "Generation time of the weather data in milliseconds",
          "format": "float"
        },
        {
          "name": "hourly",
          "title": "Hourly",
          "type": "`$OBJECT`",
          "short": "Hourly weather data"
        },
        {
          "name": "hourly_units",
          "title": "Hourly Units",
          "type": "`$OBJECT`",
          "short": "Units for hourly weather variables"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "WGS84 latitude of the location",
          "format": "float"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "WGS84 longitude of the location",
          "format": "float"
        },
        {
          "name": "timezone",
          "title": "Timezone",
          "type": "`$STRING`",
          "short": "Timezone identifier"
        },
        {
          "name": "timezone_abbreviation",
          "title": "Timezone Abbreviation",
          "type": "`$STRING`",
          "short": "Timezone abbreviation"
        },
        {
          "name": "utc_offset_seconds",
          "title": "Utc Offset Seconds",
          "type": "`$INTEGER`",
          "short": "UTC offset in seconds"
        }
      ],
      "name": "weather_forecast",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/forecast",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "forecast"
                }
              ],
              "parts": [
                "v1",
                "forecast"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "apikey",
                    "orig": "apikey",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "cell_selection",
                    "orig": "cell_selection",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "land"
                  },
                  {
                    "name": "current",
                    "orig": "current",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "daily",
                    "orig": "daily",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "elevation",
                    "orig": "elevation",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30"
                  },
                  {
                    "name": "end_hour",
                    "orig": "end_hour",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30T12:00"
                  },
                  {
                    "name": "end_minutely_15",
                    "orig": "end_minutely_15",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30T12:00"
                  },
                  {
                    "name": "forecast_day",
                    "orig": "forecast_day",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 7
                  },
                  {
                    "name": "forecast_hour",
                    "orig": "forecast_hour",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "forecast_minutely_15",
                    "orig": "forecast_minutely_15",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "hourly",
                    "orig": "hourly",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true,
                    "example": 52.52
                  },
                  {
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true,
                    "example": 13.41
                  },
                  {
                    "name": "model",
                    "orig": "model",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "past_day",
                    "orig": "past_day",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "past_hour",
                    "orig": "past_hour",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "past_minutely_15",
                    "orig": "past_minutely_15",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "precipitation_unit",
                    "orig": "precipitation_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "mm"
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30"
                  },
                  {
                    "name": "start_hour",
                    "orig": "start_hour",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30T12:00"
                  },
                  {
                    "name": "start_minutely_15",
                    "orig": "start_minutely_15",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2022-06-30T12:00"
                  },
                  {
                    "name": "temperature_unit",
                    "orig": "temperature_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "celsius"
                  },
                  {
                    "name": "timeformat",
                    "orig": "timeformat",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "iso8601"
                  },
                  {
                    "name": "timezone",
                    "orig": "timezone",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "auto"
                  },
                  {
                    "name": "wind_speed_unit",
                    "orig": "wind_speed_unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "kmh"
                  }
                ]
              },
              "select": {
                "exist": [
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
                  "wind_speed_unit"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

