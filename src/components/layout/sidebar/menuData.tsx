import DashboardSvg from "../../icons/components/DashboardSvg";
import ZoneSvg from "../../icons/components/ZoneSvg";
import { useLocation } from "react-router-dom";
import TaskManagerSvg from "../../icons/components/TaskManagerSvg";
import FleetSvg from "../../icons/components/FleetSvg";
import CapacitySvg from "../../icons/components/CapacitySvg";
import MicroHubSvg from "../../icons/components/MicroHubSvg";
import CartableSvg from "../../icons/components/CartableSvg";
import { ReactComponent as TaskManagerIcon } from "../../icons/svg/taskManagerIcon.svg";
import MessageSvg from "../../icons/components/MessageSvg";
import NodeSvg from "../../icons/components/NodeSvg";
import ListSvg from "../../icons/components/ListSvg";
import PlusSvg from "../../icons/components/PlusSvg";
import PersonnelSvg from "../../icons/components/PersonnelSvg";
import ReportSvg from "../../icons/components/ReportSvg";

 export const menuData = [
  {
    title: "داشبورد",
    path: "/dashboard",
    icon: <DashboardSvg />,
  },
  
  {
    title: "زون",
    path: "/zone",
    icon: <ZoneSvg />,
    // children: [
    //   { title: "لیست زون ها", path: "/zone", icon: <ListSvg /> },
    //   { title: "ایجاد زون", path: "/zone/new", icon: <PlusSvg /> },
    //   // { title: "ویرایش زون", path: "/zone/edit", icon: <ZoneSvg /> },
    // ],
  },
  {
    title: "ناوگان",
    path: "/fleet",
    icon: <FleetSvg />,
    // children: [
    //   { title: "لیست ناوگان ها", path: "/fleet", icon: <ListSvg /> },
    //   { title: "ایجاد ناوگان", path: "/fleet/new", icon: <PlusSvg /> },
    //   // { title: "ویرایش ناوگان", path: "/fleet/edit", icon: <FleetSvg /> },
    // ],
  },
  {
    title: "میکروهاب",
    path: "/micro-hub",
    icon: <MicroHubSvg />,
    // children: [
    //   { title: "لیست میکروهاب ها",
    //     path: "/micro-hub",
    //     icon: <ListSvg />
    //   },
    //   {
    //     title: "ایجاد میکروهاب",
    //     path: "/micro-hub/new",
    //     icon: <PlusSvg />,
    //   },
    //   // {
    //   //   title: "ویرایش میکروهاب",
    //   //   path: "/micro-hub/edit",
    //   //   icon: <MicroHubSvg />,
    //   // },
    // ],
  },
  {
    title: "نود",
    path: "/node",
    icon: <NodeSvg className={"w-[20px]"} />,
    // children: [
    //   { title: "لیست نود ها", path: "/node", icon: <ListSvg /> },
    //   { title: "ایجاد نود", path: "/node/new", icon: <PlusSvg /> },
    //   // { title: "ویرایش نود", path: "/node/edit", icon: <NodeSvg /> },
    // ],
  },
  // {
  //   title: "پیام‌ها",
  //   path: "/message",
  //   icon: <MessageIcon />,
  // },
  {
    title: "پرسنل",
    path: "/personnel",
    icon: <PersonnelSvg />,
    // children: [
    //   { title: "لیست پرسنل ها", path: "/personnel", icon: <PersonnelSvg /> },
    //   { title: "ایجاد پرسنل", path: "/personnel/new", icon: <PersonnelSvg /> },
    //   {
    //     title: "ویرایش پرسنل",
    //     path: "/personnel/edit",
    //     icon: <PersonnelSvg />,
    //   },
    // ],
  },
  // {
  //   title: "گزارش‌ها",
  //   path: "/reports",
  //   icon: <ReportsIcon />,
  // },
];
 export const SupervisorMenuData = [
   {
     title: "داشبورد",
     path: "/MhDashboard",
     icon: <DashboardSvg />,
   },
   {
     title: "مدیریت تسک",
     path: "/taskManager",
     icon: <TaskManagerSvg />,
   },
   {
     title: "کارتابل",
     path: "/",
     icon: <CartableSvg />,
     children: [
       { title: "مرسوله", path: "/cartable/parcel" },
       { title: "باندل", path: "/cartable/bundle" },
     ],
   },
  //  {
  //    title: "ظرفیت",
  //    path: "/MhDashboard",
  //    icon: <CapacitySvg />,
  //  },
  //  {
  //    title: "پیام ها",
  //    path: "/MhDashboard",
  //    icon: <MessageSvg />,
  //  },
  //  {
  //    title: "گزارش ها",
  //    path: "/MhDashboard",
  //    icon: <ReportSvg />,
  //  },
 ];


