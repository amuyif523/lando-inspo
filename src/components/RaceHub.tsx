import { getNextRace } from "@/lib/api";
import Countdown from "./Countdown";
import CircuitMap from "./CircuitMap";
import { MapPin, Calendar, Clock } from "lucide-react";

export default async function RaceHub() {
  const race = await getNextRace();

  if (!race) {
    return (
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-500">Race Data Offline</h2>
        </div>
      </section>
    );
  }

  const raceDate = new Date(`${race.date}T${race.time}`);

  return (
    <section id="race-hub" className="py-24 bg-black relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-lando" />
          <span className="text-lando font-bold uppercase tracking-widest">Next Grand Prix</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          {race.raceName}
        </h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Info & Countdown */}
        <div className="space-y-12">
          {/* Race Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <MapPin className="text-lando" />
              <span>{race.Circuit.circuitName}, {race.Circuit.Location.country}</span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <Calendar className="text-lando" />
              <span>{raceDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <Clock className="text-lando" />
              <span>{raceDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Local</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-6 tracking-widest">Lights Out In</h3>
            <Countdown targetDate={raceDate.toISOString()} />
          </div>
        </div>

        {/* Right Column: Circuit Map */}
        <div>
          <CircuitMap circuitName={race.Circuit.circuitName} />
          
          {/* Stats Grid (Mini Bento) */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Lando&apos;s Best Finish</div>
              <div className="text-3xl font-black italic">P2</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Track Length</div>
              <div className="text-3xl font-black italic">5.2 km</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
