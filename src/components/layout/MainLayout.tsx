import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import "../../style/App.css" ;
// import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="font-geist-mono antialiased overflow-x-hidden">
      <Navbar />
      <SmoothScrollProvider>
        <div className="py-18 max-h-[97vh]">{children}</div>
      </SmoothScrollProvider>
      <Footer />
    </div>
  );
}
