import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config"; // Replace with your actual config
import { CreateJobResponse, CreateJobError, JobBody } from "../types"; // Your types

// Mutation function for creating a recipe
const createJob = async (jobBody: JobBody): Promise<CreateJobResponse> => {
  // Send request to the server
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobBody),
  });

  if (!res.ok) {
    try {
      const errorData: CreateJobError = await res.json(); // Handle error response
      throw new Error(
        errorData.message || "Something went wrong while creating the recipe"
      );
    } catch (err) {
      // If JSON parsing fails, handle it gracefully
      throw new Error("Unexpected error occurred while creating the recipe.");
    }
  }

  // Parse and return the successful response
  const data: CreateJobResponse = await res.json();
  return data;
};

// Hook for using createJob mutation
const useCreateItem = () => {
  return useMutation<CreateJobResponse, Error, JobBody>({
    mutationFn: createJob, // Pass mutation function
    onError: (error: Error) => {
      console.error("Error creating recipe:", error.message);
      // Optionally, you can display an error notification or handle state updates here
    },
    onSuccess: (data: CreateJobResponse) => {
      console.log("Job created successfully:", data);
      // Optionally, navigate or trigger UI updates upon success
    },
  });
};

export default useCreateItem;
