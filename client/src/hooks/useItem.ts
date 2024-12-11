import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Item } from "../types";

const useItem = (id: string) => {
  return useQuery<Item, Error>({
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
