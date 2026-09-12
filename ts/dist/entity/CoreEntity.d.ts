import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Core, CoreLoadMatch, CoreListMatch } from '../SpacexRestTypes';
declare class CoreEntity extends SpacexRestEntityBase<Core> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: CoreEntity): CoreEntity;
    load(this: any, reqmatch?: CoreLoadMatch, ctrl?: Control): Promise<CoreEntity>;
    list(this: any, reqmatch?: CoreListMatch, ctrl?: Control): Promise<CoreEntity[]>;
}
export { CoreEntity };
