import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Item } from "../hooks/useItems";

const AllJobsJSON = () => {
  // Get Items
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/items`, {
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
      } catch (error) {
        throw new Error("An error occurred while fetching data"); // Handling errors properly
      }
    },
  });

  if (isLoading) {
    // Display a loading state
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading items: {(error as Error).message}</div>; // Display an error state
  }

  return (
    <>
      <div>
        <h1>All Jobs</h1>
        <ul>
          {items.map((item, index) => (
            <li key={item._id || index}>
              <strong>ID:</strong> {item._id}, <strong>Status:</strong>{" "}
              {item.status ? "Active" : "Inactive"}, <strong>Body:</strong>{" "}
              {JSON.stringify(item.body, null, 2)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllJobsJSON;
