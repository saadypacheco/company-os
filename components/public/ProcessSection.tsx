import { getTranslations } from "next-intl/server";

const STEP_COLORS = ["#00bfff", "#8b5cf6", "#10b981", "#f59e0b"];

export default async function ProcessSection() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as Array<{ n: string; title: string; desc: string }>;
  const trust = t.raw("trust") as Array<{ value: string; label: string }>;

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 80% 50%, rgba(0,191,255,0.04) 0%, transparent 60%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-heading mb-3">// {t("heading")}</div>
          <h2 className="text-4xl font-bold" style={{ color: "#f0f4ff" }}>{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((s, i) => {
            const color = STEP_COLORS[i] ?? "#00bfff";
            return (
              <div key={s.n} className="glass-card p-6 h-full">
                <div className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "JetBrains Mono, monospace", background: `linear-gradient(135deg, ${color}, ${color}60)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.n}
                </div>
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#f0f4ff" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map((item) => (
            <div key={item.label} className="glass-card p-4 text-center" style={{ borderColor: "rgba(0,191,255,0.08)" }}>
              <div className="text-xl font-bold mb-1"
                style={{ fontFamily: "JetBrains Mono, monospace", background: "linear-gradient(135deg, #00bfff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {item.value}
              </div>
              <div className="text-xs" style={{ color: "#4b5563" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
