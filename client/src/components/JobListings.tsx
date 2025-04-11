import JobListing, { Job } from "./JobListing";
import Spinner from "./Spinner";
import useItems from "../hooks/useItems";

const JobListings = ({ isHome = false }) => {
  // const [recipes, setJobs] = useState<JobListingProps[]>([]);
  // const [loading, setLoading] = useState(true);
  // React Query hook to fetch recipes
  const {
    data: items = [], // Use default value (empty array) for items
    isLoading,
    isError,
    error,
  } = useItems();

  if (isError) {
    return (
      <div>
        <h2>Error Loading Recipes</h2>
        <p>{(error as Error).message || "Something went wrong!"}</p>
      </div>
    );
  }
  return (
    <>
      {/* <!-- Browse Recipes --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Recipes" : "Browse Recipes"}
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
