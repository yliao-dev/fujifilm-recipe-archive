import RecipeItem from "./RecipeItem";
import { RecipeListProps } from "../types/recipeTypes";

const RecipeItems = ({ recipeData }: RecipeListProps) => {
  return (
    <>
      {recipeData.map((recipe) => (
        <RecipeItem
          key={recipe._id.$oid}
          _id={recipe._id}
          name={recipe.name}
          film_simulation={recipe.film_simulation}
          camera_models={recipe.camera_models}
          settings={recipe.settings}
          tags={recipe.tags}
          sample_image_url={recipe.sample_image_url}
          creator={recipe.creator}
          notes={recipe.notes}
          created_at={recipe.created_at}
        />
      ))}
    </>
  );
};

export default RecipeItems;
