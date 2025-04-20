import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import useCreateItem from "../hooks/useCreateItem";

const RecipeCreatePage = () => {
  const navigate = useNavigate();
  const createItemMutation = useCreateItem();

  const handleSubmit = (formData: any) => {
    createItemMutation.mutate(formData, {
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
