"use client";

import { useState, useEffect } from "react";

type Modal = "education" | "experience" | "projects" | "about" | "minecraft" | "fivem" | "webdev" | "cv" | null;

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise">
      <div className="fixed inset-0 bg-grid" />
      <div className="fixed inset-0 bg-gradient-radial" />
      <div className="fixed inset-0 bg-gradient-radial-bottom" />

      <div className="fixed top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-orb-1" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-orb-2" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-orb-3" />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-6">
            <div className="glass glass-hover rounded-2xl p-6 text-center border-gradient animate-slide-up hover-glow">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-3xl font-bold text-black animate-float animate-glow-pulse">
                MS
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-shine">Millen Singh</h1>
              <p className="text-accent font-mono text-sm mt-1">Software Developer</p>
              <div className="h-px w-12 mx-auto my-4 bg-gradient-to-r from-transparent via-accent to-transparent animate-gradient" />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setModal("about")}
                  className="text-sm text-muted hover:text-accent transition-colors hover-lift"
                >
                  About Me
                </button>
                <span className="text-card-border">|</span>
                <button
                  onClick={() => setModal("cv")}
                  className="text-sm text-accent hover:text-accent-light transition-colors hover-lift flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  View CV
                </button>
              </div>
            </div>

            <div className="glass glass-hover rounded-2xl p-6 animate-slide-up-delay-1 hover-glow">
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm group-hover:bg-accent/20 group-hover:scale-110 transition-all">@</span>
                  <div className="flex flex-col min-w-0">
                    <a href="mailto:singhmillen@gmail.com" className="text-sm hover:text-accent transition-colors truncate">singhmillen@gmail.com</a>
                    <a href="mailto:singh-m21@ulster.ac.uk" className="text-xs text-muted hover:text-accent transition-colors truncate">singh-m21@ulster.ac.uk</a>
                  </div>
                </div>
                <a href="tel:+447404225469" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">+44 7404225469</span>
                </a>
                <a href="https://www.google.com/maps/search/Derry+Londonderry+UK" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">Derry~Londonderry, UK</span>
                </a>
              </div>
            </div>

            <div className="glass glass-hover rounded-2xl p-6 animate-slide-up-delay-2 hover-glow">
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Connect</h2>
              <div className="space-y-3">
                <a href="https://www.linkedin.com/in/singhmillen/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] group-hover:scale-110 group-hover:bg-[#0A66C2]/30 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">LinkedIn</span>
                </a>
                <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">GitHub</span>
                </a>
                <a href="https://twitter.com/m1lles05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 group-hover:bg-white/20 transition-all">
                    𝕏
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">Twitter</span>
                </a>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setModal("education")}
                className="glass glass-hover rounded-2xl p-5 text-left glow-line animate-slide-up-delay-1 hover-glow card-3d"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent animate-bounce-subtle">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">Education</span>
                </div>
                <p className="font-medium">BSc Computer Science</p>
                <p className="text-sm text-muted">Ulster University</p>
                <p className="text-xs text-accent mt-2 font-mono">2024 - 2028 • 63.5%</p>
              </button>

              <button
                onClick={() => setModal("experience")}
                className="glass glass-hover rounded-2xl p-5 text-left glow-line animate-slide-up-delay-2 hover-glow card-3d"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent animate-bounce-subtle stagger-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">Experience</span>
                </div>
                <p className="font-medium">Grow Intern</p>
                <p className="text-sm text-muted">Anywho LTD</p>
                <p className="text-xs text-accent mt-2 font-mono">Jul 2024 - Jul 2025</p>
              </button>

              <a
                href="https://github.com/milnee"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover rounded-2xl p-5 glow-line animate-slide-up-delay-3 hover-glow card-3d"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent animate-bounce-subtle stagger-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">Activity</span>
                </div>
                <div className="grid grid-cols-13 gap-[3px]">
                  {Array.from({ length: 91 }).map((_, i) => {
                    const pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,3,3,2,0,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0];
                    const level = pattern[i] || 0;
                    const colors = ["bg-white/5", "bg-accent/30", "bg-accent/60", "bg-accent"];
                    return <div key={i} className={`aspect-square rounded-sm ${colors[level]} hover:scale-150 transition-transform`} />;
                  })}
                </div>
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 glass glass-hover rounded-2xl p-5 animate-slide-up-delay-3 hover-glow">
                <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "Java", "Lua", "HTML/CSS"].map((tech, i) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-accent/10 text-sm font-mono text-accent border border-accent/20 hover:bg-accent/20 hover:scale-105 hover:border-accent/40 transition-all cursor-default"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass glass-hover rounded-2xl p-5 animate-slide-up-delay-4 hover-glow">
                <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Agile", "SQL", "APIs"].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-mono text-muted hover:bg-white/10 hover:text-foreground transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border-gradient animate-slide-up-delay-4 border-beam">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Projects</h2>
                <button onClick={() => setModal("projects")} className="text-sm text-accent hover:underline underline-offset-4 hover-lift">
                  View All
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <button onClick={() => setModal("minecraft")} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all text-left group hover-lift">
                  <p className="font-medium group-hover:text-accent transition-colors">Minecraft Plugins</p>
                  <p className="text-xs text-muted mt-1 font-mono">Java, MySQL, MongoDB</p>
                  <p className="text-xs text-muted/60 mt-3 leading-relaxed">Custom server plugins for gameplay enhancement</p>
                </button>
                <button onClick={() => setModal("fivem")} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all text-left group hover-lift">
                  <p className="font-medium group-hover:text-accent transition-colors">FiveM Scripts</p>
                  <p className="text-xs text-muted mt-1 font-mono">Lua, QBCore Framework</p>
                  <p className="text-xs text-muted/60 mt-3 leading-relaxed">Server scripts with commands & permissions</p>
                </button>
                <button onClick={() => setModal("webdev")} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all text-left group hover-lift">
                  <p className="font-medium group-hover:text-accent transition-colors">Web Development</p>
                  <p className="text-xs text-muted mt-1 font-mono">HTML, CSS</p>
                  <p className="text-xs text-muted/60 mt-3 leading-relaxed">Responsive websites with modern design</p>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 glass glass-hover rounded-2xl p-5 animate-slide-up-delay-5 hover-glow">
                <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Strengths</h2>
                <div className="flex flex-wrap gap-2">
                  {["Problem-solving", "Adaptability", "Proactive Learning", "Attention to Detail", "Teamwork"].map((s, i) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-muted/80 hover:bg-white/10 hover:text-foreground transition-all cursor-default"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass glass-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center border-gradient animate-slide-up-delay-5 hover-glow animate-glow-pulse">
                <p className="text-xs text-muted uppercase tracking-wider">Seeking Placement</p>
                <p className="text-accent font-semibold text-lg mt-1 gradient-text">September 2026</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={toggleTheme}
          className="glass glass-hover rounded-full px-4 py-2 flex items-center gap-2 text-sm text-muted hover:text-foreground transition-all hover-glow"
        >
          {theme === "dark" ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              Light
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              Dark
            </>
          )}
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/90" />
          <div
            className={`relative rounded-2xl p-8 w-full animate-fade-in-scale max-h-[90vh] overflow-auto smooth-scroll ${modal === "cv" ? "max-w-4xl glass-solid" : modal === "projects" ? "max-w-3xl glass border-gradient" : "max-w-lg glass border-gradient"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:rotate-90 flex items-center justify-center text-muted hover:text-foreground transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            {modal === "about" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-shine">About Me</h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>Second-year Computer Science student seeking a software engineering placement for September 2026.</p>
                  <p>Strong foundation in Java, SQL and backend systems through projects and startup experience. Motivated to contribute to real-world development teams while building professional engineering skills.</p>
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-medium text-foreground mb-3">Interests</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Analytical & Testing - Troubleshooting and resolving issues</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Game Development - Custom Minecraft plugins</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Fitness - Discipline and goal-oriented mindset</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {modal === "education" && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-shine">Education</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg">Ulster University</h3>
                    <p className="text-accent">BSc (Hons) Computer Science with DPP</p>
                    <p className="text-sm text-muted">Derry~Londonderry Campus • 2024 – 2028</p>
                    <p className="text-accent font-mono mt-2">Overall: 63.5% (2:1)</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-3"><p className="font-medium">Year 2 Semester 1</p><span className="text-accent text-sm font-mono">61%</span></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">User Experience</span><span>61%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">OOP</span><span>57%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Mobile App Dev</span><span>64%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Professional Dev</span><span className="text-yellow-500">Awaiting</span></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-medium mb-3">Year 2 Semester 2</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Cloud Computing</span><span className="text-yellow-500">Awaiting</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Networks & Security</span><span className="text-yellow-500">Awaiting</span></div>
                      <div className="flex justify-between col-span-2 hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Algorithms & Data Structures</span><span className="text-yellow-500">Awaiting</span></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-3"><p className="font-medium">Year 1 Results</p><span className="text-accent text-sm font-mono">63.5%</span></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Software Dev I</span><span>65%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Systems Analysis</span><span>61%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Software Dev II</span><span>72%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Database Systems</span><span>73%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Hardware & OS</span><span>67%</span></div>
                      <div className="flex justify-between hover:bg-white/5 px-2 py-1 rounded transition-colors"><span className="text-muted">Mathematics</span><span>43%</span></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modal === "experience" && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-shine">Experience</h2>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg">Grow Intern</h3>
                      <p className="text-accent">Anywho LTD</p>
                    </div>
                    <span className="text-sm text-muted font-mono">Jul 2024 - Jul 2025</span>
                  </div>
                  <ul className="space-y-3 text-muted leading-relaxed">
                    <li className="flex gap-3 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Worked in a startup environment contributing to product support and platform growth</li>
                    <li className="flex gap-3 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Communicated directly with users through Discord, Slack and social platforms to gather feedback</li>
                    <li className="flex gap-3 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Supported open-source projects by helping build customer websites and contributing creative assets</li>
                    <li className="flex gap-3 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Developed teamwork, communication and adaptability skills</li>
                  </ul>
                </div>
              </>
            )}

            {modal === "projects" && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-shine">All Projects</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="border-l-2 border-accent pl-4 hover:border-accent-light transition-colors">
                    <h3 className="font-medium text-lg mb-1">Minecraft Plugins</h3>
                    <p className="text-accent text-sm mb-3 font-mono">Java, MySQL, MongoDB</p>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Custom server plugins</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>/speed, /setspawn, /giveaways</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>MySQL & MongoDB integration</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Improved server performance</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-accent pl-4 hover:border-accent-light transition-colors">
                    <h3 className="font-medium text-lg mb-1">FiveM Scripts</h3>
                    <p className="text-accent text-sm mb-3 font-mono">Lua, QBCore</p>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>QBCore framework scripts</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>/maxammo, /armour commands</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Permission checks</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Event handling & client-side</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-accent pl-4 hover:border-accent-light transition-colors">
                    <h3 className="font-medium text-lg mb-1">Web Development</h3>
                    <p className="text-accent text-sm mb-3 font-mono">HTML, CSS</p>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Responsive websites</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Navigation, forms, buttons</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>CSS styling & layouts</li>
                      <li className="flex gap-2 hover:translate-x-1 transition-transform"><span className="text-accent">-</span>Improved UX design</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {modal === "minecraft" && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-shine">Minecraft Plugin Development</h2>
                <p className="text-accent font-mono mb-4">Java, MySQL, MongoDB</p>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>Designed and developed custom server plugins using Java to enhance gameplay and server management for online Minecraft communities.</p>
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Implemented commands such as /speed, /setspawn, /giveaways with configuration support via config.yml</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Integrated MySQL and MongoDB databases for persistent data storage</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Improved server stability, performance and player experience through structured code and testing</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Delivered plugins improving gameplay functionality and server management</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {modal === "fivem" && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-shine">FiveM Script Development</h2>
                <p className="text-accent font-mono mb-4">Lua, QBCore Framework</p>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>Developed Lua scripts using QBCore framework for FiveM servers, creating custom commands and gameplay features.</p>
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>/maxammo - refills ammunition based on player state</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>/armour - grants armour to players with permission checks</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>/maxarmour - grants max armour with logic to check current armour and support for targeting other players</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Gained hands-on experience with event handling and client-side interaction in QBCore framework</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {modal === "webdev" && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-shine">Web Development</h2>
                <p className="text-accent font-mono mb-4">HTML, CSS</p>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>Built responsive websites during A-Levels coursework, focusing on user experience and modern design principles.</p>
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Built responsive websites using HTML and CSS</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Added interactive features: navigation menus, forms, buttons, media embedding</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Styled layouts with CSS for colours, fonts, and consistency</li>
                      <li className="flex gap-2 hover:translate-x-2 transition-transform"><span className="text-accent">-</span>Improved UX with easy navigation and clickable links</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {modal === "cv" && (
              <div className="max-w-none -m-2">
                <div className="bg-gradient-to-br from-accent/20 via-accent/5 to-transparent rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl font-bold text-black shrink-0">
                      MS
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">Millen Singh</h2>
                      <p className="text-accent font-mono text-sm mt-1">Software Developer</p>
                      <p className="text-muted text-sm mt-2 leading-relaxed">
                        Second-year Computer Science student seeking a software engineering placement for September 2026.
                      </p>
                    </div>
                    <div className="text-right text-sm space-y-2 shrink-0">
                      <a href="tel:+447404225469" className="flex items-center gap-2 text-muted hover:text-accent transition-colors justify-end">
                        <span>+44 7404225469</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      </a>
                      <a href="mailto:singh-m21@ulster.ac.uk" className="flex items-center gap-2 text-muted hover:text-accent transition-colors justify-end">
                        <span>singh-m21@ulster.ac.uk</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </a>
                      <div className="flex gap-3 justify-end pt-1">
                        <a href="https://linkedin.com/in/singhmillen" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/30 transition-all">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-foreground hover:bg-white/20 transition-all">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-5">
                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Experience</h3>
                      </div>
                      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Grow Intern</p>
                            <p className="text-accent text-sm">Anywho LTD</p>
                          </div>
                          <span className="text-xs text-muted bg-white/5 px-2 py-1 rounded">Jul 2024 – Jul 2025</span>
                        </div>
                        <ul className="text-sm text-muted space-y-1.5 mt-3">
                          <li className="flex gap-2"><span className="text-accent">›</span>Startup environment: product support and platform growth</li>
                          <li className="flex gap-2"><span className="text-accent">›</span>User communication via Discord, Slack, social platforms</li>
                          <li className="flex gap-2"><span className="text-accent">›</span>Open-source contributions and customer website support</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Projects</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <p className="font-medium">Minecraft Plugins</p>
                            <span className="text-xs text-muted ml-auto">Java, MySQL, MongoDB</span>
                          </div>
                          <ul className="text-sm text-muted space-y-1">
                            <li className="flex gap-2"><span className="text-accent">›</span>Custom server plugins with /speed, /setspawn, /giveaways</li>
                            <li className="flex gap-2"><span className="text-accent">›</span>Database integration for persistent data storage</li>
                          </ul>
                        </div>
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            <p className="font-medium">FiveM Scripts</p>
                            <span className="text-xs text-muted ml-auto">Lua, QBCore</span>
                          </div>
                          <ul className="text-sm text-muted space-y-1">
                            <li className="flex gap-2"><span className="text-accent">›</span>QBCore framework with /maxammo, /armour commands</li>
                            <li className="flex gap-2"><span className="text-accent">›</span>Permission checks and event handling</li>
                          </ul>
                        </div>
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <p className="font-medium">Web Development</p>
                            <span className="text-xs text-muted ml-auto">HTML, CSS</span>
                          </div>
                          <ul className="text-sm text-muted space-y-1">
                            <li className="flex gap-2"><span className="text-accent">›</span>Responsive websites with forms and navigation</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">References</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 text-center">
                          <p className="font-medium text-sm">Mairin Nicell</p>
                          <p className="text-xs text-muted">Senior Lecturer</p>
                          <p className="text-xs text-accent mt-1">Ulster University</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 text-center">
                          <p className="font-medium text-sm">Josh Hannigan</p>
                          <p className="text-xs text-muted">Software Engineer</p>
                          <p className="text-xs text-accent mt-1">Vercel</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 text-center">
                          <p className="font-medium text-sm">Ashu Pun</p>
                          <p className="text-xs text-muted">CEO</p>
                          <p className="text-xs text-accent mt-1">Anywho</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-5">
                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Education</h3>
                      </div>
                      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                        <p className="font-medium text-sm">BSc Computer Science</p>
                        <p className="text-accent text-xs">with DPP</p>
                        <p className="text-muted text-xs mt-1">Ulster University</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                          <span className="text-xs text-muted">2024 – 2028</span>
                          <span className="text-sm font-mono text-accent">63.5%</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted">Database Systems</span>
                              <span>73%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent rounded-full" style={{width: '73%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted">Software Dev II</span>
                              <span>72%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent rounded-full" style={{width: '72%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted">Hardware & OS</span>
                              <span>67%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent/80 rounded-full" style={{width: '67%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Skills</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted mb-2">Languages</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["Java", "C#", "Lua", "HTML", "CSS"].map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-accent/10 text-xs text-accent border border-accent/20">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted mb-2">Databases</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["MySQL", "MongoDB"].map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-white/5 text-xs">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted mb-2">Tools</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["GitHub", "VS Code", "IntelliJ"].map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-white/5 text-xs">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted mb-2">Learning</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["TypeScript", "Next.js", "AI SDK"].map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-green-500/10 text-xs text-green-400 border border-green-500/20">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                        </div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Interests</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <span className="text-muted">Analytical & Testing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <span className="text-muted">Game Development</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <span className="text-muted">Fitness & Discipline</span>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
