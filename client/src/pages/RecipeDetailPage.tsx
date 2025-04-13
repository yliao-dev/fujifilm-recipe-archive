import { useParams, Link } from "react-router-dom";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((p) => p._id.$oid === id);

  if (!recipe) return <NotFoundPage />;

  const { name, camera_models, settings, creator } = recipe;

  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <h1>{name}</h1>
        <Link to="/recipes" className="nav_button">
          Back
        </Link>
      </section>

      <section className="recipeDetail__body">
        <h2>
          Film Simulation:{settings.film_simulation}
          Camera Models: {camera_models.join(" . ")}
          Creator:{creator}
        </h2>

        <h2>Settings:</h2>

        <ul>
          {Object.entries(settings).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
