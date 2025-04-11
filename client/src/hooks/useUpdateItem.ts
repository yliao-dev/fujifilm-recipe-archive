import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config"; // Replace with your actual config
import { EditJobResponse, EditJobData, EditJobError } from "../types"; // Add these types to your type definitions

// Mutation function for editing a recipe
const editJob = async ({
  recipeId,
  recipeData,
}: {
  recipeId: string;
  recipeData: EditJobData;
}): Promise<EditJobResponse> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  if (!res.ok) {
    try {
      const errorData: EditJobError = await res.json();
      throw new Error(errorData.message || "Failed to update the recipe.");
    } catch (err) {
      throw new Error("Unexpected error occurred while updating the recipe.");
    }
  }

  const data: EditJobResponse = await res.json();
  return data;
};

// Hook for using editJob mutation
const useEditJob = () => {
  return useMutation<
    EditJobResponse,
    Error,
    { recipeId: string; recipeData: EditJobData }
  >({
    mutationFn: editJob, // Pass the mutation function
    onError: (error: Error) => {
      console.error("Error editing recipe:", error.message);
    },
    onSuccess: (data: EditJobResponse) => {
      console.log("Job updated successfully:", data);
    },
  });
};

export default useEditJob;
