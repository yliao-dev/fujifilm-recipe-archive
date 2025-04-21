import RecipeItems from "../components/RecipeItems";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useItems from "../hooks/useItems";
import { renderError } from "./ErrorPage";

const HomePage = () => {
  const { data: recipesData, error, isLoading } = useItems();
  if (isLoading) return null;

  if (!recipesData) return renderError(404, "Recipe not found.");

  if (error) return <p>Error: {error.message}</p>;

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
        <SearchBar />
      </section>

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
