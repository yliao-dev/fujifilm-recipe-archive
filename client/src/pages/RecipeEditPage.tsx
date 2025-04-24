import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { renderError } from "./ErrorPage";
import useUpdateItem from "../hooks/useUpdateItem";
import useItem from "../hooks/useItem";
import { RecipePayload } from "../types/recipeTypes";
import { normalizeArrayField } from "../utils/dataUtils";
import useUploadImage from "../hooks/useUploadImage";

const RecipeEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return renderError(400, "Missing recipe ID in URL.");

  const {
    data: recipeData,
    error: fetchError,
    isLoading: isFetching,
  } = useItem(id);

  const updateItemMutation = useUpdateItem(id);
  const uploadImageMutation = useUploadImage();

  if (isFetching) return null;

  if (!recipeData) return renderError(404, "Recipe not found.");
  if (fetchError) return renderError(500, fetchError.message);

  const handleSubmit = async (
    formData: RecipePayload & { sampleFile?: File; isImageChanged?: boolean }
  ) => {
    try {
      const payload: RecipePayload = {
        name: formData.name,
        film_simulation: formData.film_simulation,
        camera_models: normalizeArrayField(formData.camera_models),
        tags: normalizeArrayField(formData.tags),
        creator: formData.creator,
        notes: formData.notes,
        settings: formData.settings,
      };

      const recipe = await updateItemMutation.mutateAsync(payload);

      // ⛔ Only upload if the user actually changed the image
      if (formData.isImageChanged && formData.sampleFile) {
        await uploadImageMutation.mutateAsync({
          recipeId: recipe.item._id,
          file: formData.sampleFile,
        });
      }

      navigate(`/recipes/${id}`);
    } catch (err: any) {
      renderError(500, err.message);
    }
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
