package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/spacex-rest-sdk/go"
	"github.com/voxgig-sdk/spacex-rest-sdk/go/core"

	vs "github.com/voxgig-sdk/spacex-rest-sdk/go/utility/struct"
)

func TestLaunchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Launch(nil)
		if ent == nil {
			t.Fatal("expected non-nil LaunchEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := launchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "launch." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SPACEXREST_TEST_LAUNCH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		launchRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.launch", setup.data)))
		var launchRef01Data map[string]any
		if len(launchRef01DataRaw) > 0 {
			launchRef01Data = core.ToMapAny(launchRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = launchRef01Data

		// LIST
		launchRef01Ent := client.Launch(nil)
		launchRef01Match := map[string]any{}

		launchRef01ListResult, err := launchRef01Ent.List(launchRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, launchRef01ListOk := launchRef01ListResult.([]any)
		if !launchRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", launchRef01ListResult)
		}

		// LOAD
		launchRef01MatchDt0 := map[string]any{
			"id": launchRef01Data["id"],
		}
		launchRef01DataDt0Loaded, err := launchRef01Ent.Load(launchRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		launchRef01DataDt0LoadResult := core.ToMapAny(launchRef01DataDt0Loaded)
		if launchRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if launchRef01DataDt0LoadResult["id"] != launchRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func launchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "launch", "LaunchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read launch test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse launch test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"launch01", "launch02", "launch03"},
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
	entidEnvRaw := os.Getenv("SPACEXREST_TEST_LAUNCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SPACEXREST_TEST_LAUNCH_ENTID": idmap,
		"SPACEXREST_TEST_LIVE":      "FALSE",
		"SPACEXREST_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SPACEXREST_TEST_LAUNCH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SPACEXREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
