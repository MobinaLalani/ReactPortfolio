"use client";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const animateScrollTo = (targetY: number, duration = 650) => {
    const startY = window.scrollY || window.pageYOffset;
    const delta = targetY - startY;
    const startTime = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + delta * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header") as HTMLElement | null;
    const offset = header?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - (offset + 8);
    animateScrollTo(top);
    el.classList.add("section-pulse");
    setTimeout(() => el.classList.remove("section-pulse"), 1200);
  };
  const handleNavClick = (id: "projects" | "about" | "contact") => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 50);
    } else {
      scrollToSection(id);
    }
  };

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
          <button
            className="hover:text-primary"
            onClick={() => handleNavClick("projects")}
            type="button"
          >
            Projects
          </button>
          <button
            className="hover:text-primary"
            onClick={() => handleNavClick("about")}
            type="button"
          >
            About
          </button>
          <button
            className="hover:text-primary"
            onClick={() => handleNavClick("contact")}
            type="button"
          >
            Contact
          </button>
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
        <div className="md:hidden bg-background text-foreground w-full px-4 pb-4 flex flex-col gap-4 mt-5">
          <button
            className="text-left hover:text-primary"
            onClick={() => {
              setIsOpen(false);
              handleNavClick("projects");
            }}
          >
            Projects
          </button>
          <button
            className="text-left hover:text-[#968c7c]"
            onClick={() => {
              setIsOpen(false);
              handleNavClick("about");
            }}
          >
            About
          </button>
          <button
            className="text-left hover:text-[#968c7c]"
            onClick={() => {
              setIsOpen(false);
              handleNavClick("contact");
            }}
          >
            Contact
          </button>
          <a
            href="/resume.pdf"
            download
            className="bg-[#968c7c] text-white px-4 py-2 rounded-md hover:bg-[#968c7c]/80 transition font-fjalla text-center"
            onClick={() => setIsOpen(false)}
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
