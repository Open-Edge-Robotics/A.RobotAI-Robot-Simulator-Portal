import { ENDPOINTS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type {
  CreateSimulationRequest,
  CreateSimulationResult,
  GetSimulationsLiteResult,
  GetSimulationResult,
  GetSimulationsResult,
  GetSimulationSummaryResult,
} from "@/types/simulation/api";

import { apiClient } from ".";

const ENDPOINT = ENDPOINTS.simulation;

export const simulationAPI = {
  // 시뮬레이션 목록 조회
  getSimulations: (params: URLSearchParams) => apiClient.getApi<GetSimulationsResult>(`${ENDPOINT}`, { params }),

  // 드롭다운용 시뮬레이션 목록 조회
  getSimulationsLite: () => apiClient.getApi<GetSimulationsLiteResult>(`${ENDPOINTS.simulation}/summary`),

  // 시뮬레이션 상세 조회
  getSimulation: (id: number) => apiClient.getApi<GetSimulationResult>(`${ENDPOINT}/${id}`),

  // 대시보드용 시뮬레이션 조회
  getSimulationSummary: (id: number): Promise<APIResponse<GetSimulationSummaryResult>> =>
    apiClient.getApi<GetSimulationSummaryResult>(`${ENDPOINT}/${id}?view=dashboard`),

  // 시뮬레이션 생성
  createSimulation: (data: CreateSimulationRequest) => apiClient.postApi<CreateSimulationResult>(`${ENDPOINT}`, data),

  // 시뮬레이션 수정
  updateSimulation: (id: number, data: unknown) => apiClient.putApi(`${ENDPOINT}/${id}`, data),

  // 시뮬레이션 삭제
  deleteSimulation: (id: number) => apiClient.deleteApi(`${ENDPOINT}/${id}`),

  // 시뮬레이션 실행
  startSimulation: (id: number) => apiClient.postApi(`${ENDPOINT}/action`, { simulationId: id, action: "start" }),

  // 시뮬레이션 중지
  stopSimulation: (id: number) => apiClient.postApi(`${ENDPOINT}/action`, { simulationId: id, action: "stop" }),

  getMockSimulationsForDropdown: () =>
    Promise.resolve({
      status: "success",
      message: "대시보드 데이터를 성공적으로 조회했습니다.",
      data: mockSimulations,
    }),

  getMockSimulationSummary: (simulationId: number) =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 정보를 성공적으로 조회했습니다.",
      data: mockFailedParallel,
    }),
};

const mockSimulations = [
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
];

const mockSimulationData: GetSimulationSummaryResult = {
  simulationId: 12345,
  simulationName: "대규모 트래픽 시뮬레이션 v2.1",
  status: "RUNNING",
  patternType: "parallel",
  totalExecutionTime: 3600, // 1시간 (초 단위)
  autonomousAgentCount: 1500,
  resourceUsage: {
    cpu: { usagePercent: 85.6, status: "normal" },
    memory: { usagePercent: 64.2, status: "normal" }, // 12.8GB를 %로 환산
    disk: { usagePercent: 51.3, status: "normal" }, // 256.4GB를 %로 환산
  },
  podStatus: {
    totalCount: 24,
    overallHealthPercent: 83.3, // (18+2)/24*100 기준으로 계산
    statusBreakdown: {
      RUNNING: { count: 15, percentage: 62.5 },
      STOPPED: { count: 15, percentage: 62.5 },
      SUCCESS: { count: 3, percentage: 12.5 },
      READY: { count: 4, percentage: 16.7 },
      FAILED: { count: 2, percentage: 8.3 },
    },
  },
};

// 1. INITIATING (생성 중) - 순차
const mockInitiatingSequential: GetSimulationSummaryResult = {
  simulationId: 1,
  simulationName: "순차 시뮬레이션 예시",
  status: "INITIATING",
  patternType: "sequential",
  totalExecutionTime: 0,
  autonomousAgentCount: 0,
  resourceUsage: {
    cpu: { usagePercent: 0, status: "normal" },
    memory: { usagePercent: 0, status: "normal" },
    disk: { usagePercent: 0, status: "normal" },
  },
  podStatus: {
    totalCount: 0,
    overallHealthPercent: 0,
    statusBreakdown: {},
  },
};

// 1. INITIATING (생성 중) - 병렬
const mockInitiatingParallel: GetSimulationSummaryResult = {
  simulationId: 2,
  simulationName: "병렬 시뮬레이션 예시",
  status: "INITIATING",
  patternType: "parallel",
  totalExecutionTime: 0,
  autonomousAgentCount: 0,
  resourceUsage: {
    cpu: { usagePercent: 0, status: "normal" },
    memory: { usagePercent: 0, status: "normal" },
    disk: { usagePercent: 0, status: "normal" },
  },
  podStatus: {
    totalCount: 0,
    overallHealthPercent: 0,
    statusBreakdown: {},
  },
};

