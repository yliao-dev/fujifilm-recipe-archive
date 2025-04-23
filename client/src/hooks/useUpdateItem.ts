import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Recipe } from "../types/recipeTypes";

type EditRecipeResponse = {
  message: string;
  item: Recipe;
};

type EditRecipeError = {
  message: string;
};

const updateItem = async ({
  recipeId,
  formPayload,
}: {
  recipeId: string;
  formPayload: FormData;
}): Promise<EditRecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: formPayload,
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

const useUpdateItem = (recipeId: string) => {
  return useMutation<EditRecipeResponse, Error, FormData>({
    mutationFn: (formPayload) => updateItem({ recipeId, formPayload }),
    onError: (error: Error) => {
      console.error("Error editing recipe:", error.message);
    },
    onSuccess: (data: EditRecipeResponse) => {
      console.log("Recipe updated successfully:", data);
    },
  });
};

export default useUpdateItem;
