"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const t = useTranslations("contact");
  const services = t.raw("services") as string[];
  const budgets = t.raw("budgets") as string[];

  const [tab, setTab] = useState<"contacto" | "presupuesto">("contacto");
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: tab }),
      });
      if (!res.ok) throw new Error();
      setState("success");
      setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } catch {
      setState("error");
    }
  };

  const info = [
    { icon: "✉", label: t("info.email_label"),    value: t("info.email_value") },
    { icon: "💬", label: t("info.whatsapp_label"), value: t("info.whatsapp_value") },
    { icon: "📍", label: t("info.location_label"), value: t("info.location_value") },
    { icon: "🕐", label: t("info.response_label"), value: t("info.response_value") },
  ];

  return (
    <section id="contacto" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,191,255,0.06) 0%, transparent 60%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:pt-4">
            <div className="section-heading mb-3">// {t("heading")}</div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#f0f4ff" }}>
              {t("title")}<br /><span className="gradient-text">{t("title2")}</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#9ca3af" }}>{t("subtitle")}</p>
            <div className="space-y-5">
              {info.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: "rgba(0,191,255,0.08)", border: "1px solid rgba(0,191,255,0.15)" }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#4b5563" }}>{c.label}</div>
                    <div className="text-sm font-medium" style={{ color: "#f0f4ff" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div id="presupuesto">
            <div className="flex rounded-xl p-1 mb-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {(["contacto", "presupuesto"] as const).map((tabKey) => (
                <button key={tabKey} onClick={() => setTab(tabKey)} className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: tab === tabKey ? "rgba(0,191,255,0.12)" : "transparent",
                    border: tab === tabKey ? "1px solid rgba(0,191,255,0.3)" : "1px solid transparent",
                    color: tab === tabKey ? "#00bfff" : "#6b7280",
                  }}>
                  {tabKey === "contacto" ? t("tabs.quick") : t("tabs.budget")}
                </button>
              ))}
            </div>

            {state === "success" ? (
              <div className="glass-card p-12 text-center" style={{ borderColor: "rgba(16,185,129,0.3)" }}>
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "#10b981" }}>{t("success.title")}</h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>{t("success.desc")}</p>
                <button onClick={() => setState("idle")} className="mt-6 text-sm hover:text-cyan-400 transition-colors" style={{ color: "#4b5563" }}>
                  {t("success.back")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.name")} *</label>
                    <input className="cyber-input" placeholder={t("form.name_placeholder")} value={form.name} onChange={(e) => set("name", e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.email")} *</label>
                    <input type="email" className="cyber-input" placeholder={t("form.email_placeholder")} value={form.email} onChange={(e) => set("email", e.target.value)} required />
                  </div>
                </div>
                {tab === "presupuesto" && (
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.company")}</label>
                    <input className="cyber-input" placeholder={t("form.company_placeholder")} value={form.company} onChange={(e) => set("company", e.target.value)} />
                  </div>
                )}
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.service")}</label>
                  <select className="cyber-input" value={form.service} onChange={(e) => set("service", e.target.value)} style={{ cursor: "pointer" }}>
                    <option value="" style={{ background: "#0a0a1a" }}>{t("form.service_placeholder")}</option>
                    {services.map((s) => <option key={s} value={s} style={{ background: "#0a0a1a" }}>{s}</option>)}
                  </select>
                </div>
                {tab === "presupuesto" && (
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.budget")}</label>
                    <select className="cyber-input" value={form.budget} onChange={(e) => set("budget", e.target.value)} style={{ cursor: "pointer" }}>
                      <option value="" style={{ background: "#0a0a1a" }}>{t("form.budget_placeholder")}</option>
                      {budgets.map((b) => <option key={b} value={b} style={{ background: "#0a0a1a" }}>{b}</option>)}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>{t("form.message")} *</label>
                  <textarea className="cyber-input" rows={4}
                    placeholder={tab === "presupuesto" ? t("form.message_placeholder_budget") : t("form.message_placeholder_quick")}
                    value={form.message} onChange={(e) => set("message", e.target.value)} required style={{ resize: "vertical" }} />
                </div>
                {state === "error" && <p className="text-xs" style={{ color: "#ef4444" }}>{t("error")}</p>}
                <button type="submit" disabled={state === "loading"}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-60"
                  style={{
                    background: state === "loading" ? "rgba(0,191,255,0.1)" : "linear-gradient(135deg, #00bfff, #8b5cf6)",
                    color: "#fff",
                    boxShadow: state !== "loading" ? "0 0 20px rgba(0,191,255,0.2)" : "none",
                  }}>
                  {state === "loading" ? t("form.submitting") : tab === "presupuesto" ? t("form.submit_budget") : t("form.submit_quick")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
