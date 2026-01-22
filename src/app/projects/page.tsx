"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  color: string;
  image: string;
  link?: string;
  github?: string;
  features: string[];
  longDescription: string;
  status: "active" | "completed";
  date: string;
  featured?: boolean;
  repoName?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with Next.js 16, React 19, and TypeScript. Features particle effects, card spotlight, magnetic buttons, and dark/light mode.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    color: "from-sky-500 to-blue-600",
    image: "/preview.png",
    link: "https://millen.sh",
    github: "https://github.com/milnee/Portfolio",
    repoName: "milnee/Portfolio",
    longDescription: "A modern, responsive portfolio website showcasing my projects and skills. Built with the latest web technologies and featuring interactive visual effects.",
    features: [
      "Interactive particle background with mouse tracking",
      "Card spotlight effect following cursor",
      "Magnetic button hover effects",
      "Scroll-triggered animations",
      "Dark/light theme with persistence",
      "Fully responsive design",
    ],
    status: "active",
    date: "Jan 2026",
    featured: true,
  },
  {
    title: "Minecraft Utils Plugin",
    description: "Custom server plugins using Java to enhance gameplay. Includes /speed, /setspawn, /giveaways with MySQL and MongoDB integration.",
    tech: ["Java", "MySQL", "MongoDB", "Spigot API"],
    color: "from-orange-500 to-red-600",
    image: "/projects/minecraft.svg",
    github: "https://github.com/milnee/Utils",
    repoName: "milnee/Utils",
    longDescription: "A comprehensive utility plugin for Minecraft servers that provides essential commands and features for server administrators and players.",
    features: [
      "/speed command with configurable speed levels",
      "/setspawn and /spawn for spawn management",
      "/giveaway system for server events",
      "MySQL database integration for data persistence",
      "MongoDB support for flexible data storage",
      "Configurable via config.yml",
    ],
    status: "completed",
    date: "Dec 2025",
  },
  {
    title: "FiveM MaxAmmo",
    description: "Lua script using QBCore framework for FiveM servers. Custom /maxammo command to refill ammunition with permission checks.",
    tech: ["Lua", "QBCore", "FiveM"],
    color: "from-purple-500 to-pink-600",
    image: "/projects/maxammo.svg",
    github: "https://github.com/milnee/MaxAmmo",
    repoName: "milnee/MaxAmmo",
    longDescription: "A QBCore framework script for FiveM roleplay servers that allows authorized players to refill their ammunition instantly.",
    features: [
      "/maxammo command to refill all ammo",
      "Permission-based access control",
      "QBCore framework integration",
      "Server-side validation",
      "Clean notification system",
    ],
    status: "completed",
    date: "Nov 2025",
  },
  {
    title: "FiveM MaxArmor",
    description: "QBCore script that grants max armour to players with permission checks and support for targeting other players.",
    tech: ["Lua", "QBCore", "FiveM"],
    color: "from-violet-500 to-purple-600",
    image: "/projects/maxarmor.svg",
    github: "https://github.com/milnee/MaxArmor",
    repoName: "milnee/MaxArmor",
    longDescription: "A QBCore framework script for FiveM servers that provides armor management with admin controls and player targeting capabilities.",
    features: [
      "/maxarmor command for instant armor",
      "Target other players by ID",
      "Permission-based system",
      "Current armor level checking",
      "Client-side and server-side logic",
    ],
    status: "completed",
    date: "Nov 2025",
  },
];

