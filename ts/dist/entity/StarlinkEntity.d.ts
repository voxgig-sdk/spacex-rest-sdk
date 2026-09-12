import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Starlink, StarlinkLoadMatch, StarlinkListMatch } from '../SpacexRestTypes';
declare class StarlinkEntity extends SpacexRestEntityBase<Starlink> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: StarlinkEntity): StarlinkEntity;
    load(this: any, reqmatch?: StarlinkLoadMatch, ctrl?: Control): Promise<StarlinkEntity>;
    list(this: any, reqmatch?: StarlinkListMatch, ctrl?: Control): Promise<StarlinkEntity[]>;
}
export { StarlinkEntity };
