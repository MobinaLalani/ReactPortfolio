'use client'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full   bg-base-content p-5">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* لوگو */}
        <Link
          to="/"
          className="text-3xl font-bold text-black FjallaOneّFont tracking-tight font-fjalla"
        >
          Mobina Portfolio
        </Link>

        <nav className="hidden md:flex flex-1 justify-center gap-6 text-sm text-foreground">
          <Link to="/projects" className="hover:text-primary">
            Projects
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="hidden md:block">
          <a
            href="/resumeFile/MobinaLalaniFrontendDeveloper.pdf"
            download="Mobina_Lalani_Frontend_Developer.pdf"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-primary/80 FjallaOneّFont transition font-fjalla"
          >
            Download Resume
          </a>
        </div>
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* منوی موبایل */}
      {isOpen && (
        <div className="md:hidden bg-background text-foreground w-full px-4 pb-4 flex flex-col gap-4">
          <Link
            to="/projects"
            className="hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/about"
            className="hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            download
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition font-fjalla text-center"
            onClick={() => setIsOpen(false)}
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
