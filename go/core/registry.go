package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCapsuleEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewCoreEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewCrewEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewLandpadEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewLaunchEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewLaunchpadEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewPayloadEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewRoadsterEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewRocketEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewShipEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

var NewStarlinkEntityFunc func(client *SpacexRestSDK, entopts map[string]any) SpacexRestEntity

