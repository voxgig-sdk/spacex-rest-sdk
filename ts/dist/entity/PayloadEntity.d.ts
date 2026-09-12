import { SpacexRestEntityBase } from '../SpacexRestEntityBase';
import type { SpacexRestSDK } from '../SpacexRestSDK';
import type { Control } from '../types';
import type { Payload, PayloadLoadMatch, PayloadListMatch } from '../SpacexRestTypes';
declare class PayloadEntity extends SpacexRestEntityBase<Payload> {
    constructor(client: SpacexRestSDK, entopts: any);
    make(this: PayloadEntity): PayloadEntity;
    load(this: any, reqmatch?: PayloadLoadMatch, ctrl?: Control): Promise<PayloadEntity>;
    list(this: any, reqmatch?: PayloadListMatch, ctrl?: Control): Promise<PayloadEntity[]>;
}
export { PayloadEntity };
