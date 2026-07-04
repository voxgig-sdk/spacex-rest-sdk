// SpacexRest Ts SDK

import { CapsuleEntity } from './entity/CapsuleEntity'
import { CoreEntity } from './entity/CoreEntity'
import { CrewEntity } from './entity/CrewEntity'
import { LandpadEntity } from './entity/LandpadEntity'
import { LaunchEntity } from './entity/LaunchEntity'
import { LaunchpadEntity } from './entity/LaunchpadEntity'
import { PayloadEntity } from './entity/PayloadEntity'
import { RoadsterEntity } from './entity/RoadsterEntity'
import { RocketEntity } from './entity/RocketEntity'
import { ShipEntity } from './entity/ShipEntity'
import { StarlinkEntity } from './entity/StarlinkEntity'

export type * from './SpacexRestTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { SpacexRestEntityBase } from './SpacexRestEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class SpacexRestSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _capsule?: CapsuleEntity

  // Idiomatic facade: `client.capsule.list()` / `client.capsule.load({ id })`.
  get capsule(): CapsuleEntity {
    return (this._capsule ??= new CapsuleEntity(this, undefined))
  }

  /** @deprecated Use `client.capsule` instead. */
  Capsule(data?: any) {
    const self = this
    return new CapsuleEntity(self,data)
  }


  _core?: CoreEntity

  // Idiomatic facade: `client.core.list()` / `client.core.load({ id })`.
  get core(): CoreEntity {
    return (this._core ??= new CoreEntity(this, undefined))
  }

  /** @deprecated Use `client.core` instead. */
  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  _crew?: CrewEntity

  // Idiomatic facade: `client.crew.list()` / `client.crew.load({ id })`.
  get crew(): CrewEntity {
    return (this._crew ??= new CrewEntity(this, undefined))
  }

  /** @deprecated Use `client.crew` instead. */
  Crew(data?: any) {
    const self = this
    return new CrewEntity(self,data)
  }


  _landpad?: LandpadEntity

  // Idiomatic facade: `client.landpad.list()` / `client.landpad.load({ id })`.
  get landpad(): LandpadEntity {
    return (this._landpad ??= new LandpadEntity(this, undefined))
  }

  /** @deprecated Use `client.landpad` instead. */
  Landpad(data?: any) {
    const self = this
    return new LandpadEntity(self,data)
  }


  _launch?: LaunchEntity

  // Idiomatic facade: `client.launch.list()` / `client.launch.load({ id })`.
  get launch(): LaunchEntity {
    return (this._launch ??= new LaunchEntity(this, undefined))
  }

  /** @deprecated Use `client.launch` instead. */
  Launch(data?: any) {
    const self = this
    return new LaunchEntity(self,data)
  }


  _launchpad?: LaunchpadEntity

  // Idiomatic facade: `client.launchpad.list()` / `client.launchpad.load({ id })`.
  get launchpad(): LaunchpadEntity {
    return (this._launchpad ??= new LaunchpadEntity(this, undefined))
  }

  /** @deprecated Use `client.launchpad` instead. */
  Launchpad(data?: any) {
    const self = this
    return new LaunchpadEntity(self,data)
  }


  _payload?: PayloadEntity

  // Idiomatic facade: `client.payload.list()` / `client.payload.load({ id })`.
  get payload(): PayloadEntity {
    return (this._payload ??= new PayloadEntity(this, undefined))
  }

  /** @deprecated Use `client.payload` instead. */
  Payload(data?: any) {
    const self = this
    return new PayloadEntity(self,data)
  }


  _roadster?: RoadsterEntity

  // Idiomatic facade: `client.roadster.list()` / `client.roadster.load({ id })`.
  get roadster(): RoadsterEntity {
    return (this._roadster ??= new RoadsterEntity(this, undefined))
  }

  /** @deprecated Use `client.roadster` instead. */
  Roadster(data?: any) {
    const self = this
    return new RoadsterEntity(self,data)
  }


  _rocket?: RocketEntity

  // Idiomatic facade: `client.rocket.list()` / `client.rocket.load({ id })`.
  get rocket(): RocketEntity {
    return (this._rocket ??= new RocketEntity(this, undefined))
  }

  /** @deprecated Use `client.rocket` instead. */
  Rocket(data?: any) {
    const self = this
    return new RocketEntity(self,data)
  }


  _ship?: ShipEntity

  // Idiomatic facade: `client.ship.list()` / `client.ship.load({ id })`.
  get ship(): ShipEntity {
    return (this._ship ??= new ShipEntity(this, undefined))
  }

  /** @deprecated Use `client.ship` instead. */
  Ship(data?: any) {
    const self = this
    return new ShipEntity(self,data)
  }


  _starlink?: StarlinkEntity

  // Idiomatic facade: `client.starlink.list()` / `client.starlink.load({ id })`.
  get starlink(): StarlinkEntity {
    return (this._starlink ??= new StarlinkEntity(this, undefined))
  }

  /** @deprecated Use `client.starlink` instead. */
  Starlink(data?: any) {
    const self = this
    return new StarlinkEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new SpacexRestSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return SpacexRestSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'SpacexRest' }
  }

  toString() {
    return 'SpacexRest ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = SpacexRestSDK


export {
  stdutil,

  BaseFeature,
  SpacexRestEntityBase,

  SpacexRestSDK,
  SDK,
}


