import { Recipe } from "./recipeTypes";

export type RecipeResponse = {
  message: string;
  item: Recipe;
};

export type ApiError = {
  message: string;
};
