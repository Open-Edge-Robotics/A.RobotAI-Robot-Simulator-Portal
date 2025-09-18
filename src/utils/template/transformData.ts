import type { CreateTemplateRequest } from "@/types/template/api";
import type { Template, TemplateFormData } from "@/types/template/domain";

export const transformTemplateFormDataToRequest = (data: TemplateFormData): CreateTemplateRequest => {
  const formData = new FormData();

  // 기본 필드 추가
  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("description", data.description);

  // topics 배열을 쉼표로 구분된 문자열로 변환하여 추가
  formData.append("topics", data.topics.join(","));

  // 로컬에서 새로운 파일 첨부
  const files = data.files;
  if (files.metadata?.type === "LOCAL_FILE") {
    formData.append("metadata_file", files.metadata.file);
  }

  if (files.database?.type === "LOCAL_FILE") {
    formData.append("db_file", files.database.file);
  }

  return formData;
};

// API 응답 데이터를 폼 데이터 형식에 맞게 변환
export const transformTemplateToFormdata = (template: Template): TemplateFormData => {
  return {
    name: template.templateName,
    description: template.templateDescription,
    type: template.templateType,
    topics: template.topics,
    files: {
      metadata: { type: "UPLOADED_FILE", file: template.metadata },
      database: { type: "UPLOADED_FILE", file: template.database },
    },
  } satisfies TemplateFormData;
};
