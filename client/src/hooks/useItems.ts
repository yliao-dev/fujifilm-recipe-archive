import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export type Item = {
  _id: number;
  status: boolean;
  body: Record<string, any>; // Use a generic object type for JSON
};

const useItems = () => {
  return useQuery<Item[], Error>({
    queryKey: ["items"], // Unique key for this query
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
