export type ProjectStatus = "production" | "active" | "mvp" | "prototype" | "archived";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  category: string;
  repoPath: string;
  features: string[];
  highlight?: string;
}

export interface Idea {
  id: string;
  name: string;
  description: string;
  effort: number;       // 1-5 (5 = mucho esfuerzo)
  economic: number;     // 1-5 (5 = alto potencial)
  strategic: number;    // 1-5 (5 = muy estratégico)
  timeMonths: number;   // meses estimados
  status: "idea" | "evaluating" | "decided" | "active" | "discarded";
  notes: string;
  createdAt: string;
}

export interface SlackChannel {
  name: string;
  purpose: string;
  workspace: string;
  type: "project" | "general" | "client" | "learning";
  unread?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "bermejo",
    name: "Bermejo Digital",
    tagline: "Marketplace hiperlocal vía WhatsApp",
    description: "Plataforma digital para comerciantes de Bermejo, Bolivia. Los comerciantes publican ofertas por WhatsApp y aparecen en tiempo real en un feed web.",
    status: "mvp",
    stack: ["Next.js 14", "FastAPI", "Supabase", "WAHA"],
    category: "Marketplace",
    repoPath: "Bermejo",
    features: ["WhatsApp bridge", "Feed en tiempo real", "Aprobación de ofertas", "TikTok publishing (pendiente)"],
    highlight: "Primer marketplace WhatsApp-first de Bolivia",
  },
  {
    id: "gestordenes",
    name: "GestiónOrdenes",
    tagline: "App mobile para técnicos de campo",
    description: "Migración React Native de app legacy Ionic. Gestión de órdenes de trabajo offline-first para instaladores en campo.",
    status: "active",
    stack: ["Expo SDK 54", "React Native", "TypeScript", "Zustand", "SQLite/Drizzle"],
    category: "Mobile",
    repoPath: "GestionOrdenes",
    features: ["Offline-first SQLite", "Cámara integrada", "Sync diferida", "Tabs por fase"],
  },
  {
    id: "mentorcomercial",
    name: "MentorComercial",
    tagline: "Inteligencia comercial para líderes de equipos de venta",
    description: "Plataforma para agencias de seguros y equipos comerciales. Captura automáticamente los grupos de WhatsApp, transcribe audios, detecta con IA oportunidades, clientes en riesgo y agentes estancados. Dashboard mobile-first, briefing diario y asistente conversacional.",
    status: "production",
    stack: ["Next.js 14", "FastAPI", "Supabase", "WAHA", "Whisper", "Gemini"],
    category: "IA / SaaS",
    repoPath: "mentorcomercial",
    features: [
      "Captura automática de grupos WhatsApp",
      "Transcripción de audios con Whisper",
      "Detección IA: oportunidades, riesgos, agentes estancados",
      "Briefing diario y asistente conversacional",
      "Dashboard mobile-first con paneles por líder",
      "Onboarding de agentes",
    ],
    highlight: "En producción con cliente real — agencia de seguros ~2.000 agentes",
  },
  {
    id: "apops",
    name: "APOPS",
    tagline: "Portal de consultas para sindicato ANSES",
    description: "PWA para el sindicato APOPS de Argentina. Sistema de tickets para consultas entre afiliados y delegados, reemplazando el caos de WhatsApp.",
    status: "active",
    stack: ["Next.js 14", "Supabase Auth", "Edge Functions", "Web Push", "Vercel"],
    category: "SaaS / Portal",
    repoPath: "apops",
    features: ["Auth completo", "Sistema de tickets", "Notificaciones push", "PWA instalable"],
  },
  {
    id: "betamigos",
    name: "Betamigos",
    tagline: "Apuestas sociales para el Mundial 2026",
    description: "Plataforma de apuestas entre amigos para torneos. Grupos privados, mercados múltiples (1X2, exacto, goles), liquidación automática.",
    status: "mvp",
    stack: ["Next.js 14", "FastAPI", "Supabase Realtime", "API-Football", "MercadoPago"],
    category: "FinTech / Gaming",
    repoPath: "betamigos",
    features: ["Grupos privados", "3 tipos de mercado", "Liquidación automática", "Admin dashboards"],
    highlight: "MVP completo — próximo: live betting",
  },
  {
    id: "buscarjobs",
    name: "BuscarJobs",
    tagline: "SaaS para tracking de búsqueda laboral",
    description: "Plataforma single-tenant para dashboards de búsqueda laboral. Seguimiento de aplicaciones, deadlines y entrevistas. Self-hosted o cloud.",
    status: "production",
    stack: ["Next.js 14", "OpenAI/Anthropic API", "Docker"],
    category: "SaaS",
    repoPath: "buscarJobs",
    features: ["Dashboard de aplicaciones", "Wizard onboarding admin", "Self-hosted Docker", "IA integrada"],
  },
  {
    id: "campanapolitica",
    name: "Campaña Política",
    tagline: "Dashboard de campaña UAJMS 2030",
    description: "Dashboard de campaña política universitaria con estadísticas, mapas y visualizaciones. Prototipo/demo para UAJMS Salinas 2030.",
    status: "prototype",
    stack: ["Next.js 14", "Tailwind", "Recharts"],
    category: "GovTech",
    repoPath: "campanapolitica",
    features: ["Stats de campaña", "Mapas interactivos", "Visualizaciones", "Demo estático"],
  },
  {
    id: "petrolero",
    name: "Legado Güimar",
    tagline: "Plataforma de legado con IA",
    description: "Aplicación web cliente con Anthropic SDK integrado. Deployada en Render.",
    status: "production",
    stack: ["Next.js 14", "Tailwind", "Anthropic SDK", "Render"],
    category: "Web App",
    repoPath: "petrolero",
    features: ["IA integrada", "Deploy Render", "App cliente"],
  },
  {
    id: "solucionesdentales",
    name: "Soluciones Dentales",
    tagline: "CRM + turnos + agente IA para consultorios",
    description: "Sistema CRM para consultorios dentales con reserva de turnos, agente IA recepcionista, seguimiento automatizado y galería antes/después.",
    status: "mvp",
    stack: ["Next.js 14", "FastAPI", "Supabase", "Gemini 2.0 Flash"],
    category: "HealthTech / SaaS",
    repoPath: "solucionesdentales",
    features: ["Identidad progresiva (sin login forzado)", "Agente IA recepcionista", "Galería antes/después", "Recordatorios automáticos"],
    highlight: "Replicable a cualquier consultorio médico",
  },
  {
    id: "tienda",
    name: "Tienda IA",
    tagline: "SaaS blanco de e-commerce con IA y WhatsApp",
    description: "Plataforma e-commerce white-label con agente IA, recomendaciones en tiempo real, checkout MercadoPago y WhatsApp integrado.",
    status: "production",
    stack: ["Next.js 14", "FastAPI", "Supabase", "Gemini", "Zustand", "MercadoPago"],
    category: "E-commerce / SaaS",
    repoPath: "tienda",
    features: ["Agente IA de ventas", "Recomendaciones real-time", "Checkout MercadoPago", "WhatsApp integrado", "Multi-tenant"],
    highlight: "Referencia de SaaS multi-tenant — producción en Vercel + Railway",
  },
  {
    id: "architect-kb",
    name: "Architect KB + Skills",
    tagline: "Sistema de arquitectura de software con metodología SDD",
    description: "Base de conocimiento personal con metodología SDD (System Design Document). Suite de skills para Claude Code que guían el ciclo completo: idea → stack → bootstrap → feature → handoff. Captura patrones, decisiones y lecciones aprendidas de cada proyecto.",
    status: "active",
    stack: ["Claude Code", "YAML/Markdown", "Git", "SDD Methodology"],
    category: "Dev Tools / IA",
    repoPath: "architect-kb",
    features: [
      "Skills /architect-idea, stack, bootstrap, feature, handoff",
      "Knowledge base: patrones, ADRs, lecciones",
      "Anti-sesgo por path dependence",
      "Journey por proyecto con fases",
    ],
    highlight: "Fundamento metodológico de todos los proyectos nuevos",
  },
  {
    id: "buscarjobs-saas",
    name: "BuscarJobs (Docker SaaS)",
    tagline: "SaaS self-hosted para búsqueda laboral con IA — distribución Docker",
    description: "Plataforma completa en un solo contenedor Docker para tracking inteligente de búsqueda laboral. Analiza CVs, evalúa ofertas con IA y gestiona el pipeline de aplicaciones. Modelo BYOK (trae tu propia key de OpenAI/Anthropic).",
    status: "production",
    stack: ["Next.js 16", "FastAPI", "SQLite", "Docker", "Anthropic/OpenAI SDK", "Traefik"],
    category: "SaaS / DevOps",
    repoPath: "buscarJobs",
    features: [
      "Single-image Docker (frontend + backend)",
      "Multi-stage build con Node 20 + Python 3.12",
      "CV parsing PDF/DOCX",
      "Análisis de ofertas con LLM",
      "Health check + volúmenes persistentes",
    ],
    highlight: "Deploy en VPS cliente con docker compose up -d",
  },
];

