import { Project, ProjectStatus } from "@/lib/data";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; dot: string; glowClass: string }> = {
  production: { label: "Producción", color: "#10b981", dot: "#10b981", glowClass: "glow-production" },
  active:     { label: "Activo",     color: "#00bfff", dot: "#00bfff", glowClass: "glow-active" },
  mvp:        { label: "MVP",        color: "#f59e0b", dot: "#f59e0b", glowClass: "glow-mvp" },
  prototype:  { label: "Prototipo",  color: "#8b5cf6", dot: "#8b5cf6", glowClass: "glow-prototype" },
  archived:   { label: "Archivado",  color: "#6b7280", dot: "#6b7280", glowClass: "" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Marketplace":      "rgba(0,191,255,0.15)",
  "Mobile":           "rgba(139,92,246,0.15)",
  "IA / SaaS":        "rgba(0,191,255,0.15)",
  "SaaS / Portal":    "rgba(16,185,129,0.12)",
  "FinTech / Gaming": "rgba(245,158,11,0.15)",
  "SaaS":             "rgba(16,185,129,0.12)",
  "GovTech":          "rgba(139,92,246,0.15)",
  "Web App":          "rgba(0,191,255,0.1)",
  "HealthTech / SaaS":"rgba(16,185,129,0.15)",
  "E-commerce / SaaS":"rgba(245,158,11,0.12)",
};

export default function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_CONFIG[project.status];
  const catBg = CATEGORY_COLORS[project.category] ?? "rgba(0,191,255,0.1)";

  return (
    <div
      className={`glass-card ${status.glowClass} p-5 flex flex-col h-full transition-all duration-300 cursor-default`}
      style={{ minHeight: "260px" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base truncate" style={{ color: "#f0f4ff" }}>
            {project.name}
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: "#6b7280" }}>
            {project.tagline}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              background: `${status.color}18`,
              border: `1px solid ${status.color}40`,
              color: status.color,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                background: status.dot,
                width: "6px",
                height: "6px",
              }}
            />
            {status.label}
          </div>
          {/* Category */}
          <div
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: catBg, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {project.category}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs mb-3 leading-relaxed flex-1" style={{ color: "#9ca3af" }}>
        {project.description}
      </p>

      {/* Highlight */}
      {project.highlight && (
        <div
          className="text-xs px-3 py-1.5 rounded-md mb-3 italic"
          style={{
            background: "rgba(0,191,255,0.06)",
            border: "1px solid rgba(0,191,255,0.15)",
            color: "rgba(0,191,255,0.7)",
          }}
        >
          ✦ {project.highlight}
        </div>
      )}

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="stack-chip">{tech}</span>
        ))}
        {project.stack.length > 4 && (
          <span className="stack-chip" style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.04)" }}>
            +{project.stack.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
