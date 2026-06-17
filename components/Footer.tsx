const STACK = ["Next.js 14", "FastAPI", "Supabase", "TypeScript", "Gemini", "Anthropic"];

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 pb-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium" style={{ color: "#9ca3af" }}>
            Saady Pacheco · Arquitecto Digital
          </div>
          <div className="text-xs mt-1" style={{ color: "#4b5563" }}>
            saadypacheco@gmail.com · Argentina / Bolivia
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="stack-chip" style={{ fontSize: "0.6rem" }}>{s}</span>
          ))}
        </div>

        <div
          className="text-xs"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#2d3748" }}
        >
          SP Hub v1.0
        </div>
      </div>
    </footer>
  );
}
