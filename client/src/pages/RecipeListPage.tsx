import { useEffect, useState } from "react";
import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";
import { toast } from "react-toastify";

const RecipeListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const totalPages = Math.ceil(RecipeData.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentRecipes = RecipeData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (sessionStorage.getItem("recipeSuccess")) {
      // toast.success("Recipe added successfully!");
      // sessionStorage.removeItem("recipeSuccess");
    }
  }, []);

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
        <RecipeCards recipeData={currentRecipes} />
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
