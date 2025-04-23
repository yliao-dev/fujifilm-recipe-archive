import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { ApiError, RecipeResponse } from "../types/apiResponses";

const createItem = async ({
  formPayload,
}: {
  formPayload: FormData;
}): Promise<RecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
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

const useCreateItem = () =>
  useMutation<RecipeResponse, Error, FormData>({
    mutationFn: (formPayload) => createItem({ formPayload }),
    onSuccess: (data: RecipeResponse) => {
      console.log("Recipe created successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error creating recipe:", error.message);
    },
  });

export default useCreateItem;
