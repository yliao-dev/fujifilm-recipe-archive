package types



type Recipe struct {
    ID             string    `bson:"_id,omitempty" json:"_id" form:"_id"`
    Name           string    `bson:"name" json:"name" form:"name"`
    CameraModels   []string  `bson:"camera_models" json:"camera_models" form:"camera_models"`
    FilmSimulation string    `bson:"film_simulation" json:"film_simulation" form:"film_simulation"`
    Creator        string    `bson:"creator" json:"creator" form:"creator"`
    Tags           []string  `bson:"tags" json:"tags" form:"tags"`
    Notes          string    `bson:"notes" json:"notes" form:"notes"`
    SampleImageURL string    `bson:"sample_image_url" json:"sample_image_url" form:"sample_image_url"`
    CreatedAt      string    `bson:"created_at" json:"created_at" form:"created_at"`
    Settings       Settings  `bson:"settings" json:"settings" form:"settings"`
}

type Settings struct {
    GrainEffect          string `bson:"grain_effect" json:"grain_effect" form:"grain_effect"`
    ColorChromeEffect    string `bson:"color_chrome_effect" json:"color_chrome_effect" form:"color_chrome_effect"`
    ColorChromeFxBlue    string `bson:"color_chrome_fx_blue" json:"color_chrome_fx_blue" form:"color_chrome_fx_blue"`
    WhiteBalance         string `bson:"white_balance" json:"white_balance" form:"white_balance"`
    DynamicRange         string `bson:"dynamic_range" json:"dynamic_range" form:"dynamic_range"`
    Highlight            string `bson:"highlight" json:"highlight" form:"highlight"`
    Shadow               string `bson:"shadow" json:"shadow" form:"shadow"`
    Color                string `bson:"color" json:"color" form:"color"`
    Sharpness            string `bson:"sharpness" json:"sharpness" form:"sharpness"`
    NoiseReduction       string `bson:"noise_reduction" json:"noise_reduction" form:"noise_reduction"`
    Clarity              string `bson:"clarity" json:"clarity" form:"clarity"`
    ISO                  string `bson:"iso" json:"iso" form:"iso"`
    ExposureCompensation string `bson:"exposure_compensation" json:"exposure_compensation" form:"exposure_compensation"`
}