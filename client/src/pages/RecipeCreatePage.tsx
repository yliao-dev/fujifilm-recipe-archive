import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

const RecipeCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    // handle submission logic here
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
