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

func TestLandpadEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Landpad(nil)
		if ent == nil {
			t.Fatal("expected non-nil LandpadEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := landpadBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "landpad." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SPACEXREST_TEST_LANDPAD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		landpadRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.landpad", setup.data)))
		var landpadRef01Data map[string]any
		if len(landpadRef01DataRaw) > 0 {
			landpadRef01Data = core.ToMapAny(landpadRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = landpadRef01Data

		// LIST
		landpadRef01Ent := client.Landpad(nil)
		landpadRef01Match := map[string]any{}

		landpadRef01ListResult, err := landpadRef01Ent.List(landpadRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, landpadRef01ListOk := landpadRef01ListResult.([]any)
		if !landpadRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", landpadRef01ListResult)
		}

		// LOAD
		landpadRef01MatchDt0 := map[string]any{
			"id": landpadRef01Data["id"],
		}
		landpadRef01DataDt0Loaded, err := landpadRef01Ent.Load(landpadRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		landpadRef01DataDt0LoadResult := core.ToMapAny(landpadRef01DataDt0Loaded)
		if landpadRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if landpadRef01DataDt0LoadResult["id"] != landpadRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func landpadBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "landpad", "LandpadTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read landpad test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse landpad test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"landpad01", "landpad02", "landpad03"},
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
	entidEnvRaw := os.Getenv("SPACEXREST_TEST_LANDPAD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SPACEXREST_TEST_LANDPAD_ENTID": idmap,
		"SPACEXREST_TEST_LIVE":      "FALSE",
		"SPACEXREST_TEST_EXPLAIN":   "FALSE",
		"SPACEXREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["SPACEXREST_TEST_LANDPAD_ENTID"])
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
