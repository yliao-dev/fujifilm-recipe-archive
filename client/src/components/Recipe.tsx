import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({ name, sampleImageUrl, notes }: RecipeItemProps) {
  return (
    <div className="card">
      <img src={sampleImageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{notes}</p>
    </div>
  );
}

export default RecipeItem;
