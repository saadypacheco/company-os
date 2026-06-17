export default function HeroPublic() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #00bfff, transparent)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(0,191,255,0.08)",
            border: "1px solid rgba(0,191,255,0.25)",
            color: "rgba(0,191,255,0.8)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Disponible para nuevos proyectos · LATAM
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          <span style={{ color: "#f0f4ff" }}>Construyo sistemas</span>
          <br />
          <span className="gradient-text">que escalan.</span>
        </h1>

        <p className="text-lg sm:text-xl mb-4 font-light leading-relaxed" style={{ color: "#9ca3af", maxWidth: "620px" }}>
          Software a medida, inteligencia artificial y automatización de procesos para empresas que quieren crecer sin fricción.
        </p>
        <p className="text-base mb-10" style={{ color: "#4b5563", maxWidth: "560px" }}>
          +24 años convirtiendo ideas en productos en producción. Arquitectura moderna, stack probado, entrega real.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#presupuesto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(0,191,255,0.25)",
            }}
          >
            Solicitar presupuesto gratis
            <span>→</span>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#9ca3af",
            }}
          >
            Ver casos de éxito
          </a>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-wrap gap-6">
          {[
            { n: "24+", label: "años de experiencia" },
            { n: "10+", label: "proyectos activos en 2025" },
            { n: "3", label: "países atendidos" },
            { n: "100%", label: "proyectos en producción" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.n}
              </span>
              <span className="text-sm" style={{ color: "#6b7280" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 rounded" style={{ background: "linear-gradient(to bottom, rgba(0,191,255,0.6), transparent)" }} />
      </div>
    </section>
  );
}
