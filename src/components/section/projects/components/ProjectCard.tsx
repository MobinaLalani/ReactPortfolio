import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string; // در React فقط string (url یا public path)
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
      className="max-w-md border-2 border-black bg-white shadow-[6px_6px_0_0_#000] cursor-pointer"
    >
      {/* Image */}
      <div className="relative border-b-2 border-black h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Gray Overlay */}
        <div className="absolute inset-0 bg-gray-900/40" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="border border-black px-3 py-1 text-xs font-medium bg-gray-100"
            >
              {tech}
            </span>
          ))}
        </div>

        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // جلوگیری از navigate کارت
            className="inline-block text-sm font-semibold underline"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
