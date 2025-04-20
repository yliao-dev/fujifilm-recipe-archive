import RecipeItem from "./RecipeItem";
import { RecipeListProps } from "../types/recipeTypes";

const RecipeItems = ({ recipeData }: RecipeListProps) => {
  return (
    <>
      {recipeData.map((recipe) => {
        return <RecipeItem key={recipe._id} {...recipe} />;
      })}
    </>
  );
};

export default RecipeItems;
