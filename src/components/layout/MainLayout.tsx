import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import "../../style/App.css" ;
// import "./globals.css";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const location = useLocation();

  useEffect(() => {
    const shouldLock =
      location.pathname.startsWith("/projects/") ||
      location.pathname.startsWith("/project/");

    if (shouldLock) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  const shouldLock =
    location.pathname.startsWith("/projects/") ||
    location.pathname.startsWith("/project/");

  return (
    <div className="font-geist-mono antialiased overflow-x-hidden">
      
      <Navbar />
      {shouldLock ? (
        <div className="max-w-7xl mx-auto container">{children}</div>
      ) : (
        <SmoothScrollProvider>
          <div className="max-w-7xl mx-auto container">{children}</div>
        </SmoothScrollProvider>
      )}
      <Footer />
    </div>
  );
}
