import React from "react";

const routes = [
  {
    path: "/",
    element: React.lazy(() => import("../pages/mainPage/Index")),
  },
  {
    path: "/projects/:projectId",
    element: React.lazy(() => import("../pages/project/index")),
  },
];

export default routes;
