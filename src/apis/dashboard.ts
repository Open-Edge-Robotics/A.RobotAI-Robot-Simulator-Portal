import { ENDPOINTS } from "@/constants/api";

import type { GetDashboardOverviewResult } from "@/types/dashboard/api";

import { apiClient } from ".";

export const dashboardAPI = {
  // 전체 시스템 현황 조회
  getSystemOverview: () => apiClient.getApi<GetDashboardOverviewResult>(`${ENDPOINTS.dashboard}/system-overview`),
};
