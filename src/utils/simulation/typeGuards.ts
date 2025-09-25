import { FILTER_OPTIONS, ALLOWED_PARAMS } from "@/constants/simulation";

import type {
  StatusFilterOption,
  PatternTypeFilterOption,
  PeriodFilterOption,
  AllowedParam,
} from "@/types/simulation/domain";

/**
 * 상태 필터 옵션 타입 가드
 * @param value - 검사할 문자열 값
 * @returns value가 StatusFilterOption 타입인지 여부
 */
export const isStatusFilterOption = (value: string): value is StatusFilterOption => {
  const validStatuses = FILTER_OPTIONS.status.map((option) => option.value);
  return validStatuses.includes(value as StatusFilterOption);
};

/**
 * 패턴 타입 필터 옵션 타입 가드
 * @param value - 검사할 문자열 값
 * @returns value가 PatternTypeFilterOption 타입인지 여부
 */
export const isPatternTypeFilterOption = (value: string): value is PatternTypeFilterOption => {
  const validPatternTypes = FILTER_OPTIONS.patternType.map((option) => option.value);
  return validPatternTypes.includes(value as PatternTypeFilterOption);
};

/**
 * 기간 필터 옵션 타입 가드
 * @param value - 검사할 문자열 값
 * @returns value가 PeriodFilterOption 타입인지 여부
 */
export const isPeriodFilterOption = (value: string): value is PeriodFilterOption => {
  const validPeriods = FILTER_OPTIONS.period.map((option) => option.value);
  return validPeriods.includes(value as PeriodFilterOption);
};

/**
 * 허용된 URL 파라미터 타입 가드
 * @param key - 검사할 파라미터 키
 * @returns key가 AllowedParam 타입인지 여부
 */
export const isAllowedParam = (key: string): key is AllowedParam => {
  return ALLOWED_PARAMS.includes(key as AllowedParam);
};
