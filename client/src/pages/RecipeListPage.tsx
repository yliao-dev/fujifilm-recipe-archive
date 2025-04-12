import { Link } from "react-router-dom";
import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";

const RecipeListPage = () => {
  return (
    <>
      <div className="recipeList">
        <section className="recipeList__card-grid">
          <RecipeCards recipeData={RecipeData} />
        </section>
        <Link to="/" className="home__link">
          Home Page
        </Link>
      </div>
    </>
  );
};

export default RecipeListPage;
