import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/_apiPath";
import { SimulationIdParam, PostSimulation } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import {
  SimulationActionResponse,
  SimulationListResponse,
  SimulationPostResponse,
} from "@/type/response/_simulation";

const simulationURL = BASE_API.SIMULATION;

/**
 * @description 시뮬레이션 목록 조회
 * @returns {SimulationListResponse}
 */
const getSimulationList = async (): Promise<SimulationListResponse> => {
  const result = await apiGet<Result<SimulationListResponse>>(simulationURL);
  return result.data;
};

/**
 * @description 시뮬레이션 생성
 * @param {PostSimulation} request - 시뮬레이션 이름, 시뮬레이션 설명
 * @returns {SimulationPostResponse}
 */
const postSimulation = async (
  request: PostSimulation,
): Promise<SimulationPostResponse> => {
  const result = await apiPost<Result<SimulationPostResponse>>(
    simulationURL,
    request,
  );
  return result.data;
};

/**
 * @description 시뮬레이션 삭제
 * @param {SimulationIdParam} request - 시뮬레이션 ID
 * @returns {SimulationActionResponse}
 */
const deleteSimulation = async (
  request: SimulationIdParam,
): Promise<SimulationActionResponse> => {
  const result = await apiDelete<Result<SimulationActionResponse>>(
    `${simulationURL}/${request.simulationId}`,
  );
  return result.data;
};

export { getSimulationList, postSimulation, deleteSimulation };
