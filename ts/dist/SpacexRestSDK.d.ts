import { CapsuleEntity } from './entity/CapsuleEntity';
import { CoreEntity } from './entity/CoreEntity';
import { CrewEntity } from './entity/CrewEntity';
import { LandpadEntity } from './entity/LandpadEntity';
import { LaunchEntity } from './entity/LaunchEntity';
import { LaunchpadEntity } from './entity/LaunchpadEntity';
import { PayloadEntity } from './entity/PayloadEntity';
import { RoadsterEntity } from './entity/RoadsterEntity';
import { RocketEntity } from './entity/RocketEntity';
import { ShipEntity } from './entity/ShipEntity';
import { StarlinkEntity } from './entity/StarlinkEntity';
export type * from './SpacexRestTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SpacexRestEntityBase } from './SpacexRestEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class SpacexRestSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Capsule(entopts?: Record<string, any>): CapsuleEntity;
    Core(entopts?: Record<string, any>): CoreEntity;
    Crew(entopts?: Record<string, any>): CrewEntity;
    Landpad(entopts?: Record<string, any>): LandpadEntity;
    Launch(entopts?: Record<string, any>): LaunchEntity;
    Launchpad(entopts?: Record<string, any>): LaunchpadEntity;
    Payload(entopts?: Record<string, any>): PayloadEntity;
    Roadster(entopts?: Record<string, any>): RoadsterEntity;
    Rocket(entopts?: Record<string, any>): RocketEntity;
    Ship(entopts?: Record<string, any>): ShipEntity;
    Starlink(entopts?: Record<string, any>): StarlinkEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SpacexRestSDK;
    tester(testopts?: any, sdkopts?: any): SpacexRestSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SpacexRestSDK;
export { stdutil, config, BaseFeature, SpacexRestEntityBase, SpacexRestSDK, SDK, };
