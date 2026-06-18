"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(`/${locale}/dashboard`);
    } else {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,80,140,0.2) 0%, transparent 70%), #05050f",
      }}
    >
      {/* Logo */}
      <Link href={`/${locale}`} className="flex items-center gap-3 mb-10 group">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
          style={{
            background: "linear-gradient(135deg, rgba(0,191,255,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(0,191,255,0.4)",
            color: "#00bfff",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          SP
        </div>
        <span className="font-semibold text-sm" style={{ color: "#f0f4ff" }}>Saady Pacheco</span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-sm glass-card p-8"
        style={{ borderColor: "rgba(0,191,255,0.2)" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-1" style={{ color: "#f0f4ff" }}>{t("title")}</h1>
          <p className="text-xs" style={{ color: "#6b7280" }}>{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs mb-1.5 block" style={{ color: "#6b7280" }}>
              {t("password")}
            </label>
            <input
              type="password"
              className="cyber-input"
              placeholder={t("password_placeholder")}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setStatus("idle"); }}
              autoFocus
              required
            />
            {status === "error" && (
              <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{t("error")}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #00bfff, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,191,255,0.2)",
            }}
          >
            {status === "loading" ? t("submitting") : t("submit")}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href={`/${locale}`}
            className="text-xs transition-colors hover:text-cyan-400"
            style={{ color: "#4b5563" }}
          >
            {t("back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
