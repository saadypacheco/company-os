"use client";

import { useState } from "react";
import { SLACK_WORKSPACES } from "@/lib/data";

const TYPE_COLORS = {
  project:  { bg: "rgba(0,191,255,0.1)",   border: "rgba(0,191,255,0.2)",   text: "#00bfff",  icon: "◆" },
  general:  { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#9ca3af",  icon: "◇" },
  client:   { bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.2)",  text: "#10b981",  icon: "◈" },
  learning: { bg: "rgba(139,92,246,0.1)",   border: "rgba(139,92,246,0.2)",  text: "#8b5cf6",  icon: "◉" },
};

export default function SlackPanel() {
  const [activeWs, setActiveWs] = useState(0);
  const ws = SLACK_WORKSPACES[activeWs];

  return (
    <section id="workspace" className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div>
          <div className="section-heading mb-1">// comunicación</div>
          <h2 className="text-3xl font-bold" style={{ color: "#f0f4ff" }}>
            Workspace Slack
          </h2>
        </div>
        <div className="flex-1 h-px ml-4" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar: workspaces */}
        <div className="space-y-2">
          <div className="text-xs mb-3 px-1" style={{ color: "#4b5563", letterSpacing: "0.1em" }}>WORKSPACES</div>
          {SLACK_WORKSPACES.map((w, i) => (
            <button
              key={w.name}
              onClick={() => setActiveWs(i)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
              style={{
                background: activeWs === i ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeWs === i ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  background: activeWs === i ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)",
                  color: activeWs === i ? "#8b5cf6" : "#6b7280",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {w.name[0]}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: activeWs === i ? "#f0f4ff" : "#9ca3af" }}>
                  {w.name}
                </div>
                <div className="text-xs" style={{ color: "#4b5563" }}>
                  {w.channels.length} canales
                </div>
              </div>
              {activeWs === i && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6" }} />
              )}
            </button>
          ))}

          {/* Quick stats */}
          <div
            className="mt-6 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="text-xs mb-3" style={{ color: "#4b5563", letterSpacing: "0.1em" }}>LEYENDA</div>
            {Object.entries(TYPE_COLORS).map(([type, cfg]) => (
              <div key={type} className="flex items-center gap-2 mb-2 text-xs">
                <span style={{ color: cfg.text }}>{cfg.icon}</span>
                <span style={{ color: "#6b7280", textTransform: "capitalize" }}>
                  {type === "project" ? "Proyecto" : type === "general" ? "General" : type === "client" ? "Cliente" : "Aprendizaje"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel list */}
        <div className="lg:col-span-2">
          <div
            className="glass-card overflow-hidden"
            style={{ borderColor: "rgba(139,92,246,0.2)" }}
          >
            {/* Channel header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.15)" }}
            >
              <div>
                <div className="font-semibold text-sm" style={{ color: "#f0f4ff" }}>{ws.name}</div>
                <div className="text-xs" style={{ color: "#6b7280" }}>{ws.channels.length} canales activos</div>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#8b5cf6" }}
              >
                <span className="pulse-dot" style={{ background: "#8b5cf6", width: "6px", height: "6px" }} />
                Conectado
              </div>
            </div>

            {/* Channels */}
            <div className="divide-y" style={{ divideBorderColor: "rgba(255,255,255,0.04)" }}>
              {ws.channels.map((ch) => {
                const cfg = TYPE_COLORS[ch.type];
                return (
                  <div
                    key={ch.name}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                    >
                      <span style={{ color: cfg.text }}>{cfg.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: "#4b5563" }}>#</span>
                        <span className="text-sm font-medium" style={{ color: "#f0f4ff" }}>{ch.name}</span>
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{ch.purpose}</div>
                    </div>
                    <div
                      className="text-xs px-2 py-0.5 rounded-md shrink-0"
                      style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
                    >
                      {ch.type === "project" ? "proyecto" : ch.type === "general" ? "general" : ch.type === "client" ? "cliente" : "aprendizaje"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
