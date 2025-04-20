import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import useCreateItem from "../hooks/useCreateItem";

const RecipeCreatePage = () => {
  const navigate = useNavigate();
  const createItemMutation = useCreateItem();
  const handleSubmit = (formData: any) => {
    const formattedData = {
      ...formData,
      camera_models: formData.camera_models
        .split(",")
        .map((s: string) => s.trim()),
      tags: formData.tags.split(",").map((s: string) => s.trim()), // Same for tags
    };

    // Now call the mutation function with the formatted data
    createItemMutation.mutate(formattedData, {
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
