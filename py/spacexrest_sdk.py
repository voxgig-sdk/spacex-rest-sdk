# SpacexRest SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import SpacexRestUtility
from core.spec import SpacexRestSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import SpacexRestBaseFeature
from features import _make_feature


class SpacexRestSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = SpacexRestUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return SpacexRestUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = SpacexRestSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def capsule(self):
        """Idiomatic facade: client.capsule.list() / client.capsule.load({"id": ...})."""
        from entity.capsule_entity import CapsuleEntity
        cached = getattr(self, "_capsule", None)
        if cached is None:
            cached = CapsuleEntity(self, None)
            self._capsule = cached
        return cached

    def Capsule(self, data=None):
        # Deprecated: use client.capsule instead.
        from entity.capsule_entity import CapsuleEntity
        return CapsuleEntity(self, data)


    @property
    def core(self):
        """Idiomatic facade: client.core.list() / client.core.load({"id": ...})."""
        from entity.core_entity import CoreEntity
        cached = getattr(self, "_core", None)
        if cached is None:
            cached = CoreEntity(self, None)
            self._core = cached
        return cached

    def Core(self, data=None):
        # Deprecated: use client.core instead.
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    @property
    def crew(self):
        """Idiomatic facade: client.crew.list() / client.crew.load({"id": ...})."""
        from entity.crew_entity import CrewEntity
        cached = getattr(self, "_crew", None)
        if cached is None:
            cached = CrewEntity(self, None)
            self._crew = cached
        return cached

    def Crew(self, data=None):
        # Deprecated: use client.crew instead.
        from entity.crew_entity import CrewEntity
        return CrewEntity(self, data)


    @property
    def landpad(self):
        """Idiomatic facade: client.landpad.list() / client.landpad.load({"id": ...})."""
        from entity.landpad_entity import LandpadEntity
        cached = getattr(self, "_landpad", None)
        if cached is None:
            cached = LandpadEntity(self, None)
            self._landpad = cached
        return cached

    def Landpad(self, data=None):
        # Deprecated: use client.landpad instead.
        from entity.landpad_entity import LandpadEntity
        return LandpadEntity(self, data)


    @property
    def launch(self):
        """Idiomatic facade: client.launch.list() / client.launch.load({"id": ...})."""
        from entity.launch_entity import LaunchEntity
        cached = getattr(self, "_launch", None)
        if cached is None:
            cached = LaunchEntity(self, None)
            self._launch = cached
        return cached

    def Launch(self, data=None):
        # Deprecated: use client.launch instead.
        from entity.launch_entity import LaunchEntity
        return LaunchEntity(self, data)


    @property
    def launchpad(self):
        """Idiomatic facade: client.launchpad.list() / client.launchpad.load({"id": ...})."""
        from entity.launchpad_entity import LaunchpadEntity
        cached = getattr(self, "_launchpad", None)
        if cached is None:
            cached = LaunchpadEntity(self, None)
            self._launchpad = cached
        return cached

    def Launchpad(self, data=None):
        # Deprecated: use client.launchpad instead.
        from entity.launchpad_entity import LaunchpadEntity
        return LaunchpadEntity(self, data)


    @property
    def payload(self):
        """Idiomatic facade: client.payload.list() / client.payload.load({"id": ...})."""
        from entity.payload_entity import PayloadEntity
        cached = getattr(self, "_payload", None)
        if cached is None:
            cached = PayloadEntity(self, None)
            self._payload = cached
        return cached

    def Payload(self, data=None):
        # Deprecated: use client.payload instead.
        from entity.payload_entity import PayloadEntity
        return PayloadEntity(self, data)


    @property
    def roadster(self):
        """Idiomatic facade: client.roadster.list() / client.roadster.load({"id": ...})."""
        from entity.roadster_entity import RoadsterEntity
        cached = getattr(self, "_roadster", None)
        if cached is None:
            cached = RoadsterEntity(self, None)
            self._roadster = cached
        return cached

    def Roadster(self, data=None):
        # Deprecated: use client.roadster instead.
        from entity.roadster_entity import RoadsterEntity
        return RoadsterEntity(self, data)


    @property
    def rocket(self):
        """Idiomatic facade: client.rocket.list() / client.rocket.load({"id": ...})."""
        from entity.rocket_entity import RocketEntity
        cached = getattr(self, "_rocket", None)
        if cached is None:
            cached = RocketEntity(self, None)
            self._rocket = cached
        return cached

    def Rocket(self, data=None):
        # Deprecated: use client.rocket instead.
        from entity.rocket_entity import RocketEntity
        return RocketEntity(self, data)


    @property
    def ship(self):
        """Idiomatic facade: client.ship.list() / client.ship.load({"id": ...})."""
        from entity.ship_entity import ShipEntity
        cached = getattr(self, "_ship", None)
        if cached is None:
            cached = ShipEntity(self, None)
            self._ship = cached
        return cached

    def Ship(self, data=None):
        # Deprecated: use client.ship instead.
        from entity.ship_entity import ShipEntity
        return ShipEntity(self, data)


    @property
    def starlink(self):
        """Idiomatic facade: client.starlink.list() / client.starlink.load({"id": ...})."""
        from entity.starlink_entity import StarlinkEntity
        cached = getattr(self, "_starlink", None)
        if cached is None:
            cached = StarlinkEntity(self, None)
            self._starlink = cached
        return cached

    def Starlink(self, data=None):
        # Deprecated: use client.starlink instead.
        from entity.starlink_entity import StarlinkEntity
        return StarlinkEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
