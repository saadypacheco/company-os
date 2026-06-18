"use client";

import { useEffect, useState, useCallback } from "react";
import { DEFAULT_VAULT, type VaultProject, type VaultCredential } from "@/lib/vault";

const LS_KEY = "company-os:vault-v1";

type Section = "links" | "creds" | "infra" | "notes";

interface CopiedState {
  [key: string]: boolean;
}

function useCopy() {
  const [copied, setCopied] = useState<CopiedState>({});
  const copy = useCallback((key: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1500);
    });
  }, []);
  return { copied, copy };
}

function CopyBtn({ id, value, small }: { id: string; value: string; small?: boolean }) {
  const { copied, copy } = useCopy();
  if (!value) return null;
  return (
    <button
      onClick={() => copy(id, value)}
      title="Copiar"
      className={`transition-all rounded px-1 ${small ? "text-[10px]" : "text-xs"}`}
      style={{ color: copied[id] ? "#10b981" : "#4b5563", background: "none", border: "none", cursor: "pointer" }}
    >
      {copied[id] ? "✓" : "⎘"}
    </button>
  );
}

function EditableField({
  label,
  value,
  onChange,
  sensitive = false,
  placeholder,
  mono = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  sensitive?: boolean;
  placeholder?: string;
  mono?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [visible, setVisible] = useState(false);

  const displayValue = sensitive && !visible ? (value ? "•".repeat(Math.min(value.length, 20)) : "") : value;

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          autoFocus
          className="cyber-input text-xs py-1 px-2 flex-1"
          type={sensitive ? "text" : "text"}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
          placeholder={placeholder}
          style={{ fontFamily: mono ? "JetBrains Mono, monospace" : "inherit", fontSize: "0.7rem" }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 group min-w-0">
      {value ? (
        <span
          className="text-xs truncate"
          style={{
            color: sensitive ? "#c084fc" : "#e2e8f0",
            fontFamily: mono ? "JetBrains Mono, monospace" : "inherit",
            fontSize: "0.7rem",
          }}
        >
          {displayValue}
        </span>
      ) : (
        <span className="text-xs" style={{ color: "#374151", fontStyle: "italic", fontSize: "0.65rem" }}>{placeholder ?? "—"}</span>
      )}
      {sensitive && value && (
        <button
          onClick={() => setVisible((v) => !v)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] shrink-0"
          style={{ color: "#4b5563", background: "none", border: "none", cursor: "pointer" }}
          title={visible ? "Ocultar" : "Mostrar"}
        >
          {visible ? "◉" : "○"}
        </button>
      )}
      {value && <CopyBtn id={`${label}-${value.slice(0, 6)}`} value={value} small />}
      <button
        onClick={() => { setDraft(value); setEditing(true); }}
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-[10px]"
        style={{ color: "#4b5563", background: "none", border: "none", cursor: "pointer" }}
        title="Editar"
      >
        ✎
      </button>
    </div>
  );
}

const SECTION_LABELS: Record<Section, string> = {
  links: "Links",
  creds: "Credenciales",
  infra: "Infra",
  notes: "Notas",
};

const INFRA_KEYS: { key: keyof import("@/lib/vault").VaultInfra; label: string }[] = [
  { key: "vercel", label: "Vercel" },
  { key: "render", label: "Render" },
  { key: "railway", label: "Railway" },
  { key: "supabase", label: "Supabase" },
  { key: "aws", label: "AWS" },
  { key: "docker", label: "Docker" },
  { key: "other", label: "Otro" },
];

const LINK_KEYS: { key: keyof import("@/lib/vault").VaultLink; label: string; color: string }[] = [
  { key: "prod", label: "Producción", color: "#10b981" },
  { key: "dev", label: "Dev", color: "#f59e0b" },
  { key: "staging", label: "Staging", color: "#8b5cf6" },
  { key: "github", label: "GitHub", color: "#9ca3af" },
  { key: "docs", label: "Docs", color: "#00bfff" },
];

function ProjectCard({
  project,
  onUpdate,
  onDelete,
}: {
  project: VaultProject;
  onUpdate: (p: VaultProject) => void;
  onDelete: () => void;
}) {
  const [section, setSection] = useState<Section>("links");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(project.name);

  const update = (patch: Partial<VaultProject>) =>
    onUpdate({ ...project, ...patch, updatedAt: new Date().toISOString() });

  const updateLink = (key: keyof import("@/lib/vault").VaultLink, value: string) =>
    update({ links: { ...project.links, [key]: value } });

  const updateInfra = (key: keyof import("@/lib/vault").VaultInfra, value: string) =>
    update({ infra: { ...project.infra, [key]: value } });

  const updateCred = (id: string, patch: Partial<VaultCredential>) =>
    update({
      credentials: project.credentials.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    });

  const addCred = () =>
    update({
      credentials: [
        ...project.credentials,
        { id: Date.now().toString(), label: "Nueva clave", value: "", sensitive: true },
      ],
    });

  const removeCred = (id: string) =>
    update({ credentials: project.credentials.filter((c) => c.id !== id) });

  const commitName = () => {
    if (nameDraft.trim()) update({ name: nameDraft.trim() });
    setEditingName(false);
  };

  return (
    <div
      className="glass-card p-0 overflow-hidden flex flex-col"
      style={{ borderColor: "rgba(255,255,255,0.06)", minHeight: 280 }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}
      >
        {editingName ? (
          <input
            autoFocus
            className="cyber-input text-sm py-1 px-2 flex-1 mr-2"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => { if (e.key === "Enter") commitName(); if (e.key === "Escape") setEditingName(false); }}
            style={{ fontSize: "0.85rem" }}
          />
        ) : (
          <button
            onClick={() => { setNameDraft(project.name); setEditingName(true); }}
            className="text-sm font-semibold text-left hover:text-cyan-400 transition-colors"
            style={{ color: "#f0f4ff", background: "none", border: "none", cursor: "pointer" }}
          >
            {project.name}
          </button>
        )}
        <div className="flex items-center gap-1">
          {confirmDelete ? (
            <>
              <button
                onClick={onDelete}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer" }}
              >
                Confirmar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{ background: "transparent", color: "#6b7280", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-[10px] opacity-30 hover:opacity-70 transition-opacity"
              style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
              title="Eliminar proyecto"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Section tabs */}
      <div
        className="flex border-b"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        {(Object.keys(SECTION_LABELS) as Section[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className="flex-1 py-1.5 text-[10px] font-medium transition-all"
            style={{
              color: section === s ? "#00bfff" : "#4b5563",
              background: section === s ? "rgba(0,191,255,0.05)" : "transparent",
              borderBottom: section === s ? "1px solid #00bfff" : "1px solid transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 220 }}>
        {/* LINKS */}
        {section === "links" && (
          <div className="space-y-2.5">
            {LINK_KEYS.map(({ key, label, color }) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="text-[9px] font-semibold uppercase tracking-wider shrink-0 w-16 text-right"
                  style={{ color }}
                >
                  {label}
                </span>
                <div className="flex-1 min-w-0">
                  <EditableField
                    label={`${project.id}-link-${key}`}
                    value={project.links[key] ?? ""}
                    onChange={(v) => updateLink(key, v)}
                    placeholder={key === "github" ? "https://github.com/..." : "https://..."}
                    mono
                  />
                </div>
                {project.links[key] && (
                  <a
                    href={project.links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] shrink-0 hover:text-cyan-400 transition-colors"
                    style={{ color: "#374151" }}
                    title="Abrir"
                  >
                    ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CREDENTIALS */}
        {section === "creds" && (
          <div className="space-y-3">
            {project.credentials.length === 0 && (
              <p className="text-xs" style={{ color: "#374151", fontStyle: "italic" }}>Sin credenciales guardadas</p>
            )}
            {project.credentials.map((cred) => (
              <div key={cred.id} className="group">
                <div className="flex items-center gap-2 mb-0.5">
                  <input
                    className="text-[10px] bg-transparent border-none outline-none flex-1 font-medium"
                    value={cred.label}
                    onChange={(e) => updateCred(cred.id, { label: e.target.value })}
                    style={{ color: "#6b7280" }}
                  />
                  <label className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: "#4b5563" }}>
                    <input
                      type="checkbox"
                      checked={cred.sensitive}
                      onChange={(e) => updateCred(cred.id, { sensitive: e.target.checked })}
                      className="w-2.5 h-2.5"
                    />
                    Sensible
                  </label>
                  <button
                    onClick={() => removeCred(cred.id)}
                    className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity text-[9px]"
                    style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
                <EditableField
                  label={`${project.id}-cred-${cred.id}`}
                  value={cred.value}
                  onChange={(v) => updateCred(cred.id, { value: v })}
                  sensitive={cred.sensitive}
                  placeholder="Valor..."
                  mono
                />
              </div>
            ))}
            <button
              onClick={addCred}
              className="text-[10px] mt-1 hover:text-cyan-400 transition-colors"
              style={{ color: "#374151", background: "none", border: "none", cursor: "pointer" }}
            >
              + Agregar clave
            </button>
          </div>
        )}

        {/* INFRA */}
        {section === "infra" && (
          <div className="space-y-2.5">
            {INFRA_KEYS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-[9px] font-semibold uppercase tracking-wider shrink-0 w-16 text-right" style={{ color: "#6b7280" }}>
                  {label}
                </span>
                <div className="flex-1 min-w-0">
                  <EditableField
                    label={`${project.id}-infra-${key}`}
                    value={project.infra[key] ?? ""}
                    onChange={(v) => updateInfra(key, v)}
                    placeholder="URL o comando..."
                    mono
                  />
                </div>
                {project.infra[key] && project.infra[key]!.startsWith("http") && (
                  <a
                    href={project.infra[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] shrink-0 hover:text-cyan-400 transition-colors"
                    style={{ color: "#374151" }}
                    title="Abrir"
                  >
                    ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* NOTES */}
        {section === "notes" && (
          <div>
            <textarea
              className="w-full cyber-input text-xs"
              rows={6}
              placeholder="Notas libres: arquitectura, pendientes, contexto importante..."
              value={project.notes}
              onChange={(e) => update({ notes: e.target.value })}
              style={{ resize: "vertical", fontSize: "0.7rem", lineHeight: 1.6 }}
            />
            {project.updatedAt && (
              <p className="text-[10px] mt-2" style={{ color: "#374151" }}>
                Actualizado: {new Date(project.updatedAt).toLocaleString("es-AR")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AddProjectModal({ onAdd, onClose }: { onAdd: (name: string) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="glass-card p-6 w-80"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: "rgba(0,191,255,0.2)" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#f0f4ff" }}>Nuevo proyecto</h3>
        <input
          autoFocus
          className="cyber-input w-full mb-4"
          placeholder="Nombre del proyecto..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) { onAdd(name.trim()); onClose(); } if (e.key === "Escape") onClose(); }}
        />
        <div className="flex gap-2">
          <button
            onClick={() => { if (name.trim()) { onAdd(name.trim()); onClose(); } }}
            disabled={!name.trim()}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
            style={{ background: "rgba(0,191,255,0.15)", color: "#00bfff", border: "1px solid rgba(0,191,255,0.25)", cursor: "pointer" }}
          >
            Crear
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg text-sm transition-all"
            style={{ background: "transparent", color: "#6b7280", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectVault() {
  const [vault, setVault] = useState<VaultProject[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as VaultProject[];
        setVault(parsed);
      } else {
        setVault(DEFAULT_VAULT);
      }
    } catch {
      setVault(DEFAULT_VAULT);
    }
    setMounted(true);
  }, []);

  const save = useCallback((next: VaultProject[]) => {
    setVault(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const updateProject = useCallback((updated: VaultProject) => {
    setVault((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setVault((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const addProject = useCallback((name: string) => {
    const newProject: VaultProject = {
      id: Date.now().toString(),
      name,
      links: {},
      credentials: [],
      infra: {},
      comms: {},
      notes: "",
      updatedAt: new Date().toISOString(),
    };
    save([...vault, newProject]);
  }, [vault, save]);

  const filtered = vault.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.notes.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="h-48 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.03)" }} />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="section-heading mb-1">// proyecto vault</div>
          <h2 className="text-2xl font-bold" style={{ color: "#f0f4ff" }}>
            Acceso Centralizado{" "}
            <span className="gradient-text">de Proyectos</span>
          </h2>
          <p className="text-xs mt-1" style={{ color: "#4b5563" }}>
            URLs, repos, claves y credenciales — todo en un lugar. Solo visible en dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="cyber-input text-sm"
            placeholder="Buscar proyecto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap hover:scale-[1.02]"
            style={{
              background: "rgba(0,191,255,0.1)",
              border: "1px solid rgba(0,191,255,0.25)",
              color: "#00bfff",
              cursor: "pointer",
            }}
          >
            + Proyecto
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-xs"
        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", color: "#92400e" }}
      >
        <span style={{ color: "#f59e0b" }}>⚠</span>
        <span style={{ color: "#92400e" }}>
          Las credenciales se guardan en <strong style={{ color: "#f59e0b" }}>localStorage</strong> de este navegador.
          No uses este vault para secretos de producción críticos. Para mayor seguridad, migrá a Supabase en Fase 3.
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#374151" }}>
          <div className="text-3xl mb-3">◻</div>
          <p className="text-sm">{search ? "Sin resultados para esa búsqueda" : "No hay proyectos aún"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={updateProject}
              onDelete={() => deleteProject(project.id)}
            />
          ))}
        </div>
      )}

      {showAdd && <AddProjectModal onAdd={addProject} onClose={() => setShowAdd(false)} />}
    </section>
  );
}
