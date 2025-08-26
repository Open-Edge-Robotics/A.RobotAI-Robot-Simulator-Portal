import type { Timestamp } from "../common";

export interface SystemOverviewConfig {
  label: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

export interface SystemOverviewData {
  totalSimulations: number;
  runningSimulations: number;
  totalMec: number;
  totalInstances: number;
  timestamp: Timestamp;
}
