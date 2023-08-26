import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createHashRouter as createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "./index.css";
import App from "./pages";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import "./prototype";

const Mobile = lazy(() => import("./pages/Mobile"));
const Desktop = lazy(() => import("./pages/Desktop"));
const Insights = lazy(() => import("./pages/Desktop/Insights"));
const Home = lazy(() => import("./pages/Desktop/Home"));
const Settings = lazy(() => import("./pages/Desktop/Settings"));

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "m",
        element: <Mobile />,
      },
      {
        path: "d",
        element: <Desktop />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "insights",
            element: <Insights />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);
