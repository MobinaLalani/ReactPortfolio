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
 },
 {
  path:'/test' ,
  element : React.lazy(() => import('../../src/pages/Test'))
 }

];

export default routes;
