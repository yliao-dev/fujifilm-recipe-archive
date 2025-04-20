import RecipeItem from "./RecipeItem";
import { RecipeListProps } from "../types/recipeTypes";

const RecipeItems = ({ recipeData }: RecipeListProps) => {
  return (
    <>
      {recipeData.map((recipe) => {
        console.log("ecipe._id.$oid", recipe._id);
        return <RecipeItem key={recipe._id} {...recipe} />;
      })}
    </>
  );
};

export default RecipeItems;
