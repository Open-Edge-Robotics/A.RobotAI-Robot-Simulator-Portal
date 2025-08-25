import Title from "@/components/common/Title";
import type { SystemOverviewData } from "@/types/dashboard/domain";

import SystemOverview from "./SystemOverview";

export default function SystemOverviewSection({ overview }: { overview: SystemOverviewData | null }) {
  return (
    <div>
      <Title title="전체 시스템 현황" margin="mb-5" />
      <SystemOverview overview={overview} />
    </div>
  );
}