export const DEFAULT_IDEAS: Idea[] = [
  {
    id: "ia-legal",
    name: "IA Legal",
    description: "Asistente IA para consultas legales básicas. RAG sobre legislación boliviana/argentina.",
    effort: 3,
    economic: 5,
    strategic: 5,
    timeMonths: 6,
    status: "evaluating",
    notes: "Mercado de alta demanda. Barrera alta pero poco competido localmente.",
    createdAt: "2025-01-01",
  },
  {
    id: "foodsnapcal",
    name: "FoodSnapCal",
    description: "App que fotografía comida y calcula macros/calorías con IA visual.",
    effort: 2,
    economic: 4,
    strategic: 3,
    timeMonths: 3,
    status: "idea",
    notes: "Gemini Vision hace el 80% del trabajo. Modelo freemium claro.",
    createdAt: "2025-01-01",
  },
  {
    id: "directorio-uajms",
    name: "Directorio Comercial UAJMS",
    description: "Directorio de negocios y servicios para la comunidad universitaria de Tarija.",
    effort: 2,
    economic: 3,
    strategic: 4,
    timeMonths: 2,
    status: "idea",
    notes: "Bajo esfuerzo, comunidad cautiva. Potencial de monetización por destacados.",
    createdAt: "2025-01-01",
  },
  {
    id: "tienda-ropa",
    name: "Tienda de Ropa IA",
    description: "E-commerce de indumentaria con recomendaciones por IA y prueba virtual.",
    effort: 3,
    economic: 4,
    strategic: 3,
    timeMonths: 4,
    status: "idea",
    notes: "Usar tienda como base. El diferencial es la prueba virtual con IA.",
    createdAt: "2025-01-01",
  },
  {
    id: "mentor-docente",
    name: "Mentor Docente IA",
    description: "Adaptación de MentorComercial para aulas. Graba clases, genera apuntes, detecta dudas frecuentes.",
    effort: 2,
    economic: 3,
    strategic: 5,
    timeMonths: 3,
    status: "idea",
    notes: "Reutilizar stack de MentorComercial. UAJMS como cliente piloto.",
    createdAt: "2025-01-01",
  },
];

