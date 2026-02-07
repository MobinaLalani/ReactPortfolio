import React from "react";
import { useNavigate } from "react-router-dom";

interface ViewLayoutProps {
  content: React.ReactNode;
}

function BaseViewLayout({ content }: ViewLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {content}
    </div>
  );
}

export default BaseViewLayout;
