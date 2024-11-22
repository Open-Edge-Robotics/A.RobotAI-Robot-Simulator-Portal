import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/_apiPath";
import { PostSimulationRequest } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import {
  SimulationActionResponse,
  SimulationListResponse,
  SimulationPostResponse,
} from "@/type/response/_simulation";
import { SimulationIdField } from "@/type/_field";

const simulationURL = BASE_API.SIMULATION;

/**
 * @description 시뮬레이션 목록 조회
 * @returns {SimulationListResponse}
 */
const getSimulationList = async (): Promise<Result<SimulationListResponse>> => {
  const result = await apiGet<Result<SimulationListResponse>>(simulationURL);
  return result.data;
};

/**
 * @description 시뮬레이션 생성
 * @param {PostSimulationRequest} request - 시뮬레이션 이름, 시뮬레이션 설명
 */
const postSimulation = async (
  request: PostSimulationRequest,
): Promise<Result<SimulationPostResponse>> => {
  const result = await apiPost<Result<SimulationPostResponse>>(
    simulationURL,
    request,
  );
  return result.data;
};

/**
 * @description 시뮬레이션 삭제
 * @param {SimulationIdField} request - 시뮬레이션 ID
 * @returns {SimulationActionResponse}
 */
const deleteSimulation = async (
  request: SimulationIdField,
): Promise<Result<SimulationActionResponse>> => {
  const result = await apiDelete<Result<SimulationActionResponse>>(
    `${simulationURL}/${request.simulationId}`,
  );
  return result.data;
};

export const simulation = {
  getSimulationList,
  postSimulation,
  deleteSimulation,
};
