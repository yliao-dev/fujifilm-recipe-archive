import { useNavigate, useParams } from "react-router-dom";
import { renderError } from "./ErrorPage";
import { formatKey } from "../utils/dataUtils";
import { Edit, DeleteForever } from "@mui/icons-material";
import useItem from "../hooks/useItem";
import { BASE_URL } from "../config";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import useDeleteItem from "../hooks/useDeleteItem";

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  const { id } = useParams();
  if (!id) return renderError(400, "Missing recipe ID in URL.");
  const { data: recipeData, error, isLoading } = useItem(id);

  const deleteItemMutation = useDeleteItem();

  const handleDelete = () => {
    deleteItemMutation.mutate(id, {
      onSuccess: () => {
        navigate("/recipes");
      },
    });

    setOpenConfirm(false);
  };

  if (isLoading) return null;
  if (error) return renderError(500, error.message);
  if (!recipeData) return renderError(404, "Recipe not found.");

  const {
    name,
    camera_models,
    film_simulation,
    settings,
    creator,
    sample_image_url,
  } = recipeData;
  console.log(`sample_image_url: ${sample_image_url}`);
  console.log(`${BASE_URL}${sample_image_url}`);
  return (
    <div className="recipeDetail__page">
      <section className="recipeDetail__intro">
        <img src={`${BASE_URL}${sample_image_url}`} alt={name} />
        <div className="recipeDetail__intro__content">
          <div>
            <h1>{name}</h1>
            <p>
              <strong>Film Simulation:</strong> {film_simulation} <br />
              <strong>Camera Models:</strong> {camera_models.join(" · ")} <br />
              <strong>Creator:</strong> {creator}
            </p>
          </div>
          <div className="recipeDetail__modify">
            <Edit
              onClick={() => navigate(`/edit-recipe/${recipeData._id}`)}
              style={{ cursor: "pointer" }}
            />
            <DeleteForever
              onClick={() => setOpenConfirm(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </section>

      <section className="recipeDetail__body">
        {Object.entries(settings).map(([key, value]) => (
          <p key={key}>
            <strong>{formatKey(key)}</strong> {value}
          </p>
        ))}
      </section>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle style={{ fontWeight: 300 }}>
          Permanently Delete This Recipe
        </DialogTitle>
        <DialogActions>
          <Button
            style={{ fontWeight: 300 }}
            onClick={() => setOpenConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ fontWeight: 300 }}
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeDetailPage;
