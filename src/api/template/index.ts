import { BASE_API } from "@/constants/_apiPath";
import { apiGet } from "@/lib/axios";
import { Result } from "@/type/response/_default";
import { TemplateListResponse } from "@/type/response/_template";

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

export const template = {
  getTemplateList,
};
