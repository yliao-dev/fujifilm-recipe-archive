export type RecipeItemProps = {
  _id: {
    $oid: string;
  };
  name: string;
  cameraModels: string[];
  filmSimulation: string;
  settings: {
    highlight: number;
    shadow: number;
    color: number;
    grainEffect: string;
    wbShift: string;
    dr: string;
    iso: string | number;
    noiseReduction: number;
  };
  tags: string[];
  sampleImageUrl: string;
  creator: string;
  notes: string;
  createdAt: {
    $date: string;
  };
};

export type RecipeCardProps = {
  recipeData: RecipeItemProps[];
};
