"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ArrowIcon from "../../../components/ui/icons/ArrowIcon";
import { projects } from "../../../data/projects";

export default function ProjectIndex() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [loopIndex, setLoopIndex] = useState(3);
  const [animating, setAnimating] = useState(true);
  const pointerActiveRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);
  const swipeHandledRef = useRef(false);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;

    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const extendedProjects = useMemo(() => {
    const k = visibleCount;
    const head = projects.slice(0, k);
    const tail = projects.slice(-k);
    return [...tail, ...projects, ...head];
  }, [visibleCount]);

  
  useEffect(() => {
    setAnimating(false);
    setLoopIndex(visibleCount);
    requestAnimationFrame(() => setAnimating(true));
  }, [visibleCount]);

  const prevProject = () => {
    setAnimating(true);
    setLoopIndex((prev) => prev - 1);
  };

  const nextProject = () => {
    setAnimating(true);
    setLoopIndex((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-[1200px] mx-auto mt-10 px-4">
      {/* Title */}
      <div className="pb-4 mb-8">
        <h2 className="text-3xl md:text-6xl font-bold flex justify-center">
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
          className="flex select-none"
          style={{
            transform: `translateX(-${loopIndex * (100 / visibleCount)}%)`,
            transition: animating ? "transform 500ms ease-out" : "none",
            touchAction: "pan-y",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          onTransitionEnd={() => {
            const k = visibleCount;
            const total = projects.length;
            if (loopIndex >= total + k) {
              setAnimating(false);
              setLoopIndex((prev) => prev - total);
              requestAnimationFrame(() => setAnimating(true));
            } else if (loopIndex < k) {
              setAnimating(false);
              setLoopIndex((prev) => prev + total);
              requestAnimationFrame(() => setAnimating(true));
            }
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== "touch") return;
            pointerActiveRef.current = true;
            pointerStartXRef.current = e.clientX;
            pointerStartYRef.current = e.clientY ?? 0;
            swipeHandledRef.current = false;
            try {
              (e.currentTarget as HTMLDivElement).setPointerCapture(
                e.pointerId
              );
            } catch {}
          }}
          onPointerMove={(e) => {
            if (e.pointerType !== "touch") return;
            if (!pointerActiveRef.current || swipeHandledRef.current) return;
            const sx = pointerStartXRef.current;
            const sy = pointerStartYRef.current;
            if (sx == null || sy == null) return;
            const dx = e.clientX - sx;
            const dy = e.clientY - sy;
            if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
              if (dx > 0) {
                prevProject();
              } else {
                nextProject();
              }
              swipeHandledRef.current = true;
            }
          }}
          onPointerUp={(e) => {
            if (e.pointerType !== "touch") return;
            pointerActiveRef.current = false;
            swipeHandledRef.current = false;
            pointerStartXRef.current = null;
            pointerStartYRef.current = null;
            try {
              (e.currentTarget as HTMLDivElement).releasePointerCapture(
                e.pointerId
              );
            } catch {}
          }}
          onPointerCancel={() => {
            // فقط تاچ را مدیریت می‌کنیم؛ اگر pointercancel شد، وضعیت لمس ریست می‌شود
            pointerActiveRef.current = false;
            swipeHandledRef.current = false;
            pointerStartXRef.current = null;
            pointerStartYRef.current = null;
          }}
        >
          {extendedProjects.map((project, i) => (
            <div
              key={`${i}-${project.id}`}
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
