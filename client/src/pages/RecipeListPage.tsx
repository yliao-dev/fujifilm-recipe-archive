import RecipeCards from "../components/RecipeCards";
import { RecipeData } from "../data/data";

const RecipeListPage = () => {
  return (
    <>
      <div className="recipeList">
        <section className="recipeList__card-grid">
          <RecipeCards recipeData={RecipeData} />
        </section>
      </div>
    </>
  );
};

export default RecipeListPage;
