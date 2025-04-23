export type RecipeListProps = {
  recipeData: Recipe[];
};

export type Recipe = RecipePayload & {
  _id: string;
  sample_image_url: string;
  created_at: string;
};

export type RecipePayload = {
  name: string;
  film_simulation: string;
  camera_models: string[];
  tags?: string[];
  creator?: string;
  notes?: string;
  settings: RecipeSettings;
  sampleFile?: File | null;
};

export type RecipeSettings = {
  grain_effect?: string;
  color_chrome_effect?: string;
  color_chrome_fx_blue?: string;
  white_balance?: string;
  dynamic_range?: string;
  highlight?: string;
  shadow?: string;
  color?: string;
  sharpness?: string;
  noise_reduction?: string;
  clarity?: string;
  iso?: string;
  exposure_compensation?: string;
};
