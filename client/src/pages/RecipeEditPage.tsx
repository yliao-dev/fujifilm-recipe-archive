import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { renderError } from "./ErrorPage";
import useUpdateItem from "../hooks/useUpdateItem";
import useItem from "../hooks/useItem";
import { EditRecipeData } from "../types/recipeTypes";
import { normalizeArrayField } from "../utils/dataUtils";

const RecipeEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return renderError(400, "Missing recipe ID in URL.");

  const {
    data: recipeData,
    error: fetchError,
    isLoading: isFetching,
  } = useItem(id);
  const { mutate: updateRecipe, error: updateError } = useUpdateItem(id);

  if (isFetching) return null;

  if (!recipeData) return renderError(404, "Recipe not found.");
  if (fetchError) return renderError(500, fetchError.message);
  if (updateError) return renderError(500, updateError.message);

  const handleSubmit = (formData: EditRecipeData) => {
    const normalizedData: EditRecipeData = {
      ...formData,
      camera_models: normalizeArrayField(formData.camera_models),
      tags: normalizeArrayField(formData.tags),
    };

    updateRecipe(
      { recipeData: normalizedData },
      {
        onSuccess: () => navigate(`/recipes/${id}`),
        onError: (err) => renderError(500, err.message),
      }
    );
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
