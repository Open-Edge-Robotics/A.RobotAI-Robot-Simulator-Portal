import type { Timestamp } from "../common";

export interface GetDashboardOverviewResult {
  totalSimulations: number;
  runningSimulations: number;
  totalMec: number;
  totalInstances: number;
  timestamp: Timestamp;
}
