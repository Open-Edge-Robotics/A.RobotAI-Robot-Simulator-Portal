import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";
import Title from "@/components/common/Title";

import { SYSTEM_OVERVIEW_CONFIG } from "./constants";
import type { SystemOverviewConfig, SystemOverviewData } from "./types";

export default function SystemOverviewSection({ overview }: { overview: SystemOverviewData | null }) {
  return (
    <div>
      <Title title="전체 시스템 현황" margin="mb-5" />
      <SystemOverview overview={overview} />
    </div>
  );
}

function SystemOverview({ overview }: { overview: SystemOverviewData | null }) {
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

interface SystemOverviewCardProps {
  config: SystemOverviewConfig;
  value?: number;
}

function SystemOverviewCard({ config, value }: SystemOverviewCardProps) {
  const { label, iconName, iconColor, iconBgColor } = config;

  return (
    <div className="min-w-40 flex-1">
      <Container
        padding="p-4"
        flexDirection="flex-row"
        alignItems="items-start"
        justifyContent="justify-between"
        shadow
      >
        <div>
          <div className="mb-1 text-2xl font-bold">{value ?? "-"}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-sm ${iconBgColor}`}>
          <Icon name={iconName} className={`${iconColor}`} />
        </div>
      </Container>
    </div>
  );
}
