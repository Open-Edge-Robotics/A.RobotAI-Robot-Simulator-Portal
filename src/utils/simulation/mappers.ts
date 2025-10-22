import type { APIResponse } from "@/types/api";
import type {
  CreatePatternGroupRequest,
  CreateSimulationRequest,
  GetSimulationStaticResponse,
  ParallelGroupStatic,
  SequentialGroupStatic,
  UpdatePatternGroupRequest,
} from "@/types/simulation/api";
import type {
  GroupExecutionDetail,
  GroupExecutionDetailFormData,
  PatternType,
  SimulationFormData,
} from "@/types/simulation/domain";

// API 응답 데이터를 폼 데이터 형식에 맞게 변환
export const simulationApiToForm = (data: APIResponse<GetSimulationStaticResponse>): SimulationFormData => {
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
export const simulationFormToCreateRequest = (formData: SimulationFormData): CreateSimulationRequest => {
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

// 패턴 그룹 생성 요청 데이터 변환
export const patternGroupFormToCreateRequest = (
  formData: GroupExecutionDetailFormData,
  patternInfo: { patternType: "sequential"; stepOrder: number } | { patternType: "parallel" },
): CreatePatternGroupRequest => {
  if (patternInfo.patternType === "sequential") {
    return {
      step: {
        stepOrder: patternInfo.stepOrder,
        templateId: formData.template!.templateId, // validation 통과 후이므로 non-null 단언
        autonomousAgentCount: formData.autonomousAgentCount,
        repeatCount: formData.repeatCount,
        executionTime: formData.executionTime,
        delayAfterCompletion: formData.delayAfterCompletion!,
      },
    };
  }

  return {
    group: {
      templateId: formData.template!.templateId, // validation 통과 후이므로 non-null 단언
      autonomousAgentCount: formData.autonomousAgentCount,
      repeatCount: formData.repeatCount,
      executionTime: formData.executionTime,
    },
  };
};

// 패턴 그룹 수정 요청 데이터 변환
export const patternGroupFormToUpdateRequest = (
  formData: GroupExecutionDetailFormData,
  patternInfo: { patternType: PatternType; id: number },
): UpdatePatternGroupRequest => {
  if (patternInfo.patternType === "sequential") {
    return {
      step: {
        stepOrder: patternInfo.id,
        templateId: formData.template!.templateId, // validation 통과 후이므로 non-null 단언
        autonomousAgentCount: formData.autonomousAgentCount,
        repeatCount: formData.repeatCount,
        executionTime: formData.executionTime,
        delayAfterCompletion: formData.delayAfterCompletion!,
      },
    };
  }

  return {
    group: {
      groupId: patternInfo.id,
      templateId: formData.template!.templateId, // validation 통과 후이므로 non-null 단언
      autonomousAgentCount: formData.autonomousAgentCount,
      repeatCount: formData.repeatCount,
      executionTime: formData.executionTime,
    },
  };
};

export const patternGroupToForm = (group: GroupExecutionDetail): GroupExecutionDetailFormData => ({
  template: { templateId: group.templateId, templateName: group.templateName },
  autonomousAgentCount: group.autonomousAgentCount,
  repeatCount: group.repeatCount,
  executionTime: group.executionTime,
  delayAfterCompletion: group.delayAfterCompletion,
});

type ExecutionPlanInfo =
  | {
      patternType: "sequential";
      executionPlan: {
        steps: SequentialGroupStatic[];
      };
    }
  | {
      patternType: "parallel";
      executionPlan: {
        groups: ParallelGroupStatic[];
      };
    };

export const executionPlanToGroupDetail = (simulation: ExecutionPlanInfo): GroupExecutionDetail[] => {
  switch (simulation.patternType) {
    case "sequential":
      return simulation.executionPlan.steps.map((step, index) => ({
        ...step,
        id: step.stepOrder,
        index: index + 1, // UI에서 사용하기 위한 필드. step 삭제 시 중간 번호가 비어서 취한 조치
      }));
    case "parallel":
      return simulation.executionPlan.groups.map((group, index) => ({
        ...group,
        id: group.groupId,
        index: index + 1, // UI에서 사용하기 위한 필드. group 삭제 시 중간 번호가 비어서 취한 조치
      }));
    default:
      throw new Error("Unknown pattern type");
  }
};