export const SLACK_WORKSPACES = [
  {
    name: "Dev Hub",
    channels: [
      { name: "general", purpose: "Coordinación general", type: "general" as const },
      { name: "bermejo", purpose: "Marketplace Bermejo", type: "project" as const },
      { name: "betamigos", purpose: "Plataforma de apuestas", type: "project" as const },
      { name: "mentor-comercial", purpose: "IA para ventas", type: "project" as const },
      { name: "tienda-ia", purpose: "E-commerce SaaS", type: "project" as const },
      { name: "apops", purpose: "Portal sindicato", type: "project" as const },
      { name: "soluciones-dentales", purpose: "CRM dental", type: "project" as const },
    ],
  },
  {
    name: "Clientes",
    channels: [
      { name: "gestion-ordenes", purpose: "App de campo cliente", type: "client" as const },
      { name: "seguimiento", purpose: "Estado de entregas", type: "client" as const },
      { name: "feedback", purpose: "Feedback de usuarios", type: "general" as const },
    ],
  },
  {
    name: "Ideas Lab",
    channels: [
      { name: "ideas", purpose: "Brainstorm y oportunidades", type: "learning" as const },
      { name: "learning", purpose: "Artículos, papers, refs técnicas", type: "learning" as const },
      { name: "ia-trends", purpose: "Novedades IA y LLMs", type: "learning" as const },
    ],
  },
];

export function calcPriorityScore(idea: Pick<Idea, "effort" | "economic" | "strategic">): number {
  if (idea.effort === 0) return 0;
  return Math.round(((idea.economic * idea.strategic) / idea.effort) * 10) / 10;
}
