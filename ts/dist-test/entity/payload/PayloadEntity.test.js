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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PayloadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Payload();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payload.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "apoapsis_km", "req": false, "short": "Apoapsis in km", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "arg_of_pericenter", "req": false, "short": "Argument of pericenter", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "customers", "req": false, "short": "Customers", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "eccentricity", "req": false, "short": "Eccentricity", "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "epoch", "req": false, "short": "Epoch", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "id", "req": false, "short": "Payload ID", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "inclination_deg", "req": false, "short": "Inclination in degrees", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "launch", "req": false, "short": "Launch ID", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "lifespan_years", "req": false, "short": "Lifespan in years", "type": "`$NUMBER`", "index$": 8 }, { "active": true, "name": "longitude", "req": false, "short": "Longitude", "type": "`$NUMBER`", "index$": 9 }, { "active": true, "name": "manufacturers", "req": false, "short": "Manufacturers", "type": "`$ARRAY`", "index$": 10 }, { "active": true, "name": "mass_kg", "req": false, "short": "Payload mass in kilograms", "type": "`$NUMBER`", "index$": 11 }, { "active": true, "name": "mass_lbs", "req": false, "short": "Payload mass in pounds", "type": "`$NUMBER`", "index$": 12 }, { "active": true, "name": "mean_anomaly", "req": false, "short": "Mean anomaly", "type": "`$NUMBER`", "index$": 13 }, { "active": true, "name": "mean_motion", "req": false, "short": "Mean motion", "type": "`$NUMBER`", "index$": 14 }, { "active": true, "name": "name", "req": false, "short": "Payload name", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "nationalities", "req": false, "short": "Nationalities", "type": "`$ARRAY`", "index$": 16 }, { "active": true, "name": "norad_ids", "req": false, "short": "NORAD IDs", "type": "`$ARRAY`", "index$": 17 }, { "active": true, "name": "orbit", "req": false, "short": "Orbit type", "type": "`$STRING`", "index$": 18 }, { "active": true, "name": "periapsis_km", "req": false, "short": "Periapsis in km", "type": "`$NUMBER`", "index$": 19 }, { "active": true, "name": "period_min", "req": false, "short": "Orbital period in minutes", "type": "`$NUMBER`", "index$": 20 }, { "active": true, "name": "raan", "req": false, "short": "Right ascension of the ascending node", "type": "`$NUMBER`", "index$": 21 }, { "active": true, "name": "reference_system", "req": false, "short": "Reference system", "type": "`$STRING`", "index$": 22 }, { "active": true, "name": "regime", "req": false, "short": "Orbit regime", "type": "`$STRING`", "index$": 23 }, { "active": true, "name": "reused", "req": false, "short": "Whether the payload was reused", "type": "`$BOOLEAN`", "index$": 24 }, { "active": true, "name": "semi_major_axis_km", "req": false, "short": "Semi-major axis in km", "type": "`$NUMBER`", "index$": 25 }, { "active": true, "name": "type", "req": false, "short": "Payload type", "type": "`$STRING`", "index$": 26 }], "id": { "field": "id", "name": "id" }, "name": "payload", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /payloads", "json": "{\"operationId\":\"getAllPayloads\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"apoapsis_km\":{\"description\":\"Apoapsis in km\",\"nullable\":true,\"type\":\"number\"},\"arg_of_pericenter\":{\"description\":\"Argument of pericenter\",\"nullable\":true,\"type\":\"number\"},\"customers\":{\"description\":\"Customers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"eccentricity\":{\"description\":\"Eccentricity\",\"nullable\":true,\"type\":\"number\"},\"epoch\":{\"description\":\"Epoch\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Payload ID\",\"type\":\"string\"},\"inclination_deg\":{\"description\":\"Inclination in degrees\",\"nullable\":true,\"type\":\"number\"},\"launch\":{\"description\":\"Launch ID\",\"type\":\"string\"},\"lifespan_years\":{\"description\":\"Lifespan in years\",\"nullable\":true,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude\",\"nullable\":true,\"type\":\"number\"},\"manufacturers\":{\"description\":\"Manufacturers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"mass_kg\":{\"description\":\"Payload mass in kilograms\",\"nullable\":true,\"type\":\"number\"},\"mass_lbs\":{\"description\":\"Payload mass in pounds\",\"nullable\":true,\"type\":\"number\"},\"mean_anomaly\":{\"description\":\"Mean anomaly\",\"nullable\":true,\"type\":\"number\"},\"mean_motion\":{\"description\":\"Mean motion\",\"nullable\":true,\"type\":\"number\"},\"name\":{\"description\":\"Payload name\",\"type\":\"string\"},\"nationalities\":{\"description\":\"Nationalities\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"norad_ids\":{\"description\":\"NORAD IDs\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"orbit\":{\"description\":\"Orbit type\",\"type\":\"string\"},\"periapsis_km\":{\"description\":\"Periapsis in km\",\"nullable\":true,\"type\":\"number\"},\"period_min\":{\"description\":\"Orbital period in minutes\",\"nullable\":true,\"type\":\"number\"},\"raan\":{\"description\":\"Right ascension of the ascending node\",\"nullable\":true,\"type\":\"number\"},\"reference_system\":{\"description\":\"Reference system\",\"type\":\"string\"},\"regime\":{\"description\":\"Orbit regime\",\"type\":\"string\"},\"reused\":{\"description\":\"Whether the payload was reused\",\"type\":\"boolean\"},\"semi_major_axis_km\":{\"description\":\"Semi-major axis in km\",\"nullable\":true,\"type\":\"number\"},\"type\":{\"description\":\"Payload type\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/payloads", "segments": [{ "lit": "payloads" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /payloads/{id}", "json": "{\"operationId\":\"getOnePayload\",\"parameters\":[{\"description\":\"Payload ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"apoapsis_km\":{\"description\":\"Apoapsis in km\",\"nullable\":true,\"type\":\"number\"},\"arg_of_pericenter\":{\"description\":\"Argument of pericenter\",\"nullable\":true,\"type\":\"number\"},\"customers\":{\"description\":\"Customers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"eccentricity\":{\"description\":\"Eccentricity\",\"nullable\":true,\"type\":\"number\"},\"epoch\":{\"description\":\"Epoch\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Payload ID\",\"type\":\"string\"},\"inclination_deg\":{\"description\":\"Inclination in degrees\",\"nullable\":true,\"type\":\"number\"},\"launch\":{\"description\":\"Launch ID\",\"type\":\"string\"},\"lifespan_years\":{\"description\":\"Lifespan in years\",\"nullable\":true,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude\",\"nullable\":true,\"type\":\"number\"},\"manufacturers\":{\"description\":\"Manufacturers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"mass_kg\":{\"description\":\"Payload mass in kilograms\",\"nullable\":true,\"type\":\"number\"},\"mass_lbs\":{\"description\":\"Payload mass in pounds\",\"nullable\":true,\"type\":\"number\"},\"mean_anomaly\":{\"description\":\"Mean anomaly\",\"nullable\":true,\"type\":\"number\"},\"mean_motion\":{\"description\":\"Mean motion\",\"nullable\":true,\"type\":\"number\"},\"name\":{\"description\":\"Payload name\",\"type\":\"string\"},\"nationalities\":{\"description\":\"Nationalities\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"norad_ids\":{\"description\":\"NORAD IDs\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"orbit\":{\"description\":\"Orbit type\",\"type\":\"string\"},\"periapsis_km\":{\"description\":\"Periapsis in km\",\"nullable\":true,\"type\":\"number\"},\"period_min\":{\"description\":\"Orbital period in minutes\",\"nullable\":true,\"type\":\"number\"},\"raan\":{\"description\":\"Right ascension of the ascending node\",\"nullable\":true,\"type\":\"number\"},\"reference_system\":{\"description\":\"Reference system\",\"type\":\"string\"},\"regime\":{\"description\":\"Orbit regime\",\"type\":\"string\"},\"reused\":{\"description\":\"Whether the payload was reused\",\"type\":\"boolean\"},\"semi_major_axis_km\":{\"description\":\"Semi-major axis in km\",\"nullable\":true,\"type\":\"number\"},\"type\":{\"description\":\"Payload type\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Payload not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/payloads/{id}", "segments": [{ "lit": "payloads" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payload", "name__orig": "payload", "Name": "Payload", "name_": "payload", "name-": "payload", "NAME": "PAYLOAD", "index$": 6 }, { "active": true, "entity": "payload", "key$": "BasicPayloadFlow", "kind": "basic", "name": "BasicPayloadFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "payload_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "payload_ref01", "srcdatavar": "payload_ref01_data", "suffix": "_dt0" }, "match": { "id": "payload01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payload_ref01" } }], "index$": 1 }] }, 'Payload');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let payload_ref01_data = Object.values(setup.data.existing.payload)[0];
        // LIST
        const payload_ref01_ent = client.Payload();
        const payload_ref01_match = {};
        const payload_ref01_list = (await payload_ref01_ent.list(payload_ref01_match)).map((e) => e.data());
        // LOAD
        const payload_ref01_match_dt0 = {};
        payload_ref01_match_dt0.id = payload_ref01_data.id;
        const payload_ref01_data_dt0 = (await payload_ref01_ent.load(payload_ref01_match_dt0)).data();
        (0, node_assert_1.default)(payload_ref01_data_dt0.id === payload_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payload/PayloadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payload01', 'payload02', 'payload03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_PAYLOAD_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_PAYLOAD_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_PAYLOAD_ENTID'];
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
//# sourceMappingURL=PayloadEntity.test.js.map