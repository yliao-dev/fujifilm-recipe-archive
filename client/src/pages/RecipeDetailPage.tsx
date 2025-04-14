import { useParams } from "react-router-dom";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";

const formatKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/iso/gi, "ISO")
    .replace(/fx/gi, "FX")
    .replace(/dr/gi, "DR")
    .replace(/wb/gi, "WB")
    .replace(/nr/gi, "NR")
    .replace(/\b\w/g, (m) => m.toUpperCase());
};

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((p) => p._id.$oid === id);

  if (!recipe) return <NotFoundPage />;

  const { name, camera_models, settings, creator, sample_image_url } = recipe;

  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <img
          src={sample_image_url}
          alt={name}
          className="recipeDetail__image"
        />
        <h1>{name}</h1>
        <p>
          <strong>Film Simulation:</strong> {settings.film_simulation} <br />
          <strong>Camera Models:</strong> {camera_models.join(" · ")} <br />
          <strong>Creator:</strong> {creator}
        </p>
      </section>

      <section className="recipeDetail__body">
        {Object.entries(settings).map(([key, value]) => (
          <p key={key}>
            <strong>{formatKey(key)}:</strong> {value}
          </p>
        ))}
      </section>
    </div>
  );
};

export default RecipeDetailPage;
