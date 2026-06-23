import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoSlider, {
  ImageItem,
} from "../../components/ui/photoSlider/PhotoSlider";
import { getProjectById } from "../../utils/helperFunction";
import { projects } from "../../data/projects";

const ProjectIndex = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const id = Number(projectId);
  if (isNaN(id)) return <div>Invalid Project ID</div>;

  const detail = getProjectById(id);
  const project = projects.find((p) => p.id === id);

  if (!detail || !project) return <div>Project not found</div>;

  // unchanged — same mapping as before
  const images: ImageItem[] = detail.images.map((img, idx) => ({
    src: typeof img === "string" ? img : img,
    title: detail.title,
    description: detail.paragraphs[idx] || detail.paragraphs[0],
    link: detail.link,
  }));

  const links = [
    project.repo ? { label: "GitHub", url: project.repo } : null,
    project.demo ? { label: "Live Demo", url: project.demo } : null,
    detail.link ? { label: detail.link.label, url: detail.link.url } : null,
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <div className="min-h-screen ">
      {/* Back button */}
      <div className="px-4 md:px-8 py-4 border-b-2 border-black">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-1.5 border-2 border-black bg-white
                     font-bold text-sm shadow-[3px_3px_0_0_#000]
                     hover:-translate-x-[1px] hover:-translate-y-[1px]
                     hover:shadow-[4px_4px_0_0_#000] transition"
        >
          ← Back
        </button>
      </div>

      {/* Main layout: slider + info side by side on desktop */}
      <div className="flex flex-col xl:flex-row gap-0 xl:gap-0 ">
        {/* ── Slider (unchanged behaviour) ── */}
        <div className="flex-1 min-w-0 py-6 border-b-2 xl:border-b-0 xl:border-r-2 border-black">
          <PhotoSlider images={images} />
        </div>

        {/* ── Info Panel ── */}
        <div
          className="
            w-full xl:w-[360px] shrink-0
            flex flex-col gap-6
            px-6 md:px-8 py-8
            xl:overflow-y-auto xl:max-h-[calc(100vh-56px)] xl:sticky xl:top-[56px]
          "
        >
          {/* Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black leading-tight mb-1">
              {project.title}
            </h1>
            <div className="w-10 h-[3px] bg-black mt-2" />
          </div>

          {/* Description + Paragraphs */}
          <div className="space-y-3">
            {[project.description, ...detail.paragraphs]
              .filter(Boolean)
              .map((p, i) => (
                <p key={i} className="text-sm text-gray-700 leading-6">
                  {p}
                </p>
              ))}
          </div>

          {/* Tech Stack */}
          {project.technologies.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-bold border-2 border-black
                               bg-white shadow-[2px_2px_0_0_#000]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-auto flex flex-col gap-2 pt-4 border-t-2 border-black">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3
                             border-2 border-black bg-black text-white
                             font-bold text-sm shadow-[4px_4px_0_0_#444]
                             hover:translate-x-[2px] hover:translate-y-[2px]
                             hover:shadow-[2px_2px_0_0_#444] transition"
                >
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectIndex;
