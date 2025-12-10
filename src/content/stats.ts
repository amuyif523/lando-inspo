export type ActivityStats = {
  commitsThisYear: number;
  repositories: number;
  uptime: string;
  currentStreak: number;
  totalContributions: number;
};

export const fallbackActivityStats: ActivityStats = {
  commitsThisYear: 1248,
  repositories: 86,
  uptime: "99.9%",
  currentStreak: 42,
  totalContributions: 1248,
};

export const fallbackHeatmap: number[] = Array.from({ length: 52 * 7 }, (_, idx) => {
  // Deterministic pseudo-random pattern for stable visuals
  const week = Math.floor(idx / 7);
  const day = idx % 7;
  return (week * day * 7 + day) % 5;
});
