import type { PatternType, SimulationStatus, Status } from "@/pages/simulation/types";
// === API Request 타입들 ===

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
  pattern: { agents: ParallelAgentRequest[] };
}

// 최종 CreateSimulationRequest 타입
export type CreateSimulationRequest = SequentialSimulationRequest | ParallelSimulationRequest;

// === API Response 타입들 ===
interface SequentialStep {
  stepOrder: number;
  templateId: number;
  agentCount: number;
  repeatCount: number;
  totalExecutions: number;
  startTime: string;
  endTime: string;
  estimatedDuration: number;
  status: SimulationStatus;
}

// 병렬 실행용 에이전트 정의
interface ParallelAgent {
  templateId: number;
  templateName: string;
  agentCount: number;
  repeatCount: number;
  totalExecutions: number;
  startTime: string;
  endTime: string;
  estimatedDuration: number;
  status: SimulationStatus;
}

// 순차 실행 계획
interface SequentialExecutionPlan {
  steps: SequentialStep[];
}

// 병렬 실행 계획
interface ParallelExecutionPlan {
  simultaneousExecution: boolean;
  agents: ParallelAgent[];
}

// 공통 베이스 인터페이스
interface BaseSimulationResult {
  simulationId: string;
  simulationName: string;
  patternType: PatternType;
  status: SimulationStatus;
  namespace: string;
  estimatedDuration: number;
  createdAt: string;
}

// 순차 실행 시뮬레이션 결과
interface SequentialSimulationResult extends BaseSimulationResult {
  patternType: "sequential";
  totalSteps: number;
  totalAgents: number;
  totalRepeats: number;
  executionPlan: SequentialExecutionPlan;
}

// 병렬 실행 시뮬레이션 결과
interface ParallelSimulationResult extends BaseSimulationResult {
  patternType: "parallel";
  totalAgentGroups: number;
  totalAgents: number;
  totalRepeats: number;
  executionPlan: ParallelExecutionPlan;
}

// 최종 CreateSimulationResult 타입
export type CreateSimulationResult = SequentialSimulationResult | ParallelSimulationResult;

export interface Simulation {
  simulationId: number; // string에서 number로 변경
  simulationName: string;
  patternType: "parallel" | "sequential";
  status: Status;
  mecId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Overview {
  total: number;
  ready: number;
  running: number;
  completed: number;
  failed: number;
}

export interface GetSimulationsResult {
  overview: Overview;
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
