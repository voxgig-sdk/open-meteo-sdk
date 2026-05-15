package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewHistoricalEntityFunc func(client *OpenMeteoSDK, entopts map[string]any) OpenMeteoEntity

var NewMarineEntityFunc func(client *OpenMeteoSDK, entopts map[string]any) OpenMeteoEntity

var NewWeatherForecastEntityFunc func(client *OpenMeteoSDK, entopts map[string]any) OpenMeteoEntity

