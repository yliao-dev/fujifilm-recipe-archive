import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({
  name,
  sampleImageUrl,
  filmSimulation,
  cameraModels,
  tags,
}: RecipeItemProps) {
  return (
    <div className="recipeCard">
      <img src={sampleImageUrl} alt={name} />
      <div className="recipeCard-text">
        <h2>{name}</h2>
        <p>{`${filmSimulation} - ${tags[0]}`}</p>
        <p>{cameraModels.join(" . ")}</p>
      </div>
    </div>
  );
}

export default RecipeItem;
