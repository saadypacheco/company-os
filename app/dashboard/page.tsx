import Header from "@/components/Header";
import HeroStats from "@/components/HeroStats";
import ProjectsGrid from "@/components/ProjectsGrid";
import IdeasMatrix from "@/components/IdeasMatrix";
import SlackPanel from "@/components/SlackPanel";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Dashboard — Company OS",
  description: "Panel privado de gestión de proyectos, ideas y workspace",
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <div className="flex items-center gap-3 text-xs" style={{ color: "#4b5563" }}>
          <Link href="/" className="hover:text-cyan-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span style={{ color: "#6b7280" }}>Dashboard</span>
        </div>
      </div>
      <main>
        <HeroStats />
        <ProjectsGrid />
        <IdeasMatrix />
        <SlackPanel />
      </main>
      <Footer />
    </>
  );
}
