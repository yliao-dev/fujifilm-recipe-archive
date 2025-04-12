import { Link } from "react-router-dom";
import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";

const HomePage = () => {
  return (
    <div className="home">
      <section className="home-intro">
        <h1>
          Explore Custom{" "}
          <span>
            FUJ<span className="highlight-i">I</span>FILM
          </span>{" "}
          Film Simulation Recipes
        </h1>
        <input
          type="text"
          className="home-search"
          placeholder="Search film simulation recipes..."
        />
      </section>

      <section className="card-grid">
        <RecipeCards recipeData={RecipeData.slice(0, 3)} />
      </section>

      <Link to="/recipes" className="home-link">
        View All Recipes →
      </Link>
    </div>
  );
};

export default HomePage;
