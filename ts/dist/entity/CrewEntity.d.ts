import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Crew, CrewLoadMatch, CrewListMatch } from '../SpacexRestTypes';
declare class CrewEntity extends SpacexRestEntityBase<Crew> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: CrewEntity): CrewEntity;
    load(this: any, reqmatch?: CrewLoadMatch, ctrl?: Control): Promise<CrewEntity>;
    list(this: any, reqmatch?: CrewListMatch, ctrl?: Control): Promise<CrewEntity[]>;
}
export { CrewEntity };
