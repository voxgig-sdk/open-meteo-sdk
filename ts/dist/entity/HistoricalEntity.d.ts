import { OpenMeteoEntityBase } from '../OpenMeteoEntityBase';
import type { OpenMeteoSDK } from '../OpenMeteoSDK';
import type { Control } from '../types';
import type { Historical, HistoricalLoadMatch } from '../OpenMeteoTypes';
declare class HistoricalEntity extends OpenMeteoEntityBase<Historical> {
    constructor(client: OpenMeteoSDK, entopts: any);
    make(this: HistoricalEntity): HistoricalEntity;
    load(this: any, reqmatch?: HistoricalLoadMatch, ctrl?: Control): Promise<HistoricalEntity>;
}
export { HistoricalEntity };
