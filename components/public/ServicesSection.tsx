const SERVICES = [
  {
    icon: "◈",
    title: "Desarrollo de Software",
    subtitle: "Web · Mobile · APIs",
    desc: "Aplicaciones web y móviles a medida con tecnologías modernas. Desde MVP en semanas hasta plataformas multi-tenant escalables.",
    features: ["Next.js / React / React Native", "FastAPI / Node.js", "Supabase / PostgreSQL", "Deploy en Vercel · Render · Railway"],
    color: "#00bfff",
    href: "#desarrollo",
  },
  {
    icon: "◉",
    title: "Soluciones de IA",
    subtitle: "LLMs · Agentes · RAG",
    desc: "Integración de inteligencia artificial real en tu negocio: asistentes conversacionales, análisis automático de datos y agentes autónomos.",
    features: ["Agentes IA con OpenAI / Gemini", "RAG sobre tus documentos", "Procesamiento de lenguaje natural", "Visión computacional"],
    color: "#8b5cf6",
    href: "#ia",
  },
  {
    icon: "⬡",
    title: "Automatización de Procesos",
    subtitle: "n8n · Workflows · APIs",
    desc: "Eliminá el trabajo manual repetitivo. Conectamos tus herramientas y automatizamos flujos completos con n8n y APIs.",
    features: ["Flujos n8n + webhooks", "Integración WhatsApp / Slack", "CRMs y ERPs conectados", "Reportes automáticos"],
    color: "#10b981",
    href: "#automatizacion",
  },
  {
    icon: "◆",
    title: "Consultoría Técnica",
    subtitle: "Arquitectura · Estrategia · Equipo",
    desc: "Revisión de arquitectura, definición de stack tecnológico, onboarding de equipos y acompañamiento en decisiones técnicas críticas.",
    features: ["Auditoría de código y arquitectura", "Definición de roadmap técnico", "Metodología SDD", "Mentoring de equipos"],
    color: "#f59e0b",
    href: "#consultoria",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="section-heading mb-3">// servicios</div>
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>
          ¿En qué puedo ayudarte?
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "#6b7280" }}>
          Desde el diseño hasta el deploy. Trabajo end-to-end o me integro a tu equipo donde más me necesitás.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="glass-card p-7 group transition-all duration-300"
            style={{ borderColor: `${s.color}18` }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-0.5" style={{ color: "#f0f4ff" }}>{s.title}</h3>
                <span className="text-xs" style={{ color: s.color }}>{s.subtitle}</span>
              </div>
            </div>

            <p className="text-sm mb-5 leading-relaxed" style={{ color: "#9ca3af" }}>{s.desc}</p>

            <ul className="space-y-2 mb-6">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#6b7280" }}>
                  <span style={{ color: s.color }}>›</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#presupuesto"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-all"
              style={{ color: s.color }}
            >
              Consultar sobre este servicio →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
