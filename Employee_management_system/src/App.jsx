import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./Ui/Error";
import MainLayout from "./router/MainLayout";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Employee />,
        },
        {
          path: "add",
          element: <AddEmployee />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;