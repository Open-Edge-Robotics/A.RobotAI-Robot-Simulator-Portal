import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/_apiPath";
import {
  InstancePostRequest,
  InstanceIdParam,
  InstanceActionPostRequest,
} from "@/type/request/_instance";
import {
  InstanceActionResponse,
  InstanceDetailResponse,
  InstanceListResponse,
  InstancePostResponse,
} from "@/type/response/_instance";
import { Result } from "@/type/response/_default";
import { SimulationActionResponse } from "@/type/response/_simulation";

const instanceURL = BASE_API.INSTANCE;
const actionURL = BASE_API.ACTION;

/**
 * @description 인스턴스 목록 조회
 * @returns {InstanceListResponse}
 */
const getInstanceList = async (): Promise<InstanceListResponse> => {
  const result = await apiGet<Result<InstanceListResponse>>(instanceURL);
  return result.data;
};

/**
 * @description 인스턴스 상세 조회
 * @param {InstanceIdParam} request : 인스턴스 ID
 * @returns {InstanceDetailResponse}
 */
const getInstanceDetail = async (
  request: InstanceIdParam,
): Promise<InstanceDetailResponse> => {
  const result = await apiGet<Result<InstanceDetailResponse>>(
    `${instanceURL}/${request.instanceId}`,
  );
  return result.data;
};

/**
 * @description 인스턴스 생성
 * @param {InstancePostRequest} request - 인스턴스 이름, 인스턴스 설명, 시뮬레이션 ID, 템플릿 ID, 인스턴스 개수
 * @returns {InstancePostResponse}
 */
const postInstance = async (
  request: InstancePostRequest,
): Promise<InstancePostResponse> => {
  const result = await apiPost<Result<InstancePostResponse>>(
    instanceURL,
    request,
  );
  return result.data;
};

/**
 * @description 인스턴스 실행/중지
 * @param {InstanceActionPostRequest} request - 실행 or 중지
 * @returns {InstanceActionResponse}
 */
const postInstanceAction = async (
  request: InstanceActionPostRequest,
): Promise<InstanceActionResponse> => {
  const result = await apiPost<Result<InstanceActionResponse>>(
    `${instanceURL}/${request.instanceId}/${actionURL}`,
    request,
  );
  return result.data;
};

/**
 * @description 인스턴스 삭제
 * @param {InstanceIdParam} request - 삭제할 인스턴스 ID
 템플릿 ID , 인스턴스 개수 {SimulationActionResponse}
 */
const deleteInstance = async (
  request: InstanceIdParam,
): Promise<SimulationActionResponse> => {
  const result = await apiDelete<Result<SimulationActionResponse>>(
    `${instanceURL}/${request.instanceId}`,
  );
  return result.data;
};

export {
  getInstanceList,
  getInstanceDetail,
  postInstance,
  postInstanceAction,
  deleteInstance,
};
