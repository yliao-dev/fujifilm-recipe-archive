import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeCreatePage from "./pages/RecipeCreatePage";
import RecipeEditPage from "./pages/RecipeEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/add-recipe" element={<RecipeCreatePage />} />
        <Route path="/edit-recipe/:id" element={<RecipeEditPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
        toastClassName="toast-success"
      />
    </>
  );
};

export default App;
