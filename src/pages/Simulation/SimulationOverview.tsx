import type { Overview } from "@/apis/simulation/types";
import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";

import { SIMULATION_OVERVIEW_CONFIG } from "./constants";
import type { OverviewConfig } from "./types";

export default function SimulationOverview({ overview }: { overview: Overview | null }) {
  const { TOTAL, COMPLETED, RUNNING, FAILED } = SIMULATION_OVERVIEW_CONFIG;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <SimulationOverviewCard config={TOTAL} value={overview?.total} />
      <SimulationOverviewCard config={RUNNING} value={overview?.running} />
      <SimulationOverviewCard config={COMPLETED} value={overview?.completed} />
      <SimulationOverviewCard config={FAILED} value={overview?.failed} />
    </div>
  );
}

interface SimulationOverviewCardProps {
  config: OverviewConfig;
  value?: number;
}

function SimulationOverviewCard({ config, value }: SimulationOverviewCardProps) {
  const { label, iconName, textColor, bgColor } = config;

  return (
    <div className="min-w-40 flex-1">
      <Container
        padding="p-4"
        flexDirection="flex-row"
        alignItems="items-start"
        justifyContent="justify-between"
        shadow
      >
        <div className={`${textColor}`}>
          <div className="mb-1 text-2xl font-bold">{value ?? "-"}</div>
          <div className="text-sm">{label}</div>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-sm ${bgColor}`}>
          <Icon name={iconName} className={`${textColor}`} />
        </div>
      </Container>
    </div>
  );
}
