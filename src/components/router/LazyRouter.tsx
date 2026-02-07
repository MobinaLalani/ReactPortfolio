import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Loading from "../tools/loading/Loading";
import NotFound from "../../pages/not-found/pages/NotFound";
import useStore from "../../store/zustand/store";
import Login from "../../pages/login/pages/View";  

type RoutesType = {
  path: string;
  element: React.LazyExoticComponent<React.FC<{}>>;
};

const LazyRouter = () => {
  const userData = useStore((state) => state.userData);


  const [defaultRoute, setDefaultRoute] = useState<string>("/TaskManager");


  return (
    <Suspense fallback={<Loading />}>
     <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<Navigate to={defaultRoute} />} /> 

  {routes.map((route: RoutesType, index: number) => (
    <Route key={index} path={route.path} element={<route.element />} />
  ))}
 
</Routes>

    </Suspense>
  );
};

export default LazyRouter;
