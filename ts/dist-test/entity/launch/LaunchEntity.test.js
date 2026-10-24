"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LaunchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Launch();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('launch hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.SpacexRestSDK.test(offline).Launch().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.SpacexRestSDK.test(offline).Launch()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.SpacexRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Launch().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.SpacexRestSDK.test().Launch().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.SpacexRestSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Launch().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Launch().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SpacexRestSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Launch().list({ "auto_update": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'launch.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "auto_update": { "a": true, "h": "Auto Update", "n": "auto_update", "r": false, "sh": "Whether the launch data is automatically updated", "t": "`$BOOLEAN`", "key$": "auto_update", "index$": 0 }, "capsules": { "a": true, "h": "Capsules", "n": "capsules", "r": false, "sh": "Capsule IDs", "t": "`$ARRAY`", "key$": "capsules", "index$": 1 }, "cores": { "a": true, "h": "Cores", "n": "cores", "r": false, "t": "`$ARRAY`", "key$": "cores", "index$": 2 }, "crew": { "a": true, "h": "Crew", "n": "crew", "r": false, "sh": "Crew member IDs", "t": "`$ARRAY`", "key$": "crew", "index$": 3 }, "date_local": { "a": true, "fo": "date-time", "h": "Date Local", "n": "date_local", "r": false, "sh": "Launch date in local time", "t": "`$STRING`", "key$": "date_local", "index$": 4 }, "date_precision": { "a": true, "h": "Date Precision", "n": "date_precision", "r": false, "sh": "Date precision (hour, day, month, quarter, half, year)", "t": "`$STRING`", "key$": "date_precision", "index$": 5 }, "date_unix": { "a": true, "h": "Date Unix", "n": "date_unix", "r": false, "sh": "Launch date in unix timestamp", "t": "`$INTEGER`", "key$": "date_unix", "index$": 6 }, "date_utc": { "a": true, "fo": "date-time", "h": "Date Utc", "n": "date_utc", "r": false, "sh": "Launch date in UTC", "t": "`$STRING`", "key$": "date_utc", "index$": 7 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Launch details", "t": "`$STRING`", "key$": "details", "index$": 8 }, "failures": { "a": true, "h": "Failures", "n": "failures", "r": false, "sh": "Launch failures", "t": "`$ARRAY`", "key$": "failures", "index$": 9 }, "fairings": { "a": true, "h": "Fairings", "n": "fairings", "r": false, "t": "`$OBJECT`", "key$": "fairings", "index$": 10 }, "flight_number": { "a": true, "h": "Flight Number", "n": "flight_number", "r": false, "sh": "Flight number", "t": "`$INTEGER`", "key$": "flight_number", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Launch ID", "t": "`$STRING`", "key$": "id", "index$": 12 }, "launchpad": { "a": true, "h": "Launchpad", "n": "launchpad", "r": false, "sh": "Launchpad ID", "t": "`$STRING`", "key$": "launchpad", "index$": 13 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$OBJECT`", "key$": "links", "index$": 14 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Launch name", "t": "`$STRING`", "key$": "name", "index$": 15 }, "net": { "a": true, "h": "Net", "n": "net", "r": false, "sh": "No earlier than", "t": "`$BOOLEAN`", "key$": "net", "index$": 16 }, "payloads": { "a": true, "h": "Payloads", "n": "payloads", "r": false, "sh": "Payload IDs", "t": "`$ARRAY`", "key$": "payloads", "index$": 17 }, "rocket": { "a": true, "h": "Rocket", "n": "rocket", "r": false, "sh": "Rocket ID", "t": "`$STRING`", "key$": "rocket", "index$": 18 }, "ships": { "a": true, "h": "Ships", "n": "ships", "r": false, "sh": "Ship IDs", "t": "`$ARRAY`", "key$": "ships", "index$": 19 }, "static_fire_date_unix": { "a": true, "h": "Static Fire Date Unix", "n": "static_fire_date_unix", "r": false, "sh": "Static fire date in unix timestamp", "t": "`$INTEGER`", "key$": "static_fire_date_unix", "index$": 20 }, "static_fire_date_utc": { "a": true, "fo": "date-time", "h": "Static Fire Date Utc", "n": "static_fire_date_utc", "r": false, "sh": "Static fire date in UTC", "t": "`$STRING`", "key$": "static_fire_date_utc", "index$": 21 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "sh": "Launch success status", "t": "`$BOOLEAN`", "key$": "success", "index$": 22 }, "tdb": { "a": true, "h": "Tdb", "n": "tdb", "r": false, "sh": "To be determined", "t": "`$BOOLEAN`", "key$": "tdb", "index$": 23 }, "upcoming": { "a": true, "h": "Upcoming", "n": "upcoming", "r": false, "sh": "Whether the launch is upcoming", "t": "`$BOOLEAN`", "key$": "upcoming", "index$": 24 }, "window": { "a": true, "h": "Window", "n": "window", "r": false, "sh": "Launch window in seconds", "t": "`$INTEGER`", "key$": "window", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "launch", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /launches", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/launches", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "launches" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /launches/latest", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/launches/latest", "q": { "$action": "latest" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "launches" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /launches/past", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/launches/past", "q": { "$action": "past" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "launches" }, { "lit": "past" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /launches/upcoming", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/launches/upcoming", "q": { "$action": "upcoming" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "launches" }, { "lit": "upcoming" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /launches/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/launches/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "launches" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "launch", "name__orig": "launch", "Name": "Launch", "name_": "launch", "name-": "launch", "NAME": "LAUNCH", "index$": 4 }, { "active": true, "entity": "launch", "key$": "BasicLaunchFlow", "kind": "basic", "name": "BasicLaunchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "launch_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "launch_ref01", "srcdatavar": "launch_ref01_data", "suffix": "_dt0" }, "m": { "id": "launch01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-launch_ref01" } }], "index$": 1 }] }, 'Launch', { "GET /launches": { "protocol": "http", "parameters": [] }, "GET /launches/latest": { "protocol": "http", "parameters": [] }, "GET /launches/past": { "protocol": "http", "parameters": [] }, "GET /launches/upcoming": { "protocol": "http", "parameters": [] }, "GET /launches/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Launch ID", "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let launch_ref01_data = Object.values(setup.data.existing.launch)[0];
        // LIST
        const launch_ref01_ent = client.Launch();
        const launch_ref01_match = {};
        const launch_ref01_list = (await launch_ref01_ent.list(launch_ref01_match)).map((e) => e.data());
        // LOAD
        const launch_ref01_match_dt0 = {};
        launch_ref01_match_dt0.id = launch_ref01_data.id;
        const launch_ref01_data_dt0 = (await launch_ref01_ent.load(launch_ref01_match_dt0)).data();
        (0, node_assert_1.default)(launch_ref01_data_dt0.id === launch_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/launch/LaunchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['launch01', 'launch02', 'launch03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_LAUNCH_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_LAUNCH_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_LAUNCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SpacexRestSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SPACEX_REST_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LaunchEntity.test.js.map