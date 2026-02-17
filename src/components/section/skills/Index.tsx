import React from "react";
import GitIcon from "../../ui/icons/GitIcon";
import SkillCard from "./components/SkillCard";
import JavaScript from "../../ui/icons/JavaScript";
import SassIcon from "../../ui/icons/SassIcon";
import NextJsIcon from "../../ui/icons/NextJsIcon";
import GraphQl from "../../ui/icons/GraphQl";
import TypeScript from "../../ui/icons/TypeScript";
import ReactIcon from "../../ui/icons/ReactIcon";
import FigmaIcon from "../../ui/icons/FigmaIcon";
import HtmlIcon from "../../ui/icons/HtmlIcon";
import TailwindIcon from "../../ui/icons/TailwindIcon";

export default function SkillsIndex() {
  return (
    <section className="mt-16">
      {/* Title */}
      <div className="max-w-360 mx-auto  border-b-2 border-black pb-4 mb-10">
        <div className="flex justify-center items-end gap-2">
          <span className="FjallaOneّFont text-3xl font-bold">My</span>
          <span className="text-5xl font-bold">Skills</span>
        </div>
      </div>

      {/* Grid */}
      <div
        className="
          md:max-w-3xl  max-w-2xs mx-auto
          grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
          md:gap-6  justify-items-center gap-2
        "
      >
        <SkillCard name="Git" icon={<GitIcon />} />
        <SkillCard name="Javascript" icon={<JavaScript />} dark />
        <SkillCard name="Sass/Scss" icon={<SassIcon />} />
        <SkillCard name="Next.Js" icon={<NextJsIcon />} />
        <SkillCard name="GraphQl" icon={<GraphQl />} />
        <SkillCard name="TypeScript" icon={<TypeScript />} dark />
        <SkillCard name="React" icon={<ReactIcon />} />
        <SkillCard name="Figma" icon={<FigmaIcon />} />
        <SkillCard name="Html/Css" icon={<HtmlIcon />} />
        <SkillCard name="Tailwind" icon={<TailwindIcon/>} />
      </div>
    </section>
  );
}
