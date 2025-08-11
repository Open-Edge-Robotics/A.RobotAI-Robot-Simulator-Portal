import type {
  ParallelAgentGroup,
  SequentialAgentGroup,
  SimulationFormData,
  StepType,
} from "./types";

const validateStep1 = (formData: SimulationFormData) => {
  if (formData.name.trim() === "") {
    return "시뮬레이션 이름을 입력해주세요.";
  }
  if (!formData.mec) {
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

const validatePatternGroup = (
  group: SequentialAgentGroup | ParallelAgentGroup,
) => {
  if (!group.template) return "템플릿을 선택해주세요.";
  if (group.autonomousAgentCount < 1)
    return "가상자율행동체 개수는 1대 이상이어야 합니다.";
  if (group.executionTime < 1) return "실행 시간은 1초 이상이어야 합니다.";
  if (group.repeatCount < 1) return "반복 횟수는 1번 이상이어야 합니다.";

  return null;
};

const validateStep4 = (formData: SimulationFormData) => {
  for (let step = 1 as StepType; step <= 3; step++) {
    const errorMessage = validator[step](formData);
    if (errorMessage) return errorMessage;
  }

  return null;
};

export const validator: {
  [K in StepType]: (formData: SimulationFormData) => string | null;
} = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};
