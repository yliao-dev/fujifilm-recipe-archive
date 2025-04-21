import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { renderError } from "./ErrorPage";
import useUpdateItem from "../hooks/useUpdateItem";

const RecipeEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) return renderError(400, "Missing recipe ID in URL.");
  const { data: recipeData, error } = useUpdateItem();

  if (error) return renderError(500, error.message);
  if (!recipeData) return renderError(404, "Recipe not found.");

  const handleSubmit = (updatedData: any) => {
    // Update logic here
    navigate(`/recipes/${updatedData._id}`);
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
