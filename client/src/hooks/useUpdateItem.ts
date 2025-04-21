import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { EditRecipeData, Recipe } from "../types/recipeTypes";

type EditRecipeResponse = {
  message: string;
  item: Recipe;
};

type EditRecipeError = {
  message: string;
};

const editRecipe = async ({
  recipeId,
  recipeData,
}: {
  recipeId: string;
  recipeData: EditRecipeData;
}): Promise<EditRecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: JSON.stringify(recipeData),
  });

  if (!res.ok) {
    try {
      const errorData: EditRecipeError = await res.json();
      throw new Error(errorData.message || "Failed to update the recipe.");
    } catch (err) {
      throw new Error("Unexpected error occurred while updating the recipe.");
    }
  }

  const data: EditRecipeResponse = await res.json();
  return data;
};

const useEditRecipe = (recipeId: string) => {
  return useMutation<EditRecipeResponse, Error, { recipeData: EditRecipeData }>(
    {
      mutationFn: ({ recipeData }) => editRecipe({ recipeId, recipeData }),
      onError: (error: Error) => {
        console.error("Error editing recipe:", error.message);
      },
      onSuccess: (data: EditRecipeResponse) => {
        console.log("Recipe updated successfully:", data);
      },
    }
  );
};

export default useEditRecipe;
