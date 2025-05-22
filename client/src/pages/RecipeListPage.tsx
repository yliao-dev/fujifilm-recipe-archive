import { useState } from "react";
import RecipeItems from "../components/RecipeItems";
import useItems from "../hooks/useItems";
import { renderError } from "./ErrorPage";

const RecipeListPage = () => {
  const { data: recipesData, error, isLoading } = useItems();
  const [currentPage, setCurrentPage] = useState(1);
  if (isLoading) return null;
  if (error) return renderError(500, error.message);
  if (!recipesData) return renderError(404, "Recipe not found.");

  const cardsPerPage = 12;
  const totalPages = Math.ceil(recipesData.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentRecipes = recipesData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="recipeList__page">
      <div className="recipeList__intro">
        <h1>Browse All Film Simulation Recipes</h1>
        <p>
          Explore custom Fujifilm film simulations curated for every look, feel,
          and camera.
        </p>
      </div>
      <hr className="recipeList__divider" />

      <section className="recipeList__card-grid">
        <RecipeItems recipeData={currentRecipes} />
      </section>

      <section className="pagination">
        <div>
          <button
            onClick={handlePrev}
            className={currentPage === 1 ? "hidden-button" : ""}
          >
            ← Prev
          </button>
        </div>

        <div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div>
          <button
            onClick={handleNext}
            className={currentPage === totalPages ? "hidden-button" : ""}
          >
            Next →
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecipeListPage;
