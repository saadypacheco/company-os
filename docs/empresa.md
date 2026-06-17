# Company OS - Plataforma Integral para Gestión de Empresa, Proyectos y Productividad

Actúa como un Arquitecto de Software Senior, Product Manager y UX Designer experto.

Diseña e implementa una aplicación web moderna llamada "Company OS", que funcione como el sistema operativo central de una empresa de desarrollo de software, automatización e inteligencia artificial.

## Objetivo General

La plataforma debe tener dos áreas claramente separadas:

### Área Pública (Landing Comercial)

Orientada a marketing y captación de clientes.

Secciones:

* Inicio
* Servicios
* Soluciones de IA
* Automatización de Procesos
* Desarrollo de Software
* Casos de Éxito
* Portfolio
* Blog
* Contacto
* Solicitar Presupuesto

Características:

* SEO optimizado
* Responsive
* Diseño moderno y profesional
* Formularios de contacto
* Integración con Google Analytics
* Integración con Meta Pixel
* Integración con LinkedIn Insight Tag

---

### Área Privada (Company OS)

Accesible mediante autenticación.

Debe funcionar como un dashboard empresarial completo.

---

# Stack Tecnológico

Frontend:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Shadcn UI

Backend:

* Node.js
* API Routes de Next.js

Base de Datos:

* Supabase PostgreSQL

Autenticación:

* Supabase Auth

Automatizaciones:

* n8n

IA:

* OpenAI

Hosting:

* Vercel

---

# Módulo Dashboard

Pantalla principal.

Mostrar:

* Total de proyectos
* Proyectos activos
* Proyectos en pausa
* Clientes activos
* Horas trabajadas hoy
* Horas trabajadas esta semana
* Horas trabajadas este mes
* Próximas entregas
* Tareas pendientes
* Tareas vencidas
* Alertas importantes

Gráficos:

* Horas por proyecto
* Horas por cliente
* Estado de proyectos
* Productividad semanal
* Productividad mensual

---

# Módulo Proyectos

Entidad principal.

Campos:

* Nombre
* Cliente
* Descripción
* Estado
* Prioridad
* Fecha inicio
* Fecha estimada finalización
* Fecha real finalización
* Responsable
* Presupuesto
* Valor estimado
* Tecnologías

Estados:

* Idea
* Planificado
* En desarrollo
* QA
* Testing
* Producción
* Pausado
* Finalizado
* Cancelado

Cada proyecto debe tener:

## Enlaces

Producción:

* URL Producción

Desarrollo:

* URL Desarrollo

Testing:

* URL Testing

QA:

* URL QA

Repositorio:

* GitHub

Documentación:

* Notion
* Wiki
* Documentos

Comunicación:

* Slack
* Discord
* Teams

Infraestructura:

* Vercel
* Render
* Railway
* Supabase
* AWS

---

# Módulo Tareas

Kanban completo.

Estados:

* Pendiente
* En progreso
* Bloqueada
* QA
* Finalizada

Relación con proyectos.

Estimación de horas.

Horas reales.

Responsables.

Fechas límite.

---

# Módulo Clientes

Campos:

* Nombre
* Empresa
* Email
* Teléfono
* Estado comercial
* Valor potencial
* Valor contratado

Pipeline:

* Lead
* Contactado
* Reunión
* Propuesta
* Negociación
* Ganado
* Perdido

---

# Módulo Time Tracking

Implementar control horario integrado dentro del sistema.

No depender de herramientas externas.

Tabla:

TimeEntries

Campos:

* Id
* Usuario
* Proyecto
* Tarea
* Inicio
* Fin
* Duración
* Descripción

Funciones:

* Iniciar temporizador
* Pausar temporizador
* Reanudar temporizador
* Finalizar temporizador

Mostrar:

* Tiempo diario
* Tiempo semanal
* Tiempo mensual
* Tiempo por proyecto
* Tiempo por cliente

Generar reportes.

Mostrar ranking de tiempo invertido.

Permitir carga manual de horas.

---

# Módulo Marketing

Para cada proyecto registrar:

* Landing Page
* Sitio Web
* Campañas activas
* Google Analytics
* Search Console
* Meta Ads
* LinkedIn Ads

KPIs:

* Visitas
* Leads
* Conversiones

---

# Módulo Documentación

Wiki interna.

Documentos técnicos.

Investigaciones.

Arquitecturas.

Casos de uso.

Diagramas.

Manual de usuario.

Actas de reunión.

---

# Módulo IA

Asistente empresarial integrado.

Capacidades:

* Consultar proyectos
* Consultar tareas
* Consultar clientes
* Consultar horas trabajadas
* Generar resúmenes ejecutivos
* Detectar proyectos estancados
* Sugerir prioridades
* Identificar riesgos

Ejemplos:

"¿Qué proyectos están atrasados?"

"¿Cuánto tiempo invertí en UAJMS este mes?"

"¿Qué tareas críticas tengo esta semana?"

"¿Qué cliente tiene mayor valor potencial?"

---

# Integración n8n

Automatizaciones:

* Resumen diario
* Resumen semanal
* Alertas de vencimiento
* Recordatorios
* Generación automática de reportes
* Clasificación de ideas
* Seguimiento de leads

---

# Seguridad

Roles:

* Administrador
* Gerente
* Desarrollador
* Cliente

Control granular de permisos.

---

# UX/UI

Diseño estilo:

* Linear
* Vercel
* Stripe
* Notion

Minimalista.

Profesional.

Oscuro y claro.

Optimizado para desktop y mobile.

Generar arquitectura completa, estructura de carpetas, esquema de base de datos Supabase, modelos, APIs, componentes UI y roadmap de implementación por fases.
