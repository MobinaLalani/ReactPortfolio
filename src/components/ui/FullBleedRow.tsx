import React from "react";

type Props = {
  children: React.ReactNode;
  backgroundClassName?: string;
};

export default function FullBleedRow({
  children,
  backgroundClassName = "",
}: Props) {
  return (
    <div className="relative w-[99%]">
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10 pointer-events-none ${backgroundClassName}`}
      />
      <div className="relative max-w-7xl mx-auto px-6">{children}</div>
    </div>
  );
}
