import type { Timestamp } from "../common";

import type { PatternType, Simulation, SimulationOverview, SimulationStatus } from "./domain";

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
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

interface SimulationResultBase {
  // 정적 데이터
  simulationId: number;
  simulationName: string;
  simulationDescription: string;
  mecId: string;
  namespace: string;
  createdAt: Timestamp;

  // 현재 상태 스냅샷 (동적)
  currentStatus: {
    status: string;
    progress: {
      overallProgress: number;
      currentStep: number;
      completedSteps: number;
    };
    timestamps: {
      startedAt: Timestamp;
      lastUpdated: Timestamp;
    };
  };
}

interface GetSequentialSimulationResult extends SimulationResultBase {
  patternType: "sequential";
  executionPlan: {
    steps: {
      stepOrder: number;
      templateId: number;
      templateName: string;
      autonomousAgentCount: number;
      repeatCount: number;
      executionTime: number;
      delayAfterCompletion: number;
    }[];
  };
}

interface GetParallelSimulationResult extends SimulationResultBase {
  patternType: "parallel";
  executionPlan: {
    groups: {
      templateId: number;
      templateName: string;
      autonomousAgentCount: number;
      repeatCount: number;
      executionTime: number;
    }[];
  };
}

// 설정 정보 포함 (정적)
export type GetSimulationResult = GetSequentialSimulationResult | GetParallelSimulationResult;
