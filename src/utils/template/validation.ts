import type { EditorFile, ValidationResult } from "@/types/common";
import type { TemplateFormData } from "@/types/template/domain";

import { isLocalFile } from "../common/file";

// 문자열 필드 검사 헬퍼 함수
const validateStringField = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName}을(를) 입력해주세요.`;
  }
  return null;
};

// 배열 필드 검사 헬퍼 함수
const validateArrayField = (array: unknown[], fieldName: string): string | null => {
  if (!array || array.length === 0) {
    return `최소 하나의 ${fieldName}을(를) 선택해주세요.`;
  }
  return null;
};

// 파일 필드 검사 헬퍼 함수
const validateFileField = (file: EditorFile, fieldName: string): string | null => {
  if (!file || (isLocalFile(file) && !file.file)) {
    return `${fieldName} 파일을 업로드해주세요.`;
  }

  return null;
};

// 템플릿 폼 유효성 검사 함수
export const validateTemplateForm = (formData: TemplateFormData): ValidationResult => {
  // 검사 규칙 정의
  const validations = [
    () => validateStringField(formData.name, "템플릿 이름"),
    () => validateStringField(formData.description, "템플릿 설명"),
    () => validateStringField(formData.type, "템플릿 타입"),
    () => validateArrayField(formData.topics, "토픽"),
    () => validateFileField(formData.files.metadata, "메타데이터(.yaml/.yml)"),
    () => validateFileField(formData.files.database, "데이터베이스(.db3)"),
  ];

  // 첫 번째 에러 발견 시 즉시 반환
  for (const validate of validations) {
    const error = validate();
    if (error) {
      return { isValid: false, error };
    }
  }

  return { isValid: true };
};
