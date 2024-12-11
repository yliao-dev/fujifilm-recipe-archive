// useCreateItem.ts
import { useMutation } from "react-query";
import { BASE_URL } from "../config";
import { NewJob } from "../types";

const useCreateItem = () => {
  return useMutation(
    async (newJob: NewJob) => {
      const res = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong while creating the job"
        );
      }

      return data; // Return the newly created job data
    },
    {
      onError: (error: Error) => {
        // Handle error state here if needed
        console.error("Error creating job:", error.message);
      },
      onSuccess: (data) => {
        // Handle success state here if needed
        console.log("Job created successfully:", data);
      },
    }
  );
};

export default useCreateItem;
