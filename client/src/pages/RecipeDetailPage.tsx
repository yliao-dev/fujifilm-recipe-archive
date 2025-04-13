import { Link, useParams } from "react-router-dom";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((p) => p._id.$oid === id);
  const [copied, setCopied] = useState(false);

  if (!recipe) return <NotFoundPage />;

  // Destructure all fields except _id
  const { _id, ...rest } = recipe;

  const jsonString = JSON.stringify(rest, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <h1>{recipe.name}</h1>

        <Link to="/recipes" className="nav_button">
          Back
        </Link>
      </section>
      <section className="copy-container">
        <pre className="copy-box">
          <code>{jsonString}</code>
        </pre>
        <button className="copy-button" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
