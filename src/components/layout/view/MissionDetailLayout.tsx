import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../../components/icons/svg/backArrowIcon.svg";
interface ViewLayoutProps {

  content:React.ReactNode;
  Title?: any;
  mapComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
}

function MissionDetailLayout({
  content,

  Title,
  bottomComponent,
}: ViewLayoutProps) {
  return (
    <div className="w-full h-screen flex flex-col relative p-6 overflow-hidden">

      <div className="pt-[70px] lg:pt-[40] text-2xl mb-4">
        <span className="font-bold pr-1 text-lg md:text-xl lg:text-2xl">
          {Title}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">{content}</div>
      {bottomComponent && <div className="w-full">{bottomComponent}</div>}
    </div>
  );
}

export default MissionDetailLayout;
