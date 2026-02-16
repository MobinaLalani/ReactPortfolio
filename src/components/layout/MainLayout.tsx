import React from "react";

import Navbar from "./Navbar";

import Footer from "./Footer";

import SmoothScrollProvider from "../../provider/SmoothScrollProvider";

import "../../style/App.css";

// import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="font-geist-mono antialiased overflow-x-hidden relative">
      {/* بک‌گراند پارالاکس */}

      <div
        className="fixed top-1/2 left-0 w-full h-[100px] md:h-[300px] bg-gradient-to-b 
        from-[#EBDBC1] 
        via-[#dab984]
        to-[#EBDBC1]
         z-1"
      />

      <Navbar />

      <SmoothScrollProvider>
        <div className="max-w-7xl mx-auto container relative">{children}</div>
      </SmoothScrollProvider>

      <Footer />
    </div>
  );
}
