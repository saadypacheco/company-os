import Header from "@/components/Header";
import HeroStats from "@/components/HeroStats";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectVault from "@/components/ProjectVault";
import IdeasMatrix from "@/components/IdeasMatrix";
import SlackPanel from "@/components/SlackPanel";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Dashboard — Altiora" };

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <div className="flex items-center gap-3 text-xs" style={{ color: "#4b5563" }}>
          <Link href={`/${locale}`} className="hover:text-cyan-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span style={{ color: "#6b7280" }}>Dashboard</span>
        </div>
      </div>
      <main>
        <HeroStats />
        <ProjectsGrid />
        <ProjectVault />
        <IdeasMatrix />
        <SlackPanel />
      </main>
      <Footer />
    </>
  );
}
