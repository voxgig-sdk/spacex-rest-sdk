# Core entity test

require "minitest/autorun"
require "json"
require_relative "../SpacexRest_sdk"
require_relative "runner"

class CoreEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SpacexRestSDK.test(nil, nil)
    ent = testsdk.Core(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = core_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "core." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SPACEXREST_TEST_CORE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    core_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.core")))
    core_ref01_data = nil
    if core_ref01_data_raw.length > 0
      core_ref01_data = Helpers.to_map(core_ref01_data_raw[0][1])
    end

    # LIST
    core_ref01_ent = client.Core(nil)
    core_ref01_match = {}

    core_ref01_list_result, err = core_ref01_ent.list(core_ref01_match, nil)
    assert_nil err
    assert core_ref01_list_result.is_a?(Array)

    # LOAD
    core_ref01_match_dt0 = {
      "id" => core_ref01_data["id"],
    }
    core_ref01_data_dt0_loaded, err = core_ref01_ent.load(core_ref01_match_dt0, nil)
    assert_nil err
    core_ref01_data_dt0_load_result = Helpers.to_map(core_ref01_data_dt0_loaded)
    assert !core_ref01_data_dt0_load_result.nil?
    assert_equal core_ref01_data_dt0_load_result["id"], core_ref01_data["id"]

  end
end

def core_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "core", "CoreTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SpacexRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["core01", "core02", "core03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SPACEXREST_TEST_CORE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SPACEXREST_TEST_CORE_ENTID" => idmap,
    "SPACEXREST_TEST_LIVE" => "FALSE",
    "SPACEXREST_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SPACEXREST_TEST_CORE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SPACEXREST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = SpacexRestSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SPACEXREST_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SPACEXREST_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
