import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";

const RecipesPage = () => {
  return (
    <>
      <div className="recipes__page">
        <section className="card-grid">
          <RecipeCards recipeData={RecipeData} />
        </section>
      </div>
    </>
  );
};

export default RecipesPage;
