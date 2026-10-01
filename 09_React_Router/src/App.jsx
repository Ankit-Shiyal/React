import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/Error";
import MainLayout from "./router/MainLayout";
import Loading from "./components/Loading";

const Home = lazy(() => import("./components/Home"));
const Service = lazy(() => import("./components/Service"));
const About = lazy(() => import("./components/About"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "service",
          element: <Service />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;