import { useMutation } from "@tanstack/react-query";
import { RecipeFormData } from "../types/recipeTypes";

const createItem = async (body: RecipeFormData) => {
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.message || "Failed to create recipe");
  }

  return res.json();
};

const useCreateItem = () =>
  useMutation({
    mutationFn: createItem,
    onError: (err: Error) => {
      console.error("Create recipe failed:", err.message);
    },
    onSuccess: (data) => {
      console.log("Recipe created successfully:", data);
    },
  });

export default useCreateItem;
