import { ENDPOINTS } from "@/constants/api";

import type { GetDashboardOverviewResponse } from "@/types/dashboard/api";

import { apiClient } from ".";

export const dashboardAPI = {
  // 전체 시스템 현황 조회
  getSystemOverview: () => apiClient.getApi<GetDashboardOverviewResponse>(`${ENDPOINTS.dashboard}/system-overview`),
  getMockSystemOverview: () =>
    Promise.resolve({
      status: "success",
      message: "시스템 현황 정보를 성공적으로 조회했습니다.",
      data: {
        totalSimulations: 100,
        runningSimulations: 10,
        totalMec: 5,
        totalInstances: 6,
        timestamp: "2025-09-02T12:34:56Z",
      },
    }),
};
