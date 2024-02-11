import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Schedule from "./Pages/Schedule";
import Fabrication from "./Pages/Fabrication";
import Model from "./Pages/Model";
import Login_out from "./Pages/Login_out";

export const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Model />,
        },
        {
          path: "Model",
          element: <Model />,
        },
        {
          path: "Fabrication",
          element: <Fabrication />,
        },
        {
          path: "Schedule",
          element: <Schedule />,
        },
        {
          path: "Login",
          element: <Login_out />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
