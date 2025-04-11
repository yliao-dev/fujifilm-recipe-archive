import Card from "./Card";
import { Link } from "react-router-dom";
const HomeCards = () => {
  return (
    <>
      {/* <!-- Developers and Employers --> */}
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Card>
              <h2 className="text-2xl font-bold">For Developers</h2>
              <p className="mt-2 mb-4">
                Browse our React recipes and start your career today
              </p>
              <Link
                to="/recipes"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Recipes
              </Link>
            </Card>
            <Card bg="bg-indigo-100">
              <h2 className="text-2xl font-bold">For Employers</h2>
              <p className="mt-2 mb-4">
                List your recipe to find the perfect developer for the role
              </p>
              <Link
                to="/add-recipe"
                className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
              >
                Add Job
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCards;
