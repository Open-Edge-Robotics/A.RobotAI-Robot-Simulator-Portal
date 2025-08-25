import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";
import { SIMULATION_OVERVIEW_CONFIGS } from "@/constants/simulation";
import type { SimulationOverview } from "@/types/simulation/api";
import type { SimulationOverviewConfig } from "@/types/simulation/domain";

export default function SimulationOverview({ overview }: { overview: SimulationOverview | null }) {
  const { TOTAL, COMPLETED, RUNNING, FAILED } = SIMULATION_OVERVIEW_CONFIGS;

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
  config: SimulationOverviewConfig;
  value?: number;
}

function SimulationOverviewCard({ config, value }: SimulationOverviewCardProps) {
  const { label, iconName, textColor, bgColor } = config;

  return (
    <div className="min-w-40 flex-1">
      <Container flexDirection="flex-row" shadow className="items-start justify-between p-4">
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
