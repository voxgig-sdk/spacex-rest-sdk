import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Capsule, CapsuleLoadMatch, CapsuleListMatch } from '../SpacexRestTypes';
declare class CapsuleEntity extends SpacexRestEntityBase<Capsule> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: CapsuleEntity): CapsuleEntity;
    load(this: any, reqmatch?: CapsuleLoadMatch, ctrl?: Control): Promise<CapsuleEntity>;
    list(this: any, reqmatch?: CapsuleListMatch, ctrl?: Control): Promise<CapsuleEntity[]>;
}
export { CapsuleEntity };
