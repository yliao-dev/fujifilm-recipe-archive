import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { renderError } from "./ErrorPage";
import useUpdateItem from "../hooks/useUpdateItem";
import useItem from "../hooks/useItem";

const RecipeEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) return renderError(400, "Missing recipe ID in URL.");
  const { data: recipeData, error } = useItem(id);

  if (error) return renderError(500, error.message);
  if (!recipeData) return renderError(404, "Recipe not found.");

  const handleSubmit = () => {
    // Update logic here
    const { data: recipeData, error } = useUpdateItem();

    if (error) return renderError(500, error.message);
    if (!recipeData) return renderError(404, "Recipe not found.");

    navigate(`/recipes/${id}`);
  };

  return (
    <div className="recipeCreate__page">
      <h1>Edit Film Recipe</h1>
      <hr className="recipeList__divider" />
      <RecipeForm
        mode="edit"
        initialData={recipeData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RecipeEditPage;
