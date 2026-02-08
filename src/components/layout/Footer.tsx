export default function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-between">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            LinkedIn
          </a>
          <a href="mailto:email@example.com" className="hover:text-primary">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
