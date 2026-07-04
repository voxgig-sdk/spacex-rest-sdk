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


    def Capsule(self, data=None) -> "CapsuleEntity":
        """Entity factory: client.Capsule().list({}) / client.Capsule().load({"id": ...})."""
        from entity.capsule_entity import CapsuleEntity
        return CapsuleEntity(self, data)


    def Core(self, data=None) -> "CoreEntity":
        """Entity factory: client.Core().list({}) / client.Core().load({"id": ...})."""
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    def Crew(self, data=None) -> "CrewEntity":
        """Entity factory: client.Crew().list({}) / client.Crew().load({"id": ...})."""
        from entity.crew_entity import CrewEntity
        return CrewEntity(self, data)


    def Landpad(self, data=None) -> "LandpadEntity":
        """Entity factory: client.Landpad().list({}) / client.Landpad().load({"id": ...})."""
        from entity.landpad_entity import LandpadEntity
        return LandpadEntity(self, data)


    def Launch(self, data=None) -> "LaunchEntity":
        """Entity factory: client.Launch().list({}) / client.Launch().load({"id": ...})."""
        from entity.launch_entity import LaunchEntity
        return LaunchEntity(self, data)


    def Launchpad(self, data=None) -> "LaunchpadEntity":
        """Entity factory: client.Launchpad().list({}) / client.Launchpad().load({"id": ...})."""
        from entity.launchpad_entity import LaunchpadEntity
        return LaunchpadEntity(self, data)


    def Payload(self, data=None) -> "PayloadEntity":
        """Entity factory: client.Payload().list({}) / client.Payload().load({"id": ...})."""
        from entity.payload_entity import PayloadEntity
        return PayloadEntity(self, data)


    def Roadster(self, data=None) -> "RoadsterEntity":
        """Entity factory: client.Roadster().list({}) / client.Roadster().load({"id": ...})."""
        from entity.roadster_entity import RoadsterEntity
        return RoadsterEntity(self, data)


    def Rocket(self, data=None) -> "RocketEntity":
        """Entity factory: client.Rocket().list({}) / client.Rocket().load({"id": ...})."""
        from entity.rocket_entity import RocketEntity
        return RocketEntity(self, data)


    def Ship(self, data=None) -> "ShipEntity":
        """Entity factory: client.Ship().list({}) / client.Ship().load({"id": ...})."""
        from entity.ship_entity import ShipEntity
        return ShipEntity(self, data)


    def Starlink(self, data=None) -> "StarlinkEntity":
        """Entity factory: client.Starlink().list({}) / client.Starlink().load({"id": ...})."""
        from entity.starlink_entity import StarlinkEntity
        return StarlinkEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "SpacexRestSDK":
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


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.capsule_entity import CapsuleEntity
    from entity.core_entity import CoreEntity
    from entity.crew_entity import CrewEntity
    from entity.landpad_entity import LandpadEntity
    from entity.launch_entity import LaunchEntity
    from entity.launchpad_entity import LaunchpadEntity
    from entity.payload_entity import PayloadEntity
    from entity.roadster_entity import RoadsterEntity
    from entity.rocket_entity import RocketEntity
    from entity.ship_entity import ShipEntity
    from entity.starlink_entity import StarlinkEntity
