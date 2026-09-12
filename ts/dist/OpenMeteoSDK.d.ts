import { HistoricalEntity } from './entity/HistoricalEntity';
import { MarineForecastEntity } from './entity/MarineForecastEntity';
import { WeatherForecastEntity } from './entity/WeatherForecastEntity';
export type * from './OpenMeteoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpenMeteoEntityBase } from './OpenMeteoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OpenMeteoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Historical(entopts?: Record<string, any>): HistoricalEntity;
    MarineForecast(entopts?: Record<string, any>): MarineForecastEntity;
    WeatherForecast(entopts?: Record<string, any>): WeatherForecastEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpenMeteoSDK;
    tester(testopts?: any, sdkopts?: any): OpenMeteoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpenMeteoSDK;
export { stdutil, config, BaseFeature, OpenMeteoEntityBase, OpenMeteoSDK, SDK, };
