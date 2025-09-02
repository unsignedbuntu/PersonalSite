// src/app/page.tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  return (
    <main>
      {/* Bu iki component'in en üstte olması önemlidir */}
      <Header />
      <ScrollIndicator />
      
      {/* Bunlar ise sayfanın içeriğini oluşturur */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
