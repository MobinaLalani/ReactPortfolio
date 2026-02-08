"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/data/projects";
import type { ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard";

// ===== Custom Project Sections =====
import HalazoneIndex from "@/components/section/project/Halazone";
import HalazMapIndex from "@/components/section/project/HalazoneMap/index";

type Props = { projects: Project[] };

export default function ProjectsClient({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const slug = activeProject.slug.toLowerCase();

  const projectSections = useMemo<Record<string, ReactNode>>(
    () => ({
      halazone: <HalazoneIndex />,
      halazmap: <HalazMapIndex />,
    }),
    [],
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ===== Project Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16 max-w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* ===== Project Content ===== */}
      <div className="mt-16 px-4 sm:px-8 lg:px-16 flex justify-center w-full">
        <div className="w-full max-w-4xl">
          {projectSections[slug] ?? (
            <div className="rounded-xl border border-border p-6 w-full">
              <h2 className="text-2xl font-semibold">{activeProject.title}</h2>

              <p className="mt-3 text-foreground/80">
                {activeProject.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full border text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {activeProject.repo && (
                  <a
                    href={activeProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Repo
                  </a>
                )}

                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
