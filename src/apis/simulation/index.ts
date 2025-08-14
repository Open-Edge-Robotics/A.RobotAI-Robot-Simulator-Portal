import { API_BASE_URL, ENDPOINTS } from "../constants";
import { createClient } from "..";

import { type CreateSimulationRequest, type CreateSimulationResult } from "./types";

const simulationApiClient = createClient({
  baseURL: `${API_BASE_URL.DEV}${ENDPOINTS.SIMULATION}`,
  //   enableAuth: true,
});

export const simulationAPI = {
  // 시뮬레이션 목록 조회
  getSimulations: () => simulationApiClient.get(""),

  // 시뮬레이션 상세 조회
  getSimulation: (id: string) => simulationApiClient.get(`/${id}`),

  // 시뮬레이션 생성
  createSimulation: (data: CreateSimulationRequest) =>
    simulationApiClient.post<CreateSimulationResult>("kjkjhkjh", data),

  // 시뮬레이션 수정
  updateSimulation: (id: string, data: unknown) => simulationApiClient.put(`/${id}`, data),

  // 시뮬레이션 삭제
  deleteSimulation: (id: string) => simulationApiClient.delete(`/${id}`),

  // 시뮬레이션 실행
  runSimulation: (id: string) => simulationApiClient.post(`/${id}/run`),

  // 시뮬레이션 일시정지
  pauseSimulation: (id: string) => simulationApiClient.post(`/${id}/pause`),

  // 시뮬레이션 정지
  stopSimulation: (id: string) => simulationApiClient.post(`/${id}/stop`),
};
