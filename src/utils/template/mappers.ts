import type { Template, TemplateFormData } from "@/types/template/domain";

// API 응답 데이터를 폼 데이터 형식에 맞게 변환
export const templateApiToForm = (template: Template): TemplateFormData => {
  return {
    name: template.templateName,
    description: template.templateDescription,
    type: template.templateType,
    topics: template.topics.split(","),
    files: {
      metadata: { type: "UPLOADED_FILE", file: template.metadataFile },
      database: { type: "UPLOADED_FILE", file: template.dbFile },
    },
  } satisfies TemplateFormData;
};

export const templateFormToRequest = (template: Partial<TemplateFormData>): FormData => {
  const formData = new FormData();

  // 일반 필드들을 객체로 정의하고 반복문으로 처리
  const simpleFields = {
    name: template.name,
    type: template.type,
    description: template.description,
    topics: template.topics ? template.topics.join(",") : undefined,
  } as const;

  // 일반 필드 처리
  Object.entries(simpleFields).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  // 파일 처리
  appendFiles(formData, template.files);

  return formData;
};

// 파일 처리를 별도 함수로 분리
const appendFiles = (formData: FormData, files?: TemplateFormData["files"]) => {
  if (!files) return;

  const fileMapping: Record<keyof typeof files, string> = {
    metadata: "metadata_file",
    database: "db_file",
  } as const;

  Object.entries(files).forEach(([fileKey, file]) => {
    if (file?.type === "LOCAL_FILE") {
      const formKey = fileMapping[fileKey as keyof typeof files];
      formData.append(formKey, file.file);
    }
  });
};
