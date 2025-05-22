import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import useCreateItemText from "../hooks/useCreateItem";
import { normalizeArrayField } from "../utils/dataUtils";
import { renderError } from "./ErrorPage";
import { RecipePayload } from "../types/recipeTypes";
import { getPlaceholderImage } from "../utils/imageUtils";
import {
  useUpdateRecipeImage,
  uploadToCloudinary,
} from "../hooks/uploadToCloudinary";

const RecipeCreatePage = () => {
  const navigate = useNavigate();
  const createRecipeMutation = useCreateItemText();
  const updateRecipeImageMutation = useUpdateRecipeImage();

  const handleSubmit = async (formData: RecipePayload) => {
    try {
      // Prepare the text payload (excluding image)
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

      // 1. Submit JSON data
      const recipe = await createRecipeMutation.mutateAsync(payload);
      // 2. If sample image exists, upload it using returned recipe ID
      const fileToUpload = formData.sampleFile || (await getPlaceholderImage());
      if (fileToUpload) {
        const imageUrl = await uploadToCloudinary(fileToUpload);
        // 3. Update backend with Cloudinary image URL
        await updateRecipeImageMutation.mutateAsync({
          recipeId: recipe.item._id,
          imageUrl,
        });
      }
      // 4. Navigate to list
      navigate("/recipes");
    } catch (err: any) {
      renderError(500, err.message);
    }
  };

  return (
    <div className="recipeCreate__page">
      <h1>Add Your Custom Film Recipe</h1>
      <hr className="recipeList__divider" />
      <RecipeForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default RecipeCreatePage;
