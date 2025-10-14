import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";

import { SIMULATION_PROGRESS_OVERVIEW_CONFIGS } from "@/constants/simulation";

import type { OverviewConfig } from "@/types/common";
import type { ParallelProgressData, PatternType, SequentialProgressData } from "@/types/simulation/domain";

interface ProgressOverviewProps {
  progressData: SequentialProgressData | ParallelProgressData;
}

export default function ProgressOverview({ progressData }: ProgressOverviewProps) {
  return (
    <div className="mb-5 flex flex-col gap-6 md:flex-row">
      {OVERVIEW_ITEMS.map((item) => (
        <ProgressOverviewCard
          key={item}
          config={SIMULATION_PROGRESS_OVERVIEW_CONFIGS[item]}
          value={getOverviewValueFromConfig(progressData, item)}
        />
      ))}
    </div>
  );
}

interface ProgressOverviewCardProps {
  config: OverviewConfig;
  value?: number;
}

function ProgressOverviewCard({ config, value }: ProgressOverviewCardProps) {
  const { label, iconName, iconColor, iconBgColor } = config;

  return (
    <div className="min-w-40 flex-1">
      <Container flexDirection="flex-row" shadow className="items-start justify-between p-4">
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

const OVERVIEW_ITEMS = ["total", "current", "completed"] as const;

type OverviewType = (typeof OVERVIEW_ITEMS)[number];

// 패턴 타입별 개요 항목 속성 매핑 설정
const PATTERN_OVERVIEW_CONFIGS: Record<PatternType, Record<OverviewType, string>> = {
  sequential: {
    total: "totalSteps",
    current: "currentStep",
    completed: "completedSteps",
  },
  parallel: {
    total: "totalGroups",
    current: "runningGroups",
    completed: "completedGroups",
  },
};

function getOverviewValueFromConfig(
  progressData: ProgressOverviewProps["progressData"],
  overviewType: OverviewType,
): number {
  const config = PATTERN_OVERVIEW_CONFIGS[progressData.patternType];
  const fieldName = config[overviewType] as keyof typeof progressData.progress;
  return progressData.progress[fieldName];
}
