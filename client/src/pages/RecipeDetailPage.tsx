import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { formatKey } from "../utils/formatKey";
import { Edit, DeleteForever } from "@mui/icons-material";
import useItem from "../hooks/useItem";
import { BASE_URL } from "../config";

const RecipeDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  if (!id) {
    return <NotFoundPage />;
  }
  console.log(id);
  const { data: RecipeData, error } = useItem(id);

  if (!RecipeData) return <NotFoundPage />;

  const {
    name,
    camera_models,
    film_simulation,
    settings,
    creator,
    sample_image_url,
  } = RecipeData;

  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <img src={`${BASE_URL}${sample_image_url}`} alt={name} />{" "}
        <div className="recipeDetail__intro__content">
          <div>
            <h1>{name}</h1>
            <p>
              <strong>Film Simulation:</strong> {film_simulation} <br />
              <strong>Camera Models:</strong> {camera_models.join(" · ")} <br />
              <strong>Creator:</strong> {creator}
            </p>
          </div>
          <div className="recipeDetail__modify">
            <Edit
              onClick={() => navigate(`/edit-recipe/${RecipeData._id}`)}
              style={{ cursor: "pointer" }}
            />
            <DeleteForever style={{ cursor: "pointer" }} />
          </div>
        </div>
      </section>

      <section className="recipeDetail__body">
        {Object.entries(settings).map(([key, value]) => (
          <p key={key}>
            <strong>{formatKey(key)}</strong> {value}
          </p>
        ))}
      </section>
    </div>
  );
};

export default RecipeDetailPage;
