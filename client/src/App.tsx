import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
