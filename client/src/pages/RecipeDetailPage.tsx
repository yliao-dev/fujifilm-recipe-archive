import { useParams } from "react-router-dom";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";
import { formatKey } from "../utils/formatKey";
import { Edit, DeleteForever } from "@mui/icons-material";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((p) => p._id.$oid === id);

  if (!recipe) return <NotFoundPage />;

  const {
    name,
    camera_models,
    film_simulation,
    settings,
    creator,
    sample_image_url,
  } = recipe;

  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <img src={sample_image_url} alt={name} />
        <h1>{name}</h1>
        <p>
          <strong>Film Simulation:</strong> {film_simulation} <br />
          <strong>Camera Models:</strong> {camera_models.join(" · ")} <br />
          <strong>Creator:</strong> {creator}
        </p>
        <div className="recipeDetail__modify">
          <Edit />
          <DeleteForever />
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
