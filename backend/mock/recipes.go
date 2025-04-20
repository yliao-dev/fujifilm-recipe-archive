package mock

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Recipe struct {
	ID             string   		  `json:"_id"`
	Name           string             `json:"name"`
	CameraModels   []string           `json:"camera_models"`
	FilmSimulation string             `json:"film_simulation"`
	Creator        string             `json:"creator"`
	Tags           []string           `json:"tags"`
	Notes          string             `json:"notes"`
	SampleImageURL string             `json:"sample_image_url"`
	Settings       Settings           `json:"settings"`
}

type Settings struct {
	Color             string `json:"color"`
	Contrast          string `json:"contrast"`
	Highlight         string `json:"highlight"`
	Shadow            string `json:"shadow"`
	Sharpness         string `json:"sharpness"`
	Clarity           string `json:"clarity"`
	GrainEffect       string `json:"grain_effect"`
	ColorChromeEffect string `json:"color_chrome_effect"`
}


var Recipes = []Recipe{
	{
		ID:             primitive.NewObjectID().Hex(), // Convert ObjectID to string using Hex()
		Name:           "Classic Chrome Street",
		CameraModels:   []string{"X-T3", "X100V"},
		FilmSimulation: "Classic Chrome",
		Creator:        "Alice",
		Tags:           []string{"street", "contrast", "daylight"},
		Notes:          "Great for high contrast scenes with shadows.",
		SampleImageURL: "/images/placeholder.webp",
		Settings: Settings{
			Color:             "+1",
			Contrast:          "0",
			Highlight:         "-1",
			Shadow:            "+2",
			Sharpness:         "0",
			Clarity:           "+1",
			GrainEffect:       "Strong",
			ColorChromeEffect: "Weak",
		},
	},
	{
		ID:             primitive.NewObjectID().Hex(), // Convert ObjectID to string using Hex()
		Name:           "Vintage Kodachrome",
		CameraModels:   []string{"X-Pro3"},
		FilmSimulation: "Kodachrome",
		Creator:        "Bob",
		Tags:           []string{"vintage", "warm"},
		Notes:          "Inspired by classic Kodachrome film.",
		SampleImageURL: "/images/placeholder.webp",
		Settings: Settings{
			Color:             "+2",
			Contrast:          "+1",
			Highlight:         "0",
			Shadow:            "0",
			Sharpness:         "-1",
			Clarity:           "0",
			GrainEffect:       "Weak",
			ColorChromeEffect: "Strong",
		},
	},
}