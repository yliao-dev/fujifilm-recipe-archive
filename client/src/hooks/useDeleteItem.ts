import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config"; // Replace with your actual config

type DeleteRecipeResponse = {
  message: string;
};

type DeleteRecipeError = {
  message: string;
};

// Mutation function for deleting a recipe
const deleteRecipe = async (
  recipeId: string
): Promise<DeleteRecipeResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    try {
      const errorData: DeleteRecipeError = await res.json(); // Handle error response
      throw new Error(
        errorData.message || "Something went wrong while deleting the recipe"
      );
    } catch (err) {
      // If JSON parsing fails, handle it gracefully
      throw new Error("Unexpected error occurred while deleting the recipe.");
    }
  }

  // Parse and return the successful response
  const data: DeleteRecipeResponse = await res.json();
  return data;
};

// Hook for using deleteRecipe mutation
const useDeleteItem = () => {
  return useMutation<DeleteRecipeResponse, Error, string>({
    mutationFn: deleteRecipe, // Pass mutation function
    onError: (error: Error) => {
      console.error("Error deleting recipe:", error.message);
    },
    onSuccess: (data: DeleteRecipeResponse) => {
      console.log("Recipe deleted successfully:", data);
      // Optionally, trigger UI updates upon success
    },
  });
};

export default useDeleteItem;
