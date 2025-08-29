import { ALLOWED_PARAMS, STEPS_INFO } from "@/constants/simulation";

import type { APIResponse } from "@/types/api";
import type { CreateSimulationRequest, GetSimulationResult, GetSimulationSummaryResult } from "@/types/simulation/api";
import type {
  AllowedParam,
  ParallelAgentGroup,
  PatternType,
  PodStatusBreakdownData,
  SequentialAgentGroup,
  SimulationFormData,
  SimulationPattern,
  StepInfo,
  StepType,
} from "@/types/simulation/domain";

import { validatePage, validatePatternTypeFilter, validateSize, validateStatusFilter } from "./validation";

// 데이터 변환

export const transformSimulationResponseToFormdata = (data: APIResponse<GetSimulationResult>): SimulationFormData => {
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
  executionTime: 1,
  delayAfterCompletion: 0,
  repeatCount: 1,
};

const parallelDefaultData: ParallelAgentGroup = {
  templateId: null,
  autonomousAgentCount: 1,
  executionTime: 1,
  repeatCount: 1,
};

export function getPatternDataWithDefaultAgentGroup(type: PatternType): SimulationPattern {
  if (type === "sequential") {
    return { type: "sequential", agentGroups: [sequentialDefaultData] };
  }
  return { type: "parallel", agentGroups: [parallelDefaultData] };
}

// ========== 계산 함수들 ==========
export const calculateTotalAgentCount = <K extends { autonomousAgentCount: number }>(agentGroups: K[]) => {
  return agentGroups.reduce((sum, group) => sum + group.autonomousAgentCount, 0);
};

export const calculateTotalExecutionTime = (pattern: SimulationPattern) => {
  if (!pattern) return 0;

  if (pattern.type === "sequential") {
    const totalExecutionTime = pattern.agentGroups.reduce((sum, group) => {
      // Sequential: 단계별 총 시간 = (executionTime × repeatCount) + delayAfterCompletion
      const groupTotal = group.executionTime * group.repeatCount + group.delayAfterCompletion;
      return sum + groupTotal;
    }, 0);

    const lastGroupDelay = pattern.agentGroups.at(-1)?.delayAfterCompletion || 0;
    return totalExecutionTime + lastGroupDelay;
  }

  if (pattern.type === "parallel") {
    // Parallel: 그룹별 총 시간 = executionTime × repeatCount, 전체 시간은 최대값
    const totalExecutionTime = Math.max(...pattern.agentGroups.map((group) => group.executionTime * group.repeatCount));
    return totalExecutionTime;
  }

  return 0;
};

// ========== URL 파라미터 검증 ==========

const isAllowedParam = (key: string): key is AllowedParam => {
  return ALLOWED_PARAMS.includes(key as AllowedParam);
};

// 유효하지 않은 파라미터가 있으면 URL을 정리
export const getValidParams = (searchParams: URLSearchParams) => {
  const newSearchParams = new URLSearchParams();
  let needsUpdate = false;

  // 허용되지 않은 파라미터 제거 체크
  const hasInvalidParams = Array.from(searchParams.keys()).some((key) => !isAllowedParam(key));
  if (hasInvalidParams) needsUpdate = true;

  // 각 파라미터 검증 및 설정
  const currentParams = {
    page: searchParams.get("page"),
    size: searchParams.get("size"),
    status: searchParams.get("status"),
    pattern_type: searchParams.get("pattern_type"),
  };

  const validParams = {
    page: validatePage(currentParams.page),
    size: validateSize(currentParams.size),
    status: validateStatusFilter(currentParams.status),
    pattern_type: validatePatternTypeFilter(currentParams.pattern_type),
  };

  // 변경사항 체크 및 새 파라미터 설정
  Object.entries(validParams).forEach(([key, value]) => {
    const originalValue = currentParams[key as keyof typeof currentParams];

    if (originalValue !== String(value)) {
      needsUpdate = true;
    }

    if (value !== null) {
      newSearchParams.set(key, String(value));
    }
  });

  return needsUpdate ? newSearchParams : null;
};
