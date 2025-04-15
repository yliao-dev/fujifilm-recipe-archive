import RecipeCards from "../components/RecipeCards";
import SearchBar from "../components/SearchBar";
import { RecipeData } from "../data/data";
import { Link } from "react-router-dom";

const HomePage = () => {
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
        <RecipeCards recipeData={RecipeData.slice(0, 3)} />
      </section>

      <Link to="/recipes" className="nav_button">
        View All Recipes →
      </Link>
    </div>
  );
};

export default HomePage;
