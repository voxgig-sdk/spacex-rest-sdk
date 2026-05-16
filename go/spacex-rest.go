package voxgigspacexrestsdk

import (
	"github.com/voxgig-sdk/spacex-rest-sdk/core"
	"github.com/voxgig-sdk/spacex-rest-sdk/entity"
	"github.com/voxgig-sdk/spacex-rest-sdk/feature"
	_ "github.com/voxgig-sdk/spacex-rest-sdk/utility"
)

// Type aliases preserve external API.
type SpacexRestSDK = core.SpacexRestSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SpacexRestEntity = core.SpacexRestEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SpacexRestError = core.SpacexRestError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCapsuleEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewCapsuleEntity(client, entopts)
	}
	core.NewCoreEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewCoreEntity(client, entopts)
	}
	core.NewCrewEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewCrewEntity(client, entopts)
	}
	core.NewLandpadEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewLandpadEntity(client, entopts)
	}
	core.NewLaunchEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewLaunchEntity(client, entopts)
	}
	core.NewLaunchpadEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewLaunchpadEntity(client, entopts)
	}
	core.NewPayloadEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewPayloadEntity(client, entopts)
	}
	core.NewRoadsterEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewRoadsterEntity(client, entopts)
	}
	core.NewRocketEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewRocketEntity(client, entopts)
	}
	core.NewShipEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewShipEntity(client, entopts)
	}
	core.NewStarlinkEntityFunc = func(client *core.SpacexRestSDK, entopts map[string]any) core.SpacexRestEntity {
		return entity.NewStarlinkEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSpacexRestSDK = core.NewSpacexRestSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
