import { STEPS_INFO } from "@/constants/simulation";

import type {
  ParallelAgentGroup,
  PatternType,
  SequentialAgentGroup,
  SimulationPattern,
  StepInfo,
  StepType,
} from "@/types/simulation/domain";

// 스텝 정보 조회
export const getCurrentStepInfo = (step: StepType, pattern: PatternType | null) => {
  if (step === 3 && pattern) {
    return STEPS_INFO[3][pattern];
  }
  return STEPS_INFO[step] as StepInfo;
};

const sequentialDefaultData: SequentialAgentGroup = {
  stepOrder: 1,
  templateId: null,
  autonomousAgentCount: 1,
  executionTime: 60,
  delayAfterCompletion: 0,
  repeatCount: 1,
};

const parallelDefaultData: ParallelAgentGroup = {
  templateId: null,
  autonomousAgentCount: 1,
  executionTime: 60,
  repeatCount: 1,
};

// 패턴 타입에 따른 기본 에이전트 그룹 데이터 반환
export function getPatternDataWithDefaultAgentGroup(type: PatternType): SimulationPattern {
  if (type === "sequential") {
    return { type: "sequential", agentGroups: [sequentialDefaultData] };
  }
  return { type: "parallel", agentGroups: [parallelDefaultData] };
}
