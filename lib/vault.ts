export interface VaultLink {
  prod?: string;
  dev?: string;
  staging?: string;
  github?: string;
  docs?: string;
}

export interface VaultCredential {
  id: string;
  label: string;
  value: string;
  sensitive: boolean;
}

export interface VaultInfra {
  vercel?: string;
  render?: string;
  railway?: string;
  supabase?: string;
  aws?: string;
  docker?: string;
  other?: string;
}

export interface VaultComms {
  slack?: string;
  discord?: string;
  whatsapp?: string;
}

export interface VaultProject {
  id: string;
  name: string;
  links: VaultLink;
  credentials: VaultCredential[];
  infra: VaultInfra;
  comms: VaultComms;
  notes: string;
  updatedAt: string;
}

// Default structure seeded from known projects — user fills in actual values
export const DEFAULT_VAULT: VaultProject[] = [
  {
    id: "tienda",
    name: "Tienda IA",
    links: { prod: "", dev: "", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "Gemini API Key", value: "", sensitive: true },
      { id: "4", label: "MercadoPago Access Token", value: "", sensitive: true },
    ],
    infra: { vercel: "", railway: "", supabase: "" },
    comms: { slack: "#tienda-ia" },
    notes: "SaaS multi-tenant. FE en Vercel, BE en Railway.",
    updatedAt: "",
  },
  {
    id: "betamigos",
    name: "Betamigos",
    links: { prod: "", dev: "", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "API-Football Key", value: "", sensitive: true },
      { id: "4", label: "MercadoPago Access Token", value: "", sensitive: true },
    ],
    infra: { vercel: "", railway: "", supabase: "" },
    comms: { slack: "#betamigos" },
    notes: "Mundial 2026. Liquidación automática activada.",
    updatedAt: "",
  },
  {
    id: "mentorcomercial",
    name: "MentorComercial",
    links: { prod: "", dev: "http://localhost:3000", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "OpenAI API Key", value: "", sensitive: true },
      { id: "4", label: "WAHA API URL", value: "", sensitive: false },
      { id: "5", label: "WAHA API Key", value: "", sensitive: true },
    ],
    infra: { render: "", supabase: "" },
    comms: { slack: "#mentor-comercial" },
    notes: "Demo lista. WAHA corriendo en Docker. Whisper para transcripción.",
    updatedAt: "",
  },
  {
    id: "bermejo",
    name: "Bermejo Digital",
    links: { prod: "", dev: "http://localhost:3001", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "WAHA API URL", value: "", sensitive: false },
    ],
    infra: { vercel: "", supabase: "" },
    comms: { slack: "#bermejo" },
    notes: "Marketplace Bolivia. WhatsApp → feed. TikTok publishing pendiente.",
    updatedAt: "",
  },
  {
    id: "apops",
    name: "APOPS",
    links: { prod: "", dev: "", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "Supabase Service Role Key", value: "", sensitive: true },
    ],
    infra: { vercel: "", supabase: "" },
    comms: { slack: "#apops" },
    notes: "Portal sindicato ANSES Argentina. Auth completo, consultas en desarrollo.",
    updatedAt: "",
  },
  {
    id: "solucionesdentales",
    name: "Soluciones Dentales",
    links: { prod: "", dev: "http://localhost:3002", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "Gemini API Key", value: "", sensitive: true },
    ],
    infra: { vercel: "", render: "", supabase: "" },
    comms: { slack: "#soluciones-dentales" },
    notes: "CRM dental + agente IA recepcionista. Replicable a cualquier consultorio.",
    updatedAt: "",
  },
  {
    id: "gestordenes",
    name: "GestiónOrdenes",
    links: { prod: "", dev: "", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "API Base URL", value: "", sensitive: false },
      { id: "2", label: "API Key", value: "", sensitive: true },
    ],
    infra: { other: "Expo + EAS Build" },
    comms: { slack: "#gestion-ordenes" },
    notes: "App mobile campo. Expo SDK 54. Offline-first con SQLite.",
    updatedAt: "",
  },
  {
    id: "buscarjobs-saas",
    name: "BuscarJobs (Docker)",
    links: { prod: "", dev: "http://localhost:3003", github: "https://github.com/saadypacheco/" },
    credentials: [
      { id: "1", label: "Anthropic API Key", value: "", sensitive: true },
      { id: "2", label: "OpenAI API Key", value: "", sensitive: true },
    ],
    infra: { docker: "docker compose up -d", render: "" },
    comms: {},
    notes: "Self-hosted Docker. Distribución a clientes via docker-compose.yml.",
    updatedAt: "",
  },
  {
    id: "company-os",
    name: "Company OS (este sitio)",
    links: { prod: "https://company-os.onrender.com", dev: "http://localhost:3000", github: "https://github.com/saadypacheco/company-os" },
    credentials: [
      { id: "1", label: "DASHBOARD_SECRET", value: "", sensitive: true },
      { id: "2", label: "N8N_WEBHOOK_URL", value: "", sensitive: false },
      { id: "3", label: "GA_ID", value: "", sensitive: false },
    ],
    infra: { render: "https://dashboard.render.com" },
    comms: {},
    notes: "Next.js 14 + next-intl. Deploy automático desde GitHub en Render.",
    updatedAt: "",
  },
];
