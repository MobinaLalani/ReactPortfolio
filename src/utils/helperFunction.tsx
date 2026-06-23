
import { projectDetails, ProjectSection } from "../data/projects";
export type { ProjectSection };

export function getProjectById(id: number): ProjectSection | null {
  return projectDetails[id] || null;
}
