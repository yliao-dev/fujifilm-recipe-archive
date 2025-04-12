import RecipeItem from "./Recipe";
import { RecipeCardProps } from "../types/recipeTypes";

const RecipeCards = ({ recipeData }: RecipeCardProps) => {
  return (
    <>
      {recipeData.map((recipe) => (
        <RecipeItem
          key={recipe._id.$oid}
          _id={recipe._id}
          name={recipe.name}
          cameraModels={recipe.cameraModels}
          filmSimulation={recipe.filmSimulation}
          settings={recipe.settings}
          tags={recipe.tags}
          sampleImageUrl={recipe.sampleImageUrl}
          creator={recipe.creator}
          notes={recipe.notes}
          createdAt={recipe.createdAt}
        />
      ))}
    </>
  );
};

export default RecipeCards;
