import type { SystemOverviewData } from "./domain";

export interface GetDashboardResult {
  overview: SystemOverviewData;
  simulations: { simulationId: number; simulationName: string }[];
}
