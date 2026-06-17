const STEPS = [
  {
    n: "01",
    title: "Entendemos tu problema",
    desc: "Una llamada de 30 minutos para entender qué necesitás, qué tenés hoy y qué resultado buscás. Sin tecnicismos, sin vender.",
    color: "#00bfff",
  },
  {
    n: "02",
    title: "Propuesta y arquitectura",
    desc: "Diseño la solución técnica, defino el stack, estimo tiempos y presento un roadmap por fases claro y accionable.",
    color: "#8b5cf6",
  },
  {
    n: "03",
    title: "MVP en semanas",
    desc: "Arrancamos por el núcleo que da valor real. En 2-4 semanas tenés algo funcional en manos de usuarios reales.",
    color: "#10b981",
  },
  {
    n: "04",
    title: "Iteramos con datos",
    desc: "Medimos, ajustamos y seguimos construyendo en ciclos cortos. El producto mejora con feedback real, no con suposiciones.",
    color: "#f59e0b",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 80% 50%, rgba(0,191,255,0.04) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-heading mb-3">// metodología</div>
          <h2 className="text-4xl font-bold" style={{ color: "#f0f4ff" }}>
            Cómo trabajo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute top-8 left-full w-full h-px hidden lg:block"
                  style={{ background: `linear-gradient(90deg, ${s.color}40, transparent)`, zIndex: 0 }}
                />
              )}

              <div className="glass-card p-6 relative z-10 h-full">
                <div
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}60)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#f0f4ff" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Entrega en tiempo", value: "100%" },
            { label: "Proyectos en producción", value: "10+" },
            { label: "Años construyendo software", value: "24+" },
            { label: "Sin código legacy innecesario", value: "siempre" },
          ].map((t) => (
            <div
              key={t.label}
              className="glass-card p-4 text-center"
              style={{ borderColor: "rgba(0,191,255,0.08)" }}
            >
              <div
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t.value}
              </div>
              <div className="text-xs" style={{ color: "#4b5563" }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
