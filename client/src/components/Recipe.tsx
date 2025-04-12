import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({
  name,
  sampleImageUrl,
  filmSimulation,
  cameraModels,
  tags,
}: RecipeItemProps) {
  return (
    <div className="card">
      <img src={sampleImageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{`${filmSimulation} - ${tags[0]}`}</p>
      <p>{cameraModels.join(" . ")}</p>{" "}
    </div>
  );
}

export default RecipeItem;
