// ProjectIndex.tsx
import React from "react";
import PhotoSlider, {
  ImageItem,
} from "@/components/ui/photoSlider/PhotoSlider";
import { getProjectById } from "@/utils/helperFunction";

type ProjectIndexProp = {
  projectId: number;
};

const ProjectIndex = ({ projectId }: ProjectIndexProp) => {
  const project = getProjectById(projectId);

  if (!project) return <div>Project not found</div>;

  // تبدیل project.images به ImageItem
  const images: ImageItem[] = project.images.map((img, idx) => ({
    src: typeof img === "string" ? img : img.src, // import یا string
    title: project.title,
    description: project.paragraphs[idx] || project.paragraphs[0], // هر تصویر یک پاراگراف یا پاراگراف اول
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <PhotoSlider images={images} />
    </div>
  );
};

export default ProjectIndex;
