import type { ALLOWED_PARAMS, FILTER_OPTIONS, SIMULATION_ACTION_TYPES } from "@/constants/simulation";

import type { Pagination, Timestamp } from "../common";
import type { CreatePatternGroupRequest, DeletePatternGroupRequest, UpdatePatternGroupRequest } from "./api";
import type { ParallelPatternGroupDetail, SequentialPatternGroupDetail } from "./groupDetail";
import type { GetParallelStatusResult, GetSequentialStatusResult } from "./statusResult";
import type { TemplateLite } from "../template/domain";

// ========== 기본 엔티티 타입 ==========

export interface Simulation {
  simulationId: number;
  simulationName: string;
  patternType: PatternType;
  status: SimulationStatus;
  mecId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type SimulationLite = Pick<Simulation, "simulationId" | "simulationName">;

export interface SimulationOverview {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
}

// ========== 각종 열거형 타입 ==========

export type SimulationStatus =
  | "INITIATING"
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | "DELETING"
  | "DELETED";
export type SimulationExecutionHistoryStatus = "RUNNING" | "COMPLETED" | "FAILED" | "STOPPED";
export type PatternGroupStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "STOPPED";
export type SimulationCreationStep = 1 | 2 | 3 | 4;
export type PatternType = "sequential" | "parallel";
export type SimulationActionType = (typeof SIMULATION_ACTION_TYPES)[number];
export type PodStatus = "PENDING" | "RUNNING" | "SUCCESS" | "FAILED" | "STOPPED";

// ========== 에이전트 그룹 타입 ==========

interface BaseAgentGroup {
  templateId: number | null;
  autonomousAgentCount: number;
  executionTime: number; // in seconds
  repeatCount: number;
}

export interface SequentialAgentGroup extends BaseAgentGroup {
  stepOrder: number;
  delayAfterCompletion: number; // in seconds
}

export interface ParallelAgentGroup extends BaseAgentGroup {} // 병렬 그룹에는 추가 필드 없음

// ========== 패턴 타입 ==========

export type SimulationPattern =
  | { type: "sequential"; agentGroups: SequentialAgentGroup[] }
  | { type: "parallel"; agentGroups: ParallelAgentGroup[] }
  | null;

// ========== 폼 데이터 타입 ==========

export interface SimulationFormData {
  name: string;
  description: string;
  mecId: string | null;
  pattern: SimulationPattern;
}

// ========== UI 구성 타입 ==========

export interface StepInfo {
  title: string;
  description: string;
}

export interface StepsInfoType {
  1: StepInfo;
  2: StepInfo;
  3: {
    sequential: StepInfo;
    parallel: StepInfo;
    repeat: StepInfo;
  };
  4: StepInfo;
}

export interface PatternConfig {
  title: string;
  unit: string;
  iconName: string;
  bgColor: string;
  iconBgColor: string;
  iconTextColor: string;
  description: string;
}

export interface SimulationStatusConfig {
  bgColor: string;
  highlightColor: string;
  textColor: string;
  text: string;
}

export interface SimulationOverviewConfig {
  label: string;
  iconName: string;
  textColor: string;
  bgColor: string;
}

export interface PodStatusConfig {
  bgColor: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
  text: string;
}

// ========== 액션 관련 타입 ==========

export interface SimulationActionHandler {
  type: SimulationActionType;
  handler: (id: number, executionId?: number) => void;
}

export interface SimulationActionConfig {
  iconName: string;
  color: string;
  label?: string;
}

// ========== 필터 및 검색 관련 타입 ==========

export type AllowedParam = (typeof ALLOWED_PARAMS)[number];
export type StatusFilterOption = (typeof FILTER_OPTIONS.status)[number]["value"];
export type PatternTypeFilterOption = (typeof FILTER_OPTIONS.patternType)[number]["value"];
export type PeriodFilterOption = (typeof FILTER_OPTIONS.period)[number]["value"];

export interface ResourceUsageData {
  cpu: { usagePercent: number; status: string };
  memory: { usagePercent: number; status: string };
  disk: { usagePercent: number; status: string };
}

export interface PodStatusData {
  totalCount: number;
  overallHealthPercent: number;
  statusBreakdown: PodStatusBreakdownData | {};
}

export type PodStatusBreakdownData = {
  [K in PodStatus]: { count: number; percentage: number };
};

export interface SequentialProgress {
  overallProgress: number;
  currentStep?: number;
  totalSteps: number;
  completedSteps: number;
}

export interface ParallelProgress {
  overallProgress: number;
  completedGroups: number;
  runningGroups?: number;
  totalGroups: number;
}

export interface SequentialProgressData {
  patternType: "sequential";
  progress: SequentialProgress;
}

export interface ParallelProgressData {
  patternType: "parallel";
  progress: ParallelProgress;
}

export interface GroupExecutionDetail {
  id: number;
  index: number; // UI에서 사용하기 위한 필드, 실제 API에는 없음
  templateId: number;
  templateName: string;
  templateType: string;
  autonomousAgentCount: number;
  repeatCount: number;
  executionTime: number;
  delayAfterCompletion?: number;
}

export type PatternActionType = "create" | "update" | "delete";

export interface PatternGroupActions {
  create: (data: CreatePatternGroupRequest) => void;
  update: (data: UpdatePatternGroupRequest) => void;
  delete: (data: DeletePatternGroupRequest) => void;
}

export interface GroupExecutionDetailFormData {
  template: TemplateLite | null;
  autonomousAgentCount: number;
  repeatCount: number;
  executionTime: number;
  delayAfterCompletion?: number;
}

// status 결과에서 details 필드 제거
type RemoveDetails<T> = T extends { stepDetails: SequentialPatternGroupDetail[] }
  ? Omit<T, "stepDetails">
  : T extends { groupDetails: ParallelPatternGroupDetail[] }
    ? Omit<T, "groupDetails">
    : T;

export type SimulationExecutionRecord = {
  simulationId: number;
  executionId: number;
} & (
  | {
      patternType: "sequential";
      currentStatus: RemoveDetails<Extract<GetSequentialStatusResult, { status: SimulationExecutionHistoryStatus }>>;
    }
  | {
      patternType: "parallel";
      currentStatus: RemoveDetails<Extract<GetParallelStatusResult, { status: SimulationExecutionHistoryStatus }>>;
    }
);
