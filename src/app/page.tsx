const skills = ["typescript", "react", "next.js", "java", "lua", "html/css"];
const interests = ["open source", "gaming", "web development"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-[#4ade80]/20">
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <header className="mb-12 sm:mb-16 animate-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-base font-medium">millen</h1>
            <span className="text-[#666] text-sm">northern ireland</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#666]">
            <span className="text-[#e5e5e5]">home</span>
            <a href="/projects" className="hover:text-[#e5e5e5] transition-colors link-hover">projects</a>
            <span className="text-[#333]">|</span>
            <a href="mailto:millensh@outlook.com" className="hover:text-[#e5e5e5] transition-colors link-hover">email</a>
            <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="hover:text-[#e5e5e5] transition-colors link-hover">github</a>
          </nav>
        </header>

        <div className="space-y-10 sm:space-y-12 text-sm">
          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-1">
            <span className="text-[#666]">about</span>
            <p className="text-[#999] leading-relaxed">
              second-year computer science student at ulster university. passionate about building
              web applications and exploring new technologies. seeking a software engineering
              placement for september 2026.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-2">
            <span className="text-[#666]">now</span>
            <div className="text-[#999] leading-relaxed">
              <p>building side projects and learning new frameworks.</p>
              <p className="mt-2">currently exploring rust and systems programming.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-3">
            <span className="text-[#666]">education</span>
            <div>
              <p className="text-[#e5e5e5]">ulster university</p>
              <p className="text-[#666]">bsc computer science · 2024 - 2028</p>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-4">
            <span className="text-[#666]">skills</span>
            <p className="text-[#999]">{skills.join(", ")}</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-5">
            <span className="text-[#666]">interests</span>
            <p className="text-[#999]">{interests.join(", ")}</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-x-8 animate-in delay-6">
            <span className="text-[#666]">links</span>
            <div className="flex flex-col gap-1">
              <a href="https://linkedin.com/in/singhmillen" target="_blank" rel="noopener noreferrer" className="text-[#e5e5e5] hover:text-[#4ade80] transition-colors link-hover w-fit">linkedin</a>
              <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="text-[#e5e5e5] hover:text-[#4ade80] transition-colors link-hover w-fit">github</a>
              <a href="https://twitter.com/m1lles05" target="_blank" rel="noopener noreferrer" className="text-[#e5e5e5] hover:text-[#4ade80] transition-colors link-hover w-fit">twitter</a>
              <a href="/cv.pdf" download="Millen_CV.pdf" className="text-[#e5e5e5] hover:text-[#4ade80] transition-colors link-hover w-fit">download cv</a>
            </div>
          </section>
        </div>

        <footer className="mt-16 sm:mt-20 pt-8 border-t border-[#1a1a1a] text-xs text-[#444] animate-in delay-7">
          millen.sh
        </footer>
      </div>
    </main>
  );
}
