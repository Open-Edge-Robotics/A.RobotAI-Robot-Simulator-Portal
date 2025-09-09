import { ALLOWED_PARAMS } from "@/constants/simulation";
import {
  validatePage,
  validatePatternTypeFilter,
  validateSize,
  validateStatusFilter,
} from "@/pages/simulation/validation";
import type { AllowedParam } from "@/types/simulation/domain";

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
