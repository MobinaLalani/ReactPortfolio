import React from "react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  dark?: boolean;
};

function SkillCard({ name, icon, dark }: Skill) {
  return (
    <div
      className={`
        w-28 h-28 md:w-32 md:h-32
        border-2  rounded-lg
        flex flex-col items-center justify-center gap-2
        transition
        ${dark ? "bg-black text-white" : "bg-card text-foreground"}
        hover:scale-105
      `}
    >
      <div className="w-12 h-12">{icon}</div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export default SkillCard;
