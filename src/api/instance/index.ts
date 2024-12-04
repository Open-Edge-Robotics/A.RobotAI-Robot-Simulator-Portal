import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/api/_apiPath";
import {
  InstancePostRequest,
  InstanceActionPostRequest,
  GetInstanceListRequest,
} from "@/type/request/_instance";
import {
  InstanceActionResponse,
  InstanceDeleteResponse,
  InstanceDetailResponse,
  InstanceListResponse,
  InstancePostResponse,
} from "@/type/response/_instance";
import { Result } from "@/type/response/_default";
import { InstanceIdField } from "@/type/_field";
import { SCHEMA_NAME } from "@/schema/_schema";

const instanceURL = BASE_API.INSTANCE;
const actionURL = BASE_API.ACTION;

/**
 * @description 인스턴스 목록 조회
 * 시뮬레이션 ID가 undefined면 전체 인스턴스 목록 조회
 * 시뮬레이션 ID가 있으면 해당 시뮬레이션 인스턴스 목록 조회
 * @param {GetInstanceListRequest} simulationId - 시뮬레이션 ID(옵셔널)
 * @returns {InstanceListResponse}
 */
const getInstanceList = async (
  simulationId: GetInstanceListRequest,
): Promise<Result<InstanceListResponse>> => {
  const response = await apiGet<Result<InstanceListResponse>>(instanceURL, {
    params: {
      ...(simulationId !== undefined && simulationId),
    },
  });
  return response.data;
};

/**
 * @description 인스턴스 상세 조회
 * @param {InstanceIdField} instanceID - 인스턴스 ID
 * @returns {InstanceDetailResponse}
 */
const getInstanceDetail = async (
  instanceID: InstanceIdField,
): Promise<Result<InstanceDetailResponse>> => {
  const response = await apiGet<Result<InstanceDetailResponse>>(
    `${instanceURL}/${instanceID[SCHEMA_NAME.INSTANCE.ID as keyof InstanceIdField]}`,
  );
  return response.data;
};

/**
 * @description 인스턴스 생성
 * @param {InstancePostRequest} request - 인스턴스 이름, 인스턴스 설명, 시뮬레이션 ID, 템플릿 ID, 인스턴스 개수
 * @returns {InstancePostResponse}
 */
const postInstance = async (
  request: InstancePostRequest,
): Promise<Result<InstancePostResponse>> => {
  const response = await apiPost<Result<InstancePostResponse>>(
    instanceURL,
    request,
  );
  return response.data;
};

/**
 * @description 인스턴스 실행/중지
 * @param {InstanceActionPostRequest} request - 인스턴스 ID, 액션(실행 or 중지)
 * @returns {InstanceActionResponse}
 */
const postInstanceAction = async (
  request: InstanceActionPostRequest,
): Promise<Result<InstanceActionResponse>> => {
  const response = await apiPost<Result<InstanceActionResponse>>(
    `${instanceURL}${actionURL}`,
    request,
  );
  return response.data;
};

/**
 * @description 인스턴스 목록 실행
 * @param {string[]} requests - 인스턴스 ID 목록
 * @return {Promise<Result<null>[]>} - 인스턴스 단일 삭제 response 배열
 */
const startInstanceList = async (
  requests: string[],
): Promise<Result<null>[]> => {
  const startPromises = requests.map((request) =>
    postInstanceAction({ instanceId: Number(request), action: "start" }),
  );
  const response = await Promise.all(startPromises);
  return response;
};

/**
 * @description 인스턴스 단일 삭제
 * @param {InstanceIdField} request - 삭제할 인스턴스 ID
 * @returns {InstanceDeleteResponse}
 */
const deleteInstance = async (
  request: InstanceIdField,
): Promise<Result<InstanceDeleteResponse>> => {
  const response = await apiDelete<Result<InstanceDeleteResponse>>(
    `${instanceURL}/${request[SCHEMA_NAME.INSTANCE.ID as keyof InstanceIdField]}`,
  );
  return response.data;
};

/**
 * @description 인스턴스 목록 삭제
 * @param {string[]} requests - 인스턴스 목록에서 체크된 인스턴스 ID 배열
 * @return {Promise<Result<null>[]>} - 인스턴스 단일 삭제 response 배열
 */
const deleteInstanceList = async (
  requests: string[],
): Promise<Result<null>[]> => {
  const deletePromises = requests.map((request) =>
    deleteInstance({ instanceId: Number(request) }),
  );
  const response = await Promise.all(deletePromises);
  return response;
};

export const instance = {
  getInstanceList,
  getInstanceDetail,
  postInstance,
  postInstanceAction,
  startInstanceList,
  deleteInstance,
  deleteInstanceList,
};
