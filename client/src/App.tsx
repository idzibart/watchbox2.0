import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import MoviePage from "./pages/main";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import MyListPage from "./pages/mylist";
import { Layout, RequireAuth } from "./layout/layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "movie/:imdbID",
          element: <MoviePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "mylist",
          element: <MyListPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
