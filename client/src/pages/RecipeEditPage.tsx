import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { RecipeData } from "../data/data";
import NotFoundPage from "./NotFoundPage";

const RecipeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = RecipeData.find((item) => item._id.$oid === id);

  const handleSubmit = (updatedData: any) => {
    // Update logic here
    navigate("/recipes");
  };

  if (!recipe) return <NotFoundPage />;

  return (
    <div className="recipeCreate__page">
      <h1>Edit Your Film Recipe</h1>
      <hr className="recipeList__divider" />
      <RecipeForm mode="edit" initialData={recipe} onSubmit={handleSubmit} />
    </div>
  );
};

export default RecipeEditPage;
