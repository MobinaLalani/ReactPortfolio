'use client'
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";
import {projects} from "@/data/projects";

// const projects = [
//   {
//     id: 1,
//     title: "URL Shortener",
//     description:
//       "This project is a responsive website that shows Shortly which ",
//     image: "/image/managementPic/AdminDashboard.png",
//     technologies: ["HTML", "CSS", "JavaScript"],
//     demoLink: "https://example.com",
//   },
//   {
//     id: 2,
//     title: "Task Manager",
//     description: "A simple task manager app built with React and TypeScript.",
//     image: "/image/managementPic/AdminDashboard.png",
//     technologies: ["React", "TypeScript", "TailwindCSS"],
//     demoLink: "https://example.com/task-manager",
//   },
//   {
//     id: 3,
//     title: "Portfolio Website",
//     description:
//       "My personal portfolio website to showcase projects and skills.",
//     image: "/image/managementPic/AdminDashboard.png",
//     technologies: ["HTML", "CSS", "JavaScript"],
//     demoLink: "https://example.com/portfolio",
//   },
//   {
//     id: 4,
//     title: "Blog Platform",
//     description: "A blogging platform built with Next.js and Markdown support.",
//     image: "/image/managementPic/AdminDashboard.png",
//     technologies: ["Next.js", "React", "Markdown"],
//     demoLink: "https://example.com/blog",
//   },
// ];


export default function ProjectIndex() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const prevProject = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? projects.length - visibleCount : prev - 1,
    );
  };

  const nextProject = () => {
    setCurrentIndex((prev) =>
      prev >= projects.length - visibleCount ? 0 : prev + 1,
    );
  };
 console.log("projects", projects);
  return (
    <div className="relative max-w-360 mx-auto mt-16 p-4">
      <div className="max-w-360 mx-auto  pb-4 mb-10">
        <span className="text-7xl font-bold justify-center  pb-3 flex">
          Projects
        </span>
      </div>
      <button
        onClick={prevProject}
        className="absolute -left-20 top-1/2 -translate-y-1/2 
             bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10"
      >
        <ArrowIcon className="h-11 w-11 rotate-90" />
      </button>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="w-1/3 flex-shrink-0 px-2">
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.img} // نگاشت img -> image
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextProject}
        className="absolute -right-20 top-1/2 -translate-y-1/2 
             bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10"
      >
        <ArrowIcon className="h-11 w-11 rotate-270" />
      </button>
    </div>
  );
}

