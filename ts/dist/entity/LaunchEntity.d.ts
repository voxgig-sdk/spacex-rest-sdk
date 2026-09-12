import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Launch, LaunchLoadMatch, LaunchListMatch } from '../SpacexRestTypes';
declare class LaunchEntity extends SpacexRestEntityBase<Launch> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: LaunchEntity): LaunchEntity;
    load(this: any, reqmatch?: LaunchLoadMatch, ctrl?: Control): Promise<LaunchEntity>;
    list(this: any, reqmatch?: LaunchListMatch, ctrl?: Control): Promise<LaunchEntity[]>;
}
export { LaunchEntity };
