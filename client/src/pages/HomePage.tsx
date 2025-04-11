import { Link } from "react-router-dom";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";

const HomePage = () => {
  const title = "Explore custom Fujifilm JPEG file simulations";
  return (
    <>
      <h1>{title}</h1>
      <HomeCards />
      <JobListings isHome={true} />
      <Link to="/recipes" className="">
        View All Recipes
      </Link>
    </>
  );
};

export default HomePage;
