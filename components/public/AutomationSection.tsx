const FLOWS = [
  {
    trigger: "Nuevo lead en el sitio web",
    steps: ["Crea contacto en CRM", "Envía WhatsApp de bienvenida", "Asigna vendedor", "Agenda recordatorio"],
    saving: "3 hs/día",
  },
  {
    trigger: "Cierre de venta",
    steps: ["Genera contrato automático", "Envía factura", "Crea proyecto en sistema", "Notifica al equipo técnico"],
    saving: "45 min/operación",
  },
  {
    trigger: "Ticket de soporte abierto",
    steps: ["Clasifica urgencia con IA", "Asigna al técnico correcto", "Notifica al cliente", "Escalada si no hay respuesta en 2h"],
    saving: "2 hs/día",
  },
];

const TOOLS = ["n8n", "WhatsApp API", "Slack", "Gmail", "Google Sheets", "Notion", "Supabase", "Webhooks", "REST APIs", "MercadoPago"];

export default function AutomationSection() {
  return (
    <section id="automatizacion" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="section-heading mb-3" style={{ color: "#10b981" }}>// automatización</div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>
                Automatizá el trabajo<br />
                <span style={{ color: "#10b981" }}>que te consume tiempo</span>
              </h2>
              <p className="text-base max-w-lg leading-relaxed" style={{ color: "#9ca3af" }}>
                Con n8n y una buena arquitectura de automatización, eliminás el trabajo manual repetitivo y liberás a tu equipo para lo que importa.
              </p>
            </div>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl shrink-0"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <span className="text-3xl font-bold" style={{ color: "#10b981", fontFamily: "JetBrains Mono, monospace" }}>~70%</span>
              <span className="text-sm" style={{ color: "#6b7280" }}>de tareas operativas<br />automatizables</span>
            </div>
          </div>
        </div>

        {/* Flows */}
        <div className="space-y-4 mb-12">
          {FLOWS.map((flow, i) => (
            <div
              key={i}
              className="glass-card p-5"
              style={{ borderColor: "rgba(16,185,129,0.12)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Trigger */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg shrink-0"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <span className="text-xs" style={{ color: "#10b981" }}>⚡</span>
                  <span className="text-xs font-medium" style={{ color: "#f0f4ff" }}>{flow.trigger}</span>
                </div>

                <span className="text-lg hidden sm:block" style={{ color: "#4b5563" }}>→</span>

                {/* Steps */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {flow.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-1.5">
                      <span
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }}
                      >
                        {step}
                      </span>
                      {j < flow.steps.length - 1 && (
                        <span className="text-xs" style={{ color: "#4b5563" }}>›</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Saving */}
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold" style={{ color: "#10b981", fontFamily: "JetBrains Mono, monospace" }}>
                    -{flow.saving}
                  </div>
                  <div className="text-xs" style={{ color: "#4b5563" }}>ahorro</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div>
          <div className="text-xs mb-4" style={{ color: "#4b5563", letterSpacing: "0.1em" }}>HERRAMIENTAS Y PLATAFORMAS</div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg text-xs"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", color: "#6b7280" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
