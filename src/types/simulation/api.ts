import type { Pagination } from "../common";
import type {
  ParallelAgentGroupFormData,
  PatternType,
  PodStatusData,
  ResourceUsageData,
  SequentialAgentGroupFormData,
  Simulation,
  SimulationExecutionRecord,
  SimulationLite,
  SimulationOverview,
  SimulationStatus,
} from "./domain";

// ========== 시뮬레이션 생성 관련 API 응답 타입 ==========

interface CreateSimulationRequestBase {
  simulationName: string;
  simulationDescription: string;
  patternType: PatternType;
  mecId: string;
}

interface CreateSequentialSimulationRequest extends CreateSimulationRequestBase {
  patternType: "sequential";
  pattern: {
    steps: {
      stepOrder: number;
      templateId: number;
      autonomousAgentCount: number;
      executionTime: number; // in seconds
      delayAfterCompletion: number; // in seconds
      repeatCount: number;
    }[];
  };
}

interface CreateParallelSimulationRequest extends CreateSimulationRequestBase {
  patternType: "parallel";
  pattern: {
    groups: {
      templateId: number;
      autonomousAgentCount: number;
      executionTime: number; // in seconds
      repeatCount: number;
    }[];
  };
}

export type CreateSimulationRequest = CreateSequentialSimulationRequest | CreateParallelSimulationRequest;

export interface CreateSimulationResponse {
  simulation_id: number;
  simulation_name: string;
  simulation_description: string;
  pattern_type: PatternType;
  status: SimulationStatus;
  simulation_namespace: string;
  mec_id: string;
  created_at: string;
  total_expected_pods: number;
}

// ========== 시뮬레이션 목록 조회 관련 API 응답 타입 ==========

export interface GetSimulationsResponse {
  overview: SimulationOverview;
  simulations: Simulation[];
  pagination: Pagination;
}

export type GetSimulationsLiteResponse = SimulationLite[];

export interface GetSimulationSummaryResponse {
  simulationId: number;
  simulationName: string;
  latestExecutionStatus: SimulationStatus;
  patternType: PatternType;
  totalExecutionTime: number;
  autonomousAgentCount: number;
  resourceUsage: ResourceUsageData;
  podStatus: PodStatusData;
}

// ========== 시뮬레이션 정적 정보 관련 API 응답 타입 ==========

interface SimulationStaticResponseBase {
  simulationId: number;
  simulationName: string;
  simulationDescription: string;
  patternType: PatternType;
  mecId: string;
  namespace: string;
  createdAt: string;
  latestExecutionStatus: {
    executionId: number;
    status: SimulationStatus;
    timestamps: {
      createdAt: string;
      lastUpdated: string;
    };
  };
}

interface GroupStaticBase {
  templateId: number;
  templateName: string;
  templateType: string;
  autonomousAgentCount: number;
  repeatCount: number;
  executionTime: number;
}

interface SequentialGroupStatic extends GroupStaticBase {
  stepOrder: number;
  delayAfterCompletion: number;
}

interface ParallelGroupStatic extends GroupStaticBase {
  groupId: number;
}

interface GetSequentialSimulationStaticResponse extends SimulationStaticResponseBase {
  patternType: "sequential";
  executionPlan: {
    steps: SequentialGroupStatic[];
  };
}

interface GetParallelSimulationStaticResponse extends SimulationStaticResponseBase {
  patternType: "parallel";
  executionPlan: {
    groups: ParallelGroupStatic[];
  };
}

export type GetSimulationStaticResponse = GetSequentialSimulationStaticResponse | GetParallelSimulationStaticResponse;

export interface GetSimulationDeletionStatusResponse {
  simulationId: number;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  progress: number;
  steps: {
    namespace: string;
    redis: string;
    db: string;
  };
  startedAt: string;
  completedAt: string | null;
  errorMessage: string | null;
}

// ========== 패턴 그룹 편집 관련 API 요청 타입 ==========

export type CreatePatternGroupRequest =
  | {
      step: SequentialAgentGroupFormData;
    }
  | { group: ParallelAgentGroupFormData };

export type UpdatePatternGroupRequest =
  | {
      step: SequentialAgentGroupFormData;
    }
  | { group: ParallelAgentGroupFormData & { groupId: number } };

export type DeletePatternGroupRequest =
  | {
      step: { stepOrder: number };
    }
  | { group: { groupId: number } };

// ========== 시뮬레이션 실행 이력 관련 API 응답 타입 ==========

export interface GetSimulationExecutionHistoryResponse {
  executions: SimulationExecutionRecord[];
  pagination: Pagination;
}
