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
(0, node_test_1.describe)('RoadsterEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEX_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEX_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpacexRestSDK.test();
        const ent = testsdk.Roadster();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEX_REST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'roadster.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "apoapsis_au": { "a": true, "h": "Apoapsis Au", "n": "apoapsis_au", "r": false, "sh": "Apoapsis in AU", "t": "`$NUMBER`", "key$": "apoapsis_au", "index$": 0 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Details", "t": "`$STRING`", "key$": "details", "index$": 1 }, "earth_distance_km": { "a": true, "h": "Earth Distance Km", "n": "earth_distance_km", "r": false, "sh": "Distance from Earth in km", "t": "`$NUMBER`", "key$": "earth_distance_km", "index$": 2 }, "earth_distance_mi": { "a": true, "h": "Earth Distance Mi", "n": "earth_distance_mi", "r": false, "sh": "Distance from Earth in miles", "t": "`$NUMBER`", "key$": "earth_distance_mi", "index$": 3 }, "eccentricity": { "a": true, "h": "Eccentricity", "n": "eccentricity", "r": false, "sh": "Eccentricity", "t": "`$NUMBER`", "key$": "eccentricity", "index$": 4 }, "epoch_jd": { "a": true, "h": "Epoch Jd", "n": "epoch_jd", "r": false, "sh": "Epoch in Julian Date", "t": "`$NUMBER`", "key$": "epoch_jd", "index$": 5 }, "flickr_images": { "a": true, "h": "Flickr Images", "n": "flickr_images", "r": false, "sh": "Flickr images", "t": "`$ARRAY`", "key$": "flickr_images", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Roadster ID", "t": "`$STRING`", "key$": "id", "index$": 7 }, "inclination": { "a": true, "h": "Inclination", "n": "inclination", "r": false, "sh": "Inclination", "t": "`$NUMBER`", "key$": "inclination", "index$": 8 }, "launch_date_unix": { "a": true, "h": "Launch Date Unix", "n": "launch_date_unix", "r": false, "sh": "Launch date in unix timestamp", "t": "`$INTEGER`", "key$": "launch_date_unix", "index$": 9 }, "launch_date_utc": { "a": true, "fo": "date-time", "h": "Launch Date Utc", "n": "launch_date_utc", "r": false, "sh": "Launch date in UTC", "t": "`$STRING`", "key$": "launch_date_utc", "index$": 10 }, "launch_mass_kg": { "a": true, "h": "Launch Mass Kg", "n": "launch_mass_kg", "r": false, "sh": "Launch mass in kilograms", "t": "`$INTEGER`", "key$": "launch_mass_kg", "index$": 11 }, "launch_mass_lbs": { "a": true, "h": "Launch Mass Lbs", "n": "launch_mass_lbs", "r": false, "sh": "Launch mass in pounds", "t": "`$INTEGER`", "key$": "launch_mass_lbs", "index$": 12 }, "longitude": { "a": true, "h": "Longitude", "n": "longitude", "r": false, "sh": "Longitude", "t": "`$NUMBER`", "key$": "longitude", "index$": 13 }, "mars_distance_km": { "a": true, "h": "Mars Distance Km", "n": "mars_distance_km", "r": false, "sh": "Distance from Mars in km", "t": "`$NUMBER`", "key$": "mars_distance_km", "index$": 14 }, "mars_distance_mi": { "a": true, "h": "Mars Distance Mi", "n": "mars_distance_mi", "r": false, "sh": "Distance from Mars in miles", "t": "`$NUMBER`", "key$": "mars_distance_mi", "index$": 15 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Roadster name", "t": "`$STRING`", "key$": "name", "index$": 16 }, "norad_id": { "a": true, "h": "Norad Id", "n": "norad_id", "r": false, "sh": "NORAD ID", "t": "`$INTEGER`", "key$": "norad_id", "index$": 17 }, "orbit_type": { "a": true, "h": "Orbit Type", "n": "orbit_type", "r": false, "sh": "Orbit type", "t": "`$STRING`", "key$": "orbit_type", "index$": 18 }, "periapsis_arg": { "a": true, "h": "Periapsis Arg", "n": "periapsis_arg", "r": false, "sh": "Argument of periapsis", "t": "`$NUMBER`", "key$": "periapsis_arg", "index$": 19 }, "periapsis_au": { "a": true, "h": "Periapsis Au", "n": "periapsis_au", "r": false, "sh": "Periapsis in AU", "t": "`$NUMBER`", "key$": "periapsis_au", "index$": 20 }, "period_days": { "a": true, "h": "Period Days", "n": "period_days", "r": false, "sh": "Orbital period in days", "t": "`$NUMBER`", "key$": "period_days", "index$": 21 }, "semi_major_axis_au": { "a": true, "h": "Semi Major Axis Au", "n": "semi_major_axis_au", "r": false, "sh": "Semi-major axis in AU", "t": "`$NUMBER`", "key$": "semi_major_axis_au", "index$": 22 }, "speed_kph": { "a": true, "h": "Speed Kph", "n": "speed_kph", "r": false, "sh": "Speed in km/h", "t": "`$NUMBER`", "key$": "speed_kph", "index$": 23 }, "speed_mph": { "a": true, "h": "Speed Mph", "n": "speed_mph", "r": false, "sh": "Speed in mph", "t": "`$NUMBER`", "key$": "speed_mph", "index$": 24 }, "video": { "a": true, "h": "Video", "n": "video", "r": false, "sh": "Video URL", "t": "`$STRING`", "key$": "video", "index$": 25 }, "wikipedia": { "a": true, "h": "Wikipedia", "n": "wikipedia", "r": false, "sh": "Wikipedia URL", "t": "`$STRING`", "key$": "wikipedia", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "roadster", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /roadster", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/roadster", "q": {}, "r": {}, "s": [{ "lit": "roadster" }], "t": { "req": "`reqdata`", "res": "`body.flickr_images`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "roadster", "name__orig": "roadster", "Name": "Roadster", "name_": "roadster", "name-": "roadster", "NAME": "ROADSTER", "index$": 7 }, { "active": true, "entity": "roadster", "key$": "BasicRoadsterFlow", "kind": "basic", "name": "BasicRoadsterFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "roadster_ref01" } }], "index$": 0 }] }, 'Roadster', { "GET /roadster": { "protocol": "http", "operationId": "getRoadster", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Roadster ID", "key$": "id", "type": "string" }, "name": { "description": "Roadster name", "key$": "name", "type": "string" }, "launch_date_utc": { "description": "Launch date in UTC", "format": "date-time", "key$": "launch_date_utc", "type": "string" }, "launch_date_unix": { "description": "Launch date in unix timestamp", "key$": "launch_date_unix", "type": "integer" }, "launch_mass_kg": { "description": "Launch mass in kilograms", "key$": "launch_mass_kg", "type": "integer" }, "launch_mass_lbs": { "description": "Launch mass in pounds", "key$": "launch_mass_lbs", "type": "integer" }, "norad_id": { "description": "NORAD ID", "key$": "norad_id", "type": "integer" }, "epoch_jd": { "description": "Epoch in Julian Date", "key$": "epoch_jd", "type": "number" }, "orbit_type": { "description": "Orbit type", "key$": "orbit_type", "type": "string" }, "apoapsis_au": { "description": "Apoapsis in AU", "key$": "apoapsis_au", "type": "number" }, "periapsis_au": { "description": "Periapsis in AU", "key$": "periapsis_au", "type": "number" }, "semi_major_axis_au": { "description": "Semi-major axis in AU", "key$": "semi_major_axis_au", "type": "number" }, "eccentricity": { "description": "Eccentricity", "key$": "eccentricity", "type": "number" }, "inclination": { "description": "Inclination", "key$": "inclination", "type": "number" }, "longitude": { "description": "Longitude", "key$": "longitude", "type": "number" }, "periapsis_arg": { "description": "Argument of periapsis", "key$": "periapsis_arg", "type": "number" }, "period_days": { "description": "Orbital period in days", "key$": "period_days", "type": "number" }, "speed_kph": { "description": "Speed in km/h", "key$": "speed_kph", "type": "number" }, "speed_mph": { "description": "Speed in mph", "key$": "speed_mph", "type": "number" }, "earth_distance_km": { "description": "Distance from Earth in km", "key$": "earth_distance_km", "type": "number" }, "earth_distance_mi": { "description": "Distance from Earth in miles", "key$": "earth_distance_mi", "type": "number" }, "mars_distance_km": { "description": "Distance from Mars in km", "key$": "mars_distance_km", "type": "number" }, "mars_distance_mi": { "description": "Distance from Mars in miles", "key$": "mars_distance_mi", "type": "number" }, "flickr_images": { "description": "Flickr images", "items": { "type": "string" }, "key$": "flickr_images", "type": "array" }, "wikipedia": { "description": "Wikipedia URL", "key$": "wikipedia", "type": "string" }, "video": { "description": "Video URL", "key$": "video", "type": "string" }, "details": { "description": "Details", "key$": "details", "type": "string" } }, "x-ref": "#/components/schemas/Roadster", "index$": 0 } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let roadster_ref01_data = Object.values(setup.data.existing.roadster)[0];
        // LIST
        const roadster_ref01_ent = client.Roadster();
        const roadster_ref01_match = {};
        const roadster_ref01_list = (await roadster_ref01_ent.list(roadster_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/roadster/RoadsterTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpacexRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['roadster01', 'roadster02', 'roadster03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEX_REST_TEST_ROADSTER_ENTID': idmap,
        'SPACEX_REST_TEST_LIVE': 'FALSE',
        'SPACEX_REST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SPACEX_REST_TEST_ROADSTER_ENTID'];
    const live = 'TRUE' === env.SPACEX_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEX_REST_TEST_ROADSTER_ENTID'];
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
//# sourceMappingURL=RoadsterEntity.test.js.map