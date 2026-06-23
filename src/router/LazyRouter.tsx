import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import Loading from "../components/ui/loading/Loading";

type RouteType = {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
};

const LazyRouter = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {routes.map((route: RouteType, index: number) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  </Suspense>
);

export default LazyRouter;
