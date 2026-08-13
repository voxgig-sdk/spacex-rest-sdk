<?php
declare(strict_types=1);

// Rocket entity test

require_once __DIR__ . '/../spacexrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RocketEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SpacexRestSDK::test(null, null);
        $ent = $testsdk->Rocket(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "rocket" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = SpacexRestSDK::test($seed, null);
        $seen = iterator_to_array($base->Rocket(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = SpacexRestConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = SpacexRestSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Rocket(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = rocket_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "rocket." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SPACEX_REST_TEST_ROCKET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $rocket_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.rocket")));
        $rocket_ref01_data = null;
        if (count($rocket_ref01_data_raw) > 0) {
            $rocket_ref01_data = Helpers::to_map($rocket_ref01_data_raw[0][1]);
        }

        // LIST
        $rocket_ref01_ent = $client->Rocket(null);
        $rocket_ref01_match = [];

        $rocket_ref01_list_result = $rocket_ref01_ent->list($rocket_ref01_match, null);
        $this->assertIsArray($rocket_ref01_list_result);

        // LOAD
        $rocket_ref01_match_dt0 = [
            "id" => $rocket_ref01_data["id"],
        ];
        $rocket_ref01_data_dt0_loaded = $rocket_ref01_ent->load($rocket_ref01_match_dt0, null);
        $rocket_ref01_data_dt0_load_result = Helpers::to_map(is_object($rocket_ref01_data_dt0_loaded) && method_exists($rocket_ref01_data_dt0_loaded, 'data_get') ? $rocket_ref01_data_dt0_loaded->data_get() : $rocket_ref01_data_dt0_loaded);
        $this->assertNotNull($rocket_ref01_data_dt0_load_result);
        $this->assertEquals($rocket_ref01_data_dt0_load_result["id"], $rocket_ref01_data["id"]);

    }
}

function rocket_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/rocket/RocketTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SpacexRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["rocket01", "rocket02", "rocket03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SPACEX_REST_TEST_ROCKET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SPACEX_REST_TEST_ROCKET_ENTID" => $idmap,
        "SPACEX_REST_TEST_LIVE" => "FALSE",
        "SPACEX_REST_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SPACEX_REST_TEST_ROCKET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SPACEX_REST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SpacexRestSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SPACEX_REST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SPACEX_REST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
