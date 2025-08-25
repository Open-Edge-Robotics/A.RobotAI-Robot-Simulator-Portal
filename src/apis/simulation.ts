import { API_BASE_URL, ENDPOINTS } from "@/constants/api";
import type {
  CreateSimulationRequest,
  CreateSimulationResult,
  GetSimulationResult,
  GetSimulationsResult,
} from "@/types/simulation/api";

import { createClient } from ".";

const simulationApiClient = createClient({
  baseURL: `${API_BASE_URL.dev}${ENDPOINTS.simulation}`,
  //   enableAuth: true,
});

export const simulationAPI = {
  // 시뮬레이션 목록 조회
  getSimulations: (params: URLSearchParams) => simulationApiClient.get<GetSimulationsResult>("", { params }),

  // 시뮬레이션 상세 조회
  getSimulation: (id: number) => simulationApiClient.get<GetSimulationResult>(`/${id}`),

  // 시뮬레이션 생성
  createSimulation: (data: CreateSimulationRequest) => simulationApiClient.post<CreateSimulationResult>("", data),

  // 시뮬레이션 수정
  editSimulation: (id: number, data: unknown) => simulationApiClient.put(`/${id}`, data),

  // 시뮬레이션 삭제
  deleteSimulation: (id: number) => simulationApiClient.delete(`/${id}`),

  // 시뮬레이션 실행
  runSimulation: (id: number) => simulationApiClient.post(`/${id}/run`),

  // 시뮬레이션 일시정지
  pauseSimulation: (id: number) => simulationApiClient.post(`/${id}/pause`),

  // 시뮬레이션 정지
  stopSimulation: (id: number) => simulationApiClient.post(`/${id}/stop`),

  getMockSimulations: (params: URLSearchParams) =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 목록을 성공적으로 조회했습니다.",
      data: mockSimulations,
    }),
};
const mockSimulations: GetSimulationsResult = {
  overview: {
    total: 5,
    ready: 2,
    running: 2,
    completed: 1,
    failed: 0,
  },
  simulations: [
    {
      simulationId: 1,
      simulationName: "순차 실행 반복 시뮬레이션 테스트",
      patternType: "sequential",
      status: "READY",
      mecId: "mec-01",
      createdAt: "2025-08-14T02:38:55.503499",
      updatedAt: "2025-08-14T02:38:56.274661",
    },
    {
      simulationId: 2,
      simulationName: "병렬 실행 로봇 군집 테스트",
      patternType: "parallel",
      status: "RUNNING",
      mecId: "mec-02",
      createdAt: "2025-08-14T03:15:20.123456",
      updatedAt: "2025-08-14T03:20:45.789012",
    },
    {
      simulationId: 3,
      simulationName: "자율주행 알고리즘 검증",
      patternType: "parallel",
      status: "RUNNING",
      mecId: "mec-01",
      createdAt: "2025-08-14T04:00:10.555555",
      updatedAt: "2025-08-14T04:30:25.666666",
    },
    {
      simulationId: 4,
      simulationName: "센서 융합 테스트",
      patternType: "sequential",
      status: "READY",
      mecId: "mec-03",
      createdAt: "2025-08-14T05:12:33.777777",
      updatedAt: "2025-08-14T05:12:34.888888",
    },
    {
      simulationId: 5,
      simulationName: "드론 군집 비행 시뮬레이션",
      patternType: "parallel",
      status: "COMPLETED",
      mecId: "mec-02",
      createdAt: "2025-08-14T01:00:00.000000",
      updatedAt: "2025-08-14T02:30:15.999999",
    },
  ],
  pagination: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 5,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  },
};
