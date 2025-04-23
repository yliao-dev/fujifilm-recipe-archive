import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import useCreateItem from "../hooks/useCreateItem";
import { buildFormData, normalizeArrayField } from "../utils/dataUtils";
import { renderError } from "./ErrorPage";
import { RecipeFormInput } from "../types/recipeTypes";

const RecipeCreatePage = () => {
  const navigate = useNavigate();
  const createItemMutation = useCreateItem();
  const handleSubmit = async (formData: RecipeFormInput) => {
    const normalizedData: RecipeFormInput = {
      ...formData,
      camera_models: normalizeArrayField(formData.camera_models),
      tags: normalizeArrayField(formData.tags),
    };

    const formPayload = await buildFormData(normalizedData, {
      sampleFile: "sample_image", // rename field here only
    });

    // Now call the mutation function with the formatted data
    createItemMutation.mutate(formPayload, {
      onSuccess: () => navigate("/recipes"),
      onError: (err) => renderError(500, err.message),
    });
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
