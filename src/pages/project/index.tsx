import React from "react";
import { useParams } from "react-router-dom"; // ✅ برای گرفتن پارامتر URL
import PhotoSlider, {
  ImageItem,
} from "../../components/ui/photoSlider/PhotoSlider";
import { getProjectById } from "../../utils/helperFunction";

const ProjectIndex = () => {
  const { projectId } = useParams<{ projectId: string }>(); // projectId از URL میاد

  const id = Number(projectId); // تبدیل به عدد
  console.log("projectId", projectId);
  if (isNaN(id)) return <div>Invalid Project ID</div>;

  const project = getProjectById(id);

  if (!project) return <div>Project not found</div>;

  // تبدیل project.images به ImageItem
  const images: ImageItem[] = project.images.map((img, idx) => ({
    src: typeof img === "string" ? img : img, // import یا string
    title: project.title,
    description: project.paragraphs[idx] || project.paragraphs[0], // هر تصویر یک پاراگراف یا پاراگراف اول
  }));

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 ">{project.title}</h1>
      <PhotoSlider images={images} />
    </>
  );
};

export default ProjectIndex;
