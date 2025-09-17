import { ALLOWED_PARAMS } from "@/constants/simulation";

import {
  validatePage,
  validatePatternTypeFilter,
  validateSize,
  validateStatusFilter,
} from "@/pages/simulation/validation";

import type { AllowedParam, GroupExecutionDetailFormData } from "@/types/simulation/domain";

const isAllowedParam = (key: string): key is AllowedParam => {
  return ALLOWED_PARAMS.includes(key as AllowedParam);
};

// 유효하지 않은 파라미터가 있으면 URL을 정리
export const getValidParams = (searchParams: URLSearchParams) => {
  const newSearchParams = new URLSearchParams();
  let needsUpdate = false;

  // 허용되지 않은 파라미터 제거 체크
  const hasInvalidParams = Array.from(searchParams.keys()).some((key) => !isAllowedParam(key));
  if (hasInvalidParams) needsUpdate = true;

  // 각 파라미터 검증 및 설정
  const currentParams = {
    page: searchParams.get("page"),
    size: searchParams.get("size"),
    status: searchParams.get("status"),
    pattern_type: searchParams.get("pattern_type"),
  };

  const validParams = {
    page: validatePage(currentParams.page),
    size: validateSize(currentParams.size),
    status: validateStatusFilter(currentParams.status),
    pattern_type: validatePatternTypeFilter(currentParams.pattern_type),
  };

  // 변경사항 체크 및 새 파라미터 설정
  Object.entries(validParams).forEach(([key, value]) => {
    const originalValue = currentParams[key as keyof typeof currentParams];

    if (originalValue !== String(value)) {
      needsUpdate = true;
    }

    if (value !== null) {
      newSearchParams.set(key, String(value));
    }
  });

  return needsUpdate ? newSearchParams : null;
};

type ValidationResult = { isValid: true } | { isValid: false; error: string };

// 숫자 필드 검사
const validateNumberField = (value: number, fieldName: string, min: number = 1, max?: number): string | null => {
  if (isNaN(value) || value < min) {
    return `${fieldName}은(는) ${min} 이상의 숫자여야 합니다.`;
  }
  // TODO: max validadtion 추가
  return null;
};

// 필수 객체 검사
const validateObjectField = (obj: object | null, fieldName: string): string | null => {
  if (!obj) {
    return `${fieldName}을(를) 지정해주세요.`;
  }
  return null;
};

export const validatePatternGroupForm = (formData: GroupExecutionDetailFormData): ValidationResult => {
  // 검사 규칙 정의
  const validations = [
    () => validateObjectField(formData.template, "템플릿"),
    () => validateNumberField(formData.autonomousAgentCount, "자율행동체 수"),
    () => validateNumberField(formData.executionTime, "실행 시간", 60),
    () => validateNumberField(formData.repeatCount, "반복 횟수"),
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
