import JobListing, { Job } from "./JobListing";
import { BASE_URL } from "../config";
import Spinner from "./Spinner";
import { Item } from "./AllJobsJSON";
import { useQuery } from "@tanstack/react-query";

const JobListings = ({ isHome = false }) => {
  // const [jobs, setJobs] = useState<JobListingProps[]>([]);
  // const [loading, setLoading] = useState(true);
  // React Query hook to fetch jobs
  const {
    data: items = [], // Use default value (empty array) for items
    isLoading,
    isError,
    error,
  } = useQuery<Item[]>({
    queryKey: ["items"], // Unique key for this query
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/items`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "something wrong");
        }

        return data || [];
      } catch (error) {}
      throw new Error("An error occurred while fetching data"); // Handling errors properly
    },
  });

  if (isError) {
    return (
      <div>
        <h2>Error Loading Jobs</h2>
        <p>{(error as Error).message || "Something went wrong!"}</p>
      </div>
    );
  }
  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <JobListing
                  key={item._id || index}
                  _id={item._id}
                  status={item.status}
                  body={item.body as Job}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListings;
