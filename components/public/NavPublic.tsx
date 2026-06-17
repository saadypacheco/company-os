"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "IA", href: "#ia" },
  { label: "Automatización", href: "#automatizacion" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export default function NavPublic() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 5, 15, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,191,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(0,191,255,0.25), rgba(139,92,246,0.2))",
              border: "1px solid rgba(0,191,255,0.4)",
              color: "#00bfff",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            SP
          </div>
          <span className="font-semibold text-sm hidden sm:block" style={{ color: "#f0f4ff" }}>
            Saady Pacheco
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:text-cyan-400"
              style={{ color: "#9ca3af" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA + Dashboard */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs px-3 py-1.5 rounded-lg transition-all hover:border-cyan-400/40"
            style={{
              color: "#6b7280",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Dashboard →
          </Link>
          <a
            href="#presupuesto"
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,191,255,0.2)",
            }}
          >
            Solicitar presupuesto
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: "#9ca3af" }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-6 pb-6 pt-2 space-y-3"
          style={{ background: "rgba(5,5,15,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm py-2 transition-colors hover:text-cyan-400"
              style={{ color: "#9ca3af" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#presupuesto"
            onClick={() => setOpen(false)}
            className="block text-center text-sm px-4 py-2.5 rounded-lg font-medium mt-2"
            style={{ background: "linear-gradient(135deg, #00bfff, #8b5cf6)", color: "#fff" }}
          >
            Solicitar presupuesto
          </a>
        </div>
      )}
    </header>
  );
}
