import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import NotFoundPage from "./NotFoundPage";
import useUpdateItem from "../hooks/useUpdateItem";

const RecipeEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  if (!id) {
    return <NotFoundPage />;
  }
  console.log(id);
  const { data: RecipeData, error } = useUpdateItem(id);

  if (!RecipeData) return <NotFoundPage />;

  const handleSubmit = (updatedData: any) => {
    // Update logic here
    navigate(`/recipes/${updatedData._id.$oid}`);
  };

  if (!RecipeData) return <NotFoundPage />;

  return (
    <div className="recipeCreate__page">
      <h1>Edit Film Recipe</h1>
      <hr className="recipeList__divider" />
      <RecipeForm
        mode="edit"
        initialData={RecipeData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RecipeEditPage;
