import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Landpad, LandpadLoadMatch, LandpadListMatch } from '../SpacexRestTypes';
declare class LandpadEntity extends SpacexRestEntityBase<Landpad> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: LandpadEntity): LandpadEntity;
    load(this: any, reqmatch?: LandpadLoadMatch, ctrl?: Control): Promise<LandpadEntity>;
    list(this: any, reqmatch?: LandpadListMatch, ctrl?: Control): Promise<LandpadEntity[]>;
}
export { LandpadEntity };
