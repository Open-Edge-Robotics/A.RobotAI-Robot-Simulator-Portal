import { ENDPOINTS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type {
  GetSimulationStatusResult,
  CreateSimulationRequest,
  CreateSimulationResult,
  GetSimulationsLiteResult,
  GetSimulationStaticResult,
  GetSimulationsResult,
  GetSimulationSummaryResult,
} from "@/types/simulation/api";

import type { GetStatusResponseFinal } from "@/types/simulation/status";

import { apiClient } from ".";
import {
  mockFailedParallel,
  mockRunningParallel,
  mockSimulationsLite,
  mockSimulationSequential,
  mockSimulations,
  mockStatusData,
} from "./mockData";

const ENDPOINT = ENDPOINTS.simulation;

export const simulationAPI = {
  // 시뮬레이션 목록 조회
  getSimulations: (params: URLSearchParams) => apiClient.getApi<GetSimulationsResult>(`${ENDPOINT}`, { params }),

  getMockSimulations: (params: URLSearchParams) =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 목록을 성공적으로 조회했습니다.",
      data: mockSimulations,
    }),

  // 드롭다운용 시뮬레이션 목록 조회
  getSimulationsLite: () => apiClient.getApi<GetSimulationsLiteResult>(`${ENDPOINTS.simulation}/summary`),

  getMockSimulationsLite: () =>
    Promise.resolve({
      status: "success",
      message: "대시보드 데이터를 성공적으로 조회했습니다.",
      data: mockSimulationsLite,
    }),

  // 시뮬레이션 상세 조회
  getSimulation: (id: number) => apiClient.getApi<GetSimulationStaticResult>(`${ENDPOINT}/${id}?view=detail`),

  getMockSimulation: (simulationId: number): Promise<APIResponse<GetSimulationStaticResult>> =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 정보를 성공적으로 조회했습니다.",
      data: mockSimulationSequential,
    }),

  // 대시보드용 시뮬레이션 조회
  getSimulationSummary: (id: number) =>
    apiClient.getApi<GetSimulationSummaryResult>(`${ENDPOINT}/${id}?view=dashboard`),

  getMockSimulationSummary: (simulationId: number) =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 정보를 성공적으로 조회했습니다.",
      data: mockRunningParallel,
    }),

  // 시뮬레이션 동적 상태 조회
  getSimulationStatus: (id: number) => apiClient.getApi<GetSimulationStatusResult>(`${ENDPOINT}/${id}/status`),

  getMockSimulationStatus: (simulationId: number): Promise<APIResponse<GetStatusResponseFinal>> =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 상태를 성공적으로 조회했습니다.",
      data: mockStatusData.failed.sequential,
    }),

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
};
