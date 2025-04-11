import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <Link
      to="/recipes"
      className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Recipes
    </Link>
  );
};

export default ViewAllJobs;
