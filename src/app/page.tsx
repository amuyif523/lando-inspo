import Hero from "@/components/Hero";
import DataHub from "@/components/DataHub";
import NeuralNetwork from "@/components/NeuralNetwork";
import StreamerSection from "@/components/StreamerSection";
import MerchSection from "@/components/MerchSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Hero />
      <DataHub />
      <NeuralNetwork />
      <StreamerSection />
      <MerchSection />
      
      {/* Placeholder for other sections */}
      <section id="career" className="h-screen flex items-center justify-center border-t border-white/10">
        <h2 className="text-4xl font-bold text-gray-800 uppercase">Career Stats Coming Soon</h2>
      </section>
    </main>
  );
}


