import React from "react";
import { useNavigate } from "react-router-dom";

interface ViewLayoutProps {
  mapComponent: React.ReactNode;
  bottomComponent?: React.ReactNode;
}

function HomeViewLayout({ mapComponent, bottomComponent }: ViewLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col relative">
      {bottomComponent && (
        <div className="absolute bottom-0 left-0 w-full z-3">
          {bottomComponent}
        </div>
      )}
      <div className="relative w-full h-full z-2 ">{mapComponent}</div>
    </div>
  );
}

export default HomeViewLayout;
