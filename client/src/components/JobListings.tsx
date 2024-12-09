import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import { BASE_URL } from "../config";
import { Job } from "./JobListing";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/items`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    console.log(jobs);
  }, []);

  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <h2> Loading ... </h2>
            ) : (
              <>
                {jobs.map((job, index) => (
                  <JobListing key={job._id || index} body={job} />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;
