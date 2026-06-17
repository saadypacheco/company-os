"use client";

import { useState, useEffect } from "react";
import { Idea, DEFAULT_IDEAS, calcPriorityScore } from "@/lib/data";

const STATUS_LABELS: Record<Idea["status"], { label: string; color: string }> = {
  idea:       { label: "Idea",        color: "#8b5cf6" },
  evaluating: { label: "Evaluando",   color: "#00bfff" },
  decided:    { label: "Decidido",    color: "#f59e0b" },
  active:     { label: "Activa",      color: "#10b981" },
  discarded:  { label: "Descartada",  color: "#6b7280" },
};

function ScoreBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="score-bar w-full">
      <div
        className="score-bar-fill"
        style={{ width: `${(value / max) * 100}%`, background: color }}
      />
    </div>
  );
}

function ScoreCell({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col gap-1 min-w-[60px]">
      <div className="flex justify-between items-center">
        <span className="text-xs" style={{ color: "#6b7280" }}>{label}</span>
        <span
          className="text-xs font-mono font-bold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <ScoreBar value={value} color={color} />
    </div>
  );
}

const EMPTY_IDEA: Omit<Idea, "id" | "createdAt"> = {
  name: "",
  description: "",
  effort: 3,
  economic: 3,
  strategic: 3,
  timeMonths: 3,
  status: "idea",
  notes: "",
};

type SortKey = "score" | "economic" | "strategic" | "effort" | "timeMonths" | "name";

