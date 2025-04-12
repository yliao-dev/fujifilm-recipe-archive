import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

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
          placeholder="Search recipes..."
        />
      </section>

      <section className="card-grid">
        <RecipeCard
          title="Kodachrome 64"
          image="./placeholder.webp"
          description="Classic Chrome · Moody · X-T30"
        />
        <RecipeCard
          title="Urban Chrome"
          image="./placeholder.webp"
          description="Classic Chrome · Street · X100V"
        />
        <RecipeCard
          title="CineSoft"
          image="./placeholder.webp"
          description="Pro Neg Hi · Soft · X-T4"
        />
      </section>

      <Link to="/recipes" className="home-link">
        View All Recipes →
      </Link>
    </div>
  );
};

export default HomePage;
