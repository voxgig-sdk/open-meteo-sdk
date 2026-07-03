# MarineForecast entity test

require "minitest/autorun"
require "json"
require_relative "../OpenMeteo_sdk"
require_relative "runner"

class MarineForecastEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenMeteoSDK.test(nil, nil)
    ent = testsdk.MarineForecast(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = marine_forecast_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "marine_forecast." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENMETEO_TEST_MARINE_FORECAST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    marine_forecast_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.marine_forecast")))
    marine_forecast_ref01_data = nil
    if marine_forecast_ref01_data_raw.length > 0
      marine_forecast_ref01_data = Helpers.to_map(marine_forecast_ref01_data_raw[0][1])
    end

    # LOAD
    marine_forecast_ref01_ent = client.MarineForecast(nil)
    marine_forecast_ref01_match_dt0 = {}
    marine_forecast_ref01_data_dt0_loaded, err = marine_forecast_ref01_ent.load(marine_forecast_ref01_match_dt0, nil)
    assert_nil err
    assert !marine_forecast_ref01_data_dt0_loaded.nil?

  end
end

def marine_forecast_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "marine_forecast", "MarineForecastTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenMeteoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["marine_forecast01", "marine_forecast02", "marine_forecast03"],
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
  entid_env_raw = ENV["OPENMETEO_TEST_MARINE_FORECAST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENMETEO_TEST_MARINE_FORECAST_ENTID" => idmap,
    "OPENMETEO_TEST_LIVE" => "FALSE",
    "OPENMETEO_TEST_EXPLAIN" => "FALSE",
    "OPENMETEO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENMETEO_TEST_MARINE_FORECAST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENMETEO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OPENMETEO_APIKEY"],
      },
      extra || {},
    ])
    client = OpenMeteoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENMETEO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENMETEO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
