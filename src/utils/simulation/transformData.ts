import type { APIResponse } from "@/types/api";
import type { CreateSimulationRequest, GetSimulationStaticResult } from "@/types/simulation/api";
import type { SimulationFormData } from "@/types/simulation/domain";

// API 응답 데이터를 폼 데이터 형식에 맞게 변환
export const transformSimulationResponseToFormdata = (
  data: APIResponse<GetSimulationStaticResult>,
): SimulationFormData => {
  const simulation = data.data;
  return {
    name: simulation.simulationName,
    description: simulation.simulationDescription,
    mecId: simulation.mecId,
    pattern:
      simulation.patternType === "sequential"
        ? { type: "sequential", agentGroups: simulation.executionPlan.steps }
        : { type: "parallel", agentGroups: simulation.executionPlan.groups },
  } satisfies SimulationFormData;
};

// 폼 데이터를 API 요청 형식에 맞게 변환
export const transformSimulationFormDataToRequest = (formData: SimulationFormData): CreateSimulationRequest => {
  const baseRequest = {
    mecId: formData.mecId!,
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
          templateId: group.templateId!,
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
        groups: pattern.agentGroups.map((group) => ({
          templateId: group.templateId!,
          autonomousAgentCount: group.autonomousAgentCount,
          executionTime: group.executionTime,
          repeatCount: group.repeatCount,
        })),
      },
    };
  }
};
