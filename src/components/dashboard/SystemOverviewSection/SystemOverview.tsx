import { SYSTEM_OVERVIEW_CONFIGS } from "@/constants/dashboard";
import type { SystemOverviewData } from "@/types/dashboard/domain";

import SystemOverviewCard from "./SystemOverviewCard";

export default function SystemOverview({ overview }: { overview: SystemOverviewData | null }) {
  const { totalSimulations, runningSimulations, totalMec, totalInstances } = SYSTEM_OVERVIEW_CONFIGS;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <SystemOverviewCard config={totalSimulations} value={overview?.totalSimulations} />
      <SystemOverviewCard config={runningSimulations} value={overview?.runningSimulations} />
      <SystemOverviewCard config={totalMec} value={overview?.totalMec} />
      <SystemOverviewCard config={totalInstances} value={overview?.totalInstances} />
    </div>
  );
}
