'use client'
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ArrowIcon from "../../../components/ui/icons/ArrowIcon";
import {projects} from '../../../data/projects'

export default function ProjectIndex() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;

    if (window.innerWidth < 640) return 1; 
    if (window.innerWidth < 1024) return 2; 
    return 3; 
  };

  const visibleCount = getVisibleCount();

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

  return (
    <div className="relative max-w-[1200px] mx-auto mt-16 px-4">
      {/* Title */}
      <div className="pb-6 mb-10">
        <h2 className="text-4xl md:text-6xl font-bold flex justify-center">
          Projects
        </h2>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevProject}
        className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 
                   bg-gray-200 hover:bg-gray-300 p-3 rounded-full z-10"
      >
        <ArrowIcon className="h-8 w-8 rotate-90" />
      </button>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                w-full
                sm:w-1/2
                lg:w-1/3
                flex-shrink-0
                px-3
              "
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.img}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={nextProject}
        className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 
                   bg-gray-200 hover:bg-gray-300 p-3 rounded-full z-10"
      >
        <ArrowIcon className="h-8 w-8 rotate-[270deg]" />
      </button>
    </div>
  );
}
