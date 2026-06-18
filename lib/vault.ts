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

export const DEFAULT_VAULT: VaultProject[] = [
  {
    id: "tienda",
    name: "Tienda IA (Amanda)",
    links: {
      prod: "https://amandaclouthing.cloud",
      dev: "http://localhost:3000",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "https://gmwtanvhwblayomqkvev.supabase.co", sensitive: false },
      { id: "2", label: "Supabase Service Role Key", value: "", sensitive: true },
      { id: "3", label: "JWT Secret", value: "", sensitive: true },
      { id: "4", label: "Gemini API Key", value: "", sensitive: true },
      { id: "5", label: "MercadoPago Access Token", value: "", sensitive: true },
      { id: "6", label: "Telegram Bot Token", value: "", sensitive: true },
      { id: "7", label: "Telegram Channel", value: "@AmandaClothingStore", sensitive: false },
    ],
    infra: {
      docker: "/docker/amanda/docker-compose.yml",
      other: "VPS Hostinger srv1064770 · Traefik v3.1",
    },
    comms: { slack: "#tienda-ia" },
    notes: "Stack: Next.js + FastAPI + Supabase + Telegram. 2 contenedores: amanda-frontend (3000) + amanda-backend (8000). Arriba hace 4 semanas. Se va a convertir en tienda general de productos. RECO_CRON_HORA=2 (recomendaciones IA a las 2am). Supabase project: gmwtanvhwblayomqkvev.",
    updatedAt: "",
  },
  {
    id: "bermejo",
    name: "Bermejo Digital (buscadonde)",
    links: {
      prod: "",
      dev: "http://localhost:3003",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "WAHA API URL", value: "", sensitive: false },
    ],
    infra: {
      docker: "/docker/buscadonde/infra/docker-compose.prod.yml",
      other: "VPS Hostinger srv1064770 · Traefik · Whisper models en volumen buscadonde_whisper_models",
    },
    comms: { slack: "#bermejo" },
    notes: "Dominio interno: buscadonde. 2 contenedores: buscadonde-frontend (3003) + buscadonde-backend (8000). Volumen de modelos Whisper (speech-to-text). Arriba hace 2 días.",
    updatedAt: "",
  },
  {
    id: "mentorcomercial",
    name: "MentorComercial",
    links: {
      prod: "",
      dev: "http://localhost:3000",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "OpenAI API Key", value: "", sensitive: true },
      { id: "4", label: "WAHA API URL", value: "", sensitive: false },
      { id: "5", label: "WAHA API Key", value: "", sensitive: true },
    ],
    infra: {
      docker: "/docker/mentorcomercial/infra/docker-compose.prod.yml",
      other: "VPS Hostinger srv1064770 · Traefik · 4 contenedores",
    },
    comms: { slack: "#mentor-comercial" },
    notes: "4 contenedores: mc-frontend (3000) + mc-backend (8002) + mc-worker (8002) + mc-waha (WAHA bridge). WAHA usa 402MB RAM. Sesiones WhatsApp en volumen mentorcomercial_waha_sessions. Media en mentorcomercial_waha_media. Arriba hace 6–9 horas (se reinició).",
    updatedAt: "",
  },
  {
    id: "solucionesdentales",
    name: "Soluciones Dentales (odonto)",
    links: {
      prod: "",
      dev: "http://localhost:3002",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "Gemini API Key", value: "", sensitive: true },
    ],
    infra: {
      docker: "/docker/odonto/docker-compose.prod.yml",
      other: "VPS Hostinger srv1064770 · Traefik · 2 contenedores",
    },
    comms: { slack: "#soluciones-dentales" },
    notes: "Stack interno: odonto. 2 contenedores: dentales-frontend (3000) + dentales-backend (8000, 122MB RAM). Arriba hace 2 semanas — el más estable del VPS.",
    updatedAt: "",
  },
  {
    id: "betamigos",
    name: "Betamigos",
    links: {
      prod: "",
      dev: "",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "API-Football Key", value: "", sensitive: true },
      { id: "4", label: "MercadoPago Access Token", value: "", sensitive: true },
    ],
    infra: { other: "No desplegado en VPS todavía" },
    comms: { slack: "#betamigos" },
    notes: "MVP completo. Pendiente deploy en VPS. Stack: Next.js + FastAPI + Supabase Realtime + API-Football + MercadoPago.",
    updatedAt: "",
  },
  {
    id: "apops",
    name: "APOPS",
    links: {
      prod: "",
      dev: "",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Supabase URL", value: "", sensitive: false },
      { id: "2", label: "Supabase Anon Key", value: "", sensitive: true },
      { id: "3", label: "Supabase Service Role Key", value: "", sensitive: true },
    ],
    infra: { vercel: "" },
    comms: { slack: "#apops" },
    notes: "Portal sindicato ANSES Argentina. PWA instalable. Deploy en Vercel (no está en el VPS).",
    updatedAt: "",
  },
  {
    id: "gestordenes",
    name: "GestiónOrdenes",
    links: {
      prod: "",
      dev: "",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "API Base URL", value: "", sensitive: false },
      { id: "2", label: "API Key", value: "", sensitive: true },
    ],
    infra: { other: "Expo + EAS Build — app mobile, no corre en VPS" },
    comms: { slack: "#gestion-ordenes" },
    notes: "App mobile React Native. Offline-first con SQLite. Build via EAS.",
    updatedAt: "",
  },
  {
    id: "buscarjobs-saas",
    name: "BuscarJobs (Docker SaaS)",
    links: {
      prod: "",
      dev: "http://localhost:3003",
      github: "https://github.com/saadypacheco/",
    },
    credentials: [
      { id: "1", label: "Anthropic API Key", value: "", sensitive: true },
      { id: "2", label: "OpenAI API Key", value: "", sensitive: true },
    ],
    infra: {
      docker: "docker compose up -d  # single image: frontend + backend",
      other: "Self-hosted en VPS cliente — no en srv1064770",
    },
    comms: {},
    notes: "Distribución a clientes via docker-compose.yml. BYOK (trae tu propia key). Single-image: Next.js 16 + FastAPI + SQLite.",
    updatedAt: "",
  },
  {
    id: "traefik-vps",
    name: "Traefik (VPS srv1064770)",
    links: {
      prod: "https://traefik.tu-dominio.com",
      github: "",
    },
    credentials: [
      { id: "1", label: "Dashboard URL", value: "", sensitive: false },
      { id: "2", label: "Dashboard Password", value: "", sensitive: true },
      { id: "3", label: "Hostinger VPS Panel", value: "https://hpanel.hostinger.com", sensitive: false },
      { id: "4", label: "SSH", value: "root@srv1064770", sensitive: false },
    ],
    infra: {
      docker: "/docker/traefik/docker-compose.yml",
      other: "Traefik v3.1 · Puerto 80+443 · Let's Encrypt automático",
    },
    comms: {},
    notes: "Reverse proxy central del VPS. Maneja SSL de todos los proyectos. Redes Docker: traefik (bridge compartida). Uptime: 5 días. Todos los proyectos se conectan a la red traefik para exponer dominios.",
    updatedAt: "",
  },
  {
    id: "company-os",
    name: "Company OS (este sitio)",
    links: {
      prod: "https://company-os.onrender.com",
      dev: "http://localhost:3000",
      github: "https://github.com/saadypacheco/company-os",
    },
    credentials: [
      { id: "1", label: "DASHBOARD_SECRET", value: "", sensitive: true },
      { id: "2", label: "N8N_WEBHOOK_URL", value: "", sensitive: false },
      { id: "3", label: "GA_ID", value: "", sensitive: false },
    ],
    infra: {
      render: "https://dashboard.render.com",
      other: "No está en el VPS — corre en Render (free tier)",
    },
    comms: {},
    notes: "Next.js 14 + next-intl ES/EN/PT. Deploy automático desde GitHub en Render. Dashboard protegido con DASHBOARD_SECRET.",
    updatedAt: "",
  },
];
