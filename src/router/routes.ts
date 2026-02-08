import path from "path";
import React from "react";

const routes = [
  {
    path: "/",
    element: React.lazy(() => import("../../src/pages/mainPage/Index")),
  },
  {
  path:'/projects/:projectId' ,
  element:React.lazy(() =>import('../../src/pages/project/index'))
 }

];

export default routes;
