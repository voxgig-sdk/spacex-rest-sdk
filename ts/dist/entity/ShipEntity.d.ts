import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Ship, ShipLoadMatch, ShipListMatch } from '../SpacexRestTypes';
declare class ShipEntity extends SpacexRestEntityBase<Ship> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: ShipEntity): ShipEntity;
    load(this: any, reqmatch?: ShipLoadMatch, ctrl?: Control): Promise<ShipEntity>;
    list(this: any, reqmatch?: ShipListMatch, ctrl?: Control): Promise<ShipEntity[]>;
}
export { ShipEntity };
