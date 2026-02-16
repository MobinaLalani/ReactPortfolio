import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header") as HTMLElement | null;
    const offset = header?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - (offset + 8);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const goToContact = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("contact"), 60);
    } else {
      scrollToSection("contact");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 w-full bg-[#DCC9A7] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-extrabold text-black">Let’s work together</div>
            <div className="text-sm text-gray-800">Open to collaborations and new opportunities</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToContact}
              className="px-4 py-2 rounded-md border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#000] transition"
            >
              Contact me
            </button>
            <a
              href="mailto:mobinalalani529@gmail.com"
              className="px-4 py-2 rounded-md border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#000] transition"
            >
              Email
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black">
          <p>© {year} Mobina Lalani. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/MobinaLalani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.21 11.44c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.41 3-.41s2.04.14 3 .41c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.66-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mobina-mohammadhoseinilalani-213632282/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8ZM8 8h3.8v2.04h.05c.53-1 1.83-2.05 3.77-2.05C20.08 8 22 10 22 14.14V23h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23H8V8Z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:mobinalalani529@gmail.com"
              className="hover:text-primary flex items-center gap-2"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </svg>
              Email
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1 rounded-md border-2 border-black bg-white text-black shadow-[3px_3px_0_0_#000] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#000] transition"
              aria-label="Back to top"
            >
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
