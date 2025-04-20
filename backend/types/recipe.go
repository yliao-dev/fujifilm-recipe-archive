package types



type Recipe struct {
	ID             string    `json:"_id"`
	Name           string    `json:"name"`
	CameraModels   []string  `json:"camera_models"`
	FilmSimulation string    `json:"film_simulation"`
	Creator        string    `json:"creator"`
	Tags           []string  `json:"tags"`
	Notes          string    `json:"notes"`
	SampleImageURL string    `json:"sample_image_url"`
	CreatedAt      string    `json:"created_at"`
	Settings       Settings  `json:"settings"`
}


type Settings struct {
	GrainEffect            string `json:"grain_effect"`
	ColorChromeEffect      string `json:"color_chrome_effect"`
	ColorChromeFxBlue      string `json:"color_chrome_fx_blue"`
	WhiteBalance           string `json:"white_balance"`
	DynamicRange           string `json:"dynamic_range"`
	Highlight              string `json:"highlight"`
	Shadow                 string `json:"shadow"`
	Color                  string `json:"color"`
	Sharpness              string `json:"sharpness"`
	NoiseReduction         string `json:"noise_reduction"`
	Clarity                string `json:"clarity"`
	ISO                    string `json:"iso"`
	ExposureCompensation   string `json:"exposure_compensation"`
}