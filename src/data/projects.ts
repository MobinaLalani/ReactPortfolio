// ===== Images =====
import HalazLogo from "../assets/image/halazProject/halazLogo.png";
import LandingPic1 from "../assets/image/Landing/Landing3.png";
import LandingPic2 from "../assets/image/Landing/Landing2.png";
import LandingPic3 from "../assets/image/Landing/Landing1.png";
import supervisor1 from "../assets/image/supervisor/supervisor1.png";
import supervisor2 from "../assets/image/supervisor/supervisor2.png";
import supervisor3 from "../assets/image/supervisor/supervisor3.png";
import overViewImage from "../assets/image/dynamicApiDocBuilder/OverViewImage.png";
import loginImage from "../assets/image/dynamicApiDocBuilder/LoginImage.png";
import componentManagment1 from "../assets/image/dynamicApiDocBuilder/ComponentManagmentImage.png";
import componentManagment2 from "../assets/image/dynamicApiDocBuilder/ComponentManagmentImage2.png";
import importSwagger1 from "../assets/image/dynamicApiDocBuilder/ImportSwagger1.png";
import importSwagger2 from "../assets/image/dynamicApiDocBuilder/ImportSwagger2.png";
import importSwagger3 from "../assets/image/dynamicApiDocBuilder/ImportSwagger3.png";
import importSwagger4 from "../assets/image/dynamicApiDocBuilder/ImportSwagger4.png";
import createPage1 from "../assets/image/dynamicApiDocBuilder/CreatePage1.png";
import createPage2 from "../assets/image/dynamicApiDocBuilder/CreatePage2.png";
import createPage3 from "../assets/image/dynamicApiDocBuilder/CreatePage3.png";
import userOverView1 from "../assets/image/dynamicApiDocBuilder/UserOverView1.png";
import Admindashboard from "../assets/image/managementPic/AdminDashboard.png";
import userInfo from "../assets/image/panelPic/createBuffer.png";
import wallet from "../assets/image/panelPic/walletPic.png";
import parcelDetail from "../assets/image/panelPic/parcelDetail.png";

import mapPicpng from "../assets/image/mapProject/createNode.png";
import mapPic from "../assets/image/mapProject/mapPicpng.png";
import BaseMap from "../assets/image/mapProject/baseMapPic.png";
import fleetPic from "../assets/image/managementPic/managment-fleet.png";
import AdminDashboardPic from "../assets/image/managementPic/AdminDashboard.png";
import bundleListPic from "../assets/image/managementPic/managment-bundleList.png";
import PanelPic from '../assets/image/panelPic/createOrder.png';
import HalazMapProject from "../assets/image/mapProject/baseMapPic.png";
import CalanderOverView from "../assets/image/MyCalander/CalanderOverView.png";
import DaySheet from "../assets/image/MyCalander/DaySheet.png";
import HabitCrud from "../assets/image/MyCalander/Habit crud.png";
import WeeklyPlan from "../assets/image/MyCalander/weeklyPlan.png";
import DashboardImage from "../assets/image/MyCalander/dashboardImage.png";

// ======================================================
// ======================= TYPES =========================
// ======================================================

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  repo?: string;
  demo?: string;
  img: string;
};

export type ProjectSection = {
  title: string;
  paragraphs: string[];
  images: string[];
  detailContent: string[];
  link?: {
    label:string,
    url:string
  };
};

// ======================================================
// ======================= PROJECTS ======================
// ======================================================

export const projects: Project[] = [
  {
    id: 1,
    slug: "Halazone-Management",
    title: "Halazone-Management",
    img: Admindashboard,
    description:
      "A reusable UI component library with comprehensive documentation.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Storybook"],
    repo: "https://github.com/",
  },
  {
    id: 2,
    slug: "HalazMap",
    title: "Halazone-Map",
    img: HalazMapProject,
    description:
      "An interactive map-based dashboard for monitoring nodes, zones, operational activities, and real-time fleet locations.",
    technologies: ["React", "TypeScript", "Zustand", "TailwindCSS"],
    repo: "https://github.com/",
  },
  {
    id: 3,
    slug: "customerPanel",
    title: "Halazone-CustomerPanel",
    img: PanelPic,
    description:
      "A user-friendly interface where customers can select services, place orders, and track their status in real time.",
    technologies: [
      "React",
      "TypeScript",
      "ContextApi",
      "Zustand",
      "TailwindCSS",
    ],
    repo: "https://github.com/",
  },
  {
    id: 4,
    slug: "Halazone-SupervisorApp",
    title: "Halazone-SupervisorApp",
    img: supervisor3,
    description:
      "A monitoring dashboard enabling supervisors to track parcels, fleet activity, and operational status in real time.",
    technologies: ["React", "TypeScript", "Zustand", "leaflet", "TailwindCSS"],
    repo: "https://github.com/",
  },
  {
    id: 5,
    slug: "Halazone-LandingPage",
    title: "Halazone-LandingPage",
    img: LandingPic3, // import شده، مسیر string اشتباه حذف شد
    description:
      "Designed to communicate the platform’s vision, solutions, and user benefits through a clean, engaging UI.",
    technologies: ["Next.js", "TypeScript", "Zustand", "TailwindCSS"],
    repo: "https://github.com/",
  },
  {
    id: 6,
    slug: "Dynamic_ApiDocBuilder",
    title: "Dynamic_ApiDocBuilder",
    img: overViewImage,
    description:
      "A dynamic API documentation platform that automatically generates and manages interactive API docs for developers",
    technologies: [
      "Next.js",
      "TypeScripts",
      "TailwindCSS",
      "React Context API",
    ],
  },
  {
    id: 7,
    slug: "MyCalander",
    title: "My Calander",
    img: DashboardImage,
    description:
      "A personal productivity app combining calendar management, weekly planning, daily task sheets, and habit tracking in one unified interface.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Zustand"],
  },
];

