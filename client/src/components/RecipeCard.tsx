import { useNavigate } from "react-router-dom";
import { RecipeItemProps } from "../types/recipeTypes";

function RecipeItem({
  _id,
  name,
  sample_image_url,
  settings,
  camera_models,
  tags,
}: RecipeItemProps) {
  const navigate = useNavigate();
  const id = _id.$oid;

  return (
    <div className="recipeCard" onClick={() => navigate(`/recipes/${id}`)}>
      <img src={sample_image_url} alt={name} />
      <div className="recipeCard-text">
        <h2>{name}</h2>
        <p>{`${settings.film_simulation} - ${tags[0]}`}</p>
        <p>{camera_models.join(" . ")}</p>
      </div>
    </div>
  );
}

export default RecipeItem;
