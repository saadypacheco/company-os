import NavPublic from "@/components/public/NavPublic";
import HeroPublic from "@/components/public/HeroPublic";
import ServicesSection from "@/components/public/ServicesSection";
import AISection from "@/components/public/AISection";
import AutomationSection from "@/components/public/AutomationSection";
import PortfolioSection from "@/components/public/PortfolioSection";
import ProcessSection from "@/components/public/ProcessSection";
import BlogSection from "@/components/public/BlogSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <NavPublic />
      <main>
        <HeroPublic />
        <ServicesSection />
        <AISection />
        <AutomationSection />
        <PortfolioSection />
        <ProcessSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