export const projectDetails: Record<number, ProjectSection> = {
  1: {
    title: "Halazone – Management System",
    paragraphs: [
      "A centralized admin platform providing full system access and control over operational workflows, configurations, and data management.",
    ],
    detailContent: [
      "The Halazone Management System is a comprehensive admin dashboard built to give operators full visibility and control over the entire logistics platform.",
      "It covers fleet management, bundle tracking, user administration, and operational reporting — all in one unified interface.",
      "Built with performance and scalability in mind, the system handles large volumes of real-time data while keeping the UI responsive and intuitive for admin users.",
    ],
    images: [fleetPic, AdminDashboardPic, bundleListPic],
  },
  2: {
    title: " Halazone - Map",
    paragraphs: [
      "A map-driven interface enabling dynamic rendering of zones, nodes, operational layers, and live vehicle tracking. Built with a focus on performance, responsiveness, and data clarity.",
    ],
    detailContent: [
      "Halazone Map is an interactive geospatial dashboard for visualizing and managing logistics operations in real time.",
      "Operators can view and edit delivery zones, monitor node status, and track live vehicle positions on the map — all with smooth pan and zoom interactions.",
      "The system layers multiple data sources simultaneously, giving a clear operational picture without overwhelming the interface.",
    ],
    images: [mapPicpng, mapPic, BaseMap],
  },
  3: {
    title: "Halazone – Customer Panel",
    paragraphs: [
      "The customer panel provides users with a seamless experience for creating and managing orders.",
      "Users can select destinations, services, and track their shipments in real time.",
    ],
    detailContent: [
      "The Halazone Customer Panel is the end-user facing application where customers interact with the platform to create orders, manage their wallet, and track deliveries.",
      "The interface guides users through service selection, destination input, and order confirmation — with a clean step-by-step flow designed to minimize friction.",
      "Real-time shipment tracking and parcel detail views keep customers informed at every stage of their delivery.",
    ],
    images: [userInfo, wallet, parcelDetail],
  },

  4: {
    title: "Halazone – Supervisor App",
    paragraphs: [
      "The supervisor application is a PWA designed for monitoring microhub operations.",
      "It enables supervisors to manage fleets and shipments in real time.",
    ],
    detailContent: [
      "The Halazone Supervisor App is a Progressive Web App designed for field supervisors managing microhub logistics on the go.",
      "Supervisors can monitor parcel intake and dispatch, track fleet activity, and resolve operational issues directly from their mobile device.",
      "Built as a PWA, it works reliably across devices and network conditions — critical for field operations where connectivity can be inconsistent.",
    ],
    images: [supervisor1, supervisor2, supervisor3],
  },

  5: {
    title: "Halazone – Landing Page",
    paragraphs: [
      "The landing page introduces Halazone’s services and features.",
      "It is optimized for performance, SEO, and user engagement.",
    ],
    detailContent: [
      "The Halazone Landing Page is the public-facing marketing site that introduces the platform’s logistics services and value proposition.",
      "Designed to convert visitors into users, it communicates the platform’s key features through clean visuals, structured sections, and clear calls to action.",
      "Built with Next.js for optimal SEO performance and fast initial load, ensuring strong search visibility and a smooth first impression.",
    ],
    link: {
      label: "View Live Project",
      url: "https://halazoneco.com/",
    },
    images: [LandingPic1, LandingPic2, LandingPic3],
  },
  6: {
    title: "Dynamic_ApiDocBuilder",
    paragraphs: [
      "Dynamic DocsPlatform is a dynamic platform for creating, managing, and publishing API documentation.",
      "It helps developers build interactive and organized API docs with a simple and flexible workflow.",
    ],
    detailContent: [
      "Dynamic ApiDocBuilder is a full-featured platform for creating, organizing, and publishing interactive API documentation — built entirely on the frontend with Next.js.",
      "Developers can import Swagger/OpenAPI specs directly, with the platform automatically parsing and rendering endpoints into structured, navigable pages.",
      "Beyond auto-import, the platform supports manual component management, custom page creation, and role-based access — making it flexible for both small APIs and large multi-team projects.",
    ],
    link: {
      label: "View Project Source",
      url: "https://github.com/MobinaLalani/DynamicFrontEndDocsProject-Next.git",
    },
    images: [
      overViewImage,
      loginImage,
      componentManagment1,
      componentManagment2,
      importSwagger1,
      importSwagger2,
      importSwagger3,
      importSwagger4,
      createPage1,
      createPage2,
      createPage3,
      userOverView1,
    ],
  },
  7: {
    title: "My Calander",
    paragraphs: [
      "A personal productivity application that combines calendar management with habit tracking and daily planning.",
      "Users can plan their week, track daily tasks, and monitor habits — all within a clean and focused interface.",
    ],
    detailContent: [
      "My Calander is a personal productivity app designed to help users stay organized across daily, weekly, and long-term goals.",
      "The dashboard provides a high-level overview of upcoming events, active habits, and weekly progress — giving users instant clarity on their schedule and routines.",
      "The weekly planner lets users structure their week with scheduled tasks and recurring events, while the day sheet view breaks each day into focused time blocks for detailed planning.",
      "The habit tracker supports full CRUD operations — users can create custom habits, log daily completions, and track streaks over time to build consistent routines.",
    ],
    images: [DashboardImage, CalanderOverView, WeeklyPlan, DaySheet, HabitCrud],
  },
};