import type { PatternType, Status } from "@/pages/simulation/types";
/* =============== API Request 타입들 =============== */

// 순차 실행용 단계 요청
interface SequentialStepRequest {
  stepOrder: number;
  templateId: number;
  autonomousAgentCount: number;
  executionTime: number; // in seconds
  delayAfterCompletion: number; // in seconds
  repeatCount: number;
}

// 병렬 실행용 에이전트 요청
interface ParallelAgentRequest {
  templateId: number;
  autonomousAgentCount: number;
  executionTime: number; // in seconds
  repeatCount: number;
}

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
  pattern: { steps: SequentialStepRequest[] };
}

// 병렬 실행 시뮬레이션 요청
interface ParallelSimulationRequest extends BaseSimulationRequest {
  patternType: "parallel";
  pattern: { groups: ParallelAgentRequest[] };
}

// 최종 createSimulation request body data 타입
export type CreateSimulationRequest = SequentialSimulationRequest | ParallelSimulationRequest;

/* =============== API Response 타입들 =============== */

// createSimulation response data 타입
export interface CreateSimulationResult {
  simulation_id: number;
  simulation_name: string;
  simulation_description: string;
  pattern_type: PatternType;
  status: Status;
  simulation_namespace: string;
  mec_id: string;
  created_at: string;
  total_expected_pods: number;
}

export interface Simulation {
  simulationId: number;
  simulationName: string;
  patternType: PatternType;
  status: Status;
  mecId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationOverview {
  total: number;
  ready: number;
  running: number;
  completed: number;
  failed: number;
}

export interface GetSimulationsResult {
  overview: SimulationOverview;
  simulations: Simulation[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

interface SequentialExecutionPlan {
  steps: {
    stepOrder: number;
    templateId: number;
    templateName: string;
    agentCount: number;
    repeatCount: number;
    executionTime: number;
    delayAfterCompletion: number;
  }[];
}

interface ParallelExecutionPlan {
  groups: {
    templateId: number;
    templateName: string;
    agentCount: number;
    repeatCount: number;
    executionTime: number;
  }[];
}

interface SimulationResultBase {
  // 정적 데이터
  simulationId: number;
  simulationName: string;
  simulationDescription: string;
  mecId: string;
  namespace: string;
  createdAt: string;

  // 현재 상태 스냅샷 (동적)
  currentStatus: {
    status: string;
    progress: {
      overallProgress: number;
      currentStep: number;
      completedSteps: number;
    };
    timestamps: {
      startedAt: string;
      lastUpdated: string;
    };
  };
}

// 설정 정보 포함 (정적)
export type GetSimulationResult = SimulationResultBase &
  (
    | { patternType: "sequential"; executionPlan: SequentialExecutionPlan }
    | { patternType: "parallel"; executionPlan: ParallelExecutionPlan }
  );
