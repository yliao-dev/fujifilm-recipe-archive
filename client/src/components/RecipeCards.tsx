import RecipeItem from "./RecipeCard";
import { RecipeCardProps } from "../types/recipeTypes";

const RecipeCards = ({ recipeData }: RecipeCardProps) => {
  return (
    <>
      {recipeData.map((recipe) => (
        <RecipeItem
          key={recipe._id.$oid}
          _id={recipe._id}
          name={recipe.name}
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

export default RecipeCards;
