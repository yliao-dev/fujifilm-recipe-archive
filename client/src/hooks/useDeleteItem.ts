import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config"; // Replace with your actual config
import { DeleteJobResponse, DeleteJobError } from "../types"; // Add these types to your type definitions

// Mutation function for deleting a recipe
const deleteJob = async (recipeId: string): Promise<DeleteJobResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    try {
      const errorData: DeleteJobError = await res.json(); // Handle error response
      throw new Error(
        errorData.message || "Something went wrong while deleting the recipe"
      );
    } catch (err) {
      // If JSON parsing fails, handle it gracefully
      throw new Error("Unexpected error occurred while deleting the recipe.");
    }
  }

  // Parse and return the successful response
  const data: DeleteJobResponse = await res.json();
  return data;
};

// Hook for using deleteJob mutation
const useDeleteItem = () => {
  return useMutation<DeleteJobResponse, Error, string>({
    mutationFn: deleteJob, // Pass mutation function
    onError: (error: Error) => {
      console.error("Error deleting recipe:", error.message);
      // Optionally, display an error notification or handle state updates here
    },
    onSuccess: (data: DeleteJobResponse) => {
      console.log("Job deleted successfully:", data);
      // Optionally, trigger UI updates upon success
    },
  });
};

export default useDeleteItem;
