"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import DataHub from "@/components/DataHub";
import NeuralNetwork from "@/components/NeuralNetwork";
import TerminalSection from "@/components/TerminalSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";
import { sectionRevealVariants } from "@/lib/motionTokens";
import { useMotionSettings } from "@/components/MotionProvider";

export default function Home() {
  const { isReducedMotion } = useMotionSettings();

  const sectionMotion = isReducedMotion
    ? {}
    : {
        variants: sectionRevealVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.25 },
      };

  const sections = [
    <Hero key="hero" />, 
    <DataHub key="data" />, 
    <NeuralNetwork key="neural" />, 
    <TerminalSection key="terminal" />, 
    <ProjectsSection key="projects" />, 
    <SkillsSection key="skills" />, 
    <CareerSection key="career" />, 
    <ContactSection key="contact" />,
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {sections.map((section, index) => (
        <motion.div key={index} {...sectionMotion} custom={index * 0.06}>
          {section}
        </motion.div>
      ))}
    </main>
  );
}
