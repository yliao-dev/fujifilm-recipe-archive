package mock

import (
	"backend/types"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


var Recipes = []types.Recipe{
	{
		ID:             primitive.NewObjectID().Hex(), // Convert ObjectID to string using Hex()
		Name:           "Nostalgic Warmth",
		CameraModels:   []string{"X-T4", "X100V"},
		FilmSimulation: "Nostalgic Neg",
		Creator:        "VisionLab",
		Tags:           []string{"cinematic", "soft", "portrait"},
		Notes:          "Low contrast tones for a cinematic mood.",
		SampleImageURL: "/images/placeholder.webp",
		CreatedAt:      "2024-09-10T07:20:00Z",
		Settings: types.Settings{
			GrainEffect:          "Weak, Small",
			ColorChromeEffect:    "Strong",
			ColorChromeFxBlue:    "Strong",
			WhiteBalance:         "3000K, +8 Red & -9 Blue",
			DynamicRange:         "DR100",
			Highlight:            "-2",
			Shadow:               "-1",
			Color:                "+2",
			Sharpness:            "-2",
			NoiseReduction:       "-3",
			Clarity:              "-2",
			ISO:                  "Auto, up to ISO 6400",
			ExposureCompensation: "0 to +2/3 (typically)",
		},
	},
	{
		ID:             primitive.NewObjectID().Hex(), // Convert ObjectID to string using Hex()
		CameraModels:   []string{"X-T3", "X-Pro3"},
		FilmSimulation: "Classic Chrome",
		Creator:        "UrbanShooter",
		Tags:           []string{"street", "urban", "contrast"},
		Notes:          "Balanced tones for dynamic street photography.",
		SampleImageURL: "/images/placeholder.webp",
		CreatedAt:      "2024-08-15T10:30:00Z",
		Settings: types.Settings{
			GrainEffect:          "Strong, Large",
			ColorChromeEffect:    "Weak",
			ColorChromeFxBlue:    "Off",
			WhiteBalance:         "Auto, +2 Red & -2 Blue",
			DynamicRange:         "DR200",
			Highlight:            "-1",
			Shadow:               "0",
			Color:                "+1",
			Sharpness:            "0",
			NoiseReduction:       "-2",
			Clarity:              "0",
			ISO:                  "Auto, up to ISO 3200",
			ExposureCompensation: "0",
		},
	},
}