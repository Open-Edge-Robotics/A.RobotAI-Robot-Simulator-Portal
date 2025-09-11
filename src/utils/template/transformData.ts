import type { CreateTemplateRequest } from "@/types/template/api";
import type { TemplateFormData } from "@/types/template/domain";

export const transformTemplateFormDataToRequest = (data: TemplateFormData): CreateTemplateRequest => {
  const formData = new FormData();

  // 기본 필드 추가
  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("description", data.description);

  // topics 배열을 쉼표로 구분된 문자열로 변환하여 추가
  formData.append("topics", data.topics.join(","));

  // 파일 첨부
  const files = data.files;
  if (files.metadata) {
    formData.append("metadata_file", files.metadata);
  }

  if (files.database) {
    formData.append("db_file", files.database);
  }

  return formData;
};
