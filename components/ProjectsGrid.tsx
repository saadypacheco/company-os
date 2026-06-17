"use client";

import { useState } from "react";
import { PROJECTS, ProjectStatus } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const FILTERS: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Producción", value: "production" },
  { label: "Activos", value: "active" },
  { label: "MVP", value: "mvp" },
  { label: "Prototipo", value: "prototype" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div>
          <div className="section-heading mb-1">// proyectos</div>
          <h2 className="text-3xl font-bold" style={{ color: "#f0f4ff" }}>
            Radar de Proyectos
          </h2>
        </div>
        <div className="flex-1 h-px ml-4" style={{ background: "linear-gradient(90deg, rgba(0,191,255,0.3), transparent)" }} />
        <span
          className="text-sm px-3 py-1 rounded-lg"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            background: "rgba(0,191,255,0.08)",
            border: "1px solid rgba(0,191,255,0.2)",
            color: "rgba(0,191,255,0.7)",
          }}
        >
          {filtered.length} / {PROJECTS.length}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => {
          const active = f.value === filter;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: active ? "rgba(0,191,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${active ? "rgba(0,191,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: active ? "#00bfff" : "#6b7280",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
