// ===== Images =====
import HalazLogo from "../assets/image/halazProject/halazLogo.png";
import LandingPic1 from "../assets/image/Landing/Landing3.png";
import LandingPic2 from "../assets/image/Landing/Landing2.png";
import LandingPic3 from "../assets/image/Landing/Landing1.png";
import supervisor1 from "../assets/image/supervisor/supervisor1.png";
import supervisor2 from "../assets/image/supervisor/supervisor2.png";
import supervisor3 from "../assets/image/supervisor/supervisor3.png";
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
    technologies: ["React", "TypeScript", "Zustand" ,'leaflet', "TailwindCSS"],
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
];

export const projectDetails: Record<number, ProjectSection> = {
  1: {
    title: "Halazone – Management System",
    paragraphs: [
      "A centralized admin platform providing full system access and control over operational workflows, configurations, and data management.",
    ],
    images: [fleetPic, AdminDashboardPic, bundleListPic],
  },

  3: {
    title: "Halazone – Customer Panel",
    paragraphs: [
      "The customer panel provides users with a seamless experience for creating and managing orders.",
      "Users can select destinations, services, and track their shipments in real time.",
    ],
    images: [userInfo, wallet, parcelDetail],
  },

  4: {
    title: "Halazone – Supervisor App",
    paragraphs: [
      "The supervisor application is a PWA designed for monitoring microhub operations.",
      "It enables supervisors to manage fleets and shipments in real time.",
    ],
    images: [supervisor1, supervisor2, supervisor3],
  },

  5: {
    title: "Halazone – Landing Page",
    paragraphs: [
      "The landing page introduces Halazone’s services and features.",
      "It is optimized for performance, SEO, and user engagement.",
    ],
    link: {
  label: "View Live Project",
  url: "https://halazone.com",
}
,
    images: [LandingPic1, LandingPic2, LandingPic3],
  },
  2: {
    title: " Halazone - Map",
    paragraphs: [
      "A map-driven interface enabling dynamic rendering of zones, nodes, operational layers, and live vehicle tracking. Built with a focus on performance, responsiveness, and data clarity.",
    ],
    images: [mapPicpng, mapPic, BaseMap],
  },
};