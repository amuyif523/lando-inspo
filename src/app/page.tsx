import Hero from "@/components/Hero";
import DataHub from "@/components/DataHub";
import NeuralNetwork from "@/components/NeuralNetwork";
import TerminalSection from "@/components/TerminalSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Hero />
      <DataHub />
      <NeuralNetwork />
      <TerminalSection />
      <ProjectsSection />
      <SkillsSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}

