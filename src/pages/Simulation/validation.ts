import { FILTER_OPTIONS } from "./constants";
import type {
  ParallelAgentGroup,
  PatternTypeFilterOption,
  SequentialAgentGroup,
  SimulationFormData,
  StatusFilterOption,
  StepType,
} from "./types";

const validateStep1 = (formData: SimulationFormData) => {
  if (formData.name.trim() === "") {
    return "시뮬레이션 이름을 입력해주세요.";
  }
  if (!formData.mecId) {
    return "MEC를 선택해주세요.";
  }
  return null;
};

const validateStep2 = (formData: SimulationFormData) => {
  if (formData.pattern === null) {
    return "실행 패턴을 선택해주세요.";
  }

  return null;
};

const validateStep3 = (formData: SimulationFormData) => {
  if (!formData.pattern) return "실행 패턴을 먼저 선택해주세요.";

  const { agentGroups } = formData.pattern;

  for (const group of agentGroups) {
    const errorMessage = validatePatternGroup(group);
    if (errorMessage) return errorMessage;
  }

  return null;
};

const validatePatternGroup = (group: SequentialAgentGroup | ParallelAgentGroup) => {
  if (!group.templateId) return "모든 그룹에 템플릿을 지정해주세요.";
  if (group.agentCount < 1) return "가상자율행동체 개수는 1대 이상이어야 합니다.";
  if (group.executionTime < 1) return "실행 시간은 1초 이상이어야 합니다.";
  if (group.repeatCount < 1) return "반복 횟수는 1번 이상이어야 합니다.";

  return null;
};

const validateStep4 = (formData: SimulationFormData) => {
  for (let step = 1 as StepType; step <= 3; step++) {
    const errorMessage = createFormValidator[step](formData);
    if (errorMessage) return errorMessage;
  }

  return null;
};

export const createFormValidator: {
  [K in StepType]: (formData: SimulationFormData) => string | null;
} = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};

// 타입 가드 함수들

const isStatusFilterOption = (value: string): value is StatusFilterOption => {
  const validStatuses = FILTER_OPTIONS.status.map((option) => option.value);
  return validStatuses.includes(value as StatusFilterOption);
};

const isPatternTypeFilterOption = (value: string): value is PatternTypeFilterOption => {
  const validPatternTypes = FILTER_OPTIONS.patternType.map((option) => option.value);
  return validPatternTypes.includes(value as PatternTypeFilterOption);
};

// validate 함수들

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
