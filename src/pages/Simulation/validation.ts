import { FILTER_OPTIONS } from "@/constants/simulation";
import type {
  ParallelAgentGroup,
  PatternTypeFilterOption,
  SequentialAgentGroup,
  SimulationFormData,
  StatusFilterOption,
  StepType,
} from "@/types/simulation/domain";

// ========== 스텝별 검증 함수 ==========

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

const validateAgentGroup = (group: SequentialAgentGroup | ParallelAgentGroup, groupNumber: number) => {
  const groupLabel = `${groupNumber}번째 그룹`;

  if (!group.templateId) {
    return `${groupLabel}에 템플릿을 선택해주세요.`;
  }
  if (group.autonomousAgentCount < 1) {
    return `${groupLabel}의 가상자율행동체 개수는 1대 이상이어야 합니다.`;
  }
  if (group.executionTime < 1) {
    return `${groupLabel}의 실행 시간은 1초 이상이어야 합니다.`;
  }
  if (group.repeatCount < 1) {
    return `${groupLabel}의 반복 횟수는 1회 이상이어야 합니다.`;
  }

  // 순차 실행일 경우 추가 검증
  if ("delayAfterCompletion" in group && group.delayAfterCompletion < 0) {
    return `${groupLabel}의 대기 시간은 0초 이상이어야 합니다.`;
  }

  return null;
};

const validateStep4 = (formData: SimulationFormData) => {
  for (let step = 1 as StepType; step <= 3; step++) {
    const errorMessage = createFormValidator[step](formData);
    if (errorMessage) return errorMessage;
  }

  return null;
};

// 메인 검증 객체
export const createFormValidator: {
  [K in StepType]: (formData: SimulationFormData) => string | null;
} = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
} as const;

// ========== 타입 가드 함수들 ==========

const isStatusFilterOption = (value: string): value is StatusFilterOption => {
  const validStatuses = FILTER_OPTIONS.status.map((option) => option.value);
  return validStatuses.includes(value as StatusFilterOption);
};

const isPatternTypeFilterOption = (value: string): value is PatternTypeFilterOption => {
  const validPatternTypes = FILTER_OPTIONS.patternType.map((option) => option.value);
  return validPatternTypes.includes(value as PatternTypeFilterOption);
};

// ========== 파라미터 검증 함수들 ==========

export const validatePage = (value: string | null): number | null => {
  if (value === null) return null;
  const pageNum = parseInt(value, 10);
  return !isNaN(pageNum) && pageNum > 0 ? pageNum : null;
};

export const validateSize = (value: string | null): number | null => {
  if (value === null) return null;
  const validSizes = [10, 15, 20, 30, 50, 100, 500];
  const sizeNum = parseInt(value, 10);
  return validSizes.includes(sizeNum) ? sizeNum : null;
};

export const validateStatusFilter = (value: string | null): string | null => {
  return value && isStatusFilterOption(value) ? value : null;
};

export const validatePatternTypeFilter = (value: string | null): string | null => {
  return value && isPatternTypeFilterOption(value) ? value : null;
};
