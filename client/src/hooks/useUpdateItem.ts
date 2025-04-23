import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { RecipeResponse, ApiError } from "../types/apiResponses";

const updateItem = async ({
  recipeId,
  formPayload,
}: {
  recipeId: string;
  formPayload: FormData;
}): Promise<RecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: formPayload,
  });

  if (!res.ok) {
    try {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to update the recipe.");
    } catch (err) {
      throw new Error("Unexpected error occurred while updating the recipe.");
    }
  }

  const data: RecipeResponse = await res.json();
  return data;
};

const useUpdateItem = (recipeId: string) => {
  return useMutation<RecipeResponse, Error, FormData>({
    mutationFn: (formPayload) => updateItem({ recipeId, formPayload }),
    onSuccess: (data: RecipeResponse) => {
      console.log("Recipe updated successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error updating recipe:", error.message);
    },
  });
};

export default useUpdateItem;
