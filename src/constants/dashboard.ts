import type { SystemOverviewConfig } from "@/types/dashboard/domain";

export const SYSTEM_OVERVIEW_CONFIG: { [key: string]: SystemOverviewConfig } = {
  total: {
    label: "전체 시뮬레이션 개수",
    iconName: "insert_chart",
    iconColor: "text-gray-500",
    iconBgColor: "bg-gray-50",
  },
  running: {
    label: "실행 중인 시뮬레이션 개수",
    iconName: "play_arrow",
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-50",
  },
  mec: {
    label: "전체 MEC 개수",
    iconName: "dns",
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-50",
  },
  instance: {
    label: "전체 인스턴스 개수",
    iconName: "robot_2",
    iconColor: "text-green-500",
    iconBgColor: "bg-green-50",
  },
} as const;
