import type { SimulationDetailData } from "@/components/dashboard/SimulationSection/SimulationDetail";
import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import type { GetDashboardResult } from "@/types/dashboard/api";

import { createClient } from ".";

const dashboardApiClient = createClient({
  baseURL: `${API_BASE_URL.dev}${ENDPOINTS.simulation}`, // TODO: dashboard로 바꾸기
  //   enableAuth: true,
});

export const dashboardAPI = {
  // 대시보드 데이터 조회
  getDashboard: () => dashboardApiClient.get<GetDashboardResult>(""),
  getSimulation: (simulationId: number) => dashboardApiClient.get<unknown>(`/${simulationId}`),

  getMockSimulation: (simulationId: number) =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 정보를 성공적으로 조회했습니다.",
      data: mockSimulationData,
    }),

  getMockDashboard: () =>
    Promise.resolve({
      status: "success",
      message: "대시보드 데이터를 성공적으로 조회했습니다.",
      data: mockDashboard,
    }),
};

const mockDashboard: GetDashboardResult = {
  overview: {
    total: 5,
    running: 2,
    mec: 3,
    instance: 4,
  },
  simulations: [
    {
      simulationId: 1,
      simulationName: "순차 실행 반복 시뮬레이션 테스트",
    },
    {
      simulationId: 2,
      simulationName: "병렬 실행 로봇 군집 테스트",
    },
    {
      simulationId: 3,
      simulationName: "자율주행 알고리즘 검증",
    },
    {
      simulationId: 4,
      simulationName: "센서 융합 테스트",
    },
    {
      simulationId: 5,
      simulationName: "드론 군집 비행 시뮬레이션",
    },
  ],
};

const mockSimulationData: SimulationDetailData = {
  simulationId: 12345,
  simulationName: "대규모 트래픽 시뮬레이션 v2.1",
  status: "RUNNING",
  createdAt: "2025-08-20T09:30:00Z",
  updatedAt: "2025-08-21T14:25:00Z",
  patternType: "parallel",
  totalExecutionTime: 3600, // 1시간 (초 단위)
  autonomousAgentCount: 1500,
  resource: {
    cpu: 85.6, // CPU 사용률 (%)
    memory: 12.8, // 메모리 사용량 (GB)
    disk: 256.4, // 디스크 사용량 (GB)
  },
  pods: {
    total: 24,
    success: 18,
    failed: 2,
  },
};
