import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import clsx from "clsx";

type Props = {
  project: Project;
  onClick?: (project: Project) => void;
  isActive?: boolean;
};

export default function ProjectCard({ project, onClick, isActive }: Props) {
  function generateDiagonalMask(split: number) {
    return `linear-gradient(
      135deg,
      rgba(0,0,0,0) ${split}%,
      rgba(0,0,0,0.85) ${split}%
    )`;
  }

  const split = useMotionValue(50);
  const splitSpring = useSpring(split, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  const maskImage = useTransform(splitSpring, (v) => generateDiagonalMask(v));

  const card = (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className={clsx(
        "group relative h-[300px] w-[300px] bg-[#cac2b7] overflow-hidden rounded-[18px] cursor-pointer flex items-center justify-center transition-all duration-300",
        isActive ? "ring-2 ring-primary shadow-2xl scale-[1.04]" : "shadow-lg",
      )}
      onClick={onClick ? () => onClick(project) : undefined}
    >
      {/* Image */}
      <img
        src={project.img}
        alt={project.title}
        className="object-cover p-4 w-full h-full"
      />

      {/* Active overlay */}
      {isActive && (
        <div className="absolute inset-0 rounded-[18px] bg-primary/10 pointer-events-none" />
      )}

      {/* Hover mask */}
      <motion.div
        className="absolute inset-0 bg-white/20 backdrop-blur-md"
        style={{ WebkitMaskImage: maskImage, maskImage }}
        onHoverStart={() => split.set(0)}
        onHoverEnd={() => split.set(50)}
      >
        <motion.div
          className="absolute inset-0 z-10 flex items-end p-4"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="leading-6 mb-8 text-foreground">
            {project.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  if (onClick) return card;

  return <Link to={`/projects/${project.slug}`}>{card}</Link>;
}
