import { PROJECTS } from "@/lib/data";

const STATS = [
  { label: "Proyectos activos", value: String(PROJECTS.filter(p => ["production", "active", "mvp"].includes(p.status)).length), unit: "" },
  { label: "En producción", value: String(PROJECTS.filter(p => p.status === "production").length), unit: "" },
  { label: "Stacks principales", value: "3", unit: "" },
  { label: "Años de experiencia", value: "24+", unit: "" },
];

export default function HeroStats() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,80,140,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="section-heading">// command center</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,191,255,0.4), transparent)" }} />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
          <span className="gradient-text">Saady</span>
          <br />
          <span style={{ color: "#f0f4ff" }}>Pacheco</span>
        </h1>

        <p className="text-lg md:text-xl mb-3 font-light" style={{ color: "#9ca3af", maxWidth: "600px" }}>
          Arquitecto Digital · Consultor Senior · 2000–presente
        </p>
        <p className="text-base mb-12" style={{ color: "#4b5563", maxWidth: "560px", lineHeight: "1.7" }}>
          Convierto ideas en sistemas en producción. IA, mobile, SaaS y marketplaces para mercados en LATAM.
        </p>

        {/* CTA pills */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, rgba(0,191,255,0.2), rgba(139,92,246,0.15))",
              border: "1px solid rgba(0,191,255,0.4)",
              color: "#00bfff",
            }}
          >
            Ver proyectos →
          </a>
          <a
            href="#ideas"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
          >
            Evaluar ideas
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-5"
              style={{ borderColor: "rgba(0,191,255,0.1)" }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}{stat.unit}
              </div>
              <div className="text-xs" style={{ color: "#6b7280" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#6b7280" }}>scroll</span>
        <div
          className="w-px h-8 rounded"
          style={{ background: "linear-gradient(to bottom, rgba(0,191,255,0.6), transparent)" }}
        />
      </div>
    </section>
  );
}
