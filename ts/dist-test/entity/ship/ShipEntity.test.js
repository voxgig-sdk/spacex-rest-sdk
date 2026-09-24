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
(0, node_test_1.describe)('ShipEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Ship();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ship.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "abs": { "a": true, "h": "Abs", "n": "abs", "r": false, "sh": "ABS number", "t": "`$INTEGER`", "key$": "abs", "index$": 0 }, "class": { "a": true, "h": "Class", "n": "class", "r": false, "sh": "Ship class", "t": "`$INTEGER`", "key$": "class", "index$": 1 }, "course_deg": { "a": true, "h": "Course Deg", "n": "course_deg", "r": false, "sh": "Course in degrees", "t": "`$NUMBER`", "key$": "course_deg", "index$": 2 }, "home_port": { "a": true, "h": "Home Port", "n": "home_port", "r": false, "sh": "Home port", "t": "`$STRING`", "key$": "home_port", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Ship ID", "t": "`$STRING`", "key$": "id", "index$": 4 }, "image": { "a": true, "h": "Image", "n": "image", "r": false, "sh": "Image URL", "t": "`$STRING`", "key$": "image", "index$": 5 }, "imo": { "a": true, "h": "Imo", "n": "imo", "r": false, "sh": "IMO number", "t": "`$INTEGER`", "key$": "imo", "index$": 6 }, "last_ais_update": { "a": true, "h": "Last Ais Update", "n": "last_ais_update", "r": false, "sh": "Last AIS update timestamp", "t": "`$STRING`", "key$": "last_ais_update", "index$": 7 }, "latitude": { "a": true, "h": "Latitude", "n": "latitude", "r": false, "sh": "Latitude", "t": "`$NUMBER`", "key$": "latitude", "index$": 8 }, "launches": { "a": true, "h": "Launches", "n": "launches", "r": false, "sh": "Launch IDs", "t": "`$ARRAY`", "key$": "launches", "index$": 9 }, "legacy_id": { "a": true, "h": "Legacy Id", "n": "legacy_id", "r": false, "sh": "Legacy ID", "t": "`$STRING`", "key$": "legacy_id", "index$": 10 }, "link": { "a": true, "h": "Link", "n": "link", "r": false, "sh": "Link to ship info", "t": "`$STRING`", "key$": "link", "index$": 11 }, "longitude": { "a": true, "h": "Longitude", "n": "longitude", "r": false, "sh": "Longitude", "t": "`$NUMBER`", "key$": "longitude", "index$": 12 }, "mass_kg": { "a": true, "h": "Mass Kg", "n": "mass_kg", "r": false, "sh": "Mass in kilograms", "t": "`$INTEGER`", "key$": "mass_kg", "index$": 13 }, "mass_lbs": { "a": true, "h": "Mass Lbs", "n": "mass_lbs", "r": false, "sh": "Mass in pounds", "t": "`$INTEGER`", "key$": "mass_lbs", "index$": 14 }, "mmsi": { "a": true, "h": "Mmsi", "n": "mmsi", "r": false, "sh": "MMSI number", "t": "`$INTEGER`", "key$": "mmsi", "index$": 15 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "Ship model", "t": "`$STRING`", "key$": "model", "index$": 16 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Ship name", "t": "`$STRING`", "key$": "name", "index$": 17 }, "roles": { "a": true, "h": "Roles", "n": "roles", "r": false, "sh": "Ship roles", "t": "`$ARRAY`", "key$": "roles", "index$": 18 }, "speed_kn": { "a": true, "h": "Speed Kn", "n": "speed_kn", "r": false, "sh": "Speed in knots", "t": "`$NUMBER`", "key$": "speed_kn", "index$": 19 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Ship status", "t": "`$STRING`", "key$": "status", "index$": 20 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Ship type", "t": "`$STRING`", "key$": "type", "index$": 21 }, "year_built": { "a": true, "h": "Year Built", "n": "year_built", "r": false, "sh": "Year built", "t": "`$INTEGER`", "key$": "year_built", "index$": 22 } }, "id": { "field": "id", "name": "id" }, "name": "ship", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /ships", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/ships", "q": {}, "r": {}, "s": [{ "lit": "ships" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /ships/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/ships/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "ships" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "ship", "name__orig": "ship", "Name": "Ship", "name_": "ship", "name-": "ship", "NAME": "SHIP", "index$": 9 }, { "active": true, "entity": "ship", "key$": "BasicShipFlow", "kind": "basic", "name": "BasicShipFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ship_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "ship_ref01", "srcdatavar": "ship_ref01_data", "suffix": "_dt0" }, "m": { "id": "ship01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ship_ref01" } }], "index$": 1 }] }, 'Ship', { "GET /ships": { "protocol": "http", "operationId": "getAllShips", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "description": "Ship ID", "key$": "id" }, "name": { "type": "string", "description": "Ship name", "key$": "name" }, "legacy_id": { "type": "string", "nullable": true, "description": "Legacy ID", "key$": "legacy_id" }, "model": { "type": "string", "nullable": true, "description": "Ship model", "key$": "model" }, "type": { "type": "string", "description": "Ship type", "key$": "type" }, "roles": { "type": "array", "items": { "type": "string" }, "description": "Ship roles", "key$": "roles" }, "imo": { "type": "integer", "nullable": true, "description": "IMO number", "key$": "imo" }, "mmsi": { "type": "integer", "nullable": true, "description": "MMSI number", "key$": "mmsi" }, "abs": { "type": "integer", "nullable": true, "description": "ABS number", "key$": "abs" }, "class": { "type": "integer", "nullable": true, "description": "Ship class", "key$": "class" }, "mass_kg": { "type": "integer", "nullable": true, "description": "Mass in kilograms", "key$": "mass_kg" }, "mass_lbs": { "type": "integer", "nullable": true, "description": "Mass in pounds", "key$": "mass_lbs" }, "year_built": { "type": "integer", "nullable": true, "description": "Year built", "key$": "year_built" }, "home_port": { "type": "string", "nullable": true, "description": "Home port", "key$": "home_port" }, "status": { "type": "string", "description": "Ship status", "key$": "status" }, "speed_kn": { "type": "number", "nullable": true, "description": "Speed in knots", "key$": "speed_kn" }, "course_deg": { "type": "number", "nullable": true, "description": "Course in degrees", "key$": "course_deg" }, "latitude": { "type": "number", "nullable": true, "description": "Latitude", "key$": "latitude" }, "longitude": { "type": "number", "nullable": true, "description": "Longitude", "key$": "longitude" }, "last_ais_update": { "type": "string", "nullable": true, "description": "Last AIS update timestamp", "key$": "last_ais_update" }, "link": { "type": "string", "nullable": true, "description": "Link to ship info", "key$": "link" }, "image": { "type": "string", "nullable": true, "description": "Image URL", "key$": "image" }, "launches": { "type": "array", "items": { "type": "string" }, "description": "Launch IDs", "key$": "launches" } }, "x-ref": "#/components/schemas/Ship", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /ships/{id}": { "protocol": "http", "operationId": "getOneShip", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Ship ID", "key$": "id" }, "name": { "type": "string", "description": "Ship name", "key$": "name" }, "legacy_id": { "type": "string", "nullable": true, "description": "Legacy ID", "key$": "legacy_id" }, "model": { "type": "string", "nullable": true, "description": "Ship model", "key$": "model" }, "type": { "type": "string", "description": "Ship type", "key$": "type" }, "roles": { "type": "array", "items": { "type": "string" }, "description": "Ship roles", "key$": "roles" }, "imo": { "type": "integer", "nullable": true, "description": "IMO number", "key$": "imo" }, "mmsi": { "type": "integer", "nullable": true, "description": "MMSI number", "key$": "mmsi" }, "abs": { "type": "integer", "nullable": true, "description": "ABS number", "key$": "abs" }, "class": { "type": "integer", "nullable": true, "description": "Ship class", "key$": "class" }, "mass_kg": { "type": "integer", "nullable": true, "description": "Mass in kilograms", "key$": "mass_kg" }, "mass_lbs": { "type": "integer", "nullable": true, "description": "Mass in pounds", "key$": "mass_lbs" }, "year_built": { "type": "integer", "nullable": true, "description": "Year built", "key$": "year_built" }, "home_port": { "type": "string", "nullable": true, "description": "Home port", "key$": "home_port" }, "status": { "type": "string", "description": "Ship status", "key$": "status" }, "speed_kn": { "type": "number", "nullable": true, "description": "Speed in knots", "key$": "speed_kn" }, "course_deg": { "type": "number", "nullable": true, "description": "Course in degrees", "key$": "course_deg" }, "latitude": { "type": "number", "nullable": true, "description": "Latitude", "key$": "latitude" }, "longitude": { "type": "number", "nullable": true, "description": "Longitude", "key$": "longitude" }, "last_ais_update": { "type": "string", "nullable": true, "description": "Last AIS update timestamp", "key$": "last_ais_update" }, "link": { "type": "string", "nullable": true, "description": "Link to ship info", "key$": "link" }, "image": { "type": "string", "nullable": true, "description": "Image URL", "key$": "image" }, "launches": { "type": "array", "items": { "type": "string" }, "description": "Launch IDs", "key$": "launches" } }, "x-ref": "#/components/schemas/Ship", "index$": 0 } } } }, "404": { "description": "Ship not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Ship ID", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let ship_ref01_data = Object.values(setup.data.existing.ship)[0];
        // LIST
        const ship_ref01_ent = client.Ship();
        const ship_ref01_match = {};
        const ship_ref01_list = (await ship_ref01_ent.list(ship_ref01_match)).map((e) => e.data());
        // LOAD
        const ship_ref01_match_dt0 = {};
        ship_ref01_match_dt0.id = ship_ref01_data.id;
        const ship_ref01_data_dt0 = (await ship_ref01_ent.load(ship_ref01_match_dt0)).data();
        (0, node_assert_1.default)(ship_ref01_data_dt0.id === ship_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ship/ShipTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ship01', 'ship02', 'ship03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_SHIP_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_SHIP_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_SHIP_ENTID'];
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
//# sourceMappingURL=ShipEntity.test.js.map