package types

type Recipe struct {
    ID             string    `bson:"_id,omitempty" json:"_id"`
    Name           string    `bson:"name" json:"name"`
    CameraModels   []string  `bson:"camera_models" json:"camera_models"`
    FilmSimulation string    `bson:"film_simulation" json:"film_simulation"`
    Creator        string    `bson:"creator" json:"creator"`
    Tags           []string  `bson:"tags" json:"tags"`
    Notes          string    `bson:"notes" json:"notes"`
    CreatedAt      string    `bson:"created_at" json:"created_at"`
    Settings       Settings  `bson:"settings" json:"settings"`
    SampleImageURL string    `bson:"sample_image_url" json:"sample_image_url"` // Only store the image URL

}

type Settings struct {
    GrainEffect          string `bson:"grain_effect" json:"grain_effect"`
    ColorChromeEffect    string `bson:"color_chrome_effect" json:"color_chrome_effect"`
    ColorChromeFxBlue    string `bson:"color_chrome_fx_blue" json:"color_chrome_fx_blue"`
    WhiteBalance         string `bson:"white_balance" json:"white_balance"`
    DynamicRange         string `bson:"dynamic_range" json:"dynamic_range"`
    Highlight            string `bson:"highlight" json:"highlight"`
    Shadow               string `bson:"shadow" json:"shadow"`
    Color                string `bson:"color" json:"color"`
    Sharpness            string `bson:"sharpness" json:"sharpness"`
    NoiseReduction       string `bson:"noise_reduction" json:"noise_reduction"`
    Clarity              string `bson:"clarity" json:"clarity"`
    ISO                  string `bson:"iso" json:"iso"`
    ExposureCompensation string `bson:"exposure_compensation" json:"exposure_compensation"`
}