import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";

const createItem = async (formPayload: FormData) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: formPayload,
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
