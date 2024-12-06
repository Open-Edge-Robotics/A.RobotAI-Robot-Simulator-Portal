import { BASE_API } from "@/constants/api/_apiPath";
import { apiDelete, apiGet } from "@/lib/axios";
import { TemplateIdField } from "@/type/_field";
import { Result } from "@/type/response/_default";
import {
  TemplateDeleteResponse,
  TemplateListResponse,
} from "@/type/response/_template";

/**
 * @description 템플릿 목록 조회
 * @returns {TemplateListResponse} - {템플릿 ID, 템플릿 타입, 템플릿 설명} 담은 배열
 */
const getTemplateList = async (): Promise<Result<TemplateListResponse>> => {
  const response = await apiGet<Result<TemplateListResponse>>(
    BASE_API.TEMPLATE,
  );
  return response.data;
};

/**
 * @description 템플릿 삭제
 * @returns {TemplateDeleteResponse} - 템플릿 ID
 */
const deleteTemplate = async (
  request: TemplateIdField,
): Promise<Result<TemplateDeleteResponse>> => {
  const response = await apiDelete<Result<TemplateDeleteResponse>>(
    `${BASE_API.TEMPLATE}/${request.templateId}`,
  );
  return response.data;
};

export const template = {
  getTemplateList,
  deleteTemplate,
};
