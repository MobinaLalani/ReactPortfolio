import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Loading from "../components/ui/loading/Loading";


type RoutesType = {
  path: string;
  element: React.LazyExoticComponent<React.FC<{}>>;
};

const LazyRouter = () => {
  const [defaultRoute, setDefaultRoute] = useState<string>("/TaskManager");

  return (
    <Suspense fallback={<Loading />}>
     <Routes>

      {routes.map((route: RoutesType, index: number) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
     </Routes>
    </Suspense>
  );
};

export default LazyRouter;
