export type RecipeSettings = {
  film_simulation: string;
  grain_effect: string;
  color_chrome_effect: string;
  color_chrome_fx_blue: string;
  white_balance: string;
  dynamic_range: string;
  highlight: number;
  shadow: number;
  color: number;
  sharpness: number;
  high_iso_nr: number;
  clarity: number;
  iso: string;
  exposure_compensation: string;
  noise_reduction: number;
};

export type RecipeItemProps = {
  _id: {
    $oid: string;
  };
  name: string;
  camera_models: string[];
  tags: string[];
  sample_image_url: string;
  creator: string;
  notes: string;
  created_at: {
    $date: string;
  };
  settings: RecipeSettings;
};

export type RecipeCardProps = {
  recipeData: RecipeItemProps[];
};

export type RecipeFormData = {
  name: string;
  creator: string;
  camera_models: string[];
  tags: string[];
  notes: string;
  settings: RecipeSettings;
};
