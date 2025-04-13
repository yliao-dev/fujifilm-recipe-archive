import { useParams, Link } from "react-router-dom";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((p) => p._id.$oid === id);

  if (!recipe) return <NotFoundPage />;

  const { name, cameraModels, filmSimulation, settings, creator } = recipe;

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
          <strong>Film Simulation:</strong> {filmSimulation}
        </h2>
        <h2>
          <strong>Camera Models:</strong> {cameraModels.join(" | ")}
        </h2>
        <h2>
          <strong>Settings:</strong>
        </h2>
        <ul>
          {Object.entries(settings).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>

        <h2>
          <strong>Creator:</strong> {creator}
        </h2>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
