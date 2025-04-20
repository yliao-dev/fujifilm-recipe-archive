import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Recipe } from "../types/recipeTypes";

const useItems = () => {
  return useQuery<Recipe[], Error>({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/items/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "something wrong");
        }

        return data || [];
      } catch (error) {}
      throw new Error("An error occurred while fetching data"); // Handling errors properly
    },
  });
};

export default useItems;
