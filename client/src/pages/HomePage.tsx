import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";
import FilmStripNav from "../components/FilmStripNav";

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
        <input
          type="text"
          className="home__search"
          placeholder="Search film simulation recipes..."
        />
      </section>

      <section className="home__card-grid">
        <RecipeCards recipeData={RecipeData.slice(0, 3)} />
      </section>

      <FilmStripNav />
    </div>
  );
};

export default HomePage;
