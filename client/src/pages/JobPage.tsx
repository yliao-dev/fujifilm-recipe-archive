import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import { Item } from "../components/AllJobsJSON";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const id = useParams();

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: ["item", id],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/items/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "something wrong");
        }

        return data;
      } catch (error) {
        throw new Error("An error occurred while fetching data"); // Handling errors properly
      }
    },
  });
  console.log(item);
  if (isError) {
    return (
      <div>
        <h2>Error Loading Jobs</h2>
        <p>{(error as Error).message || "Something went wrong!"}</p>
      </div>
    );
  }

  return isLoading ? (
    <Spinner loading={isLoading} />
  ) : (
    <h1>{item?.body.title}</h1>
  );
};

export default JobPage;
