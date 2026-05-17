
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.open-meteo.com',

    auth: {
      prefix: 'Bearer',
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
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "daily_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "elevation",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "generationtime_m",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "hourly",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 4
        },
        {
          "name": "hourly_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 5
        },
        {
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "timezone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "timezone_abbreviation",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "utc_offset_second",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        }
      ],
      "name": "historical",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "daily",
                    "orig": "daily",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "hourly",
                    "orig": "hourly",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "latitude",
                    "orig": "latitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "longitude",
                    "orig": "longitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "example": "mm",
                    "kind": "query",
                    "name": "precipitation_unit",
                    "orig": "precipitation_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "celsius",
                    "kind": "query",
                    "name": "temperature_unit",
                    "orig": "temperature_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "iso8601",
                    "kind": "query",
                    "name": "timeformat",
                    "orig": "timeformat",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "GMT",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "kmh",
                    "kind": "query",
                    "name": "wind_speed_unit",
                    "orig": "wind_speed_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/historical",
              "parts": [
                "v1",
                "historical"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "daily_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "generationtime_m",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "hourly",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 3
        },
        {
          "name": "hourly_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 4
        },
        {
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "timezone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "timezone_abbreviation",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "utc_offset_second",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        }
      ],
      "name": "marine_forecast",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "daily",
                    "orig": "daily",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "example": 7,
                    "kind": "query",
                    "name": "forecast_day",
                    "orig": "forecast_day",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "hourly",
                    "orig": "hourly",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "latitude",
                    "orig": "latitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "longitude",
                    "orig": "longitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "past_day",
                    "orig": "past_day",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "iso8601",
                    "kind": "query",
                    "name": "timeformat",
                    "orig": "timeformat",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "GMT",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/marine-weather",
              "parts": [
                "v1",
                "marine-weather"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "current_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "daily",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "daily_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 3
        },
        {
          "name": "elevation",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "generationtime_m",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "hourly",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 6
        },
        {
          "name": "hourly_unit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 7
        },
        {
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "timezone",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "timezone_abbreviation",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "utc_offset_second",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 12
        }
      ],
      "name": "weather_forecast",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "apikey",
                    "orig": "apikey",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "land",
                    "kind": "query",
                    "name": "cell_selection",
                    "orig": "cell_selection",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "current",
                    "orig": "current",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "daily",
                    "orig": "daily",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "elevation",
                    "orig": "elevation",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30",
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30T12:00",
                    "kind": "query",
                    "name": "end_hour",
                    "orig": "end_hour",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30T12:00",
                    "kind": "query",
                    "name": "end_minutely_15",
                    "orig": "end_minutely_15",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 7,
                    "kind": "query",
                    "name": "forecast_day",
                    "orig": "forecast_day",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "forecast_hour",
                    "orig": "forecast_hour",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "forecast_minutely_15",
                    "orig": "forecast_minutely_15",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "hourly",
                    "orig": "hourly",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "example": 52.52,
                    "kind": "query",
                    "name": "latitude",
                    "orig": "latitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "example": 13.41,
                    "kind": "query",
                    "name": "longitude",
                    "orig": "longitude",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "model",
                    "orig": "model",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "past_day",
                    "orig": "past_day",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "past_hour",
                    "orig": "past_hour",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "past_minutely_15",
                    "orig": "past_minutely_15",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "mm",
                    "kind": "query",
                    "name": "precipitation_unit",
                    "orig": "precipitation_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30",
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30T12:00",
                    "kind": "query",
                    "name": "start_hour",
                    "orig": "start_hour",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2022-06-30T12:00",
                    "kind": "query",
                    "name": "start_minutely_15",
                    "orig": "start_minutely_15",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "celsius",
                    "kind": "query",
                    "name": "temperature_unit",
                    "orig": "temperature_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "iso8601",
                    "kind": "query",
                    "name": "timeformat",
                    "orig": "timeformat",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "auto",
                    "kind": "query",
                    "name": "timezone",
                    "orig": "timezone",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "kmh",
                    "kind": "query",
                    "name": "wind_speed_unit",
                    "orig": "wind_speed_unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/forecast",
              "parts": [
                "v1",
                "forecast"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
  config
}

