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

  formPayload.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    if (contentType?.includes("application/json")) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Failed to create recipe.");
    } else {
      const text = await res.text(); // <--- new line to get raw text
      throw new Error(`Raw error: ${text}`);
    }
  }

  return res.json();
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
