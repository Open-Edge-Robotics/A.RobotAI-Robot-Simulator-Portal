import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { BASE_API } from "@/constants/_apiPath";
import {
  InstancePostRequest,
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
import { InstanceIdField } from "@/type/_field";
import { SCHEMA_NAME } from "@/schema/_schema";

const instanceURL = BASE_API.INSTANCE;
const actionURL = BASE_API.ACTION;

/**
 * @description 인스턴스 목록 조회
 * @returns {InstanceListResponse}
 */
const getInstanceList = async (): Promise<Result<InstanceListResponse>> => {
  const response = await apiGet<Result<InstanceListResponse>>(instanceURL);
  return response.data;
};

/**
 * @description 인스턴스 상세 조회
 * @param {InstanceIdField} request : 인스턴스 ID
 * @returns {InstanceDetailResponse}
 */
const getInstanceDetail = async (
  request: InstanceIdField,
): Promise<Result<InstanceDetailResponse>> => {
  const response = await apiGet<Result<InstanceDetailResponse>>(
    `${instanceURL}/${request[SCHEMA_NAME.INSTANCE.ID as keyof InstanceIdField]}`,
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
 * @param {InstanceActionPostRequest} request - 실행 or 중지
 * @returns {InstanceActionResponse}
 */
const postInstanceAction = async (
  request: InstanceActionPostRequest,
): Promise<Result<InstanceActionResponse>> => {
  const response = await apiPost<Result<InstanceActionResponse>>(
    `${instanceURL}/${request[SCHEMA_NAME.INSTANCE.ID as keyof InstanceIdField]}/${actionURL}`,
    request,
  );
  return response.data;
};

/**
 * @description 인스턴스 삭제
 * @param {InstanceIdField} request - 삭제할 인스턴스 ID
 템플릿 ID , 인스턴스 개수 {SimulationActionResponse}
 */
const deleteInstance = async (
  request: InstanceIdField,
): Promise<Result<SimulationActionResponse>> => {
  const response = await apiDelete<Result<SimulationActionResponse>>(
    `${instanceURL}/${request[SCHEMA_NAME.INSTANCE.ID as keyof InstanceIdField]}`,
  );
  return response.data;
};

export const instance = {
  getInstanceList,
  getInstanceDetail,
  postInstance,
  postInstanceAction,
  deleteInstance,
};
