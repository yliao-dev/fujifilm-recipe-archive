import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Recipe } from "../types/recipeTypes";

const useItem = (id: string) => {
  return useQuery<Recipe, Error>({
    queryKey: ["item", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is missing");
      }
      const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
  });
};

export default useItem;
