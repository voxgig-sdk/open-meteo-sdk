# OpenMeteo SDK configuration

module OpenMeteoConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "OpenMeteo",
        "slug" => "open-meteo",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.open-meteo.com",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "historical" => {},
          "marine_forecast" => {},
          "weather_forecast" => {},
        },
      },
      "entity" => {
        "historical" => {
          "fields" => [
            {
              "name" => "daily",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily_units",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "elevation",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "generationtime_ms",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "hourly",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hourly_units",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "latitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "timezone",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone_abbreviation",
              "type" => "`$STRING`",
            },
            {
              "name" => "utc_offset_seconds",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "historical",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "daily",
                        "orig" => "daily",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hourly",
                        "orig" => "hourly",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "latitude",
                        "orig" => "latitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "longitude",
                        "orig" => "longitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "mm",
                        "kind" => "query",
                        "name" => "precipitation_unit",
                        "orig" => "precipitation_unit",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "celsius",
                        "kind" => "query",
                        "name" => "temperature_unit",
                        "orig" => "temperature_unit",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "iso8601",
                        "kind" => "query",
                        "name" => "timeformat",
                        "orig" => "timeformat",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "GMT",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "kmh",
                        "kind" => "query",
                        "name" => "wind_speed_unit",
                        "orig" => "wind_speed_unit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/historical",
                  "parts" => [
                    "v1",
                    "historical",
                  ],
                  "select" => {
                    "exist" => [
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
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "marine_forecast" => {
          "fields" => [
            {
              "name" => "daily",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily_units",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "generationtime_ms",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "hourly",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hourly_units",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "latitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "timezone",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone_abbreviation",
              "type" => "`$STRING`",
            },
            {
              "name" => "utc_offset_seconds",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "marine_forecast",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "daily",
                        "orig" => "daily",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => 7,
                        "kind" => "query",
                        "name" => "forecast_day",
                        "orig" => "forecast_day",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hourly",
                        "orig" => "hourly",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "latitude",
                        "orig" => "latitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "longitude",
                        "orig" => "longitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "past_day",
                        "orig" => "past_day",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "iso8601",
                        "kind" => "query",
                        "name" => "timeformat",
                        "orig" => "timeformat",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "GMT",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/marine-weather",
                  "parts" => [
                    "v1",
                    "marine-weather",
                  ],
                  "select" => {
                    "exist" => [
                      "daily",
                      "forecast_day",
                      "hourly",
                      "latitude",
                      "longitude",
                      "past_day",
                      "timeformat",
                      "timezone",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "weather_forecast" => {
          "fields" => [
            {
              "name" => "current",
              "short" => "Current weather conditions",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "current_units",
              "short" => "Units for current weather variables",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily",
              "short" => "Daily weather data",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily_units",
              "short" => "Units for daily weather variables",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "elevation",
              "short" => "Elevation in meters above sea level",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "generationtime_ms",
              "short" => "Generation time of the weather data in milliseconds",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "hourly",
              "short" => "Hourly weather data",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hourly_units",
              "short" => "Units for hourly weather variables",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "latitude",
              "short" => "WGS84 latitude of the location",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "short" => "WGS84 longitude of the location",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "timezone",
              "short" => "Timezone identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone_abbreviation",
              "short" => "Timezone abbreviation",
              "type" => "`$STRING`",
            },
            {
              "name" => "utc_offset_seconds",
              "short" => "UTC offset in seconds",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "weather_forecast",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "apikey",
                        "orig" => "apikey",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "land",
                        "kind" => "query",
                        "name" => "cell_selection",
                        "orig" => "cell_selection",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "current",
                        "orig" => "current",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "daily",
                        "orig" => "daily",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "elevation",
                        "orig" => "elevation",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "2022-06-30",
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2022-06-30T12:00",
                        "kind" => "query",
                        "name" => "end_hour",
                        "orig" => "end_hour",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2022-06-30T12:00",
                        "kind" => "query",
                        "name" => "end_minutely_15",
                        "orig" => "end_minutely_15",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 7,
                        "kind" => "query",
                        "name" => "forecast_day",
                        "orig" => "forecast_day",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "forecast_hour",
                        "orig" => "forecast_hour",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "forecast_minutely_15",
                        "orig" => "forecast_minutely_15",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hourly",
                        "orig" => "hourly",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => 52.52,
                        "kind" => "query",
                        "name" => "latitude",
                        "orig" => "latitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 13.41,
                        "kind" => "query",
                        "name" => "longitude",
                        "orig" => "longitude",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "model",
                        "orig" => "model",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "past_day",
                        "orig" => "past_day",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "past_hour",
                        "orig" => "past_hour",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "past_minutely_15",
                        "orig" => "past_minutely_15",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "mm",
                        "kind" => "query",
                        "name" => "precipitation_unit",
                        "orig" => "precipitation_unit",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2022-06-30",
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2022-06-30T12:00",
                        "kind" => "query",
                        "name" => "start_hour",
                        "orig" => "start_hour",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2022-06-30T12:00",
                        "kind" => "query",
                        "name" => "start_minutely_15",
                        "orig" => "start_minutely_15",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "celsius",
                        "kind" => "query",
                        "name" => "temperature_unit",
                        "orig" => "temperature_unit",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "iso8601",
                        "kind" => "query",
                        "name" => "timeformat",
                        "orig" => "timeformat",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "auto",
                        "kind" => "query",
                        "name" => "timezone",
                        "orig" => "timezone",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "kmh",
                        "kind" => "query",
                        "name" => "wind_speed_unit",
                        "orig" => "wind_speed_unit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/forecast",
                  "parts" => [
                    "v1",
                    "forecast",
                  ],
                  "select" => {
                    "exist" => [
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
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenMeteoFeatures.make_feature(name)
  end
end