// 2. READY (대기 중) - 순차
const mockReadySequential: GetSimulationSummaryResult = {
  simulationId: 3,
  simulationName: "순차 대기 시뮬레이션",
  status: "READY",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 10, status: "normal" },
    memory: { usagePercent: 15, status: "normal" },
    disk: { usagePercent: 5, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 0,
    statusBreakdown: {
      READY: { count: 2, percentage: 100 },
      SUCCESS: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 2. READY (대기 중) - 병렬
const mockReadyParallel: GetSimulationSummaryResult = {
  simulationId: 4,
  simulationName: "병렬 대기 시뮬레이션",
  status: "READY",
  patternType: "parallel",
  totalExecutionTime: 300,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 20, status: "normal" },
    memory: { usagePercent: 10, status: "normal" },
    disk: { usagePercent: 5, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 0,
    statusBreakdown: {
      READY: { count: 6, percentage: 100 },
      SUCCESS: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 3. RUNNING (실행 중) - 순차
const mockRunningSequential: GetSimulationSummaryResult = {
  simulationId: 5,
  simulationName: "순차 실행 중 시뮬레이션",
  status: "RUNNING",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 50, status: "normal" },
    memory: { usagePercent: 30, status: "normal" },
    disk: { usagePercent: 40, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 50,
    statusBreakdown: {
      SUCCESS: { count: 1, percentage: 50 },
      RUNNING: { count: 1, percentage: 50 },
      FAILED: { count: 0, percentage: 0 },
      READY: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
    },
  },
};

// 3. RUNNING (실행 중) - 병렬
const mockRunningParallel: GetSimulationSummaryResult = {
  simulationId: 6,
  simulationName: "병렬 실행 중 시뮬레이션",
  status: "RUNNING",
  patternType: "parallel",
  totalExecutionTime: 300,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 70, status: "warning" },
    memory: { usagePercent: 40, status: "normal" },
    disk: { usagePercent: 20, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 66.67,
    statusBreakdown: {
      SUCCESS: { count: 4, percentage: 66.67 },
      RUNNING: { count: 2, percentage: 33.33 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      READY: { count: 0, percentage: 0 },
    },
  },
};

// 4. COMPLETED (완료) - 순차
const mockCompletedSequential: GetSimulationSummaryResult = {
  simulationId: 7,
  simulationName: "순차 완료 시뮬레이션",
  status: "COMPLETED",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 50, status: "normal" },
    memory: { usagePercent: 30, status: "normal" },
    disk: { usagePercent: 40, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 100,
    statusBreakdown: {
      SUCCESS: { count: 2, percentage: 100 },
      RUNNING: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      READY: { count: 0, percentage: 0 },
    },
  },
};

// 4. COMPLETED (완료) - 병렬
const mockCompletedParallel: GetSimulationSummaryResult = {
  simulationId: 8,
  simulationName: "병렬 완료 시뮬레이션",
  status: "COMPLETED",
  patternType: "parallel",
  totalExecutionTime: 450,
  autonomousAgentCount: 8,
  resourceUsage: {
    cpu: { usagePercent: 30, status: "normal" },
    memory: { usagePercent: 25, status: "normal" },
    disk: { usagePercent: 35, status: "normal" },
  },
  podStatus: {
    totalCount: 8,
    overallHealthPercent: 100,
    statusBreakdown: {
      SUCCESS: { count: 8, percentage: 100 },
      RUNNING: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      READY: { count: 0, percentage: 0 },
    },
  },
};

// 5. FAILED (오류) - 병렬
const mockFailedParallel: GetSimulationSummaryResult = {
  simulationId: 9,
  simulationName: "병렬 오류 시뮬레이션",
  status: "FAILED",
  patternType: "parallel",
  totalExecutionTime: 180,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 90, status: "critical" },
    memory: { usagePercent: 80, status: "warning" },
    disk: { usagePercent: 70, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 50,
    statusBreakdown: {
      SUCCESS: { count: 3, percentage: 50 },
      STOPPED: { count: 1, percentage: 16.67 },
      FAILED: { count: 2, percentage: 33.33 },
      READY: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 5. FAILED (오류) - 순차
const mockFailedSequential: GetSimulationSummaryResult = {
  simulationId: 10,
  simulationName: "순차 오류 시뮬레이션",
  status: "FAILED",
  patternType: "sequential",
  totalExecutionTime: 120,
  autonomousAgentCount: 3,
  resourceUsage: {
    cpu: { usagePercent: 95, status: "critical" },
    memory: { usagePercent: 85, status: "critical" },
    disk: { usagePercent: 60, status: "warning" },
  },
  podStatus: {
    totalCount: 3,
    overallHealthPercent: 33.33,
    statusBreakdown: {
      SUCCESS: { count: 1, percentage: 33.33 },
      STOPPED: { count: 0, percentage: 0 },
      FAILED: { count: 2, percentage: 66.67 },
      READY: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};
