import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Rocket, RocketLoadMatch, RocketListMatch } from '../SpacexRestTypes';
declare class RocketEntity extends SpacexRestEntityBase<Rocket> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: RocketEntity): RocketEntity;
    load(this: any, reqmatch?: RocketLoadMatch, ctrl?: Control): Promise<RocketEntity>;
    list(this: any, reqmatch?: RocketListMatch, ctrl?: Control): Promise<RocketEntity[]>;
}
export { RocketEntity };
