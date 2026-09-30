import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Service from "./components/Service";
import MainLayout from "./router/MainLayout";
import About from "./components/About";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "service",
          element: <Service />
        },
        {
          path: "About",
          element: <About />
        },

      ],
    },
  ]);

  return (<RouterProvider router={router} />

  )
};

export default App;