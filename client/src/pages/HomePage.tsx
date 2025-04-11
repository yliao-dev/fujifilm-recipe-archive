import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <Link to="/recipes" className="">
        View All Recipes
      </Link>
    </>
  );
};

export default HomePage;
