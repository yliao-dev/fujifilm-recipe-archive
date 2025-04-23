import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/recipeTypes";
import { BASE_URL } from "../config";

function RecipeItem({
  _id,
  name,
  film_simulation,
  sample_image_url,
  camera_models,
  tags = [],
}: Recipe) {
  const navigate = useNavigate();
  return (
    <div className="recipeCard" onClick={() => navigate(`/recipes/${_id}`)}>
      <img src={`${BASE_URL}${sample_image_url}`} alt={name} />{" "}
      <div className="recipeCard-text">
        <h2>{name}</h2>
        <p>{`${film_simulation} - ${tags?.[0] || "misc"}`}</p>
        <p>{camera_models.join(" · ")}</p>
      </div>
    </div>
  );
}

export default RecipeItem;
