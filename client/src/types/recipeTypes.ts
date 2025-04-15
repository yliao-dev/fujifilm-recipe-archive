export type RecipeCardProps = {
  recipeData: RecipeItemProps[];
};

export type RecipeItemProps = {
  _id: {
    $oid: string;
  };
  name: string;
  camera_models: string[];
  film_simulation: string;
  creator: string;
  tags: string[];
  notes: string;
  sample_image_url: string;
  created_at: {
    $date: string;
  };
  settings: RecipeSettings;
};

export type RecipeFormData = {
  name: string;
  camera_models: string[];
  film_simulation: string;
  creator: string;
  tags: string[];
  notes: string;
  settings: RecipeSettings;
};

export type RecipeSettings = {
  grain_effect: string;
  color_chrome_effect: string;
  color_chrome_fx_blue: string;
  white_balance: string;
  dynamic_range: string;
  highlight: string;
  shadow: string;
  color: string;
  sharpness: string;
  high_iso_nr: string;
  clarity: string;
  iso: string;
  exposure_compensation: string;
  noise_reduction: string;
};