export default function IdeasMatrix() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortAsc, setSortAsc] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_IDEA);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sp-hub-ideas");
    setIdeas(saved ? JSON.parse(saved) : DEFAULT_IDEAS);
  }, []);

  const saveIdeas = (next: Idea[]) => {
    setIdeas(next);
    localStorage.setItem("sp-hub-ideas", JSON.stringify(next));
  };

  const getVal = (idea: Idea): number | string => {
    if (sortKey === "score") return calcPriorityScore(idea);
    const v = idea[sortKey as keyof Idea];
    return typeof v === "number" ? v : String(v);
  };

  const sorted = [...ideas].sort((a, b) => {
    let av = getVal(a);
    let bv = getVal(b);
    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();
    return sortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc((p) => !p);
    else { setSortKey(key); setSortAsc(false); }
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editId) {
      saveIdeas(ideas.map((i) => i.id === editId ? { ...form, id: editId, createdAt: i.createdAt } : i));
      setEditId(null);
    } else {
      const newIdea: Idea = {
        ...form,
        id: `idea-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveIdeas([...ideas, newIdea]);
    }
    setForm(EMPTY_IDEA);
    setShowForm(false);
  };

  const handleEdit = (idea: Idea) => {
    setForm({ name: idea.name, description: idea.description, effort: idea.effort, economic: idea.economic, strategic: idea.strategic, timeMonths: idea.timeMonths, status: idea.status, notes: idea.notes });
    setEditId(idea.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    saveIdeas(ideas.filter((i) => i.id !== id));
  };

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      onClick={() => handleSort(col)}
      className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-cyan-400"
      style={{ color: sortKey === col ? "#00bfff" : "#6b7280" }}
    >
      {label}
      <span style={{ fontSize: "0.6rem" }}>{sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}</span>
    </button>
  );

  const maxScore = Math.max(...ideas.map(calcPriorityScore), 1);

  return (
    <section id="ideas" className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="section-heading mb-1">// priorización</div>
          <h2 className="text-3xl font-bold" style={{ color: "#f0f4ff" }}>
            Ideas & Oportunidades
          </h2>
        </div>
        <button
          onClick={() => { setForm(EMPTY_IDEA); setEditId(null); setShowForm((p) => !p); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            background: showForm ? "rgba(0,191,255,0.15)" : "rgba(0,191,255,0.08)",
            border: "1px solid rgba(0,191,255,0.3)",
            color: "#00bfff",
          }}
        >
          {showForm ? "✕ Cerrar" : "+ Nueva idea"}
        </button>
      </div>

      {/* Formula explanation */}
      <div
        className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl mb-8 text-xs"
        style={{ background: "rgba(0,191,255,0.04)", border: "1px solid rgba(0,191,255,0.1)", color: "#6b7280" }}
      >
        <span style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,191,255,0.7)" }}>
          Score = (Potencial × Estratégico) ÷ Esfuerzo
        </span>
        <span className="hidden sm:inline">·</span>
        <span>Máx ideal: alto potencial + alta estrategia + bajo esfuerzo</span>
        <span className="hidden sm:inline">·</span>
        <span>Escalas 1–5</span>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div
          className="glass-card p-6 mb-6"
          style={{ borderColor: "rgba(0,191,255,0.25)" }}
        >
          <div className="text-sm font-medium mb-4" style={{ color: "#00bfff" }}>
            {editId ? "Editar idea" : "Nueva idea"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#6b7280" }}>Nombre *</label>
              <input
                className="cyber-input"
                placeholder="Ej: App de delivery para UAJMS"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#6b7280" }}>Estado</label>
              <select
                className="cyber-input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Idea["status"] })}
                style={{ cursor: "pointer" }}
              >
                {Object.entries(STATUS_LABELS).map(([v, { label }]) => (
                  <option key={v} value={v} style={{ background: "#0a0a1a" }}>{label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs mb-1 block" style={{ color: "#6b7280" }}>Descripción</label>
              <input
                className="cyber-input"
                placeholder="Qué problema resuelve, quién es el cliente, cómo se monetiza"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            {(
              [
                { key: "effort"    , label: "Esfuerzo",           color: "#ef4444", desc: "1=trivial · 5=enorme",  isTime: false },
                { key: "economic"  , label: "Potencial económico", color: "#10b981", desc: "1=bajo · 5=muy alto",  isTime: false },
                { key: "strategic" , label: "Interés estratégico", color: "#8b5cf6", desc: "1=táctico · 5=núcleo", isTime: false },
                { key: "timeMonths", label: "Meses estimados",     color: "#f59e0b", desc: "tiempo para MVP",       isTime: true  },
              ] as { key: "effort"|"economic"|"strategic"|"timeMonths"; label: string; color: string; desc: string; isTime: boolean }[]
            ).map(({ key, label, color, desc, isTime }) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium" style={{ color: "#9ca3af" }}>{label}</label>
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "JetBrains Mono, monospace", color }}
                  >
                    {form[key]}{isTime ? "m" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min={isTime ? 1 : 1}
                  max={isTime ? 24 : 5}
                  step={1}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                  className="w-full cursor-pointer"
                  style={{ accentColor: color }}
                />
                <div className="text-xs mt-1" style={{ color: "#4b5563" }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Preview score */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-4"
            style={{ background: "rgba(0,191,255,0.06)", border: "1px solid rgba(0,191,255,0.15)" }}
          >
            <span className="text-xs" style={{ color: "#6b7280" }}>Score proyectado:</span>
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {calcPriorityScore(form)}
            </span>
            <span className="text-xs" style={{ color: "#4b5563" }}>/ 25 teórico máx</span>
          </div>

          <div className="mb-4">
            <label className="text-xs mb-1 block" style={{ color: "#6b7280" }}>Notas</label>
            <input
              className="cyber-input"
              placeholder="Competencia, riesgos, clientes potenciales, dependencias..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.4)", color: "#00bfff" }}
            >
              {editId ? "Guardar cambios" : "Agregar idea"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_IDEA); }}
              className="px-5 py-2 rounded-lg text-sm transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {/* Table header */}
        <div
          className="grid items-center px-5 py-3 text-xs"
          style={{
            gridTemplateColumns: "1fr 80px 80px 80px 70px 90px 80px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <SortBtn col="name" label="IDEA" />
          <SortBtn col="effort" label="ESFUERZO" />
          <SortBtn col="economic" label="POTENCIAL" />
          <SortBtn col="strategic" label="ESTRATÉGICO" />
          <SortBtn col="timeMonths" label="TIEMPO" />
          <SortBtn col="score" label="SCORE ⚡" />
          <span className="text-xs" style={{ color: "#4b5563" }}>ESTADO</span>
        </div>

        {/* Rows */}
        {sorted.map((idea, idx) => {
          const score = calcPriorityScore(idea);
          const scoreRatio = score / maxScore;
          const st = STATUS_LABELS[idea.status];
          const isTop = idx === 0 && sortKey === "score" && !sortAsc;

          return (
            <div
              key={idea.id}
              className="group grid items-start px-5 py-4 transition-all duration-200 hover:bg-white/[0.025]"
              style={{
                gridTemplateColumns: "1fr 80px 80px 80px 70px 90px 80px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: isTop ? "rgba(0,191,255,0.04)" : undefined,
              }}
            >
              {/* Name & desc */}
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  {isTop && (
                    <span className="text-xs" style={{ color: "#f59e0b" }}>★</span>
                  )}
                  <span className="text-sm font-medium" style={{ color: "#f0f4ff" }}>{idea.name}</span>
                </div>
                {idea.description && (
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6b7280" }}>
                    {idea.description}
                  </div>
                )}
                {idea.notes && (
                  <div className="text-xs mt-1 italic" style={{ color: "#4b5563" }}>
                    → {idea.notes}
                  </div>
                )}
              </div>

              {/* Effort */}
              <div className="pt-1">
                <ScoreCell label="" value={idea.effort} color="#ef4444" />
              </div>

              {/* Economic */}
              <div className="pt-1">
                <ScoreCell label="" value={idea.economic} color="#10b981" />
              </div>

              {/* Strategic */}
              <div className="pt-1">
                <ScoreCell label="" value={idea.strategic} color="#8b5cf6" />
              </div>

              {/* Time */}
              <div className="text-xs pt-1" style={{ color: "#f59e0b", fontFamily: "JetBrains Mono, monospace" }}>
                {idea.timeMonths}m
              </div>

              {/* Score */}
              <div className="pt-1">
                <div
                  className="text-lg font-bold mb-1"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: scoreRatio > 0.7 ? "#10b981" : scoreRatio > 0.4 ? "#00bfff" : "#6b7280",
                  }}
                >
                  {score}
                </div>
                <div className="score-bar w-14">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${scoreRatio * 100}%`,
                      background: scoreRatio > 0.7 ? "#10b981" : scoreRatio > 0.4 ? "#00bfff" : "#6b7280",
                    }}
                  />
                </div>
              </div>

              {/* Status + actions */}
              <div className="flex flex-col gap-2 items-start">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${st.color}18`,
                    border: `1px solid ${st.color}40`,
                    color: st.color,
                  }}
                >
                  {st.label}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(idea)}
                    className="text-xs hover:text-cyan-400 transition-colors"
                    style={{ color: "#4b5563" }}
                  >
                    editar
                  </button>
                  <button
                    onClick={() => handleDelete(idea.id)}
                    className="text-xs hover:text-red-400 transition-colors"
                    style={{ color: "#4b5563" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {ideas.length === 0 && (
          <div className="px-5 py-12 text-center" style={{ color: "#4b5563" }}>
            <div className="text-2xl mb-2">◈</div>
            <div className="text-sm">Sin ideas registradas. ¡Agregá la primera!</div>
          </div>
        )}
      </div>

      {/* Summary row */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: "#4b5563" }}>
        <span>{ideas.length} ideas registradas</span>
        <span>·</span>
        <span>{ideas.filter(i => i.status === "active").length} activas</span>
        <span>·</span>
        <span>{ideas.filter(i => i.status === "evaluating").length} en evaluación</span>
        <span>·</span>
        <span style={{ color: "#f59e0b" }}>
          Top idea: {sorted[0]?.name ?? "—"} ({calcPriorityScore(sorted[0] ?? DEFAULT_IDEAS[0])})
        </span>
      </div>
    </section>
  );
}
