import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({ name, sampleImageUrl, filmSimulation }: RecipeItemProps) {
  return (
    <div className="card">
      <img src={sampleImageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{filmSimulation}</p>
    </div>
  );
}

export default RecipeItem;
