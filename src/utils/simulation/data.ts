import { ALLOWED_ACTIONS_BY_STATUS, PATTERN_CONFIGS, STEPS_INFO } from "@/constants/simulation";

import type { GetSimulationStaticResult } from "@/types/simulation/api";
import type {
  ParallelAgentGroup,
  PatternType,
  SequentialAgentGroup,
  SimulationActionType,
  SimulationPattern,
  SimulationStatus,
  StepInfo,
  SimulationCreationStep,
} from "@/types/simulation/domain";

// 스텝 정보 조회
export const getCurrentStepInfo = (step: SimulationCreationStep, pattern: PatternType | null) => {
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

// 시뮬레이션 실행 개요 정보(패턴명, 그룹 수, 총 에이전트 수) 생성
export const getExecutionOverview = (simulation: GetSimulationStaticResult) => {
  switch (simulation.patternType) {
    case "sequential":
      return {
        patternName: PATTERN_CONFIGS[simulation.patternType].title,
        patternUnit: PATTERN_CONFIGS[simulation.patternType].unit,
        totalGroups: simulation.executionPlan.steps.length,
        totalAgent: simulation.executionPlan.steps.reduce((acc, step) => acc + step.autonomousAgentCount, 0),
      };
    case "parallel":
      return {
        patternName: PATTERN_CONFIGS[simulation.patternType].title,
        patternUnit: PATTERN_CONFIGS[simulation.patternType].unit,
        totalGroups: simulation.executionPlan.groups.length,
        totalAgent: simulation.executionPlan.groups.reduce((acc, group) => acc + group.autonomousAgentCount, 0),
      };
    default:
      throw new Error("Unknown pattern type");
  }
};

export const getAllowedActions = (status: SimulationStatus, context: "list" | "detail"): SimulationActionType[] => {
  const baseActions = ALLOWED_ACTIONS_BY_STATUS[status];

  if (context === "list") {
    return baseActions.filter((action) => action !== "edit" && action !== "delete");
  }

  return baseActions;
};
