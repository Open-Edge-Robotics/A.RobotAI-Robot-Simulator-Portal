import type { Pagination, Timestamp } from "../common";
import type {
  ParallelAgentGroup,
  PatternType,
  PodStatusData,
  ResourceUsageData,
  SequentialAgentGroup,
  Simulation,
  SimulationExecutionRecord,
  SimulationLite,
  SimulationOverview,
  SimulationStatus,
} from "./domain";

// ========== API 요청 타입 ==========

// 공통 베이스 요청
interface BaseSimulationRequest {
  simulationName: string;
  simulationDescription: string;
  patternType: PatternType;
  mecId: string;
}

// 순차 실행 시뮬레이션 요청
interface SequentialSimulationRequest extends BaseSimulationRequest {
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

// 병렬 실행 시뮬레이션 요청
interface ParallelSimulationRequest extends BaseSimulationRequest {
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

// 최종 createSimulation request body data 타입
export type CreateSimulationRequest = SequentialSimulationRequest | ParallelSimulationRequest;

// ========== API 응답 타입 ==========

// createSimulation response data 타입
export interface CreateSimulationResult {
  simulation_id: number;
  simulation_name: string;
  simulation_description: string;
  pattern_type: PatternType;
  status: SimulationStatus;
  simulation_namespace: string;
  mec_id: string;
  created_at: Timestamp;
  total_expected_pods: number;
}

export interface GetSimulationsResult {
  overview: SimulationOverview;
  simulations: Simulation[];
  pagination: Pagination;
}

export type GetSimulationsLiteResult = SimulationLite[];

// ------------ Simulation Summary ---------------

export interface GetSimulationSummaryResult {
  simulationId: number;
  simulationName: string;
  latestExecutionStatus: SimulationStatus;
  patternType: PatternType;
  totalExecutionTime: number;
  autonomousAgentCount: number;
  resourceUsage: ResourceUsageData;
  podStatus: PodStatusData;
}

interface SimulationStaticResultBase {
  simulationId: number;
  simulationName: string;
  simulationDescription: string;
  patternType: PatternType;
  mecId: string;
  namespace: string;
  createdAt: Timestamp;
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

interface GetSequentialSimulationStaticResult extends SimulationStaticResultBase {
  patternType: "sequential";
  executionPlan: {
    steps: SequentialGroupStatic[];
  };
}

interface GetParallelSimulationStaticResult extends SimulationStaticResultBase {
  patternType: "parallel";
  executionPlan: {
    groups: ParallelGroupStatic[];
  };
}

// -------------- 시뮬레이션 상세 정보 (정적) -----------------

export type GetSimulationStaticResult = GetSequentialSimulationStaticResult | GetParallelSimulationStaticResult;

export interface GetSimulationDeletionStatusResult {
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

export type CreatePatternGroupRequest =
  | {
      step: SequentialAgentGroup;
    }
  | { group: ParallelAgentGroup };

export type UpdatePatternGroupRequest =
  | {
      step: SequentialAgentGroup;
    }
  | { group: ParallelAgentGroup & { groupId: number } };

export type DeletePatternGroupRequest =
  | {
      step: { stepOrder: number };
    }
  | { group: { groupId: number } };

export interface GetSimulationExecutionHistoryResult {
  executions: SimulationExecutionRecord[];
  pagination: Pagination;
}
