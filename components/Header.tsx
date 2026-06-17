"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Proyectos", href: "#projects" },
  { label: "Ideas", href: "#ideas" },
  { label: "Workspace", href: "#workspace" },
];

export default function Header() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => { clearInterval(id); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 5, 15, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 191, 255, 0.1)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, rgba(0,191,255,0.2), rgba(139,92,246,0.2))",
              border: "1px solid rgba(0,191,255,0.4)",
              color: "#00bfff",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            SP
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "#f0f4ff" }}>Saady Pacheco</div>
            <div className="text-xs" style={{ color: "#6b7280" }}>Arquitecto Digital</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:text-cyan-400"
              style={{ color: "#9ca3af" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Clock */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(0,191,255,0.06)",
            border: "1px solid rgba(0,191,255,0.15)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "rgba(0,191,255,0.8)",
          }}
        >
          <span
            className="pulse-dot"
            style={{ background: "#10b981" }}
          />
          {time || "00:00:00"}
        </div>
      </div>
    </header>
  );
}
