import Header from "@/components/Header";
import HeroStats from "@/components/HeroStats";
import ProjectsGrid from "@/components/ProjectsGrid";
import IdeasMatrix from "@/components/IdeasMatrix";
import SlackPanel from "@/components/SlackPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
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
