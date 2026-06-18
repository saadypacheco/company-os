import { getTranslations } from "next-intl/server";

const POST_COLORS = ["#8b5cf6", "#10b981", "#00bfff"];

export default async function BlogSection() {
  const t = await getTranslations("blog");
  const posts = t.raw("posts") as Array<{ tag: string; title: string; desc: string; date: string; readTime: string }>;

  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="section-heading mb-2">// {t("heading")}</div>
            <h2 className="text-4xl font-bold" style={{ color: "#f0f4ff" }}>{t("title")}</h2>
          </div>
          <a href="#contacto" className="hidden sm:inline-flex text-sm transition-colors hover:text-cyan-400" style={{ color: "#4b5563" }}>
            {t("subscribe")}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((p, i) => {
            const color = POST_COLORS[i] ?? "#00bfff";
            return (
              <article key={p.title} className="glass-card p-6 flex flex-col group cursor-pointer hover:scale-[1.01] transition-all duration-300"
                style={{ borderColor: `${color}12` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                    {p.tag}
                  </span>
                  <span className="text-xs" style={{ color: "#4b5563" }}>{p.readTime}</span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-3 flex-1" style={{ color: "#f0f4ff" }}>{p.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b7280" }}>{p.desc}</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "#4b5563" }}>{p.date}</span>
                  <span className="text-xs transition-all group-hover:translate-x-1" style={{ color }}>{t("readMore")}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-center text-xs py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.04)" }}>
          {t("comingSoon")}
        </div>
      </div>
    </section>
  );
}
