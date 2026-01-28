import Link from "next/link";

const projects = [
  {
    title: "portfolio",
    description: "personal site built with next.js 16, react 19, and typescript",
    tech: ["next.js", "react", "typescript", "tailwind"],
    link: "https://millen.sh",
    github: "https://github.com/milnee/Portfolio",
    date: "jan 2026",
  },
  {
    title: "minecraft utils",
    description: "custom server plugins with /speed, /setspawn, /giveaways and database integration",
    tech: ["java", "mysql", "mongodb", "spigot"],
    github: "https://github.com/milnee/Utils",
    date: "dec 2025",
  },
  {
    title: "fivem maxammo",
    description: "qbcore script for fivem servers with permission-based ammo refill",
    tech: ["lua", "qbcore", "fivem"],
    github: "https://github.com/milnee/MaxAmmo",
    date: "nov 2025",
  },
  {
    title: "fivem maxarmor",
    description: "qbcore script for armor management with player targeting",
    tech: ["lua", "qbcore", "fivem"],
    github: "https://github.com/milnee/MaxArmor",
    date: "nov 2025",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-[#4ade80]/20">
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <header className="mb-12 sm:mb-16 animate-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-base font-medium">millen</h1>
            <span className="text-[#666] text-sm">northern ireland</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#666]">
            <Link href="/" className="hover:text-[#e5e5e5] transition-colors link-hover">home</Link>
            <span className="text-[#e5e5e5]">projects</span>
            <span className="text-[#333]">|</span>
            <a href="mailto:millensh@outlook.com" className="hover:text-[#e5e5e5] transition-colors link-hover">email</a>
            <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="hover:text-[#e5e5e5] transition-colors link-hover">github</a>
          </nav>
        </header>

        <div className="space-y-10 sm:space-y-12 text-sm">
          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-1">
            <span className="text-[#666]">projects</span>
            <p className="text-[#999]">
              a collection of personal and university projects
            </p>
          </section>

          {projects.map((project, i) => (
            <section key={project.title} className={`grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-${Math.min(i + 2, 7)}`}>
              <span className="text-[#666]">{project.date}</span>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[#e5e5e5] font-medium">{project.title}</h2>
                  <div className="flex gap-2">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#4ade80] transition-colors">
                        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#4ade80] transition-colors">
                        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-[#999] mb-2">{project.description}</p>
                <p className="text-[#555]">{project.tech.join(", ")}</p>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 sm:mt-20 pt-8 border-t border-[#1a1a1a] text-xs text-[#444] animate-in delay-7">
          millen.sh
        </footer>
      </div>
    </main>
  );
}
