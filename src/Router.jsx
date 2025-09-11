import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "blog",
      element: <Blog />,
    },
    {
      path: "/blog/:slug",
      element: <Post />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
