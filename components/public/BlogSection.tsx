const POSTS = [
  {
    tag: "IA",
    color: "#8b5cf6",
    title: "Cómo implementé un agente IA de ventas en WhatsApp en 2 semanas",
    desc: "El stack, los problemas reales que aparecieron y por qué Whisper + GPT-4 cambia la dinámica de un equipo comercial.",
    date: "Mayo 2025",
    readTime: "8 min",
  },
  {
    tag: "Automatización",
    color: "#10b981",
    title: "n8n vs Zapier: por qué elegí self-hosted para mis clientes",
    desc: "Costo, flexibilidad y control. El análisis real después de migrar 3 workflows de producción.",
    date: "Abril 2025",
    readTime: "6 min",
  },
  {
    tag: "Arquitectura",
    color: "#00bfff",
    title: "SDD: la metodología que uso para arrancar cualquier proyecto",
    desc: "System Design Document como herramienta de comunicación entre cliente, dev y IA. Por qué funciona.",
    date: "Marzo 2025",
    readTime: "10 min",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="section-heading mb-2">// blog</div>
            <h2 className="text-4xl font-bold" style={{ color: "#f0f4ff" }}>
              Lo que fui aprendiendo
            </h2>
          </div>
          <a
            href="#contacto"
            className="hidden sm:inline-flex text-sm transition-colors hover:text-cyan-400"
            style={{ color: "#4b5563" }}
          >
            Suscribirse →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="glass-card p-6 flex flex-col group cursor-pointer hover:scale-[1.01] transition-all duration-300"
              style={{ borderColor: `${p.color}12` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                >
                  {p.tag}
                </span>
                <span className="text-xs" style={{ color: "#4b5563" }}>{p.readTime}</span>
              </div>

              <h3 className="font-semibold text-sm leading-snug mb-3 flex-1" style={{ color: "#f0f4ff" }}>
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b7280" }}>
                {p.desc}
              </p>

              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-xs" style={{ color: "#4b5563" }}>{p.date}</span>
                <span
                  className="text-xs transition-all group-hover:translate-x-1"
                  style={{ color: p.color }}
                >
                  Leer →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Coming soon note */}
        <div
          className="mt-6 text-center text-xs py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          Blog completo próximamente · Por ahora escribo en LinkedIn y Slack
        </div>
      </div>
    </section>
  );
}
