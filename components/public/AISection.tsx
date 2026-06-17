const USE_CASES = [
  {
    icon: "💬",
    title: "Asistentes conversacionales",
    desc: "Chatbots con contexto real de tu negocio. Responden preguntas, toman pedidos, califican leads y escalan al humano cuando hace falta.",
  },
  {
    icon: "🔍",
    title: "RAG sobre tus documentos",
    desc: "Subí tus manuales, contratos o reportes. La IA los lee, los entiende y responde preguntas precisas sobre ellos.",
  },
  {
    icon: "🤖",
    title: "Agentes autónomos",
    desc: "Workflows multi-paso que piensan y actúan: buscan información, actualizan sistemas, envían notificaciones y generan reportes solos.",
  },
  {
    icon: "📊",
    title: "Análisis y resúmenes ejecutivos",
    desc: "¿Reuniones eternas? La IA transcribe, resume, detecta decisiones y acuerdos, y los entrega estructurados en segundos.",
  },
  {
    icon: "🎯",
    title: "Clasificación y scoring",
    desc: "Leads, tickets, ideas, CVs: la IA los clasifica, prioriza y puntúa según tus criterios, sin intervención manual.",
  },
  {
    icon: "👁️",
    title: "Visión computacional",
    desc: "Análisis de imágenes y fotos: lectura de documentos, reconocimiento de productos, control de calidad visual.",
  },
];

export default function AISection() {
  return (
    <section id="ia" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="section-heading mb-3" style={{ color: "#8b5cf6" }}>// inteligencia artificial</div>
            <h2 className="text-4xl font-bold mb-5" style={{ color: "#f0f4ff" }}>
              IA que realmente<br />
              <span style={{ color: "#8b5cf6" }}>trabaja en tu empresa</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#9ca3af" }}>
              No demos, no promesas vacías. Integro modelos de lenguaje avanzados (OpenAI, Gemini, Anthropic) directamente en tus procesos para automatizar trabajo real y generar valor medible.
            </p>
            <a
              href="#presupuesto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#8b5cf6",
              }}
            >
              Hablar sobre mi caso →
            </a>
          </div>

          {/* Animated code-like terminal */}
          <div
            className="rounded-2xl p-6 font-mono text-xs leading-relaxed"
            style={{
              background: "rgba(10,10,25,0.8)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 40px rgba(139,92,246,0.08)",
            }}
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            </div>
            <div className="space-y-2">
              <div style={{ color: "#4b5563" }}># MentorComercial — IA para ventas</div>
              <div style={{ color: "#8b5cf6" }}>user: <span style={{ color: "#f0f4ff" }}>"¿Qué cerró el equipo hoy?"</span></div>
              <div style={{ color: "#4b5563" }}>→ analizando 47 mensajes de WhatsApp...</div>
              <div style={{ color: "#10b981" }}>assistant: "Hoy se cerraron 3 ventas por $2,400 USD.</div>
              <div style={{ color: "#10b981" }}>  Juan lidera con 2 cierres. Hay 5 leads</div>
              <div style={{ color: "#10b981" }}>  calientes sin follow-up desde ayer."</div>
              <div className="mt-3" style={{ color: "#4b5563" }}># Soluciones Dentales — IA recepcionista</div>
              <div style={{ color: "#8b5cf6" }}>paciente: <span style={{ color: "#f0f4ff" }}>"Quiero turno para el martes"</span></div>
              <div style={{ color: "#10b981" }}>agente: "Tengo las 10:00 y 16:30 disponibles.</div>
              <div style={{ color: "#10b981" }}>  ¿Cuál te viene mejor?"</div>
              <div className="mt-2 flex items-center gap-2" style={{ color: "#8b5cf6" }}>
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </div>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="glass-card p-5 hover:border-purple-500/30 transition-all"
            >
              <div className="text-2xl mb-3">{uc.icon}</div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "#f0f4ff" }}>{uc.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
