import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/api/_apiPath";
import { PostSimulationRequest } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import {
  SimulaionDeleteResponse,
  SimulationListResponse,
  SimulationPostResponse,
} from "@/type/response/_simulation";
import { SimulationIdField } from "@/type/_field";

const simulationURL = BASE_API.SIMULATION;

/**
 * @description 시뮬레이션 목록 조회
 *
 */
const getSimulationList = async (): Promise<Result<SimulationListResponse>> => {
  const response = await apiGet<Result<SimulationListResponse>>(simulationURL);
  return response.data;
};

/**
 * @description 시뮬레이션 생성
 * @param {PostSimulationRequest} - 시뮬레이션 이름, 시뮬레이션 설명
 */
const postSimulation = async ({
  simulationName,
  simulationDescription,
}: PostSimulationRequest): Promise<Result<SimulationPostResponse>> => {
  const response = await apiPost<Result<SimulationPostResponse>>(
    simulationURL,
    {
      simulationName,
      simulationDescription,
    },
  );
  return response.data;
};

/**
 * @description 시뮬레이션 삭제
 * @param {SimulationIdField} - 시뮬레이션 ID
 * @returns {SimulaionDeleteResponse}
 */
const deleteSimulation = async ({
  simulationId,
}: SimulationIdField): Promise<Result<SimulaionDeleteResponse>> => {
  const response = await apiDelete<Result<SimulaionDeleteResponse>>(
    `${simulationURL}/${simulationId}`,
  );
  return response.data;
};

export const simulation = {
  getSimulationList,
  postSimulation,
  deleteSimulation,
};
