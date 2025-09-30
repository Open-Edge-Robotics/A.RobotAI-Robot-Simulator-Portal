import { ENDPOINTS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type {
  CreateSimulationRequest,
  CreateSimulationResult,
  GetSimulationsLiteResult,
  GetSimulationStaticResult,
  GetSimulationsResult,
  GetSimulationSummaryResult,
  GetSimulationDeletionStatusResult,
  DeletePatternGroupRequest,
  CreatePatternGroupRequest,
  UpdatePatternGroupRequest,
  GetSimulationExecutionHistoryResult,
} from "@/types/simulation/api";
import type { GetStatusResponseFinal } from "@/types/simulation/statusResult";

import { apiClient } from ".";
import {
  mockFailedParallel,
  mockRunningParallel,
  mockSimulationsLite,
  mockSimulationSequentialPending,
  mockSimulations,
  mockStatusData,
  mockSimulationParallelCompleted,
  mockExecutionHistoryData,
} from "./simulationMockData";

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
  getSimulationsLite: () => apiClient.getApi<GetSimulationsLiteResult>(`${ENDPOINT}/summary`),

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
      data: mockSimulationParallelCompleted,
    }),

  getSimulationExecutionHistory: (id: number, params: URLSearchParams) =>
    apiClient.getApi<GetSimulationExecutionHistoryResult>(`${ENDPOINT}/${id}/execution`, { params }),

  getMockSimulationExecutionHistory: (id: number, params: URLSearchParams) => {
    return Promise.resolve({
      status: "success",
      message: "시뮬레이션 정보를 성공적으로 조회했습니다.",
      data: mockExecutionHistoryData,
    });
  },

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
  getSimulationExecutionRecord: (simulationId: number, executionId: number) =>
    apiClient.getApi<GetStatusResponseFinal>(`${ENDPOINT}/${simulationId}/execution/${executionId}`),

  getMockSimulationExecutionRecord: (
    simulationId: number,
    executionId: number,
  ): Promise<APIResponse<GetStatusResponseFinal>> =>
    Promise.resolve({
      status: "success",
      message: "시뮬레이션 상태를 성공적으로 조회했습니다.",
      data: mockStatusData.running.parallel,
    }),

  // 시뮬레이션 생성
  createSimulation: (data: CreateSimulationRequest) => apiClient.postApi<CreateSimulationResult>(`${ENDPOINT}`, data),

  // 시뮬레이션 삭제
  deleteSimulation: (id: number) => apiClient.deleteApi(`${ENDPOINT}/${id}`),

  deleteMockSimulation: (id: number): Promise<APIResponse<unknown>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "시뮬레이션을 성공적으로 삭제했습니다.",
          data: { simulationId: id, action: "delete" },
        });
      }, 3000); // 3초 지연 (삭제는 조금 더 빠르게)
    });
  },

  getSimulationDeletionStatus: (id: number) =>
    apiClient.getApi<GetSimulationDeletionStatusResult>(`${ENDPOINT}/${id}/deletion`),

  // 시뮬레이션 실행
  startSimulation: (id: number) => apiClient.postApi(`${ENDPOINT}/${id}/start`),

  // 시뮬레이션 중지
  stopSimulation: (simulationId: number, executionId: number) =>
    apiClient.postApi(`${ENDPOINT}/${simulationId}/execution/${executionId}/stop`),

  startMockSimulation: (id: number): Promise<APIResponse<unknown>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "시뮬레이션을 성공적으로 시작했습니다.",
          data: { simulationId: id, action: "start" },
        });
      }, 5000); // 5초 지연
    });
  },

  stopMockSimulation: (id: number): Promise<APIResponse<unknown>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "시뮬레이션을 성공적으로 중지했습니다.",
          data: { simulationId: id, action: "stop" },
        });
      }, 5000); // 5초 지연
    });
  },

  // 시뮬레이션(패턴 그룹) 수정 관련 api들
  createPatternGroup: (id: number, data: CreatePatternGroupRequest) =>
    apiClient.postApi(`${ENDPOINT}/${id}/pattern`, data),

  createMockPatternGroup: (id: number, data: CreatePatternGroupRequest) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "패턴 그룹을 성공적으로 추가했습니다.",
          data: { simulationId: id },
        });
      }, 3000);
    });
  },

  updatePatternGroup: (id: number, data: UpdatePatternGroupRequest) =>
    apiClient.putApi(`${ENDPOINT}/${id}/pattern`, data),

  updateMockPatternGroup: (id: number, data: UpdatePatternGroupRequest) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "패턴 그룹을 성공적으로 수정했습니다.",
          data: { simulationId: id, action: "update" },
        });
      }, 3000);
    });
  },

  deletePatternGroup: (id: number, data: DeletePatternGroupRequest) =>
    apiClient.deleteApi(`${ENDPOINT}/${id}/pattern`, data),

  deleteMockPatternGroup: (id: number, data: DeletePatternGroupRequest) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "패턴 그룹을 성공적으로 삭제했습니다.",
          data: { simulationId: id, action: "delete" },
        });
      }, 3000);
    });
  },
};
