"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type Modal = "education" | "experience" | "projects" | "about" | "minecraft" | "fivem" | "webdev" | "cv" | null;

const techStack = [
  { name: "Next.js", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg> },
  { name: "React", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg> },
  { name: "TypeScript", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: "Java", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg> },
  { name: "Lua", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182a9.818 9.818 0 110 19.636 9.818 9.818 0 010-19.636zm6.545 1.09a2.182 2.182 0 100 4.364 2.182 2.182 0 000-4.364zm-6.545.546a8.182 8.182 0 100 16.364 8.182 8.182 0 000-16.364z"/></svg> },
  { name: "HTML/CSS", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg> },
];

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = theme === "dark";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(14, 165, 233, 0.5)" : "rgba(2, 132, 199, 0.4)";
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(14, 165, 233, ${0.15 - dist / 800})` : `rgba(2, 132, 199, ${0.1 - dist / 1200})`;
            ctx.stroke();
          }
        });

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark ? `rgba(14, 165, 233, ${0.3 - mDist / 500})` : `rgba(2, 132, 199, ${0.25 - mDist / 600})`;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    createParticles();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [theme]);

  const handleMagnetic = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  const handleCardSpotlight = useCallback((e: React.MouseEvent<HTMLElement>) => {
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div
        ref={spotlightRef}
        className="fixed w-[500px] h-[500px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)",
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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-6">
            <div className="glass glass-hover rounded-2xl p-6 text-center border-gradient scroll-reveal hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-3xl font-bold text-black animate-float animate-glow-pulse">
                MS
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-shine">Millen Singh</h1>
              <div className="typing-container mt-1">
                <p className="text-accent font-mono text-sm typing-text">Software Developer</p>
              </div>
              <div className="h-px w-12 mx-auto my-4 bg-gradient-to-r from-transparent via-accent to-transparent animate-gradient" />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setModal("about")}
                  onMouseMove={handleMagnetic}
                  onMouseLeave={handleMagneticLeave}
                  className="text-sm text-muted hover:text-accent transition-all hover-lift magnetic-btn"
                >
                  About Me
                </button>
                <span className="text-card-border">|</span>
                <button
                  onClick={() => setModal("cv")}
                  onMouseMove={handleMagnetic}
                  onMouseLeave={handleMagneticLeave}
                  className="text-sm text-accent hover:text-accent-light transition-all hover-lift flex items-center gap-1 magnetic-btn"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  View CV
                </button>
              </div>
            </div>

            <div className="glass glass-hover rounded-2xl p-6 scroll-reveal scroll-delay-1 hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm group-hover:bg-accent/20 group-hover:scale-110 transition-all">@</span>
                  <a href="mailto:millensh@outlook.com" className="text-sm hover:text-accent transition-colors">millensh@outlook.com</a>
                </div>
                <a href="https://www.google.com/maps/search/Northern+Ireland" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span className="text-sm group-hover:text-accent transition-colors">Northern Ireland</span>
                </a>
              </div>
            </div>

            <div className="glass glass-hover rounded-2xl p-6 scroll-reveal scroll-delay-2 hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Connect</h2>
              <div className="space-y-2">
                <a href="https://www.linkedin.com/in/singhmillen/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 -mx-2 rounded-xl group hover:bg-white/5 transition-all">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-foreground transition-colors">LinkedIn</p>
                    <p className="text-xs text-muted">@singhmillen</p>
                  </div>
                  <svg className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href="https://github.com/milnee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 -mx-2 rounded-xl group hover:bg-white/5 transition-all">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-foreground transition-colors">GitHub</p>
                    <p className="text-xs text-muted">@milnee</p>
                  </div>
                  <svg className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href="https://twitter.com/m1lles05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 -mx-2 rounded-xl group hover:bg-white/5 transition-all">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all border border-transparent group-hover:border-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-foreground transition-colors">X / Twitter</p>
                    <p className="text-xs text-muted">@m1lles05</p>
                  </div>
                  <svg className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setModal("education")}
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
                className="glass glass-hover rounded-2xl p-5 text-left glow-line scroll-reveal scroll-delay-1 hover-glow card-3d magnetic-btn"
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
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
                className="glass glass-hover rounded-2xl p-5 text-left glow-line scroll-reveal scroll-delay-2 hover-glow card-3d magnetic-btn"
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
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
                className="glass glass-hover rounded-2xl p-5 glow-line scroll-reveal scroll-delay-3 hover-glow card-3d magnetic-btn"
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
              <div className="sm:col-span-2 glass glass-hover rounded-2xl p-5 scroll-reveal scroll-delay-3 hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
                <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1.5 rounded-lg bg-accent/10 text-sm font-mono text-accent border border-accent/20 hover:bg-accent/20 hover:scale-105 hover:border-accent/40 transition-all cursor-default flex items-center gap-2"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass glass-hover rounded-2xl p-5 scroll-reveal scroll-delay-4 hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
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

            <Link
              href="/projects"
              className="group glass rounded-2xl p-6 border-gradient scroll-reveal scroll-delay-4 border-beam block hover:border-accent/40 transition-all card-spotlight relative overflow-hidden"
              onMouseMove={handleCardSpotlight}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Projects</h2>
                  <span className="flex items-center gap-2 text-sm text-accent group-hover:gap-3 transition-all">
                    View All
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 border-2 border-background flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-background flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 border-2 border-background flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-lg group-hover:text-accent transition-colors">4 Projects</p>
                    <p className="text-sm text-muted">Minecraft plugins, FiveM scripts, web apps & more</p>
                  </div>
                  <div className="hidden sm:flex flex-wrap gap-2 max-w-[200px]">
                    {["Java", "Lua", "TypeScript", "React"].map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 glass glass-hover rounded-2xl p-5 scroll-reveal scroll-delay-5 hover-glow card-spotlight" onMouseMove={handleCardSpotlight}>
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

              <div className="glass glass-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center border-gradient scroll-reveal scroll-delay-5 hover-glow animate-glow-pulse card-spotlight" onMouseMove={handleCardSpotlight}>
                <p className="text-xs text-muted uppercase tracking-wider">Seeking Placement</p>
                <p className="text-accent font-semibold text-lg mt-1">September 2026</p>
              </div>
            </div>
          </section>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/95" />
          <div
            className={`relative rounded-2xl p-5 sm:p-8 w-full animate-fade-in-scale max-h-[90vh] overflow-auto smooth-scroll modal-content ${modal === "cv" ? "max-w-4xl" : modal === "projects" ? "max-w-3xl" : "max-w-lg"}`}
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
                <div className="bg-gradient-to-br from-accent/20 via-accent/5 to-transparent rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:block">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xl sm:text-2xl font-bold text-black shrink-0">
                        MS
                      </div>
                      <div className="sm:hidden">
                        <h2 className="text-xl font-bold">Millen Singh</h2>
                        <p className="text-accent font-mono text-sm">Software Developer</p>
                      </div>
                    </div>
                    <div className="flex-1 hidden sm:block">
                      <h2 className="text-2xl font-bold">Millen Singh</h2>
                      <p className="text-accent font-mono text-sm mt-1">Software Developer</p>
                      <p className="text-muted text-sm mt-2 leading-relaxed">
                        Second-year Computer Science student seeking a software engineering placement for September 2026.
                      </p>
                    </div>
                    <p className="text-muted text-sm leading-relaxed sm:hidden">
                      Second-year Computer Science student seeking a software engineering placement for September 2026.
                    </p>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 sm:text-right text-sm shrink-0">
                      <a href="mailto:millensh@outlook.com" className="flex items-center gap-2 text-muted hover:text-accent transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span className="hidden sm:inline">millensh@outlook.com</span>
                      </a>
                      <div className="flex gap-2">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-5">
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                <div className="mt-6 flex justify-end">
                  <a
                    href="/cv.pdf"
                    download="Millen_Singh_CV.pdf"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black font-medium text-sm hover:bg-accent-light transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download CV
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
