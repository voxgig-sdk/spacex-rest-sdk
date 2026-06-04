<?php
declare(strict_types=1);

// Ship entity test

require_once __DIR__ . '/../spacexrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ShipEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SpacexRestSDK::test(null, null);
        $ent = $testsdk->Ship(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ship_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ship." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SPACEXREST_TEST_SHIP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $ship_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.ship")));
        $ship_ref01_data = null;
        if (count($ship_ref01_data_raw) > 0) {
            $ship_ref01_data = Helpers::to_map($ship_ref01_data_raw[0][1]);
        }

        // LIST
        $ship_ref01_ent = $client->Ship(null);
        $ship_ref01_match = [];

        [$ship_ref01_list_result, $err] = $ship_ref01_ent->list($ship_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($ship_ref01_list_result);

        // LOAD
        $ship_ref01_match_dt0 = [
            "id" => $ship_ref01_data["id"],
        ];
        [$ship_ref01_data_dt0_loaded, $err] = $ship_ref01_ent->load($ship_ref01_match_dt0, null);
        $this->assertNull($err);
        $ship_ref01_data_dt0_load_result = Helpers::to_map($ship_ref01_data_dt0_loaded);
        $this->assertNotNull($ship_ref01_data_dt0_load_result);
        $this->assertEquals($ship_ref01_data_dt0_load_result["id"], $ship_ref01_data["id"]);

    }
}

function ship_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ship/ShipTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SpacexRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ship01", "ship02", "ship03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SPACEXREST_TEST_SHIP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SPACEXREST_TEST_SHIP_ENTID" => $idmap,
        "SPACEXREST_TEST_LIVE" => "FALSE",
        "SPACEXREST_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SPACEXREST_TEST_SHIP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SPACEXREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SpacexRestSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SPACEXREST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SPACEXREST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
