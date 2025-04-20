export type RecipeListProps = {
  recipeData: Recipe[];
};

export type NewRecipe = RecipeCore;

export type Recipe = RecipeCore & {
  _id: {
    $oid: string;
  };
  sample_image_url: string;
  created_at: {
    $date: string;
  };
};

export type RecipeCore = {
  name: string;
  film_simulation: string;
  camera_models: string[];
  tags: string[];
  creator: string;
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
  clarity: string;
  noise_reduction: string;
  iso: string;
  exposure_compensation: string;
};
