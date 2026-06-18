import { getTranslations } from "next-intl/server";

export default async function HeroPublic() {
  const t = await getTranslations("hero");

  const stats = [
    { n: "25+", label: t("stats.experience") },
    { n: "12+", label: t("stats.projects") },
    { n: "3",   label: t("stats.countries") },
    { n: "100%", label: t("stats.delivery") },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #00bfff, transparent)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: "rgba(0,191,255,0.08)", border: "1px solid rgba(0,191,255,0.25)", color: "rgba(0,191,255,0.8)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t("badge")}
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          <span style={{ color: "#f0f4ff" }}>{t("title1")}</span>
          <br />
          <span className="gradient-text">{t("title2")}</span>
        </h1>

        <p className="text-lg sm:text-xl mb-4 font-light leading-relaxed" style={{ color: "#9ca3af", maxWidth: "620px" }}>
          {t("subtitle")}
        </p>

        {/* Bio con credenciales del CV */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl mb-10 max-w-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span style={{ color: "#4b5563", marginTop: "2px" }}>◈</span>
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            {t("bio")}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#presupuesto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00bfff, #8b5cf6)", color: "#fff", boxShadow: "0 0 30px rgba(0,191,255,0.25)" }}
          >
            {t("cta_primary")} <span>→</span>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#9ca3af" }}
          >
            {t("cta_secondary")}
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8">
          {stats.map((s) => (
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 rounded" style={{ background: "linear-gradient(to bottom, rgba(0,191,255,0.6), transparent)" }} />
      </div>
    </section>
  );
}
