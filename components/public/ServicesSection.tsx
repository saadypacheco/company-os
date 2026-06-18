import { getTranslations } from "next-intl/server";

const COLORS = ["#00bfff", "#8b5cf6", "#10b981", "#f59e0b"];

export default async function ServicesSection() {
  const t = await getTranslations("services");
  const items = t.raw("items") as Array<{ icon: string; title: string; subtitle: string; desc: string; features: string[] }>;

  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <div className="section-heading mb-3">// {t("heading")}</div>
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>{t("title")}</h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "#6b7280" }}>{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((s, i) => {
          const color = COLORS[i] ?? "#00bfff";
          return (
            <div key={s.title} className="glass-card p-7 group transition-all duration-300" style={{ borderColor: `${color}18` }}>
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-0.5" style={{ color: "#f0f4ff" }}>{s.title}</h3>
                  <span className="text-xs" style={{ color }}>{s.subtitle}</span>
                </div>
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#9ca3af" }}>{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#6b7280" }}>
                    <span style={{ color }}>›</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#presupuesto" className="inline-flex items-center gap-1.5 text-xs font-medium transition-all" style={{ color }}>
                {t("cta")}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
