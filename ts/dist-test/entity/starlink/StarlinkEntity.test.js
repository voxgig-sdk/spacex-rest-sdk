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
(0, node_test_1.describe)('StarlinkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Starlink();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'starlink.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "height_km": { "a": true, "h": "Height Km", "n": "height_km", "r": false, "sh": "Current height in kilometers", "t": "`$NUMBER`", "key$": "height_km", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Starlink satellite ID", "t": "`$STRING`", "key$": "id", "index$": 1 }, "latitude": { "a": true, "h": "Latitude", "n": "latitude", "r": false, "sh": "Current latitude", "t": "`$NUMBER`", "key$": "latitude", "index$": 2 }, "launch": { "a": true, "h": "Launch", "n": "launch", "r": false, "sh": "Launch ID", "t": "`$STRING`", "key$": "launch", "index$": 3 }, "longitude": { "a": true, "h": "Longitude", "n": "longitude", "r": false, "sh": "Current longitude", "t": "`$NUMBER`", "key$": "longitude", "index$": 4 }, "spaceTrack": { "a": true, "h": "Space Track", "n": "spaceTrack", "r": false, "sh": "Space-Track.org data", "t": "`$OBJECT`", "key$": "spaceTrack", "index$": 5 }, "velocity_kms": { "a": true, "h": "Velocity Kms", "n": "velocity_kms", "r": false, "sh": "Current velocity in km/s", "t": "`$NUMBER`", "key$": "velocity_kms", "index$": 6 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "Satellite version", "t": "`$STRING`", "key$": "version", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "starlink", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /starlink", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/starlink", "q": {}, "r": {}, "s": [{ "lit": "starlink" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /starlink/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/starlink/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "starlink" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.spaceTrack`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "starlink", "name__orig": "starlink", "Name": "Starlink", "name_": "starlink", "name-": "starlink", "NAME": "STARLINK", "index$": 10 }, { "active": true, "entity": "starlink", "key$": "BasicStarlinkFlow", "kind": "basic", "name": "BasicStarlinkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "starlink_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "starlink_ref01", "srcdatavar": "starlink_ref01_data", "suffix": "_dt0" }, "m": { "id": "starlink01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-starlink_ref01" } }], "index$": 1 }] }, 'Starlink', { "GET /starlink": { "protocol": "http", "operationId": "getAllStarlink", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "description": "Starlink satellite ID", "key$": "id" }, "version": { "type": "string", "description": "Satellite version", "key$": "version" }, "launch": { "type": "string", "description": "Launch ID", "key$": "launch" }, "longitude": { "type": "number", "description": "Current longitude", "key$": "longitude" }, "latitude": { "type": "number", "description": "Current latitude", "key$": "latitude" }, "height_km": { "type": "number", "description": "Current height in kilometers", "key$": "height_km" }, "velocity_kms": { "type": "number", "description": "Current velocity in km/s", "key$": "velocity_kms" }, "spaceTrack": { "type": "object", "description": "Space-Track.org data", "key$": "spaceTrack" } }, "x-ref": "#/components/schemas/Starlink", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /starlink/{id}": { "protocol": "http", "operationId": "getOneStarlink", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Starlink satellite ID", "key$": "id" }, "version": { "type": "string", "description": "Satellite version", "key$": "version" }, "launch": { "type": "string", "description": "Launch ID", "key$": "launch" }, "longitude": { "type": "number", "description": "Current longitude", "key$": "longitude" }, "latitude": { "type": "number", "description": "Current latitude", "key$": "latitude" }, "height_km": { "type": "number", "description": "Current height in kilometers", "key$": "height_km" }, "velocity_kms": { "type": "number", "description": "Current velocity in km/s", "key$": "velocity_kms" }, "spaceTrack": { "type": "object", "description": "Space-Track.org data", "key$": "spaceTrack" } }, "x-ref": "#/components/schemas/Starlink" } } } }, "404": { "description": "Starlink satellite not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Starlink satellite ID", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let starlink_ref01_data = Object.values(setup.data.existing.starlink)[0];
        // LIST
        const starlink_ref01_ent = client.Starlink();
        const starlink_ref01_match = {};
        const starlink_ref01_list = (await starlink_ref01_ent.list(starlink_ref01_match)).map((e) => e.data());
        // LOAD
        const starlink_ref01_match_dt0 = {};
        starlink_ref01_match_dt0.id = starlink_ref01_data.id;
        const starlink_ref01_data_dt0 = (await starlink_ref01_ent.load(starlink_ref01_match_dt0)).data();
        (0, node_assert_1.default)(starlink_ref01_data_dt0.id === starlink_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/starlink/StarlinkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['starlink01', 'starlink02', 'starlink03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_STARLINK_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_STARLINK_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_STARLINK_ENTID'];
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
//# sourceMappingURL=StarlinkEntity.test.js.map