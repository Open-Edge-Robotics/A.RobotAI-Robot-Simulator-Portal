import type { SystemOverviewData } from "@/types/dashboard/domain";
import SystemOverviewCard from "./SystemOverviewCard";
import { SYSTEM_OVERVIEW_CONFIG } from "@/constants/dashboard";

export default function SystemOverview({ overview }: { overview: SystemOverviewData | null }) {
  const { total, running, mec, instance } = SYSTEM_OVERVIEW_CONFIG;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <SystemOverviewCard config={total} value={overview?.total} />
      <SystemOverviewCard config={running} value={overview?.running} />
      <SystemOverviewCard config={mec} value={overview?.mec} />
      <SystemOverviewCard config={instance} value={overview?.instance} />
    </div>
  );
}
