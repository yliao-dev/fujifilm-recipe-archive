import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Item } from "./useItems";

const useCreateItem = () => {
  return useQuery<Item, Error>({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/items/}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
  });
};
export default useCreateItem;
