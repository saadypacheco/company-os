import { PROJECTS } from "@/lib/data";

const FEATURED_IDS = ["tienda", "betamigos", "mentorcomercial", "bermejo", "solucionesdentales", "apops"];

const STATUS_LABEL: Record<string, string> = {
  production: "En producción",
  active:     "Activo",
  mvp:        "MVP listo",
  prototype:  "Prototipo",
};

const STATUS_COLOR: Record<string, string> = {
  production: "#10b981",
  active:     "#00bfff",
  mvp:        "#f59e0b",
  prototype:  "#8b5cf6",
};

export default function PortfolioSection() {
  const featured = FEATURED_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PROJECTS;

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-heading mb-3">// portfolio</div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>
            Proyectos en producción
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Productos reales, stacks modernos, problemas concretos resueltos. Cada uno arrancó como una idea.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featured.map((p) => {
            const color = STATUS_COLOR[p.status] ?? "#6b7280";
            return (
              <div
                key={p.id}
                className="glass-card p-6 flex flex-col h-full group transition-all duration-300"
                style={{ borderColor: `${color}20` }}
              >
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.04)", color: "#4b5563" }}>
                    {p.category}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-1" style={{ color: "#f0f4ff" }}>{p.name}</h3>
                <p className="text-xs mb-3 font-medium" style={{ color }}>{p.tagline}</p>
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "#6b7280" }}>
                  {p.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="stack-chip">{t}</span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="stack-chip" style={{ color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.03)" }}>
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-cyan-400"
            style={{ color: "#6b7280" }}
          >
            Ver todos los proyectos →
          </a>
        </div>
      </div>
    </section>
  );
}
