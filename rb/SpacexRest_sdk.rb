# SpacexRest SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'SpacexRest_types'


class SpacexRestSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = SpacexRestUtility.new
    @_utility = utility

    config = SpacexRestConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = SpacexRestHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = SpacexRestHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, SpacexRestFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    SpacexRestUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = SpacexRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = SpacexRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = SpacexRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = SpacexRestSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue SpacexRestError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = SpacexRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = SpacexRestHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.capsule.list / client.capsule.load({ "id" => ... })
  def capsule
    require_relative 'entity/capsule_entity'
    @capsule ||= CapsuleEntity.new(self, nil)
  end

  # Deprecated: use client.capsule instead.
  def Capsule(data = nil)
    require_relative 'entity/capsule_entity'
    CapsuleEntity.new(self, data)
  end


  # Idiomatic facade: client.core.list / client.core.load({ "id" => ... })
  def core
    require_relative 'entity/core_entity'
    @core ||= CoreEntity.new(self, nil)
  end

  # Deprecated: use client.core instead.
  def Core(data = nil)
    require_relative 'entity/core_entity'
    CoreEntity.new(self, data)
  end


  # Idiomatic facade: client.crew.list / client.crew.load({ "id" => ... })
  def crew
    require_relative 'entity/crew_entity'
    @crew ||= CrewEntity.new(self, nil)
  end

  # Deprecated: use client.crew instead.
  def Crew(data = nil)
    require_relative 'entity/crew_entity'
    CrewEntity.new(self, data)
  end


  # Idiomatic facade: client.landpad.list / client.landpad.load({ "id" => ... })
  def landpad
    require_relative 'entity/landpad_entity'
    @landpad ||= LandpadEntity.new(self, nil)
  end

  # Deprecated: use client.landpad instead.
  def Landpad(data = nil)
    require_relative 'entity/landpad_entity'
    LandpadEntity.new(self, data)
  end


  # Idiomatic facade: client.launch.list / client.launch.load({ "id" => ... })
  def launch
    require_relative 'entity/launch_entity'
    @launch ||= LaunchEntity.new(self, nil)
  end

  # Deprecated: use client.launch instead.
  def Launch(data = nil)
    require_relative 'entity/launch_entity'
    LaunchEntity.new(self, data)
  end


  # Idiomatic facade: client.launchpad.list / client.launchpad.load({ "id" => ... })
  def launchpad
    require_relative 'entity/launchpad_entity'
    @launchpad ||= LaunchpadEntity.new(self, nil)
  end

  # Deprecated: use client.launchpad instead.
  def Launchpad(data = nil)
    require_relative 'entity/launchpad_entity'
    LaunchpadEntity.new(self, data)
  end


  # Idiomatic facade: client.payload.list / client.payload.load({ "id" => ... })
  def payload
    require_relative 'entity/payload_entity'
    @payload ||= PayloadEntity.new(self, nil)
  end

  # Deprecated: use client.payload instead.
  def Payload(data = nil)
    require_relative 'entity/payload_entity'
    PayloadEntity.new(self, data)
  end


  # Idiomatic facade: client.roadster.list / client.roadster.load({ "id" => ... })
  def roadster
    require_relative 'entity/roadster_entity'
    @roadster ||= RoadsterEntity.new(self, nil)
  end

  # Deprecated: use client.roadster instead.
  def Roadster(data = nil)
    require_relative 'entity/roadster_entity'
    RoadsterEntity.new(self, data)
  end


  # Idiomatic facade: client.rocket.list / client.rocket.load({ "id" => ... })
  def rocket
    require_relative 'entity/rocket_entity'
    @rocket ||= RocketEntity.new(self, nil)
  end

  # Deprecated: use client.rocket instead.
  def Rocket(data = nil)
    require_relative 'entity/rocket_entity'
    RocketEntity.new(self, data)
  end


  # Idiomatic facade: client.ship.list / client.ship.load({ "id" => ... })
  def ship
    require_relative 'entity/ship_entity'
    @ship ||= ShipEntity.new(self, nil)
  end

  # Deprecated: use client.ship instead.
  def Ship(data = nil)
    require_relative 'entity/ship_entity'
    ShipEntity.new(self, data)
  end


  # Idiomatic facade: client.starlink.list / client.starlink.load({ "id" => ... })
  def starlink
    require_relative 'entity/starlink_entity'
    @starlink ||= StarlinkEntity.new(self, nil)
  end

  # Deprecated: use client.starlink instead.
  def Starlink(data = nil)
    require_relative 'entity/starlink_entity'
    StarlinkEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = SpacexRestSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
