import { OpenMeteoEntityBase } from '../OpenMeteoEntityBase';
import type { OpenMeteoSDK } from '../OpenMeteoSDK';
import type { Control } from '../types';
import type { WeatherForecast, WeatherForecastLoadMatch } from '../OpenMeteoTypes';
declare class WeatherForecastEntity extends OpenMeteoEntityBase<WeatherForecast> {
    constructor(client: OpenMeteoSDK, entopts: any);
    make(this: WeatherForecastEntity): WeatherForecastEntity;
    load(this: any, reqmatch?: WeatherForecastLoadMatch, ctrl?: Control): Promise<WeatherForecastEntity>;
}
export { WeatherForecastEntity };
