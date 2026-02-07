import React from "react";
import SkillCard from "./components/SkillCard";
        const GitIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 2 12l10 10 10-10L12 2Zm.9 6.2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm1.9 6.6h-1.4V11h1.4v3.8Zm-3.8 0H9.6V9.6H11v5.2Z" />
        </svg>
        );

        const JsIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3Zm10.5 14.8c.3.5.6.9 1.3.9.6 0 1-.3 1-.8 0-.6-.5-.8-1.3-1.2l-.4-.2c-1.2-.5-2-1.2-2-2.6 0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.4.9c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1 1l.4.2c1.4.6 2.2 1.3 2.2 2.8 0 1.6-1.3 2.5-3 2.5-1.7 0-2.8-.8-3.3-1.9l1.5-.8Z" />
        </svg>
        );

        const SassIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.3 2C7.4 2 3.6 6.1 3.6 10.5c0 3.3 2.3 5.2 3.8 5.2.6 0 .9-.1 1.2-.6.2-.3.6-1.1.7-1.4.1-.3.1-.4-.1-.6-.3-.2-.5-.6-.5-1 0-.4.2-.9.6-.9.4 0 .6.5.6 1.2 0 .8-.5 2.3-.5 3.1 0 .7.4 1.3 1.2 1.3 1.5 0 2.6-1.9 2.6-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.1-4.6 4.3 0 .9.3 1.5.7 2 .1.1.1.2.1.3-.1.4-.2.9-.2 1-.1.2-.2.3-.4.2-1.4-.6-2.3-2.4-2.3-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.9 0 3.5-2.2 6.4-5.3 6.4-1 0-2-.5-2.3-1.1l-.6 2.1c-.2.7-.8 1.6-1.2 2.2.9.3 1.8.4 2.8.4 4.8 0 8.6-3.9 8.6-8.7C20.9 6 17.1 2 12.3 2Z" />
        </svg>
        );


export default function SkillsIndex() {
  return (
    <section className="mt-16">
      {/* Title */}
      <div className="max-w-360 mx-auto border-b-2 pb-4 mb-10">
        <div className="flex justify-center items-end gap-2">
          <span className="FjallaOneّFont text-3xl font-bold">My</span>
          <span className="text-5xl font-bold">Skills</span>
        </div>
      </div>

      {/* Grid */}
      <div
        className="
          md:max-w-3xl  max-w-2xs mx-auto
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
          md:gap-6  justify-items-center gap-2
        "
      >
        <SkillCard name="Git" icon={<GitIcon />} />
        <SkillCard name="Javascript" icon={<JsIcon />} dark />
        <SkillCard name="Sass/Scss" icon={<SassIcon />} />
        <SkillCard name="Nest.Js" icon={<GitIcon />} />
        <SkillCard name="Storybook" icon={<GitIcon />} />
        <SkillCard name="Javascript" icon={<JsIcon />} dark />
        <SkillCard name="Sass/Scss" icon={<SassIcon />} />
        <SkillCard name="Nest.Js" icon={<GitIcon />} />
        <SkillCard name="Storybook" icon={<GitIcon />} />
      </div>
    </section>
  );
}
