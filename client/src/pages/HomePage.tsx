import RecipeItems from "../components/RecipeItems";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useItems from "../hooks/useItems";
import { renderError } from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { filterRecipesByQuery } from "../utils/dataUtils";
import { Recipe } from "../types/recipeTypes";

const HomePage = () => {
  const { data: recipesData, error, isLoading: isFetching } = useItems();

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const handleSearch = (query: string) => {
    if (!recipesData) return;
    const filtered = filterRecipesByQuery(recipesData, query);
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (recipesData) setFilteredRecipes(recipesData);
  }, [recipesData]);

  if (isFetching) return <LoadingSpinner message="Loading recipe..." />;

  if (!recipesData) return renderError(404, "Recipe not found.");
  if (error) return renderError(500, error.message);

  return (
    <div className="home__page">
      <section className="home__intro">
        <h1>
          Explore Custom{" "}
          <span>
            FUJ<span className="highlight-i">I</span>FILM
          </span>{" "}
          Film Simulation Recipes
        </h1>
        <SearchBar onSearch={handleSearch} />
      </section>
      <section className="home__card-grid">
        <RecipeItems recipeData={filteredRecipes} />
      </section>
      <hr className="recipeList__divider" />
      <h2>Featured Recipes</h2>
      <section className="home__card-grid">
        <RecipeItems recipeData={recipesData.slice(0, 3)} />
      </section>

      <Link to="/recipes" className="nav_button">
        View All Recipes →
      </Link>
    </div>
  );
};

export default HomePage;
