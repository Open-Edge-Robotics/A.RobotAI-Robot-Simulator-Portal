import type {
  AllowedParam,
  GroupExecutionDetailFormData,
  PeriodFilterOption,
  ParallelAgentGroupFormData,
  PatternTypeFilterOption,
  SequentialAgentGroupFormData,
  SimulationFormData,
  StatusFilterOption,
  SimulationCreationStep,
} from "@/types/simulation/domain";

import { isPatternTypeFilterOption, isPeriodFilterOption, isStatusFilterOption } from "@/utils/simulation/typeGuards";

import { isAllowedParam } from "./typeGuards";
import { formatDateToYYYYMMDD } from "../common/formatting";

// ========== 시뮬레이션 생성 폼 단계별 검증 함수 ==========

const validateStep1 = (formData: SimulationFormData) => {
  if (!formData.name.trim()) {
    return "시뮬레이션 이름을 입력해주세요.";
  }
  if (!formData.mecId) {
    return "MEC를 선택해주세요.";
  }
  return null;
};

const validateStep2 = (formData: SimulationFormData) => {
  if (!formData.pattern) {
    return "실행 패턴을 선택해주세요.";
  }

  return null;
};

const validateStep3 = (formData: SimulationFormData) => {
  if (!formData.pattern) return "실행 패턴을 먼저 선택해주세요.";

  const { agentGroups } = formData.pattern;

  if (agentGroups.length === 0) {
    return "최소 하나 이상의 그룹을 설정해주세요.";
  }

  for (let i = 0; i < agentGroups.length; i++) {
    const group = agentGroups[i];
    const errorMessage = validateAgentGroup(group, i + 1);
    if (errorMessage) return errorMessage;
  }

  return null;
};

const MIN_AGENT_COUNT = 1; // 대
const MIN_EXECUTION_TIME = 60; // 초
const MIN_REPEAT_COUNT = 1; // 회
const MIN_DELAY_AFTER_COMPLETION = 0; // 초

const validateAgentGroup = (group: SequentialAgentGroupFormData | ParallelAgentGroupFormData, groupNumber: number) => {
  const groupLabel = `${groupNumber}번 그룹`;

  if (!group.templateId) {
    return `${groupLabel}에 템플릿을 선택해주세요.`;
  }
  if (group.autonomousAgentCount < MIN_AGENT_COUNT) {
    return `${groupLabel}의 가상자율행동체 개수는 ${MIN_AGENT_COUNT}대 이상이어야 합니다.`;
  }
  if (group.executionTime < MIN_EXECUTION_TIME) {
    return `${groupLabel}의 실행 시간은 ${MIN_EXECUTION_TIME}초 이상이어야 합니다.`;
  }
  if (group.repeatCount < MIN_REPEAT_COUNT) {
    return `${groupLabel}의 반복 횟수는 ${MIN_REPEAT_COUNT}회 이상이어야 합니다.`;
  }

  // 순차 실행일 경우 추가 검증
  if ("delayAfterCompletion" in group && group.delayAfterCompletion < MIN_DELAY_AFTER_COMPLETION) {
    return `${groupLabel}의 대기 시간은 ${MIN_DELAY_AFTER_COMPLETION}초 이상이어야 합니다.`;
  }

  return null;
};

const validateStep4 = (formData: SimulationFormData) => {
  for (let step = 1 as SimulationCreationStep; step <= 3; step++) {
    const errorMessage = createFormValidator[step](formData);
    if (errorMessage) return errorMessage;
  }

  return null;
};

// 메인 검증 객체
export const createFormValidator: {
  [K in SimulationCreationStep]: (formData: SimulationFormData) => string | null;
} = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
} as const;

/**
 * yyyy-mm-dd 형식의 날짜 문자열인지 검증
 * @param dateString - 검증할 날짜 문자열
 * @returns 형식이 맞으면 true, 아니면 false
 */
const isValidDateFormat = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  return dateRegex.test(dateString);
};

/**
 * 유효한 날짜인지 검증 (실제 존재하는 날짜인지 확인)
 * @param dateString - 검증할 날짜 문자열 (yyyy-mm-dd)
 * @returns 유효한 날짜면 true, 아니면 false
 */
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return false;

  // 로컬 날짜 성분으로 역변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const reconstructed = `${year}-${month}-${day}`;

  return dateString === reconstructed;
};

/**
 * 날짜 문자열 검증 (yyyy-mm-dd 형식)
 * @param dateString - 검증할 날짜 문자열
 * @returns 유효한 경우 날짜 문자열, 무효한 경우 null
 */
