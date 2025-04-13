import { useNavigate } from "react-router-dom";
import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({
  _id,
  name,
  sampleImageUrl,
  filmSimulation,
  cameraModels,
  tags,
}: RecipeItemProps) {
  const navigate = useNavigate();
  const id = _id.$oid;

  return (
    <div className="recipeCard" onClick={() => navigate(`/recipes/${id}`)}>
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
