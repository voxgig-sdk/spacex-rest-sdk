import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Roadster, RoadsterListMatch } from '../SpacexRestTypes';
declare class RoadsterEntity extends SpacexRestEntityBase<Roadster> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: RoadsterEntity): RoadsterEntity;
    list(this: any, reqmatch?: RoadsterListMatch, ctrl?: Control): Promise<RoadsterEntity[]>;
}
export { RoadsterEntity };
