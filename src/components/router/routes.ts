import path from "path";
import React from "react";

const routes = [
  {
    path: "/login",
    element: React.lazy(() => import("../../pages/login/pages/View")),
  },
  {
    path: "/Order/createOrder",
    element: React.lazy(
      () => import("../../pages/order/createOrder/page/View")
    ),
  },
  {
    path: "/home",
    element: React.lazy(() => import("../../pages/HomePage/pages/View")),
  },
  {
    path: "/SearchResult/:id",
    element: React.lazy(() => import("../../pages/ScanResult/pages/View")),
  },
  {
    path: "/missions",
    element: React.lazy(() => import("../../pages/Missions/pages/View")),
  },
  {
    path: "/scanner",
    element: React.lazy(() => import("../../pages/Scann/pages/View")),
  },
  {
    path: "/profile",
    element: React.lazy(() => import("../../pages/Profile/pages/View")),
  },

  {
    path: "/taskManager",
    element: React.lazy(() => import("../../pages/taskManager/pages/View")),
  },
  {
    path: `/parcels/:bundleId`,
    element: React.lazy(() => import("../../pages/parcels/pages/View")),
  },
  {
    path: `/DeliverParcel`,
    element: React.lazy(() => import("../../pages/DeliverParcel/pages/View")),
  },
  {
    path: `/DeclarationDamage`,
    element: React.lazy(
      () => import("../../pages/DeclarationDamage/pages/View")
    ),
  },
  {
    path: `/CreateNewDamage`,
    element: React.lazy(() => import("../../pages/CreateNewDamage/pages/View")),
  },
  {
    path: `/DeliverParcelWithPOD`,
    element : React.lazy(() =>import("../../pages/DeliverParcelPOD/pages/View"))
  },
];

export default routes;
