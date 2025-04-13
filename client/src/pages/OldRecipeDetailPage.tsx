// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
// import useItem from "../hooks/useItem";
// import useDeleteItem from "../hooks/useDeleteItem";
// import { toast } from "react-toastify";
// import { RecipeData } from "../data/data";
// import NotFoundPage from "./NotFoundPage";

// const OldRecipeDetailPage = () => {
//   const { id } = useParams();
//   const index = RecipeData.findIndex((p) => String(p._id.$oid) === id);
//   const recipe = RecipeData[index];

//   if (!recipe) return <NotFoundPage />;

//   const { data: item, isError, error } = useItem(id);
//   const { mutate: deleteJob, isError: isDeleteError } = useDeleteItem();

//   const navigate = useNavigate();
//   const handleDelete = () => {
//     if (confirm("Are you sure you want to delete this recipe?")) {
//       deleteJob(id, {
//         onSuccess: () => {
//           console.log("Job deleted successfully");
//           toast.success("Job deleted successfully");
//           navigate("/recipes"); // Redirect to recipe list after deletion
//         },
//         onError: (err: { message: any }) => {
//           console.error("Error deleting recipe:", err.message);
//           alert("Failed to delete the recipe. Please try again.");
//         },
//       });
//     }
//   };

//   if (isError) {
//     return (
//       <div>
//         <h2>Error Loading Item</h2>
//         <p>{(error as Error).message || "Something went wrong!"}</p>
//       </div>
//     );
//   }

//   if (!item) {
//     return <p>No data found</p>;
//   }

//   return (
//     <>
//       <section>
//         <div>
//           <Link to="/recipes">
//             <FaArrowLeft /> Back to Job Listings
//           </Link>
//         </div>
//       </section>

//       <section>
//         <div>
//           <main>
//             <div>
//               <div>{item.body.type}</div>
//               <h1>{item.body.title}</h1>
//               <div>
//                 <FaMapMarker />
//                 <p>{item.body.location}</p>
//               </div>
//             </div>

//             <div>
//               <h3>Job Description</h3>

//               <p>{item.body.description}</p>

//               <h3>Salary</h3>

//               <p className="mb-4">{item.body.salary}</p>
//             </div>
//           </main>

//           <aside>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-6">Company Info</h3>

//               <h2 className="text-2xl"> {item.body.company.name} </h2>

//               <p className="my-2">{item.body.company.description}</p>

//               <hr className="my-4" />

//               <h3 className="text-xl">Contact Email:</h3>

//               <p className="my-2 bg-indigo-100 p-2 font-bold">
//                 {item.body.company.contactEmail}
//               </p>

//               <h3 className="text-xl">Contact Phone:</h3>

//               <p className="my-2 bg-indigo-100 p-2 font-bold">
//                 {item.body.company.contactPhone}
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-xl font-bold mb-6">Manage Job</h3>
//               <Link
//                 to={`/edit-recipe/${item._id}`}
//                 className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
//               >
//                 Edit Job
//               </Link>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
//                 onClick={handleDelete}
//               >
//                 Delete Job
//               </button>
//               {isDeleteError && (
//                 <p className="text-red-500 mt-2">Error deleting the recipe!</p>
//               )}
//             </div>
//           </aside>
//         </div>
//       </section>
//     </>
//   );
// };

// export default OldRecipeDetailPage;
