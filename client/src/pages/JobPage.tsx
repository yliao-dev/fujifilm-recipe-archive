import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { Link, useParams } from "react-router-dom";
import { Item } from "../components/AllJobsJSON";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";

const JobPage = () => {
  // destructuring
  // { id: '6755c489eff718785448cde6' }
  const { id } = useParams<{ id: string }>();
  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: ["item", id],
    queryFn: async () => {
      try {
        if (!id) {
          throw new Error("ID is missing"); // Ensure ID is present
        }
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
  if (isError) {
    return (
      <div>
        <h2>Error Loading Jobs</h2>
        <p>{(error as Error).message || "Something went wrong!"}</p>
      </div>
    );
  }
  // Early Exit for Undefined States
  // Handle cases where the item is undefined or not found
  if (!item) return <p>No data found</p>;

  return isLoading ? (
    <Spinner loading={isLoading} />
  ) : (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
              <div className="text-gray-500 mb-4">{item.body.type}</div>
              <h1 className="text-3xl font-bold mb-4">{item.body.title}</h1>
              <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <FaMapMarker className="text-orange-700 mr-1" />
                <p className="text-orange-700">{item.body.location}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p className="mb-4">{item.body.description}</p>

              <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

              <p className="mb-4">{item.body.salary}</p>
            </div>
          </main>

          <aside>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Company Info</h3>

              <h2 className="text-2xl"> {item.body.company.name} </h2>

              <p className="my-2">{item.body.company.description}</p>

              <hr className="my-4" />

              <h3 className="text-xl">Contact Email:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {item.body.company.contactEmail}
              </p>

              <h3 className="text-xl">Contact Phone:</h3>

              <p className="my-2 bg-indigo-100 p-2 font-bold">
                {" "}
                {item.body.company.contactPhone}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Job</h3>
              <Link
                to={`/jobs/edit/${item._id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Edit Job
              </Link>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default JobPage;
