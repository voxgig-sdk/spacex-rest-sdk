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
(0, node_test_1.describe)('LaunchpadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Launchpad();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'launchpad.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Launchpad details", "t": "`$STRING`", "key$": "details", "index$": 0 }, "full_name": { "a": true, "h": "Full Name", "n": "full_name", "r": false, "sh": "Full launchpad name", "t": "`$STRING`", "key$": "full_name", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Launchpad ID", "t": "`$STRING`", "key$": "id", "index$": 2 }, "latitude": { "a": true, "h": "Latitude", "n": "latitude", "r": false, "sh": "Latitude", "t": "`$NUMBER`", "key$": "latitude", "index$": 3 }, "launch_attempts": { "a": true, "h": "Launch Attempts", "n": "launch_attempts", "r": false, "sh": "Number of launch attempts", "t": "`$INTEGER`", "key$": "launch_attempts", "index$": 4 }, "launch_successes": { "a": true, "h": "Launch Successes", "n": "launch_successes", "r": false, "sh": "Number of successful launches", "t": "`$INTEGER`", "key$": "launch_successes", "index$": 5 }, "launches": { "a": true, "h": "Launches", "n": "launches", "r": false, "sh": "Launch IDs", "t": "`$ARRAY`", "key$": "launches", "index$": 6 }, "locality": { "a": true, "h": "Locality", "n": "locality", "r": false, "sh": "Locality", "t": "`$STRING`", "key$": "locality", "index$": 7 }, "longitude": { "a": true, "h": "Longitude", "n": "longitude", "r": false, "sh": "Longitude", "t": "`$NUMBER`", "key$": "longitude", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Launchpad name", "t": "`$STRING`", "key$": "name", "index$": 9 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region", "t": "`$STRING`", "key$": "region", "index$": 10 }, "rockets": { "a": true, "h": "Rockets", "n": "rockets", "r": false, "sh": "Rocket IDs", "t": "`$ARRAY`", "key$": "rockets", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Launchpad status (active, inactive, unknown, retired, lost, under construction)", "t": "`$STRING`", "key$": "status", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "launchpad", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /launchpads", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/launchpads", "q": {}, "r": {}, "s": [{ "lit": "launchpads" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /launchpads/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/launchpads/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "launchpads" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "launchpad", "name__orig": "launchpad", "Name": "Launchpad", "name_": "launchpad", "name-": "launchpad", "NAME": "LAUNCHPAD", "index$": 5 }, { "active": true, "entity": "launchpad", "key$": "BasicLaunchpadFlow", "kind": "basic", "name": "BasicLaunchpadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "launchpad_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "launchpad_ref01", "srcdatavar": "launchpad_ref01_data", "suffix": "_dt0" }, "m": { "id": "launchpad01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-launchpad_ref01" } }], "index$": 1 }] }, 'Launchpad', { "GET /launchpads": { "protocol": "http", "operationId": "getAllLaunchpads", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "description": "Launchpad ID", "key$": "id" }, "name": { "type": "string", "description": "Launchpad name", "key$": "name" }, "full_name": { "type": "string", "description": "Full launchpad name", "key$": "full_name" }, "status": { "type": "string", "description": "Launchpad status (active, inactive, unknown, retired, lost, under construction)", "key$": "status" }, "locality": { "type": "string", "description": "Locality", "key$": "locality" }, "region": { "type": "string", "description": "Region", "key$": "region" }, "latitude": { "type": "number", "description": "Latitude", "key$": "latitude" }, "longitude": { "type": "number", "description": "Longitude", "key$": "longitude" }, "launch_attempts": { "type": "integer", "description": "Number of launch attempts", "key$": "launch_attempts" }, "launch_successes": { "type": "integer", "description": "Number of successful launches", "key$": "launch_successes" }, "rockets": { "type": "array", "items": { "type": "string" }, "description": "Rocket IDs", "key$": "rockets" }, "launches": { "type": "array", "items": { "type": "string" }, "description": "Launch IDs", "key$": "launches" }, "details": { "type": "string", "description": "Launchpad details", "key$": "details" } }, "x-ref": "#/components/schemas/Launchpad", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /launchpads/{id}": { "protocol": "http", "operationId": "getOneLaunchpad", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Launchpad ID", "key$": "id" }, "name": { "type": "string", "description": "Launchpad name", "key$": "name" }, "full_name": { "type": "string", "description": "Full launchpad name", "key$": "full_name" }, "status": { "type": "string", "description": "Launchpad status (active, inactive, unknown, retired, lost, under construction)", "key$": "status" }, "locality": { "type": "string", "description": "Locality", "key$": "locality" }, "region": { "type": "string", "description": "Region", "key$": "region" }, "latitude": { "type": "number", "description": "Latitude", "key$": "latitude" }, "longitude": { "type": "number", "description": "Longitude", "key$": "longitude" }, "launch_attempts": { "type": "integer", "description": "Number of launch attempts", "key$": "launch_attempts" }, "launch_successes": { "type": "integer", "description": "Number of successful launches", "key$": "launch_successes" }, "rockets": { "type": "array", "items": { "type": "string" }, "description": "Rocket IDs", "key$": "rockets" }, "launches": { "type": "array", "items": { "type": "string" }, "description": "Launch IDs", "key$": "launches" }, "details": { "type": "string", "description": "Launchpad details", "key$": "details" } }, "x-ref": "#/components/schemas/Launchpad", "index$": 0 } } } }, "404": { "description": "Launchpad not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Launchpad ID", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let launchpad_ref01_data = Object.values(setup.data.existing.launchpad)[0];
        // LIST
        const launchpad_ref01_ent = client.Launchpad();
        const launchpad_ref01_match = {};
        const launchpad_ref01_list = (await launchpad_ref01_ent.list(launchpad_ref01_match)).map((e) => e.data());
        // LOAD
        const launchpad_ref01_match_dt0 = {};
        launchpad_ref01_match_dt0.id = launchpad_ref01_data.id;
        const launchpad_ref01_data_dt0 = (await launchpad_ref01_ent.load(launchpad_ref01_match_dt0)).data();
        (0, node_assert_1.default)(launchpad_ref01_data_dt0.id === launchpad_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/launchpad/LaunchpadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['launchpad01', 'launchpad02', 'launchpad03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_LAUNCHPAD_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_LAUNCHPAD_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_LAUNCHPAD_ENTID'];
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
//# sourceMappingURL=LaunchpadEntity.test.js.map