import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Launchpad, LaunchpadLoadMatch, LaunchpadListMatch } from '../SpacexRestTypes';
declare class LaunchpadEntity extends SpacexRestEntityBase<Launchpad> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: LaunchpadEntity): LaunchpadEntity;
    load(this: any, reqmatch?: LaunchpadLoadMatch, ctrl?: Control): Promise<LaunchpadEntity>;
    list(this: any, reqmatch?: LaunchpadListMatch, ctrl?: Control): Promise<LaunchpadEntity[]>;
}
export { LaunchpadEntity };
