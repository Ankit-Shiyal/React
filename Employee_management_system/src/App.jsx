import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./Ui/Error";
import MainLayout from "./router/MainLayout";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";
import { ToastProvider } from "./Ui/ToastContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "employees",
        element: <Employee />,
      },
      {
        path: "add",
        element: <AddEmployee />,
      },
      {
        path: "update/:id",
        element: <AddEmployee />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
};

export default App;