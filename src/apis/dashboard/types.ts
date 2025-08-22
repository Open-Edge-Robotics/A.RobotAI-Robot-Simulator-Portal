import type { SystemOverviewData } from "@/pages/dashboard/types";

export interface GetDashboardResult {
  overview: SystemOverviewData;
  simulations: { simulationId: number; simulationName: string }[];
}
