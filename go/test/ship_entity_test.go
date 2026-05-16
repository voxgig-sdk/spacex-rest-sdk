package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/spacex-rest-sdk"
	"github.com/voxgig-sdk/spacex-rest-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestShipEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Ship(nil)
		if ent == nil {
			t.Fatal("expected non-nil ShipEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := shipBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ship." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SPACEXREST_TEST_SHIP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		shipRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ship", setup.data)))
		var shipRef01Data map[string]any
		if len(shipRef01DataRaw) > 0 {
			shipRef01Data = core.ToMapAny(shipRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = shipRef01Data

		// LIST
		shipRef01Ent := client.Ship(nil)
		shipRef01Match := map[string]any{}

		shipRef01ListResult, err := shipRef01Ent.List(shipRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, shipRef01ListOk := shipRef01ListResult.([]any)
		if !shipRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", shipRef01ListResult)
		}

		// LOAD
		shipRef01MatchDt0 := map[string]any{
			"id": shipRef01Data["id"],
		}
		shipRef01DataDt0Loaded, err := shipRef01Ent.Load(shipRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		shipRef01DataDt0LoadResult := core.ToMapAny(shipRef01DataDt0Loaded)
		if shipRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if shipRef01DataDt0LoadResult["id"] != shipRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func shipBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ship", "ShipTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ship test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ship test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ship01", "ship02", "ship03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SPACEXREST_TEST_SHIP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SPACEXREST_TEST_SHIP_ENTID": idmap,
		"SPACEXREST_TEST_LIVE":      "FALSE",
		"SPACEXREST_TEST_EXPLAIN":   "FALSE",
		"SPACEXREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["SPACEXREST_TEST_SHIP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SPACEXREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["SPACEXREST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewSpacexRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SPACEXREST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SPACEXREST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
