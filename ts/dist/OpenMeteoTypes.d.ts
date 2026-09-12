export interface Historical {
    daily?: Record<string, any>;
    daily_units?: Record<string, any>;
    elevation?: number;
    generationtime_ms?: number;
    hourly?: Record<string, any>;
    hourly_units?: Record<string, any>;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    utc_offset_seconds?: number;
}
export interface HistoricalLoadMatch {
    daily?: any[];
    end_date: string;
    hourly?: any[];
    latitude: number;
    longitude: number;
    precipitation_unit?: string;
    start_date: string;
    temperature_unit?: string;
    timeformat?: string;
    timezone?: string;
    wind_speed_unit?: string;
}
export interface MarineForecast {
    daily?: Record<string, any>;
    daily_units?: Record<string, any>;
    generationtime_ms?: number;
    hourly?: Record<string, any>;
    hourly_units?: Record<string, any>;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    utc_offset_seconds?: number;
}
export interface MarineForecastLoadMatch {
    daily?: any[];
    forecast_day?: number;
    hourly?: any[];
    latitude: number;
    longitude: number;
    past_day?: number;
    timeformat?: string;
    timezone?: string;
}
export interface WeatherForecast {
    current?: Record<string, any>;
    current_units?: Record<string, any>;
    daily?: Record<string, any>;
    daily_units?: Record<string, any>;
    elevation?: number;
    generationtime_ms?: number;
    hourly?: Record<string, any>;
    hourly_units?: Record<string, any>;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    utc_offset_seconds?: number;
}
export interface WeatherForecastLoadMatch {
    apikey?: string;
    cell_selection?: string;
    current?: any[];
    daily?: any[];
    elevation?: number;
    end_date?: string;
    end_hour?: string;
    end_minutely_15?: string;
    forecast_day?: number;
    forecast_hour?: number;
    forecast_minutely_15?: number;
    hourly?: any[];
    latitude: number;
    longitude: number;
    model?: string;
    past_day?: number;
    past_hour?: number;
    past_minutely_15?: number;
    precipitation_unit?: string;
    start_date?: string;
    start_hour?: string;
    start_minutely_15?: string;
    temperature_unit?: string;
    timeformat?: string;
    timezone?: string;
    wind_speed_unit?: string;
}
