import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

const RecipeCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    // handle submission logic here
    const recipe = {
      _id: { $oid: "6617fcf41f1e5c0fbd51a003" },
      name: formData.name,
      camera_models: formData.camera_models,
      film_simulation: formData.film_simulation,
      creator: formData.creator,
      tags: formData.tags,
      notes: formData.notes,
      sample_image_url: formData.sample_image_url || "/images/placeholder.webp",
      created_at: { $date: new Date().toISOString() },
      settings: formData.settings,
    };

    const blob = new Blob([JSON.stringify(recipe, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "export.json";
    link.click();

    URL.revokeObjectURL(url);
    navigate("/recipes");
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
