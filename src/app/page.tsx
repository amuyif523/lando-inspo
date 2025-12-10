import Hero from "@/components/Hero";
import RaceHub from "@/components/RaceHub";
import HelmetGallery from "@/components/HelmetGallery";
import StreamerSection from "@/components/StreamerSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Hero />
      <RaceHub />
      <HelmetGallery />
      <StreamerSection />
      
      {/* Placeholder for other sections */}
      <section id="career" className="h-screen flex items-center justify-center border-t border-white/10">
        <h2 className="text-4xl font-bold text-gray-800 uppercase">Career Stats Coming Soon</h2>
      </section>
    </main>
  );
}
