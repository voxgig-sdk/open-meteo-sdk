import { OpenMeteoEntityBase } from '../OpenMeteoEntityBase';
import type { OpenMeteoSDK } from '../OpenMeteoSDK';
import type { Control } from '../types';
import type { MarineForecast, MarineForecastLoadMatch } from '../OpenMeteoTypes';
declare class MarineForecastEntity extends OpenMeteoEntityBase<MarineForecast> {
    constructor(client: OpenMeteoSDK, entopts: any);
    make(this: MarineForecastEntity): MarineForecastEntity;
    load(this: any, reqmatch?: MarineForecastLoadMatch, ctrl?: Control): Promise<MarineForecastEntity>;
}
export { MarineForecastEntity };