const validateDate = (dateString: string | null): string | null => {
  if (dateString === null || dateString === "") return null;

  // 1. 형식 검증
  if (!isValidDateFormat(dateString)) {
    console.log("Invalid date format");
    return null;
  }

  // 2. 실제 날짜 검증
  if (!isValidDate(dateString)) {
    console.log("Invalid date value");
    return null;
  }

  return dateString;
};

/**
 * 날짜 범위 검증 (시작일과 종료일을 함께 검증)
 * @param startDate - 시작일
 * @param endDate - 종료일
 * @returns 검증 결과와 유효한 날짜들
 */
const validateDateRange = (
  startDate: string | null,
  endDate: string | null,
): {
  startDate: string | null;
  endDate: string | null;
  isValid: boolean;
} => {
  const validStartDate = validateDate(startDate);
  const validEndDate = validateDate(endDate);

  // 둘 다 null이면 유효함
  if (!validStartDate && !validEndDate) {
    return { startDate: null, endDate: null, isValid: true };
  }

  // 하나만 있는 경우는 무효함
  if (!validStartDate || !validEndDate) {
    return {
      startDate: null,
      endDate: null,
      isValid: false,
    };
  }

  // 둘 다 있는 경우 순서 검증
  const start = new Date(validStartDate);
  const end = new Date(validEndDate);
  const isValid = start <= end;

  return isValid
    ? { startDate: validStartDate, endDate: validEndDate, isValid: true }
    : { startDate: null, endDate: null, isValid: false };
};

// ========== 파라미터 검증 함수들 ==========

const validatePage = (value: string | null): number | null => {
  if (value === null) return null;

  const pageNum = parseInt(value, 10);

  return !isNaN(pageNum) && pageNum > 0 ? pageNum : null;
};

const validateSize = (value: string | null): number | null => {
  if (value === null) return null;

  const validSizes = [10, 15, 20, 30, 50, 100, 500];
  const sizeNum = parseInt(value, 10);

  return validSizes.includes(sizeNum) ? sizeNum : null;
};

const validateStatusFilter = (value: string | null): StatusFilterOption | null => {
  return value && isStatusFilterOption(value) ? value : null;
};

const validatePatternTypeFilter = (value: string | null): PatternTypeFilterOption | null => {
  return value && isPatternTypeFilterOption(value) ? value : null;
};

const validatePeriodFilter = (value: string | null): PeriodFilterOption | null => {
  return value && isPeriodFilterOption(value) ? value : null;
};

/**
 * 기간 및 날짜 검증
 * @param period - 검증할 기간
 * @param startDate - 검증할 시작일
 * @param endDate - 검증할 종료일
 * @returns 검증된 기간과 날짜값
 */
const validatePeriodAndDates = (
  period: string | null,
  startDate: string | null,
  endDate: string | null,
): {
  startDate: string | null;
  endDate: string | null;
  period: PeriodFilterOption;
} => {
  const { startDate: validStartDate, endDate: validEndDate } = validateDateRange(startDate, endDate);
  const validPeriod = validatePeriodFilter(period);
  const todayString = formatDateToYYYYMMDD(new Date());

  // 1. 최우선: 양쪽 날짜가 모두 있을 경우, 무조건 custom
  const hasBothDates = Boolean(startDate && endDate);
  if (hasBothDates) {
    // 정상적으로 통과한 경우 그대로 반환, 하나라도 validation 통과 못했으면 둘 다 오늘로 설정
    const areDatesValid = validStartDate && validEndDate;
    return {
      startDate: areDatesValid ? validStartDate : todayString,
      endDate: areDatesValid ? validEndDate : todayString,
      period: "custom",
    };
  }

  // 2. period가 유효하지 않을 경우, 기본값(전체 기간)으로 설정
  if (validPeriod === null) {
    return { startDate: null, endDate: null, period: "" };
  }

  // 3. 두 날짜가 하나도 없을 경우, period 값에 따라 startDate, endDate 설정
  const hasAnyDate = Boolean(startDate || endDate);
  if (!hasAnyDate) {
    return validPeriod === "custom"
      ? { startDate: todayString, endDate: todayString, period: "custom" }
      : { startDate: null, endDate: null, period: validPeriod };
  }

  // 4. 두 날짜 중 하나만 있을 경우, period 값에 따라 처리
  return validPeriod === "custom"
    ? // custom이라면 날짜 오늘로 재설정
      { startDate: todayString, endDate: todayString, period: "custom" }
    : // 다른 것이라면 startDate와 endDate null로 없애고 period를 따름
      { startDate: null, endDate: null, period: validPeriod };
};

