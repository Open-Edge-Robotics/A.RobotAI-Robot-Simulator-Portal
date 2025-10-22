import type { OverviewConfig } from "@/types/common";
import type { SystemOverviewData } from "@/types/dashboard/domain";

import { ICONS } from "./icon";

export const SYSTEM_OVERVIEW_CONFIGS: Record<keyof Omit<SystemOverviewData, "timestamp">, OverviewConfig> = {
  totalSimulations: {
    label: "전체 시뮬레이션 개수",
    iconName: ICONS.chart,
    iconColor: "text-gray-500",
    iconBgColor: "bg-gray-50",
  },
  runningSimulations: {
    label: "실행 중인 시뮬레이션 개수",
    iconName: ICONS.play,
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-50",
  },
  totalMec: {
    label: "전체 MEC 개수",
    iconName: ICONS.mec,
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-50",
  },
  totalInstances: {
    label: "전체 가상 자율행동체 개수",
    iconName: ICONS.robot,
    iconColor: "text-green-500",
    iconBgColor: "bg-green-50",
  },
} as const;

export const DASHBOARD_REFETCH_INTERVAL = 60000; // 1 minute
