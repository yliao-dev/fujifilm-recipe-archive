import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { renderError } from "./ErrorPage";
import useUpdateItem from "../hooks/useUpdateItem";
import useItem from "../hooks/useItem";
import { RecipePayload } from "../types/recipeTypes";
import { normalizeArrayField } from "../utils/dataUtils";
import useUploadImage from "../hooks/useUploadImage";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [, setIsFormSubmitting] = useState(false);

  if (isFetching) {
    return <LoadingSpinner message="Loading recipe..." />;
  }

  if (!recipeData) return renderError(404, "Recipe not found.");
  if (fetchError) return renderError(500, fetchError.message);

  const handleSubmit = async (
    formData: RecipePayload & { sampleFile?: File; isImageChanged?: boolean }
  ) => {
    try {
      setIsFormSubmitting(true); // Set form submitting state

      const payload: RecipePayload = {
        name: formData.name,
        film_simulation: formData.film_simulation,
        camera_models: normalizeArrayField(formData.camera_models),
        tags: normalizeArrayField(formData.tags),
        creator: formData.creator,
        notes: formData.notes,
        settings: formData.settings,
        sample_image_url: formData.sample_image_url,
      };

      // Wait for the recipe update mutation to complete
      const updatedRecipe = await updateItemMutation.mutateAsync(payload);

      // If the image has changed, wait for the image upload mutation to complete
      if (formData.isImageChanged && formData.sampleFile) {
        setIsImageUploading(true); // Set loading state for image upload
        await uploadImageMutation.mutateAsync({
          recipeId: updatedRecipe.item._id,
          file: formData.sampleFile as File,
        });
        setIsImageUploading(false); // Reset after upload
      }

      // Only navigate after the update and image upload (if any) are complete
      navigate(`/recipes/${id}`);
    } catch (err: any) {
      renderError(500, err.message);
      setIsFormSubmitting(false); // Reset form submitting state
      setIsImageUploading(false); // Ensure spinner is removed in case of error
    }
  };

  return (
    <div className="recipeCreate__page">
      <h1>Edit Film Recipe</h1>
      <hr className="recipeList__divider" />

      {isImageUploading && <LoadingSpinner message="Uploading image..." />}

      <RecipeForm
        mode="edit"
        initialData={recipeData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RecipeEditPage;
