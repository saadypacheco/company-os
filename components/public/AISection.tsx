import { getTranslations } from "next-intl/server";

export default async function AISection() {
  const t = await getTranslations("ai");
  const usecases = t.raw("usecases") as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section id="ia" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="section-heading mb-3" style={{ color: "#8b5cf6" }}>// {t("heading")}</div>
            <h2 className="text-4xl font-bold mb-5" style={{ color: "#f0f4ff" }}>
              {t("title")}<br />
              <span style={{ color: "#8b5cf6" }}>{t("title2")}</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#9ca3af" }}>{t("desc")}</p>
            <a href="#presupuesto" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", color: "#8b5cf6" }}>
              {t("cta")}
            </a>
          </div>

          {/* Terminal */}
          <div className="rounded-2xl p-6 font-mono text-xs leading-relaxed"
            style={{ background: "rgba(10,10,25,0.8)", border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 0 40px rgba(139,92,246,0.08)" }}>
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            </div>
            <div className="space-y-2">
              <div style={{ color: "#4b5563" }}># {t("terminal_comment1")}</div>
              <div style={{ color: "#8b5cf6" }}>user: <span style={{ color: "#f0f4ff" }}>"¿Qué cerró el equipo hoy?"</span></div>
              <div style={{ color: "#4b5563" }}>→ analizando 47 mensajes de WhatsApp...</div>
              <div style={{ color: "#10b981" }}>assistant: "Hoy se cerraron 3 ventas por $2,400 USD.</div>
              <div style={{ color: "#10b981" }}>  Juan lidera con 2 cierres. Hay 5 leads</div>
              <div style={{ color: "#10b981" }}>  calientes sin follow-up desde ayer."</div>
              <div className="mt-3" style={{ color: "#4b5563" }}># {t("terminal_comment2")}</div>
              <div style={{ color: "#8b5cf6" }}>paciente: <span style={{ color: "#f0f4ff" }}>"Quiero turno para el martes"</span></div>
              <div style={{ color: "#10b981" }}>agente: "Tengo las 10:00 y 16:30 disponibles.</div>
              <div style={{ color: "#10b981" }}>  ¿Cuál te viene mejor?"</div>
              <div className="mt-2 flex items-center gap-2" style={{ color: "#8b5cf6" }}><span className="animate-pulse">▋</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {usecases.map((uc) => (
            <div key={uc.title} className="glass-card p-5 hover:border-purple-500/30 transition-all">
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
