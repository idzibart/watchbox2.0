import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import MoviePage from "./pages/main";
import HomePage from "./pages/home";
import Layout from "./layout/layout";
import RegisterPage from "./pages/register";

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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
