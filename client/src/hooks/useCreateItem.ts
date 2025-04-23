import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { RecipePayload } from "../types/recipeTypes";
import { ApiError, RecipeResponse } from "../types/apiResponses";

const createItemText = async ({
  formPayload,
}: {
  formPayload: RecipePayload;
}): Promise<RecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formPayload),
  });

  if (!res.ok) {
    try {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to update the recipe.");
    } catch (err) {
      throw new Error("Unexpected error occurred while updating the recipe.");
    }
  }

  return res.json();
};

const useCreateItemText = () =>
  useMutation<RecipeResponse, Error, RecipePayload>({
    mutationFn: (formPayload) => createItemText({ formPayload }),
    onSuccess: (data) => {
      console.log("Recipe created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating recipe:", error.message);
    },
  });

export default useCreateItemText;
