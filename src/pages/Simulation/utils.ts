import type { CreateSimulationRequest } from "@/apis/simulation/types";

import { STEPS_INFO } from "./constants";
import type {
  ParallelAgentGroup,
  Pattern,
  PatternType,
  SequentialAgentGroup,
  SimulationFormData,
  StepInfo,
  StepType,
} from "./types";

export const transformFormDataToRequest = (formData: SimulationFormData): CreateSimulationRequest => {
  const baseRequest = {
    mecId: formData.mec!.id,
    simulationName: formData.name,
    simulationDescription: formData.description,
  };

  const pattern = formData.pattern!;

  if (pattern.type === "sequential") {
    return {
      ...baseRequest,
      patternType: "sequential",
      pattern: {
        steps: pattern.agentGroups.map((group) => ({
          stepOrder: group.stepOrder,
          templateId: Number(group.template!.id),
          autonomousAgentCount: group.autonomousAgentCount,
          executionTime: group.executionTime,
          delayAfterCompletion: group.delayAfterCompletion,
          repeatCount: group.repeatCount,
        })),
      },
    };
  } else {
    return {
      ...baseRequest,
      patternType: "parallel",
      pattern: {
        agents: pattern.agentGroups.map((group) => ({
          templateId: Number(group.template!.id),
          autonomousAgentCount: group.autonomousAgentCount,
          executionTime: group.executionTime,
          repeatCount: group.repeatCount,
        })),
      },
    };
  }
};

// 현재 활성화된 스텝과 패턴에 따라 스텝 정보 반환
export const getCurrentStepInfo = (step: StepType, pattern: PatternType | null) => {
  if (step === 3 && pattern) {
    return STEPS_INFO[3][pattern];
  }
  return STEPS_INFO[step] as StepInfo;
};

export const sequentialDefaultData: SequentialAgentGroup = {
  stepOrder: 1,
  template: null,
  autonomousAgentCount: 1,
  executionTime: 1,
  delayAfterCompletion: 0,
  repeatCount: 1,
};

export const parallelDefaultData: ParallelAgentGroup = {
  template: null,
  autonomousAgentCount: 1,
  executionTime: 1,
  repeatCount: 1,
};

export const getPatternDataWithDefaultAgentGroup = (type: PatternType): Pattern =>
  type === "sequential"
    ? {
        type: "sequential",
        agentGroups: [sequentialDefaultData],
      }
    : {
        type: "parallel",
        agentGroups: [parallelDefaultData],
      };
