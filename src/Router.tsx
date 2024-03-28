import { FC } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Schedule from "./Pages/Schedule/SchedulePage";
import Fabrication from "./Pages/Fabrication/Fabrication";
import Model from "./Pages/Model/Model";
import Login_out from "./Pages/Login_out/Login_out";
import Home from "./Pages/Home/Home";
import useAuthStatus from "./hook/useAuthStatus";
import { Spin } from "antd";
import ProjectDetail from "./Pages/Schedule/ProjectDetailPage";
import { ProjectsManager } from "./class/ProjectsManager";

const projectsManager = new ProjectsManager();

export const Router: FC = () => {
  const { loggedIn, loading } = useAuthStatus();
  const privateDaseboard = () => {
    if (loading) {
      return <Spin spinning={loading} fullscreen />;
    } else {
      return loggedIn ? <Home /> : <Navigate to="/Login" />;
    }
  };
  console.log(loggedIn);

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
          element: <Schedule projectsManager={projectsManager} />,
        },
        {
          path: "Schedule/ProjectDetail/:FirestoreProjectId",
          element: <ProjectDetail projectsManager={projectsManager} />,
        },
        {
          path: "Login",
          element: <Login_out />,
        },
        {
          path: "Home",
          element: privateDaseboard(),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
