import { fallbackActivityStats, fallbackHeatmap, ActivityStats } from "@/content/stats";

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
const GITHUB_USER = "amanuel-fikremariam";

export type ContributionHeatmap = {
  days: number[]; // 52*7
  total: number;
  streak: number;
};

export async function fetchContributionData(): Promise<ContributionHeatmap> {
  try {
    const res = await fetch(`${CONTRIBUTIONS_API}/${GITHUB_USER}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed with ${res.status}`);
    const data = await res.json();
    const weeks = data?.contributions?.weeks ?? [];

    const days: number[] = [];
    weeks.forEach((week: { contributionDays: { contributionCount: number }[] }) => {
      week.contributionDays.forEach((day: { contributionCount: number }) => {
        const level = Math.min(4, day.contributionCount > 0 ? Math.ceil(day.contributionCount / 2) : 0);
        days.push(level);
      });
    });

    // Ensure length is 52*7
    const normalizedDays =
      days.length >= 52 * 7 ? days.slice(days.length - 52 * 7) : [...Array(52 * 7 - days.length).fill(0), ...days];

    return {
      days: normalizedDays,
      total: data?.totalContributions ?? fallbackActivityStats.totalContributions,
      streak: data?.streak?.current ?? fallbackActivityStats.currentStreak,
    };
  } catch (error) {
    console.error("Contribution fetch failed, using fallback:", error);
    return {
      days: fallbackHeatmap,
      total: fallbackActivityStats.totalContributions,
      streak: fallbackActivityStats.currentStreak,
    };
  }
}

export async function fetchActivityStats(): Promise<ActivityStats> {
  try {
    const res = await fetch(`${CONTRIBUTIONS_API}/${GITHUB_USER}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed with ${res.status}`);
    const data = await res.json();

    return {
      commitsThisYear: data?.totalContributions ?? fallbackActivityStats.commitsThisYear,
      repositories: data?.contributions?.repositories?.length ?? fallbackActivityStats.repositories,
      uptime: fallbackActivityStats.uptime, // Placeholder until uptime source exists
      currentStreak: data?.streak?.current ?? fallbackActivityStats.currentStreak,
      totalContributions: data?.totalContributions ?? fallbackActivityStats.totalContributions,
    };
  } catch (error) {
    console.error("Stats fetch failed, using fallback:", error);
    return fallbackActivityStats;
  }
}
