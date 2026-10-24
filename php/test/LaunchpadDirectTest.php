<?php
declare(strict_types=1);

// Launchpad direct test

require_once __DIR__ . '/../spacexrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class LaunchpadDirectTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    private static function liveOk(array $result): bool
    {
        $status = Helpers::to_int($result["status"] ?? 0);
        return empty($result["err"]) && !empty($result["ok"]) && $status >= 200 && $status < 300;
    }

    public function test_direct_list_launchpad(): void
    {
        $setup = launchpad_direct_setup([
            ["id" => "direct01"],
            ["id" => "direct02"],
        ]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-list-launchpad", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        $client = $setup["client"];

        $params = [];

        $result = $client->direct([
            "path" => "launchpads",
            "method" => "GET",
            "params" => $params,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list failed: " . Runner::live_describe($result));
            }
            if (null === Runner::live_list($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list returned no list: " . Runner::live_describe($result));
            }
            $this->assertIsArray(Runner::live_list($result["data"]));
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertIsArray($result["data"]);
            $this->assertCount(2, $result["data"]);
            $this->assertCount(1, $setup["calls"]);
        }
    }

    public function test_direct_load_launchpad(): void
    {
        $setup = launchpad_direct_setup(["id" => "direct01"]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-load-launchpad", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        if ($setup["live"]) {
            $list_result = $client->direct([
                "path" => "launchpads",
                "method" => "GET",
                "params" => [],
            ]);
            if (!self::liveOk($list_result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list discovery failed: " . Runner::live_describe($list_result));
            }
            $records = Runner::live_list($list_result["data"] ?? null);
            if (null === $records) {
                Runner::live_miss(self::LIVE_STRICT, "Live list discovery returned no list: " . Runner::live_describe($list_result));
            }
            if (0 === count($records)) {
                Runner::live_empty("The account has no launchpad record to load");
            }
            $first = is_array($records[0]) ? $records[0] : [];
            $found = $first["id"] ?? $first["id"] ?? null;
            if (null === $found) {
                Runner::live_miss(self::LIVE_STRICT, "Live load blocked: discovery returned no usable identity");
            }
            $params["id"] = $found;
        } else {
            $params["id"] = "direct01";
        }

        $result = $client->direct([
            "path" => "launchpads/{id}",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load failed: " . Runner::live_describe($result));
            }
            if (null === ($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load returned no data: " . Runner::live_describe($result));
            }
            $this->assertNotNull($result["data"]);
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertNotNull($result["data"]);
            if (is_array($result["data"]) && isset($result["data"]["id"])) {
                $this->assertEquals("direct01", $result["data"]["id"]);
            }
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function launchpad_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "SPACEX_REST_TEST_LAUNCHPAD_ENTID" => [],
        "SPACEX_REST_TEST_LIVE" => "FALSE",
    ]);

    $live = $env["SPACEX_REST_TEST_LIVE"] === "TRUE";

    if ($live) {
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        $merged_opts = array_merge(Runner::live_client_options(), [
        ]);
        $client = new SpacexRestSDK($merged_opts);
        $idmap = $env["SPACEX_REST_TEST_LAUNCHPAD_ENTID"] ?? [];
        return [
            "client" => $client,
            "calls" => $calls,
            "live" => true,
            "idmap" => is_array($idmap) ? $idmap : [],
        ];
    }

    $mock_fetch = function ($url, $init) use ($calls, $mockres) {
        $calls[] = ["url" => $url, "init" => $init];
        return [
            [
                "status" => 200,
                "statusText" => "OK",
                "headers" => [],
                "json" => function () use ($mockres) {
                    if ($mockres !== null) {
                        return $mockres;
                    }
                    return ["id" => "direct01"];
                },
                "body" => "mock",
            ],
            null,
        ];
    };

    $client = new SpacexRestSDK([
        "base" => "http://localhost:8080",
        "system" => [
            "fetch" => $mock_fetch,
        ],
    ]);

    return [
        "client" => $client,
        "calls" => $calls,
        "live" => false,
        "idmap" => [],
    ];
}