export default function ProjectsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubStats, setGithubStats] = useState<Record<string, { stars: number; forks: number }>>({});
  const [loadingStats, setLoadingStats] = useState(true);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  useEffect(() => {
    const fetchGithubStats = async () => {
      setLoadingStats(true);
      const stats: Record<string, { stars: number; forks: number }> = {};
      for (const project of projects) {
        if (project.repoName) {
          try {
            const res = await fetch(`https://api.github.com/repos/${project.repoName}`);
            if (res.ok) {
              const data = await res.json();
              stats[project.repoName] = {
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
              };
            }
          } catch {
            stats[project.repoName] = { stars: 0, forks: 0 };
          }
        }
      }
      setGithubStats(stats);
      setLoadingStats(false);
    };
    fetchGithubStats();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    let lastTime = 0;
    const fps = 20;
    const frameInterval = 1000 / fps;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 50000), 30);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = theme === "dark";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(14, 165, 233, 0.4)" : "rgba(2, 132, 199, 0.3)";
        ctx.fill();
      });
    };

    resize();
    animationId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  const handleMagnetic = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  const handleCardSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const renderProjectCard = (project: Project, i: number, isFeatured = false) => {
    const stats = project.repoName ? githubStats[project.repoName] : null;

    return (
      <div
        key={project.title}
        className={`group glass glass-hover rounded-2xl overflow-hidden border-gradient hover-glow transition-all duration-300 card-spotlight glow-line scroll-reveal cursor-pointer ${isFeatured ? "col-span-full lg:col-span-2" : `scroll-delay-${Math.min(i + 1, 5)}`}`}
        onMouseMove={handleCardSpotlight}
        onClick={() => setSelectedProject(project)}
      >
        <div className={`${isFeatured ? "h-64 md:h-72" : "h-48"} bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${project.status === "active" ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-white/10 text-white/80 border-white/20"}`}>
              {project.status === "active" ? "Active" : "Completed"}
            </span>
            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-3 text-white/80 text-xs">
            {project.repoName && loadingStats && (
              <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="w-8 h-3 bg-white/20 rounded animate-pulse" />
              </span>
            )}
            {!loadingStats && stats && stats.stars > 0 && (
              <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {stats.stars}
              </span>
            )}
            {!loadingStats && stats && stats.forks > 0 && (
              <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm0 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm12 0a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm-6 5v4h2v-4h-2zm-6 3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3zm12-8a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-6 11a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                {stats.forks}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, isFeatured ? 4 : 3).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-xs text-white/90 border border-white/10">
                  {t}
                </span>
              ))}
              {project.tech.length > (isFeatured ? 4 : 3) && (
                <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-xs text-white/60">
                  +{project.tech.length - (isFeatured ? 4 : 3)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`${isFeatured ? "p-6" : "p-5"} relative z-10`}>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`${isFeatured ? "text-xl" : "text-lg"} font-semibold group-hover:text-accent transition-colors`}>
              {project.title}
            </h3>
            <span className="text-xs text-muted shrink-0">{project.date}</span>
          </div>
          <p className={`text-sm text-muted leading-relaxed mb-4 ${isFeatured ? "line-clamp-3" : "line-clamp-2"}`}>
            {project.description}
          </p>

          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors hover-lift"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors hover-lift"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div
        ref={spotlightRef}
        className="fixed w-[500px] h-[500px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(2, 132, 199, 0.06) 0%, transparent 70%)",
          left: mousePos.x,
          top: mousePos.y,
        }}
      />
      <div className="fixed inset-0 bg-grid" />
      <div className="fixed inset-0 bg-gradient-radial" />
      <div className="fixed inset-0 bg-gradient-radial-bottom" />

      <div className="fixed top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-orb-1 pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-orb-2 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-orb-3 pointer-events-none" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 scroll-reveal">
          <Link
            href="/"
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-all mb-6 sm:mb-8 group magnetic-btn hover-lift"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-shine mb-2">Projects</h1>
              <p className="text-muted text-sm sm:text-base max-w-lg">
                A collection of personal and university projects showcasing my skills in software development.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-sm text-accent border border-accent/20 animate-glow-pulse">
                {projects.length} Projects
              </span>
            </div>
          </div>
        </div>

        {featuredProject && (
          <div className="mb-8 scroll-reveal scroll-delay-1">
            {renderProjectCard(featuredProject, 0, true)}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {otherProjects.map((project, i) => renderProjectCard(project, i))}
        </div>

        <div className="mt-12 sm:mt-16 glass rounded-2xl p-6 sm:p-8 border-gradient scroll-reveal scroll-delay-5 card-spotlight" onMouseMove={handleCardSpotlight}>
          <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center text-shine">Quick Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{projects.length}</div>
              <div className="text-xs sm:text-sm text-muted">Projects</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                {[...new Set(projects.flatMap(p => p.tech))].length}
              </div>
              <div className="text-xs sm:text-sm text-muted">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                {projects.filter(p => p.status === "active").length}
              </div>
              <div className="text-xs sm:text-sm text-muted">Active</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                {loadingStats ? (
                  <div className="h-8 w-8 mx-auto bg-white/10 rounded animate-pulse" />
                ) : (
                  Object.values(githubStats).reduce((sum, s) => sum + s.stars, 0)
                )}
              </div>
              <div className="text-xs sm:text-sm text-muted">GitHub Stars</div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={toggleTheme}
          onMouseMove={handleMagnetic}
          onMouseLeave={handleMagneticLeave}
          className="glass glass-hover rounded-full px-4 py-2 flex items-center gap-2 text-sm text-muted hover:text-foreground transition-all hover-glow magnetic-btn"
        >
          {theme === "dark" ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Dark
            </>
          )}
        </button>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedProject(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div
            className="relative rounded-2xl w-full max-w-2xl animate-fade-in-scale max-h-[90vh] overflow-auto smooth-scroll modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:rotate-90 flex items-center justify-center text-muted hover:text-foreground transition-all z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`h-48 sm:h-56 bg-gradient-to-br ${selectedProject.color} relative overflow-hidden rounded-t-2xl`}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${selectedProject.status === "active" ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-white/10 text-white/80 border-white/20"}`}>
                  {selectedProject.status === "active" ? "Active" : "Completed"}
                </span>
              </div>

              {selectedProject.repoName && githubStats[selectedProject.repoName] && (
                <div className="absolute top-4 right-12 flex items-center gap-3 text-white/80 text-xs">
                  {githubStats[selectedProject.repoName].stars > 0 && (
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {githubStats[selectedProject.repoName].stars}
                    </span>
                  )}
                  {githubStats[selectedProject.repoName].forks > 0 && (
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm0 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm12 0a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm-6 5v4h2v-4h-2zm-6 3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3zm12-8a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-6 11a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                      {githubStats[selectedProject.repoName].forks}
                    </span>
                  )}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <span className="text-xs text-white/60">{selectedProject.date}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-xs text-white border border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-muted leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Features</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted hover:text-foreground transition-colors">
                      <span className="text-accent">-</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black font-medium text-sm hover:bg-accent-light transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-foreground font-medium text-sm hover:bg-white/20 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
