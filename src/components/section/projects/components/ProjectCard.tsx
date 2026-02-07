import React from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData; // می‌تواند string یا import image باشد
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
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/projects/${id}`)}
      className="max-w-md border-2 border-black bg-white shadow-[6px_6px_0_0_#000] cursor-pointer"
    >
      {/* Image */}
      <div className="relative border-b-2 border-black h-48 w-full">
        <Image
          src={typeof image === "string" ? image : image.src} // اگر string بود مستقیم بده، اگر import بود از src استفاده کن
          alt={title}
          fill
          className="object-cover"
        />

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
