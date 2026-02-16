import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  demoLink,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${id}`)}
      className="max-w-md h-[420px] border-2 border-black bg-white
             shadow-[6px_6px_0_0_#000] cursor-pointer flex flex-col
             transition hover:translate-x-[2px]
             hover:translate-y-[2px]
             hover:shadow-[4px_4px_0_0_#000]"
    >
      {/* Image */}
      <div className="relative border-b-2 border-black h-48 w-full overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/40" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        <div className="relative max-h-[72px] overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="
                  border border-black
                  rounded-sm
                  px-3 py-1
                  text-xs font-medium
                  bg-gray-100
                  whitespace-nowrap
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Fade Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Demo Link */}
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block text-sm font-semibold underline mt-auto"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
