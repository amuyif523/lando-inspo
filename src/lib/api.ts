export interface Race {
  season: string;
  round: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
}

export async function getNextRace(): Promise<Race | null> {
  try {
    // Using Jolpica-F1 (Ergast replacement)
    const res = await fetch("https://api.jolpi.ca/ergast/f1/current/next.json", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) return null;

    const data = await res.json();
    return data.MRData.RaceTable.Races[0] || null;
  } catch (error) {
    console.error("Failed to fetch race data:", error);
    return null;
  }
}
