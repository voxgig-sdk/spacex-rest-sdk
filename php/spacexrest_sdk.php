<?php
declare(strict_types=1);

// SpacexRest SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class SpacexRestSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new SpacexRestUtility();
        $this->_utility = $utility;

        $config = SpacexRestConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = SpacexRestHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = SpacexRestHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, SpacexRestFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return SpacexRestUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = SpacexRestHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = SpacexRestHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = SpacexRestHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new SpacexRestSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = SpacexRestHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = SpacexRestHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_capsule = null;

    // Canonical facade: $client->Capsule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->capsule()
    // resolves here too.
    public function Capsule($data = null)
    {
        require_once __DIR__ . '/entity/capsule_entity.php';
        if ($data === null) {
            if ($this->_capsule === null) {
                $this->_capsule = new CapsuleEntity($this, null);
            }
            return $this->_capsule;
        }
        return new CapsuleEntity($this, $data);
    }


    private $_core = null;

    // Canonical facade: $client->Core()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->core()
    // resolves here too.
    public function Core($data = null)
    {
        require_once __DIR__ . '/entity/core_entity.php';
        if ($data === null) {
            if ($this->_core === null) {
                $this->_core = new CoreEntity($this, null);
            }
            return $this->_core;
        }
        return new CoreEntity($this, $data);
    }


    private $_crew = null;

    // Canonical facade: $client->Crew()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->crew()
    // resolves here too.
    public function Crew($data = null)
    {
        require_once __DIR__ . '/entity/crew_entity.php';
        if ($data === null) {
            if ($this->_crew === null) {
                $this->_crew = new CrewEntity($this, null);
            }
            return $this->_crew;
        }
        return new CrewEntity($this, $data);
    }


    private $_landpad = null;

    // Canonical facade: $client->Landpad()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->landpad()
    // resolves here too.
    public function Landpad($data = null)
    {
        require_once __DIR__ . '/entity/landpad_entity.php';
        if ($data === null) {
            if ($this->_landpad === null) {
                $this->_landpad = new LandpadEntity($this, null);
            }
            return $this->_landpad;
        }
        return new LandpadEntity($this, $data);
    }


    private $_launch = null;

    // Canonical facade: $client->Launch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->launch()
    // resolves here too.
    public function Launch($data = null)
    {
        require_once __DIR__ . '/entity/launch_entity.php';
        if ($data === null) {
            if ($this->_launch === null) {
                $this->_launch = new LaunchEntity($this, null);
            }
            return $this->_launch;
        }
        return new LaunchEntity($this, $data);
    }


    private $_launchpad = null;

    // Canonical facade: $client->Launchpad()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->launchpad()
    // resolves here too.
    public function Launchpad($data = null)
    {
        require_once __DIR__ . '/entity/launchpad_entity.php';
        if ($data === null) {
            if ($this->_launchpad === null) {
                $this->_launchpad = new LaunchpadEntity($this, null);
            }
            return $this->_launchpad;
        }
        return new LaunchpadEntity($this, $data);
    }


    private $_payload = null;

    // Canonical facade: $client->Payload()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payload()
    // resolves here too.
    public function Payload($data = null)
    {
        require_once __DIR__ . '/entity/payload_entity.php';
        if ($data === null) {
            if ($this->_payload === null) {
                $this->_payload = new PayloadEntity($this, null);
            }
            return $this->_payload;
        }
        return new PayloadEntity($this, $data);
    }


    private $_roadster = null;

    // Canonical facade: $client->Roadster()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->roadster()
    // resolves here too.
    public function Roadster($data = null)
    {
        require_once __DIR__ . '/entity/roadster_entity.php';
        if ($data === null) {
            if ($this->_roadster === null) {
                $this->_roadster = new RoadsterEntity($this, null);
            }
            return $this->_roadster;
        }
        return new RoadsterEntity($this, $data);
    }


    private $_rocket = null;

    // Canonical facade: $client->Rocket()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->rocket()
    // resolves here too.
    public function Rocket($data = null)
    {
        require_once __DIR__ . '/entity/rocket_entity.php';
        if ($data === null) {
            if ($this->_rocket === null) {
                $this->_rocket = new RocketEntity($this, null);
            }
            return $this->_rocket;
        }
        return new RocketEntity($this, $data);
    }


    private $_ship = null;

    // Canonical facade: $client->Ship()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ship()
    // resolves here too.
    public function Ship($data = null)
    {
        require_once __DIR__ . '/entity/ship_entity.php';
        if ($data === null) {
            if ($this->_ship === null) {
                $this->_ship = new ShipEntity($this, null);
            }
            return $this->_ship;
        }
        return new ShipEntity($this, $data);
    }


    private $_starlink = null;

    // Canonical facade: $client->Starlink()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->starlink()
    // resolves here too.
    public function Starlink($data = null)
    {
        require_once __DIR__ . '/entity/starlink_entity.php';
        if ($data === null) {
            if ($this->_starlink === null) {
                $this->_starlink = new StarlinkEntity($this, null);
            }
            return $this->_starlink;
        }
        return new StarlinkEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new SpacexRestSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