/**
 * 유효하지 않은 파라미터가 있으면 URL을 정리
 * @param searchParams - URLSearchParams 객체
 * @return 변경된 파라미터가 있으면 새로운 URLSearchParams, 없으면 null
 */
export const getValidSearchParams = (searchParams: URLSearchParams) => {
  const newSearchParams = new URLSearchParams();
  let needsUpdate = false;

  // 허용되지 않은 파라미터 제거 체크
  const hasInvalidParams = Array.from(searchParams.keys()).some((key) => !isAllowedParam(key));
  if (hasInvalidParams) needsUpdate = true;

  // 각 파라미터 검증 및 설정
  const currentParams: Record<AllowedParam, string | null> = {
    page: searchParams.get("page"),
    size: searchParams.get("size"),
    status: searchParams.get("status"),
    pattern_type: searchParams.get("pattern_type"),
    start_date: searchParams.get("start_date"),
    end_date: searchParams.get("end_date"),
    period: searchParams.get("period"),
  };

  // 기간 및 날짜 검증
  const {
    period: validPeriod,
    startDate: validStartDate,
    endDate: validEndDate,
  } = validatePeriodAndDates(currentParams.period, currentParams.start_date, currentParams.end_date);

  const validParams: Record<AllowedParam, string | number | null> = {
    page: validatePage(currentParams.page),
    size: validateSize(currentParams.size),
    status: validateStatusFilter(currentParams.status),
    pattern_type: validatePatternTypeFilter(currentParams.pattern_type),
    start_date: validStartDate,
    end_date: validEndDate,
    period: validPeriod,
  };

  // 변경사항 체크 및 새 파라미터 설정
  Object.entries(validParams).forEach(([key, value]) => {
    const originalValue = currentParams[key as keyof typeof currentParams];

    if (originalValue !== (value ? String(value) : null)) {
      needsUpdate = true;
    }

    if (value !== null) {
      newSearchParams.set(key, String(value));
    }
  });

  return needsUpdate ? newSearchParams : null;
};

type ValidationResult = { isValid: true } | { isValid: false; error: string };

/**
 * 숫자 필드 검증
 * @param value - 검사할 숫자 값
 * @param fieldName - 필드 이름
 * @param min - 최소값 (기본값: 1)
 * @param max - 최대값 (선택사항)
 * @returns 유효한 경우 null, 무효한 경우 에러 메시지
 */
const validateNumberField = (value: number, fieldName: string, min: number = 1, max?: number): string | null => {
  if (isNaN(value) || value < min) {
    return `${fieldName}은(는) ${min} 이상의 숫자여야 합니다.`;
  }
  // TODO: max validadtion 추가
  return null;
};

/**
 * 객체 검증
 * @param obj - 검사할 객체
 * @param fieldName - 필드 이름
 * @returns 유효한 경우 null, 무효한 경우 에러 메시지
 */
const validateObjectField = (obj: object | null, fieldName: string): string | null => {
  if (!obj) {
    return `${fieldName}을(를) 지정해주세요.`;
  }
  return null;
};

/**
 * 패턴 그룹 폼 검증
 * @param formData - 검증할 폼 데이터
 * @returns 각 필드별로 검증 후 유효한 경우 `isValid: true`, 무효한 경우 `isValid: false`와 에러 메시지
 */
export const validatePatternGroupForm = (formData: GroupExecutionDetailFormData): ValidationResult => {
  // 검증 규칙 정의
  const validations = [
    () => validateObjectField(formData.template, "템플릿"),
    () => validateNumberField(formData.autonomousAgentCount, "가상 자율행동체 수", MIN_AGENT_COUNT),
    () => validateNumberField(formData.executionTime, "실행 시간", MIN_EXECUTION_TIME),
    () => validateNumberField(formData.repeatCount, "반복 횟수", MIN_REPEAT_COUNT),
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

/**
 * 기간 검증
 * @param startDate - 시작일
 * @param endDate - 종료일 (선택)
 * @returns 유효한 경우 `isValid: true`, 무효한 경우 `isValid: false`와 에러 메시지
 */
export const validatePeriodField = (startDate: Date | null, endDate: Date | null): ValidationResult => {
  let errorMessage = null;

  if (!startDate || !endDate) {
    errorMessage = "시작 날짜와 종료 날짜를 모두 선택해주세요.";
  } else if (startDate > endDate) {
    errorMessage = "시작 날짜는 종료 날짜 이전이어야 합니다.";
  }

  return errorMessage ? { isValid: false, error: errorMessage } : { isValid: true };
};
