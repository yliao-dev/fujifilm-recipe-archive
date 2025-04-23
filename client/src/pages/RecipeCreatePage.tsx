import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import useCreateItem from "../hooks/useCreateItem";
import { buildFormData, normalizeArrayField } from "../utils/dataUtils";

const RecipeCreatePage = () => {
  const navigate = useNavigate();
  const createItemMutation = useCreateItem();
  const handleSubmit = (formData: any) => {
    const normalizedData = {
      ...formData,
      camera_models: normalizeArrayField(formData.camera_models),
      tags: normalizeArrayField(formData.tags),
    };

    const formPayload = buildFormData(normalizedData, {
      sampleFile: "sample_image", // rename field here only
    });

    // Now call the mutation function with the formatted data
    createItemMutation.mutate(formPayload, {
      onSuccess: () => {
        navigate("/recipes");
      },
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
